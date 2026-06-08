module.exports = [
"[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/merge-props/mergeProps.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "makeEventPreventable",
    ()=>makeEventPreventable,
    "mergeClassNames",
    ()=>mergeClassNames,
    "mergeProps",
    ()=>mergeProps,
    "mergePropsN",
    ()=>mergePropsN
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$mergeObjects$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+utils@0.2.9_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/esm/mergeObjects.js [app-ssr] (ecmascript)");
;
const EMPTY_PROPS = {};
function mergeProps(a, b, c, d, e) {
    if (!c && !d && !e && !a) {
        return createInitialMergedProps(b);
    }
    // We need to mutably own `merged`.
    let merged = createInitialMergedProps(a);
    if (b) {
        merged = mergeInto(merged, b);
    }
    if (c) {
        merged = mergeInto(merged, c);
    }
    if (d) {
        merged = mergeInto(merged, d);
    }
    if (e) {
        merged = mergeInto(merged, e);
    }
    return merged;
}
function mergePropsN(props) {
    if (props.length === 0) {
        return EMPTY_PROPS;
    }
    if (props.length === 1) {
        return createInitialMergedProps(props[0]);
    }
    // We need to mutably own `merged`.
    let merged = createInitialMergedProps(props[0]);
    for(let i = 1; i < props.length; i += 1){
        merged = mergeInto(merged, props[i]);
    }
    return merged;
}
function createInitialMergedProps(inputProps) {
    if (isPropsGetter(inputProps)) {
        // Getter-returned handlers intentionally keep their existing semantics.
        return {
            ...resolvePropsGetter(inputProps, EMPTY_PROPS)
        };
    }
    return copyInitialProps(inputProps);
}
function mergeInto(merged, inputProps) {
    if (isPropsGetter(inputProps)) {
        return resolvePropsGetter(inputProps, merged);
    }
    return mutablyMergeInto(merged, inputProps);
}
function copyInitialProps(inputProps) {
    const copiedProps = {
        ...inputProps
    };
    // `copiedProps` is our fresh own-object copy, so iterating with `for...in` is safe here.
    // eslint-disable-next-line guard-for-in
    for(const propName in copiedProps){
        const propValue = copiedProps[propName];
        if (isEventHandler(propName, propValue)) {
            copiedProps[propName] = wrapEventHandler(propValue);
        }
    }
    return copiedProps;
}
/**
 * Merges two sets of props. In case of conflicts, the external props take precedence.
 */ function mutablyMergeInto(mergedProps, externalProps) {
    if (!externalProps) {
        return mergedProps;
    }
    // eslint-disable-next-line guard-for-in
    for(const propName in externalProps){
        const externalPropValue = externalProps[propName];
        switch(propName){
            case 'style':
                {
                    mergedProps[propName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$mergeObjects$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeObjects"])(mergedProps.style, externalPropValue);
                    break;
                }
            case 'className':
                {
                    mergedProps[propName] = mergeClassNames(mergedProps.className, externalPropValue);
                    break;
                }
            default:
                {
                    if (isEventHandler(propName, externalPropValue)) {
                        mergedProps[propName] = mergeEventHandlers(mergedProps[propName], externalPropValue);
                    } else {
                        mergedProps[propName] = externalPropValue;
                    }
                }
        }
    }
    return mergedProps;
}
function isEventHandler(key, value) {
    // This approach is more efficient than using a regex.
    const code0 = key.charCodeAt(0);
    const code1 = key.charCodeAt(1);
    const code2 = key.charCodeAt(2);
    return code0 === 111 /* o */  && code1 === 110 /* n */  && code2 >= 65 /* A */  && code2 <= 90 /* Z */  && (typeof value === 'function' || typeof value === 'undefined');
}
function isPropsGetter(inputProps) {
    return typeof inputProps === 'function';
}
function resolvePropsGetter(inputProps, previousProps) {
    if (isPropsGetter(inputProps)) {
        return inputProps(previousProps);
    }
    return inputProps ?? EMPTY_PROPS;
}
function mergeEventHandlers(ourHandler, theirHandler) {
    if (!theirHandler) {
        return ourHandler;
    }
    if (!ourHandler) {
        return wrapEventHandler(theirHandler);
    }
    return (...args)=>{
        const event = args[0];
        if (isSyntheticEvent(event)) {
            const baseUIEvent = event;
            makeEventPreventable(baseUIEvent);
            const result = theirHandler(...args);
            if (!baseUIEvent.baseUIHandlerPrevented) {
                ourHandler?.(...args);
            }
            return result;
        }
        const result = theirHandler(...args);
        ourHandler?.(...args);
        return result;
    };
}
function wrapEventHandler(handler) {
    if (!handler) {
        return handler;
    }
    return (...args)=>{
        const event = args[0];
        if (isSyntheticEvent(event)) {
            makeEventPreventable(event);
        }
        return handler(...args);
    };
}
function makeEventPreventable(event) {
    event.preventBaseUIHandler = ()=>{
        event.baseUIHandlerPrevented = true;
    };
    return event;
}
function mergeClassNames(ourClassName, theirClassName) {
    if (theirClassName) {
        if (ourClassName) {
            // eslint-disable-next-line prefer-template
            return theirClassName + ' ' + ourClassName;
        }
        return theirClassName;
    }
    return ourClassName;
}
function isSyntheticEvent(event) {
    return event != null && typeof event === 'object' && 'nativeEvent' in event;
}
}),
"[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/utils/resolveClassName.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * If the provided className is a string, it will be returned as is.
 * Otherwise, the function will call the className function with the state as the first argument.
 *
 * @param className
 * @param state
 */ __turbopack_context__.s([
    "resolveClassName",
    ()=>resolveClassName
]);
function resolveClassName(className, state) {
    return typeof className === 'function' ? className(state) : className;
}
}),
"[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/utils/resolveStyle.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * If the provided style is an object, it will be returned as is.
 * Otherwise, the function will call the style function with the state as the first argument.
 *
 * @param style
 * @param state
 */ __turbopack_context__.s([
    "resolveStyle",
    ()=>resolveStyle
]);
function resolveStyle(style, state) {
    return typeof style === 'function' ? style(state) : style;
}
}),
"[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/utils/useRegisteredLabelId.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useRegisteredLabelId",
    ()=>useRegisteredLabelId
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+utils@0.2.9_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/esm/useIsoLayoutEffect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$5$2e$0_$40$date$2d$fns$2b$tz$40$1$2e$4$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_date$2d$fns$40$4$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$internals$2f$useBaseUiId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/internals/useBaseUiId.js [app-ssr] (ecmascript)");
'use client';
;
;
function useRegisteredLabelId(idProp, setLabelId) {
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$5$2e$0_$40$date$2d$fns$2b$tz$40$1$2e$4$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_date$2d$fns$40$4$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$internals$2f$useBaseUiId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseUiId"])(idProp);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        setLabelId(id);
        return ()=>{
            setLabelId(undefined);
        };
    }, [
        id,
        setLabelId
    ]);
    return id;
}
}),
"[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/utils/resolveRef.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * If the provided argument is a ref object, returns its `current` value.
 * Otherwise, returns the argument itself.
 */ __turbopack_context__.s([
    "resolveRef",
    ()=>resolveRef
]);
function resolveRef(maybeRef) {
    if (maybeRef == null) {
        return maybeRef;
    }
    return 'current' in maybeRef ? maybeRef.current : maybeRef;
}
}),
"[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/utils/popups/popupTriggerMap.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Data structure to keep track of popup trigger elements by their IDs.
 * Uses both a set of Elements and a map of IDs to Elements for efficient lookups.
 */ __turbopack_context__.s([
    "PopupTriggerMap",
    ()=>PopupTriggerMap
]);
class PopupTriggerMap {
    constructor(){
        this.elementsSet = new Set();
        this.idMap = new Map();
    }
    /**
   * Adds a trigger element with the given ID.
   *
   * Note: The provided element is assumed to not be registered under multiple IDs.
   */ add(id, element) {
        const existingElement = this.idMap.get(id);
        if (existingElement === element) {
            return;
        }
        if (existingElement !== undefined) {
            // We assume that the same element won't be registered under multiple ids.
            // This is safe considering how useTriggerRegistration is implemented.
            this.elementsSet.delete(existingElement);
        }
        this.elementsSet.add(element);
        this.idMap.set(id, element);
        if ("TURBOPACK compile-time truthy", 1) {
            if (this.elementsSet.size !== this.idMap.size) {
                // TODO: fix mui/no-guarded-throw
                // eslint-disable-next-line mui/no-guarded-throw
                throw new Error('Base UI: A trigger element cannot be registered under multiple IDs in PopupTriggerMap.');
            }
        }
    }
    /**
   * Removes the trigger element with the given ID.
   */ delete(id) {
        const element = this.idMap.get(id);
        if (element) {
            this.elementsSet.delete(element);
            this.idMap.delete(id);
        }
    }
    /**
   * Whether the given element is registered as a trigger.
   */ hasElement(element) {
        return this.elementsSet.has(element);
    }
    /**
   * Whether there is a registered trigger element matching the given predicate.
   */ hasMatchingElement(predicate) {
        for (const element of this.elementsSet){
            if (predicate(element)) {
                return true;
            }
        }
        return false;
    }
    /**
   * Returns the trigger element associated with the given ID, or undefined if no such element exists.
   */ getById(id) {
        return this.idMap.get(id);
    }
    /**
   * Returns an iterable of all registered trigger entries, where each entry is a tuple of [id, element].
   */ entries() {
        return this.idMap.entries();
    }
    /**
   * Returns an iterable of all registered trigger elements.
   */ elements() {
        return this.elementsSet.values();
    }
    /**
   * Returns the number of registered trigger elements.
   */ get size() {
        return this.idMap.size;
    }
}
}),
"[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/utils/useOpenInteractionType.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useOpenInteractionType",
    ()=>useOpenInteractionType,
    "useOpenMethodTriggerProps",
    ()=>useOpenMethodTriggerProps
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/next@16.2.6_@babel+core@7.29.7_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+utils@0.2.9_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/esm/useStableCallback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useEnhancedClickHandler$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+utils@0.2.9_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/esm/useEnhancedClickHandler.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$detectBrowser$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+utils@0.2.9_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/esm/detectBrowser.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$5$2e$0_$40$date$2d$fns$2b$tz$40$1$2e$4$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_date$2d$fns$40$4$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$internals$2f$useValueChanged$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/internals/useValueChanged.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function useOpenMethodTriggerProps(open, setOpenMethod) {
    const handleTriggerClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStableCallback"])((_, interactionType)=>{
        const isOpen = typeof open === 'function' ? open() : open;
        if (!isOpen) {
            setOpenMethod(interactionType || (// On iOS Safari, the hitslop around touch targets means tapping outside an element's
            // bounds does not fire `pointerdown` but does fire `mousedown`. The `interactionType`
            // will be "" in that case.
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$detectBrowser$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isIOS"] ? 'touch' : ''));
        }
    });
    const { onClick, onPointerDown } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useEnhancedClickHandler$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEnhancedClickHandler"])(handleTriggerClick);
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            onClick,
            onPointerDown
        }), [
        onClick,
        onPointerDown
    ]);
}
function useOpenInteractionType(open) {
    const [openMethod, setOpenMethod] = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](null);
    const triggerProps = useOpenMethodTriggerProps(open, setOpenMethod);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$5$2e$0_$40$date$2d$fns$2b$tz$40$1$2e$4$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_date$2d$fns$40$4$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$internals$2f$useValueChanged$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useValueChanged"])(open, (previousOpen)=>{
        if (previousOpen && !open) {
            setOpenMethod(null);
        }
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            openMethod,
            triggerProps
        }), [
        openMethod,
        triggerProps
    ]);
}
}),
"[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/utils/scrollEdges.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SCROLL_EDGE_TOLERANCE_PX",
    ()=>SCROLL_EDGE_TOLERANCE_PX,
    "getMaxScrollOffset",
    ()=>getMaxScrollOffset,
    "normalizeScrollOffset",
    ()=>normalizeScrollOffset
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$5$2e$0_$40$date$2d$fns$2b$tz$40$1$2e$4$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_date$2d$fns$40$4$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$internals$2f$clamp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/internals/clamp.js [app-ssr] (ecmascript)");
;
const SCROLL_EDGE_TOLERANCE_PX = 1;
function getMaxScrollOffset(scrollSize, clientSize) {
    return Math.max(0, scrollSize - clientSize);
}
function normalizeScrollOffset(value, max) {
    if (max <= 0) {
        return 0;
    }
    const clamped = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$5$2e$0_$40$date$2d$fns$2b$tz$40$1$2e$4$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_date$2d$fns$40$4$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$internals$2f$clamp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clamp"])(value, 0, max);
    const startDistance = clamped;
    const endDistance = max - clamped;
    const withinStartTolerance = startDistance <= SCROLL_EDGE_TOLERANCE_PX;
    const withinEndTolerance = endDistance <= SCROLL_EDGE_TOLERANCE_PX;
    if (withinStartTolerance && withinEndTolerance) {
        return startDistance <= endDistance ? 0 : max;
    }
    if (withinStartTolerance) {
        return 0;
    }
    if (withinEndTolerance) {
        return max;
    }
    return clamped;
}
}),
"[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/utils/popups/popupStoreUtils.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FOCUSABLE_POPUP_PROPS",
    ()=>FOCUSABLE_POPUP_PROPS,
    "setOpenTriggerState",
    ()=>setOpenTriggerState,
    "useImplicitActiveTrigger",
    ()=>useImplicitActiveTrigger,
    "useOpenStateTransitions",
    ()=>useOpenStateTransitions,
    "usePopupInteractionProps",
    ()=>usePopupInteractionProps,
    "usePopupRootSync",
    ()=>usePopupRootSync,
    "usePopupStore",
    ()=>usePopupStore,
    "useTriggerDataForwarding",
    ()=>useTriggerDataForwarding,
    "useTriggerRegistration",
    ()=>useTriggerRegistration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/next@16.2.6_@babel+core@7.29.7_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+utils@0.2.9_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/esm/empty.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+utils@0.2.9_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/esm/useId.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+utils@0.2.9_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/esm/useStableCallback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+utils@0.2.9_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/esm/useIsoLayoutEffect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$5$2e$0_$40$date$2d$fns$2b$tz$40$1$2e$4$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_date$2d$fns$40$4$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/floating-ui-react/utils/constants.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$5$2e$0_$40$date$2d$fns$2b$tz$40$1$2e$4$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_date$2d$fns$40$4$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingTree$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/floating-ui-react/components/FloatingTree.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$5$2e$0_$40$date$2d$fns$2b$tz$40$1$2e$4$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_date$2d$fns$40$4$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useSyncedFloatingRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useSyncedFloatingRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$5$2e$0_$40$date$2d$fns$2b$tz$40$1$2e$4$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_date$2d$fns$40$4$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$internals$2f$useTransitionStatus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/internals/useTransitionStatus.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$5$2e$0_$40$date$2d$fns$2b$tz$40$1$2e$4$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_date$2d$fns$40$4$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$internals$2f$useOpenChangeComplete$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/internals/useOpenChangeComplete.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
const FOCUSABLE_POPUP_PROPS = {
    tabIndex: -1,
    [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$5$2e$0_$40$date$2d$fns$2b$tz$40$1$2e$4$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_date$2d$fns$40$4$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FOCUSABLE_ATTRIBUTE"]]: ''
};
function usePopupStore(externalStore, createStore, treatPopupAsFloatingElement = false) {
    const floatingId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])();
    const nested = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$5$2e$0_$40$date$2d$fns$2b$tz$40$1$2e$4$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_date$2d$fns$40$4$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingTree$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFloatingParentNodeId"])() != null;
    const internalStoreRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    if (externalStore === undefined && internalStoreRef.current === null) {
        internalStoreRef.current = createStore(floatingId, nested);
    }
    const store = externalStore ?? internalStoreRef.current;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$5$2e$0_$40$date$2d$fns$2b$tz$40$1$2e$4$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_date$2d$fns$40$4$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useSyncedFloatingRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSyncedFloatingRootContext"])({
        popupStore: store,
        treatPopupAsFloatingElement,
        floatingRootContext: store.state.floatingRootContext,
        floatingId,
        nested,
        onOpenChange: store.setOpen
    });
    return {
        store,
        internalStore: internalStoreRef.current
    };
}
function useTriggerRegistration(id, store) {
    // Keep track of the currently registered element to unregister it on unmount or id change.
    const registeredElementIdRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    const registeredElementRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((element)=>{
        if (id === undefined) {
            return;
        }
        let shouldSyncTriggerCount = false;
        if (registeredElementIdRef.current !== null) {
            const registeredId = registeredElementIdRef.current;
            const registeredElement = registeredElementRef.current;
            const currentElement = store.context.triggerElements.getById(registeredId);
            if (registeredElement && currentElement === registeredElement) {
                store.context.triggerElements.delete(registeredId);
                shouldSyncTriggerCount = true;
            }
            registeredElementIdRef.current = null;
            registeredElementRef.current = null;
        }
        if (element !== null) {
            registeredElementIdRef.current = id;
            registeredElementRef.current = element;
            store.context.triggerElements.add(id, element);
            shouldSyncTriggerCount = true;
        }
        if (shouldSyncTriggerCount) {
            const triggerCount = store.context.triggerElements.size;
            if (store.select('open') && store.state.triggerCount !== triggerCount) {
                store.set('triggerCount', triggerCount);
            }
        }
    }, [
        store,
        id
    ]);
}
function setOpenTriggerState(state, open, trigger) {
    const triggerId = trigger?.id ?? null;
    // If a popup is closing, the `trigger` may be undefined.
    // We want to keep the previous value so that exit animations are played and focus is returned correctly.
    if (triggerId || open) {
        state.activeTriggerId = triggerId;
        state.activeTriggerElement = trigger ?? null;
    }
}
function useTriggerDataForwarding(triggerId, triggerElementRef, store, stateUpdates) {
    const isMountedByThisTrigger = store.useState('isMountedByTrigger', triggerId);
    const baseRegisterTrigger = useTriggerRegistration(triggerId, store);
    const registerTrigger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStableCallback"])((element)=>{
        baseRegisterTrigger(element);
        if (!element) {
            return;
        }
        const open = store.select('open');
        const activeTriggerId = store.select('activeTriggerId');
        if (activeTriggerId === triggerId) {
            store.update({
                activeTriggerElement: element,
                ...open ? stateUpdates : null
            });
            return;
        }
        if (activeTriggerId == null && open) {
            // If a popup is already open, a detached trigger can mount before any active trigger
            // has been established. Claim the first registered trigger so trigger-owned focus
            // management and ARIA relationships work.
            store.update({
                activeTriggerId: triggerId,
                activeTriggerElement: element,
                ...stateUpdates
            });
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        if (isMountedByThisTrigger) {
            store.update({
                activeTriggerElement: triggerElementRef.current,
                ...stateUpdates
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        isMountedByThisTrigger,
        store,
        triggerElementRef,
        ...Object.values(stateUpdates)
    ]);
    return {
        registerTrigger,
        isMountedByThisTrigger
    };
}
function useImplicitActiveTrigger(store) {
    const open = store.useState('open');
    const reactiveTriggerCount = store.useState('triggerCount');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        if (!open) {
            if (store.state.triggerCount !== 0) {
                store.set('triggerCount', 0);
            }
            return;
        }
        const triggerCount = store.context.triggerElements.size;
        const stateUpdates = {};
        if (store.state.triggerCount !== triggerCount) {
            stateUpdates.triggerCount = triggerCount;
        }
        if (!store.select('activeTriggerId') && triggerCount === 1) {
            const iteratorResult = store.context.triggerElements.entries().next();
            if (!iteratorResult.done) {
                const [implicitTriggerId, implicitTriggerElement] = iteratorResult.value;
                stateUpdates.activeTriggerId = implicitTriggerId;
                stateUpdates.activeTriggerElement = implicitTriggerElement;
            }
        }
        if (stateUpdates.triggerCount !== undefined || stateUpdates.activeTriggerId !== undefined) {
            store.update(stateUpdates);
        }
    }, [
        open,
        store,
        reactiveTriggerCount
    ]);
}
function useOpenStateTransitions(open, store, onUnmount) {
    const { mounted, setMounted, transitionStatus } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$5$2e$0_$40$date$2d$fns$2b$tz$40$1$2e$4$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_date$2d$fns$40$4$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$internals$2f$useTransitionStatus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransitionStatus"])(open);
    store.useSyncedValues({
        mounted,
        transitionStatus
    });
    const forceUnmount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStableCallback"])(()=>{
        setMounted(false);
        store.update({
            activeTriggerId: null,
            activeTriggerElement: null,
            mounted: false,
            preventUnmountingOnClose: false
        });
        onUnmount?.();
        store.context.onOpenChangeComplete?.(false);
    });
    const preventUnmountingOnClose = store.useState('preventUnmountingOnClose');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$5$2e$0_$40$date$2d$fns$2b$tz$40$1$2e$4$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_date$2d$fns$40$4$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$internals$2f$useOpenChangeComplete$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useOpenChangeComplete"])({
        enabled: mounted && !open && !preventUnmountingOnClose,
        open,
        ref: store.context.popupRef,
        onComplete () {
            if (!open) {
                forceUnmount();
            }
        }
    });
    return {
        forceUnmount,
        transitionStatus
    };
}
function usePopupInteractionProps(store, statePart) {
    store.useSyncedValues(statePart);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>()=>{
            store.update({
                activeTriggerProps: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"],
                inactiveTriggerProps: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"],
                popupProps: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"]
            });
        }, [
        store
    ]);
}
function usePopupRootSync(store, open) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        if (!open && store.state.openMethod !== null) {
            store.set('openMethod', null);
        }
    }, [
        open,
        store
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>()=>{
            if (store.state.openMethod !== null) {
                store.set('openMethod', null);
            }
        }, [
        store
    ]);
}
}),
"[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/utils/resolveAriaLabelledBy.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDefaultLabelId",
    ()=>getDefaultLabelId,
    "resolveAriaLabelledBy",
    ()=>resolveAriaLabelledBy
]);
'use client';
function getDefaultLabelId(id) {
    return id == null ? undefined : `${id}-label`;
}
function resolveAriaLabelledBy(fieldLabelId, localLabelId) {
    return fieldLabelId ?? localLabelId;
}
}),
"[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/utils/popupStateMapping.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CommonPopupDataAttributes",
    ()=>CommonPopupDataAttributes,
    "CommonTriggerDataAttributes",
    ()=>CommonTriggerDataAttributes,
    "popupStateMapping",
    ()=>popupStateMapping,
    "pressableTriggerOpenStateMapping",
    ()=>pressableTriggerOpenStateMapping,
    "triggerOpenStateMapping",
    ()=>triggerOpenStateMapping
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$5$2e$0_$40$date$2d$fns$2b$tz$40$1$2e$4$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_date$2d$fns$40$4$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$internals$2f$stateAttributesMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/internals/stateAttributesMapping.js [app-ssr] (ecmascript)");
;
let CommonPopupDataAttributes = function(CommonPopupDataAttributes) {
    /**
   * Present when the popup is open.
   */ CommonPopupDataAttributes["open"] = "data-open";
    /**
   * Present when the popup is closed.
   */ CommonPopupDataAttributes["closed"] = "data-closed";
    /**
   * Present when the popup is animating in.
   */ CommonPopupDataAttributes[CommonPopupDataAttributes["startingStyle"] = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$5$2e$0_$40$date$2d$fns$2b$tz$40$1$2e$4$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_date$2d$fns$40$4$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$internals$2f$stateAttributesMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TransitionStatusDataAttributes"].startingStyle] = "startingStyle";
    /**
   * Present when the popup is animating out.
   */ CommonPopupDataAttributes[CommonPopupDataAttributes["endingStyle"] = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$5$2e$0_$40$date$2d$fns$2b$tz$40$1$2e$4$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_date$2d$fns$40$4$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$internals$2f$stateAttributesMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TransitionStatusDataAttributes"].endingStyle] = "endingStyle";
    /**
   * Present when the anchor is hidden.
   */ CommonPopupDataAttributes["anchorHidden"] = "data-anchor-hidden";
    /**
   * Indicates which side the popup is positioned relative to the trigger.
   * @type { 'top' | 'bottom' | 'left' | 'right' | 'inline-end' | 'inline-start'}
   */ CommonPopupDataAttributes["side"] = "data-side";
    /**
   * Indicates how the popup is aligned relative to specified side.
   * @type {'start' | 'center' | 'end'}
   */ CommonPopupDataAttributes["align"] = "data-align";
    return CommonPopupDataAttributes;
}({});
let CommonTriggerDataAttributes = /*#__PURE__*/ function(CommonTriggerDataAttributes) {
    /**
   * Present when the popup is open.
   */ CommonTriggerDataAttributes["popupOpen"] = "data-popup-open";
    /**
   * Present when a pressable trigger is pressed.
   */ CommonTriggerDataAttributes["pressed"] = "data-pressed";
    return CommonTriggerDataAttributes;
}({});
const TRIGGER_HOOK = {
    [CommonTriggerDataAttributes.popupOpen]: ''
};
const PRESSABLE_TRIGGER_HOOK = {
    [CommonTriggerDataAttributes.popupOpen]: '',
    [CommonTriggerDataAttributes.pressed]: ''
};
const POPUP_OPEN_HOOK = {
    [CommonPopupDataAttributes.open]: ''
};
const POPUP_CLOSED_HOOK = {
    [CommonPopupDataAttributes.closed]: ''
};
const ANCHOR_HIDDEN_HOOK = {
    [CommonPopupDataAttributes.anchorHidden]: ''
};
const triggerOpenStateMapping = {
    open (value) {
        if (value) {
            return TRIGGER_HOOK;
        }
        return null;
    }
};
const pressableTriggerOpenStateMapping = {
    open (value) {
        if (value) {
            return PRESSABLE_TRIGGER_HOOK;
        }
        return null;
    }
};
const popupStateMapping = {
    open (value) {
        if (value) {
            return POPUP_OPEN_HOOK;
        }
        return POPUP_CLOSED_HOOK;
    },
    anchorHidden (value) {
        if (value) {
            return ANCHOR_HIDDEN_HOOK;
        }
        return null;
    }
};
}),
"[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/utils/getPseudoElementBounds.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getPseudoElementBounds",
    ()=>getPseudoElementBounds
]);
;
function getPseudoElementBounds(element) {
    const elementRect = element.getBoundingClientRect();
    // Avoid "Not implemented: window.getComputedStyle(elt, pseudoElt)"
    if ("TURBOPACK compile-time truthy", 1) {
        return elementRect;
    }
    //TURBOPACK unreachable
    ;
    const win = undefined;
    const beforeStyles = undefined;
    const afterStyles = undefined;
    const hasPseudoElements = undefined;
    // Get dimensions of pseudo-elements
    const beforeWidth = undefined;
    const beforeHeight = undefined;
    const afterWidth = undefined;
    const afterHeight = undefined;
    // Calculate max dimensions including pseudo-elements
    const totalWidth = undefined;
    const totalHeight = undefined;
    // Calculate the differences to extend the bounds
    const widthDiff = undefined;
    const heightDiff = undefined;
}
}),
"[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/utils/useFocusableWhenDisabled.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFocusableWhenDisabled",
    ()=>useFocusableWhenDisabled
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/next@16.2.6_@babel+core@7.29.7_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
function useFocusableWhenDisabled(parameters) {
    const { focusableWhenDisabled, disabled, composite = false, tabIndex: tabIndexProp = 0, isNativeButton } = parameters;
    const isFocusableComposite = composite && focusableWhenDisabled !== false;
    const isNonFocusableComposite = composite && focusableWhenDisabled === false;
    // we can't explicitly assign `undefined` to any of these props because it
    // would otherwise prevent subsequently merged props from setting them
    const props = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        const additionalProps = {
            // allow Tabbing away from focusableWhenDisabled elements
            onKeyDown (event) {
                if (disabled && focusableWhenDisabled && event.key !== 'Tab') {
                    event.preventDefault();
                }
            }
        };
        if (!composite) {
            additionalProps.tabIndex = tabIndexProp;
            if (!isNativeButton && disabled) {
                additionalProps.tabIndex = focusableWhenDisabled ? tabIndexProp : -1;
            }
        }
        if (isNativeButton && (focusableWhenDisabled || isFocusableComposite) || !isNativeButton && disabled) {
            additionalProps['aria-disabled'] = disabled;
        }
        if (isNativeButton && (!focusableWhenDisabled || isNonFocusableComposite)) {
            additionalProps.disabled = disabled;
        }
        return additionalProps;
    }, [
        composite,
        disabled,
        focusableWhenDisabled,
        isFocusableComposite,
        isNonFocusableComposite,
        isNativeButton,
        tabIndexProp
    ]);
    return {
        props
    };
}
}),
"[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/utils/FocusGuard.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FocusGuard",
    ()=>FocusGuard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/next@16.2.6_@babel+core@7.29.7_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+utils@0.2.9_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/esm/useIsoLayoutEffect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$detectBrowser$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+utils@0.2.9_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/esm/detectBrowser.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$visuallyHidden$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+utils@0.2.9_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/esm/visuallyHidden.js [app-ssr] (ecmascript)");
