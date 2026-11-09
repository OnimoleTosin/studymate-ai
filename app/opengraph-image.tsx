import { ImageResponse } from "next/og";

export const alt = "StudyMate AI — Study smarter with AI";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#030712",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            color: "#a3e635",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          StudyMate AI
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "36px",
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.1,
          }}
        >
          Study smarter
          <br />
          with AI.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "28px",
            color: "#d1d5db",
            fontSize: 30,
          }}
        >
          Turn your notes into summaries, quizzes, and explanations.
        </div>
      </div>
    ),
    size,
  );
}
