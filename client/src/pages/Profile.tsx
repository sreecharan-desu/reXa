// File: client/src/pages/Profile.tsx
import { useState, useEffect } from "react";
import { authApi } from "../services/api";
import { toast } from "react-hot-toast";
import {
  FiEdit2,
  FiSave,
  FiX,
  FiUser,
  FiMail,
  FiAward,
  FiGift,
  FiCheckCircle,
  FiCalendar,
  FiTrendingUp,
  FiPlusCircle,
} from "react-icons/fi";
import { FloatingActionButton } from "../components/FloatingActionButton";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  profileErrorState,
  profileLoadingState,
  profileState,
} from "../store/atoms";
import { Line, Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { format, subMonths } from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type UserProfile = {
  _id: string;
  name: string;
  email: string;
  points: number;
  redeemedRewards: number;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
};

const COLORS = {
  primary: "#0891b2",
  blue: "#3b82f6",
  green: "#10b981",
  amber: "#f59e0b",
  red: "#ef4444",
  slateBg: "bg-gray-50",
};

export const Profile = () => {
  const [profile, setProfile] = useRecoilState<UserProfile | null>(
    profileState
  );
  const [loading, setLoading] = useRecoilState<boolean>(profileLoadingState);
  const [error, setError] = useRecoilState<string>(profileErrorState);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile | null>(
    profile
  );
  const [notificationPreferences, setNotificationPreferences] = useState({
    emailNotifications: true,
    rewardUpdates: true,
  });
  const navigate = useNavigate();

  /* -------------------------
   *  Charts data helpers
   * ------------------------- */
  const getPointsOverTimeData = () => {
    const labels = Array.from({ length: 6 }, (_, i) =>
      format(subMonths(new Date(), 5 - i), "MMM yyyy")
    );
    const points = profile?.points || 0;
    const dataPoints = [
      Math.round(points * 0.1),
      Math.round(points * 0.25),
      Math.round(points * 0.45),
      Math.round(points * 0.65),
      Math.round(points * 0.85),
      Math.round(points),
    ];
    return {
      labels,
      datasets: [
        {
          label: "Points",
          data: dataPoints,
          borderColor: COLORS.primary,
          backgroundColor: "rgba(8,145,178,0.12)",
          fill: true,
          tension: 0.36,
          pointRadius: 3,
        },
      ],
    };
  };

  const getRewardDistributionData = () => {
    const categories = [
      "Gaming",
      "Shopping",
      "Entertainment",
      "Food & Drinks",
      "Travel",
    ];
    const base = profile?.redeemedRewards || 0;
    const distribution = [
      Math.max(1, Math.floor(base * 0.15)),
      Math.max(1, Math.floor(base * 0.35)),
      Math.max(1, Math.floor(base * 0.25)),
      Math.max(1, Math.floor(base * 0.15)),
      Math.max(1, Math.floor(base * 0.1)),
    ];
    return {
      labels: categories,
      datasets: [
        {
          data: distribution,
          backgroundColor: [
            COLORS.primary,
            COLORS.blue,
            COLORS.green,
            COLORS.amber,
            COLORS.red,
          ],
          hoverOffset: 8,
        },
      ],
    };
  };

  const getActivityData = () => {
    const labels = ["Account Created", "Email Verified", "Points Earned"];
    const data = [
      1,
      profile?.isVerified ? 1 : 0,
      profile?.points ? Math.min(Math.round(profile.points / 50), 5) : 0,
    ];
    return {
      labels,
      datasets: [
        {
          label: "Activity",
          data,
          backgroundColor: COLORS.primary,
          borderColor: COLORS.primary,
          borderWidth: 1,
        },
      ],
    };
  };

  /* -------------------------
   *  Profile loading / fetch
   * ------------------------- */
  const fetchProfile = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await authApi.getProfile();
      setProfile(response.data);
      setEditedProfile(response.data);
    } catch (err: any) {
      const message = err?.response?.data?.message || "Failed to load profile";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!profile || !profile._id) fetchProfile();
    else setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* -------------------------
   *  Profile update
   * ------------------------- */
  const handleUpdate = async () => {
    if (!editedProfile) return;
    try {
      setLoading(true);
      const response = await authApi.updateProfile({
        name: editedProfile.name,
        email: editedProfile.email,
      });
      setProfile(response.data);
      setEditedProfile(response.data);
      setIsEditing(false);
      toast.success("Profile updated");
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "Failed to update profile";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEditedProfile((prev) =>
      prev ? { ...prev, name: e.target.value } : prev
    );

  const handleNotificationToggle = (
    key: keyof typeof notificationPreferences
  ) => {
    setNotificationPreferences((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      toast.success(
        `${
          key === "emailNotifications"
            ? "Email notifications"
            : "Reward updates"
        } ${next[key] ? "enabled" : "disabled"}`
      );
      return next;
    });
  };

  const formatDate = (dateString?: string) =>
    dateString
      ? new Date(dateString).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "—";

  const getAccountAge = () => {
    if (!profile?.createdAt) return "";
    const days = Math.ceil(
      (Date.now() - new Date(profile.createdAt).getTime()) /
        (1000 * 60 * 60 * 24)
    );
    if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (days < 365)
      return `${Math.floor(days / 30)} month${
        Math.floor(days / 30) > 1 ? "s" : ""
      } ago`;
    return `${Math.floor(days / 365)} year${
      Math.floor(days / 365) > 1 ? "s" : ""
    } ago`;
  };

  const getProfileCompletion = () => {
    let completion = 0;
    if (profile?.name) completion += 50;
    if (profile?.isVerified) completion += 50;
    return completion;
  };

  /* -------------------------
   *  Loading / error states
   * ------------------------- */
  if (loading)
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-500 border-t-transparent" />
      </div>
    );

  if (error || !profile)
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-red-600">{error || "Profile not available"}</div>
      </div>
    );

  /* -------------------------
   *  Render
   * ------------------------- */
  return (
    <div className="min-h-[80vh] p-4 sm:p-6 md:p-8 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-6xl mx-auto space-y-6">
        {/* Header card */}
        <header className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl shadow-lg overflow-hidden text-white relative">
          <div className="relative p-6">
            <div className="flex justify-end mb-4">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  aria-label="Edit profile"
                  className="p-2 text-white hover:bg-white/20 rounded-full transition"
                >
                  <FiEdit2 className="w-5 h-5" />
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleUpdate}
                    disabled={loading}
                    aria-label="Save profile"
                    className="p-2 text-white hover:bg-white/20 rounded-full disabled:opacity-60 transition"
                  >
                    <FiSave className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditedProfile(profile);
                    }}
                    aria-label="Cancel edit"
                    className="p-2 text-white hover:bg-white/20 rounded-full transition"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
              <div className="relative">
                <div className="w-24 h-24 bg-white rounded-full p-1 shadow-lg">
                  <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
                    {profile.name?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                </div>
                {profile.isVerified && (
                  <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <FiCheckCircle className="w-4 h-4 text-white" />
                  </span>
                )}
              </div>

              <div className="flex-1 text-center sm:text-left">
                {isEditing ? (
                  <div className="max-w-md space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        value={editedProfile?.name || ""}
                        onChange={handleNameChange}
                        className="w-full p-2 rounded-md bg-white text-gray-800 focus:ring-2 focus:ring-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        disabled
                        value={editedProfile?.email || ""}
                        className="w-full p-2 rounded-md bg-white/30 text-white cursor-not-allowed"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-center sm:justify-start gap-3 mb-2">
                      <h1 className="text-2xl sm:text-3xl font-bold">
                        {profile.name}
                      </h1>
                      {profile.isVerified && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Verified
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 text-white/90">
                      <div className="flex items-center gap-2">
                        <FiMail className="w-4 h-4" />
                        <span>{profile.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiUser className="w-4 h-4" />
                        <span>Member since {getAccountAge()}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* profile completion */}
              <div className="w-full sm:w-48">
                <div className="flex justify-between items-center text-white mb-2">
                  <span className="text-sm">Profile</span>
                  <span className="text-sm">{getProfileCompletion()}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div
                    className="bg-white h-2 rounded-full transition-all"
                    style={{ width: `${getProfileCompletion()}%` }}
                  />
                </div>
                <p className="text-xs text-white/80 mt-2">
                  {getProfileCompletion() < 100
                    ? "Verify email to complete your profile"
                    : "Profile complete"}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* KPI cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader
              icon={<FiAward className="w-5 h-5 text-cyan-600" />}
              title="Total points"
              subtitle="Available"
            />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {profile.points}
            </div>
            <ProgressBar
              percentage={Math.min((profile.points / 500) * 100, 100)}
              color={COLORS.primary}
              label={`Next milestone: ${Math.max(500 - profile.points, 0)} pts`}
            />
          </Card>

          <Card>
            <CardHeader
              icon={<FiGift className="w-5 h-5 text-green-600" />}
              title="Rewards redeemed"
              subtitle="Lifetime"
            />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {profile.redeemedRewards}
            </div>
            <div className="text-sm text-gray-500 mt-2">
              {profile.redeemedRewards === 0
                ? "No redemptions yet"
                : "Keep it up"}
            </div>
          </Card>

          <Card>
            <CardHeader
              icon={<FiCalendar className="w-5 h-5 text-blue-600" />}
              title="Account status"
              subtitle="Active"
            />
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {formatDate(profile.createdAt)}
            </div>
            <div className="text-sm text-gray-500 mt-2">
              Last updated: {formatDate(profile.updatedAt)}
            </div>
          </Card>
        </section>

        {/* Analytics */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Analytics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Points over time
              </h4>
              <div className="h-56">
                <Line
                  data={getPointsOverTimeData()}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                      tooltip: { enabled: true },
                    },
                    scales: {
                      x: { grid: { display: false } },
                      y: { beginAtZero: true },
                    },
                  }}
                />
              </div>
            </div>

            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Redemptions by category
              </h4>
              <div className="h-56">
                <Pie
                  data={getRewardDistributionData()}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { position: "right" } },
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      <FloatingActionButton
        onClick={() => navigate("/rewards/create")}
        Icon={FiPlusCircle}
        label="Create reward"
      />
    </div>
  );
};

