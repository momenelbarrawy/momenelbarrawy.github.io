import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  return (
    <h2 class={classNames(displayClass, "page-title")}>
      <a href={baseDir}>{title}</a>
    </h2>
  )
}

PageTitle.css = `
.page-title {
  font-size: 13px;
  font-weight: bold;
  letter-spacing: 2px;
  margin: 0;
  padding: 6px 10px;
  background-color: #333333;
  color: #f0f8ff;
  border-bottom: 1px solid #696969;
  text-align: center;
  font-family: var(--headerFont, 'Lucida Grande', 'Hiragino Kaku Gothic ProN', Meiryo, sans-serif);
}
.page-title a {
  color: #f0f8ff;
  text-decoration: none;
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor

