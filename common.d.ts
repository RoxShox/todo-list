// declare module "*.svg" {
// 	const content: any
// 	export default content
// }

// declare module "*.png" {
// 	const content: any
// 	export default content
// }

declare module "*uuid" {
	const content: any
	export default content
}

declare module "*.scss" {
	const content: Record<string, string>
	export default content
}

// declare module "*.svg" {
// 	import React = require("react")
// 	export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
// 	const src: string
// 	export default src
// }