/* -------------------------
 *  Small presentational helpers
 * ------------------------- */
const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
    {children}
  </div>
);

const CardHeader: React.FC<{
  icon: JSX.Element;
  title: string;
  subtitle?: string;
}> = ({ icon, title, subtitle }) => (
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <div>
        <div className="text-sm text-gray-500">{title}</div>
        {subtitle && <div className="text-xs text-gray-400">{subtitle}</div>}
      </div>
    </div>
  </div>
);

const ProgressBar: React.FC<{
  percentage: number;
  color?: string;
  label?: string;
}> = ({ percentage, color = "#0891b2", label }) => (
  <div className="mt-4">
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
      <div
        className="h-2 rounded-full transition-all"
        style={{ width: `${percentage}%`, backgroundColor: color }}
      />
    </div>
    {label && <div className="text-xs text-gray-500 mt-2">{label}</div>}
  </div>
);

const ActivityRow: React.FC<{
  icon: JSX.Element;
  title: string;
  detail?: string;
}> = ({ icon, title, detail }) => (
  <div className="flex items-start gap-3">
    <div className="w-8 h-8 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center">
      {icon}
    </div>
    <div className="flex-1">
      <div className="flex justify-between items-center">
        <div className="text-sm font-medium text-gray-900 dark:text-white">
          {title}
        </div>
        {detail && (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {detail}
          </div>
        )}
      </div>
    </div>
  </div>
);

/* -------------------------
 *  Utility
 * ------------------------- */
const formatDate = (dateString?: string) =>
  dateString
    ? new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "—";

export default Profile;
