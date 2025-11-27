// File: client/src/components/RewardCard.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiGift, FiInfo } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { RedeemDialog } from "./RedeemDialog";
import { useAuth } from "../context/AuthContext";
import { transactionApi } from "../services/api";

/** ---------------------------
 *  Placeholder SVG generator
 *  - deterministic based on name|category|description
 *  - does NOT include any sensitive fields like coupon/reward code
 * --------------------------- */
const hashString = (str = ""): number => {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  return h >>> 0;
};

const pickColorsFromHash = (hash: number) => {
  const palettes = [
    ["#f97316", "#fb923c"], // orange
    ["#06b6d4", "#0891b2"], // teal
    ["#7c3aed", "#a78bfa"], // purple
    ["#ef4444", "#f97373"], // red
    ["#10b981", "#34d399"], // green
    ["#3b82f6", "#60a5fa"], // blue
    ["#f59e0b", "#fbbf24"], // amber
  ];
  return palettes[hash % palettes.length];
};

const escapeXml = (s: string) =>
  s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

const makePlaceholderSvgDataUrl = (opts: {
  name?: string;
  category?: string;
  description?: string;
}) => {
  const base = `${opts.name || ""}|${opts.category || ""}|${
    opts.description || ""
  }`;
  const h = hashString(base);
  const [c1, c2] = pickColorsFromHash(h);
  const icon =
    (opts.category && opts.category.trim()[0]?.toUpperCase()) ||
    (opts.name && opts.name.trim()[0]?.toUpperCase()) ||
    "R";

  const title = (opts.name || "").slice(0, 30);
  const sub = (opts.category || "").slice(0, 24);

  const rotation = h % 360;
  const dotOffset = (h % 20) + 6;

  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='1200' height='720' viewBox='0 0 1200 720' role='img' aria-label='${escapeXml(
      title || sub || "reward"
    )}'>
      <defs>
        <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0' stop-color='${c1}' />
          <stop offset='1' stop-color='${c2}' />
        </linearGradient>
        <pattern id='dots' x='0' y='0' width='40' height='40' patternUnits='userSpaceOnUse'>
          <rect width='40' height='40' fill='rgba(255,255,255,0)' />
          <circle cx='${dotOffset}' cy='${dotOffset}' r='1.8' fill='rgba(255,255,255,0.14)' />
        </pattern>
      </defs>

      <rect width='1200' height='720' fill='url(#g)' />
      <rect width='1200' height='720' fill='url(#dots)' opacity='0.22' transform='rotate(${rotation} 600 360)' />

      <g transform='translate(80,80)'>
        <rect x='0' y='0' rx='28' ry='28' width='1040' height='560' fill='rgba(255,255,255,0.06)' />
        <g transform='translate(40,40)'>
          <circle cx='120' cy='120' r='110' fill='rgba(255,255,255,0.12)' />
          <text x='120' y='150' font-size='96' text-anchor='middle' font-family='system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' fill='white'>
            ${escapeXml(icon)}
          </text>
        </g>

        <g transform='translate(280,120)'>
          <text x='0' y='0' font-size='40' font-weight='700' font-family='Inter, ui-sans-serif, system-ui, -apple-system' fill='white'>
            ${escapeXml(title || sub || "Reward")}
          </text>
          <text x='0' y='52' font-size='20' fill='rgba(255,255,255,0.9)' font-family='Inter, ui-sans-serif'>
            ${escapeXml(sub || (opts.description || "").slice(0, 60))}
          </text>
        </g>

      </g>
    </svg>`.trim();

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

/** ---------------------------
 *  RewardCard Component
 * --------------------------- */
interface RewardCardProps {
  reward: {
    _id: string;
    title: string;
    description: string;
    points: number;
    code?: string;
    image_url?: string;
    owner: {
      _id: string;
      name: string;
    };
    category?: {
      name: string;
    };
    status: "available" | "redeemed" | "exchanged";
    isActive: boolean;
  };
  onUpdate?: () => void;
}

export const RewardCard = ({ reward, onUpdate }: RewardCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, updatePoints } = useAuth();

  const canRedeem =
    reward.status === "available" &&
    isAuthenticated &&
    reward.isActive !== false &&
    user?._id !== reward.owner._id &&
    user?.points !== undefined &&
    user?.points >= reward.points;

  const handleRedeem = () => {
    if (!isAuthenticated) {
      toast.error("Please login to redeem rewards");
      navigate("/signin", { state: { from: location.pathname } });
      return;
    }

    if (!user?.points) {
      toast.error(
        `Please complete your profile to start earning and redeeming points`
      );
      navigate("/profile");
      return;
    }

    if (user._id === reward.owner._id) {
      toast.error("You cannot redeem your own reward");
      return;
    }

    setIsDialogOpen(true);
  };

  const handleConfirmRedeem = async () => {
    if (!reward) return false;

    try {
      setIsRedeeming(true);
      const response = await transactionApi.redeemReward(reward._id);

      // Response shape may vary; prefer returned updated user points
      const userPoints =
        response.data?.updatedRedeemingUser?.points ??
        response.data?.updatedRedeemingUser?.points ??
        response.data?.updatedRedeemingUser?.points ??
        response.data?.userPoints;
      if (typeof userPoints === "number") {
        updatePoints(userPoints);
        toast.success("Reward redeemed successfully!");
        onUpdate?.();
        setIsDialogOpen(false);
        return true;
      }

      // older api shape fallback
      if (
        response.data?.updatedRedeemingUser &&
        response.data?.updatedRedeemingUser.points !== undefined
      ) {
        updatePoints(response.data.updatedRedeemingUser.points);
        toast.success("Reward redeemed successfully!");
        onUpdate?.();
        setIsDialogOpen(false);
        return true;
      }

      toast.error("Invalid response from server");
      return false;
    } catch (error: any) {
      console.error("Redemption error:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to redeem reward";
      toast.error(errorMessage);
      return false;
    } finally {
      setIsRedeeming(false);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    onUpdate?.();
  };

  // Determine image - prefer reward.image_url, otherwise generate placeholder
  const imageSrc =
    reward.image_url && reward.image_url.trim()
      ? reward.image_url
      : makePlaceholderSvgDataUrl({
          name: reward.title,
          category: reward.category?.name,
          description: reward.description,
        });

  return (
    <>
      <div className="my-4">
        <div
          className="relative group bg-white dark:bg-slate-800 rounded-2xl p-6 
                    shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          {/* Top image area */}
          <div className="mb-4 rounded-xl overflow-hidden border border-gray-100 dark:border-slate-700">
            <div className="relative w-full h-44 bg-gray-100">
              <img
                src={imageSrc}
                alt={reward.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/8" />
            </div>
          </div>

          <div
            className="group bg-gradient-to-br from-white/80 to-white/50 dark:from-slate-800/80 dark:to-slate-800/50 
                        backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:shadow-2xl relative
                        dark:shadow-cyan-500/10 dark:hover:shadow-cyan-500/20
                        transform hover:scale-[1.02] transition-all duration-300 ease-out
                        border border-white/20 dark:border-slate-700/20
                        min-h-[280px] flex flex-col justify-between
                        hover:border-cyan-500/20 dark:hover:border-cyan-500/20"
          >
            {/* Status Badge */}
            {(reward.status !== "available" || !reward.isActive) && (
              <div
                className="absolute -top-2 right-4 px-3 py-1 rounded-full text-xs
                                font-medium bg-gradient-to-r from-amber-100 to-amber-200 
                                text-amber-800 dark:from-amber-900 dark:to-amber-800 
                                dark:text-amber-100 shadow-lg shadow-amber-500/10
                                border border-amber-200/50 dark:border-amber-700/50"
              >
                {!reward.isActive
                  ? "Inactive"
                  : reward.status.charAt(0).toUpperCase() +
                    reward.status.slice(1)}
              </div>
            )}

            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0 pr-4">
                  <h3
                    className="text-xl font-bold text-slate-800 dark:text-white 
                                        truncate mb-1 bg-gradient-to-r from-slate-800 to-slate-600
                                        dark:from-white dark:to-slate-300 bg-clip-text text-transparent"
                  >
                    {reward.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                    by {reward.owner.name}
                  </p>
                </div>
                <div
                  className="flex-shrink-0 flex items-center gap-1.5 px-4 py-1.5
                                    bg-gradient-to-r from-cyan-100 to-blue-100 
                                    dark:from-cyan-900 dark:to-blue-900
                                    text-cyan-700 dark:text-cyan-300 
                                    rounded-full text-sm font-semibold shadow-inner"
                >
                  <FiGift className="w-4 h-4" />
                  <span>{reward.points} pts</span>
                </div>
              </div>

              <p
                className="text-slate-600 dark:text-slate-300 line-clamp-2 min-h-[3em]
                                leading-relaxed"
              >
                {reward.description}
              </p>

              {reward.category && (
                <span
                  className="inline-block px-3 py-1 
                                    bg-gradient-to-r from-slate-100 to-slate-50
                                    dark:from-slate-700 dark:to-slate-800
                                    text-slate-600 dark:text-slate-300 
                                    text-xs font-medium rounded-full
                                    shadow-inner border border-slate-200/50 dark:border-slate-600/50"
                >
                  {reward.category.name}
                </span>
              )}
            </div>

            <div
              className="flex justify-between items-center mt-6 pt-4 
                            border-t border-slate-200/50 dark:border-slate-700/50"
            >
              <button
                onClick={() => navigate(`/rewards/${reward._id}`)}
                className="text-sm text-cyan-600 hover:text-cyan-700 
                                    dark:text-cyan-400 dark:hover:text-cyan-300 
                                    flex items-center gap-1.5 font-medium
                                    hover:translate-x-0.5 transition-transform"
              >
                <FiInfo className="w-4 h-4" />
                Details
              </button>

              <button
                onClick={handleRedeem}
                disabled={!canRedeem || isRedeeming}
                className={`px-5 py-2 rounded-lg text-sm font-medium
                                    transition-all duration-300 shadow-lg
                                    ${
                                      canRedeem
                                        ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 shadow-cyan-500/25"
                                        : "bg-gradient-to-r from-gray-100 to-gray-50 text-gray-400 dark:from-gray-800 dark:to-gray-700 dark:text-gray-500 cursor-not-allowed"
                                    }`}
              >
                {isRedeeming ? "Redeeming..." : "Redeem"}
              </button>
            </div>

            {!isAuthenticated && (
              <div
                className="absolute inset-0 bg-gradient-to-br from-slate-900/10 to-slate-900/30 
                                dark:from-slate-900/40 dark:to-slate-900/60
                                backdrop-blur-[3px] rounded-2xl flex items-center justify-center 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <button
                  onClick={() => navigate("/signin")}
                  className="px-6 py-3 bg-white dark:bg-slate-800 
                                        text-slate-800 dark:text-white rounded-xl shadow-2xl 
                                        hover:scale-105 transition-transform duration-300
                                        font-medium"
                >
                  Login to Redeem
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <RedeemDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmRedeem}
        points={reward.points}
        isLoading={isRedeeming}
      />
    </>
  );
};

export default RewardCard;
