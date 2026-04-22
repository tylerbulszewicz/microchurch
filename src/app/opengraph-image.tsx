import { ImageResponse } from "next/og";

export const alt = "Charlotte Microchurch";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "edge";

/**
 * Open Graph / social preview: same look as the favicon — cream field with a Latin cross.
 * (Favicon is a vector at small size; this is a larger raster for link previews.)
 */
export default function OpenGraphImage() {
	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					background: "#f7f4ef",
					position: "relative",
				}}
			>
				{/* vertical beam */}
				<div
					style={{
						position: "absolute",
						width: 36,
						height: 400,
						left: 582,
						top: 115,
						background: "#121212",
						borderRadius: 10,
					}}
				/>
				{/* crossbeam, upper third */}
				<div
					style={{
						position: "absolute",
						width: 280,
						height: 32,
						left: 460,
						top: 200,
						background: "#121212",
						borderRadius: 10,
					}}
				/>
			</div>
		),
		{ ...size },
	);
}
