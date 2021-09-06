// ==UserScript==
// @name        Figma CSS Better
// @namespace   https://github.com/lbb00
// @version     1.2.2
// @description Figma CSS 转为小程序样式
// @encoding    utf-8
// @author      lbb00
// @homepage    https://github.com/lbb00/figma-css-better
// @supportURL  https://github.com/lbb00/figma-css-better/issues
// @updateURL   https://github.com/lbb00/figma-css-better/raw/master/figma-css-better.user.js
// @downloadURL https://github.com/lbb00/figma-css-better/raw/master/figma-css-better.user.js
// @match       *://www.figma.com/file/*
// @match       https://lbb00.github.io/figma-css-better/setting
// @run-at      document-start
// @icon        https://www.google.com/s2/favicons?domain=figma.com
// @license     https://github.com/lbb00/figma-css-better/blob/main/LICENSE
// @grant       unsafeWindow
// @grant       window.console
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==
!function() {
    "use strict";
    var freeGlobal = "object" == typeof global && global && global.Object === Object && global, freeSelf = "object" == typeof self && self && self.Object === Object && self, root$1 = freeGlobal || freeSelf || Function("return this")(), Symbol$1 = root$1.Symbol, objectProto$1 = Object.prototype, hasOwnProperty$1 = objectProto$1.hasOwnProperty, nativeObjectToString$1 = objectProto$1.toString, symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : void 0;
    var nativeObjectToString = Object.prototype.toString;
    var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : void 0;
    function baseGetTag(value) {
        return null == value ? void 0 === value ? "[object Undefined]" : "[object Null]" : symToStringTag && symToStringTag in Object(value) ? function getRawTag(value) {
            var isOwn = hasOwnProperty$1.call(value, symToStringTag$1), tag = value[symToStringTag$1];
            try {
                value[symToStringTag$1] = void 0;
                var unmasked = !0;
            } catch (e) {}
            var result = nativeObjectToString$1.call(value);
            return unmasked && (isOwn ? value[symToStringTag$1] = tag : delete value[symToStringTag$1]), 
            result;
        }(value) : function objectToString(value) {
            return nativeObjectToString.call(value);
        }(value);
    }
    var reWhitespace = /\s/;
    var reTrimStart = /^\s+/;
    function baseTrim(string) {
        return string ? string.slice(0, function trimmedEndIndex(string) {
            for (var index = string.length; index-- && reWhitespace.test(string.charAt(index)); ) ;
            return index;
        }(string) + 1).replace(reTrimStart, "") : string;
    }
    function isObject(value) {
        var type = typeof value;
        return null != value && ("object" == type || "function" == type);
    }
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i, reIsBinary = /^0b[01]+$/i, reIsOctal = /^0o[0-7]+$/i, freeParseInt = parseInt;
    function toNumber(value) {
        if ("number" == typeof value) return value;
        if (function isSymbol(value) {
            return "symbol" == typeof value || function isObjectLike(value) {
                return null != value && "object" == typeof value;
            }(value) && "[object Symbol]" == baseGetTag(value);
        }(value)) return NaN;
        if (isObject(value)) {
            var other = "function" == typeof value.valueOf ? value.valueOf() : value;
            value = isObject(other) ? other + "" : other;
        }
        if ("string" != typeof value) return 0 === value ? value : +value;
        value = baseTrim(value);
        var isBinary = reIsBinary.test(value);
        return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NaN : +value;
    }
    var now = function() {
        return root$1.Date.now();
    }, nativeMax = Math.max, nativeMin = Math.min;
    function debounce(func, wait, options) {
        var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = !1, maxing = !1, trailing = !0;
        if ("function" != typeof func) throw new TypeError("Expected a function");
        function invokeFunc(time) {
            var args = lastArgs, thisArg = lastThis;
            return lastArgs = lastThis = void 0, lastInvokeTime = time, result = func.apply(thisArg, args);
        }
        function leadingEdge(time) {
            return lastInvokeTime = time, timerId = setTimeout(timerExpired, wait), leading ? invokeFunc(time) : result;
        }
        function shouldInvoke(time) {
            var timeSinceLastCall = time - lastCallTime;
            return void 0 === lastCallTime || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && time - lastInvokeTime >= maxWait;
        }
        function timerExpired() {
            var time = now();
            if (shouldInvoke(time)) return trailingEdge(time);
            timerId = setTimeout(timerExpired, function remainingWait(time) {
                var timeWaiting = wait - (time - lastCallTime);
                return maxing ? nativeMin(timeWaiting, maxWait - (time - lastInvokeTime)) : timeWaiting;
            }(time));
        }
        function trailingEdge(time) {
            return timerId = void 0, trailing && lastArgs ? invokeFunc(time) : (lastArgs = lastThis = void 0, 
            result);
        }
        function debounced() {
            var time = now(), isInvoking = shouldInvoke(time);
            if (lastArgs = arguments, lastThis = this, lastCallTime = time, isInvoking) {
                if (void 0 === timerId) return leadingEdge(lastCallTime);
                if (maxing) return clearTimeout(timerId), timerId = setTimeout(timerExpired, wait), 
                invokeFunc(lastCallTime);
            }
            return void 0 === timerId && (timerId = setTimeout(timerExpired, wait)), result;
        }
        return wait = toNumber(wait) || 0, isObject(options) && (leading = !!options.leading, 
        maxWait = (maxing = "maxWait" in options) ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait, 
        trailing = "trailing" in options ? !!options.trailing : trailing), debounced.cancel = function cancel() {
            void 0 !== timerId && clearTimeout(timerId), lastInvokeTime = 0, lastArgs = lastCallTime = lastThis = timerId = void 0;
        }, debounced.flush = function flush() {
            return void 0 === timerId ? result : trailingEdge(now());
        }, debounced;
    }
    function noop() {}
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return "function" == typeof thing;
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || a && "object" == typeof a || "function" == typeof a;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(" ");
    }
    function listen(node, event, handler, options) {
        return node.addEventListener(event, handler, options), () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        null == value ? node.removeAttribute(attribute) : node.getAttribute(attribute) !== value && node.setAttribute(attribute, value);
    }
    function set_input_value(input, value) {
        input.value = null == value ? "" : value;
    }
    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    const dirty_components = [], binding_callbacks = [], render_callbacks = [], flush_callbacks = [], resolved_promise = Promise.resolve();
    let update_scheduled = !1;
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = !1;
    const seen_callbacks = new Set;
    function flush() {
        if (!flushing) {
            flushing = !0;
            do {
                for (let i = 0; i < dirty_components.length; i += 1) {
                    const component = dirty_components[i];
                    set_current_component(component), update(component.$$);
                }
                for (set_current_component(null), dirty_components.length = 0; binding_callbacks.length; ) binding_callbacks.pop()();
                for (let i = 0; i < render_callbacks.length; i += 1) {
                    const callback = render_callbacks[i];
                    seen_callbacks.has(callback) || (seen_callbacks.add(callback), callback());
                }
                render_callbacks.length = 0;
            } while (dirty_components.length);
            for (;flush_callbacks.length; ) flush_callbacks.pop()();
            update_scheduled = !1, flushing = !1, seen_callbacks.clear();
        }
    }
    function update($$) {
        if (null !== $$.fragment) {
            $$.update(), run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [ -1 ], $$.fragment && $$.fragment.p($$.ctx, dirty), $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set;
    function transition_in(block, local) {
        block && block.i && (outroing.delete(block), block.i(local));
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block)) return;
            outroing.add(block), undefined.c.push((() => {
                outroing.delete(block), callback && (detach && block.d(1), callback());
            })), block.o(local);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const {fragment: fragment, on_mount: on_mount, on_destroy: on_destroy, after_update: after_update} = component.$$;
        fragment && fragment.m(target, anchor), customElement || add_render_callback((() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            on_destroy ? on_destroy.push(...new_on_destroy) : run_all(new_on_destroy), component.$$.on_mount = [];
        })), after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        null !== $$.fragment && (run_all($$.on_destroy), $$.fragment && $$.fragment.d(detaching), 
        $$.on_destroy = $$.fragment = null, $$.ctx = []);
    }
    function make_dirty(component, i) {
        -1 === component.$$.dirty[0] && (dirty_components.push(component), function schedule_update() {
            update_scheduled || (update_scheduled = !0, resolved_promise.then(flush));
        }(), component.$$.dirty.fill(0)), component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [ -1 ]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            props: props,
            update: noop,
            not_equal: not_equal,
            bound: blank_object(),
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : options.context || []),
            callbacks: blank_object(),
            dirty: dirty,
            skip_bound: !1,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = !1;
        if ($$.ctx = instance ? instance(component, options.props || {}, ((i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            return $$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value) && (!$$.skip_bound && $$.bound[i] && $$.bound[i](value), 
            ready && make_dirty(component, i)), ret;
        })) : [], $$.update(), ready = !0, run_all($$.before_update), $$.fragment = !!create_fragment && create_fragment($$.ctx), 
        options.target) {
            if (options.hydrate) {
                const nodes = function children(element) {
                    return Array.from(element.childNodes);
                }(options.target);
                $$.fragment && $$.fragment.l(nodes), nodes.forEach(detach);
            } else $$.fragment && $$.fragment.c();
            options.intro && transition_in(component.$$.fragment), mount_component(component, options.target, options.anchor, options.customElement), 
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1), this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
            return callbacks.push(callback), () => {
                const index = callbacks.indexOf(callback);
                -1 !== index && callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            this.$$set && !function is_empty(obj) {
                return 0 === Object.keys(obj).length;
            }($$props) && (this.$$.skip_bound = !0, this.$$set($$props), this.$$.skip_bound = !1);
        }
    }
    function styleInject(css, ref) {
        void 0 === ref && (ref = {});
        var insertAt = ref.insertAt;
        if (css && "undefined" != typeof document) {
            var head = document.head || document.getElementsByTagName("head")[0], style = document.createElement("style");
            style.type = "text/css", "top" === insertAt && head.firstChild ? head.insertBefore(style, head.firstChild) : head.appendChild(style), 
            style.styleSheet ? style.styleSheet.cssText = css : style.appendChild(document.createTextNode(css));
        }
    }
    function create_fragment$4(ctx) {
        let div, t, div_class_value;
        return {
            c() {
                div = element("div"), t = text(ctx[2]), attr(div, "class", div_class_value = "lbb-toast " + (ctx[1] ? "" : "lbb-toast--hide") + " svelte-6z5ekl");
            },
            m(target, anchor) {
                insert(target, div, anchor), append(div, t), ctx[4](div);
            },
            p(ctx, [dirty]) {
                4 & dirty && function set_data(text, data) {
                    data = "" + data, text.wholeText !== data && (text.data = data);
                }(t, ctx[2]), 2 & dirty && div_class_value !== (div_class_value = "lbb-toast " + (ctx[1] ? "" : "lbb-toast--hide") + " svelte-6z5ekl") && attr(div, "class", div_class_value);
            },
            i: noop,
            o: noop,
            d(detaching) {
                detaching && detach(div), ctx[4](null);
            }
        };
    }
    function instance$3($$self, $$props, $$invalidate) {
        let toast, content, visiable = !1, closeTimer = null;
        return [ toast, visiable, content, function show({title: title, duration: duration = 1500}) {
            $$invalidate(2, content = title), closeTimer && clearTimeout(closeTimer), $$invalidate(1, visiable = !0), 
            closeTimer = setTimeout((() => {
                $$invalidate(1, visiable = !1), closeTimer = null;
            }), duration);
        }, function div_binding($$value) {
            binding_callbacks[$$value ? "unshift" : "push"]((() => {
                toast = $$value, $$invalidate(0, toast);
            }));
        } ];
    }
    styleInject(".lbb-toast.svelte-6z5ekl{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);border-radius:4px;background-color:rgba(0,0,0,.8);padding:12px 24px;max-width:200px;color:#eee;font-size:16px;z-index:9999999}.lbb-toast--hide.svelte-6z5ekl{z-index:-1;visibility:hidden}");
    class Toast extends SvelteComponent {
        constructor(options) {
            super(), init(this, options, instance$3, create_fragment$4, safe_not_equal, {
                show: 3
            });
        }
        get show() {
            return this.$$.ctx[3];
        }
    }
    const toast = function(createInstance, {withKey: withKey = !1, immediate: immediate = !1} = {}) {
        const UNDEFINED_INSTANCE = {};
        let _key, _instance = UNDEFINED_INSTANCE;
        function getSingleton(key) {
            return _instance !== UNDEFINED_INSTANCE && function checkSameKey(key) {
                return !withKey || void 0 === key || key === _key;
            }(key) || (_key = key, _instance = createInstance(_key)), _instance;
        }
        return immediate && getSingleton(), getSingleton;
    }((() => {
        const toastEl = new Toast({
            target: document.body,
            props: {
                content: ""
            }
        });
        return ({title: title, duration: duration = 1500}) => {
            toastEl.show({
                title: title,
                duration: duration
            });
        };
    }))();
    function getDefaultExportFromCjs(x) {
        return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x.default : x;
    }
    function getAugmentedNamespace(n) {
        if (n.__esModule) return n;
        var a = Object.defineProperty({}, "__esModule", {
            value: !0
        });
        return Object.keys(n).forEach((function(k) {
            var d = Object.getOwnPropertyDescriptor(n, k);
            Object.defineProperty(a, k, d.get ? d : {
                enumerable: !0,
                get: function() {
                    return n[k];
                }
            });
        })), a;
    }
    var require$$4 = getAugmentedNamespace(Object.freeze({
        __proto__: null,
        default: {}
    }));
    let {red: red, bold: bold, gray: gray, options: colorette} = require$$4, terminalHighlight$1 = require$$4;
    class CssSyntaxError$3 extends Error {
        constructor(message, line, column, source, file, plugin) {
            super(message), this.name = "CssSyntaxError", this.reason = message, file && (this.file = file), 
            source && (this.source = source), plugin && (this.plugin = plugin), void 0 !== line && void 0 !== column && (this.line = line, 
            this.column = column), this.setMessage(), Error.captureStackTrace && Error.captureStackTrace(this, CssSyntaxError$3);
        }
        setMessage() {
            this.message = this.plugin ? this.plugin + ": " : "", this.message += this.file ? this.file : "<css input>", 
            void 0 !== this.line && (this.message += ":" + this.line + ":" + this.column), this.message += ": " + this.reason;
        }
        showSourceCode(color) {
            if (!this.source) return "";
            let css = this.source;
            null == color && (color = colorette.enabled), terminalHighlight$1 && color && (css = terminalHighlight$1(css));
            let mark, aside, lines = css.split(/\r?\n/), start = Math.max(this.line - 3, 0), end = Math.min(this.line + 2, lines.length), maxWidth = String(end).length;
            return color ? (mark = text => bold(red(text)), aside = text => gray(text)) : mark = aside = str => str, 
            lines.slice(start, end).map(((line, index) => {
                let number = start + 1 + index, gutter = " " + (" " + number).slice(-maxWidth) + " | ";
                if (number === this.line) {
                    let spacing = aside(gutter.replace(/\d/g, " ")) + line.slice(0, this.column - 1).replace(/[^\t]/g, " ");
                    return mark(">") + aside(gutter) + line + "\n " + spacing + mark("^");
                }
                return " " + aside(gutter) + line;
            })).join("\n");
        }
        toString() {
            let code = this.showSourceCode();
            return code && (code = "\n\n" + code + "\n"), this.name + ": " + this.message + code;
        }
    }
    var cssSyntaxError = CssSyntaxError$3;
    CssSyntaxError$3.default = CssSyntaxError$3;
    var symbols = {};
    symbols.isClean = Symbol("isClean"), symbols.my = Symbol("my");
    const DEFAULT_RAW = {
        colon: ": ",
        indent: "    ",
        beforeDecl: "\n",
        beforeRule: "\n",
        beforeOpen: " ",
        beforeClose: "\n",
        beforeComment: "\n",
        after: "\n",
        emptyBody: "",
        commentLeft: " ",
        commentRight: " ",
        semicolon: !1
    };
    var stringifier = class Stringifier$2 {
        constructor(builder) {
            this.builder = builder;
        }
        stringify(node, semicolon) {
            if (!this[node.type]) throw new Error("Unknown AST node type " + node.type + ". Maybe you need to change PostCSS stringifier.");
            this[node.type](node, semicolon);
        }
        document(node) {
            this.body(node);
        }
        root(node) {
            this.body(node), node.raws.after && this.builder(node.raws.after);
        }
        comment(node) {
            let left = this.raw(node, "left", "commentLeft"), right = this.raw(node, "right", "commentRight");
            this.builder("/*" + left + node.text + right + "*/", node);
        }
        decl(node, semicolon) {
            let between = this.raw(node, "between", "colon"), string = node.prop + between + this.rawValue(node, "value");
            node.important && (string += node.raws.important || " !important"), semicolon && (string += ";"), 
            this.builder(string, node);
        }
        rule(node) {
            this.block(node, this.rawValue(node, "selector")), node.raws.ownSemicolon && this.builder(node.raws.ownSemicolon, node, "end");
        }
        atrule(node, semicolon) {
            let name = "@" + node.name, params = node.params ? this.rawValue(node, "params") : "";
            if (void 0 !== node.raws.afterName ? name += node.raws.afterName : params && (name += " "), 
            node.nodes) this.block(node, name + params); else {
                let end = (node.raws.between || "") + (semicolon ? ";" : "");
                this.builder(name + params + end, node);
            }
        }
        body(node) {
            let last = node.nodes.length - 1;
            for (;last > 0 && "comment" === node.nodes[last].type; ) last -= 1;
            let semicolon = this.raw(node, "semicolon");
            for (let i = 0; i < node.nodes.length; i++) {
                let child = node.nodes[i], before = this.raw(child, "before");
                before && this.builder(before), this.stringify(child, last !== i || semicolon);
            }
        }
        block(node, start) {
            let after, between = this.raw(node, "between", "beforeOpen");
            this.builder(start + between + "{", node, "start"), node.nodes && node.nodes.length ? (this.body(node), 
            after = this.raw(node, "after")) : after = this.raw(node, "after", "emptyBody"), 
            after && this.builder(after), this.builder("}", node, "end");
        }
        raw(node, own, detect) {
            let value;
            if (detect || (detect = own), own && (value = node.raws[own], void 0 !== value)) return value;
            let parent = node.parent;
            if ("before" === detect) {
                if (!parent || "root" === parent.type && parent.first === node) return "";
                if (parent && "document" === parent.type) return "";
            }
            if (!parent) return DEFAULT_RAW[detect];
            let root = node.root();
            if (root.rawCache || (root.rawCache = {}), void 0 !== root.rawCache[detect]) return root.rawCache[detect];
            if ("before" === detect || "after" === detect) return this.beforeAfter(node, detect);
            {
                let method = "raw" + function capitalize(str) {
                    return str[0].toUpperCase() + str.slice(1);
                }(detect);
                this[method] ? value = this[method](root, node) : root.walk((i => {
                    if (value = i.raws[own], void 0 !== value) return !1;
                }));
            }
            return void 0 === value && (value = DEFAULT_RAW[detect]), root.rawCache[detect] = value, 
            value;
        }
        rawSemicolon(root) {
            let value;
            return root.walk((i => {
                if (i.nodes && i.nodes.length && "decl" === i.last.type && (value = i.raws.semicolon, 
                void 0 !== value)) return !1;
            })), value;
        }
        rawEmptyBody(root) {
            let value;
            return root.walk((i => {
                if (i.nodes && 0 === i.nodes.length && (value = i.raws.after, void 0 !== value)) return !1;
            })), value;
        }
        rawIndent(root) {
            if (root.raws.indent) return root.raws.indent;
            let value;
            return root.walk((i => {
                let p = i.parent;
                if (p && p !== root && p.parent && p.parent === root && void 0 !== i.raws.before) {
                    let parts = i.raws.before.split("\n");
                    return value = parts[parts.length - 1], value = value.replace(/\S/g, ""), !1;
                }
            })), value;
        }
        rawBeforeComment(root, node) {
            let value;
            return root.walkComments((i => {
                if (void 0 !== i.raws.before) return value = i.raws.before, value.includes("\n") && (value = value.replace(/[^\n]+$/, "")), 
                !1;
            })), void 0 === value ? value = this.raw(node, null, "beforeDecl") : value && (value = value.replace(/\S/g, "")), 
            value;
        }
        rawBeforeDecl(root, node) {
            let value;
            return root.walkDecls((i => {
                if (void 0 !== i.raws.before) return value = i.raws.before, value.includes("\n") && (value = value.replace(/[^\n]+$/, "")), 
                !1;
            })), void 0 === value ? value = this.raw(node, null, "beforeRule") : value && (value = value.replace(/\S/g, "")), 
            value;
        }
        rawBeforeRule(root) {
            let value;
            return root.walk((i => {
                if (i.nodes && (i.parent !== root || root.first !== i) && void 0 !== i.raws.before) return value = i.raws.before, 
                value.includes("\n") && (value = value.replace(/[^\n]+$/, "")), !1;
            })), value && (value = value.replace(/\S/g, "")), value;
        }
        rawBeforeClose(root) {
            let value;
            return root.walk((i => {
                if (i.nodes && i.nodes.length > 0 && void 0 !== i.raws.after) return value = i.raws.after, 
                value.includes("\n") && (value = value.replace(/[^\n]+$/, "")), !1;
            })), value && (value = value.replace(/\S/g, "")), value;
        }
        rawBeforeOpen(root) {
            let value;
            return root.walk((i => {
                if ("decl" !== i.type && (value = i.raws.between, void 0 !== value)) return !1;
            })), value;
        }
        rawColon(root) {
            let value;
            return root.walkDecls((i => {
                if (void 0 !== i.raws.between) return value = i.raws.between.replace(/[^\s:]/g, ""), 
                !1;
            })), value;
        }
        beforeAfter(node, detect) {
            let value;
            value = "decl" === node.type ? this.raw(node, null, "beforeDecl") : "comment" === node.type ? this.raw(node, null, "beforeComment") : "before" === detect ? this.raw(node, null, "beforeRule") : this.raw(node, null, "beforeClose");
            let buf = node.parent, depth = 0;
            for (;buf && "root" !== buf.type; ) depth += 1, buf = buf.parent;
            if (value.includes("\n")) {
                let indent = this.raw(node, null, "indent");
                if (indent.length) for (let step = 0; step < depth; step++) value += indent;
            }
            return value;
        }
        rawValue(node, prop) {
            let value = node[prop], raw = node.raws[prop];
            return raw && raw.value === value ? raw.raw : value;
        }
    };
    let Stringifier$1 = stringifier;
    function stringify$3(node, builder) {
        new Stringifier$1(builder).stringify(node);
    }
    var stringify_1 = stringify$3;
    stringify$3.default = stringify$3;
    let {isClean: isClean$2, my: my$2} = symbols, CssSyntaxError$2 = cssSyntaxError, Stringifier = stringifier, stringify$2 = stringify_1;
    function cloneNode(obj, parent) {
        let cloned = new obj.constructor;
        for (let i in obj) {
            if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
            if ("proxyCache" === i) continue;
            let value = obj[i], type = typeof value;
            "parent" === i && "object" === type ? parent && (cloned[i] = parent) : "source" === i ? cloned[i] = value : Array.isArray(value) ? cloned[i] = value.map((j => cloneNode(j, cloned))) : ("object" === type && null !== value && (value = cloneNode(value)), 
            cloned[i] = value);
        }
        return cloned;
    }
    class Node$4 {
        constructor(defaults = {}) {
            this.raws = {}, this[isClean$2] = !1, this[my$2] = !0;
            for (let name in defaults) if ("nodes" === name) {
                this.nodes = [];
                for (let node of defaults[name]) "function" == typeof node.clone ? this.append(node.clone()) : this.append(node);
            } else this[name] = defaults[name];
        }
        error(message, opts = {}) {
            if (this.source) {
                let pos = this.positionBy(opts);
                return this.source.input.error(message, pos.line, pos.column, opts);
            }
            return new CssSyntaxError$2(message);
        }
        warn(result, text, opts) {
            let data = {
                node: this
            };
            for (let i in opts) data[i] = opts[i];
            return result.warn(text, data);
        }
        remove() {
            return this.parent && this.parent.removeChild(this), this.parent = void 0, this;
        }
        toString(stringifier = stringify$2) {
            stringifier.stringify && (stringifier = stringifier.stringify);
            let result = "";
            return stringifier(this, (i => {
                result += i;
            })), result;
        }
        assign(overrides = {}) {
            for (let name in overrides) this[name] = overrides[name];
            return this;
        }
        clone(overrides = {}) {
            let cloned = cloneNode(this);
            for (let name in overrides) cloned[name] = overrides[name];
            return cloned;
        }
        cloneBefore(overrides = {}) {
            let cloned = this.clone(overrides);
            return this.parent.insertBefore(this, cloned), cloned;
        }
        cloneAfter(overrides = {}) {
            let cloned = this.clone(overrides);
            return this.parent.insertAfter(this, cloned), cloned;
        }
        replaceWith(...nodes) {
            if (this.parent) {
                let bookmark = this, foundSelf = !1;
                for (let node of nodes) node === this ? foundSelf = !0 : foundSelf ? (this.parent.insertAfter(bookmark, node), 
                bookmark = node) : this.parent.insertBefore(bookmark, node);
                foundSelf || this.remove();
            }
            return this;
        }
        next() {
            if (!this.parent) return;
            let index = this.parent.index(this);
            return this.parent.nodes[index + 1];
        }
        prev() {
            if (!this.parent) return;
            let index = this.parent.index(this);
            return this.parent.nodes[index - 1];
        }
        before(add) {
            return this.parent.insertBefore(this, add), this;
        }
        after(add) {
            return this.parent.insertAfter(this, add), this;
        }
        root() {
            let result = this;
            for (;result.parent && "document" !== result.parent.type; ) result = result.parent;
            return result;
        }
        raw(prop, defaultType) {
            return (new Stringifier).raw(this, prop, defaultType);
        }
        cleanRaws(keepBetween) {
            delete this.raws.before, delete this.raws.after, keepBetween || delete this.raws.between;
        }
        toJSON(_, inputs) {
            let fixed = {}, emitInputs = null == inputs;
            inputs = inputs || new Map;
            let inputsNextIndex = 0;
            for (let name in this) {
                if (!Object.prototype.hasOwnProperty.call(this, name)) continue;
                if ("parent" === name || "proxyCache" === name) continue;
                let value = this[name];
                if (Array.isArray(value)) fixed[name] = value.map((i => "object" == typeof i && i.toJSON ? i.toJSON(null, inputs) : i)); else if ("object" == typeof value && value.toJSON) fixed[name] = value.toJSON(null, inputs); else if ("source" === name) {
                    let inputId = inputs.get(value.input);
                    null == inputId && (inputId = inputsNextIndex, inputs.set(value.input, inputsNextIndex), 
                    inputsNextIndex++), fixed[name] = {
                        inputId: inputId,
                        start: value.start,
                        end: value.end
                    };
                } else fixed[name] = value;
            }
            return emitInputs && (fixed.inputs = [ ...inputs.keys() ].map((input => input.toJSON()))), 
            fixed;
        }
        positionInside(index) {
            let string = this.toString(), column = this.source.start.column, line = this.source.start.line;
            for (let i = 0; i < index; i++) "\n" === string[i] ? (column = 1, line += 1) : column += 1;
            return {
                line: line,
                column: column
            };
        }
        positionBy(opts) {
            let pos = this.source.start;
            if (opts.index) pos = this.positionInside(opts.index); else if (opts.word) {
                let index = this.toString().indexOf(opts.word);
                -1 !== index && (pos = this.positionInside(index));
            }
            return pos;
        }
        getProxyProcessor() {
            return {
                set: (node, prop, value) => (node[prop] === value || (node[prop] = value, "prop" !== prop && "value" !== prop && "name" !== prop && "params" !== prop && "important" !== prop && "text" !== prop || node.markDirty()), 
                !0),
                get: (node, prop) => "proxyOf" === prop ? node : "root" === prop ? () => node.root().toProxy() : node[prop]
            };
        }
        toProxy() {
            return this.proxyCache || (this.proxyCache = new Proxy(this, this.getProxyProcessor())), 
            this.proxyCache;
        }
        addToError(error) {
            if (error.postcssNode = this, error.stack && this.source && /\n\s{4}at /.test(error.stack)) {
                let s = this.source;
                error.stack = error.stack.replace(/\n\s{4}at /, `$&${s.input.from}:${s.start.line}:${s.start.column}$&`);
            }
            return error;
        }
        markDirty() {
            if (this[isClean$2]) {
                this[isClean$2] = !1;
                let next = this;
                for (;next = next.parent; ) next[isClean$2] = !1;
            }
        }
        get proxyOf() {
            return this;
        }
    }
    var node_1 = Node$4;
    Node$4.default = Node$4;
    let Node$3 = node_1;
    class Declaration$4 extends Node$3 {
        constructor(defaults) {
            defaults && void 0 !== defaults.value && "string" != typeof defaults.value && (defaults = {
                ...defaults,
                value: String(defaults.value)
            }), super(defaults), this.type = "decl";
        }
        get variable() {
            return this.prop.startsWith("--") || "$" === this.prop[0];
        }
    }
    var declaration = Declaration$4;
    Declaration$4.default = Declaration$4;
    let {SourceMapConsumer: SourceMapConsumer$2, SourceMapGenerator: SourceMapGenerator$2} = require$$4, {dirname: dirname$1, resolve: resolve$1, relative: relative, sep: sep} = require$$4, {pathToFileURL: pathToFileURL$1} = require$$4, sourceMapAvailable$1 = Boolean(SourceMapConsumer$2 && SourceMapGenerator$2), pathAvailable$1 = Boolean(dirname$1 && resolve$1 && relative && sep);
    var mapGenerator = class MapGenerator$1 {
        constructor(stringify, root, opts) {
            this.stringify = stringify, this.mapOpts = opts.map || {}, this.root = root, this.opts = opts;
        }
        isMap() {
            return void 0 !== this.opts.map ? !!this.opts.map : this.previous().length > 0;
        }
        previous() {
            return this.previousMaps || (this.previousMaps = [], this.root.walk((node => {
                if (node.source && node.source.input.map) {
                    let map = node.source.input.map;
                    this.previousMaps.includes(map) || this.previousMaps.push(map);
                }
            }))), this.previousMaps;
        }
        isInline() {
            if (void 0 !== this.mapOpts.inline) return this.mapOpts.inline;
            let annotation = this.mapOpts.annotation;
            return (void 0 === annotation || !0 === annotation) && (!this.previous().length || this.previous().some((i => i.inline)));
        }
        isSourcesContent() {
            return void 0 !== this.mapOpts.sourcesContent ? this.mapOpts.sourcesContent : !this.previous().length || this.previous().some((i => i.withContent()));
        }
        clearAnnotation() {
            if (!1 === this.mapOpts.annotation) return;
            let node;
            for (let i = this.root.nodes.length - 1; i >= 0; i--) node = this.root.nodes[i], 
            "comment" === node.type && 0 === node.text.indexOf("# sourceMappingURL=") && this.root.removeChild(i);
        }
        setSourcesContent() {
            let already = {};
            this.root.walk((node => {
                if (node.source) {
                    let from = node.source.input.from;
                    from && !already[from] && (already[from] = !0, this.map.setSourceContent(this.toUrl(this.path(from)), node.source.input.css));
                }
            }));
        }
        applyPrevMaps() {
            for (let prev of this.previous()) {
                let map, from = this.toUrl(this.path(prev.file)), root = prev.root || dirname$1(prev.file);
                !1 === this.mapOpts.sourcesContent ? (map = new SourceMapConsumer$2(prev.text), 
                map.sourcesContent && (map.sourcesContent = map.sourcesContent.map((() => null)))) : map = prev.consumer(), 
                this.map.applySourceMap(map, from, this.toUrl(this.path(root)));
            }
        }
        isAnnotation() {
            return !!this.isInline() || (void 0 !== this.mapOpts.annotation ? this.mapOpts.annotation : !this.previous().length || this.previous().some((i => i.annotation)));
        }
        toBase64(str) {
            return Buffer ? Buffer.from(str).toString("base64") : window.btoa(unescape(encodeURIComponent(str)));
        }
        addAnnotation() {
            let content;
            content = this.isInline() ? "data:application/json;base64," + this.toBase64(this.map.toString()) : "string" == typeof this.mapOpts.annotation ? this.mapOpts.annotation : "function" == typeof this.mapOpts.annotation ? this.mapOpts.annotation(this.opts.to, this.root) : this.outputFile() + ".map";
            let eol = "\n";
            this.css.includes("\r\n") && (eol = "\r\n"), this.css += eol + "/*# sourceMappingURL=" + content + " */";
        }
        outputFile() {
            return this.opts.to ? this.path(this.opts.to) : this.opts.from ? this.path(this.opts.from) : "to.css";
        }
        generateMap() {
            return this.generateString(), this.isSourcesContent() && this.setSourcesContent(), 
            this.previous().length > 0 && this.applyPrevMaps(), this.isAnnotation() && this.addAnnotation(), 
            this.isInline() ? [ this.css ] : [ this.css, this.map ];
        }
        path(file) {
            if (0 === file.indexOf("<")) return file;
            if (/^\w+:\/\//.test(file)) return file;
            if (this.mapOpts.absolute) return file;
            let from = this.opts.to ? dirname$1(this.opts.to) : ".";
            return "string" == typeof this.mapOpts.annotation && (from = dirname$1(resolve$1(from, this.mapOpts.annotation))), 
            file = relative(from, file);
        }
        toUrl(path) {
            return "\\" === sep && (path = path.replace(/\\/g, "/")), encodeURI(path).replace(/[#?]/g, encodeURIComponent);
        }
        sourcePath(node) {
            if (this.mapOpts.from) return this.toUrl(this.mapOpts.from);
            if (this.mapOpts.absolute) {
                if (pathToFileURL$1) return pathToFileURL$1(node.source.input.from).toString();
                throw new Error("`map.absolute` option is not available in this PostCSS build");
            }
            return this.toUrl(this.path(node.source.input.from));
        }
        generateString() {
            this.css = "", this.map = new SourceMapGenerator$2({
                file: this.outputFile()
            });
            let lines, last, line = 1, column = 1, mapping = {
                source: "",
                generated: {
                    line: 0,
                    column: 0
                },
                original: {
                    line: 0,
                    column: 0
                }
            };
            this.stringify(this.root, ((str, node, type) => {
                if (this.css += str, node && "end" !== type && (mapping.generated.line = line, mapping.generated.column = column - 1, 
                node.source && node.source.start ? (mapping.source = this.sourcePath(node), mapping.original.line = node.source.start.line, 
                mapping.original.column = node.source.start.column - 1, this.map.addMapping(mapping)) : (mapping.source = "<no source>", 
                mapping.original.line = 1, mapping.original.column = 0, this.map.addMapping(mapping))), 
                lines = str.match(/\n/g), lines ? (line += lines.length, last = str.lastIndexOf("\n"), 
                column = str.length - last) : column += str.length, node && "start" !== type) {
                    let p = node.parent || {
                        raws: {}
                    };
                    ("decl" !== node.type || node !== p.last || p.raws.semicolon) && (node.source && node.source.end ? (mapping.source = this.sourcePath(node), 
                    mapping.original.line = node.source.end.line, mapping.original.column = node.source.end.column - 1, 
                    mapping.generated.line = line, mapping.generated.column = column - 2, this.map.addMapping(mapping)) : (mapping.source = "<no source>", 
                    mapping.original.line = 1, mapping.original.column = 0, mapping.generated.line = line, 
                    mapping.generated.column = column - 1, this.map.addMapping(mapping)));
                }
            }));
        }
        generate() {
            if (this.clearAnnotation(), pathAvailable$1 && sourceMapAvailable$1 && this.isMap()) return this.generateMap();
            let result = "";
            return this.stringify(this.root, (i => {
                result += i;
            })), [ result ];
        }
    };
    let Node$2 = node_1;
    class Comment$4 extends Node$2 {
        constructor(defaults) {
            super(defaults), this.type = "comment";
        }
    }
    var comment = Comment$4;
    Comment$4.default = Comment$4;
    let parse$3, Rule$4, AtRule$4, {isClean: isClean$1, my: my$1} = symbols, Declaration$3 = declaration, Comment$3 = comment, Node$1 = node_1;
    function cleanSource(nodes) {
        return nodes.map((i => (i.nodes && (i.nodes = cleanSource(i.nodes)), delete i.source, 
        i)));
    }
    function markDirtyUp(node) {
        if (node[isClean$1] = !1, node.proxyOf.nodes) for (let i of node.proxyOf.nodes) markDirtyUp(i);
    }
    class Container$7 extends Node$1 {
        push(child) {
            return child.parent = this, this.proxyOf.nodes.push(child), this;
        }
        each(callback) {
            if (!this.proxyOf.nodes) return;
            let index, result, iterator = this.getIterator();
            for (;this.indexes[iterator] < this.proxyOf.nodes.length && (index = this.indexes[iterator], 
            result = callback(this.proxyOf.nodes[index], index), !1 !== result); ) this.indexes[iterator] += 1;
            return delete this.indexes[iterator], result;
        }
        walk(callback) {
            return this.each(((child, i) => {
                let result;
                try {
                    result = callback(child, i);
                } catch (e) {
                    throw child.addToError(e);
                }
                return !1 !== result && child.walk && (result = child.walk(callback)), result;
            }));
        }
        walkDecls(prop, callback) {
            return callback ? prop instanceof RegExp ? this.walk(((child, i) => {
                if ("decl" === child.type && prop.test(child.prop)) return callback(child, i);
            })) : this.walk(((child, i) => {
                if ("decl" === child.type && child.prop === prop) return callback(child, i);
            })) : (callback = prop, this.walk(((child, i) => {
                if ("decl" === child.type) return callback(child, i);
            })));
        }
        walkRules(selector, callback) {
            return callback ? selector instanceof RegExp ? this.walk(((child, i) => {
                if ("rule" === child.type && selector.test(child.selector)) return callback(child, i);
            })) : this.walk(((child, i) => {
                if ("rule" === child.type && child.selector === selector) return callback(child, i);
            })) : (callback = selector, this.walk(((child, i) => {
                if ("rule" === child.type) return callback(child, i);
            })));
        }
        walkAtRules(name, callback) {
            return callback ? name instanceof RegExp ? this.walk(((child, i) => {
                if ("atrule" === child.type && name.test(child.name)) return callback(child, i);
            })) : this.walk(((child, i) => {
                if ("atrule" === child.type && child.name === name) return callback(child, i);
            })) : (callback = name, this.walk(((child, i) => {
                if ("atrule" === child.type) return callback(child, i);
            })));
        }
        walkComments(callback) {
            return this.walk(((child, i) => {
                if ("comment" === child.type) return callback(child, i);
            }));
        }
        append(...children) {
            for (let child of children) {
                let nodes = this.normalize(child, this.last);
                for (let node of nodes) this.proxyOf.nodes.push(node);
            }
            return this.markDirty(), this;
        }
        prepend(...children) {
            children = children.reverse();
            for (let child of children) {
                let nodes = this.normalize(child, this.first, "prepend").reverse();
                for (let node of nodes) this.proxyOf.nodes.unshift(node);
                for (let id in this.indexes) this.indexes[id] = this.indexes[id] + nodes.length;
            }
            return this.markDirty(), this;
        }
        cleanRaws(keepBetween) {
            if (super.cleanRaws(keepBetween), this.nodes) for (let node of this.nodes) node.cleanRaws(keepBetween);
        }
        insertBefore(exist, add) {
            let index, type = 0 === (exist = this.index(exist)) && "prepend", nodes = this.normalize(add, this.proxyOf.nodes[exist], type).reverse();
            for (let node of nodes) this.proxyOf.nodes.splice(exist, 0, node);
            for (let id in this.indexes) index = this.indexes[id], exist <= index && (this.indexes[id] = index + nodes.length);
            return this.markDirty(), this;
        }
        insertAfter(exist, add) {
            exist = this.index(exist);
            let index, nodes = this.normalize(add, this.proxyOf.nodes[exist]).reverse();
            for (let node of nodes) this.proxyOf.nodes.splice(exist + 1, 0, node);
            for (let id in this.indexes) index = this.indexes[id], exist < index && (this.indexes[id] = index + nodes.length);
            return this.markDirty(), this;
        }
        removeChild(child) {
            let index;
            child = this.index(child), this.proxyOf.nodes[child].parent = void 0, this.proxyOf.nodes.splice(child, 1);
            for (let id in this.indexes) index = this.indexes[id], index >= child && (this.indexes[id] = index - 1);
            return this.markDirty(), this;
        }
        removeAll() {
            for (let node of this.proxyOf.nodes) node.parent = void 0;
            return this.proxyOf.nodes = [], this.markDirty(), this;
        }
        replaceValues(pattern, opts, callback) {
            return callback || (callback = opts, opts = {}), this.walkDecls((decl => {
                opts.props && !opts.props.includes(decl.prop) || opts.fast && !decl.value.includes(opts.fast) || (decl.value = decl.value.replace(pattern, callback));
            })), this.markDirty(), this;
        }
        every(condition) {
            return this.nodes.every(condition);
        }
        some(condition) {
            return this.nodes.some(condition);
        }
        index(child) {
            return "number" == typeof child ? child : (child.proxyOf && (child = child.proxyOf), 
            this.proxyOf.nodes.indexOf(child));
        }
        get first() {
            if (this.proxyOf.nodes) return this.proxyOf.nodes[0];
        }
        get last() {
            if (this.proxyOf.nodes) return this.proxyOf.nodes[this.proxyOf.nodes.length - 1];
        }
        normalize(nodes, sample) {
            if ("string" == typeof nodes) nodes = cleanSource(parse$3(nodes).nodes); else if (Array.isArray(nodes)) {
                nodes = nodes.slice(0);
                for (let i of nodes) i.parent && i.parent.removeChild(i, "ignore");
            } else if ("root" === nodes.type && "document" !== this.type) {
                nodes = nodes.nodes.slice(0);
                for (let i of nodes) i.parent && i.parent.removeChild(i, "ignore");
            } else if (nodes.type) nodes = [ nodes ]; else if (nodes.prop) {
                if (void 0 === nodes.value) throw new Error("Value field is missed in node creation");
                "string" != typeof nodes.value && (nodes.value = String(nodes.value)), nodes = [ new Declaration$3(nodes) ];
            } else if (nodes.selector) nodes = [ new Rule$4(nodes) ]; else if (nodes.name) nodes = [ new AtRule$4(nodes) ]; else {
                if (!nodes.text) throw new Error("Unknown node type in node creation");
                nodes = [ new Comment$3(nodes) ];
            }
            return nodes.map((i => (i[my$1] || Container$7.rebuild(i), (i = i.proxyOf).parent && i.parent.removeChild(i), 
            i[isClean$1] && markDirtyUp(i), void 0 === i.raws.before && sample && void 0 !== sample.raws.before && (i.raws.before = sample.raws.before.replace(/\S/g, "")), 
            i.parent = this, i)));
        }
        getProxyProcessor() {
            return {
                set: (node, prop, value) => (node[prop] === value || (node[prop] = value, "name" !== prop && "params" !== prop && "selector" !== prop || node.markDirty()), 
                !0),
                get: (node, prop) => "proxyOf" === prop ? node : node[prop] ? "each" === prop || "string" == typeof prop && prop.startsWith("walk") ? (...args) => node[prop](...args.map((i => "function" == typeof i ? (child, index) => i(child.toProxy(), index) : i))) : "every" === prop || "some" === prop ? cb => node[prop](((child, ...other) => cb(child.toProxy(), ...other))) : "root" === prop ? () => node.root().toProxy() : "nodes" === prop ? node.nodes.map((i => i.toProxy())) : "first" === prop || "last" === prop ? node[prop].toProxy() : node[prop] : node[prop]
            };
        }
        getIterator() {
            this.lastEach || (this.lastEach = 0), this.indexes || (this.indexes = {}), this.lastEach += 1;
            let iterator = this.lastEach;
            return this.indexes[iterator] = 0, iterator;
        }
    }
    Container$7.registerParse = dependant => {
        parse$3 = dependant;
    }, Container$7.registerRule = dependant => {
        Rule$4 = dependant;
    }, Container$7.registerAtRule = dependant => {
        AtRule$4 = dependant;
    };
    var container = Container$7;
    Container$7.default = Container$7, Container$7.rebuild = node => {
        "atrule" === node.type ? Object.setPrototypeOf(node, AtRule$4.prototype) : "rule" === node.type ? Object.setPrototypeOf(node, Rule$4.prototype) : "decl" === node.type ? Object.setPrototypeOf(node, Declaration$3.prototype) : "comment" === node.type && Object.setPrototypeOf(node, Comment$3.prototype), 
        node[my$1] = !0, node.nodes && node.nodes.forEach((child => {
            Container$7.rebuild(child);
        }));
    };
    let LazyResult$4, Processor$3, Container$6 = container;
    class Document$3 extends Container$6 {
        constructor(defaults) {
            super({
                type: "document",
                ...defaults
            }), this.nodes || (this.nodes = []);
        }
        toResult(opts = {}) {
            return new LazyResult$4(new Processor$3, this, opts).stringify();
        }
    }
    Document$3.registerLazyResult = dependant => {
        LazyResult$4 = dependant;
    }, Document$3.registerProcessor = dependant => {
        Processor$3 = dependant;
    };
    var document$1 = Document$3;
    Document$3.default = Document$3;
    let printed = {};
    class Warning$2 {
        constructor(text, opts = {}) {
            if (this.type = "warning", this.text = text, opts.node && opts.node.source) {
                let pos = opts.node.positionBy(opts);
                this.line = pos.line, this.column = pos.column;
            }
            for (let opt in opts) this[opt] = opts[opt];
        }
        toString() {
            return this.node ? this.node.error(this.text, {
                plugin: this.plugin,
                index: this.index,
                word: this.word
            }).message : this.plugin ? this.plugin + ": " + this.text : this.text;
        }
    }
    var warning = Warning$2;
    Warning$2.default = Warning$2;
    let Warning$1 = warning;
    class Result$2 {
        constructor(processor, root, opts) {
            this.processor = processor, this.messages = [], this.root = root, this.opts = opts, 
            this.css = void 0, this.map = void 0;
        }
        toString() {
            return this.css;
        }
        warn(text, opts = {}) {
            opts.plugin || this.lastPlugin && this.lastPlugin.postcssPlugin && (opts.plugin = this.lastPlugin.postcssPlugin);
            let warning = new Warning$1(text, opts);
            return this.messages.push(warning), warning;
        }
        warnings() {
            return this.messages.filter((i => "warning" === i.type));
        }
        get content() {
            return this.css;
        }
    }
    var result = Result$2;
    Result$2.default = Result$2;
    const SINGLE_QUOTE = "'".charCodeAt(0), DOUBLE_QUOTE = '"'.charCodeAt(0), BACKSLASH = "\\".charCodeAt(0), SLASH = "/".charCodeAt(0), NEWLINE = "\n".charCodeAt(0), SPACE = " ".charCodeAt(0), FEED = "\f".charCodeAt(0), TAB = "\t".charCodeAt(0), CR = "\r".charCodeAt(0), OPEN_SQUARE = "[".charCodeAt(0), CLOSE_SQUARE = "]".charCodeAt(0), OPEN_PARENTHESES = "(".charCodeAt(0), CLOSE_PARENTHESES = ")".charCodeAt(0), OPEN_CURLY = "{".charCodeAt(0), CLOSE_CURLY = "}".charCodeAt(0), SEMICOLON = ";".charCodeAt(0), ASTERISK = "*".charCodeAt(0), COLON = ":".charCodeAt(0), AT = "@".charCodeAt(0), RE_AT_END = /[\t\n\f\r "#'()/;[\\\]{}]/g, RE_WORD_END = /[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g, RE_BAD_BRACKET = /.[\n"'(/\\]/, RE_HEX_ESCAPE = /[\da-f]/i;
    let Container$5 = container;
    class AtRule$3 extends Container$5 {
        constructor(defaults) {
            super(defaults), this.type = "atrule";
        }
        append(...children) {
            return this.proxyOf.nodes || (this.nodes = []), super.append(...children);
        }
        prepend(...children) {
            return this.proxyOf.nodes || (this.nodes = []), super.prepend(...children);
        }
    }
    var atRule = AtRule$3;
    AtRule$3.default = AtRule$3, Container$5.registerAtRule(AtRule$3);
    let LazyResult$3, Processor$2, Container$4 = container;
    class Root$5 extends Container$4 {
        constructor(defaults) {
            super(defaults), this.type = "root", this.nodes || (this.nodes = []);
        }
        removeChild(child, ignore) {
            let index = this.index(child);
            return !ignore && 0 === index && this.nodes.length > 1 && (this.nodes[1].raws.before = this.nodes[index].raws.before), 
            super.removeChild(child);
        }
        normalize(child, sample, type) {
            let nodes = super.normalize(child);
            if (sample) if ("prepend" === type) this.nodes.length > 1 ? sample.raws.before = this.nodes[1].raws.before : delete sample.raws.before; else if (this.first !== sample) for (let node of nodes) node.raws.before = sample.raws.before;
            return nodes;
        }
        toResult(opts = {}) {
            return new LazyResult$3(new Processor$2, this, opts).stringify();
        }
    }
    Root$5.registerLazyResult = dependant => {
        LazyResult$3 = dependant;
    }, Root$5.registerProcessor = dependant => {
        Processor$2 = dependant;
    };
    var root = Root$5;
    Root$5.default = Root$5;
    let list$2 = {
        split(string, separators, last) {
            let array = [], current = "", split = !1, func = 0, quote = !1, escape = !1;
            for (let letter of string) escape ? escape = !1 : "\\" === letter ? escape = !0 : quote ? letter === quote && (quote = !1) : '"' === letter || "'" === letter ? quote = letter : "(" === letter ? func += 1 : ")" === letter ? func > 0 && (func -= 1) : 0 === func && separators.includes(letter) && (split = !0), 
            split ? ("" !== current && array.push(current.trim()), current = "", split = !1) : current += letter;
            return (last || "" !== current) && array.push(current.trim()), array;
        },
        space: string => list$2.split(string, [ " ", "\n", "\t" ]),
        comma: string => list$2.split(string, [ "," ], !0)
    };
    var list_1 = list$2;
    list$2.default = list$2;
    let Container$3 = container, list$1 = list_1;
    class Rule$3 extends Container$3 {
        constructor(defaults) {
            super(defaults), this.type = "rule", this.nodes || (this.nodes = []);
        }
        get selectors() {
            return list$1.comma(this.selector);
        }
        set selectors(values) {
            let match = this.selector ? this.selector.match(/,\s*/) : null, sep = match ? match[0] : "," + this.raw("between", "beforeOpen");
            this.selector = values.join(sep);
        }
    }
    var rule = Rule$3;
    Rule$3.default = Rule$3, Container$3.registerRule(Rule$3);
    let Declaration$2 = declaration, tokenizer = function tokenizer(input, options = {}) {
        let code, next, quote, content, escape, escaped, escapePos, prev, n, currentToken, css = input.css.valueOf(), ignore = options.ignoreErrors, length = css.length, pos = 0, buffer = [], returned = [];
        function unclosed(what) {
            throw input.error("Unclosed " + what, pos);
        }
        return {
            back: function back(token) {
                returned.push(token);
            },
            nextToken: function nextToken(opts) {
                if (returned.length) return returned.pop();
                if (pos >= length) return;
                let ignoreUnclosed = !!opts && opts.ignoreUnclosed;
                switch (code = css.charCodeAt(pos), code) {
                  case NEWLINE:
                  case SPACE:
                  case TAB:
                  case CR:
                  case FEED:
                    next = pos;
                    do {
                        next += 1, code = css.charCodeAt(next);
                    } while (code === SPACE || code === NEWLINE || code === TAB || code === CR || code === FEED);
                    currentToken = [ "space", css.slice(pos, next) ], pos = next - 1;
                    break;

                  case OPEN_SQUARE:
                  case CLOSE_SQUARE:
                  case OPEN_CURLY:
                  case CLOSE_CURLY:
                  case COLON:
                  case SEMICOLON:
                  case CLOSE_PARENTHESES:
                    {
                        let controlChar = String.fromCharCode(code);
                        currentToken = [ controlChar, controlChar, pos ];
                        break;
                    }

                  case OPEN_PARENTHESES:
                    if (prev = buffer.length ? buffer.pop()[1] : "", n = css.charCodeAt(pos + 1), "url" === prev && n !== SINGLE_QUOTE && n !== DOUBLE_QUOTE && n !== SPACE && n !== NEWLINE && n !== TAB && n !== FEED && n !== CR) {
                        next = pos;
                        do {
                            if (escaped = !1, next = css.indexOf(")", next + 1), -1 === next) {
                                if (ignore || ignoreUnclosed) {
                                    next = pos;
                                    break;
                                }
                                unclosed("bracket");
                            }
                            for (escapePos = next; css.charCodeAt(escapePos - 1) === BACKSLASH; ) escapePos -= 1, 
                            escaped = !escaped;
                        } while (escaped);
                        currentToken = [ "brackets", css.slice(pos, next + 1), pos, next ], pos = next;
                    } else next = css.indexOf(")", pos + 1), content = css.slice(pos, next + 1), -1 === next || RE_BAD_BRACKET.test(content) ? currentToken = [ "(", "(", pos ] : (currentToken = [ "brackets", content, pos, next ], 
                    pos = next);
                    break;

                  case SINGLE_QUOTE:
                  case DOUBLE_QUOTE:
                    quote = code === SINGLE_QUOTE ? "'" : '"', next = pos;
                    do {
                        if (escaped = !1, next = css.indexOf(quote, next + 1), -1 === next) {
                            if (ignore || ignoreUnclosed) {
                                next = pos + 1;
                                break;
                            }
                            unclosed("string");
                        }
                        for (escapePos = next; css.charCodeAt(escapePos - 1) === BACKSLASH; ) escapePos -= 1, 
                        escaped = !escaped;
                    } while (escaped);
                    currentToken = [ "string", css.slice(pos, next + 1), pos, next ], pos = next;
                    break;

                  case AT:
                    RE_AT_END.lastIndex = pos + 1, RE_AT_END.test(css), next = 0 === RE_AT_END.lastIndex ? css.length - 1 : RE_AT_END.lastIndex - 2, 
                    currentToken = [ "at-word", css.slice(pos, next + 1), pos, next ], pos = next;
                    break;

                  case BACKSLASH:
                    for (next = pos, escape = !0; css.charCodeAt(next + 1) === BACKSLASH; ) next += 1, 
                    escape = !escape;
                    if (code = css.charCodeAt(next + 1), escape && code !== SLASH && code !== SPACE && code !== NEWLINE && code !== TAB && code !== CR && code !== FEED && (next += 1, 
                    RE_HEX_ESCAPE.test(css.charAt(next)))) {
                        for (;RE_HEX_ESCAPE.test(css.charAt(next + 1)); ) next += 1;
                        css.charCodeAt(next + 1) === SPACE && (next += 1);
                    }
                    currentToken = [ "word", css.slice(pos, next + 1), pos, next ], pos = next;
                    break;

                  default:
                    code === SLASH && css.charCodeAt(pos + 1) === ASTERISK ? (next = css.indexOf("*/", pos + 2) + 1, 
                    0 === next && (ignore || ignoreUnclosed ? next = css.length : unclosed("comment")), 
                    currentToken = [ "comment", css.slice(pos, next + 1), pos, next ], pos = next) : (RE_WORD_END.lastIndex = pos + 1, 
                    RE_WORD_END.test(css), next = 0 === RE_WORD_END.lastIndex ? css.length - 1 : RE_WORD_END.lastIndex - 2, 
                    currentToken = [ "word", css.slice(pos, next + 1), pos, next ], buffer.push(currentToken), 
                    pos = next);
                }
                return pos++, currentToken;
            },
            endOfFile: function endOfFile() {
                return 0 === returned.length && pos >= length;
            },
            position: function position() {
                return pos;
            }
        };
    }, Comment$2 = comment, AtRule$2 = atRule, Root$4 = root, Rule$2 = rule;
    var parser = class Parser$1 {
        constructor(input) {
            this.input = input, this.root = new Root$4, this.current = this.root, this.spaces = "", 
            this.semicolon = !1, this.customProperty = !1, this.createTokenizer(), this.root.source = {
                input: input,
                start: {
                    offset: 0,
                    line: 1,
                    column: 1
                }
            };
        }
        createTokenizer() {
            this.tokenizer = tokenizer(this.input);
        }
        parse() {
            let token;
            for (;!this.tokenizer.endOfFile(); ) switch (token = this.tokenizer.nextToken(), 
            token[0]) {
              case "space":
                this.spaces += token[1];
                break;

              case ";":
                this.freeSemicolon(token);
                break;

              case "}":
                this.end(token);
                break;

              case "comment":
                this.comment(token);
                break;

              case "at-word":
                this.atrule(token);
                break;

              case "{":
                this.emptyRule(token);
                break;

              default:
                this.other(token);
            }
            this.endFile();
        }
        comment(token) {
            let node = new Comment$2;
            this.init(node, token[2]), node.source.end = this.getPosition(token[3] || token[2]);
            let text = token[1].slice(2, -2);
            if (/^\s*$/.test(text)) node.text = "", node.raws.left = text, node.raws.right = ""; else {
                let match = text.match(/^(\s*)([^]*\S)(\s*)$/);
                node.text = match[2], node.raws.left = match[1], node.raws.right = match[3];
            }
        }
        emptyRule(token) {
            let node = new Rule$2;
            this.init(node, token[2]), node.selector = "", node.raws.between = "", this.current = node;
        }
        other(start) {
            let end = !1, type = null, colon = !1, bracket = null, brackets = [], customProperty = start[1].startsWith("--"), tokens = [], token = start;
            for (;token; ) {
                if (type = token[0], tokens.push(token), "(" === type || "[" === type) bracket || (bracket = token), 
                brackets.push("(" === type ? ")" : "]"); else if (customProperty && colon && "{" === type) bracket || (bracket = token), 
                brackets.push("}"); else if (0 === brackets.length) {
                    if (";" === type) {
                        if (colon) return void this.decl(tokens, customProperty);
                        break;
                    }
                    if ("{" === type) return void this.rule(tokens);
                    if ("}" === type) {
                        this.tokenizer.back(tokens.pop()), end = !0;
                        break;
                    }
                    ":" === type && (colon = !0);
                } else type === brackets[brackets.length - 1] && (brackets.pop(), 0 === brackets.length && (bracket = null));
                token = this.tokenizer.nextToken();
            }
            if (this.tokenizer.endOfFile() && (end = !0), brackets.length > 0 && this.unclosedBracket(bracket), 
            end && colon) {
                for (;tokens.length && (token = tokens[tokens.length - 1][0], "space" === token || "comment" === token); ) this.tokenizer.back(tokens.pop());
                this.decl(tokens, customProperty);
            } else this.unknownWord(tokens);
        }
        rule(tokens) {
            tokens.pop();
            let node = new Rule$2;
            this.init(node, tokens[0][2]), node.raws.between = this.spacesAndCommentsFromEnd(tokens), 
            this.raw(node, "selector", tokens), this.current = node;
        }
        decl(tokens, customProperty) {
            let node = new Declaration$2;
            this.init(node, tokens[0][2]);
            let token, last = tokens[tokens.length - 1];
            for (";" === last[0] && (this.semicolon = !0, tokens.pop()), node.source.end = this.getPosition(last[3] || last[2]); "word" !== tokens[0][0]; ) 1 === tokens.length && this.unknownWord(tokens), 
            node.raws.before += tokens.shift()[1];
            for (node.source.start = this.getPosition(tokens[0][2]), node.prop = ""; tokens.length; ) {
                let type = tokens[0][0];
                if (":" === type || "space" === type || "comment" === type) break;
                node.prop += tokens.shift()[1];
            }
            for (node.raws.between = ""; tokens.length; ) {
                if (token = tokens.shift(), ":" === token[0]) {
                    node.raws.between += token[1];
                    break;
                }
                "word" === token[0] && /\w/.test(token[1]) && this.unknownWord([ token ]), node.raws.between += token[1];
            }
            "_" !== node.prop[0] && "*" !== node.prop[0] || (node.raws.before += node.prop[0], 
            node.prop = node.prop.slice(1));
            let firstSpaces = this.spacesAndCommentsFromStart(tokens);
            this.precheckMissedSemicolon(tokens);
            for (let i = tokens.length - 1; i >= 0; i--) {
                if (token = tokens[i], "!important" === token[1].toLowerCase()) {
                    node.important = !0;
                    let string = this.stringFrom(tokens, i);
                    string = this.spacesFromEnd(tokens) + string, " !important" !== string && (node.raws.important = string);
                    break;
                }
                if ("important" === token[1].toLowerCase()) {
                    let cache = tokens.slice(0), str = "";
                    for (let j = i; j > 0; j--) {
                        let type = cache[j][0];
                        if (0 === str.trim().indexOf("!") && "space" !== type) break;
                        str = cache.pop()[1] + str;
                    }
                    0 === str.trim().indexOf("!") && (node.important = !0, node.raws.important = str, 
                    tokens = cache);
                }
                if ("space" !== token[0] && "comment" !== token[0]) break;
            }
            let hasWord = tokens.some((i => "space" !== i[0] && "comment" !== i[0]));
            this.raw(node, "value", tokens), hasWord ? node.raws.between += firstSpaces : node.value = firstSpaces + node.value, 
            node.value.includes(":") && !customProperty && this.checkMissedSemicolon(tokens);
        }
        atrule(token) {
            let type, prev, shift, node = new AtRule$2;
            node.name = token[1].slice(1), "" === node.name && this.unnamedAtrule(node, token), 
            this.init(node, token[2]);
            let last = !1, open = !1, params = [], brackets = [];
            for (;!this.tokenizer.endOfFile(); ) {
                if (type = (token = this.tokenizer.nextToken())[0], "(" === type || "[" === type ? brackets.push("(" === type ? ")" : "]") : "{" === type && brackets.length > 0 ? brackets.push("}") : type === brackets[brackets.length - 1] && brackets.pop(), 
                0 === brackets.length) {
                    if (";" === type) {
                        node.source.end = this.getPosition(token[2]), this.semicolon = !0;
                        break;
                    }
                    if ("{" === type) {
                        open = !0;
                        break;
                    }
                    if ("}" === type) {
                        if (params.length > 0) {
                            for (shift = params.length - 1, prev = params[shift]; prev && "space" === prev[0]; ) prev = params[--shift];
                            prev && (node.source.end = this.getPosition(prev[3] || prev[2]));
                        }
                        this.end(token);
                        break;
                    }
                    params.push(token);
                } else params.push(token);
                if (this.tokenizer.endOfFile()) {
                    last = !0;
                    break;
                }
            }
            node.raws.between = this.spacesAndCommentsFromEnd(params), params.length ? (node.raws.afterName = this.spacesAndCommentsFromStart(params), 
            this.raw(node, "params", params), last && (token = params[params.length - 1], node.source.end = this.getPosition(token[3] || token[2]), 
            this.spaces = node.raws.between, node.raws.between = "")) : (node.raws.afterName = "", 
            node.params = ""), open && (node.nodes = [], this.current = node);
        }
        end(token) {
            this.current.nodes && this.current.nodes.length && (this.current.raws.semicolon = this.semicolon), 
            this.semicolon = !1, this.current.raws.after = (this.current.raws.after || "") + this.spaces, 
            this.spaces = "", this.current.parent ? (this.current.source.end = this.getPosition(token[2]), 
            this.current = this.current.parent) : this.unexpectedClose(token);
        }
        endFile() {
            this.current.parent && this.unclosedBlock(), this.current.nodes && this.current.nodes.length && (this.current.raws.semicolon = this.semicolon), 
            this.current.raws.after = (this.current.raws.after || "") + this.spaces;
        }
        freeSemicolon(token) {
            if (this.spaces += token[1], this.current.nodes) {
                let prev = this.current.nodes[this.current.nodes.length - 1];
                prev && "rule" === prev.type && !prev.raws.ownSemicolon && (prev.raws.ownSemicolon = this.spaces, 
                this.spaces = "");
            }
        }
        getPosition(offset) {
            let pos = this.input.fromOffset(offset);
            return {
                offset: offset,
                line: pos.line,
                column: pos.col
            };
        }
        init(node, offset) {
            this.current.push(node), node.source = {
                start: this.getPosition(offset),
                input: this.input
            }, node.raws.before = this.spaces, this.spaces = "", "comment" !== node.type && (this.semicolon = !1);
        }
        raw(node, prop, tokens) {
            let token, type, next, prev, length = tokens.length, value = "", clean = !0, pattern = /^([#.|])?(\w)+/i;
            for (let i = 0; i < length; i += 1) token = tokens[i], type = token[0], "comment" !== type || "rule" !== node.type ? "comment" === type || "space" === type && i === length - 1 ? clean = !1 : value += token[1] : (prev = tokens[i - 1], 
            next = tokens[i + 1], "space" !== prev[0] && "space" !== next[0] && pattern.test(prev[1]) && pattern.test(next[1]) ? value += token[1] : clean = !1);
            if (!clean) {
                let raw = tokens.reduce(((all, i) => all + i[1]), "");
                node.raws[prop] = {
                    value: value,
                    raw: raw
                };
            }
            node[prop] = value;
        }
        spacesAndCommentsFromEnd(tokens) {
            let lastTokenType, spaces = "";
            for (;tokens.length && (lastTokenType = tokens[tokens.length - 1][0], "space" === lastTokenType || "comment" === lastTokenType); ) spaces = tokens.pop()[1] + spaces;
            return spaces;
        }
        spacesAndCommentsFromStart(tokens) {
            let next, spaces = "";
            for (;tokens.length && (next = tokens[0][0], "space" === next || "comment" === next); ) spaces += tokens.shift()[1];
            return spaces;
        }
        spacesFromEnd(tokens) {
            let lastTokenType, spaces = "";
            for (;tokens.length && (lastTokenType = tokens[tokens.length - 1][0], "space" === lastTokenType); ) spaces = tokens.pop()[1] + spaces;
            return spaces;
        }
        stringFrom(tokens, from) {
            let result = "";
            for (let i = from; i < tokens.length; i++) result += tokens[i][1];
            return tokens.splice(from, tokens.length - from), result;
        }
        colon(tokens) {
            let token, type, prev, brackets = 0;
            for (let [i, element] of tokens.entries()) {
                if (token = element, type = token[0], "(" === type && (brackets += 1), ")" === type && (brackets -= 1), 
                0 === brackets && ":" === type) {
                    if (prev) {
                        if ("word" === prev[0] && "progid" === prev[1]) continue;
                        return i;
                    }
                    this.doubleColon(token);
                }
                prev = token;
            }
            return !1;
        }
        unclosedBracket(bracket) {
            throw this.input.error("Unclosed bracket", bracket[2]);
        }
        unknownWord(tokens) {
            throw this.input.error("Unknown word", tokens[0][2]);
        }
        unexpectedClose(token) {
            throw this.input.error("Unexpected }", token[2]);
        }
        unclosedBlock() {
            let pos = this.current.source.start;
            throw this.input.error("Unclosed block", pos.line, pos.column);
        }
        doubleColon(token) {
            throw this.input.error("Double colon", token[2]);
        }
        unnamedAtrule(node, token) {
            throw this.input.error("At-rule without name", token[2]);
        }
        precheckMissedSemicolon() {}
        checkMissedSemicolon(tokens) {
            let colon = this.colon(tokens);
            if (!1 === colon) return;
            let token, founded = 0;
            for (let j = colon - 1; j >= 0 && (token = tokens[j], "space" === token[0] || (founded += 1, 
            2 !== founded)); j--) ;
            throw this.input.error("Missed semicolon", "word" === token[0] ? token[3] + 1 : token[2]);
        }
    };
    var nonSecure = {
        nanoid: (size = 21) => {
            let id = "", i = size;
            for (;i--; ) id += "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW"[64 * Math.random() | 0];
            return id;
        },
        customAlphabet: (alphabet, size) => () => {
            let id = "", i = size;
            for (;i--; ) id += alphabet[Math.random() * alphabet.length | 0];
            return id;
        }
    };
    let {SourceMapConsumer: SourceMapConsumer$1, SourceMapGenerator: SourceMapGenerator$1} = require$$4, {existsSync: existsSync, readFileSync: readFileSync} = require$$4, {dirname: dirname, join: join} = require$$4;
    class PreviousMap$2 {
        constructor(css, opts) {
            if (!1 === opts.map) return;
            this.loadAnnotation(css), this.inline = this.startWith(this.annotation, "data:");
            let prev = opts.map ? opts.map.prev : void 0, text = this.loadMap(opts.from, prev);
            !this.mapFile && opts.from && (this.mapFile = opts.from), this.mapFile && (this.root = dirname(this.mapFile)), 
            text && (this.text = text);
        }
        consumer() {
            return this.consumerCache || (this.consumerCache = new SourceMapConsumer$1(this.text)), 
            this.consumerCache;
        }
        withContent() {
            return !!(this.consumer().sourcesContent && this.consumer().sourcesContent.length > 0);
        }
        startWith(string, start) {
            return !!string && string.substr(0, start.length) === start;
        }
        getAnnotationURL(sourceMapString) {
            return sourceMapString.match(/\/\*\s*# sourceMappingURL=((?:(?!sourceMappingURL=).)*)\*\//)[1].trim();
        }
        loadAnnotation(css) {
            let annotations = css.match(/\/\*\s*# sourceMappingURL=(?:(?!sourceMappingURL=).)*\*\//gm);
            if (annotations && annotations.length > 0) {
                let lastAnnotation = annotations[annotations.length - 1];
                lastAnnotation && (this.annotation = this.getAnnotationURL(lastAnnotation));
            }
        }
        decodeInline(text) {
            if (/^data:application\/json;charset=utf-?8,/.test(text) || /^data:application\/json,/.test(text)) return decodeURIComponent(text.substr(RegExp.lastMatch.length));
            if (/^data:application\/json;charset=utf-?8;base64,/.test(text) || /^data:application\/json;base64,/.test(text)) return function fromBase64(str) {
                return Buffer ? Buffer.from(str, "base64").toString() : window.atob(str);
            }(text.substr(RegExp.lastMatch.length));
            let encoding = text.match(/data:application\/json;([^,]+),/)[1];
            throw new Error("Unsupported source map encoding " + encoding);
        }
        loadFile(path) {
            if (this.root = dirname(path), existsSync(path)) return this.mapFile = path, readFileSync(path, "utf-8").toString().trim();
        }
        loadMap(file, prev) {
            if (!1 === prev) return !1;
            if (prev) {
                if ("string" == typeof prev) return prev;
                if ("function" != typeof prev) {
                    if (prev instanceof SourceMapConsumer$1) return SourceMapGenerator$1.fromSourceMap(prev).toString();
                    if (prev instanceof SourceMapGenerator$1) return prev.toString();
                    if (this.isMap(prev)) return JSON.stringify(prev);
                    throw new Error("Unsupported previous source map format: " + prev.toString());
                }
                {
                    let prevPath = prev(file);
                    if (prevPath) {
                        let map = this.loadFile(prevPath);
                        if (!map) throw new Error("Unable to load previous source map: " + prevPath.toString());
                        return map;
                    }
                }
            } else {
                if (this.inline) return this.decodeInline(this.annotation);
                if (this.annotation) {
                    let map = this.annotation;
                    return file && (map = join(dirname(file), map)), this.loadFile(map);
                }
            }
        }
        isMap(map) {
            return "object" == typeof map && ("string" == typeof map.mappings || "string" == typeof map._mappings || Array.isArray(map.sections));
        }
    }
    var previousMap = PreviousMap$2;
    PreviousMap$2.default = PreviousMap$2;
    let {SourceMapConsumer: SourceMapConsumer, SourceMapGenerator: SourceMapGenerator} = require$$4, {fileURLToPath: fileURLToPath, pathToFileURL: pathToFileURL} = require$$4, {resolve: resolve, isAbsolute: isAbsolute} = require$$4, {nanoid: nanoid} = nonSecure, terminalHighlight = require$$4, CssSyntaxError$1 = cssSyntaxError, PreviousMap$1 = previousMap, fromOffsetCache = Symbol("fromOffsetCache"), sourceMapAvailable = Boolean(SourceMapConsumer && SourceMapGenerator), pathAvailable = Boolean(resolve && isAbsolute);
    class Input$3 {
        constructor(css, opts = {}) {
            if (null == css || "object" == typeof css && !css.toString) throw new Error(`PostCSS received ${css} instead of CSS string`);
            if (this.css = css.toString(), "\ufeff" === this.css[0] || "￾" === this.css[0] ? (this.hasBOM = !0, 
            this.css = this.css.slice(1)) : this.hasBOM = !1, opts.from && (!pathAvailable || /^\w+:\/\//.test(opts.from) || isAbsolute(opts.from) ? this.file = opts.from : this.file = resolve(opts.from)), 
            pathAvailable && sourceMapAvailable) {
                let map = new PreviousMap$1(this.css, opts);
                if (map.text) {
                    this.map = map;
                    let file = map.consumer().file;
                    !this.file && file && (this.file = this.mapResolve(file));
                }
            }
            this.file || (this.id = "<input css " + nanoid(6) + ">"), this.map && (this.map.file = this.from);
        }
        fromOffset(offset) {
            let lastLine, lineToIndex;
            if (this[fromOffsetCache]) lineToIndex = this[fromOffsetCache]; else {
                let lines = this.css.split("\n");
                lineToIndex = new Array(lines.length);
                let prevIndex = 0;
                for (let i = 0, l = lines.length; i < l; i++) lineToIndex[i] = prevIndex, prevIndex += lines[i].length + 1;
                this[fromOffsetCache] = lineToIndex;
            }
            lastLine = lineToIndex[lineToIndex.length - 1];
            let min = 0;
            if (offset >= lastLine) min = lineToIndex.length - 1; else {
                let mid, max = lineToIndex.length - 2;
                for (;min < max; ) if (mid = min + (max - min >> 1), offset < lineToIndex[mid]) max = mid - 1; else {
                    if (!(offset >= lineToIndex[mid + 1])) {
                        min = mid;
                        break;
                    }
                    min = mid + 1;
                }
            }
            return {
                line: min + 1,
                col: offset - lineToIndex[min] + 1
            };
        }
        error(message, line, column, opts = {}) {
            let result;
            if (!column) {
                let pos = this.fromOffset(line);
                line = pos.line, column = pos.col;
            }
            let origin = this.origin(line, column);
            return result = origin ? new CssSyntaxError$1(message, origin.line, origin.column, origin.source, origin.file, opts.plugin) : new CssSyntaxError$1(message, line, column, this.css, this.file, opts.plugin), 
            result.input = {
                line: line,
                column: column,
                source: this.css
            }, this.file && (pathToFileURL && (result.input.url = pathToFileURL(this.file).toString()), 
            result.input.file = this.file), result;
        }
        origin(line, column) {
            if (!this.map) return !1;
            let fromUrl, consumer = this.map.consumer(), from = consumer.originalPositionFor({
                line: line,
                column: column
            });
            if (!from.source) return !1;
            fromUrl = isAbsolute(from.source) ? pathToFileURL(from.source) : new URL(from.source, this.map.consumer().sourceRoot || pathToFileURL(this.map.mapFile));
            let result = {
                url: fromUrl.toString(),
                line: from.line,
                column: from.column
            };
            if ("file:" === fromUrl.protocol) {
                if (!fileURLToPath) throw new Error("file: protocol is not available in this PostCSS build");
                result.file = fileURLToPath(fromUrl);
            }
            let source = consumer.sourceContentFor(from.source);
            return source && (result.source = source), result;
        }
        mapResolve(file) {
            return /^\w+:\/\//.test(file) ? file : resolve(this.map.consumer().sourceRoot || this.map.root || ".", file);
        }
        get from() {
            return this.file || this.id;
        }
        toJSON() {
            let json = {};
            for (let name of [ "hasBOM", "css", "file", "id" ]) null != this[name] && (json[name] = this[name]);
            return this.map && (json.map = {
                ...this.map
            }, json.map.consumerCache && (json.map.consumerCache = void 0)), json;
        }
    }
    var input = Input$3;
    Input$3.default = Input$3, terminalHighlight && terminalHighlight.registerInput && terminalHighlight.registerInput(Input$3);
    let Container$2 = container, Parser = parser, Input$2 = input;
    function parse$2(css, opts) {
        let input = new Input$2(css, opts), parser = new Parser(input);
        try {
            parser.parse();
        } catch (e) {
            throw "CssSyntaxError" === e.name && opts && opts.from && (/\.scss$/i.test(opts.from) ? e.message += "\nYou tried to parse SCSS with the standard CSS parser; try again with the postcss-scss parser" : /\.sass/i.test(opts.from) ? e.message += "\nYou tried to parse Sass with the standard CSS parser; try again with the postcss-sass parser" : /\.less$/i.test(opts.from) && (e.message += "\nYou tried to parse Less with the standard CSS parser; try again with the postcss-less parser")), 
            e;
        }
        return parser.root;
    }
    var parse_1 = parse$2;
    parse$2.default = parse$2, Container$2.registerParse(parse$2);
    let {isClean: isClean, my: my} = symbols, MapGenerator = mapGenerator, stringify$1 = stringify_1, Container$1 = container, Document$2 = document$1, warnOnce = function warnOnce(message) {
        printed[message] || (printed[message] = !0, "undefined" != typeof console && console.warn && console.warn(message));
    }, Result$1 = result, parse$1 = parse_1, Root$3 = root;
    const TYPE_TO_CLASS_NAME = {
        document: "Document",
        root: "Root",
        atrule: "AtRule",
        rule: "Rule",
        decl: "Declaration",
        comment: "Comment"
    }, PLUGIN_PROPS = {
        postcssPlugin: !0,
        prepare: !0,
        Once: !0,
        Document: !0,
        Root: !0,
        Declaration: !0,
        Rule: !0,
        AtRule: !0,
        Comment: !0,
        DeclarationExit: !0,
        RuleExit: !0,
        AtRuleExit: !0,
        CommentExit: !0,
        RootExit: !0,
        DocumentExit: !0,
        OnceExit: !0
    }, NOT_VISITORS = {
        postcssPlugin: !0,
        prepare: !0,
        Once: !0
    };
    function isPromise(obj) {
        return "object" == typeof obj && "function" == typeof obj.then;
    }
    function getEvents(node) {
        let key = !1, type = TYPE_TO_CLASS_NAME[node.type];
        return "decl" === node.type ? key = node.prop.toLowerCase() : "atrule" === node.type && (key = node.name.toLowerCase()), 
        key && node.append ? [ type, type + "-" + key, 0, type + "Exit", type + "Exit-" + key ] : key ? [ type, type + "-" + key, type + "Exit", type + "Exit-" + key ] : node.append ? [ type, 0, type + "Exit" ] : [ type, type + "Exit" ];
    }
    function toStack(node) {
        let events;
        return events = "document" === node.type ? [ "Document", 0, "DocumentExit" ] : "root" === node.type ? [ "Root", 0, "RootExit" ] : getEvents(node), 
        {
            node: node,
            events: events,
            eventIndex: 0,
            visitors: [],
            visitorIndex: 0,
            iterator: 0
        };
    }
    function cleanMarks(node) {
        return node[isClean] = !1, node.nodes && node.nodes.forEach((i => cleanMarks(i))), 
        node;
    }
    let postcss$2 = {};
    class LazyResult$2 {
        constructor(processor, css, opts) {
            let root;
            if (this.stringified = !1, this.processed = !1, "object" != typeof css || null === css || "root" !== css.type && "document" !== css.type) if (css instanceof LazyResult$2 || css instanceof Result$1) root = cleanMarks(css.root), 
            css.map && (void 0 === opts.map && (opts.map = {}), opts.map.inline || (opts.map.inline = !1), 
            opts.map.prev = css.map); else {
                let parser = parse$1;
                opts.syntax && (parser = opts.syntax.parse), opts.parser && (parser = opts.parser), 
                parser.parse && (parser = parser.parse);
                try {
                    root = parser(css, opts);
                } catch (error) {
                    this.processed = !0, this.error = error;
                }
                root && !root[my] && Container$1.rebuild(root);
            } else root = cleanMarks(css);
            this.result = new Result$1(processor, root, opts), this.helpers = {
                ...postcss$2,
                result: this.result,
                postcss: postcss$2
            }, this.plugins = this.processor.plugins.map((plugin => "object" == typeof plugin && plugin.prepare ? {
                ...plugin,
                ...plugin.prepare(this.result)
            } : plugin));
        }
        get [Symbol.toStringTag]() {
            return "LazyResult";
        }
        get processor() {
            return this.result.processor;
        }
        get opts() {
            return this.result.opts;
        }
        get css() {
            return this.stringify().css;
        }
        get content() {
            return this.stringify().content;
        }
        get map() {
            return this.stringify().map;
        }
        get root() {
            return this.sync().root;
        }
        get messages() {
            return this.sync().messages;
        }
        warnings() {
            return this.sync().warnings();
        }
        toString() {
            return this.css;
        }
        then(onFulfilled, onRejected) {
            return "from" in this.opts || warnOnce("Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning."), 
            this.async().then(onFulfilled, onRejected);
        }
        catch(onRejected) {
            return this.async().catch(onRejected);
        }
        finally(onFinally) {
            return this.async().then(onFinally, onFinally);
        }
        async() {
            return this.error ? Promise.reject(this.error) : this.processed ? Promise.resolve(this.result) : (this.processing || (this.processing = this.runAsync()), 
            this.processing);
        }
        sync() {
            if (this.error) throw this.error;
            if (this.processed) return this.result;
            if (this.processed = !0, this.processing) throw this.getAsyncError();
            for (let plugin of this.plugins) {
                if (isPromise(this.runOnRoot(plugin))) throw this.getAsyncError();
            }
            if (this.prepareVisitors(), this.hasListener) {
                let root = this.result.root;
                for (;!root[isClean]; ) root[isClean] = !0, this.walkSync(root);
                if (this.listeners.OnceExit) if ("document" === root.type) for (let subRoot of root.nodes) this.visitSync(this.listeners.OnceExit, subRoot); else this.visitSync(this.listeners.OnceExit, root);
            }
            return this.result;
        }
        stringify() {
            if (this.error) throw this.error;
            if (this.stringified) return this.result;
            this.stringified = !0, this.sync();
            let opts = this.result.opts, str = stringify$1;
            opts.syntax && (str = opts.syntax.stringify), opts.stringifier && (str = opts.stringifier), 
            str.stringify && (str = str.stringify);
            let data = new MapGenerator(str, this.result.root, this.result.opts).generate();
            return this.result.css = data[0], this.result.map = data[1], this.result;
        }
        walkSync(node) {
            node[isClean] = !0;
            let events = getEvents(node);
            for (let event of events) if (0 === event) node.nodes && node.each((child => {
                child[isClean] || this.walkSync(child);
            })); else {
                let visitors = this.listeners[event];
                if (visitors && this.visitSync(visitors, node.toProxy())) return;
            }
        }
        visitSync(visitors, node) {
            for (let [plugin, visitor] of visitors) {
                let promise;
                this.result.lastPlugin = plugin;
                try {
                    promise = visitor(node, this.helpers);
                } catch (e) {
                    throw this.handleError(e, node.proxyOf);
                }
                if ("root" !== node.type && "document" !== node.type && !node.parent) return !0;
                if (isPromise(promise)) throw this.getAsyncError();
            }
        }
        runOnRoot(plugin) {
            this.result.lastPlugin = plugin;
            try {
                if ("object" == typeof plugin && plugin.Once) {
                    if ("document" === this.result.root.type) {
                        let roots = this.result.root.nodes.map((root => plugin.Once(root, this.helpers)));
                        return isPromise(roots[0]) ? Promise.all(roots) : roots;
                    }
                    return plugin.Once(this.result.root, this.helpers);
                }
                if ("function" == typeof plugin) return plugin(this.result.root, this.result);
            } catch (error) {
                throw this.handleError(error);
            }
        }
        getAsyncError() {
            throw new Error("Use process(css).then(cb) to work with async plugins");
        }
        handleError(error, node) {
            let plugin = this.result.lastPlugin;
            try {
                if (node && node.addToError(error), this.error = error, "CssSyntaxError" !== error.name || error.plugin) {
                    if (plugin.postcssVersion) {
                        let pluginName = plugin.postcssPlugin, pluginVer = plugin.postcssVersion, runtimeVer = this.result.processor.version, a = pluginVer.split("."), b = runtimeVer.split(".");
                        (a[0] !== b[0] || parseInt(a[1]) > parseInt(b[1])) && console.error("Unknown error from PostCSS plugin. Your current PostCSS version is " + runtimeVer + ", but " + pluginName + " uses " + pluginVer + ". Perhaps this is the source of the error below.");
                    }
                } else error.plugin = plugin.postcssPlugin, error.setMessage();
            } catch (err) {
                console && console.error && console.error(err);
            }
            return error;
        }
        async runAsync() {
            this.plugin = 0;
            for (let i = 0; i < this.plugins.length; i++) {
                let plugin = this.plugins[i], promise = this.runOnRoot(plugin);
                if (isPromise(promise)) try {
                    await promise;
                } catch (error) {
                    throw this.handleError(error);
                }
            }
            if (this.prepareVisitors(), this.hasListener) {
                let root = this.result.root;
                for (;!root[isClean]; ) {
                    root[isClean] = !0;
                    let stack = [ toStack(root) ];
                    for (;stack.length > 0; ) {
                        let promise = this.visitTick(stack);
                        if (isPromise(promise)) try {
                            await promise;
                        } catch (e) {
                            let node = stack[stack.length - 1].node;
                            throw this.handleError(e, node);
                        }
                    }
                }
                if (this.listeners.OnceExit) for (let [plugin, visitor] of this.listeners.OnceExit) {
                    this.result.lastPlugin = plugin;
                    try {
                        if ("document" === root.type) {
                            let roots = root.nodes.map((subRoot => visitor(subRoot, this.helpers)));
                            await Promise.all(roots);
                        } else await visitor(root, this.helpers);
                    } catch (e) {
                        throw this.handleError(e);
                    }
                }
            }
            return this.processed = !0, this.stringify();
        }
        prepareVisitors() {
            this.listeners = {};
            let add = (plugin, type, cb) => {
                this.listeners[type] || (this.listeners[type] = []), this.listeners[type].push([ plugin, cb ]);
            };
            for (let plugin of this.plugins) if ("object" == typeof plugin) for (let event in plugin) {
                if (!PLUGIN_PROPS[event] && /^[A-Z]/.test(event)) throw new Error(`Unknown event ${event} in ${plugin.postcssPlugin}. Try to update PostCSS (${this.processor.version} now).`);
                if (!NOT_VISITORS[event]) if ("object" == typeof plugin[event]) for (let filter in plugin[event]) add(plugin, "*" === filter ? event : event + "-" + filter.toLowerCase(), plugin[event][filter]); else "function" == typeof plugin[event] && add(plugin, event, plugin[event]);
            }
            this.hasListener = Object.keys(this.listeners).length > 0;
        }
        visitTick(stack) {
            let visit = stack[stack.length - 1], {node: node, visitors: visitors} = visit;
            if ("root" !== node.type && "document" !== node.type && !node.parent) return void stack.pop();
            if (visitors.length > 0 && visit.visitorIndex < visitors.length) {
                let [plugin, visitor] = visitors[visit.visitorIndex];
                visit.visitorIndex += 1, visit.visitorIndex === visitors.length && (visit.visitors = [], 
                visit.visitorIndex = 0), this.result.lastPlugin = plugin;
                try {
                    return visitor(node.toProxy(), this.helpers);
                } catch (e) {
                    throw this.handleError(e, node);
                }
            }
            if (0 !== visit.iterator) {
                let child, iterator = visit.iterator;
                for (;child = node.nodes[node.indexes[iterator]]; ) if (node.indexes[iterator] += 1, 
                !child[isClean]) return child[isClean] = !0, void stack.push(toStack(child));
                visit.iterator = 0, delete node.indexes[iterator];
            }
            let events = visit.events;
            for (;visit.eventIndex < events.length; ) {
                let event = events[visit.eventIndex];
                if (visit.eventIndex += 1, 0 === event) return void (node.nodes && node.nodes.length && (node[isClean] = !0, 
                visit.iterator = node.getIterator()));
                if (this.listeners[event]) return void (visit.visitors = this.listeners[event]);
            }
            stack.pop();
        }
    }
    LazyResult$2.registerPostcss = dependant => {
        postcss$2 = dependant;
    };
    var lazyResult = LazyResult$2;
    LazyResult$2.default = LazyResult$2, Root$3.registerLazyResult(LazyResult$2), Document$2.registerLazyResult(LazyResult$2);
    let LazyResult$1 = lazyResult, Document$1 = document$1, Root$2 = root;
    class Processor$1 {
        constructor(plugins = []) {
            this.version = "8.3.6", this.plugins = this.normalize(plugins);
        }
        use(plugin) {
            return this.plugins = this.plugins.concat(this.normalize([ plugin ])), this;
        }
        process(css, opts = {}) {
            return 0 !== this.plugins.length || void 0 !== opts.parser || void 0 !== opts.stringifier || void 0 !== opts.syntax || opts.hideNothingWarning || "undefined" != typeof console && console.warn && console.warn("You did not set any plugins, parser, or stringifier. Right now, PostCSS does nothing. Pick plugins for your case on https://www.postcss.parts/ and use them in postcss.config.js."), 
            new LazyResult$1(this, css, opts);
        }
        normalize(plugins) {
            let normalized = [];
            for (let i of plugins) if (!0 === i.postcss ? i = i() : i.postcss && (i = i.postcss), 
            "object" == typeof i && Array.isArray(i.plugins)) normalized = normalized.concat(i.plugins); else if ("object" == typeof i && i.postcssPlugin) normalized.push(i); else {
                if ("function" != typeof i) throw "object" == typeof i && (i.parse || i.stringify) ? new Error("PostCSS syntaxes cannot be used as plugins. Instead, please use one of the syntax/parser/stringifier options as outlined in your PostCSS runner documentation.") : new Error(i + " is not a PostCSS plugin");
                normalized.push(i);
            }
            return normalized;
        }
    }
    var processor = Processor$1;
    Processor$1.default = Processor$1, Root$2.registerProcessor(Processor$1), Document$1.registerProcessor(Processor$1);
    let Declaration$1 = declaration, PreviousMap = previousMap, Comment$1 = comment, AtRule$1 = atRule, Input$1 = input, Root$1 = root, Rule$1 = rule;
    function fromJSON$1(json, inputs) {
        if (Array.isArray(json)) return json.map((n => fromJSON$1(n)));
        let {inputs: ownInputs, ...defaults} = json;
        if (ownInputs) {
            inputs = [];
            for (let input of ownInputs) {
                let inputHydrated = {
                    ...input,
                    __proto__: Input$1.prototype
                };
                inputHydrated.map && (inputHydrated.map = {
                    ...inputHydrated.map,
                    __proto__: PreviousMap.prototype
                }), inputs.push(inputHydrated);
            }
        }
        if (defaults.nodes && (defaults.nodes = json.nodes.map((n => fromJSON$1(n, inputs)))), 
        defaults.source) {
            let {inputId: inputId, ...source} = defaults.source;
            defaults.source = source, null != inputId && (defaults.source.input = inputs[inputId]);
        }
        if ("root" === defaults.type) return new Root$1(defaults);
        if ("decl" === defaults.type) return new Declaration$1(defaults);
        if ("rule" === defaults.type) return new Rule$1(defaults);
        if ("comment" === defaults.type) return new Comment$1(defaults);
        if ("atrule" === defaults.type) return new AtRule$1(defaults);
        throw new Error("Unknown node type: " + json.type);
    }
    var fromJSON_1 = fromJSON$1;
    fromJSON$1.default = fromJSON$1;
    let CssSyntaxError = cssSyntaxError, Declaration = declaration, LazyResult = lazyResult, Container = container, Processor = processor, stringify = stringify_1, fromJSON = fromJSON_1, Document = document$1, Warning = warning, Comment = comment, AtRule = atRule, Result = result, Input = input, parse = parse_1, list = list_1, Rule = rule, Root = root, Node = node_1;
    function postcss$1(...plugins) {
        return 1 === plugins.length && Array.isArray(plugins[0]) && (plugins = plugins[0]), 
        new Processor(plugins);
    }
    postcss$1.plugin = function plugin(name, initializer) {
        function creator(...args) {
            let transformer = initializer(...args);
            return transformer.postcssPlugin = name, transformer.postcssVersion = (new Processor).version, 
            transformer;
        }
        let cache;
        return console && console.warn && (console.warn(name + ": postcss.plugin was deprecated. Migration guide:\nhttps://evilmartians.com/chronicles/postcss-8-plugin-migration"), 
        "cn".startsWith("cn") && console.warn(name + ": 里面 postcss.plugin 被弃用. 迁移指南:\nhttps://www.w3ctech.com/topic/2226")), 
        Object.defineProperty(creator, "postcss", {
            get: () => (cache || (cache = creator()), cache)
        }), creator.process = function(css, processOpts, pluginOpts) {
            return postcss$1([ creator(pluginOpts) ]).process(css, processOpts);
        }, creator;
    }, postcss$1.stringify = stringify, postcss$1.parse = parse, postcss$1.fromJSON = fromJSON, 
    postcss$1.list = list, postcss$1.comment = defaults => new Comment(defaults), postcss$1.atRule = defaults => new AtRule(defaults), 
    postcss$1.decl = defaults => new Declaration(defaults), postcss$1.rule = defaults => new Rule(defaults), 
    postcss$1.root = defaults => new Root(defaults), postcss$1.document = defaults => new Document(defaults), 
    postcss$1.CssSyntaxError = CssSyntaxError, postcss$1.Declaration = Declaration, 
    postcss$1.Container = Container, postcss$1.Document = Document, postcss$1.Comment = Comment, 
    postcss$1.Warning = Warning, postcss$1.AtRule = AtRule, postcss$1.Result = Result, 
    postcss$1.Input = Input, postcss$1.Rule = Rule, postcss$1.Root = Root, postcss$1.Node = Node, 
    LazyResult.registerPostcss(postcss$1);
    var postcss_1 = postcss$1;
    postcss$1.default = postcss$1;
    /*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  */
    var getOwnPropertySymbols = Object.getOwnPropertySymbols, hasOwnProperty = Object.prototype.hasOwnProperty, propIsEnumerable = Object.prototype.propertyIsEnumerable;
    function toObject(val) {
        if (null == val) throw new TypeError("Object.assign cannot be called with null or undefined");
        return Object(val);
    }
    var objectAssign$1 = function shouldUseNative() {
        try {
            if (!Object.assign) return !1;
            var test1 = new String("abc");
            if (test1[5] = "de", "5" === Object.getOwnPropertyNames(test1)[0]) return !1;
            for (var test2 = {}, i = 0; i < 10; i++) test2["_" + String.fromCharCode(i)] = i;
            if ("0123456789" !== Object.getOwnPropertyNames(test2).map((function(n) {
                return test2[n];
            })).join("")) return !1;
            var test3 = {};
            return "abcdefghijklmnopqrst".split("").forEach((function(letter) {
                test3[letter] = letter;
            })), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, test3)).join("");
        } catch (err) {
            return !1;
        }
    }() ? Object.assign : function(target, source) {
        for (var from, symbols, to = toObject(target), s = 1; s < arguments.length; s++) {
            for (var key in from = Object(arguments[s])) hasOwnProperty.call(from, key) && (to[key] = from[key]);
            if (getOwnPropertySymbols) {
                symbols = getOwnPropertySymbols(from);
                for (var i = 0; i < symbols.length; i++) propIsEnumerable.call(from, symbols[i]) && (to[symbols[i]] = from[symbols[i]]);
            }
        }
        return to;
    }, filterPropList = {
        exact: function(list) {
            return list.filter((function(m) {
                return m.match(/^[^\*\!]+$/);
            }));
        },
        contain: function(list) {
            return list.filter((function(m) {
                return m.match(/^\*.+\*$/);
            })).map((function(m) {
                return m.substr(1, m.length - 2);
            }));
        },
        endWith: function(list) {
            return list.filter((function(m) {
                return m.match(/^\*[^\*]+$/);
            })).map((function(m) {
                return m.substr(1);
            }));
        },
        startWith: function(list) {
            return list.filter((function(m) {
                return m.match(/^[^\*\!]+\*$/);
            })).map((function(m) {
                return m.substr(0, m.length - 1);
            }));
        },
        notExact: function(list) {
            return list.filter((function(m) {
                return m.match(/^\![^\*].*$/);
            })).map((function(m) {
                return m.substr(1);
            }));
        },
        notContain: function(list) {
            return list.filter((function(m) {
                return m.match(/^\!\*.+\*$/);
            })).map((function(m) {
                return m.substr(2, m.length - 3);
            }));
        },
        notEndWith: function(list) {
            return list.filter((function(m) {
                return m.match(/^\!\*[^\*]+$/);
            })).map((function(m) {
                return m.substr(2);
            }));
        },
        notStartWith: function(list) {
            return list.filter((function(m) {
                return m.match(/^\![^\*]+\*$/);
            })).map((function(m) {
                return m.substr(1, m.length - 2);
            }));
        }
    };
    var propListMatcher = {
        filterPropList: filterPropList,
        createPropListMatcher: function createPropListMatcher$1(propList) {
            var hasWild = propList.indexOf("*") > -1, matchAll = hasWild && 1 === propList.length, lists = {
                exact: filterPropList.exact(propList),
                contain: filterPropList.contain(propList),
                startWith: filterPropList.startWith(propList),
                endWith: filterPropList.endWith(propList),
                notExact: filterPropList.notExact(propList),
                notContain: filterPropList.notContain(propList),
                notStartWith: filterPropList.notStartWith(propList),
                notEndWith: filterPropList.notEndWith(propList)
            };
            return function(prop) {
                return !!matchAll || (hasWild || lists.exact.indexOf(prop) > -1 || lists.contain.some((function(m) {
                    return prop.indexOf(m) > -1;
                })) || lists.startWith.some((function(m) {
                    return 0 === prop.indexOf(m);
                })) || lists.endWith.some((function(m) {
                    return prop.indexOf(m) === prop.length - m.length;
                }))) && !(lists.notExact.indexOf(prop) > -1 || lists.notContain.some((function(m) {
                    return prop.indexOf(m) > -1;
                })) || lists.notStartWith.some((function(m) {
                    return 0 === prop.indexOf(m);
                })) || lists.notEndWith.some((function(m) {
                    return prop.indexOf(m) === prop.length - m.length;
                })));
            };
        }
    };
    var pixelUnitRegexp = {
        getUnitRegexp: function getUnitRegexp$1(unit) {
            return new RegExp("\"[^\"]+\"|'[^']+'|url\\([^\\)]+\\)|(\\d*\\.?\\d+)" + unit, "g");
        }
    }, postcss = postcss_1, objectAssign = objectAssign$1, {createPropListMatcher: createPropListMatcher} = propListMatcher, {getUnitRegexp: getUnitRegexp} = pixelUnitRegexp, defaults = {
        unitToConvert: "px",
        viewportWidth: 320,
        viewportHeight: 568,
        unitPrecision: 5,
        viewportUnit: "vw",
        fontViewportUnit: "vw",
        selectorBlackList: [],
        propList: [ "*" ],
        minPixelValue: 1,
        mediaQuery: !1,
        replace: !0,
        landscape: !1,
        landscapeUnit: "vw",
        landscapeWidth: 568
    }, postcssPxToViewport = postcss.plugin("postcss-px-to-viewport", (function(options) {
        var opts = objectAssign({}, defaults, options), pxRegex = getUnitRegexp(opts.unitToConvert), satisfyPropList = createPropListMatcher(opts.propList), landscapeRules = [];
        return function(css) {
            if (css.walkRules((function(rule) {
                var file = rule.source && rule.source.input.file;
                if (opts.exclude && file) if ("[object RegExp]" === Object.prototype.toString.call(opts.exclude)) {
                    if (isExclude(opts.exclude, file)) return;
                } else {
                    if ("[object Array]" !== Object.prototype.toString.call(opts.exclude)) throw new Error("options.exclude should be RegExp or Array.");
                    for (let i = 0; i < opts.exclude.length; i++) if (isExclude(opts.exclude[i], file)) return;
                }
                if (!function blacklistedSelector(blacklist, selector) {
                    if ("string" != typeof selector) return;
                    return blacklist.some((function(regex) {
                        return "string" == typeof regex ? -1 !== selector.indexOf(regex) : selector.match(regex);
                    }));
                }(opts.selectorBlackList, rule.selector)) {
                    if (opts.landscape && !rule.parent.params) {
                        var landscapeRule = rule.clone().removeAll();
                        rule.walkDecls((function(decl) {
                            -1 !== decl.value.indexOf(opts.unitToConvert) && satisfyPropList(decl.prop) && landscapeRule.append(decl.clone({
                                value: decl.value.replace(pxRegex, createPxReplace(opts, opts.landscapeUnit, opts.landscapeWidth))
                            }));
                        })), landscapeRule.nodes.length > 0 && landscapeRules.push(landscapeRule);
                    }
                    (function validateParams(params, mediaQuery) {
                        return !params || params && mediaQuery;
                    })(rule.parent.params, opts.mediaQuery) && rule.walkDecls((function(decl, i) {
                        if (-1 !== decl.value.indexOf(opts.unitToConvert) && satisfyPropList(decl.prop)) {
                            var unit, size, params = rule.parent.params;
                            opts.landscape && params && -1 !== params.indexOf("landscape") ? (unit = opts.landscapeUnit, 
                            size = opts.landscapeWidth) : (unit = function getUnit(prop, opts) {
                                return -1 === prop.indexOf("font") ? opts.viewportUnit : opts.fontViewportUnit;
                            }(decl.prop, opts), size = opts.viewportWidth);
                            var value = decl.value.replace(pxRegex, createPxReplace(opts, unit, size));
                            (function declarationExists(decls, prop, value) {
                                return decls.some((function(decl) {
                                    return decl.prop === prop && decl.value === value;
                                }));
                            })(decl.parent, decl.prop, value) || (opts.replace ? decl.value = value : decl.parent.insertAfter(i, decl.clone({
                                value: value
                            })));
                        }
                    }));
                }
            })), landscapeRules.length > 0) {
                var landscapeRoot = new postcss.atRule({
                    params: "(orientation: landscape)",
                    name: "media"
                });
                landscapeRules.forEach((function(rule) {
                    landscapeRoot.append(rule);
                })), css.append(landscapeRoot);
            }
        };
    }));
    function createPxReplace(opts, viewportUnit, viewportSize) {
        return function(m, $1) {
            if (!$1) return m;
            var pixels = parseFloat($1);
            if (pixels <= opts.minPixelValue) return m;
            var parsedVal = function toFixed(number, precision) {
                var multiplier = Math.pow(10, precision + 1), wholeNumber = Math.floor(number * multiplier);
                return 10 * Math.round(wholeNumber / 10) / multiplier;
            }(pixels / viewportSize * 100, opts.unitPrecision);
            return 0 === parsedVal ? "0" : parsedVal + viewportUnit;
        };
    }
    function isExclude(reg, file) {
        if ("[object RegExp]" !== Object.prototype.toString.call(reg)) throw new Error("options.exclude should be RegExp.");
        return null !== file.match(reg);
    }
    var dist = {
        exports: {}
    }, commentRemover = {
        exports: {}
    };
    !function(module, exports) {
        function CommentRemover(options) {
            this.options = options;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.default = void 0, CommentRemover.prototype.canRemove = function(comment) {
            const remove = this.options.remove;
            if (remove) return remove(comment);
            if (!(0 === comment.indexOf("!"))) return !0;
            if (this.options.removeAll || this._hasFirst) return !0;
            if (this.options.removeAllButFirst && !this._hasFirst) return this._hasFirst = !0, 
            !1;
        };
        var _default = CommentRemover;
        exports.default = _default, module.exports = exports.default;
    }(commentRemover, commentRemover.exports);
    var module, exports, commentParser = {
        exports: {}
    };
    module = commentParser, exports = commentParser.exports, Object.defineProperty(exports, "__esModule", {
        value: !0
    }), exports.default = function commentParser(input) {
        const tokens = [], length = input.length;
        let next, pos = 0;
        for (;pos < length; ) next = input.indexOf("/*", pos), ~next ? (tokens.push([ 0, pos, next ]), 
        pos = next, next = input.indexOf("*/", pos + 2), tokens.push([ 1, pos + 2, next ]), 
        pos = next + 2) : (tokens.push([ 0, pos, length ]), pos = length);
        return tokens;
    }, module.exports = exports.default, function(module, exports) {
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.default = void 0;
        var _commentRemover = _interopRequireDefault(commentRemover.exports), _commentParser = _interopRequireDefault(commentParser.exports);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        function pluginCreator(opts = {}) {
            const remover = new _commentRemover.default(opts), matcherCache = {}, replacerCache = {};
            function replaceComments(source, space, separator = " ") {
                const key = source + "@|@" + separator;
                if (replacerCache[key]) return replacerCache[key];
                const result = space((0, _commentParser.default)(source).reduce(((value, [type, start, end]) => {
                    const contents = source.slice(start, end);
                    return type ? remover.canRemove(contents) ? value + separator : `${value}/*${contents}*/` : value + contents;
                }), "")).join(" ");
                return replacerCache[key] = result, result;
            }
            return {
                postcssPlugin: "postcss-discard-comments",
                OnceExit(css, {list: list}) {
                    css.walk((node => {
                        if ("comment" === node.type && remover.canRemove(node.text)) node.remove(); else if (node.raws.between && (node.raws.between = replaceComments(node.raws.between, list.space)), 
                        "decl" !== node.type) {
                            if ("rule" === node.type && node.raws.selector && node.raws.selector.raw) node.raws.selector.raw = replaceComments(node.raws.selector.raw, list.space, ""); else if ("atrule" === node.type) {
                                if (node.raws.afterName) {
                                    const commentsReplaced = replaceComments(node.raws.afterName, list.space);
                                    commentsReplaced.length ? node.raws.afterName = " " + commentsReplaced + " " : node.raws.afterName = commentsReplaced + " ";
                                }
                                node.raws.params && node.raws.params.raw && (node.raws.params.raw = replaceComments(node.raws.params.raw, list.space));
                            }
                        } else if (node.raws.value && node.raws.value.raw && (node.raws.value.value === node.value ? node.value = replaceComments(node.raws.value.raw, list.space) : node.value = replaceComments(node.value, list.space), 
                        node.raws.value = null), node.raws.important) {
                            node.raws.important = replaceComments(node.raws.important, list.space);
                            const b = function matchesComments(source) {
                                if (matcherCache[source]) return matcherCache[source];
                                const result = (0, _commentParser.default)(source).filter((([type]) => type));
                                return matcherCache[source] = result, result;
                            }(node.raws.important);
                            node.raws.important = b.length ? node.raws.important : "!important";
                        }
                    }));
                }
            };
        }
        pluginCreator.postcss = !0;
        var _default = pluginCreator;
        exports.default = _default, module.exports = exports.default;
    }(dist, dist.exports);
    var postcssDiscardComments = getDefaultExportFromCjs(dist.exports);
    const pxToViewportConfigDefault = {
        unitToConvert: "px",
        viewportWidth: 50,
        viewportHeight: 1334,
        unitPrecision: 3,
        viewportUnit: "rpx",
        fontViewportUnit: "rpx",
        selectorBlackList: [ ".ignore" ],
        minPixelValue: 1,
        mediaQuery: !1
    }, filterConfigDefault = [ "width", "height", "border", "border-radius", "font-size: ?(?!normal).*", "font-weight: ?(?!normal).*", "word-spacing", "line-height", "color", "opacity", "background", "background-image", "box-shadow" ];
    function create_fragment$3(ctx) {
        let button, mounted, dispose;
        return {
            c() {
                button = element("button"), button.textContent = "🔥复制小程序样式", attr(button, "id", "fcb-copy-button"), 
                attr(button, "class", "fcb-copy-button svelte-16mfo7u");
            },
            m(target, anchor) {
                insert(target, button, anchor), mounted || (dispose = listen(button, "click", ctx[0]), 
                mounted = !0);
            },
            p: noop,
            i: noop,
            o: noop,
            d(detaching) {
                detaching && detach(button), mounted = !1, dispose();
            }
        };
    }
    function instance$2($$self) {
        return [ debounce((() => {
            const codeEl = document.querySelector("[name=propertiesPanelContainer]")?.querySelector("p.hljs-comment")?.parentElement?.innerText;
            codeEl ? async function getCSS(css) {
                const content = await postcss_1([ postcssPxToViewport(GM_getValue("__PX_TO_VIEWPORT_CONFIG", pxToViewportConfigDefault)), postcssDiscardComments({}) ]).process(css), filters = GM_getValue("__FILTER_CONFIG", filterConfigDefault), styleArray = content.css.replace(/(^\{)|(\}$)/g, "").split("\n").filter((raw => !!raw && filters.findIndex((rule => new RegExp(rule).test(raw))) > -1));
                await navigator.clipboard.writeText(styleArray.join("\n")), toast({
                    title: "复制成功"
                });
            }(`{${codeEl}}`) : toast("从网页上获取css失败");
        }), 500) ];
    }
    styleInject(".fcb-copy-button.svelte-16mfo7u{padding:4px 8px;border-radius:4px;background:#05bea9;outline:none;color:#fff;cursor:pointer;margin-bottom:10px;user-select:none}");
    class CopyButton extends SvelteComponent {
        constructor(options) {
            super(), init(this, options, instance$2, create_fragment$3, safe_not_equal, {});
        }
    }
    function create_fragment$2(ctx) {
        let button, mounted, dispose;
        return {
            c() {
                button = element("button"), button.textContent = "设置";
            },
            m(target, anchor) {
                insert(target, button, anchor), mounted || (dispose = listen(button, "click", goToSetting), 
                mounted = !0);
            },
            p: noop,
            i: noop,
            o: noop,
            d(detaching) {
                detaching && detach(button), mounted = !1, dispose();
            }
        };
    }
    function goToSetting() {
        window.open("https://lbb00.github.io/figma-css-better/setting", "target");
    }
    class SettingButton extends SvelteComponent {
        constructor(options) {
            super(), init(this, options, null, create_fragment$2, safe_not_equal, {});
        }
    }
    function create_fragment$1(ctx) {
        let copybutton, t, settingbutton, current;
        return copybutton = new CopyButton({
            props: {
                codeEl: ctx[0]
            }
        }), settingbutton = new SettingButton({}), {
            c() {
                create_component(copybutton.$$.fragment), t = space(), create_component(settingbutton.$$.fragment);
            },
            m(target, anchor) {
                mount_component(copybutton, target, anchor), insert(target, t, anchor), mount_component(settingbutton, target, anchor), 
                current = !0;
            },
            p(ctx, [dirty]) {
                const copybutton_changes = {};
                1 & dirty && (copybutton_changes.codeEl = ctx[0]), copybutton.$set(copybutton_changes);
            },
            i(local) {
                current || (transition_in(copybutton.$$.fragment, local), transition_in(settingbutton.$$.fragment, local), 
                current = !0);
            },
            o(local) {
                transition_out(copybutton.$$.fragment, local), transition_out(settingbutton.$$.fragment, local), 
                current = !1;
            },
            d(detaching) {
                destroy_component(copybutton, detaching), detaching && detach(t), destroy_component(settingbutton, detaching);
            }
        };
    }
    function instance$1($$self, $$props, $$invalidate) {
        let {codeEl: codeEl} = $$props;
        return $$self.$$set = $$props => {
            "codeEl" in $$props && $$invalidate(0, codeEl = $$props.codeEl);
        }, [ codeEl ];
    }
    class Actions extends SvelteComponent {
        constructor(options) {
            super(), init(this, options, instance$1, create_fragment$1, safe_not_equal, {
                codeEl: 0
            });
        }
    }
    function create_fragment(ctx) {
        let div2, div0, h20, t1, textarea0, t2, div1, h21, t4, textarea1, t5, button, mounted, dispose;
        return {
            c() {
                div2 = element("div"), div0 = element("div"), h20 = element("h2"), h20.textContent = "px-to-viewport 配置", 
                t1 = space(), textarea0 = element("textarea"), t2 = space(), div1 = element("div"), 
                h21 = element("h2"), h21.textContent = "filter rule 配置", t4 = space(), textarea1 = element("textarea"), 
                t5 = space(), button = element("button"), button.textContent = "保存", attr(textarea0, "class", "fcb-setting-textarea svelte-1imlprz"), 
                attr(textarea1, "class", "fcb-setting-textarea svelte-1imlprz"), attr(div2, "class", "fcb-setting");
            },
            m(target, anchor) {
                insert(target, div2, anchor), append(div2, div0), append(div0, h20), append(div0, t1), 
                append(div0, textarea0), set_input_value(textarea0, ctx[0]), append(div2, t2), append(div2, div1), 
                append(div1, h21), append(div1, t4), append(div1, textarea1), set_input_value(textarea1, ctx[1]), 
                append(div2, t5), append(div2, button), mounted || (dispose = [ listen(textarea0, "input", ctx[3]), listen(textarea1, "input", ctx[4]), listen(button, "click", ctx[2]) ], 
                mounted = !0);
            },
            p(ctx, [dirty]) {
                1 & dirty && set_input_value(textarea0, ctx[0]), 2 & dirty && set_input_value(textarea1, ctx[1]);
            },
            i: noop,
            o: noop,
            d(detaching) {
                detaching && detach(div2), mounted = !1, run_all(dispose);
            }
        };
    }
    function instance($$self, $$props, $$invalidate) {
        let pxToViewportConfig = JSON.stringify(GM_getValue("__PX_TO_VIEWPORT_CONFIG", pxToViewportConfigDefault)), filterConfig = JSON.stringify(GM_getValue("__FILTER_CONFIG", filterConfigDefault));
        return [ pxToViewportConfig, filterConfig, function save() {
            try {
                GM_setValue("__PX_TO_VIEWPORT_CONFIG", JSON.parse(pxToViewportConfig)), GM_setValue("__FILTER_CONFIG", JSON.parse(filterConfig)), 
                toast({
                    title: "保存成功"
                });
            } catch (e) {
                toast({
                    title: e.message
                });
            }
        }, function textarea0_input_handler() {
            pxToViewportConfig = this.value, $$invalidate(0, pxToViewportConfig);
        }, function textarea1_input_handler() {
            filterConfig = this.value, $$invalidate(1, filterConfig);
        } ];
    }
    styleInject(".fcb-setting-textarea.svelte-1imlprz{width:100%;height:200px;background:#f4f4f4}");
    class SettingPanel extends SvelteComponent {
        constructor(options) {
            super(), init(this, options, instance, create_fragment, safe_not_equal, {});
        }
    }
    const installFigmaPlugin = debounce((function(el) {
        const btnEl = el.querySelector("#fcb-copy-button"), codeEl = el.querySelector("p.hljs-comment");
        if (!btnEl && codeEl) {
            const targetEl = document.createElement("div");
            codeEl.parentElement.parentElement.prepend(targetEl), new Actions({
                target: targetEl
            });
        }
    }), 500);
    !function main() {
        !function checkFigma() {
            const oldLog = unsafeWindow.console.log;
            unsafeWindow.console.log = function(...args) {
                /\[Fullscreen\] loadtime/gi.test(args[0]) && setTimeout((() => {
                    const el = document.querySelector("[name=propertiesPanelContainer]");
                    el ? (installFigmaPlugin(el), el.addEventListener("DOMSubtreeModified", installFigmaPlugin.bind(null, el), !1)) : toast({
                        title: "FigmaCssBetter 初始化失败",
                        duration: 5e3
                    });
                }), 1e3), oldLog(...args);
            };
        }(), function checkSetting() {
            /^https:\/\/lbb00.github.io\/figma-css-better\/setting/.test(window.location.href) && window.onload((() => {
                const mainEl = document.querySelector("main");
                new SettingPanel({
                    target: mainEl
                });
            }));
        }();
    }();
}();
