// File: CreateReward.tsx
import { useEffect, useRef, useState } from "react";
import { rewardApi } from "../services/api";
import { toast } from "react-hot-toast";
import {
  FiX,
  FiEdit3,
  FiRefreshCw,
  FiCheck,
  FiAlertCircle,
  FiLoader,
  FiPlus,
  FiImage,
  FiCalendar,
  FiTag,
  FiCopy,
  FiShoppingBag,
} from "react-icons/fi";

// Types
interface ParsedCoupon {
  id: string | number;
  file?: File;
  image?: string;
  name?: string;
  description?: string;
  code?: string;
  ["cupon-code"]?: string;
  expiry_date?: string;
  category?: string;
  image_url?: string;
  points?: number;
  status: "parsing" | "parsed" | "failed" | "creating" | "created";
  ocr_text?: string;
}

interface Category {
  _id: string;
  name: string;
  icon: string;
}

const categoriesList: Category[] = [
  { _id: "507f1f77bcf86cd799439011", name: "Gaming", icon: "🎮" },
  { _id: "507f1f77bcf86cd799439012", name: "Shopping", icon: "🛍️" },
  { _id: "507f1f77bcf86cd799439013", name: "Entertainment", icon: "🎬" },
  { _id: "507f1f77bcf86cd799439014", name: "Food & Drinks", icon: "🍽️" },
  { _id: "507f1f77bcf86cd799439015", name: "Travel", icon: "✈️" },
];

