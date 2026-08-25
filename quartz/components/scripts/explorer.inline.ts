import { FileTrieNode } from "../../util/fileTrie"
import { FullSlug, resolveRelative, simplifySlug } from "../../util/path"
import { ContentDetails } from "../../plugins/emitters/contentIndex"

interface ParsedOptions {
  folderClickBehavior: "collapse" | "link"
  folderDefaultState: "collapsed" | "open"
  useSavedState: boolean
  sortFn: (a: FileTrieNode, b: FileTrieNode) => number
  filterFn: (node: FileTrieNode) => boolean
  mapFn: (node: FileTrieNode) => void
  order: "sort" | "filter" | "map"[]
}

function adjustPopupPosition(itemLi: HTMLElement, popup: HTMLElement) {
  const rect = itemLi.getBoundingClientRect()
  const windowHeight = window.innerHeight
  const popupHeight = popup.offsetHeight || 250

  if (rect.top + popupHeight > windowHeight - 20) {
    const shift = (rect.top + popupHeight) - (windowHeight - 20)
    const newTop = -Math.min(shift, rect.top - 10)
    popup.style.top = `${newTop}px`
  } else {
    popup.style.top = "0px"
  }
}

function renderNestedNodes(
  currentSlug: FullSlug,
  nodes: FileTrieNode[],
  parentUl: HTMLUListElement,
  subFileTemplate: HTMLTemplateElement,
  subFolderTemplate: HTMLTemplateElement,
) {
  for (const node of nodes) {
    if (node.isFolder) {
      if (node.children.length === 0) continue

      const clone = subFolderTemplate.content.cloneNode(true) as DocumentFragment
      const li = clone.querySelector("li") as HTMLLIElement
      const a = li.querySelector("a.navi-link") as HTMLAnchorElement
      const textSpan = li.querySelector(".item-text") as HTMLElement
      const nestedUl = li.querySelector(".navi-nested-list") as HTMLUListElement
      const subpanelTitle = li.querySelector(".subpanel-title-text") as HTMLElement | null
      const nestedPopup = li.querySelector(".navi-nested-popup") as HTMLElement | null

      li.dataset.folder = node.slug
      a.href = resolveRelative(currentSlug, node.slug)
      a.dataset.for = node.slug
      textSpan.textContent = node.displayName
      if (subpanelTitle) subpanelTitle.textContent = node.displayName

      if (currentSlug === node.slug) {
        a.classList.add("active")
      }

      renderNestedNodes(currentSlug, node.children, nestedUl, subFileTemplate, subFolderTemplate)

      if (nestedPopup) {
        const onEnter = () => adjustPopupPosition(li, nestedPopup)
        li.addEventListener("mouseenter", onEnter)
        li.addEventListener("focusin", onEnter)
        window.addCleanup(() => {
          li.removeEventListener("mouseenter", onEnter)
          li.removeEventListener("focusin", onEnter)
        })
      }

      parentUl.appendChild(li)
    } else {
      const clone = subFileTemplate.content.cloneNode(true) as DocumentFragment
      const li = clone.querySelector("li") as HTMLLIElement
      const a = li.querySelector("a.navi-link") as HTMLAnchorElement
      const textSpan = li.querySelector(".item-text") as HTMLElement

      li.dataset.file = node.slug
      a.href = resolveRelative(currentSlug, node.slug)
      a.dataset.for = node.slug
      textSpan.textContent = node.displayName

      if (currentSlug === node.slug) {
        a.classList.add("active")
      }

      parentUl.appendChild(li)
    }
  }
}

