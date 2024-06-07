import React from "react"
import styles from "../styles/modules/title.module.scss"

type PageTitleProps = {
	children: React.ReactNode
}

function PageTitle({ children, ...rest }: PageTitleProps) {
	return (
		<p className={styles.title} {...rest}>
			{children}
		</p>
	)
}

export default PageTitle
