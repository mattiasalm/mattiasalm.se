(function () {
    'use strict';

    const defaultConfig = {
        classNameActiveLinkInNavigation: 'active-link',
        classNameKeyboardNavigationActive: 'keyboard-nav',
        classNamePageTransition: '',
        classNameRemovalDelayPageTransition: 0,
        classNameRemovalDelaySplashLoading: 0,
        classNameSplashLoading: '',
        directoryContent: 'content',
        domSelectorBody: 'body',
        domSelectorContent: '#content',
        domSelectorNavigation: '#nav',
        pathFileNotFound: '/404',
        pathToIndexContent: '/index',
        pathToNavigationContent: '',
        loadIndexContentOnLoad: false,
    };
    let config = {
        ...defaultConfig,
    };
    const setConfig = (newConfig) => (config = Object.assign(config, newConfig));

    const _elements = {};
    const _setElement = (name, selector) => {
        const elementRef = document.querySelector(selector);
        return !!elementRef ? (_elements[name] = elementRef) : null;
    };
    const elementReference = {
        get body() {
            return _elements.body || _setElement('body', config.domSelectorBody);
        },
        get navigation() {
            return (_elements.navigation ||
                _setElement('navigation', config.domSelectorNavigation));
        },
        get content() {
            return (_elements.content || _setElement('content', config.domSelectorContent));
        },
    };

    // Remove leading slash in string
    const stripLeadingSlash = (str) => str.replace(/^\/+/i, '');
    const wait = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    //
    // Check if url is considered to be a relative path
    const isRelativeUrl = (url) => url.indexOf('://') < 1 && url.indexOf('//') !== 0;
    //
    // Check if is running on a Mac
    const isMac = () => window.navigator.appVersion.includes('Mac');
    //
    // Create full URL from path and append content folder and extension
    const createContentUrlFromPath = (path) => {
        let newPath = stripLeadingSlash(path);
        if (newPath === '') {
            newPath = config.pathToIndexContent;
        }
        return `${config.directoryContent}/${newPath}.html`;
    };
    //
    // Add class on all links that match current path
    // and remove class on the others
    const setActiveLinks = (parent, currentPath) => {
        if (!(parent instanceof Element)) {
            return;
        }
        const linkElements = parent.querySelectorAll('a');
        const links = [...Array.from(linkElements)];
        // Set inactive
        links.forEach((link) => removeClassFromElement(link, config.classNameActiveLinkInNavigation));
        // Set active
        links
            .filter((link) => !!link.getAttribute('href') &&
            stripLeadingSlash(link.getAttribute('href') || '') ===
                stripLeadingSlash(currentPath))
            .forEach((link) => addClassFromElement(link, config.classNameActiveLinkInNavigation));
    };
    const hideSplashLoading = (loadingTime) => {
        if (loadingTime > config.classNameRemovalDelaySplashLoading) {
            if (!!elementReference.body) {
                removeClassFromElement(elementReference.body, config.classNameSplashLoading);
            }
        }
        else {
            setTimeout(() => {
                if (!!elementReference.body) {
                    removeClassFromElement(elementReference.body, config.classNameSplashLoading);
                }
            }, config.classNameRemovalDelaySplashLoading - loadingTime);
        }
    };
    const removeClassFromElement = (element, className) => {
        if (element instanceof Element && !!className) {
            element.classList.remove(className);
        }
    };
    const addClassFromElement = (element, className) => {
        if (element instanceof Element && !!className) {
            element.classList.add(className);
        }
    };
    //
    // Async fetch content from URL and return as text
    const getHtmlFromUrl = async (url) => {
        const response = await fetch(url);
        if (response.status >= 400 && response.status < 600) {
            throw new Error('File not found');
        }
        return await response.text();
    };

    const currentPath = () => window.location.pathname;
    const setNewPath = (newPath) => currentPath() === newPath
        ? undefined
        : history.pushState('', newPath, newPath);
    const closeNavigation = () => {
        if (!!elementReference.navigation) {
            const inputElem = elementReference.navigation.querySelector('input');
            if (!!inputElem && inputElem.checked) {
                inputElem.checked = false;
            }
        }
    };
    const setActiveLinksInNavigation = () => {
        if (!!elementReference.navigation) {
            setActiveLinks(elementReference.navigation, currentPath());
        }
    };

    //
    // Remove all child nodes in parent element
    const removeChildNodes = (parent) => {
        while (parent instanceof Element && parent.firstChild) {
            parent.firstChild.remove();
        }
    };
    //
    // Add child node to parent element
    const addChildNode = (parent, child) => {
        if (parent instanceof Element && !!child) {
            parent.appendChild(child);
        }
    };
    //
    // Create element nodes from HTML text string
    const createNodesFromHtmlString = (html) => {
        const template = document.createElement('template');
        template.innerHTML = html;
        return [...Array.from(template.content.childNodes)];
    };
    const replaceNodesFromHtmlString = (parent, htmlString) => {
        removeChildNodes(parent);
        createNodesFromHtmlString(htmlString).forEach((child) => addChildNode(parent, child));
    };

    //
    // Fetch new content based on path and mount it in the DOM #content container
    const loadContent = async (path) => {
        const url = createContentUrlFromPath(path);
        const html = await getHtmlFromUrl(url).catch((err) => {
            // CHECK STATUS HERE
            if (path !== config.pathFileNotFound) {
                return loadContent(config.pathFileNotFound);
            }
            throw new Error(err);
        });
        if (!!html && elementReference.content) {
            if (!!config.classNamePageTransition) {
                addClassFromElement(elementReference.body, config.classNamePageTransition);
                if (config.classNameRemovalDelayPageTransition > 0) {
                    await wait(config.classNameRemovalDelayPageTransition);
                }
                replaceNodesFromHtmlString(elementReference.content, html);
                setNewPath(path);
                removeClassFromElement(elementReference.body, config.classNamePageTransition);
            }
            else {
                replaceNodesFromHtmlString(elementReference.content, html);
                setNewPath(path);
            }
        }
    };
    //
    // Fetch nav content and mount it in the DOM #nav container
    const loadNavigation = async () => {
        if (!config.pathToNavigationContent) {
            return Promise.resolve();
        }
        const url = createContentUrlFromPath(config.pathToNavigationContent);
        const html = await getHtmlFromUrl(url).catch((err) => {
            throw new Error(err);
        });
        if (!!html && !!elementReference.navigation) {
            replaceNodesFromHtmlString(elementReference.navigation, html);
        }
    };

    //
    // On window load event (when all linked resources has been loaded)
    // read path from window URL and load content corresponding to that
    // also load nav content
    const onLoad = () => {
        const timeStart = performance.now();
        let contentToLoad = [loadNavigation()];
        if (currentPath() !== '/' || config.loadIndexContentOnLoad) {
            contentToLoad = [...contentToLoad, loadContent(currentPath())];
        }
        Promise.all(contentToLoad).then(() => {
            setActiveLinksInNavigation();
            hideSplashLoading(performance.now() - timeStart);
        });
    };
    //
    // Catch all click events that has and anchor as target
    // and prevent all relative link paths from reloading the page.
    // Load the new content in the #content container instead
    const onClick = (event) => {
        // Turn of keyboard navigation highlight
        if (event.clientX && event.clientY) {
            removeClassFromElement(elementReference.body, config.classNameKeyboardNavigationActive);
        }
        if (event.target instanceof Element) {
            const clickedElement = event.target;
            // Dont do anything if the clicked target is not an A-tag
            if (clickedElement.tagName.toLowerCase() !== 'a') {
                return;
            }
            // Check if the path is relative to this site
            const path = clickedElement.getAttribute('href');
            if (!!path && isRelativeUrl(path)) {
                // Check if the link target is intended to be opened in a new tab or window.
                const newTab = (isMac() && event.metaKey) || (!isMac() && event.ctrlKey);
                const newWindow = event.shiftKey;
                if (newTab || newWindow) {
                    return;
                }
                // Load new content based on relative link path
                event.preventDefault();
                closeNavigation();
                loadContent(path).then(() => setActiveLinksInNavigation());
            }
        }
    };
    //
    // When back button is clicked in browser update the content
    // corresponding to the path
    const onPopState = (event) => {
        event.preventDefault();
        closeNavigation();
        loadContent(currentPath()).then(() => setActiveLinksInNavigation());
    };
    const onKeyUp = (event) => {
        // If using TAB key to navigate; enable keyboard navigation classname to body
        if (event.which === 9) {
            addClassFromElement(elementReference.body, config.classNameKeyboardNavigationActive);
        }
        // Close the menu by pressing ESC if it is open
        if (event.which === 27) {
            closeNavigation();
        }
    };

    const init = (newConfig) => {
        window.onload = onLoad;
        window.onclick = onClick;
        window.onpopstate = onPopState;
        window.onkeyup = onKeyUp;
        if (!!newConfig) {
            setConfig(newConfig);
        }
    };

    init();

}());
//# sourceMappingURL=main.js.map