async function setupExplorer(currentSlug: FullSlug) {
  const allExplorers = document.querySelectorAll("div.explorer") as NodeListOf<HTMLElement>

  for (const explorer of allExplorers) {
    const dataFns = JSON.parse(explorer.dataset.dataFns || "{}")
    const opts: ParsedOptions = {
      folderClickBehavior: (explorer.dataset.behavior || "collapse") as "collapse" | "link",
      folderDefaultState: (explorer.dataset.collapsed || "collapsed") as "collapsed" | "open",
      useSavedState: explorer.dataset.savestate === "true",
      order: dataFns.order || ["filter", "map", "sort"],
      sortFn: new Function("return " + (dataFns.sortFn || "undefined"))(),
      filterFn: new Function("return " + (dataFns.filterFn || "undefined"))(),
      mapFn: new Function("return " + (dataFns.mapFn || "undefined"))(),
    }

    const rootList = explorer.querySelector(".navi-root-list") as HTMLUListElement | null
    if (!rootList) continue

    rootList.innerHTML = ""

    const data = await fetchData
    const entries = [...Object.entries(data)] as [FullSlug, ContentDetails][]
    const trie = FileTrieNode.fromEntries(entries)

    for (const fn of opts.order) {
      switch (fn) {
        case "filter":
          if (opts.filterFn) trie.filter(opts.filterFn)
          break
        case "map":
          if (opts.mapFn) trie.map(opts.mapFn)
          break
        case "sort":
          if (opts.sortFn) trie.sort(opts.sortFn)
          break
      }
    }

    const tplRootFolder = document.getElementById("template-root-folder") as HTMLTemplateElement
    const tplRootFile = document.getElementById("template-root-file") as HTMLTemplateElement
    const tplSubFile = document.getElementById("template-sub-file") as HTMLTemplateElement
    const tplSubFolder = document.getElementById("template-sub-folder") as HTMLTemplateElement

    if (!tplRootFolder || !tplRootFile || !tplSubFile || !tplSubFolder) continue

    for (const child of trie.children) {
      if (child.isFolder && child.children.length > 0) {
        // Create root category item with nested popup
        const rootFolderFrag = tplRootFolder.content.cloneNode(true) as DocumentFragment
        const rootLi = rootFolderFrag.querySelector("li") as HTMLLIElement
        const rootA = rootLi.querySelector("a.navi-link") as HTMLAnchorElement
        const rootText = rootLi.querySelector(".item-text") as HTMLElement
        const subPopup = rootLi.querySelector(".navi-sub-popup") as HTMLElement
        const subpanelTitle = rootLi.querySelector(".subpanel-title-text") as HTMLElement
        const subList = rootLi.querySelector(".navi-sub-list") as HTMLUListElement

        rootLi.dataset.folder = child.slug
        rootA.href = resolveRelative(currentSlug, child.slug)
        rootA.dataset.for = child.slug
        rootText.textContent = child.displayName
        subpanelTitle.textContent = child.displayName

        const simpleChildSlug = simplifySlug(child.slug)
        const simpleCurrent = simplifySlug(currentSlug)
        if (simpleCurrent === simpleChildSlug || simpleCurrent.startsWith(simpleChildSlug + "/")) {
          rootLi.classList.add("active-parent")
        }

        renderNestedNodes(currentSlug, child.children, subList, tplSubFile, tplSubFolder)

        const onEnter = () => adjustPopupPosition(rootLi, subPopup)
        rootLi.addEventListener("mouseenter", onEnter)
        rootLi.addEventListener("focusin", onEnter)
        window.addCleanup(() => {
          rootLi.removeEventListener("mouseenter", onEnter)
          rootLi.removeEventListener("focusin", onEnter)
        })

        rootList.appendChild(rootLi)
      } else {
        // Standalone root file
        const rootFileFrag = tplRootFile.content.cloneNode(true) as DocumentFragment
        const rootLi = rootFileFrag.querySelector("li") as HTMLLIElement
        const rootA = rootLi.querySelector("a.navi-link") as HTMLAnchorElement
        const rootText = rootLi.querySelector(".item-text") as HTMLElement

        rootLi.dataset.file = child.slug
        rootA.href = resolveRelative(currentSlug, child.slug)
        rootA.dataset.for = child.slug
        rootText.textContent = child.displayName

        if (currentSlug === child.slug) {
          rootA.classList.add("active")
        }

        rootList.appendChild(rootLi)
      }
    }

    // Mobile toggle handler
    const mobileToggle = explorer.querySelector(".mobile-explorer") as HTMLElement | null
    if (mobileToggle) {
      const onMobileToggle = () => {
        const isCollapsed = explorer.classList.toggle("collapsed")
        explorer.setAttribute("aria-expanded", isCollapsed ? "false" : "true")
        if (!isCollapsed) {
          document.documentElement.classList.add("mobile-no-scroll")
        } else {
          document.documentElement.classList.remove("mobile-no-scroll")
        }
      }
      mobileToggle.addEventListener("click", onMobileToggle)
      window.addCleanup(() => mobileToggle.removeEventListener("click", onMobileToggle))
    }
  }
}

document.addEventListener("nav", async (e: CustomEventMap["nav"]) => {
  const currentSlug = e.detail.url
  await setupExplorer(currentSlug)

  for (const explorer of document.getElementsByClassName("explorer")) {
    const mobileExplorer = explorer.querySelector(".mobile-explorer")
    if (!mobileExplorer) continue

    if (mobileExplorer.checkVisibility()) {
      explorer.classList.add("collapsed")
      explorer.setAttribute("aria-expanded", "false")
      document.documentElement.classList.remove("mobile-no-scroll")
    }

    mobileExplorer.classList.remove("hide-until-loaded")
  }
})