/**
 * @internal
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/next@16.2.6_@babel+core@7.29.7_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
const FocusGuard = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function FocusGuard(props, ref) {
    const [role, setRole] = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$detectBrowser$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSafari"]) {
            // Unlike other screen readers such as NVDA and JAWS, the virtual cursor
            // on VoiceOver does trigger the onFocus event, so we can use the focus
            // trap element. On Safari, only buttons trigger the onFocus event.
            setRole('button');
        }
    }, []);
    const restProps = {
        tabIndex: 0,
        // Role is only for VoiceOver
        role
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
        ...props,
        ref: ref,
        style: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$visuallyHidden$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["visuallyHidden"],
        "aria-hidden": role ? undefined : true,
        ...restProps,
        "data-base-ui-focus-guard": ""
    });
});
if ("TURBOPACK compile-time truthy", 1) FocusGuard.displayName = "FocusGuard";
}),
"[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/utils/hideMiddleware.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hide",
    ()=>hide
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$2d$dom$40$2$2e$1$2e$8_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@floating-ui+react-dom@2.1.8_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs [app-ssr] (ecmascript) <locals>");
;
const hide = {
    name: 'hide',
    async fn (state) {
        const { width, height, x, y } = state.rects.reference;
        const anchorHidden = width === 0 && height === 0 && x === 0 && y === 0;
        const nativeHideResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$2d$dom$40$2$2e$1$2e$8_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hide"])().fn(state);
        return {
            data: {
                referenceHidden: nativeHideResult.data?.referenceHidden || anchorHidden
            }
        };
    }
};
}),
"[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/utils/adaptiveOriginMiddleware.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_SIDES",
    ()=>DEFAULT_SIDES,
    "adaptiveOrigin",
    ()=>adaptiveOrigin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+utils@0.2.9_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/esm/owner.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$11$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__getWindow__as__ownerWindow$3e$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@floating-ui+utils@0.2.11/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-ssr] (ecmascript) <export getWindow as ownerWindow>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$11$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@floating-ui+utils@0.2.11/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs [app-ssr] (ecmascript)");
;
;
const DEFAULT_SIDES = {
    sideX: 'left',
    sideY: 'top'
};
const adaptiveOrigin = {
    name: 'adaptiveOrigin',
    async fn (state) {
        const { x: rawX, y: rawY, rects: { floating: floatRect }, elements: { floating }, platform, strategy, placement } = state;
        const win = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$11$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__getWindow__as__ownerWindow$3e$__["ownerWindow"])(floating);
        const styles = win.getComputedStyle(floating);
        const hasTransition = styles.transitionDuration !== '0s' && styles.transitionDuration !== '';
        if (!hasTransition) {
            return {
                x: rawX,
                y: rawY,
                data: DEFAULT_SIDES
            };
        }
        const offsetParent = await platform.getOffsetParent?.(floating);
        let offsetDimensions = {
            width: 0,
            height: 0
        };
        // For fixed strategy, prefer visualViewport if available
        if (strategy === 'fixed' && win?.visualViewport) {
            offsetDimensions = {
                width: win.visualViewport.width,
                height: win.visualViewport.height
            };
        } else if (offsetParent === win) {
            const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ownerDocument"])(floating);
            offsetDimensions = {
                width: doc.documentElement.clientWidth,
                height: doc.documentElement.clientHeight
            };
        } else if (await platform.isElement?.(offsetParent)) {
            offsetDimensions = await platform.getDimensions(offsetParent);
        }
        const currentSide = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$11$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSide"])(placement);
        let x = rawX;
        let y = rawY;
        if (currentSide === 'left') {
            x = offsetDimensions.width - (rawX + floatRect.width);
        }
        if (currentSide === 'top') {
            y = offsetDimensions.height - (rawY + floatRect.height);
        }
        const sideX = currentSide === 'left' ? 'right' : DEFAULT_SIDES.sideX;
        const sideY = currentSide === 'top' ? 'bottom' : DEFAULT_SIDES.sideY;
        return {
            x,
            y,
            data: {
                sideX,
                sideY
            }
        };
    }
};
}),
"[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/utils/useAnchorPositioning.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAnchorPositioning",
    ()=>useAnchorPositioning
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/next@16.2.6_@babel+core@7.29.7_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$11$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@floating-ui+utils@0.2.11/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+utils@0.2.9_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/esm/owner.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$11$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__getWindow__as__ownerWindow$3e$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@floating-ui+utils@0.2.11/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-ssr] (ecmascript) <export getWindow as ownerWindow>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+utils@0.2.9_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/esm/useIsoLayoutEffect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useValueAsRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+utils@0.2.9_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/esm/useValueAsRef.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+utils@0.2.9_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/esm/useStableCallback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$dom$40$1$2e$7$2e$6$2f$node_modules$2f40$floating$2d$ui$2f$dom$2f$dist$2f$floating$2d$ui$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@floating-ui+dom@1.7.6/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$2d$dom$40$2$2e$1$2e$8_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@floating-ui+react-dom@2.1.8_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$5$2e$0_$40$date$2d$fns$2b$tz$40$1$2e$4$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_date$2d$fns$40$4$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useFloating$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useFloating.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$5$2e$0_$40$date$2d$fns$2b$tz$40$1$2e$4$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_date$2d$fns$40$4$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$internals$2f$direction$2d$context$2f$DirectionContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/internals/direction-context/DirectionContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$5$2e$0_$40$date$2d$fns$2b$tz$40$1$2e$4$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_date$2d$fns$40$4$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$middleware$2f$arrow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/floating-ui-react/middleware/arrow.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$5$2e$0_$40$date$2d$fns$2b$tz$40$1$2e$4$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_date$2d$fns$40$4$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$hideMiddleware$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/utils/hideMiddleware.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$5$2e$0_$40$date$2d$fns$2b$tz$40$1$2e$4$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_date$2d$fns$40$4$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$adaptiveOriginMiddleware$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/utils/adaptiveOriginMiddleware.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
function getLogicalSide(sideParam, renderedSide, isRtl) {
    const isLogicalSideParam = sideParam === 'inline-start' || sideParam === 'inline-end';
    const logicalRight = isRtl ? 'inline-start' : 'inline-end';
    const logicalLeft = isRtl ? 'inline-end' : 'inline-start';
    return ({
        top: 'top',
        right: isLogicalSideParam ? logicalRight : 'right',
        bottom: 'bottom',
        left: isLogicalSideParam ? logicalLeft : 'left'
    })[renderedSide];
}
function getOffsetData(state, sideParam, isRtl) {
    const { rects, placement } = state;
    const data = {
        side: getLogicalSide(sideParam, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$11$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSide"])(placement), isRtl),
        align: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$11$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAlignment"])(placement) || 'center',
        anchor: {
            width: rects.reference.width,
            height: rects.reference.height
        },
        positioner: {
            width: rects.floating.width,
            height: rects.floating.height
        }
    };
    return data;
}
function useAnchorPositioning(params) {
    const { // Public parameters
    anchor, positionMethod = 'absolute', side: sideParam = 'bottom', sideOffset = 0, align = 'center', alignOffset = 0, collisionBoundary, collisionPadding: collisionPaddingParam = 5, sticky = false, arrowPadding = 5, disableAnchorTracking = false, inline: inlineMiddleware, // Private parameters
    keepMounted = false, floatingRootContext, mounted, collisionAvoidance, shiftCrossAxis = false, nodeId, adaptiveOrigin, lazyFlip = false, externalTree } = params;
    const [mountSide, setMountSide] = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](null);
    if (!mounted && mountSide !== null) {
        setMountSide(null);
    }
    const collisionAvoidanceSide = collisionAvoidance.side || 'flip';
    const collisionAvoidanceAlign = collisionAvoidance.align || 'flip';
    const collisionAvoidanceFallbackAxisSide = collisionAvoidance.fallbackAxisSide || 'end';
    const anchorFn = typeof anchor === 'function' ? anchor : undefined;
    const anchorFnCallback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStableCallback"])(anchorFn);
    const anchorDep = anchorFn ? anchorFnCallback : anchor;
    const anchorValueRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useValueAsRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useValueAsRef"])(anchor);
    const mountedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useValueAsRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useValueAsRef"])(mounted);
    const direction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$5$2e$0_$40$date$2d$fns$2b$tz$40$1$2e$4$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_date$2d$fns$40$4$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$internals$2f$direction$2d$context$2f$DirectionContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDirection"])();
    const isRtl = direction === 'rtl';
    const side = mountSide || ({
        top: 'top',
        right: 'right',
        bottom: 'bottom',
        left: 'left',
        'inline-end': isRtl ? 'left' : 'right',
        'inline-start': isRtl ? 'right' : 'left'
    })[sideParam];
    const placement = align === 'center' ? side : `${side}-${align}`;
    let collisionPadding = collisionPaddingParam;
    // Create a bias to the preferred side.
    // On iOS, when the mobile software keyboard opens, the input is exactly centered
    // in the viewport, but this can cause it to flip to the top undesirably.
    const bias = 1;
    const biasTop = sideParam === 'bottom' ? bias : 0;
    const biasBottom = sideParam === 'top' ? bias : 0;
    const biasLeft = sideParam === 'right' ? bias : 0;
    const biasRight = sideParam === 'left' ? bias : 0;
    if (typeof collisionPadding === 'number') {
        collisionPadding = {
            top: collisionPadding + biasTop,
            right: collisionPadding + biasRight,
            bottom: collisionPadding + biasBottom,
            left: collisionPadding + biasLeft
        };
    } else if (collisionPadding) {
        collisionPadding = {
            top: (collisionPadding.top || 0) + biasTop,
            right: (collisionPadding.right || 0) + biasRight,
            bottom: (collisionPadding.bottom || 0) + biasBottom,
            left: (collisionPadding.left || 0) + biasLeft
        };
    }
    const commonCollisionProps = {
        boundary: collisionBoundary === 'clipping-ancestors' ? 'clippingAncestors' : collisionBoundary,
        padding: collisionPadding
    };
    // Using a ref assumes that the arrow element is always present in the DOM for the lifetime of the
    // popup. If this assumption ends up being false, we can switch to state to manage the arrow's
    // presence.
    const arrowRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    // Keep these reactive if they're not functions
    const sideOffsetRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useValueAsRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useValueAsRef"])(sideOffset);
    const alignOffsetRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useValueAsRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useValueAsRef"])(alignOffset);
    const sideOffsetDep = typeof sideOffset !== 'function' ? sideOffset : 0;
    const alignOffsetDep = typeof alignOffset !== 'function' ? alignOffset : 0;
    const middleware = [];
    if (inlineMiddleware) {
        middleware.push(inlineMiddleware);
    }
    middleware.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$2d$dom$40$2$2e$1$2e$8_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["offset"])((state)=>{
        const data = getOffsetData(state, sideParam, isRtl);
        const sideAxis = typeof sideOffsetRef.current === 'function' ? sideOffsetRef.current(data) : sideOffsetRef.current;
        const alignAxis = typeof alignOffsetRef.current === 'function' ? alignOffsetRef.current(data) : alignOffsetRef.current;
        return {
            mainAxis: sideAxis,
            crossAxis: alignAxis,
            alignmentAxis: alignAxis
        };
    }, [
        sideOffsetDep,
        alignOffsetDep,
        isRtl,
        sideParam
    ]));
    const shiftDisabled = collisionAvoidanceAlign === 'none' && collisionAvoidanceSide !== 'shift';
    const crossAxisShiftEnabled = !shiftDisabled && (sticky || shiftCrossAxis || collisionAvoidanceSide === 'shift');
    const flipMiddleware = collisionAvoidanceSide === 'none' ? null : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$2d$dom$40$2$2e$1$2e$8_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["flip"])({
        ...commonCollisionProps,
        // Ensure the popup flips if it's been limited by its --available-height and it resizes.
        // Since the size() padding is smaller than the flip() padding, flip() will take precedence.
        padding: {
            top: collisionPadding.top + bias,
            right: collisionPadding.right + bias,
            bottom: collisionPadding.bottom + bias,
            left: collisionPadding.left + bias
        },
        mainAxis: !shiftCrossAxis && collisionAvoidanceSide === 'flip',
        crossAxis: collisionAvoidanceAlign === 'flip' ? 'alignment' : false,
        fallbackAxisSideDirection: collisionAvoidanceFallbackAxisSide
    });
    const shiftMiddleware = shiftDisabled ? null : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$2d$dom$40$2$2e$1$2e$8_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["shift"])((data)=>{
        const html = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ownerDocument"])(data.elements.floating).documentElement;
        return {
            ...commonCollisionProps,
            // Use the Layout Viewport to avoid shifting around when pinch-zooming
            // for context menus.
            rootBoundary: shiftCrossAxis ? {
                x: 0,
                y: 0,
                width: html.clientWidth,
                height: html.clientHeight
            } : undefined,
            mainAxis: collisionAvoidanceAlign !== 'none',
            crossAxis: crossAxisShiftEnabled,
            limiter: sticky || shiftCrossAxis ? undefined : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$2d$dom$40$2$2e$1$2e$8_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["limitShift"])((limitData)=>{
                if (!arrowRef.current) {
                    return {};
                }
                const { width, height } = arrowRef.current.getBoundingClientRect();
                const sideAxis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$11$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSideAxis"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$11$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSide"])(limitData.placement));
                const arrowSize = sideAxis === 'y' ? width : height;
                const offsetAmount = sideAxis === 'y' ? collisionPadding.left + collisionPadding.right : collisionPadding.top + collisionPadding.bottom;
                return {
                    offset: arrowSize / 2 + offsetAmount / 2
                };
            })
        };
    }, [
        commonCollisionProps,
        sticky,
        shiftCrossAxis,
        collisionPadding,
        collisionAvoidanceAlign
    ]);
    // https://floating-ui.com/docs/flip#combining-with-shift
    if (collisionAvoidanceSide === 'shift' || collisionAvoidanceAlign === 'shift' || align === 'center') {
        middleware.push(shiftMiddleware, flipMiddleware);
    } else {
        middleware.push(flipMiddleware, shiftMiddleware);
    }
    middleware.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$2d$dom$40$2$2e$1$2e$8_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["size"])({
        ...commonCollisionProps,
        apply ({ elements: { floating }, availableWidth, availableHeight, rects }) {
            if (!mountedRef.current) {
                return;
            }
            const floatingStyle = floating.style;
            floatingStyle.setProperty('--available-width', `${availableWidth}px`);
            floatingStyle.setProperty('--available-height', `${availableHeight}px`);
            // Snap anchor dimensions to device pixels to ensure the popup's visual width matches the anchor's one.
            const dpr = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$11$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__getWindow__as__ownerWindow$3e$__["ownerWindow"])(floating).devicePixelRatio || 1;
            const { x, y, width, height } = rects.reference;
            const anchorWidth = (Math.round((x + width) * dpr) - Math.round(x * dpr)) / dpr;
            const anchorHeight = (Math.round((y + height) * dpr) - Math.round(y * dpr)) / dpr;
            floatingStyle.setProperty('--anchor-width', `${anchorWidth}px`);
            floatingStyle.setProperty('--anchor-height', `${anchorHeight}px`);
        }
    }), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$5$2e$0_$40$date$2d$fns$2b$tz$40$1$2e$4$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_date$2d$fns$40$4$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$middleware$2f$arrow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["arrow"])((state)=>({
            // `transform-origin` calculations rely on an element existing. If the arrow hasn't been set,
            // we'll create a fake element.
            element: arrowRef.current || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ownerDocument"])(state.elements.floating).createElement('div'),
            padding: arrowPadding,
            offsetParent: 'floating'
        }), [
        arrowPadding
    ]), {
        name: 'transformOrigin',
        fn (state) {
            const { elements, middlewareData, placement: renderedPlacement, rects, y } = state;
            const currentRenderedSide = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$11$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSide"])(renderedPlacement);
            const currentRenderedAxis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$11$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSideAxis"])(currentRenderedSide);
            const arrowEl = arrowRef.current;
            const arrowX = middlewareData.arrow?.x || 0;
            const arrowY = middlewareData.arrow?.y || 0;
            const arrowWidth = arrowEl?.clientWidth || 0;
            const arrowHeight = arrowEl?.clientHeight || 0;
            const transformX = arrowX + arrowWidth / 2;
            const transformY = arrowY + arrowHeight / 2;
            const shiftY = Math.abs(middlewareData.shift?.y || 0);
            const halfAnchorHeight = rects.reference.height / 2;
            const sideOffsetValue = typeof sideOffset === 'function' ? sideOffset(getOffsetData(state, sideParam, isRtl)) : sideOffset;
            const isOverlappingAnchor = shiftY > sideOffsetValue;
            const adjacentTransformOrigin = {
                top: `${transformX}px calc(100% + ${sideOffsetValue}px)`,
                bottom: `${transformX}px ${-sideOffsetValue}px`,
                left: `calc(100% + ${sideOffsetValue}px) ${transformY}px`,
                right: `${-sideOffsetValue}px ${transformY}px`
            }[currentRenderedSide];
            const overlapTransformOrigin = `${transformX}px ${rects.reference.y + halfAnchorHeight - y}px`;
            elements.floating.style.setProperty('--transform-origin', crossAxisShiftEnabled && currentRenderedAxis === 'y' && isOverlappingAnchor ? overlapTransformOrigin : adjacentTransformOrigin);
            return {};
        }
    }, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$5$2e$0_$40$date$2d$fns$2b$tz$40$1$2e$4$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_date$2d$fns$40$4$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$hideMiddleware$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hide"], adaptiveOrigin);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        // Ensure positioning doesn't run initially for `keepMounted` elements that
        // aren't initially open.
        if (!mounted && floatingRootContext) {
            floatingRootContext.update({
                referenceElement: null,
                floatingElement: null,
                domReferenceElement: null,
                positionReference: null
            });
        }
    }, [
        mounted,
        floatingRootContext
    ]);
    const autoUpdateOptions = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            elementResize: !disableAnchorTracking && typeof ResizeObserver !== 'undefined',
            layoutShift: !disableAnchorTracking && typeof IntersectionObserver !== 'undefined'
        }), [
        disableAnchorTracking
    ]);
    const { refs, elements, x, y, middlewareData, update, placement: renderedPlacement, context, isPositioned, floatingStyles: originalFloatingStyles } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$5$2e$0_$40$date$2d$fns$2b$tz$40$1$2e$4$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_date$2d$fns$40$4$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useFloating$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFloating"])({
        rootContext: floatingRootContext,
        open: keepMounted ? mounted : undefined,
        placement,
        middleware,
        strategy: positionMethod,
        whileElementsMounted: keepMounted ? undefined : (...args)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$dom$40$1$2e$7$2e$6$2f$node_modules$2f40$floating$2d$ui$2f$dom$2f$dist$2f$floating$2d$ui$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["autoUpdate"])(...args, autoUpdateOptions),
        nodeId,
        externalTree
    });
    const { sideX, sideY } = middlewareData.adaptiveOrigin || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$5$2e$0_$40$date$2d$fns$2b$tz$40$1$2e$4$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_date$2d$fns$40$4$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$adaptiveOriginMiddleware$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_SIDES"];
    // Default to `fixed` when not positioned to prevent `autoFocus` scroll jumps.
    // This ensures the popup is inside the viewport initially before it gets positioned.
    const resolvedPosition = isPositioned ? positionMethod : 'fixed';
    const floatingStyles = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        const base = adaptiveOrigin ? {
            position: resolvedPosition,
            [sideX]: x,
            [sideY]: y
        } : {
            position: resolvedPosition,
            ...originalFloatingStyles
        };
        if (!isPositioned) {
            base.opacity = 0;
        }
        return base;
    }, [
        adaptiveOrigin,
        resolvedPosition,
        sideX,
        x,
        sideY,
        y,
        originalFloatingStyles,
        isPositioned
    ]);
    const registeredPositionReferenceRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        if (!mounted) {
            return;
        }
        const anchorValue = anchorValueRef.current;
        const resolvedAnchor = typeof anchorValue === 'function' ? anchorValue() : anchorValue;
        const unwrappedElement = (isRef(resolvedAnchor) ? resolvedAnchor.current : resolvedAnchor) || null;
        const finalAnchor = unwrappedElement || null;
        if (finalAnchor !== registeredPositionReferenceRef.current) {
            refs.setPositionReference(finalAnchor);
            registeredPositionReferenceRef.current = finalAnchor;
        }
    }, [
        mounted,
        refs,
        anchorDep,
        anchorValueRef
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (!mounted) {
            return;
        }
        const anchorValue = anchorValueRef.current;
        // Refs from parent components are set after useLayoutEffect runs and are available in useEffect.
        // Therefore, if the anchor is a ref, we need to update the position reference in useEffect.
        if (typeof anchorValue === 'function') {
            return;
        }
        if (isRef(anchorValue) && anchorValue.current !== registeredPositionReferenceRef.current) {
            refs.setPositionReference(anchorValue.current);
            registeredPositionReferenceRef.current = anchorValue.current;
        }
    }, [
        mounted,
        refs,
        anchorDep,
        anchorValueRef
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (keepMounted && mounted && elements.domReference && elements.floating) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$dom$40$1$2e$7$2e$6$2f$node_modules$2f40$floating$2d$ui$2f$dom$2f$dist$2f$floating$2d$ui$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["autoUpdate"])(elements.domReference, elements.floating, update, autoUpdateOptions);
        }
        return undefined;
    }, [
        keepMounted,
        mounted,
        elements,
        update,
        autoUpdateOptions
    ]);
    const renderedSide = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$11$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSide"])(renderedPlacement);
    const logicalRenderedSide = getLogicalSide(sideParam, renderedSide, isRtl);
    const renderedAlign = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$11$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAlignment"])(renderedPlacement) || 'center';
    const anchorHidden = Boolean(middlewareData.hide?.referenceHidden);
    // Locks the flip (makes it "sticky") so it doesn't prefer a given placement
    // and flips back lazily, not eagerly. Ideal for filtered lists that change
    // the size of the popup dynamically to avoid unwanted flipping when typing.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        if (lazyFlip && mounted && isPositioned) {
            setMountSide(renderedSide);
        }
    }, [
        lazyFlip,
        mounted,
        isPositioned,
        renderedSide
    ]);
    const arrowStyles = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            position: 'absolute',
            top: middlewareData.arrow?.y,
            left: middlewareData.arrow?.x
        }), [
        middlewareData.arrow
    ]);
    const arrowUncentered = middlewareData.arrow?.centerOffset !== 0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            positionerStyles: floatingStyles,
            arrowStyles,
            arrowRef,
            arrowUncentered,
            side: logicalRenderedSide,
            align: renderedAlign,
            physicalSide: renderedSide,
            anchorHidden,
            refs,
            context,
            isPositioned,
            update
        }), [
        floatingStyles,
        arrowStyles,
        arrowRef,
        arrowUncentered,
        logicalRenderedSide,
        renderedAlign,
        renderedSide,
        anchorHidden,
        refs,
        context,
        isPositioned,
        update
    ]);
}
function isRef(param) {
    return param != null && 'current' in param;
}
}),
"[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/utils/InternalBackdrop.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InternalBackdrop",
    ()=>InternalBackdrop
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/next@16.2.6_@babel+core@7.29.7_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
/**
 * @internal
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/next@16.2.6_@babel+core@7.29.7_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
;
;
const InternalBackdrop = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function InternalBackdrop(props, ref) {
    const { cutout, ...otherProps } = props;
    let clipPath;
    if (cutout) {
        const rect = cutout.getBoundingClientRect();
        clipPath = `polygon(0% 0%,100% 0%,100% 100%,0% 100%,0% 0%,${rect.left}px ${rect.top}px,${rect.left}px ${rect.bottom}px,${rect.right}px ${rect.bottom}px,${rect.right}px ${rect.top}px,${rect.left}px ${rect.top}px)`;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
        ref: ref,
        role: "presentation",
        "data-base-ui-inert": "",
        ...otherProps,
        style: {
            position: 'fixed',
            inset: 0,
            userSelect: 'none',
            WebkitUserSelect: 'none',
            clipPath
        }
    });
});
if ("TURBOPACK compile-time truthy", 1) InternalBackdrop.displayName = "InternalBackdrop";
}),
"[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/utils/getDisabledMountTransitionStyles.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDisabledMountTransitionStyles",
    ()=>getDisabledMountTransitionStyles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+utils@0.2.9_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/esm/empty.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$5$2e$0_$40$date$2d$fns$2b$tz$40$1$2e$4$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_date$2d$fns$40$4$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$internals$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/internals/constants.js [app-ssr] (ecmascript)");
;
;
function getDisabledMountTransitionStyles(transitionStatus) {
    return transitionStatus === 'starting' ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$5$2e$0_$40$date$2d$fns$2b$tz$40$1$2e$4$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_date$2d$fns$40$4$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$internals$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DISABLED_TRANSITIONS_STYLE"] : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"];
}
}),
"[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/utils/usePositioner.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePositioner",
    ()=>usePositioner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$5$2e$0_$40$date$2d$fns$2b$tz$40$1$2e$4$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_date$2d$fns$40$4$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/utils/popupStateMapping.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$5$2e$0_$40$date$2d$fns$2b$tz$40$1$2e$4$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_date$2d$fns$40$4$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$internals$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/internals/useRenderElement.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$5$2e$0_$40$date$2d$fns$2b$tz$40$1$2e$4$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_date$2d$fns$40$4$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$getDisabledMountTransitionStyles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/utils/getDisabledMountTransitionStyles.js [app-ssr] (ecmascript)");
'use client';
;
;
;
function usePositioner(componentProps, state, { styles, transitionStatus, props, refs, hidden, inert = false }) {
    const style = {
        ...styles
    };
    if (inert) {
        style.pointerEvents = 'none';
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$5$2e$0_$40$date$2d$fns$2b$tz$40$1$2e$4$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_date$2d$fns$40$4$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$internals$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderElement"])('div', componentProps, {
        state,
        ref: refs,
        props: [
            {
                role: 'presentation',
                hidden,
                style
            },
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$5$2e$0_$40$date$2d$fns$2b$tz$40$1$2e$4$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_date$2d$fns$40$4$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$getDisabledMountTransitionStyles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDisabledMountTransitionStyles"])(transitionStatus),
            props
        ],
        stateAttributesMapping: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$5$2e$0_$40$date$2d$fns$2b$tz$40$1$2e$4$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_date$2d$fns$40$4$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["popupStateMapping"]
    });
}
}),
"[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/utils/useAnchoredPopupScrollLock.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAnchoredPopupScrollLock",
    ()=>useAnchoredPopupScrollLock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/next@16.2.6_@babel+core@7.29.7_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+utils@0.2.9_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/esm/owner.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useScrollLock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+utils@0.2.9_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/esm/useScrollLock.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+utils@0.2.9_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/utils/esm/useIsoLayoutEffect.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
// Touch-opened popups normally avoid scroll locking so users can still swipe outside to dismiss.
// This hook re-enables scroll lock only when the popup is effectively full-width.
// Treat popups with up to 20px of total horizontal gutter as full-width so common ~10px side
// padding still locks scroll, since that leaves too little outside space for a reliable swipe.
const VIEWPORT_WIDTH_TOLERANCE_PX = 20;
function useAnchoredPopupScrollLock(enabled, touchOpen, positionerElement, referenceElement) {
    const [touchOpenShouldLockScroll, setTouchOpenShouldLockScroll] = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        if (!enabled || !touchOpen || positionerElement == null) {
            setTouchOpenShouldLockScroll(false);
            return;
        }
        const viewportWidth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ownerDocument"])(positionerElement).documentElement.clientWidth;
        const popupWidth = positionerElement.offsetWidth;
        setTouchOpenShouldLockScroll(viewportWidth > 0 && popupWidth > 0 && popupWidth >= viewportWidth - VIEWPORT_WIDTH_TOLERANCE_PX);
    }, [
        enabled,
        touchOpen,
        positionerElement
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$2$2e$9_$40$types$2b$react$40$19$2e$2$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$esm$2f$useScrollLock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useScrollLock"])(enabled && (!touchOpen || touchOpenShouldLockScroll), referenceElement);
}
}),
"[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/utils/styles.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "styleDisableScrollbar",
    ()=>styleDisableScrollbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/next@16.2.6_@babel+core@7.29.7_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
;
const DISABLE_SCROLLBAR_CLASS_NAME = 'base-ui-disable-scrollbar';
const styleDisableScrollbar = {
    className: DISABLE_SCROLLBAR_CLASS_NAME,
    getElement (nonce) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("style", {
            nonce: nonce,
            href: DISABLE_SCROLLBAR_CLASS_NAME,
            precedence: "base-ui:low",
            children: `.${DISABLE_SCROLLBAR_CLASS_NAME}{scrollbar-width:none}.${DISABLE_SCROLLBAR_CLASS_NAME}::-webkit-scrollbar{display:none}`
        });
    }
};
if ("TURBOPACK compile-time truthy", 1) styleDisableScrollbar.getElement.displayName = "styleDisableScrollbar.getElement";
}),
"[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/use-render/useRender.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useRender",
    ()=>useRender
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$5$2e$0_$40$date$2d$fns$2b$tz$40$1$2e$4$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_date$2d$fns$40$4$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$internals$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/internals/useRenderElement.js [app-ssr] (ecmascript)");
;
function useRender(params) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$5$2e$0_$40$date$2d$fns$2b$tz$40$1$2e$4$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_date$2d$fns$40$4$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$internals$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderElement"])(params.defaultTagName ?? 'div', params, params);
}
}),
"[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/fieldset/root/FieldsetRootContext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FieldsetRootContext",
    ()=>FieldsetRootContext,
    "useFieldsetRootContext",
    ()=>useFieldsetRootContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/next@16.2.6_@babel+core@7.29.7_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const FieldsetRootContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"]({
    legendId: undefined,
    setLegendId: ()=>{},
    disabled: undefined
});
if ("TURBOPACK compile-time truthy", 1) FieldsetRootContext.displayName = "FieldsetRootContext";
function useFieldsetRootContext(optional = false) {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"](FieldsetRootContext);
    if (!context && !optional) {
        throw new Error(("TURBOPACK compile-time truthy", 1) ? 'Base UI: FieldsetRootContext is missing. Fieldset parts must be placed within <Fieldset.Root>.' : "TURBOPACK unreachable");
    }
    return context;
}
}),
"[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/checkbox-group/CheckboxGroupContext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CheckboxGroupContext",
    ()=>CheckboxGroupContext,
    "useCheckboxGroupContext",
    ()=>useCheckboxGroupContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/next@16.2.6_@babel+core@7.29.7_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const CheckboxGroupContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"](undefined);
if ("TURBOPACK compile-time truthy", 1) CheckboxGroupContext.displayName = "CheckboxGroupContext";
function useCheckboxGroupContext(optional = true) {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"](CheckboxGroupContext);
    if (context === undefined && !optional) {
        throw new Error(("TURBOPACK compile-time truthy", 1) ? 'Base UI: CheckboxGroupContext is missing. CheckboxGroup parts must be placed within <CheckboxGroup>.' : "TURBOPACK unreachable");
    }
    return context;
}
}),
"[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/input/Input.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/next@16.2.6_@babel+core@7.29.7_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$5$2e$0_$40$date$2d$fns$2b$tz$40$1$2e$4$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_date$2d$fns$40$4$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Field$3e$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/field/index.parts.js [app-ssr] (ecmascript) <export * as Field>");
/**
 * A native input element that automatically works with [Field](https://base-ui.com/react/components/field).
 * Renders an `<input>` element.
 *
 * Documentation: [Base UI Input](https://base-ui.com/react/components/input)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/next@16.2.6_@babel+core@7.29.7_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
'use client';
;
;
;
const Input = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function Input(props, forwardedRef) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$5$2e$0_$40$date$2d$fns$2b$tz$40$1$2e$4$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_date$2d$fns$40$4$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$field$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Field$3e$__["Field"].Control, {
        ref: forwardedRef,
        ...props
    });
});
if ("TURBOPACK compile-time truthy", 1) Input.displayName = "Input";
}),
"[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/toolbar/root/ToolbarRootContext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ToolbarRootContext",
    ()=>ToolbarRootContext,
    "useToolbarRootContext",
    ()=>useToolbarRootContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/next@16.2.6_@babel+core@7.29.7_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const ToolbarRootContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"](undefined);
if ("TURBOPACK compile-time truthy", 1) ToolbarRootContext.displayName = "ToolbarRootContext";
function useToolbarRootContext(optional) {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"](ToolbarRootContext);
    if (context === undefined && !optional) {
        throw new Error(("TURBOPACK compile-time truthy", 1) ? 'Base UI: ToolbarRootContext is missing. Toolbar parts must be placed within <Toolbar.Root>.' : "TURBOPACK unreachable");
    }
    return context;
}
}),
"[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/separator/Separator.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Separator",
    ()=>Separator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/next@16.2.6_@babel+core@7.29.7_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$5$2e$0_$40$date$2d$fns$2b$tz$40$1$2e$4$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_date$2d$fns$40$4$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$internals$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/LicenseAudit/frontend/node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_@types+react@19.2.14_date-fns@4.1.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui/react/esm/internals/useRenderElement.js [app-ssr] (ecmascript)");
'use client';
;
;
const Separator = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function SeparatorComponent(componentProps, forwardedRef) {
    const { className, render, orientation = 'horizontal', style, ...elementProps } = componentProps;
    const state = {
        orientation
    };
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$LicenseAudit$2f$frontend$2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$5$2e$0_$40$date$2d$fns$2b$tz$40$1$2e$4$2e$1_$40$types$2b$react$40$19$2e$2$2e$14_date$2d$fns$40$4$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$internals$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderElement"])('div', componentProps, {
        state,
        ref: forwardedRef,
        props: [
            {
                role: 'separator',
                'aria-orientation': orientation
            },
            elementProps
        ]
    });
    return element;
});
if ("TURBOPACK compile-time truthy", 1) Separator.displayName = "Separator";
}),
];

//# sourceMappingURL=0i90_%40base-ui_react_esm_0kp1hh_._.js.map