const CreateReward = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [parsedResults, setParsedResults] = useState<ParsedCoupon[]>([]);
  const [loading, setLoading] = useState(false);

  /** ---------------------------
   *  Handle Image Upload + Parse
   *  --------------------------- */
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const newItems = files.map((file) => ({
      file,
      id: Date.now() + Math.random(),
      name: "",
      description: "",
      expiry_date: "",
      category: "",
      status: "parsing" as const,
    }));

    setParsedResults((prev) => [...prev, ...newItems]);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const itemId = newItems[i].id;

      try {
        const formData = new FormData();
        formData.append("image_file", file);

        const res = await fetch(
          "https://anandvelpuri-rexa-core.hf.space/extract-coupon/",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();

        const mappedData: ParsedCoupon = {
          id: itemId,
          file,
          name: data.name || "",
          description: data.description || "",
          category: data.category || "",
          ["cupon-code"]: data.code || "",
          expiry_date: data.expiry_date || "",
          image_url: data.image_url || "",
          image: data.image_url || "",
          points: 10,
          status: "parsed",
          ocr_text: data.ocr_text || "",
        };

        setParsedResults((prev) =>
          prev.map((item) => (item.id === itemId ? mappedData : item))
        );
      } catch (err) {
        console.error("Parsing failed:", err);
        setParsedResults((prev) =>
          prev.map((item) =>
            item.id === itemId ? { ...item, status: "failed" } : item
          )
        );
        toast.error("Parsing error");
      }
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /** ---------------------------
   *  Create a single reward
   *  --------------------------- */
  const createSingleReward = async (data: ParsedCoupon, index: number) => {
    try {
      setParsedResults((prev) =>
        prev.map((item, i) =>
          i === index ? { ...item, status: "creating" } : item
        )
      );

      const title = data.name?.trim();
      const description = data.description?.trim();
      const code = (data["cupon-code"]?.trim() || data.code?.trim()) ?? "";
      const expiry = data.expiry_date?.trim();
      const categoryText = data.category?.trim();

      const errors: string[] = [];
      if (!title) errors.push("Title is missing");
      if (!description) errors.push("Description is missing");
      if (!code) errors.push("Coupon code is missing");
      if (!expiry) errors.push("Expiry date is missing");
      if (!categoryText) errors.push("Category is missing");

      if (errors.length) {
        toast.error(`Cannot create reward: ${errors.join(", ")}`);
        setParsedResults((prev) =>
          prev.map((item, i) =>
            i === index ? { ...item, status: "parsed" } : item
          )
        );
        return;
      }

      const categoryMatch = categoriesList.find((cat) =>
        (categoryText || "").toLowerCase().includes(cat.name.toLowerCase())
      );
      const categoryId = categoryMatch?._id || categoriesList[1]._id;

      const points =
        typeof data.points === "number" && !isNaN(data.points)
          ? data.points
          : 10;

      const payload = {
        title,
        description,
        points,
        code,
        expiryDate: expiry,
        category: categoryId,
        imageUrls: data.image_url ? [data.image_url] : [],
        ocrText: data.ocr_text || "",
      };

      await rewardApi.create(payload);

      setParsedResults((prev) =>
        prev.map((item, i) =>
          i === index ? { ...item, status: "created" } : item
        )
      );
      toast.success(`${payload.title} created successfully!`);
    } catch (error: any) {
      const apiError = error?.response?.data;

      if (apiError?.errors && typeof apiError.errors === "object") {
        Object.entries(apiError.errors).forEach(([field, message]) => {
          toast.error(`Error in ${field}: ${message}`);
        });
      } else if (apiError?.message) {
        toast.error(`Failed to create reward: ${apiError.message}`);
      } else {
        toast.error(
          `Failed to create reward: ${error.message || "Unknown error"}`
        );
      }

      setParsedResults((prev) =>
        prev.map((item, i) =>
          i === index ? { ...item, status: "parsed" } : item
        )
      );
    }
  };

  /** ---------------------------
   *  Bulk create all rewards
   *  --------------------------- */
  const handleCreateAll = async () => {
    setLoading(true);
    for (let i = 0; i < parsedResults.length; i++) {
      if (parsedResults[i].status === "parsed") {
        await createSingleReward(parsedResults[i], i);
        await new Promise((res) => setTimeout(res, 500));
      }
    }
    setLoading(false);
    toast.success("All rewards created successfully!");
  };

  /** ---------------------------
   *  Helper actions
   *  --------------------------- */
  const handleRetry = (index: number) => {
    const item = parsedResults[index];
    if (item?.file) {
      handleRemove(index);
      handleImageUpload({ target: { files: [item.file] } } as any);
    }
  };

  const handleRemove = (index: number) => {
    setParsedResults((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEdit = (index: number, field: string, value: string) => {
    setParsedResults((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard!");
  };

  /** ---------------------------
   *  Render
   *  --------------------------- */
  return (
    <div className="h-screen bg-slate-50 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Coupon Manager
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Upload coupons and create rewards automatically.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-2.5 rounded-lg flex items-center justify-center gap-2 font-medium border border-transparent w-full sm:w-auto"
            >
              <FiPlus className="w-4 h-4" />
              Upload Images
            </button>

            {parsedResults.some((p) => p.status === "parsed") && (
              <button
                disabled={loading}
                onClick={handleCreateAll}
                className={`px-6 py-2.5 rounded-lg text-white font-medium flex items-center justify-center gap-2 w-full sm:w-auto ${
                  loading
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-emerald-600 to-green-600 border border-transparent"
                }`}
              >
                {loading ? (
                  <>
                    <FiLoader className="w-4 h-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <FiCheck className="w-4 h-4" />
                    Create All Rewards
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {parsedResults.length === 0 ? (
            <div className="h-full flex flex-col justify-center items-center text-center">
              <div className="bg-gradient-to-br from-cyan-100 to-blue-100 p-8 rounded-2xl mb-6 border border-gray-200">
                <FiImage className="w-16 h-16 text-cyan-600 mx-auto mb-4" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No coupons uploaded yet
              </h3>
              <p className="text-gray-500 max-w-md">
                Upload coupon images to automatically extract details and create
                rewards.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {parsedResults.map((item, index) => (
                <CouponCard
                  key={item.id}
                  item={item}
                  index={index}
                  onEdit={handleEdit}
                  onRemove={handleRemove}
                  onRetry={handleRetry}
                  onCreate={createSingleReward}
                  onCopyCode={copyCode}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/** ---------------------------
 *  Helper - Placeholder SVG generator
 *  (returns base64-encoded data URL to avoid svg encoding edge cases)
 *  --------------------------- */
// small deterministic hash
const hashString = (str = "") => {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  return h >>> 0;
};

const pickColorsFromHash = (hash: number) => {
  // simple palette set
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
  s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const makePlaceholderSvgDataUrl = (item: ParsedCoupon) => {
  const base = `${item.name || ""}|${item.category || ""}|${
    item.description || ""
  }`;
  const h = hashString(base);
  const [c1, c2] = pickColorsFromHash(h);
  const icon =
    (item.category &&
      categoriesList.find((c) =>
        (item.category || "").toLowerCase().includes(c.name.toLowerCase())
      )?.icon) ||
    // fallback - first letter of name or "C"
    (item.name && item.name.trim()[0].toUpperCase()) ||
    "C";

  const title = (item.name || "").slice(0, 30);
  const sub = (item.category || "").slice(0, 24);

  // Create a subtle geometric pattern seed so each svg is different -  using hash
  const rotation = h % 360;
  const dotOffset = (h % 20) + 6;

  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='1200' height='720' viewBox='0 0 1200 720' role='img' aria-label='${escapeXml(
      title || sub || "coupon"
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
            ${escapeXml(title || sub || "Coupon")}
          </text>
          <text x='0' y='52' font-size='20' fill='rgba(255,255,255,0.9)' font-family='Inter, ui-sans-serif'>
            ${escapeXml(sub || (item.description || "").slice(0, 60))}
          </text>
        </g>



      </g>
    </svg>`.trim();

  // produce base64 data URL (handles unicode safely)
  try {
    let encoded: string;
    if (typeof window !== "undefined" && typeof window.btoa === "function") {
      // browser-safe pipeline for unicode -> base64
      encoded = window.btoa(unescape(encodeURIComponent(svg)));
    } else if (typeof Buffer !== "undefined") {
      // node / SSR fallback
      encoded = Buffer.from(svg, "utf8").toString("base64");
    } else {
      // ultimate fallback to URI-encoded svg
      return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
    }
    return `data:image/svg+xml;base64,${encoded}`;
  } catch (err) {
    // fallback to URI-encoded if base64 fails
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }
};

/** ---------------------------
 *  Coupon Card Component
 *  --------------------------- */
const CouponCard = ({
  item,
  index,
  onEdit,
  onRemove,
  onRetry,
  onCreate,
  onCopyCode,
}: {
  item: ParsedCoupon;
  index: number;
  onEdit: (index: number, field: string, value: string) => void;
  onRemove: (index: number) => void;
  onRetry: (index: number) => void;
  onCreate: (item: ParsedCoupon, index: number) => void;
  onCopyCode: (code: string) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    points: item.points || 10,
    code: item["cupon-code"] || item.code || "",
  });
  const [highlightMissingCode, setHighlightMissingCode] = useState(false);

  // update local editData when the item prop changes
  // (useful after re-parsing or updates)
  useEffect(() => {
    setEditData({
      points: item.points || 10,
      code: item["cupon-code"] || item.code || "",
    });
  }, [item.points, item["cupon-code"], item.code]);

  const handleSaveEdit = () => {
    // save points
    onEdit(index, "points", String(editData.points));
    // save code (store under cupon-code field so the rest of the flow recognizes it)
    onEdit(index, "cupon-code", editData.code);
    setIsEditing(false);
    // clear highlight if code present
    if (editData.code && editData.code.trim()) setHighlightMissingCode(false);
  };

  const missingCode = !(
    item["cupon-code"] ||
    item.code ||
    editData.code?.trim()
  );

  const handleAttemptCreate = () => {
    if (missingCode) {
      // visual highlight + toast feedback
      setHighlightMissingCode(true);
      toast.error(
        "Coupon code is missing. Please add the code before creating the reward."
      );
      // expand editor to let user add code
      setIsEditing(true);
      return;
    }
    onCreate(item, index);
  };

  const getStatusColor = (status: ParsedCoupon["status"]) => {
    switch (status) {
      case "parsing":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "parsed":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "failed":
        return "bg-red-100 text-red-700 border-red-200";
      case "creating":
        return "bg-cyan-100 text-cyan-700 border-cyan-200";
      case "created":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: ParsedCoupon["status"]) => {
    switch (status) {
      case "parsing":
      case "creating":
        return <FiLoader className="w-3 h-3 animate-spin" />;
      case "parsed":
      case "created":
        return <FiCheck className="w-3 h-3" />;
      case "failed":
        return <FiAlertCircle className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const imageSrc =
    item.image_url && item.image_url.trim()
      ? item.image_url
      : item.image && item.image.trim()
      ? item.image
      : makePlaceholderSvgDataUrl(item);

  return (
    <div
      className={`rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border flex flex-col h-full bg-white
        ${
          highlightMissingCode || missingCode
            ? "border-red-300 ring-1 ring-red-100"
            : "border-gray-100"
        }
      `}
    >
      {imageSrc && (
        <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
          <img
            src={imageSrc}
            alt={item.name || "Coupon"}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              const el = e.currentTarget as HTMLImageElement;
              const placeholder = makePlaceholderSvgDataUrl(item);
              if (!el.dataset.fallbackTried) {
                if (el.src !== placeholder) {
                  el.src = placeholder;
                  el.dataset.fallbackTried = "1";
                  return;
                }
              }
              el.src =
                "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
        </div>
      )}

      <div className="p-4 flex flex-col flex-1 justify-between">
        <div className="flex justify-between items-start mb-3">
          <span
            role="status"
            aria-live="polite"
            className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
              item.status
            )}`}
          >
            {getStatusIcon(item.status)}
            <span className="capitalize">
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </span>
          </span>

          <div className="flex items-center gap-2">
            {item.status === "parsed" && (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="inline-flex items-center gap-2 px-2 py-1 rounded-md text-sm text-gray-600 hover:bg-gray-100 transition"
                aria-pressed={isEditing}
                aria-label="Edit"
                title="Edit"
              >
                <FiEdit3 className="w-4 h-4 text-gray-500" />
                <span>Edit</span>
              </button>
            )}

            {item.status === "failed" && (
              <button
                onClick={() => onRetry(index)}
                className="p-2 rounded-md text-gray-600 hover:bg-gray-100 transition"
                aria-label="Retry parsing"
                title="Retry parsing"
              >
                <FiRefreshCw className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => onRemove(index)}
              className="p-2 rounded-md text-red-500 hover:bg-red-50 transition"
              aria-label="Remove coupon"
              title="Remove"
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>
        </div>

        {isEditing ? (
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Points</label>
              <input
                type="number"
                min={1}
                value={editData.points}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    points: Math.max(1, parseInt(e.target.value || "0")),
                  })
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveEdit();
                  if (e.key === "Escape") setIsEditing(false);
                }}
                placeholder="Points"
                className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-300"
                aria-label="Points"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Coupon code
              </label>
              <input
                type="text"
                value={editData.code}
                onChange={(e) =>
                  setEditData((prev) => ({ ...prev, code: e.target.value }))
                }
                placeholder="Enter coupon code (required to create reward)"
                className={`w-full p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                  highlightMissingCode && !editData.code?.trim()
                    ? "border-red-300 focus:ring-red-200"
                    : "border-gray-200 focus:ring-cyan-300"
                }`}
                aria-label="Coupon code"
              />
              {highlightMissingCode && !editData.code?.trim() && (
                <p className="text-xs text-red-600 mt-1">
                  Coupon code is required.
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleSaveEdit}
                className="flex-1 bg-emerald-600 text-white py-2 rounded-lg text-sm hover:bg-emerald-700 transition"
                aria-label="Save"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditData({
                    points: item.points || 10,
                    code: item["cupon-code"] || item.code || "",
                  });
                }}
                className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm hover:bg-gray-200 transition"
                aria-label="Cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3 flex flex-col flex-1 justify-between">
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-800 text-base line-clamp-2">
                {item.name || "Unnamed Coupon"}
              </h3>

              {item.description && (
                <p className="text-sm text-gray-600 line-clamp-2">
                  {item.description}
                </p>
              )}

              {/* CODE BLOCK */}
              {item["cupon-code"] || item.code ? (
                <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
                  <FiTag className="w-4 h-4 text-gray-500" />
                  <span
                    className="font-mono text-sm text-gray-700 truncate"
                    title={item["cupon-code"] || item.code}
                  >
                    {item["cupon-code"] || item.code}
                  </span>
                  <button
                    onClick={() => onCopyCode(item["cupon-code"] || item.code!)}
                    className="ml-auto p-1 hover:bg-gray-200 rounded-md"
                    title="Copy code"
                    aria-label="Copy coupon code"
                  >
                    <FiCopy className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              ) : (
                // missing code - clear feedback
                <div className="rounded-lg p-2 bg-red-50 border border-red-100 text-sm text-red-700">
                  <div className="flex items-start gap-2">
                    <FiAlertCircle className="w-4 h-4 mt-0.5 text-red-600" />
                    <div>
                      <div className="font-medium">
                        Coupon code not detected
                      </div>
                      <div className="text-xs text-red-600 mt-0.5">
                        This cant be added
                      </div>
                      <div className="mt-2 flex gap-2">
                        <button onClick={() => {}}></button>
                        <button onClick={() => {}}></button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {item.expiry_date && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FiCalendar className="w-4 h-4" />
                  <span>Expires: {item.expiry_date}</span>
                </div>
              )}

              {item.category && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FiShoppingBag className="w-4 h-4" />
                  <span>{item.category}</span>
                </div>
              )}
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                {item.points || 10} pts
              </span>

              {item.status === "parsed" && (
                <button
                  onClick={handleAttemptCreate}
                  disabled={missingCode}
                  className={`text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 transition
                    ${
                      missingCode
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-gradient-to-r from-cyan-600 to-blue-600 hover:opacity-95"
                    }
                  `}
                  aria-label={
                    missingCode ? "Coupon code missing" : "Create reward"
                  }
                  title={
                    missingCode
                      ? "Add coupon code to enable creation"
                      : "Create reward"
                  }
                >
                  <FiCheck className="w-4 h-4" />
                  <span>{missingCode ? "Missing code" : "Create Reward"}</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateReward;
