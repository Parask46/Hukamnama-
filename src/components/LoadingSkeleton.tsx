export default function LoadingSkeleton() {
  return (
    <div
      className="mx-auto w-full"
      style={{
        maxWidth: "720px",
        background: "rgba(13,27,42,0.85)",
        border: "1px solid rgba(201, 147, 58, 0.2)",
        borderRadius: "16px",
        padding: "clamp(1.5rem, 4vw, 2.5rem)",
      }}
      aria-busy="true"
      aria-label="Loading Hukamnama…"
    >
      {/* Meta badges */}
      <div className="flex justify-center gap-3 mb-6">
        <SkeletonBar width="80px" height="24px" rounded />
        <SkeletonBar width="120px" height="24px" rounded />
      </div>

      {/* Verses */}
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="mb-6">
          <SkeletonBar width="90%" height="28px" className="mx-auto mb-2" />
          <SkeletonBar width="70%" height="18px" className="mx-auto" />
        </div>
      ))}
    </div>
  );
}

function SkeletonBar({
  width,
  height,
  rounded,
  className = "",
}: {
  width: string;
  height: string;
  rounded?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`shimmer ${className}`}
      style={{
        width,
        height,
        borderRadius: rounded ? "999px" : "6px",
      }}
    />
  );
}
