import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/explorer.scss"

// @ts-ignore
import script from "./scripts/explorer.inline"
import { classNames } from "../util/lang"
import { FileTrieNode } from "../util/fileTrie"

type OrderEntries = "sort" | "filter" | "map"

export interface Options {
  title?: string
  folderDefaultState: "collapsed" | "open"
  folderClickBehavior: "collapse" | "link"
  useSavedState: boolean
  sortFn: (a: FileTrieNode, b: FileTrieNode) => number
  filterFn: (node: FileTrieNode) => boolean
  mapFn: (node: FileTrieNode) => void
  order: OrderEntries[]
}

const defaultOptions: Options = {
  folderDefaultState: "collapsed",
  folderClickBehavior: "link",
  useSavedState: true,
  mapFn: (node) => {
    return node
  },
  sortFn: (a, b) => {
    if ((!a.isFolder && !b.isFolder) || (a.isFolder && b.isFolder)) {
      return a.displayName.localeCompare(b.displayName, undefined, {
        numeric: true,
        sensitivity: "base",
      })
    }

    if (!a.isFolder && b.isFolder) {
      return 1
    } else {
      return -1
    }
  },
  filterFn: (node) => node.slugSegment !== "tags" && node.slugSegment !== "private",
  order: ["filter", "map", "sort"],
}

let numExplorers = 0
export default ((userOpts?: Partial<Options>) => {
  const opts: Options = { ...defaultOptions, ...userOpts }

  const Explorer: QuartzComponent = ({ cfg, displayClass }: QuartzComponentProps) => {
    const id = `explorer-${numExplorers++}`
    const categoryTitle = opts.title ?? cfg.pageTitle ?? "Navigation"

    return (
      <div
        id={id}
        class={classNames(displayClass, "explorer", "navi-explorer")}
        data-behavior={opts.folderClickBehavior}
        data-collapsed={opts.folderDefaultState}
        data-savestate={opts.useSavedState}
        data-data-fns={JSON.stringify({
          order: opts.order,
          sortFn: opts.sortFn.toString(),
          filterFn: opts.filterFn.toString(),
          mapFn: opts.mapFn.toString(),
        })}
      >
        <div class="explorer-os-header os">{opts.title ?? "Navigation"}</div>
        <button
          type="button"
          class="explorer-toggle mobile-explorer hide-until-loaded"
          data-mobile={true}
          aria-controls={id}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide-menu"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
          <span class="mobile-explorer-title">{opts.title ?? "Navigation"}</span>
        </button>

        <ul class="navi-root-list" id={`${id}-root-list`}></ul>

        <template id="template-root-folder">
          <li class="navi-root-item navi-folder-item tree" data-folder="">
            <a href="#" class="navi-link">
              <span class="item-text"></span>
              <span class="arrow-indicator"></span>
            </a>
            <div class="navi-sub-popup">
              <div class="scolor subpanel-header">
                <span class="subpanel-title-text"></span>
              </div>
              <ul class="navi-sub-list"></ul>
            </div>
          </li>
        </template>

        <template id="template-root-file">
          <li class="navi-root-item navi-file-item" data-file="">
            <a href="#" class="navi-link">
              <span class="item-text"></span>
            </a>
          </li>
        </template>

        <template id="template-sub-file">
          <li class="navi-sub-item navi-file-item" data-file="">
            <a href="#" class="navi-link">
              <span class="item-text"></span>
            </a>
          </li>
        </template>

        <template id="template-sub-folder">
          <li class="navi-sub-item navi-folder-item tree" data-folder="">
            <a href="#" class="navi-link">
              <span class="item-text"></span>
              <span class="arrow-indicator"></span>
            </a>
            <div class="navi-nested-popup">
              <div class="scolor subpanel-header">
                <span class="subpanel-title-text"></span>
              </div>
              <ul class="navi-nested-list"></ul>
            </div>
          </li>
        </template>
      </div>
    )
  }

  Explorer.css = style
  Explorer.afterDOMLoaded = script
  return Explorer
}) satisfies QuartzComponentConstructor
