// ==UserScript==
// @name        Figma CSS Better
// @namespace   https://github.com/lbb00
// @version     1.2.5
// @description Figma CSS 转为微信小程序样式,rpx,figma,微信,小程序
// @author      lbb00
// @homepage    https://github.com/lbb00/figma-css-better
// @supportURL  https://github.com/lbb00/figma-css-better/issues
// @updateURL   https://github.com/lbb00/figma-css-better/raw/master/figma-css-better.user.js
// @downloadURL https://github.com/lbb00/figma-css-better/raw/master/figma-css-better.user.js
// @match       *://www.figma.com/file/*
// @match       https://lbb00.github.io/figma-css-better/setting
// @run-at      document-end
// @icon        https://www.google.com/s2/favicons?domain=figma.com
// @license     MIT; https://github.com/lbb00/figma-css-better/blob/main/LICENSE
// @grant       unsafeWindow
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// ==/UserScript==

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

const freeGlobal$1 = freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root$1 = freeGlobal$1 || freeSelf || Function('return this')();

const root$2 = root$1;

/** Built-in value references. */
var Symbol$1 = root$2.Symbol;

const Symbol$2 = Symbol$1;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto$1.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/** Built-in value references. */
var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

/** Used to match a single whitespace character. */
var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim(string) {
  return string
    ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root$2.Date.now();
};

const now$1 = now;

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now$1();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now$1());
  }

  function debounced() {
    var time = now$1(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

function noop() { }
function assign(tar, src) {
    // @ts-ignore
    for (const k in src)
        tar[k] = src[k];
    return tar;
}
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
    return typeof thing === 'function';
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function is_empty(obj) {
    return Object.keys(obj).length === 0;
}
function subscribe(store, ...callbacks) {
    if (store == null) {
        return noop;
    }
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value(store) {
    let value;
    subscribe(store, _ => value = _)();
    return value;
}
function component_subscribe(component, store, callback) {
    component.$$.on_destroy.push(subscribe(store, callback));
}
function create_slot(definition, ctx, $$scope, fn) {
    if (definition) {
        const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
        return definition[0](slot_ctx);
    }
}
function get_slot_context(definition, ctx, $$scope, fn) {
    return definition[1] && fn
        ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
        : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
        const lets = definition[2](fn(dirty));
        if ($$scope.dirty === undefined) {
            return lets;
        }
        if (typeof lets === 'object') {
            const merged = [];
            const len = Math.max($$scope.dirty.length, lets.length);
            for (let i = 0; i < len; i += 1) {
                merged[i] = $$scope.dirty[i] | lets[i];
            }
            return merged;
        }
        return $$scope.dirty | lets;
    }
    return $$scope.dirty;
}
function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
    if (slot_changes) {
        const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
        slot.p(slot_context, slot_changes);
    }
}
function get_all_dirty_from_scope($$scope) {
    if ($$scope.ctx.length > 32) {
        const dirty = [];
        const length = $$scope.ctx.length / 32;
        for (let i = 0; i < length; i++) {
            dirty[i] = -1;
        }
        return dirty;
    }
    return -1;
}
function exclude_internal_props(props) {
    const result = {};
    for (const k in props)
        if (k[0] !== '$')
            result[k] = props[k];
    return result;
}
function compute_rest_props(props, keys) {
    const rest = {};
    keys = new Set(keys);
    for (const k in props)
        if (!keys.has(k) && k[0] !== '$')
            rest[k] = props[k];
    return rest;
}
function compute_slots(slots) {
    const result = {};
    for (const key in slots) {
        result[key] = true;
    }
    return result;
}
function action_destroyer(action_result) {
    return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
}
function append(target, node) {
    target.appendChild(node);
}
function append_styles(target, style_sheet_id, styles) {
    const append_styles_to = get_root_for_style(target);
    if (!append_styles_to.getElementById(style_sheet_id)) {
        const style = element('style');
        style.id = style_sheet_id;
        style.textContent = styles;
        append_stylesheet(append_styles_to, style);
    }
}
function get_root_for_style(node) {
    if (!node)
        return document;
    const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
    if (root && root.host) {
        return root;
    }
    return node.ownerDocument;
}
function append_stylesheet(node, style) {
    append(node.head || node, style);
    return style.sheet;
}
function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
}
function detach(node) {
    if (node.parentNode) {
        node.parentNode.removeChild(node);
    }
}
function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
        if (iterations[i])
            iterations[i].d(detaching);
    }
}
function element(name) {
    return document.createElement(name);
}
function svg_element(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
}
function text(data) {
    return document.createTextNode(data);
}
function space() {
    return text(' ');
}
function empty() {
    return text('');
}
function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
}
function prevent_default(fn) {
    return function (event) {
        event.preventDefault();
        // @ts-ignore
        return fn.call(this, event);
    };
}
function stop_propagation(fn) {
    return function (event) {
        event.stopPropagation();
        // @ts-ignore
        return fn.call(this, event);
    };
}
function attr(node, attribute, value) {
    if (value == null)
        node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
}
function set_attributes(node, attributes) {
    // @ts-ignore
    const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
    for (const key in attributes) {
        if (attributes[key] == null) {
            node.removeAttribute(key);
        }
        else if (key === 'style') {
            node.style.cssText = attributes[key];
        }
        else if (key === '__value') {
            node.value = node[key] = attributes[key];
        }
        else if (descriptors[key] && descriptors[key].set) {
            node[key] = attributes[key];
        }
        else {
            attr(node, key, attributes[key]);
        }
    }
}
function set_custom_element_data_map(node, data_map) {
    Object.keys(data_map).forEach((key) => {
        set_custom_element_data(node, key, data_map[key]);
    });
}
function set_custom_element_data(node, prop, value) {
    if (prop in node) {
        node[prop] = typeof node[prop] === 'boolean' && value === '' ? true : value;
    }
    else {
        attr(node, prop, value);
    }
}
function children(element) {
    return Array.from(element.childNodes);
}
function set_data(text, data) {
    data = '' + data;
    if (text.wholeText !== data)
        text.data = data;
}
function set_style(node, key, value, important) {
    if (value === null) {
        node.style.removeProperty(key);
    }
    else {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
}
function toggle_class(element, name, toggle) {
    element.classList[toggle ? 'add' : 'remove'](name);
}
class HtmlTag {
    constructor(is_svg = false) {
        this.is_svg = false;
        this.is_svg = is_svg;
        this.e = this.n = null;
    }
    c(html) {
        this.h(html);
    }
    m(html, target, anchor = null) {
        if (!this.e) {
            if (this.is_svg)
                this.e = svg_element(target.nodeName);
            else
                this.e = element(target.nodeName);
            this.t = target;
            this.c(html);
        }
        this.i(anchor);
    }
    h(html) {
        this.e.innerHTML = html;
        this.n = Array.from(this.e.childNodes);
    }
    i(anchor) {
        for (let i = 0; i < this.n.length; i += 1) {
            insert(this.t, this.n[i], anchor);
        }
    }
    p(html) {
        this.d();
        this.h(html);
        this.i(this.a);
    }
    d() {
        this.n.forEach(detach);
    }
}
function construct_svelte_component(component, props) {
    return new component(props);
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error('Function called outside component initialization');
    return current_component;
}
/**
 * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
 * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
 * it can be called from an external module).
 *
 * `onMount` does not run inside a [server-side component](/docs#run-time-server-side-component-api).
 *
 * https://svelte.dev/docs#run-time-svelte-onmount
 */
function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
}
/**
 * Schedules a callback to run immediately before the component is unmounted.
 *
 * Out of `onMount`, `beforeUpdate`, `afterUpdate` and `onDestroy`, this is the
 * only one that runs inside a server-side component.
 *
 * https://svelte.dev/docs#run-time-svelte-ondestroy
 */
function onDestroy(fn) {
    get_current_component().$$.on_destroy.push(fn);
}
/**
 * Retrieves the context that belongs to the closest parent component with the specified `key`.
 * Must be called during component initialisation.
 *
 * https://svelte.dev/docs#run-time-svelte-getcontext
 */
function getContext(key) {
    return get_current_component().$$.context.get(key);
}
// TODO figure out if we still want to support
// shorthand events, or if we want to implement
// a real bubbling mechanism
function bubble(component, event) {
    const callbacks = component.$$.callbacks[event.type];
    if (callbacks) {
        // @ts-ignore
        callbacks.slice().forEach(fn => fn.call(this, event));
    }
}

const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
    }
}
function tick() {
    schedule_update();
    return resolved_promise;
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
function add_flush_callback(fn) {
    flush_callbacks.push(fn);
}
// flush() calls callbacks in this order:
// 1. All beforeUpdate callbacks, in order: parents before children
// 2. All bind:this callbacks, in reverse order: children before parents.
// 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
//    for afterUpdates called during the initial onMount, which are called in
//    reverse order: children before parents.
// Since callbacks might update component values, which could trigger another
// call to flush(), the following steps guard against this:
// 1. During beforeUpdate, any updated components will be added to the
//    dirty_components array and will cause a reentrant call to flush(). Because
//    the flush index is kept outside the function, the reentrant call will pick
//    up where the earlier call left off and go through all dirty components. The
//    current_component value is saved and restored so that the reentrant call will
//    not interfere with the "parent" flush() call.
// 2. bind:this callbacks cannot trigger new flush() calls.
// 3. During afterUpdate, any updated components will NOT have their afterUpdate
//    callback called a second time; the seen_callbacks set, outside the flush()
//    function, guarantees this behavior.
const seen_callbacks = new Set();
let flushidx = 0; // Do *not* move this inside the flush() function
function flush() {
    // Do not reenter flush while dirty components are updated, as this can
    // result in an infinite loop. Instead, let the inner flush handle it.
    // Reentrancy is ok afterwards for bindings etc.
    if (flushidx !== 0) {
        return;
    }
    const saved_component = current_component;
    do {
        // first, call beforeUpdate functions
        // and update components
        try {
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
        }
        catch (e) {
            // reset dirty state to not end up in a deadlocked state and then rethrow
            dirty_components.length = 0;
            flushidx = 0;
            throw e;
        }
        set_current_component(null);
        dirty_components.length = 0;
        flushidx = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    seen_callbacks.clear();
    set_current_component(saved_component);
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
}
const outroing = new Set();
let outros;
function group_outros() {
    outros = {
        r: 0,
        c: [],
        p: outros // parent group
    };
}
function check_outros() {
    if (!outros.r) {
        run_all(outros.c);
    }
    outros = outros.p;
}
function transition_in(block, local) {
    if (block && block.i) {
        outroing.delete(block);
        block.i(local);
    }
}
function transition_out(block, local, detach, callback) {
    if (block && block.o) {
        if (outroing.has(block))
            return;
        outroing.add(block);
        outros.c.push(() => {
            outroing.delete(block);
            if (callback) {
                if (detach)
                    block.d(1);
                callback();
            }
        });
        block.o(local);
    }
    else if (callback) {
        callback();
    }
}

function get_spread_update(levels, updates) {
    const update = {};
    const to_null_out = {};
    const accounted_for = { $$scope: 1 };
    let i = levels.length;
    while (i--) {
        const o = levels[i];
        const n = updates[i];
        if (n) {
            for (const key in o) {
                if (!(key in n))
                    to_null_out[key] = 1;
            }
            for (const key in n) {
                if (!accounted_for[key]) {
                    update[key] = n[key];
                    accounted_for[key] = 1;
                }
            }
            levels[i] = n;
        }
        else {
            for (const key in o) {
                accounted_for[key] = 1;
            }
        }
    }
    for (const key in to_null_out) {
        if (!(key in update))
            update[key] = undefined;
    }
    return update;
}
function get_spread_object(spread_props) {
    return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
}

function bind(component, name, callback) {
    const index = component.$$.props[name];
    if (index !== undefined) {
        component.$$.bound[index] = callback;
        callback(component.$$.ctx[index]);
    }
}
function create_component(block) {
    block && block.c();
}
function mount_component(component, target, anchor, customElement) {
    const { fragment, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    if (!customElement) {
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
            // if the component was destroyed immediately
            // it will update the `$$.on_destroy` reference to `null`.
            // the destructured on_destroy may still reference to the old array
            if (component.$$.on_destroy) {
                component.$$.on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
    }
    after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
        run_all($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components.push(component);
        schedule_update();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}
function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
        fragment: null,
        ctx: [],
        // state
        props,
        update: noop,
        not_equal,
        bound: blank_object(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
        // everything else
        callbacks: blank_object(),
        dirty,
        skip_bound: false,
        root: options.target || parent_component.$$.root
    };
    append_styles && append_styles($$.root);
    let ready = false;
    $$.ctx = instance
        ? instance(component, options.props || {}, (i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                if (!$$.skip_bound && $$.bound[i])
                    $$.bound[i](value);
                if (ready)
                    make_dirty(component, i);
            }
            return ret;
        })
        : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            const nodes = children(options.target);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(nodes);
            nodes.forEach(detach);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.c();
        }
        if (options.intro)
            transition_in(component.$$.fragment);
        mount_component(component, options.target, options.anchor, options.customElement);
        flush();
    }
    set_current_component(parent_component);
}
/**
 * Base class for Svelte components. Used when dev=false.
 */
class SvelteComponent {
    $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
    }
    $on(type, callback) {
        if (!is_function(callback)) {
            return noop;
        }
        const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
        callbacks.push(callback);
        return () => {
            const index = callbacks.indexOf(callback);
            if (index !== -1)
                callbacks.splice(index, 1);
        };
    }
    $set($$props) {
        if (this.$$set && !is_empty($$props)) {
            this.$$.skip_bound = true;
            this.$$set($$props);
            this.$$.skip_bound = false;
        }
    }
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getAugmentedNamespace(n) {
  if (n.__esModule) return n;
  var f = n.default;
	if (typeof f == "function") {
		var a = function a () {
			if (this instanceof a) {
				var args = [null];
				args.push.apply(args, arguments);
				var Ctor = Function.bind.apply(f, args);
				return new Ctor();
			}
			return f.apply(this, arguments);
		};
		a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

var picocolors_browserExports = {};
var picocolors_browser = {
  get exports(){ return picocolors_browserExports; },
  set exports(v){ picocolors_browserExports = v; },
};

var x$1=String;
var create=function() {return {isColorSupported:false,reset:x$1,bold:x$1,dim:x$1,italic:x$1,underline:x$1,inverse:x$1,hidden:x$1,strikethrough:x$1,black:x$1,red:x$1,green:x$1,yellow:x$1,blue:x$1,magenta:x$1,cyan:x$1,white:x$1,gray:x$1,bgBlack:x$1,bgRed:x$1,bgGreen:x$1,bgYellow:x$1,bgBlue:x$1,bgMagenta:x$1,bgCyan:x$1,bgWhite:x$1}};
picocolors_browser.exports=create();
picocolors_browserExports.createColors = create;

const __viteBrowserExternal = {};

const __viteBrowserExternal$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: __viteBrowserExternal
}, Symbol.toStringTag, { value: 'Module' }));

const require$$2 = /*@__PURE__*/getAugmentedNamespace(__viteBrowserExternal$1);

let pico = picocolors_browserExports;

let terminalHighlight$1 = require$$2;

let CssSyntaxError$3 = class CssSyntaxError extends Error {
  constructor(message, line, column, source, file, plugin) {
    super(message);
    this.name = 'CssSyntaxError';
    this.reason = message;

    if (file) {
      this.file = file;
    }
    if (source) {
      this.source = source;
    }
    if (plugin) {
      this.plugin = plugin;
    }
    if (typeof line !== 'undefined' && typeof column !== 'undefined') {
      if (typeof line === 'number') {
        this.line = line;
        this.column = column;
      } else {
        this.line = line.line;
        this.column = line.column;
        this.endLine = column.line;
        this.endColumn = column.column;
      }
    }

    this.setMessage();

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CssSyntaxError);
    }
  }

  setMessage() {
    this.message = this.plugin ? this.plugin + ': ' : '';
    this.message += this.file ? this.file : '<css input>';
    if (typeof this.line !== 'undefined') {
      this.message += ':' + this.line + ':' + this.column;
    }
    this.message += ': ' + this.reason;
  }

  showSourceCode(color) {
    if (!this.source) return ''

    let css = this.source;
    if (color == null) color = pico.isColorSupported;
    if (terminalHighlight$1) {
      if (color) css = terminalHighlight$1(css);
    }

    let lines = css.split(/\r?\n/);
    let start = Math.max(this.line - 3, 0);
    let end = Math.min(this.line + 2, lines.length);

    let maxWidth = String(end).length;

    let mark, aside;
    if (color) {
      let { bold, red, gray } = pico.createColors(true);
      mark = text => bold(red(text));
      aside = text => gray(text);
    } else {
      mark = aside = str => str;
    }

    return lines
      .slice(start, end)
      .map((line, index) => {
        let number = start + 1 + index;
        let gutter = ' ' + (' ' + number).slice(-maxWidth) + ' | ';
        if (number === this.line) {
          let spacing =
            aside(gutter.replace(/\d/g, ' ')) +
            line.slice(0, this.column - 1).replace(/[^\t]/g, ' ');
          return mark('>') + aside(gutter) + line + '\n ' + spacing + mark('^')
        }
        return ' ' + aside(gutter) + line
      })
      .join('\n')
  }

  toString() {
    let code = this.showSourceCode();
    if (code) {
      code = '\n\n' + code + '\n';
    }
    return this.name + ': ' + this.message + code
  }
};

var cssSyntaxError = CssSyntaxError$3;
CssSyntaxError$3.default = CssSyntaxError$3;

var symbols = {};

symbols.isClean = Symbol('isClean');

symbols.my = Symbol('my');

const DEFAULT_RAW = {
  colon: ': ',
  indent: '    ',
  beforeDecl: '\n',
  beforeRule: '\n',
  beforeOpen: ' ',
  beforeClose: '\n',
  beforeComment: '\n',
  after: '\n',
  emptyBody: '',
  commentLeft: ' ',
  commentRight: ' ',
  semicolon: false
};

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1)
}

let Stringifier$2 = class Stringifier {
  constructor(builder) {
    this.builder = builder;
  }

  stringify(node, semicolon) {
    /* c8 ignore start */
    if (!this[node.type]) {
      throw new Error(
        'Unknown AST node type ' +
          node.type +
          '. ' +
          'Maybe you need to change PostCSS stringifier.'
      )
    }
    /* c8 ignore stop */
    this[node.type](node, semicolon);
  }

  document(node) {
    this.body(node);
  }

  root(node) {
    this.body(node);
    if (node.raws.after) this.builder(node.raws.after);
  }

  comment(node) {
    let left = this.raw(node, 'left', 'commentLeft');
    let right = this.raw(node, 'right', 'commentRight');
    this.builder('/*' + left + node.text + right + '*/', node);
  }

  decl(node, semicolon) {
    let between = this.raw(node, 'between', 'colon');
    let string = node.prop + between + this.rawValue(node, 'value');

    if (node.important) {
      string += node.raws.important || ' !important';
    }

    if (semicolon) string += ';';
    this.builder(string, node);
  }

  rule(node) {
    this.block(node, this.rawValue(node, 'selector'));
    if (node.raws.ownSemicolon) {
      this.builder(node.raws.ownSemicolon, node, 'end');
    }
  }

  atrule(node, semicolon) {
    let name = '@' + node.name;
    let params = node.params ? this.rawValue(node, 'params') : '';

    if (typeof node.raws.afterName !== 'undefined') {
      name += node.raws.afterName;
    } else if (params) {
      name += ' ';
    }

    if (node.nodes) {
      this.block(node, name + params);
    } else {
      let end = (node.raws.between || '') + (semicolon ? ';' : '');
      this.builder(name + params + end, node);
    }
  }

  body(node) {
    let last = node.nodes.length - 1;
    while (last > 0) {
      if (node.nodes[last].type !== 'comment') break
      last -= 1;
    }

    let semicolon = this.raw(node, 'semicolon');
    for (let i = 0; i < node.nodes.length; i++) {
      let child = node.nodes[i];
      let before = this.raw(child, 'before');
      if (before) this.builder(before);
      this.stringify(child, last !== i || semicolon);
    }
  }

  block(node, start) {
    let between = this.raw(node, 'between', 'beforeOpen');
    this.builder(start + between + '{', node, 'start');

    let after;
    if (node.nodes && node.nodes.length) {
      this.body(node);
      after = this.raw(node, 'after');
    } else {
      after = this.raw(node, 'after', 'emptyBody');
    }

    if (after) this.builder(after);
    this.builder('}', node, 'end');
  }

  raw(node, own, detect) {
    let value;
    if (!detect) detect = own;

    // Already had
    if (own) {
      value = node.raws[own];
      if (typeof value !== 'undefined') return value
    }

    let parent = node.parent;

    if (detect === 'before') {
      // Hack for first rule in CSS
      if (!parent || (parent.type === 'root' && parent.first === node)) {
        return ''
      }

      // `root` nodes in `document` should use only their own raws
      if (parent && parent.type === 'document') {
        return ''
      }
    }

    // Floating child without parent
    if (!parent) return DEFAULT_RAW[detect]

    // Detect style by other nodes
    let root = node.root();
    if (!root.rawCache) root.rawCache = {};
    if (typeof root.rawCache[detect] !== 'undefined') {
      return root.rawCache[detect]
    }

    if (detect === 'before' || detect === 'after') {
      return this.beforeAfter(node, detect)
    } else {
      let method = 'raw' + capitalize(detect);
      if (this[method]) {
        value = this[method](root, node);
      } else {
        root.walk(i => {
          value = i.raws[own];
          if (typeof value !== 'undefined') return false
        });
      }
    }

    if (typeof value === 'undefined') value = DEFAULT_RAW[detect];

    root.rawCache[detect] = value;
    return value
  }

  rawSemicolon(root) {
    let value;
    root.walk(i => {
      if (i.nodes && i.nodes.length && i.last.type === 'decl') {
        value = i.raws.semicolon;
        if (typeof value !== 'undefined') return false
      }
    });
    return value
  }

  rawEmptyBody(root) {
    let value;
    root.walk(i => {
      if (i.nodes && i.nodes.length === 0) {
        value = i.raws.after;
        if (typeof value !== 'undefined') return false
      }
    });
    return value
  }

  rawIndent(root) {
    if (root.raws.indent) return root.raws.indent
    let value;
    root.walk(i => {
      let p = i.parent;
      if (p && p !== root && p.parent && p.parent === root) {
        if (typeof i.raws.before !== 'undefined') {
          let parts = i.raws.before.split('\n');
          value = parts[parts.length - 1];
          value = value.replace(/\S/g, '');
          return false
        }
      }
    });
    return value
  }

  rawBeforeComment(root, node) {
    let value;
    root.walkComments(i => {
      if (typeof i.raws.before !== 'undefined') {
        value = i.raws.before;
        if (value.includes('\n')) {
          value = value.replace(/[^\n]+$/, '');
        }
        return false
      }
    });
    if (typeof value === 'undefined') {
      value = this.raw(node, null, 'beforeDecl');
    } else if (value) {
      value = value.replace(/\S/g, '');
    }
    return value
  }

  rawBeforeDecl(root, node) {
    let value;
    root.walkDecls(i => {
      if (typeof i.raws.before !== 'undefined') {
        value = i.raws.before;
        if (value.includes('\n')) {
          value = value.replace(/[^\n]+$/, '');
        }
        return false
      }
    });
    if (typeof value === 'undefined') {
      value = this.raw(node, null, 'beforeRule');
    } else if (value) {
      value = value.replace(/\S/g, '');
    }
    return value
  }

  rawBeforeRule(root) {
    let value;
    root.walk(i => {
      if (i.nodes && (i.parent !== root || root.first !== i)) {
        if (typeof i.raws.before !== 'undefined') {
          value = i.raws.before;
          if (value.includes('\n')) {
            value = value.replace(/[^\n]+$/, '');
          }
          return false
        }
      }
    });
    if (value) value = value.replace(/\S/g, '');
    return value
  }

  rawBeforeClose(root) {
    let value;
    root.walk(i => {
      if (i.nodes && i.nodes.length > 0) {
        if (typeof i.raws.after !== 'undefined') {
          value = i.raws.after;
          if (value.includes('\n')) {
            value = value.replace(/[^\n]+$/, '');
          }
          return false
        }
      }
    });
    if (value) value = value.replace(/\S/g, '');
    return value
  }

  rawBeforeOpen(root) {
    let value;
    root.walk(i => {
      if (i.type !== 'decl') {
        value = i.raws.between;
        if (typeof value !== 'undefined') return false
      }
    });
    return value
  }

  rawColon(root) {
    let value;
    root.walkDecls(i => {
      if (typeof i.raws.between !== 'undefined') {
        value = i.raws.between.replace(/[^\s:]/g, '');
        return false
      }
    });
    return value
  }

  beforeAfter(node, detect) {
    let value;
    if (node.type === 'decl') {
      value = this.raw(node, null, 'beforeDecl');
    } else if (node.type === 'comment') {
      value = this.raw(node, null, 'beforeComment');
    } else if (detect === 'before') {
      value = this.raw(node, null, 'beforeRule');
    } else {
      value = this.raw(node, null, 'beforeClose');
    }

    let buf = node.parent;
    let depth = 0;
    while (buf && buf.type !== 'root') {
      depth += 1;
      buf = buf.parent;
    }

    if (value.includes('\n')) {
      let indent = this.raw(node, null, 'indent');
      if (indent.length) {
        for (let step = 0; step < depth; step++) value += indent;
      }
    }

    return value
  }

  rawValue(node, prop) {
    let value = node[prop];
    let raw = node.raws[prop];
    if (raw && raw.value === value) {
      return raw.raw
    }

    return value
  }
};

var stringifier = Stringifier$2;
Stringifier$2.default = Stringifier$2;

let Stringifier$1 = stringifier;

function stringify$4(node, builder) {
  let str = new Stringifier$1(builder);
  str.stringify(node);
}

var stringify_1 = stringify$4;
stringify$4.default = stringify$4;

let { isClean: isClean$2, my: my$2 } = symbols;
let CssSyntaxError$2 = cssSyntaxError;
let Stringifier = stringifier;
let stringify$3 = stringify_1;

function cloneNode(obj, parent) {
  let cloned = new obj.constructor();

  for (let i in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, i)) {
      /* c8 ignore next 2 */
      continue
    }
    if (i === 'proxyCache') continue
    let value = obj[i];
    let type = typeof value;

    if (i === 'parent' && type === 'object') {
      if (parent) cloned[i] = parent;
    } else if (i === 'source') {
      cloned[i] = value;
    } else if (Array.isArray(value)) {
      cloned[i] = value.map(j => cloneNode(j, cloned));
    } else {
      if (type === 'object' && value !== null) value = cloneNode(value);
      cloned[i] = value;
    }
  }

  return cloned
}

let Node$4 = class Node {
  constructor(defaults = {}) {
    this.raws = {};
    this[isClean$2] = false;
    this[my$2] = true;

    for (let name in defaults) {
      if (name === 'nodes') {
        this.nodes = [];
        for (let node of defaults[name]) {
          if (typeof node.clone === 'function') {
            this.append(node.clone());
          } else {
            this.append(node);
          }
        }
      } else {
        this[name] = defaults[name];
      }
    }
  }

  error(message, opts = {}) {
    if (this.source) {
      let { start, end } = this.rangeBy(opts);
      return this.source.input.error(
        message,
        { line: start.line, column: start.column },
        { line: end.line, column: end.column },
        opts
      )
    }
    return new CssSyntaxError$2(message)
  }

  warn(result, text, opts) {
    let data = { node: this };
    for (let i in opts) data[i] = opts[i];
    return result.warn(text, data)
  }

  remove() {
    if (this.parent) {
      this.parent.removeChild(this);
    }
    this.parent = undefined;
    return this
  }

  toString(stringifier = stringify$3) {
    if (stringifier.stringify) stringifier = stringifier.stringify;
    let result = '';
    stringifier(this, i => {
      result += i;
    });
    return result
  }

  assign(overrides = {}) {
    for (let name in overrides) {
      this[name] = overrides[name];
    }
    return this
  }

  clone(overrides = {}) {
    let cloned = cloneNode(this);
    for (let name in overrides) {
      cloned[name] = overrides[name];
    }
    return cloned
  }

  cloneBefore(overrides = {}) {
    let cloned = this.clone(overrides);
    this.parent.insertBefore(this, cloned);
    return cloned
  }

  cloneAfter(overrides = {}) {
    let cloned = this.clone(overrides);
    this.parent.insertAfter(this, cloned);
    return cloned
  }

  replaceWith(...nodes) {
    if (this.parent) {
      let bookmark = this;
      let foundSelf = false;
      for (let node of nodes) {
        if (node === this) {
          foundSelf = true;
        } else if (foundSelf) {
          this.parent.insertAfter(bookmark, node);
          bookmark = node;
        } else {
          this.parent.insertBefore(bookmark, node);
        }
      }

      if (!foundSelf) {
        this.remove();
      }
    }

    return this
  }

  next() {
    if (!this.parent) return undefined
    let index = this.parent.index(this);
    return this.parent.nodes[index + 1]
  }

  prev() {
    if (!this.parent) return undefined
    let index = this.parent.index(this);
    return this.parent.nodes[index - 1]
  }

  before(add) {
    this.parent.insertBefore(this, add);
    return this
  }

  after(add) {
    this.parent.insertAfter(this, add);
    return this
  }

  root() {
    let result = this;
    while (result.parent && result.parent.type !== 'document') {
      result = result.parent;
    }
    return result
  }

  raw(prop, defaultType) {
    let str = new Stringifier();
    return str.raw(this, prop, defaultType)
  }

  cleanRaws(keepBetween) {
    delete this.raws.before;
    delete this.raws.after;
    if (!keepBetween) delete this.raws.between;
  }

  toJSON(_, inputs) {
    let fixed = {};
    let emitInputs = inputs == null;
    inputs = inputs || new Map();
    let inputsNextIndex = 0;

    for (let name in this) {
      if (!Object.prototype.hasOwnProperty.call(this, name)) {
        /* c8 ignore next 2 */
        continue
      }
      if (name === 'parent' || name === 'proxyCache') continue
      let value = this[name];

      if (Array.isArray(value)) {
        fixed[name] = value.map(i => {
          if (typeof i === 'object' && i.toJSON) {
            return i.toJSON(null, inputs)
          } else {
            return i
          }
        });
      } else if (typeof value === 'object' && value.toJSON) {
        fixed[name] = value.toJSON(null, inputs);
      } else if (name === 'source') {
        let inputId = inputs.get(value.input);
        if (inputId == null) {
          inputId = inputsNextIndex;
          inputs.set(value.input, inputsNextIndex);
          inputsNextIndex++;
        }
        fixed[name] = {
          inputId,
          start: value.start,
          end: value.end
        };
      } else {
        fixed[name] = value;
      }
    }

    if (emitInputs) {
      fixed.inputs = [...inputs.keys()].map(input => input.toJSON());
    }

    return fixed
  }

  positionInside(index) {
    let string = this.toString();
    let column = this.source.start.column;
    let line = this.source.start.line;

    for (let i = 0; i < index; i++) {
      if (string[i] === '\n') {
        column = 1;
        line += 1;
      } else {
        column += 1;
      }
    }

    return { line, column }
  }

  positionBy(opts) {
    let pos = this.source.start;
    if (opts.index) {
      pos = this.positionInside(opts.index);
    } else if (opts.word) {
      let index = this.toString().indexOf(opts.word);
      if (index !== -1) pos = this.positionInside(index);
    }
    return pos
  }

  rangeBy(opts) {
    let start = {
      line: this.source.start.line,
      column: this.source.start.column
    };
    let end = this.source.end
      ? {
          line: this.source.end.line,
          column: this.source.end.column + 1
        }
      : {
          line: start.line,
          column: start.column + 1
        };

    if (opts.word) {
      let index = this.toString().indexOf(opts.word);
      if (index !== -1) {
        start = this.positionInside(index);
        end = this.positionInside(index + opts.word.length);
      }
    } else {
      if (opts.start) {
        start = {
          line: opts.start.line,
          column: opts.start.column
        };
      } else if (opts.index) {
        start = this.positionInside(opts.index);
      }

      if (opts.end) {
        end = {
          line: opts.end.line,
          column: opts.end.column
        };
      } else if (opts.endIndex) {
        end = this.positionInside(opts.endIndex);
      } else if (opts.index) {
        end = this.positionInside(opts.index + 1);
      }
    }

    if (
      end.line < start.line ||
      (end.line === start.line && end.column <= start.column)
    ) {
      end = { line: start.line, column: start.column + 1 };
    }

    return { start, end }
  }

  getProxyProcessor() {
    return {
      set(node, prop, value) {
        if (node[prop] === value) return true
        node[prop] = value;
        if (
          prop === 'prop' ||
          prop === 'value' ||
          prop === 'name' ||
          prop === 'params' ||
          prop === 'important' ||
          /* c8 ignore next */
          prop === 'text'
        ) {
          node.markDirty();
        }
        return true
      },

      get(node, prop) {
        if (prop === 'proxyOf') {
          return node
        } else if (prop === 'root') {
          return () => node.root().toProxy()
        } else {
          return node[prop]
        }
      }
    }
  }

  toProxy() {
    if (!this.proxyCache) {
      this.proxyCache = new Proxy(this, this.getProxyProcessor());
    }
    return this.proxyCache
  }

  addToError(error) {
    error.postcssNode = this;
    if (error.stack && this.source && /\n\s{4}at /.test(error.stack)) {
      let s = this.source;
      error.stack = error.stack.replace(
        /\n\s{4}at /,
        `$&${s.input.from}:${s.start.line}:${s.start.column}$&`
      );
    }
    return error
  }

  markDirty() {
    if (this[isClean$2]) {
      this[isClean$2] = false;
      let next = this;
      while ((next = next.parent)) {
        next[isClean$2] = false;
      }
    }
  }

  get proxyOf() {
    return this
  }
};

var node = Node$4;
Node$4.default = Node$4;

let Node$3 = node;

let Declaration$4 = class Declaration extends Node$3 {
  constructor(defaults) {
    if (
      defaults &&
      typeof defaults.value !== 'undefined' &&
      typeof defaults.value !== 'string'
    ) {
      defaults = { ...defaults, value: String(defaults.value) };
    }
    super(defaults);
    this.type = 'decl';
  }

  get variable() {
    return this.prop.startsWith('--') || this.prop[0] === '$'
  }
};

var declaration = Declaration$4;
Declaration$4.default = Declaration$4;

let urlAlphabet =
  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';
let customAlphabet = (alphabet, defaultSize = 21) => {
  return (size = defaultSize) => {
    let id = '';
    let i = size;
    while (i--) {
      id += alphabet[(Math.random() * alphabet.length) | 0];
    }
    return id
  }
};
let nanoid$2 = (size = 21) => {
  let id = '';
  let i = size;
  while (i--) {
    id += urlAlphabet[(Math.random() * 64) | 0];
  }
  return id
};
var nonSecure = { nanoid: nanoid$2, customAlphabet };

let { SourceMapConsumer: SourceMapConsumer$2, SourceMapGenerator: SourceMapGenerator$2 } = require$$2;
let { existsSync, readFileSync } = require$$2;
let { dirname: dirname$1, join } = require$$2;

function fromBase64(str) {
  if (Buffer) {
    return Buffer.from(str, 'base64').toString()
  } else {
    /* c8 ignore next 2 */
    return window.atob(str)
  }
}

let PreviousMap$2 = class PreviousMap {
  constructor(css, opts) {
    if (opts.map === false) return
    this.loadAnnotation(css);
    this.inline = this.startWith(this.annotation, 'data:');

    let prev = opts.map ? opts.map.prev : undefined;
    let text = this.loadMap(opts.from, prev);
    if (!this.mapFile && opts.from) {
      this.mapFile = opts.from;
    }
    if (this.mapFile) this.root = dirname$1(this.mapFile);
    if (text) this.text = text;
  }

  consumer() {
    if (!this.consumerCache) {
      this.consumerCache = new SourceMapConsumer$2(this.text);
    }
    return this.consumerCache
  }

  withContent() {
    return !!(
      this.consumer().sourcesContent &&
      this.consumer().sourcesContent.length > 0
    )
  }

  startWith(string, start) {
    if (!string) return false
    return string.substr(0, start.length) === start
  }

  getAnnotationURL(sourceMapString) {
    return sourceMapString.replace(/^\/\*\s*# sourceMappingURL=/, '').trim()
  }

  loadAnnotation(css) {
    let comments = css.match(/\/\*\s*# sourceMappingURL=/gm);
    if (!comments) return

    // sourceMappingURLs from comments, strings, etc.
    let start = css.lastIndexOf(comments.pop());
    let end = css.indexOf('*/', start);

    if (start > -1 && end > -1) {
      // Locate the last sourceMappingURL to avoid pickin
      this.annotation = this.getAnnotationURL(css.substring(start, end));
    }
  }

  decodeInline(text) {
    let baseCharsetUri = /^data:application\/json;charset=utf-?8;base64,/;
    let baseUri = /^data:application\/json;base64,/;
    let charsetUri = /^data:application\/json;charset=utf-?8,/;
    let uri = /^data:application\/json,/;

    if (charsetUri.test(text) || uri.test(text)) {
      return decodeURIComponent(text.substr(RegExp.lastMatch.length))
    }

    if (baseCharsetUri.test(text) || baseUri.test(text)) {
      return fromBase64(text.substr(RegExp.lastMatch.length))
    }

    let encoding = text.match(/data:application\/json;([^,]+),/)[1];
    throw new Error('Unsupported source map encoding ' + encoding)
  }

  loadFile(path) {
    this.root = dirname$1(path);
    if (existsSync(path)) {
      this.mapFile = path;
      return readFileSync(path, 'utf-8').toString().trim()
    }
  }

  loadMap(file, prev) {
    if (prev === false) return false

    if (prev) {
      if (typeof prev === 'string') {
        return prev
      } else if (typeof prev === 'function') {
        let prevPath = prev(file);
        if (prevPath) {
          let map = this.loadFile(prevPath);
          if (!map) {
            throw new Error(
              'Unable to load previous source map: ' + prevPath.toString()
            )
          }
          return map
        }
      } else if (prev instanceof SourceMapConsumer$2) {
        return SourceMapGenerator$2.fromSourceMap(prev).toString()
      } else if (prev instanceof SourceMapGenerator$2) {
        return prev.toString()
      } else if (this.isMap(prev)) {
        return JSON.stringify(prev)
      } else {
        throw new Error(
          'Unsupported previous source map format: ' + prev.toString()
        )
      }
    } else if (this.inline) {
      return this.decodeInline(this.annotation)
    } else if (this.annotation) {
      let map = this.annotation;
      if (file) map = join(dirname$1(file), map);
      return this.loadFile(map)
    }
  }

  isMap(map) {
    if (typeof map !== 'object') return false
    return (
      typeof map.mappings === 'string' ||
      typeof map._mappings === 'string' ||
      Array.isArray(map.sections)
    )
  }
};

var previousMap = PreviousMap$2;
PreviousMap$2.default = PreviousMap$2;

let { SourceMapConsumer: SourceMapConsumer$1, SourceMapGenerator: SourceMapGenerator$1 } = require$$2;
let { fileURLToPath, pathToFileURL: pathToFileURL$1 } = require$$2;
let { resolve: resolve$1, isAbsolute } = require$$2;
let { nanoid: nanoid$1 } = nonSecure;

let terminalHighlight = require$$2;
let CssSyntaxError$1 = cssSyntaxError;
let PreviousMap$1 = previousMap;

let fromOffsetCache = Symbol('fromOffsetCache');

let sourceMapAvailable$1 = Boolean(SourceMapConsumer$1 && SourceMapGenerator$1);
let pathAvailable$1 = Boolean(resolve$1 && isAbsolute);

let Input$6 = class Input {
  constructor(css, opts = {}) {
    if (
      css === null ||
      typeof css === 'undefined' ||
      (typeof css === 'object' && !css.toString)
    ) {
      throw new Error(`PostCSS received ${css} instead of CSS string`)
    }

    this.css = css.toString();

    if (this.css[0] === '\uFEFF' || this.css[0] === '\uFFFE') {
      this.hasBOM = true;
      this.css = this.css.slice(1);
    } else {
      this.hasBOM = false;
    }

    if (opts.from) {
      if (
        !pathAvailable$1 ||
        /^\w+:\/\//.test(opts.from) ||
        isAbsolute(opts.from)
      ) {
        this.file = opts.from;
      } else {
        this.file = resolve$1(opts.from);
      }
    }

    if (pathAvailable$1 && sourceMapAvailable$1) {
      let map = new PreviousMap$1(this.css, opts);
      if (map.text) {
        this.map = map;
        let file = map.consumer().file;
        if (!this.file && file) this.file = this.mapResolve(file);
      }
    }

    if (!this.file) {
      this.id = '<input css ' + nanoid$1(6) + '>';
    }
    if (this.map) this.map.file = this.from;
  }

  fromOffset(offset) {
    let lastLine, lineToIndex;
    if (!this[fromOffsetCache]) {
      let lines = this.css.split('\n');
      lineToIndex = new Array(lines.length);
      let prevIndex = 0;

      for (let i = 0, l = lines.length; i < l; i++) {
        lineToIndex[i] = prevIndex;
        prevIndex += lines[i].length + 1;
      }

      this[fromOffsetCache] = lineToIndex;
    } else {
      lineToIndex = this[fromOffsetCache];
    }
    lastLine = lineToIndex[lineToIndex.length - 1];

    let min = 0;
    if (offset >= lastLine) {
      min = lineToIndex.length - 1;
    } else {
      let max = lineToIndex.length - 2;
      let mid;
      while (min < max) {
        mid = min + ((max - min) >> 1);
        if (offset < lineToIndex[mid]) {
          max = mid - 1;
        } else if (offset >= lineToIndex[mid + 1]) {
          min = mid + 1;
        } else {
          min = mid;
          break
        }
      }
    }
    return {
      line: min + 1,
      col: offset - lineToIndex[min] + 1
    }
  }

  error(message, line, column, opts = {}) {
    let result, endLine, endColumn;

    if (line && typeof line === 'object') {
      let start = line;
      let end = column;
      if (typeof line.offset === 'number') {
        let pos = this.fromOffset(start.offset);
        line = pos.line;
        column = pos.col;
      } else {
        line = start.line;
        column = start.column;
      }
      if (typeof end.offset === 'number') {
        let pos = this.fromOffset(end.offset);
        endLine = pos.line;
        endColumn = pos.col;
      } else {
        endLine = end.line;
        endColumn = end.column;
      }
    } else if (!column) {
      let pos = this.fromOffset(line);
      line = pos.line;
      column = pos.col;
    }

    let origin = this.origin(line, column, endLine, endColumn);
    if (origin) {
      result = new CssSyntaxError$1(
        message,
        origin.endLine === undefined
          ? origin.line
          : { line: origin.line, column: origin.column },
        origin.endLine === undefined
          ? origin.column
          : { line: origin.endLine, column: origin.endColumn },
        origin.source,
        origin.file,
        opts.plugin
      );
    } else {
      result = new CssSyntaxError$1(
        message,
        endLine === undefined ? line : { line, column },
        endLine === undefined ? column : { line: endLine, column: endColumn },
        this.css,
        this.file,
        opts.plugin
      );
    }

    result.input = { line, column, endLine, endColumn, source: this.css };
    if (this.file) {
      if (pathToFileURL$1) {
        result.input.url = pathToFileURL$1(this.file).toString();
      }
      result.input.file = this.file;
    }

    return result
  }

  origin(line, column, endLine, endColumn) {
    if (!this.map) return false
    let consumer = this.map.consumer();

    let from = consumer.originalPositionFor({ line, column });
    if (!from.source) return false

    let to;
    if (typeof endLine === 'number') {
      to = consumer.originalPositionFor({ line: endLine, column: endColumn });
    }

    let fromUrl;

    if (isAbsolute(from.source)) {
      fromUrl = pathToFileURL$1(from.source);
    } else {
      fromUrl = new URL(
        from.source,
        this.map.consumer().sourceRoot || pathToFileURL$1(this.map.mapFile)
      );
    }

    let result = {
      url: fromUrl.toString(),
      line: from.line,
      column: from.column,
      endLine: to && to.line,
      endColumn: to && to.column
    };

    if (fromUrl.protocol === 'file:') {
      if (fileURLToPath) {
        result.file = fileURLToPath(fromUrl);
      } else {
        /* c8 ignore next 2 */
        throw new Error(`file: protocol is not available in this PostCSS build`)
      }
    }

    let source = consumer.sourceContentFor(from.source);
    if (source) result.source = source;

    return result
  }

  mapResolve(file) {
    if (/^\w+:\/\//.test(file)) {
      return file
    }
    return resolve$1(this.map.consumer().sourceRoot || this.map.root || '.', file)
  }

  get from() {
    return this.file || this.id
  }

  toJSON() {
    let json = {};
    for (let name of ['hasBOM', 'css', 'file', 'id']) {
      if (this[name] != null) {
        json[name] = this[name];
      }
    }
    if (this.map) {
      json.map = { ...this.map };
      if (json.map.consumerCache) {
        json.map.consumerCache = undefined;
      }
    }
    return json
  }
};

var input = Input$6;
Input$6.default = Input$6;

if (terminalHighlight && terminalHighlight.registerInput) {
  terminalHighlight.registerInput(Input$6);
}

let { SourceMapConsumer, SourceMapGenerator } = require$$2;
let { dirname, resolve, relative, sep } = require$$2;
let { pathToFileURL } = require$$2;

let Input$5 = input;

let sourceMapAvailable = Boolean(SourceMapConsumer && SourceMapGenerator);
let pathAvailable = Boolean(dirname && resolve && relative && sep);

let MapGenerator$2 = class MapGenerator {
  constructor(stringify, root, opts, cssString) {
    this.stringify = stringify;
    this.mapOpts = opts.map || {};
    this.root = root;
    this.opts = opts;
    this.css = cssString;
  }

  isMap() {
    if (typeof this.opts.map !== 'undefined') {
      return !!this.opts.map
    }
    return this.previous().length > 0
  }

  previous() {
    if (!this.previousMaps) {
      this.previousMaps = [];
      if (this.root) {
        this.root.walk(node => {
          if (node.source && node.source.input.map) {
            let map = node.source.input.map;
            if (!this.previousMaps.includes(map)) {
              this.previousMaps.push(map);
            }
          }
        });
      } else {
        let input = new Input$5(this.css, this.opts);
        if (input.map) this.previousMaps.push(input.map);
      }
    }

    return this.previousMaps
  }

  isInline() {
    if (typeof this.mapOpts.inline !== 'undefined') {
      return this.mapOpts.inline
    }

    let annotation = this.mapOpts.annotation;
    if (typeof annotation !== 'undefined' && annotation !== true) {
      return false
    }

    if (this.previous().length) {
      return this.previous().some(i => i.inline)
    }
    return true
  }

  isSourcesContent() {
    if (typeof this.mapOpts.sourcesContent !== 'undefined') {
      return this.mapOpts.sourcesContent
    }
    if (this.previous().length) {
      return this.previous().some(i => i.withContent())
    }
    return true
  }

  clearAnnotation() {
    if (this.mapOpts.annotation === false) return

    if (this.root) {
      let node;
      for (let i = this.root.nodes.length - 1; i >= 0; i--) {
        node = this.root.nodes[i];
        if (node.type !== 'comment') continue
        if (node.text.indexOf('# sourceMappingURL=') === 0) {
          this.root.removeChild(i);
        }
      }
    } else if (this.css) {
      this.css = this.css.replace(/(\n)?\/\*#[\S\s]*?\*\/$/gm, '');
    }
  }

  setSourcesContent() {
    let already = {};
    if (this.root) {
      this.root.walk(node => {
        if (node.source) {
          let from = node.source.input.from;
          if (from && !already[from]) {
            already[from] = true;
            this.map.setSourceContent(
              this.toUrl(this.path(from)),
              node.source.input.css
            );
          }
        }
      });
    } else if (this.css) {
      let from = this.opts.from
        ? this.toUrl(this.path(this.opts.from))
        : '<no source>';
      this.map.setSourceContent(from, this.css);
    }
  }

  applyPrevMaps() {
    for (let prev of this.previous()) {
      let from = this.toUrl(this.path(prev.file));
      let root = prev.root || dirname(prev.file);
      let map;

      if (this.mapOpts.sourcesContent === false) {
        map = new SourceMapConsumer(prev.text);
        if (map.sourcesContent) {
          map.sourcesContent = map.sourcesContent.map(() => null);
        }
      } else {
        map = prev.consumer();
      }

      this.map.applySourceMap(map, from, this.toUrl(this.path(root)));
    }
  }

  isAnnotation() {
    if (this.isInline()) {
      return true
    }
    if (typeof this.mapOpts.annotation !== 'undefined') {
      return this.mapOpts.annotation
    }
    if (this.previous().length) {
      return this.previous().some(i => i.annotation)
    }
    return true
  }

  toBase64(str) {
    if (Buffer) {
      return Buffer.from(str).toString('base64')
    } else {
      return window.btoa(unescape(encodeURIComponent(str)))
    }
  }

  addAnnotation() {
    let content;

    if (this.isInline()) {
      content =
        'data:application/json;base64,' + this.toBase64(this.map.toString());
    } else if (typeof this.mapOpts.annotation === 'string') {
      content = this.mapOpts.annotation;
    } else if (typeof this.mapOpts.annotation === 'function') {
      content = this.mapOpts.annotation(this.opts.to, this.root);
    } else {
      content = this.outputFile() + '.map';
    }
    let eol = '\n';
    if (this.css.includes('\r\n')) eol = '\r\n';

    this.css += eol + '/*# sourceMappingURL=' + content + ' */';
  }

  outputFile() {
    if (this.opts.to) {
      return this.path(this.opts.to)
    } else if (this.opts.from) {
      return this.path(this.opts.from)
    } else {
      return 'to.css'
    }
  }

  generateMap() {
    if (this.root) {
      this.generateString();
    } else if (this.previous().length === 1) {
      let prev = this.previous()[0].consumer();
      prev.file = this.outputFile();
      this.map = SourceMapGenerator.fromSourceMap(prev);
    } else {
      this.map = new SourceMapGenerator({ file: this.outputFile() });
      this.map.addMapping({
        source: this.opts.from
          ? this.toUrl(this.path(this.opts.from))
          : '<no source>',
        generated: { line: 1, column: 0 },
        original: { line: 1, column: 0 }
      });
    }

    if (this.isSourcesContent()) this.setSourcesContent();
    if (this.root && this.previous().length > 0) this.applyPrevMaps();
    if (this.isAnnotation()) this.addAnnotation();

    if (this.isInline()) {
      return [this.css]
    } else {
      return [this.css, this.map]
    }
  }

  path(file) {
    if (file.indexOf('<') === 0) return file
    if (/^\w+:\/\//.test(file)) return file
    if (this.mapOpts.absolute) return file

    let from = this.opts.to ? dirname(this.opts.to) : '.';

    if (typeof this.mapOpts.annotation === 'string') {
      from = dirname(resolve(from, this.mapOpts.annotation));
    }

    file = relative(from, file);
    return file
  }

  toUrl(path) {
    if (sep === '\\') {
      path = path.replace(/\\/g, '/');
    }
    return encodeURI(path).replace(/[#?]/g, encodeURIComponent)
  }

  sourcePath(node) {
    if (this.mapOpts.from) {
      return this.toUrl(this.mapOpts.from)
    } else if (this.mapOpts.absolute) {
      if (pathToFileURL) {
        return pathToFileURL(node.source.input.from).toString()
      } else {
        throw new Error(
          '`map.absolute` option is not available in this PostCSS build'
        )
      }
    } else {
      return this.toUrl(this.path(node.source.input.from))
    }
  }

  generateString() {
    this.css = '';
    this.map = new SourceMapGenerator({ file: this.outputFile() });

    let line = 1;
    let column = 1;

    let noSource = '<no source>';
    let mapping = {
      source: '',
      generated: { line: 0, column: 0 },
      original: { line: 0, column: 0 }
    };

    let lines, last;
    this.stringify(this.root, (str, node, type) => {
      this.css += str;

      if (node && type !== 'end') {
        mapping.generated.line = line;
        mapping.generated.column = column - 1;
        if (node.source && node.source.start) {
          mapping.source = this.sourcePath(node);
          mapping.original.line = node.source.start.line;
          mapping.original.column = node.source.start.column - 1;
          this.map.addMapping(mapping);
        } else {
          mapping.source = noSource;
          mapping.original.line = 1;
          mapping.original.column = 0;
          this.map.addMapping(mapping);
        }
      }

      lines = str.match(/\n/g);
      if (lines) {
        line += lines.length;
        last = str.lastIndexOf('\n');
        column = str.length - last;
      } else {
        column += str.length;
      }

      if (node && type !== 'start') {
        let p = node.parent || { raws: {} };
        if (node.type !== 'decl' || node !== p.last || p.raws.semicolon) {
          if (node.source && node.source.end) {
            mapping.source = this.sourcePath(node);
            mapping.original.line = node.source.end.line;
            mapping.original.column = node.source.end.column - 1;
            mapping.generated.line = line;
            mapping.generated.column = column - 2;
            this.map.addMapping(mapping);
          } else {
            mapping.source = noSource;
            mapping.original.line = 1;
            mapping.original.column = 0;
            mapping.generated.line = line;
            mapping.generated.column = column - 1;
            this.map.addMapping(mapping);
          }
        }
      }
    });
  }

  generate() {
    this.clearAnnotation();
    if (pathAvailable && sourceMapAvailable && this.isMap()) {
      return this.generateMap()
    } else {
      let result = '';
      this.stringify(this.root, i => {
        result += i;
      });
      return [result]
    }
  }
};

var mapGenerator = MapGenerator$2;

let Node$2 = node;

let Comment$4 = class Comment extends Node$2 {
  constructor(defaults) {
    super(defaults);
    this.type = 'comment';
  }
};

var comment = Comment$4;
Comment$4.default = Comment$4;

let { isClean: isClean$1, my: my$1 } = symbols;
let Declaration$3 = declaration;
let Comment$3 = comment;
let Node$1 = node;

let parse$5, Rule$4, AtRule$4, Root$6;

function cleanSource(nodes) {
  return nodes.map(i => {
    if (i.nodes) i.nodes = cleanSource(i.nodes);
    delete i.source;
    return i
  })
}

function markDirtyUp(node) {
  node[isClean$1] = false;
  if (node.proxyOf.nodes) {
    for (let i of node.proxyOf.nodes) {
      markDirtyUp(i);
    }
  }
}

let Container$7 = class Container extends Node$1 {
  push(child) {
    child.parent = this;
    this.proxyOf.nodes.push(child);
    return this
  }

  each(callback) {
    if (!this.proxyOf.nodes) return undefined
    let iterator = this.getIterator();

    let index, result;
    while (this.indexes[iterator] < this.proxyOf.nodes.length) {
      index = this.indexes[iterator];
      result = callback(this.proxyOf.nodes[index], index);
      if (result === false) break

      this.indexes[iterator] += 1;
    }

    delete this.indexes[iterator];
    return result
  }

  walk(callback) {
    return this.each((child, i) => {
      let result;
      try {
        result = callback(child, i);
      } catch (e) {
        throw child.addToError(e)
      }
      if (result !== false && child.walk) {
        result = child.walk(callback);
      }

      return result
    })
  }

  walkDecls(prop, callback) {
    if (!callback) {
      callback = prop;
      return this.walk((child, i) => {
        if (child.type === 'decl') {
          return callback(child, i)
        }
      })
    }
    if (prop instanceof RegExp) {
      return this.walk((child, i) => {
        if (child.type === 'decl' && prop.test(child.prop)) {
          return callback(child, i)
        }
      })
    }
    return this.walk((child, i) => {
      if (child.type === 'decl' && child.prop === prop) {
        return callback(child, i)
      }
    })
  }

  walkRules(selector, callback) {
    if (!callback) {
      callback = selector;

      return this.walk((child, i) => {
        if (child.type === 'rule') {
          return callback(child, i)
        }
      })
    }
    if (selector instanceof RegExp) {
      return this.walk((child, i) => {
        if (child.type === 'rule' && selector.test(child.selector)) {
          return callback(child, i)
        }
      })
    }
    return this.walk((child, i) => {
      if (child.type === 'rule' && child.selector === selector) {
        return callback(child, i)
      }
    })
  }

  walkAtRules(name, callback) {
    if (!callback) {
      callback = name;
      return this.walk((child, i) => {
        if (child.type === 'atrule') {
          return callback(child, i)
        }
      })
    }
    if (name instanceof RegExp) {
      return this.walk((child, i) => {
        if (child.type === 'atrule' && name.test(child.name)) {
          return callback(child, i)
        }
      })
    }
    return this.walk((child, i) => {
      if (child.type === 'atrule' && child.name === name) {
        return callback(child, i)
      }
    })
  }

  walkComments(callback) {
    return this.walk((child, i) => {
      if (child.type === 'comment') {
        return callback(child, i)
      }
    })
  }

  append(...children) {
    for (let child of children) {
      let nodes = this.normalize(child, this.last);
      for (let node of nodes) this.proxyOf.nodes.push(node);
    }

    this.markDirty();

    return this
  }

  prepend(...children) {
    children = children.reverse();
    for (let child of children) {
      let nodes = this.normalize(child, this.first, 'prepend').reverse();
      for (let node of nodes) this.proxyOf.nodes.unshift(node);
      for (let id in this.indexes) {
        this.indexes[id] = this.indexes[id] + nodes.length;
      }
    }

    this.markDirty();

    return this
  }

  cleanRaws(keepBetween) {
    super.cleanRaws(keepBetween);
    if (this.nodes) {
      for (let node of this.nodes) node.cleanRaws(keepBetween);
    }
  }

  insertBefore(exist, add) {
    exist = this.index(exist);

    let type = exist === 0 ? 'prepend' : false;
    let nodes = this.normalize(add, this.proxyOf.nodes[exist], type).reverse();
    for (let node of nodes) this.proxyOf.nodes.splice(exist, 0, node);

    let index;
    for (let id in this.indexes) {
      index = this.indexes[id];
      if (exist <= index) {
        this.indexes[id] = index + nodes.length;
      }
    }

    this.markDirty();

    return this
  }

  insertAfter(exist, add) {
    exist = this.index(exist);

    let nodes = this.normalize(add, this.proxyOf.nodes[exist]).reverse();
    for (let node of nodes) this.proxyOf.nodes.splice(exist + 1, 0, node);

    let index;
    for (let id in this.indexes) {
      index = this.indexes[id];
      if (exist < index) {
        this.indexes[id] = index + nodes.length;
      }
    }

    this.markDirty();

    return this
  }

  removeChild(child) {
    child = this.index(child);
    this.proxyOf.nodes[child].parent = undefined;
    this.proxyOf.nodes.splice(child, 1);

    let index;
    for (let id in this.indexes) {
      index = this.indexes[id];
      if (index >= child) {
        this.indexes[id] = index - 1;
      }
    }

    this.markDirty();

    return this
  }

  removeAll() {
    for (let node of this.proxyOf.nodes) node.parent = undefined;
    this.proxyOf.nodes = [];

    this.markDirty();

    return this
  }

  replaceValues(pattern, opts, callback) {
    if (!callback) {
      callback = opts;
      opts = {};
    }

    this.walkDecls(decl => {
      if (opts.props && !opts.props.includes(decl.prop)) return
      if (opts.fast && !decl.value.includes(opts.fast)) return

      decl.value = decl.value.replace(pattern, callback);
    });

    this.markDirty();

    return this
  }

  every(condition) {
    return this.nodes.every(condition)
  }

  some(condition) {
    return this.nodes.some(condition)
  }

  index(child) {
    if (typeof child === 'number') return child
    if (child.proxyOf) child = child.proxyOf;
    return this.proxyOf.nodes.indexOf(child)
  }

  get first() {
    if (!this.proxyOf.nodes) return undefined
    return this.proxyOf.nodes[0]
  }

  get last() {
    if (!this.proxyOf.nodes) return undefined
    return this.proxyOf.nodes[this.proxyOf.nodes.length - 1]
  }

  normalize(nodes, sample) {
    if (typeof nodes === 'string') {
      nodes = cleanSource(parse$5(nodes).nodes);
    } else if (Array.isArray(nodes)) {
      nodes = nodes.slice(0);
      for (let i of nodes) {
        if (i.parent) i.parent.removeChild(i, 'ignore');
      }
    } else if (nodes.type === 'root' && this.type !== 'document') {
      nodes = nodes.nodes.slice(0);
      for (let i of nodes) {
        if (i.parent) i.parent.removeChild(i, 'ignore');
      }
    } else if (nodes.type) {
      nodes = [nodes];
    } else if (nodes.prop) {
      if (typeof nodes.value === 'undefined') {
        throw new Error('Value field is missed in node creation')
      } else if (typeof nodes.value !== 'string') {
        nodes.value = String(nodes.value);
      }
      nodes = [new Declaration$3(nodes)];
    } else if (nodes.selector) {
      nodes = [new Rule$4(nodes)];
    } else if (nodes.name) {
      nodes = [new AtRule$4(nodes)];
    } else if (nodes.text) {
      nodes = [new Comment$3(nodes)];
    } else {
      throw new Error('Unknown node type in node creation')
    }

    let processed = nodes.map(i => {
      /* c8 ignore next */
      if (!i[my$1]) Container.rebuild(i);
      i = i.proxyOf;
      if (i.parent) i.parent.removeChild(i);
      if (i[isClean$1]) markDirtyUp(i);
      if (typeof i.raws.before === 'undefined') {
        if (sample && typeof sample.raws.before !== 'undefined') {
          i.raws.before = sample.raws.before.replace(/\S/g, '');
        }
      }
      i.parent = this.proxyOf;
      return i
    });

    return processed
  }

  getProxyProcessor() {
    return {
      set(node, prop, value) {
        if (node[prop] === value) return true
        node[prop] = value;
        if (prop === 'name' || prop === 'params' || prop === 'selector') {
          node.markDirty();
        }
        return true
      },

      get(node, prop) {
        if (prop === 'proxyOf') {
          return node
        } else if (!node[prop]) {
          return node[prop]
        } else if (
          prop === 'each' ||
          (typeof prop === 'string' && prop.startsWith('walk'))
        ) {
          return (...args) => {
            return node[prop](
              ...args.map(i => {
                if (typeof i === 'function') {
                  return (child, index) => i(child.toProxy(), index)
                } else {
                  return i
                }
              })
            )
          }
        } else if (prop === 'every' || prop === 'some') {
          return cb => {
            return node[prop]((child, ...other) =>
              cb(child.toProxy(), ...other)
            )
          }
        } else if (prop === 'root') {
          return () => node.root().toProxy()
        } else if (prop === 'nodes') {
          return node.nodes.map(i => i.toProxy())
        } else if (prop === 'first' || prop === 'last') {
          return node[prop].toProxy()
        } else {
          return node[prop]
        }
      }
    }
  }

  getIterator() {
    if (!this.lastEach) this.lastEach = 0;
    if (!this.indexes) this.indexes = {};

    this.lastEach += 1;
    let iterator = this.lastEach;
    this.indexes[iterator] = 0;

    return iterator
  }
};

Container$7.registerParse = dependant => {
  parse$5 = dependant;
};

Container$7.registerRule = dependant => {
  Rule$4 = dependant;
};

Container$7.registerAtRule = dependant => {
  AtRule$4 = dependant;
};

Container$7.registerRoot = dependant => {
  Root$6 = dependant;
};

var container = Container$7;
Container$7.default = Container$7;

/* c8 ignore start */
Container$7.rebuild = node => {
  if (node.type === 'atrule') {
    Object.setPrototypeOf(node, AtRule$4.prototype);
  } else if (node.type === 'rule') {
    Object.setPrototypeOf(node, Rule$4.prototype);
  } else if (node.type === 'decl') {
    Object.setPrototypeOf(node, Declaration$3.prototype);
  } else if (node.type === 'comment') {
    Object.setPrototypeOf(node, Comment$3.prototype);
  } else if (node.type === 'root') {
    Object.setPrototypeOf(node, Root$6.prototype);
  }

  node[my$1] = true;

  if (node.nodes) {
    node.nodes.forEach(child => {
      Container$7.rebuild(child);
    });
  }
};

let Container$6 = container;

let LazyResult$4, Processor$3;

let Document$3 = class Document extends Container$6 {
  constructor(defaults) {
    // type needs to be passed to super, otherwise child roots won't be normalized correctly
    super({ type: 'document', ...defaults });

    if (!this.nodes) {
      this.nodes = [];
    }
  }

  toResult(opts = {}) {
    let lazy = new LazyResult$4(new Processor$3(), this, opts);

    return lazy.stringify()
  }
};

Document$3.registerLazyResult = dependant => {
  LazyResult$4 = dependant;
};

Document$3.registerProcessor = dependant => {
  Processor$3 = dependant;
};

var document$1 = Document$3;
Document$3.default = Document$3;

let Warning$2 = class Warning {
  constructor(text, opts = {}) {
    this.type = 'warning';
    this.text = text;

    if (opts.node && opts.node.source) {
      let range = opts.node.rangeBy(opts);
      this.line = range.start.line;
      this.column = range.start.column;
      this.endLine = range.end.line;
      this.endColumn = range.end.column;
    }

    for (let opt in opts) this[opt] = opts[opt];
  }

  toString() {
    if (this.node) {
      return this.node.error(this.text, {
        plugin: this.plugin,
        index: this.index,
        word: this.word
      }).message
    }

    if (this.plugin) {
      return this.plugin + ': ' + this.text
    }

    return this.text
  }
};

var warning = Warning$2;
Warning$2.default = Warning$2;

let Warning$1 = warning;

let Result$3 = class Result {
  constructor(processor, root, opts) {
    this.processor = processor;
    this.messages = [];
    this.root = root;
    this.opts = opts;
    this.css = undefined;
    this.map = undefined;
  }

  toString() {
    return this.css
  }

  warn(text, opts = {}) {
    if (!opts.plugin) {
      if (this.lastPlugin && this.lastPlugin.postcssPlugin) {
        opts.plugin = this.lastPlugin.postcssPlugin;
      }
    }

    let warning = new Warning$1(text, opts);
    this.messages.push(warning);

    return warning
  }

  warnings() {
    return this.messages.filter(i => i.type === 'warning')
  }

  get content() {
    return this.css
  }
};

var result = Result$3;
Result$3.default = Result$3;

const SINGLE_QUOTE = "'".charCodeAt(0);
const DOUBLE_QUOTE = '"'.charCodeAt(0);
const BACKSLASH = '\\'.charCodeAt(0);
const SLASH = '/'.charCodeAt(0);
const NEWLINE = '\n'.charCodeAt(0);
const SPACE = ' '.charCodeAt(0);
const FEED = '\f'.charCodeAt(0);
const TAB = '\t'.charCodeAt(0);
const CR = '\r'.charCodeAt(0);
const OPEN_SQUARE = '['.charCodeAt(0);
const CLOSE_SQUARE = ']'.charCodeAt(0);
const OPEN_PARENTHESES = '('.charCodeAt(0);
const CLOSE_PARENTHESES = ')'.charCodeAt(0);
const OPEN_CURLY = '{'.charCodeAt(0);
const CLOSE_CURLY = '}'.charCodeAt(0);
const SEMICOLON = ';'.charCodeAt(0);
const ASTERISK = '*'.charCodeAt(0);
const COLON = ':'.charCodeAt(0);
const AT = '@'.charCodeAt(0);

const RE_AT_END = /[\t\n\f\r "#'()/;[\\\]{}]/g;
const RE_WORD_END = /[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g;
const RE_BAD_BRACKET = /.[\n"'(/\\]/;
const RE_HEX_ESCAPE = /[\da-f]/i;

var tokenize = function tokenizer(input, options = {}) {
  let css = input.css.valueOf();
  let ignore = options.ignoreErrors;

  let code, next, quote, content, escape;
  let escaped, escapePos, prev, n, currentToken;

  let length = css.length;
  let pos = 0;
  let buffer = [];
  let returned = [];

  function position() {
    return pos
  }

  function unclosed(what) {
    throw input.error('Unclosed ' + what, pos)
  }

  function endOfFile() {
    return returned.length === 0 && pos >= length
  }

  function nextToken(opts) {
    if (returned.length) return returned.pop()
    if (pos >= length) return

    let ignoreUnclosed = opts ? opts.ignoreUnclosed : false;

    code = css.charCodeAt(pos);

    switch (code) {
      case NEWLINE:
      case SPACE:
      case TAB:
      case CR:
      case FEED: {
        next = pos;
        do {
          next += 1;
          code = css.charCodeAt(next);
        } while (
          code === SPACE ||
          code === NEWLINE ||
          code === TAB ||
          code === CR ||
          code === FEED
        )

        currentToken = ['space', css.slice(pos, next)];
        pos = next - 1;
        break
      }

      case OPEN_SQUARE:
      case CLOSE_SQUARE:
      case OPEN_CURLY:
      case CLOSE_CURLY:
      case COLON:
      case SEMICOLON:
      case CLOSE_PARENTHESES: {
        let controlChar = String.fromCharCode(code);
        currentToken = [controlChar, controlChar, pos];
        break
      }

      case OPEN_PARENTHESES: {
        prev = buffer.length ? buffer.pop()[1] : '';
        n = css.charCodeAt(pos + 1);
        if (
          prev === 'url' &&
          n !== SINGLE_QUOTE &&
          n !== DOUBLE_QUOTE &&
          n !== SPACE &&
          n !== NEWLINE &&
          n !== TAB &&
          n !== FEED &&
          n !== CR
        ) {
          next = pos;
          do {
            escaped = false;
            next = css.indexOf(')', next + 1);
            if (next === -1) {
              if (ignore || ignoreUnclosed) {
                next = pos;
                break
              } else {
                unclosed('bracket');
              }
            }
            escapePos = next;
            while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
              escapePos -= 1;
              escaped = !escaped;
            }
          } while (escaped)

          currentToken = ['brackets', css.slice(pos, next + 1), pos, next];

          pos = next;
        } else {
          next = css.indexOf(')', pos + 1);
          content = css.slice(pos, next + 1);

          if (next === -1 || RE_BAD_BRACKET.test(content)) {
            currentToken = ['(', '(', pos];
          } else {
            currentToken = ['brackets', content, pos, next];
            pos = next;
          }
        }

        break
      }

      case SINGLE_QUOTE:
      case DOUBLE_QUOTE: {
        quote = code === SINGLE_QUOTE ? "'" : '"';
        next = pos;
        do {
          escaped = false;
          next = css.indexOf(quote, next + 1);
          if (next === -1) {
            if (ignore || ignoreUnclosed) {
              next = pos + 1;
              break
            } else {
              unclosed('string');
            }
          }
          escapePos = next;
          while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
            escapePos -= 1;
            escaped = !escaped;
          }
        } while (escaped)

        currentToken = ['string', css.slice(pos, next + 1), pos, next];
        pos = next;
        break
      }

      case AT: {
        RE_AT_END.lastIndex = pos + 1;
        RE_AT_END.test(css);
        if (RE_AT_END.lastIndex === 0) {
          next = css.length - 1;
        } else {
          next = RE_AT_END.lastIndex - 2;
        }

        currentToken = ['at-word', css.slice(pos, next + 1), pos, next];

        pos = next;
        break
      }

      case BACKSLASH: {
        next = pos;
        escape = true;
        while (css.charCodeAt(next + 1) === BACKSLASH) {
          next += 1;
          escape = !escape;
        }
        code = css.charCodeAt(next + 1);
        if (
          escape &&
          code !== SLASH &&
          code !== SPACE &&
          code !== NEWLINE &&
          code !== TAB &&
          code !== CR &&
          code !== FEED
        ) {
          next += 1;
          if (RE_HEX_ESCAPE.test(css.charAt(next))) {
            while (RE_HEX_ESCAPE.test(css.charAt(next + 1))) {
              next += 1;
            }
            if (css.charCodeAt(next + 1) === SPACE) {
              next += 1;
            }
          }
        }

        currentToken = ['word', css.slice(pos, next + 1), pos, next];

        pos = next;
        break
      }

      default: {
        if (code === SLASH && css.charCodeAt(pos + 1) === ASTERISK) {
          next = css.indexOf('*/', pos + 2) + 1;
          if (next === 0) {
            if (ignore || ignoreUnclosed) {
              next = css.length;
            } else {
              unclosed('comment');
            }
          }

          currentToken = ['comment', css.slice(pos, next + 1), pos, next];
          pos = next;
        } else {
          RE_WORD_END.lastIndex = pos + 1;
          RE_WORD_END.test(css);
          if (RE_WORD_END.lastIndex === 0) {
            next = css.length - 1;
          } else {
            next = RE_WORD_END.lastIndex - 2;
          }

          currentToken = ['word', css.slice(pos, next + 1), pos, next];
          buffer.push(currentToken);
          pos = next;
        }

        break
      }
    }

    pos++;
    return currentToken
  }

  function back(token) {
    returned.push(token);
  }

  return {
    back,
    nextToken,
    endOfFile,
    position
  }
};

let Container$5 = container;

let AtRule$3 = class AtRule extends Container$5 {
  constructor(defaults) {
    super(defaults);
    this.type = 'atrule';
  }

  append(...children) {
    if (!this.proxyOf.nodes) this.nodes = [];
    return super.append(...children)
  }

  prepend(...children) {
    if (!this.proxyOf.nodes) this.nodes = [];
    return super.prepend(...children)
  }
};

var atRule = AtRule$3;
AtRule$3.default = AtRule$3;

Container$5.registerAtRule(AtRule$3);

let Container$4 = container;

let LazyResult$3, Processor$2;

let Root$5 = class Root extends Container$4 {
  constructor(defaults) {
    super(defaults);
    this.type = 'root';
    if (!this.nodes) this.nodes = [];
  }

  removeChild(child, ignore) {
    let index = this.index(child);

    if (!ignore && index === 0 && this.nodes.length > 1) {
      this.nodes[1].raws.before = this.nodes[index].raws.before;
    }

    return super.removeChild(child)
  }

  normalize(child, sample, type) {
    let nodes = super.normalize(child);

    if (sample) {
      if (type === 'prepend') {
        if (this.nodes.length > 1) {
          sample.raws.before = this.nodes[1].raws.before;
        } else {
          delete sample.raws.before;
        }
      } else if (this.first !== sample) {
        for (let node of nodes) {
          node.raws.before = sample.raws.before;
        }
      }
    }

    return nodes
  }

  toResult(opts = {}) {
    let lazy = new LazyResult$3(new Processor$2(), this, opts);
    return lazy.stringify()
  }
};

Root$5.registerLazyResult = dependant => {
  LazyResult$3 = dependant;
};

Root$5.registerProcessor = dependant => {
  Processor$2 = dependant;
};

var root = Root$5;
Root$5.default = Root$5;

Container$4.registerRoot(Root$5);

let list$2 = {
  split(string, separators, last) {
    let array = [];
    let current = '';
    let split = false;

    let func = 0;
    let inQuote = false;
    let prevQuote = '';
    let escape = false;

    for (let letter of string) {
      if (escape) {
        escape = false;
      } else if (letter === '\\') {
        escape = true;
      } else if (inQuote) {
        if (letter === prevQuote) {
          inQuote = false;
        }
      } else if (letter === '"' || letter === "'") {
        inQuote = true;
        prevQuote = letter;
      } else if (letter === '(') {
        func += 1;
      } else if (letter === ')') {
        if (func > 0) func -= 1;
      } else if (func === 0) {
        if (separators.includes(letter)) split = true;
      }

      if (split) {
        if (current !== '') array.push(current.trim());
        current = '';
        split = false;
      } else {
        current += letter;
      }
    }

    if (last || current !== '') array.push(current.trim());
    return array
  },

  space(string) {
    let spaces = [' ', '\n', '\t'];
    return list$2.split(string, spaces)
  },

  comma(string) {
    return list$2.split(string, [','], true)
  }
};

var list_1 = list$2;
list$2.default = list$2;

let Container$3 = container;
let list$1 = list_1;

let Rule$3 = class Rule extends Container$3 {
  constructor(defaults) {
    super(defaults);
    this.type = 'rule';
    if (!this.nodes) this.nodes = [];
  }

  get selectors() {
    return list$1.comma(this.selector)
  }

  set selectors(values) {
    let match = this.selector ? this.selector.match(/,\s*/) : null;
    let sep = match ? match[0] : ',' + this.raw('between', 'beforeOpen');
    this.selector = values.join(sep);
  }
};

var rule = Rule$3;
Rule$3.default = Rule$3;

Container$3.registerRule(Rule$3);

let Declaration$2 = declaration;
let tokenizer = tokenize;
let Comment$2 = comment;
let AtRule$2 = atRule;
let Root$4 = root;
let Rule$2 = rule;

const SAFE_COMMENT_NEIGHBOR = {
  empty: true,
  space: true
};

function findLastWithPosition(tokens) {
  for (let i = tokens.length - 1; i >= 0; i--) {
    let token = tokens[i];
    let pos = token[3] || token[2];
    if (pos) return pos
  }
}

let Parser$1 = class Parser {
  constructor(input) {
    this.input = input;

    this.root = new Root$4();
    this.current = this.root;
    this.spaces = '';
    this.semicolon = false;
    this.customProperty = false;

    this.createTokenizer();
    this.root.source = { input, start: { offset: 0, line: 1, column: 1 } };
  }

  createTokenizer() {
    this.tokenizer = tokenizer(this.input);
  }

  parse() {
    let token;
    while (!this.tokenizer.endOfFile()) {
      token = this.tokenizer.nextToken();

      switch (token[0]) {
        case 'space':
          this.spaces += token[1];
          break

        case ';':
          this.freeSemicolon(token);
          break

        case '}':
          this.end(token);
          break

        case 'comment':
          this.comment(token);
          break

        case 'at-word':
          this.atrule(token);
          break

        case '{':
          this.emptyRule(token);
          break

        default:
          this.other(token);
          break
      }
    }
    this.endFile();
  }

  comment(token) {
    let node = new Comment$2();
    this.init(node, token[2]);
    node.source.end = this.getPosition(token[3] || token[2]);

    let text = token[1].slice(2, -2);
    if (/^\s*$/.test(text)) {
      node.text = '';
      node.raws.left = text;
      node.raws.right = '';
    } else {
      let match = text.match(/^(\s*)([^]*\S)(\s*)$/);
      node.text = match[2];
      node.raws.left = match[1];
      node.raws.right = match[3];
    }
  }

  emptyRule(token) {
    let node = new Rule$2();
    this.init(node, token[2]);
    node.selector = '';
    node.raws.between = '';
    this.current = node;
  }

  other(start) {
    let end = false;
    let type = null;
    let colon = false;
    let bracket = null;
    let brackets = [];
    let customProperty = start[1].startsWith('--');

    let tokens = [];
    let token = start;
    while (token) {
      type = token[0];
      tokens.push(token);

      if (type === '(' || type === '[') {
        if (!bracket) bracket = token;
        brackets.push(type === '(' ? ')' : ']');
      } else if (customProperty && colon && type === '{') {
        if (!bracket) bracket = token;
        brackets.push('}');
      } else if (brackets.length === 0) {
        if (type === ';') {
          if (colon) {
            this.decl(tokens, customProperty);
            return
          } else {
            break
          }
        } else if (type === '{') {
          this.rule(tokens);
          return
        } else if (type === '}') {
          this.tokenizer.back(tokens.pop());
          end = true;
          break
        } else if (type === ':') {
          colon = true;
        }
      } else if (type === brackets[brackets.length - 1]) {
        brackets.pop();
        if (brackets.length === 0) bracket = null;
      }

      token = this.tokenizer.nextToken();
    }

    if (this.tokenizer.endOfFile()) end = true;
    if (brackets.length > 0) this.unclosedBracket(bracket);

    if (end && colon) {
      if (!customProperty) {
        while (tokens.length) {
          token = tokens[tokens.length - 1][0];
          if (token !== 'space' && token !== 'comment') break
          this.tokenizer.back(tokens.pop());
        }
      }
      this.decl(tokens, customProperty);
    } else {
      this.unknownWord(tokens);
    }
  }

  rule(tokens) {
    tokens.pop();

    let node = new Rule$2();
    this.init(node, tokens[0][2]);

    node.raws.between = this.spacesAndCommentsFromEnd(tokens);
    this.raw(node, 'selector', tokens);
    this.current = node;
  }

  decl(tokens, customProperty) {
    let node = new Declaration$2();
    this.init(node, tokens[0][2]);

    let last = tokens[tokens.length - 1];
    if (last[0] === ';') {
      this.semicolon = true;
      tokens.pop();
    }

    node.source.end = this.getPosition(
      last[3] || last[2] || findLastWithPosition(tokens)
    );

    while (tokens[0][0] !== 'word') {
      if (tokens.length === 1) this.unknownWord(tokens);
      node.raws.before += tokens.shift()[1];
    }
    node.source.start = this.getPosition(tokens[0][2]);

    node.prop = '';
    while (tokens.length) {
      let type = tokens[0][0];
      if (type === ':' || type === 'space' || type === 'comment') {
        break
      }
      node.prop += tokens.shift()[1];
    }

    node.raws.between = '';

    let token;
    while (tokens.length) {
      token = tokens.shift();

      if (token[0] === ':') {
        node.raws.between += token[1];
        break
      } else {
        if (token[0] === 'word' && /\w/.test(token[1])) {
          this.unknownWord([token]);
        }
        node.raws.between += token[1];
      }
    }

    if (node.prop[0] === '_' || node.prop[0] === '*') {
      node.raws.before += node.prop[0];
      node.prop = node.prop.slice(1);
    }

    let firstSpaces = [];
    let next;
    while (tokens.length) {
      next = tokens[0][0];
      if (next !== 'space' && next !== 'comment') break
      firstSpaces.push(tokens.shift());
    }

    this.precheckMissedSemicolon(tokens);

    for (let i = tokens.length - 1; i >= 0; i--) {
      token = tokens[i];
      if (token[1].toLowerCase() === '!important') {
        node.important = true;
        let string = this.stringFrom(tokens, i);
        string = this.spacesFromEnd(tokens) + string;
        if (string !== ' !important') node.raws.important = string;
        break
      } else if (token[1].toLowerCase() === 'important') {
        let cache = tokens.slice(0);
        let str = '';
        for (let j = i; j > 0; j--) {
          let type = cache[j][0];
          if (str.trim().indexOf('!') === 0 && type !== 'space') {
            break
          }
          str = cache.pop()[1] + str;
        }
        if (str.trim().indexOf('!') === 0) {
          node.important = true;
          node.raws.important = str;
          tokens = cache;
        }
      }

      if (token[0] !== 'space' && token[0] !== 'comment') {
        break
      }
    }

    let hasWord = tokens.some(i => i[0] !== 'space' && i[0] !== 'comment');

    if (hasWord) {
      node.raws.between += firstSpaces.map(i => i[1]).join('');
      firstSpaces = [];
    }
    this.raw(node, 'value', firstSpaces.concat(tokens), customProperty);

    if (node.value.includes(':') && !customProperty) {
      this.checkMissedSemicolon(tokens);
    }
  }

  atrule(token) {
    let node = new AtRule$2();
    node.name = token[1].slice(1);
    if (node.name === '') {
      this.unnamedAtrule(node, token);
    }
    this.init(node, token[2]);

    let type;
    let prev;
    let shift;
    let last = false;
    let open = false;
    let params = [];
    let brackets = [];

    while (!this.tokenizer.endOfFile()) {
      token = this.tokenizer.nextToken();
      type = token[0];

      if (type === '(' || type === '[') {
        brackets.push(type === '(' ? ')' : ']');
      } else if (type === '{' && brackets.length > 0) {
        brackets.push('}');
      } else if (type === brackets[brackets.length - 1]) {
        brackets.pop();
      }

      if (brackets.length === 0) {
        if (type === ';') {
          node.source.end = this.getPosition(token[2]);
          this.semicolon = true;
          break
        } else if (type === '{') {
          open = true;
          break
        } else if (type === '}') {
          if (params.length > 0) {
            shift = params.length - 1;
            prev = params[shift];
            while (prev && prev[0] === 'space') {
              prev = params[--shift];
            }
            if (prev) {
              node.source.end = this.getPosition(prev[3] || prev[2]);
            }
          }
          this.end(token);
          break
        } else {
          params.push(token);
        }
      } else {
        params.push(token);
      }

      if (this.tokenizer.endOfFile()) {
        last = true;
        break
      }
    }

    node.raws.between = this.spacesAndCommentsFromEnd(params);
    if (params.length) {
      node.raws.afterName = this.spacesAndCommentsFromStart(params);
      this.raw(node, 'params', params);
      if (last) {
        token = params[params.length - 1];
        node.source.end = this.getPosition(token[3] || token[2]);
        this.spaces = node.raws.between;
        node.raws.between = '';
      }
    } else {
      node.raws.afterName = '';
      node.params = '';
    }

    if (open) {
      node.nodes = [];
      this.current = node;
    }
  }

  end(token) {
    if (this.current.nodes && this.current.nodes.length) {
      this.current.raws.semicolon = this.semicolon;
    }
    this.semicolon = false;

    this.current.raws.after = (this.current.raws.after || '') + this.spaces;
    this.spaces = '';

    if (this.current.parent) {
      this.current.source.end = this.getPosition(token[2]);
      this.current = this.current.parent;
    } else {
      this.unexpectedClose(token);
    }
  }

  endFile() {
    if (this.current.parent) this.unclosedBlock();
    if (this.current.nodes && this.current.nodes.length) {
      this.current.raws.semicolon = this.semicolon;
    }
    this.current.raws.after = (this.current.raws.after || '') + this.spaces;
  }

  freeSemicolon(token) {
    this.spaces += token[1];
    if (this.current.nodes) {
      let prev = this.current.nodes[this.current.nodes.length - 1];
      if (prev && prev.type === 'rule' && !prev.raws.ownSemicolon) {
        prev.raws.ownSemicolon = this.spaces;
        this.spaces = '';
      }
    }
  }

  // Helpers

  getPosition(offset) {
    let pos = this.input.fromOffset(offset);
    return {
      offset,
      line: pos.line,
      column: pos.col
    }
  }

  init(node, offset) {
    this.current.push(node);
    node.source = {
      start: this.getPosition(offset),
      input: this.input
    };
    node.raws.before = this.spaces;
    this.spaces = '';
    if (node.type !== 'comment') this.semicolon = false;
  }

  raw(node, prop, tokens, customProperty) {
    let token, type;
    let length = tokens.length;
    let value = '';
    let clean = true;
    let next, prev;

    for (let i = 0; i < length; i += 1) {
      token = tokens[i];
      type = token[0];
      if (type === 'space' && i === length - 1 && !customProperty) {
        clean = false;
      } else if (type === 'comment') {
        prev = tokens[i - 1] ? tokens[i - 1][0] : 'empty';
        next = tokens[i + 1] ? tokens[i + 1][0] : 'empty';
        if (!SAFE_COMMENT_NEIGHBOR[prev] && !SAFE_COMMENT_NEIGHBOR[next]) {
          if (value.slice(-1) === ',') {
            clean = false;
          } else {
            value += token[1];
          }
        } else {
          clean = false;
        }
      } else {
        value += token[1];
      }
    }
    if (!clean) {
      let raw = tokens.reduce((all, i) => all + i[1], '');
      node.raws[prop] = { value, raw };
    }
    node[prop] = value;
  }

  spacesAndCommentsFromEnd(tokens) {
    let lastTokenType;
    let spaces = '';
    while (tokens.length) {
      lastTokenType = tokens[tokens.length - 1][0];
      if (lastTokenType !== 'space' && lastTokenType !== 'comment') break
      spaces = tokens.pop()[1] + spaces;
    }
    return spaces
  }

  spacesAndCommentsFromStart(tokens) {
    let next;
    let spaces = '';
    while (tokens.length) {
      next = tokens[0][0];
      if (next !== 'space' && next !== 'comment') break
      spaces += tokens.shift()[1];
    }
    return spaces
  }

  spacesFromEnd(tokens) {
    let lastTokenType;
    let spaces = '';
    while (tokens.length) {
      lastTokenType = tokens[tokens.length - 1][0];
      if (lastTokenType !== 'space') break
      spaces = tokens.pop()[1] + spaces;
    }
    return spaces
  }

  stringFrom(tokens, from) {
    let result = '';
    for (let i = from; i < tokens.length; i++) {
      result += tokens[i][1];
    }
    tokens.splice(from, tokens.length - from);
    return result
  }

  colon(tokens) {
    let brackets = 0;
    let token, type, prev;
    for (let [i, element] of tokens.entries()) {
      token = element;
      type = token[0];

      if (type === '(') {
        brackets += 1;
      }
      if (type === ')') {
        brackets -= 1;
      }
      if (brackets === 0 && type === ':') {
        if (!prev) {
          this.doubleColon(token);
        } else if (prev[0] === 'word' && prev[1] === 'progid') {
          continue
        } else {
          return i
        }
      }

      prev = token;
    }
    return false
  }

  // Errors

  unclosedBracket(bracket) {
    throw this.input.error(
      'Unclosed bracket',
      { offset: bracket[2] },
      { offset: bracket[2] + 1 }
    )
  }

  unknownWord(tokens) {
    throw this.input.error(
      'Unknown word',
      { offset: tokens[0][2] },
      { offset: tokens[0][2] + tokens[0][1].length }
    )
  }

  unexpectedClose(token) {
    throw this.input.error(
      'Unexpected }',
      { offset: token[2] },
      { offset: token[2] + 1 }
    )
  }

  unclosedBlock() {
    let pos = this.current.source.start;
    throw this.input.error('Unclosed block', pos.line, pos.column)
  }

  doubleColon(token) {
    throw this.input.error(
      'Double colon',
      { offset: token[2] },
      { offset: token[2] + token[1].length }
    )
  }

  unnamedAtrule(node, token) {
    throw this.input.error(
      'At-rule without name',
      { offset: token[2] },
      { offset: token[2] + token[1].length }
    )
  }

  precheckMissedSemicolon(/* tokens */) {
    // Hook for Safe Parser
  }

  checkMissedSemicolon(tokens) {
    let colon = this.colon(tokens);
    if (colon === false) return

    let founded = 0;
    let token;
    for (let j = colon - 1; j >= 0; j--) {
      token = tokens[j];
      if (token[0] !== 'space') {
        founded += 1;
        if (founded === 2) break
      }
    }
    // If the token is a word, e.g. `!important`, `red` or any other valid property's value.
    // Then we need to return the colon after that word token. [3] is the "end" colon of that word.
    // And because we need it after that one we do +1 to get the next one.
    throw this.input.error(
      'Missed semicolon',
      token[0] === 'word' ? token[3] + 1 : token[2]
    )
  }
};

var parser = Parser$1;

let Container$2 = container;
let Parser = parser;
let Input$4 = input;

function parse$4(css, opts) {
  let input = new Input$4(css, opts);
  let parser = new Parser(input);
  try {
    parser.parse();
  } catch (e) {
    throw e
  }

  return parser.root
}

var parse_1 = parse$4;
parse$4.default = parse$4;

Container$2.registerParse(parse$4);

let { isClean, my } = symbols;
let MapGenerator$1 = mapGenerator;
let stringify$2 = stringify_1;
let Container$1 = container;
let Document$2 = document$1;
let Result$2 = result;
let parse$3 = parse_1;
let Root$3 = root;

const TYPE_TO_CLASS_NAME = {
  document: 'Document',
  root: 'Root',
  atrule: 'AtRule',
  rule: 'Rule',
  decl: 'Declaration',
  comment: 'Comment'
};

const PLUGIN_PROPS = {
  postcssPlugin: true,
  prepare: true,
  Once: true,
  Document: true,
  Root: true,
  Declaration: true,
  Rule: true,
  AtRule: true,
  Comment: true,
  DeclarationExit: true,
  RuleExit: true,
  AtRuleExit: true,
  CommentExit: true,
  RootExit: true,
  DocumentExit: true,
  OnceExit: true
};

const NOT_VISITORS = {
  postcssPlugin: true,
  prepare: true,
  Once: true
};

const CHILDREN = 0;

function isPromise(obj) {
  return typeof obj === 'object' && typeof obj.then === 'function'
}

function getEvents(node) {
  let key = false;
  let type = TYPE_TO_CLASS_NAME[node.type];
  if (node.type === 'decl') {
    key = node.prop.toLowerCase();
  } else if (node.type === 'atrule') {
    key = node.name.toLowerCase();
  }

  if (key && node.append) {
    return [
      type,
      type + '-' + key,
      CHILDREN,
      type + 'Exit',
      type + 'Exit-' + key
    ]
  } else if (key) {
    return [type, type + '-' + key, type + 'Exit', type + 'Exit-' + key]
  } else if (node.append) {
    return [type, CHILDREN, type + 'Exit']
  } else {
    return [type, type + 'Exit']
  }
}

function toStack(node) {
  let events;
  if (node.type === 'document') {
    events = ['Document', CHILDREN, 'DocumentExit'];
  } else if (node.type === 'root') {
    events = ['Root', CHILDREN, 'RootExit'];
  } else {
    events = getEvents(node);
  }

  return {
    node,
    events,
    eventIndex: 0,
    visitors: [],
    visitorIndex: 0,
    iterator: 0
  }
}

function cleanMarks(node) {
  node[isClean] = false;
  if (node.nodes) node.nodes.forEach(i => cleanMarks(i));
  return node
}

let postcss$1 = {};

let LazyResult$2 = class LazyResult {
  constructor(processor, css, opts) {
    this.stringified = false;
    this.processed = false;

    let root;
    if (
      typeof css === 'object' &&
      css !== null &&
      (css.type === 'root' || css.type === 'document')
    ) {
      root = cleanMarks(css);
    } else if (css instanceof LazyResult || css instanceof Result$2) {
      root = cleanMarks(css.root);
      if (css.map) {
        if (typeof opts.map === 'undefined') opts.map = {};
        if (!opts.map.inline) opts.map.inline = false;
        opts.map.prev = css.map;
      }
    } else {
      let parser = parse$3;
      if (opts.syntax) parser = opts.syntax.parse;
      if (opts.parser) parser = opts.parser;
      if (parser.parse) parser = parser.parse;

      try {
        root = parser(css, opts);
      } catch (error) {
        this.processed = true;
        this.error = error;
      }

      if (root && !root[my]) {
        /* c8 ignore next 2 */
        Container$1.rebuild(root);
      }
    }

    this.result = new Result$2(processor, root, opts);
    this.helpers = { ...postcss$1, result: this.result, postcss: postcss$1 };
    this.plugins = this.processor.plugins.map(plugin => {
      if (typeof plugin === 'object' && plugin.prepare) {
        return { ...plugin, ...plugin.prepare(this.result) }
      } else {
        return plugin
      }
    });
  }

  get [Symbol.toStringTag]() {
    return 'LazyResult'
  }

  get processor() {
    return this.result.processor
  }

  get opts() {
    return this.result.opts
  }

  get css() {
    return this.stringify().css
  }

  get content() {
    return this.stringify().content
  }

  get map() {
    return this.stringify().map
  }

  get root() {
    return this.sync().root
  }

  get messages() {
    return this.sync().messages
  }

  warnings() {
    return this.sync().warnings()
  }

  toString() {
    return this.css
  }

  then(onFulfilled, onRejected) {
    return this.async().then(onFulfilled, onRejected)
  }

  catch(onRejected) {
    return this.async().catch(onRejected)
  }

  finally(onFinally) {
    return this.async().then(onFinally, onFinally)
  }

  async() {
    if (this.error) return Promise.reject(this.error)
    if (this.processed) return Promise.resolve(this.result)
    if (!this.processing) {
      this.processing = this.runAsync();
    }
    return this.processing
  }

  sync() {
    if (this.error) throw this.error
    if (this.processed) return this.result
    this.processed = true;

    if (this.processing) {
      throw this.getAsyncError()
    }

    for (let plugin of this.plugins) {
      let promise = this.runOnRoot(plugin);
      if (isPromise(promise)) {
        throw this.getAsyncError()
      }
    }

    this.prepareVisitors();
    if (this.hasListener) {
      let root = this.result.root;
      while (!root[isClean]) {
        root[isClean] = true;
        this.walkSync(root);
      }
      if (this.listeners.OnceExit) {
        if (root.type === 'document') {
          for (let subRoot of root.nodes) {
            this.visitSync(this.listeners.OnceExit, subRoot);
          }
        } else {
          this.visitSync(this.listeners.OnceExit, root);
        }
      }
    }

    return this.result
  }

  stringify() {
    if (this.error) throw this.error
    if (this.stringified) return this.result
    this.stringified = true;

    this.sync();

    let opts = this.result.opts;
    let str = stringify$2;
    if (opts.syntax) str = opts.syntax.stringify;
    if (opts.stringifier) str = opts.stringifier;
    if (str.stringify) str = str.stringify;

    let map = new MapGenerator$1(str, this.result.root, this.result.opts);
    let data = map.generate();
    this.result.css = data[0];
    this.result.map = data[1];

    return this.result
  }

  walkSync(node) {
    node[isClean] = true;
    let events = getEvents(node);
    for (let event of events) {
      if (event === CHILDREN) {
        if (node.nodes) {
          node.each(child => {
            if (!child[isClean]) this.walkSync(child);
          });
        }
      } else {
        let visitors = this.listeners[event];
        if (visitors) {
          if (this.visitSync(visitors, node.toProxy())) return
        }
      }
    }
  }

  visitSync(visitors, node) {
    for (let [plugin, visitor] of visitors) {
      this.result.lastPlugin = plugin;
      let promise;
      try {
        promise = visitor(node, this.helpers);
      } catch (e) {
        throw this.handleError(e, node.proxyOf)
      }
      if (node.type !== 'root' && node.type !== 'document' && !node.parent) {
        return true
      }
      if (isPromise(promise)) {
        throw this.getAsyncError()
      }
    }
  }

  runOnRoot(plugin) {
    this.result.lastPlugin = plugin;
    try {
      if (typeof plugin === 'object' && plugin.Once) {
        if (this.result.root.type === 'document') {
          let roots = this.result.root.nodes.map(root =>
            plugin.Once(root, this.helpers)
          );

          if (isPromise(roots[0])) {
            return Promise.all(roots)
          }

          return roots
        }

        return plugin.Once(this.result.root, this.helpers)
      } else if (typeof plugin === 'function') {
        return plugin(this.result.root, this.result)
      }
    } catch (error) {
      throw this.handleError(error)
    }
  }

  getAsyncError() {
    throw new Error('Use process(css).then(cb) to work with async plugins')
  }

  handleError(error, node) {
    let plugin = this.result.lastPlugin;
    try {
      if (node) node.addToError(error);
      this.error = error;
      if (error.name === 'CssSyntaxError' && !error.plugin) {
        error.plugin = plugin.postcssPlugin;
        error.setMessage();
      } else if (plugin.postcssVersion) {
        if ("production" !== 'production') ;
      }
    } catch (err) {
      /* c8 ignore next 3 */
      // eslint-disable-next-line no-console
      if (console && console.error) console.error(err);
    }
    return error
  }

  async runAsync() {
    this.plugin = 0;
    for (let i = 0; i < this.plugins.length; i++) {
      let plugin = this.plugins[i];
      let promise = this.runOnRoot(plugin);
      if (isPromise(promise)) {
        try {
          await promise;
        } catch (error) {
          throw this.handleError(error)
        }
      }
    }

    this.prepareVisitors();
    if (this.hasListener) {
      let root = this.result.root;
      while (!root[isClean]) {
        root[isClean] = true;
        let stack = [toStack(root)];
        while (stack.length > 0) {
          let promise = this.visitTick(stack);
          if (isPromise(promise)) {
            try {
              await promise;
            } catch (e) {
              let node = stack[stack.length - 1].node;
              throw this.handleError(e, node)
            }
          }
        }
      }

      if (this.listeners.OnceExit) {
        for (let [plugin, visitor] of this.listeners.OnceExit) {
          this.result.lastPlugin = plugin;
          try {
            if (root.type === 'document') {
              let roots = root.nodes.map(subRoot =>
                visitor(subRoot, this.helpers)
              );

              await Promise.all(roots);
            } else {
              await visitor(root, this.helpers);
            }
          } catch (e) {
            throw this.handleError(e)
          }
        }
      }
    }

    this.processed = true;
    return this.stringify()
  }

  prepareVisitors() {
    this.listeners = {};
    let add = (plugin, type, cb) => {
      if (!this.listeners[type]) this.listeners[type] = [];
      this.listeners[type].push([plugin, cb]);
    };
    for (let plugin of this.plugins) {
      if (typeof plugin === 'object') {
        for (let event in plugin) {
          if (!PLUGIN_PROPS[event] && /^[A-Z]/.test(event)) {
            throw new Error(
              `Unknown event ${event} in ${plugin.postcssPlugin}. ` +
                `Try to update PostCSS (${this.processor.version} now).`
            )
          }
          if (!NOT_VISITORS[event]) {
            if (typeof plugin[event] === 'object') {
              for (let filter in plugin[event]) {
                if (filter === '*') {
                  add(plugin, event, plugin[event][filter]);
                } else {
                  add(
                    plugin,
                    event + '-' + filter.toLowerCase(),
                    plugin[event][filter]
                  );
                }
              }
            } else if (typeof plugin[event] === 'function') {
              add(plugin, event, plugin[event]);
            }
          }
        }
      }
    }
    this.hasListener = Object.keys(this.listeners).length > 0;
  }

  visitTick(stack) {
    let visit = stack[stack.length - 1];
    let { node, visitors } = visit;

    if (node.type !== 'root' && node.type !== 'document' && !node.parent) {
      stack.pop();
      return
    }

    if (visitors.length > 0 && visit.visitorIndex < visitors.length) {
      let [plugin, visitor] = visitors[visit.visitorIndex];
      visit.visitorIndex += 1;
      if (visit.visitorIndex === visitors.length) {
        visit.visitors = [];
        visit.visitorIndex = 0;
      }
      this.result.lastPlugin = plugin;
      try {
        return visitor(node.toProxy(), this.helpers)
      } catch (e) {
        throw this.handleError(e, node)
      }
    }

    if (visit.iterator !== 0) {
      let iterator = visit.iterator;
      let child;
      while ((child = node.nodes[node.indexes[iterator]])) {
        node.indexes[iterator] += 1;
        if (!child[isClean]) {
          child[isClean] = true;
          stack.push(toStack(child));
          return
        }
      }
      visit.iterator = 0;
      delete node.indexes[iterator];
    }

    let events = visit.events;
    while (visit.eventIndex < events.length) {
      let event = events[visit.eventIndex];
      visit.eventIndex += 1;
      if (event === CHILDREN) {
        if (node.nodes && node.nodes.length) {
          node[isClean] = true;
          visit.iterator = node.getIterator();
        }
        return
      } else if (this.listeners[event]) {
        visit.visitors = this.listeners[event];
        return
      }
    }
    stack.pop();
  }
};

LazyResult$2.registerPostcss = dependant => {
  postcss$1 = dependant;
};

var lazyResult = LazyResult$2;
LazyResult$2.default = LazyResult$2;

Root$3.registerLazyResult(LazyResult$2);
Document$2.registerLazyResult(LazyResult$2);

let MapGenerator = mapGenerator;
let stringify$1 = stringify_1;
let parse$2 = parse_1;
const Result$1 = result;

let NoWorkResult$1 = class NoWorkResult {
  constructor(processor, css, opts) {
    css = css.toString();
    this.stringified = false;

    this._processor = processor;
    this._css = css;
    this._opts = opts;
    this._map = undefined;
    let root;

    let str = stringify$1;
    this.result = new Result$1(this._processor, root, this._opts);
    this.result.css = css;

    let self = this;
    Object.defineProperty(this.result, 'root', {
      get() {
        return self.root
      }
    });

    let map = new MapGenerator(str, root, this._opts, css);
    if (map.isMap()) {
      let [generatedCSS, generatedMap] = map.generate();
      if (generatedCSS) {
        this.result.css = generatedCSS;
      }
      if (generatedMap) {
        this.result.map = generatedMap;
      }
    }
  }

  get [Symbol.toStringTag]() {
    return 'NoWorkResult'
  }

  get processor() {
    return this.result.processor
  }

  get opts() {
    return this.result.opts
  }

  get css() {
    return this.result.css
  }

  get content() {
    return this.result.css
  }

  get map() {
    return this.result.map
  }

  get root() {
    if (this._root) {
      return this._root
    }

    let root;
    let parser = parse$2;

    try {
      root = parser(this._css, this._opts);
    } catch (error) {
      this.error = error;
    }

    if (this.error) {
      throw this.error
    } else {
      this._root = root;
      return root
    }
  }

  get messages() {
    return []
  }

  warnings() {
    return []
  }

  toString() {
    return this._css
  }

  then(onFulfilled, onRejected) {

    return this.async().then(onFulfilled, onRejected)
  }

  catch(onRejected) {
    return this.async().catch(onRejected)
  }

  finally(onFinally) {
    return this.async().then(onFinally, onFinally)
  }

  async() {
    if (this.error) return Promise.reject(this.error)
    return Promise.resolve(this.result)
  }

  sync() {
    if (this.error) throw this.error
    return this.result
  }
};

var noWorkResult = NoWorkResult$1;
NoWorkResult$1.default = NoWorkResult$1;

let NoWorkResult = noWorkResult;
let LazyResult$1 = lazyResult;
let Document$1 = document$1;
let Root$2 = root;

let Processor$1 = class Processor {
  constructor(plugins = []) {
    this.version = '8.4.16';
    this.plugins = this.normalize(plugins);
  }

  use(plugin) {
    this.plugins = this.plugins.concat(this.normalize([plugin]));
    return this
  }

  process(css, opts = {}) {
    if (
      this.plugins.length === 0 &&
      typeof opts.parser === 'undefined' &&
      typeof opts.stringifier === 'undefined' &&
      typeof opts.syntax === 'undefined'
    ) {
      return new NoWorkResult(this, css, opts)
    } else {
      return new LazyResult$1(this, css, opts)
    }
  }

  normalize(plugins) {
    let normalized = [];
    for (let i of plugins) {
      if (i.postcss === true) {
        i = i();
      } else if (i.postcss) {
        i = i.postcss;
      }

      if (typeof i === 'object' && Array.isArray(i.plugins)) {
        normalized = normalized.concat(i.plugins);
      } else if (typeof i === 'object' && i.postcssPlugin) {
        normalized.push(i);
      } else if (typeof i === 'function') {
        normalized.push(i);
      } else if (typeof i === 'object' && (i.parse || i.stringify)) ; else {
        throw new Error(i + ' is not a PostCSS plugin')
      }
    }
    return normalized
  }
};

var processor = Processor$1;
Processor$1.default = Processor$1;

Root$2.registerProcessor(Processor$1);
Document$1.registerProcessor(Processor$1);

let Declaration$1 = declaration;
let PreviousMap = previousMap;
let Comment$1 = comment;
let AtRule$1 = atRule;
let Input$3 = input;
let Root$1 = root;
let Rule$1 = rule;

function fromJSON$1(json, inputs) {
  if (Array.isArray(json)) return json.map(n => fromJSON$1(n))

  let { inputs: ownInputs, ...defaults } = json;
  if (ownInputs) {
    inputs = [];
    for (let input of ownInputs) {
      let inputHydrated = { ...input, __proto__: Input$3.prototype };
      if (inputHydrated.map) {
        inputHydrated.map = {
          ...inputHydrated.map,
          __proto__: PreviousMap.prototype
        };
      }
      inputs.push(inputHydrated);
    }
  }
  if (defaults.nodes) {
    defaults.nodes = json.nodes.map(n => fromJSON$1(n, inputs));
  }
  if (defaults.source) {
    let { inputId, ...source } = defaults.source;
    defaults.source = source;
    if (inputId != null) {
      defaults.source.input = inputs[inputId];
    }
  }
  if (defaults.type === 'root') {
    return new Root$1(defaults)
  } else if (defaults.type === 'decl') {
    return new Declaration$1(defaults)
  } else if (defaults.type === 'rule') {
    return new Rule$1(defaults)
  } else if (defaults.type === 'comment') {
    return new Comment$1(defaults)
  } else if (defaults.type === 'atrule') {
    return new AtRule$1(defaults)
  } else {
    throw new Error('Unknown node type: ' + json.type)
  }
}

var fromJSON_1 = fromJSON$1;
fromJSON$1.default = fromJSON$1;

let CssSyntaxError = cssSyntaxError;
let Declaration = declaration;
let LazyResult = lazyResult;
let Container = container;
let Processor = processor;
let stringify = stringify_1;
let fromJSON = fromJSON_1;
let Document = document$1;
let Warning = warning;
let Comment = comment;
let AtRule = atRule;
let Result = result;
let Input$2 = input;
let parse$1 = parse_1;
let list = list_1;
let Rule = rule;
let Root = root;
let Node = node;

function postcss(...plugins) {
  if (plugins.length === 1 && Array.isArray(plugins[0])) {
    plugins = plugins[0];
  }
  return new Processor(plugins)
}

postcss.plugin = function plugin(name, initializer) {
  let warningPrinted = false;
  function creator(...args) {
    // eslint-disable-next-line no-console
    if (console && console.warn && !warningPrinted) {
      warningPrinted = true;
      // eslint-disable-next-line no-console
      console.warn(
        name +
          ': postcss.plugin was deprecated. Migration guide:\n' +
          'https://evilmartians.com/chronicles/postcss-8-plugin-migration'
      );
      if ("cn".startsWith('cn')) {
        /* c8 ignore next 7 */
        // eslint-disable-next-line no-console
        console.warn(
          name +
            ': 里面 postcss.plugin 被弃用. 迁移指南:\n' +
            'https://www.w3ctech.com/topic/2226'
        );
      }
    }
    let transformer = initializer(...args);
    transformer.postcssPlugin = name;
    transformer.postcssVersion = new Processor().version;
    return transformer
  }

  let cache;
  Object.defineProperty(creator, 'postcss', {
    get() {
      if (!cache) cache = creator();
      return cache
    }
  });

  creator.process = function (css, processOpts, pluginOpts) {
    return postcss([creator(pluginOpts)]).process(css, processOpts)
  };

  return creator
};

postcss.stringify = stringify;
postcss.parse = parse$1;
postcss.fromJSON = fromJSON;
postcss.list = list;

postcss.comment = defaults => new Comment(defaults);
postcss.atRule = defaults => new AtRule(defaults);
postcss.decl = defaults => new Declaration(defaults);
postcss.rule = defaults => new Rule(defaults);
postcss.root = defaults => new Root(defaults);
postcss.document = defaults => new Document(defaults);

postcss.CssSyntaxError = CssSyntaxError;
postcss.Declaration = Declaration;
postcss.Container = Container;
postcss.Processor = Processor;
postcss.Document = Document;
postcss.Comment = Comment;
postcss.Warning = Warning;
postcss.AtRule = AtRule;
postcss.Result = Result;
postcss.Input = Input$2;
postcss.Rule = Rule;
postcss.Root = Root;
postcss.Node = Node;

LazyResult.registerPostcss(postcss);

var postcss_1 = postcss;
postcss.default = postcss;

postcss_1.stringify;
postcss_1.fromJSON;
postcss_1.plugin;
postcss_1.parse;
postcss_1.list;

postcss_1.document;
postcss_1.comment;
postcss_1.atRule;
postcss_1.rule;
postcss_1.decl;
postcss_1.root;

postcss_1.CssSyntaxError;
postcss_1.Declaration;
postcss_1.Container;
postcss_1.Processor;
postcss_1.Document;
postcss_1.Comment;
postcss_1.Warning;
postcss_1.AtRule;
postcss_1.Result;
postcss_1.Input;
postcss_1.Rule;
postcss_1.Root;
postcss_1.Node;

var pixelUnitRegexp = {};

Object.defineProperty(pixelUnitRegexp, "__esModule", { value: true });
function getUnitRegexp(unit) {
    return new RegExp('"[^"]+"|\'[^\']+\'|url\\([^\\)]+\\)|(\\d*\\.?\\d+)' + unit, 'g');
}
pixelUnitRegexp.default = getUnitRegexp;

var propListMatcher = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.createPropListMatcher = exports.filterPropList = void 0;
	exports.filterPropList = {
	    exact: function (list) {
	        return list.filter(function (m) {
	            return m.match(/^[^\*\!]+$/);
	        });
	    },
	    contain: function (list) {
	        return list
	            .filter(function (m) {
	            return m.match(/^\*.+\*$/);
	        })
	            .map(function (m) {
	            return m.substr(1, m.length - 2);
	        });
	    },
	    endWith: function (list) {
	        return list
	            .filter(function (m) {
	            return m.match(/^\*[^\*]+$/);
	        })
	            .map(function (m) {
	            return m.substr(1);
	        });
	    },
	    startWith: function (list) {
	        return list
	            .filter(function (m) {
	            return m.match(/^[^\*\!]+\*$/);
	        })
	            .map(function (m) {
	            return m.substr(0, m.length - 1);
	        });
	    },
	    notExact: function (list) {
	        return list
	            .filter(function (m) {
	            return m.match(/^\![^\*].*$/);
	        })
	            .map(function (m) {
	            return m.substr(1);
	        });
	    },
	    notContain: function (list) {
	        return list
	            .filter(function (m) {
	            return m.match(/^\!\*.+\*$/);
	        })
	            .map(function (m) {
	            return m.substr(2, m.length - 3);
	        });
	    },
	    notEndWith: function (list) {
	        return list
	            .filter(function (m) {
	            return m.match(/^\!\*[^\*]+$/);
	        })
	            .map(function (m) {
	            return m.substr(2);
	        });
	    },
	    notStartWith: function (list) {
	        return list
	            .filter(function (m) {
	            return m.match(/^\![^\*]+\*$/);
	        })
	            .map(function (m) {
	            return m.substr(1, m.length - 2);
	        });
	    }
	};
	const matcherMap = new Map();
	function _createPropListMatcher(propList) {
	    var hasWild = propList.indexOf('*') > -1;
	    var matchAll = hasWild && propList.length === 1;
	    var lists = {
	        exact: exports.filterPropList.exact(propList),
	        contain: exports.filterPropList.contain(propList),
	        startWith: exports.filterPropList.startWith(propList),
	        endWith: exports.filterPropList.endWith(propList),
	        notExact: exports.filterPropList.notExact(propList),
	        notContain: exports.filterPropList.notContain(propList),
	        notStartWith: exports.filterPropList.notStartWith(propList),
	        notEndWith: exports.filterPropList.notEndWith(propList)
	    };
	    return function (prop) {
	        if (matchAll)
	            return true;
	        return ((hasWild ||
	            lists.exact.indexOf(prop) > -1 ||
	            lists.contain.some(function (m) {
	                return prop.indexOf(m) > -1;
	            }) ||
	            lists.startWith.some(function (m) {
	                return prop.indexOf(m) === 0;
	            }) ||
	            lists.endWith.some(function (m) {
	                return prop.indexOf(m) === prop.length - m.length;
	            })) &&
	            !(lists.notExact.indexOf(prop) > -1 ||
	                lists.notContain.some(function (m) {
	                    return prop.indexOf(m) > -1;
	                }) ||
	                lists.notStartWith.some(function (m) {
	                    return prop.indexOf(m) === 0;
	                }) ||
	                lists.notEndWith.some(function (m) {
	                    return prop.indexOf(m) === prop.length - m.length;
	                })));
	    };
	}
	function createPropListMatcher(propList) {
	    const key = propList.join(',');
	    if (!matcherMap.has(key))
	        matcherMap.set(key, _createPropListMatcher(propList));
	    return matcherMap.get(key);
	}
	exports.createPropListMatcher = createPropListMatcher;
	
} (propListMatcher));

var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const pixel_unit_regexp_1 = __importDefault(pixelUnitRegexp);
const prop_list_matcher_1 = propListMatcher;
const getDefault = () => ({
    unitToConvert: 'px',
    viewportWidth: 320,
    viewportHeight: 568,
    unitPrecision: 5,
    viewportUnit: 'vw',
    fontViewportUnit: 'vw',
    selectorBlackList: [],
    propList: ['*'],
    minPixelValue: 1,
    mediaQuery: false,
    replace: true,
    landscape: false,
    landscapeUnit: 'vw',
    exclude: [],
    landscapeWidth: 568
});
const postcssPlugin = 'postcss-px2vp';
const IGNORE_NEXT_COMMENT = 'px-to-viewport-ignore-next';
const IGNORE_PREV_COMMENT = 'px-to-viewport-ignore';
const isExclude = (exclude, file) => {
    if (!file)
        return false;
    if (Array.isArray(exclude))
        return exclude.some(reg => reg.test(file));
    return exclude.test(file);
};
function getOption(option, rule) {
    return typeof option === 'function' ? option(rule) : option;
}
function toFixed(number, precision) {
    var multiplier = Math.pow(10, precision + 1), wholeNumber = Math.floor(number * multiplier);
    return (Math.round(wholeNumber / 10) * 10) / multiplier;
}
function createPxReplace(opts, viewportUnit, viewportSize) {
    return function (m, $1) {
        if (!$1)
            return m;
        var pixels = parseFloat($1);
        if (pixels <= opts.minPixelValue)
            return m;
        var parsedVal = toFixed((pixels / viewportSize) * 100, opts.unitPrecision);
        return parsedVal === 0 ? '0' : `${parsedVal}${viewportUnit}`;
    };
}
function validateParams(params, mediaQuery) {
    return !params || (params && mediaQuery);
}
function getUnit(prop, opts) {
    return !prop.includes('font') ? opts.viewportUnit : opts.fontViewportUnit;
}
function declarationExists(decls, prop, value) {
    if (!decls)
        return false;
    return decls.some(function (decl) {
        return decl.prop === prop && decl.value === value;
    });
}
function optionCreator({ options, rule, defaultOptions }) {
    if (!options)
        return defaultOptions;
    return Object.assign(Object.assign({}, defaultOptions), Object.entries(options).reduce((prev, [key, value]) => {
        prev[key] = getOption(value, rule);
        return prev;
    }, {}));
}
const blacklistedSelector = (blacklist, selector) => blacklist.some(rule => {
    if (typeof rule === 'string')
        return selector.includes(rule);
    return rule.test(selector);
});
const px2vp = options => {
    const landscapeRules = [];
    const defaultOptions = getDefault();
    return {
        postcssPlugin,
        Once(root, { atRule, result }) {
            root.walkRules(rule => {
                var _a, _b;
                const file = (_a = rule.source) === null || _a === void 0 ? void 0 : _a.input.file;
                const { exclude, selectorBlackList, propList, landscape, unitToConvert, minPixelValue, unitPrecision, landscapeUnit, landscapeWidth, fontViewportUnit, viewportUnit, mediaQuery, viewportWidth, replace } = optionCreator({ options, rule, defaultOptions });
                // init options
                const pxRegex = pixel_unit_regexp_1.default(unitToConvert);
                const satisfyPropList = prop_list_matcher_1.createPropListMatcher(propList);
                const params = (_b = rule.parent) === null || _b === void 0 ? void 0 : _b.params;
                if (isExclude(exclude, file) ||
                    blacklistedSelector(selectorBlackList, rule.selector))
                    return;
                if (landscape && !params) {
                    const landscapeRule = rule.clone().removeAll();
                    rule.walkDecls(decl => {
                        const { value, prop } = decl;
                        if (!value.includes(unitToConvert) || !satisfyPropList(prop))
                            return;
                        landscapeRule.append(decl.clone({
                            value: value.replace(pxRegex, createPxReplace({ minPixelValue, unitPrecision }, landscapeUnit, landscapeWidth))
                        }));
                        if (landscapeRule.nodes.length > 0) {
                            landscapeRules.push(landscapeRule);
                        }
                    });
                }
                if (!validateParams(params, mediaQuery))
                    return;
                rule.walkDecls((decl, i) => {
                    var _a, _b;
                    let { value, prop } = decl;
                    if (!value.includes(unitToConvert) || !satisfyPropList(prop))
                        return;
                    const prev = decl.prev();
                    if ((prev === null || prev === void 0 ? void 0 : prev.type) === 'comment' && prev.text === IGNORE_NEXT_COMMENT) {
                        prev.remove();
                        return;
                    }
                    const next = decl.next();
                    if ((next === null || next === void 0 ? void 0 : next.type) === 'comment' && next.text === IGNORE_PREV_COMMENT) {
                        if (/\n/.test((_a = next.raws.before) !== null && _a !== void 0 ? _a : '')) {
                            result.warn('Unexpected comment /* ' +
                                IGNORE_PREV_COMMENT +
                                ' */ must be after declaration at same line.', { node: next });
                        }
                        else {
                            // remove comment
                            next.remove();
                            return;
                        }
                    }
                    const [unit, size] = landscape && (params === null || params === void 0 ? void 0 : params.includes('landscape'))
                        ? [landscapeUnit, landscapeWidth]
                        : [
                            getUnit(prop, { viewportUnit, fontViewportUnit }),
                            viewportWidth
                        ];
                    value = value.replace(pxRegex, createPxReplace({ minPixelValue, unitPrecision }, unit, size));
                    if (declarationExists(decl.parent, prop, value))
                        return;
                    if (replace)
                        decl.value = value;
                    else
                        (_b = decl.parent) === null || _b === void 0 ? void 0 : _b.insertAfter(i, decl.clone({ value: value }));
                });
            });
            if (landscapeRules.length) {
                const landscapeRoot = atRule({
                    params: '(orientation: landscape)',
                    name: 'media'
                });
                landscapeRules.forEach(rule => {
                    landscapeRoot.append(rule);
                });
                root.append(landscapeRoot);
            }
        }
    };
};
px2vp.postcss = true;
var dist = px2vp;

/** @param {import('../index.js').Options} options */
function CommentRemover$1(options) {
  this.options = options;
}
/**
 * @param {string} comment
 * @return {boolean | undefined}
 */
CommentRemover$1.prototype.canRemove = function (comment) {
  const remove = this.options.remove;

  if (remove) {
    return remove(comment);
  } else {
    const isImportant = comment.indexOf('!') === 0;

    if (!isImportant) {
      return true;
    }

    if (this.options.removeAll || this._hasFirst) {
      return true;
    } else if (this.options.removeAllButFirst && !this._hasFirst) {
      this._hasFirst = true;
      return false;
    }
  }
};

var commentRemover = CommentRemover$1;

/**
 * @param {string} input
 * @return {[number, number, number][]}
 */
var commentParser$1 = function commentParser(input) {
  /** @type [number, number, number][] */
  const tokens = [];
  const length = input.length;
  let pos = 0;
  let next;

  while (pos < length) {
    next = input.indexOf('/*', pos);

    if (~next) {
      tokens.push([0, pos, next]);
      pos = next;

      next = input.indexOf('*/', pos + 2);
      tokens.push([1, pos + 2, next]);
      pos = next + 2;
    } else {
      tokens.push([0, pos, length]);
      pos = length;
    }
  }

  return tokens;
};

const CommentRemover = commentRemover;
const commentParser = commentParser$1;

/** @typedef {object} Options
 *  @property {boolean=} removeAll
 *  @property {boolean=} removeAllButFirst
 *  @property {(s: string) => boolean=} remove
 */
/**
 * @type {import('postcss').PluginCreator<Options>}
 * @param {Options} opts
 * @return {import('postcss').Plugin}
 */
function pluginCreator(opts = {}) {
  const remover = new CommentRemover(opts);
  const matcherCache = new Map();
  const replacerCache = new Map();

  /**
   * @param {string} source
   * @return {[number, number, number][]}
   */
  function matchesComments(source) {
    if (matcherCache.has(source)) {
      return matcherCache.get(source);
    }

    const result = commentParser(source).filter(([type]) => type);

    matcherCache.set(source, result);

    return result;
  }

  /**
   * @param {string} source
   * @param {(s: string) => string[]} space
   * @return {string}
   */
  function replaceComments(source, space, separator = ' ') {
    const key = source + '@|@' + separator;

    if (replacerCache.has(key)) {
      return replacerCache.get(key);
    }
    const parsed = commentParser(source).reduce((value, [type, start, end]) => {
      const contents = source.slice(start, end);

      if (!type) {
        return value + contents;
      }

      if (remover.canRemove(contents)) {
        return value + separator;
      }

      return `${value}/*${contents}*/`;
    }, '');

    const result = space(parsed).join(' ');

    replacerCache.set(key, result);

    return result;
  }

  return {
    postcssPlugin: 'postcss-discard-comments',

    OnceExit(css, { list }) {
      css.walk((node) => {
        if (node.type === 'comment' && remover.canRemove(node.text)) {
          node.remove();

          return;
        }

        if (typeof node.raws.between === 'string') {
          node.raws.between = replaceComments(node.raws.between, list.space);
        }

        if (node.type === 'decl') {
          if (node.raws.value && node.raws.value.raw) {
            if (node.raws.value.value === node.value) {
              node.value = replaceComments(node.raws.value.raw, list.space);
            } else {
              node.value = replaceComments(node.value, list.space);
            }

            /** @type {null | {value: string, raw: string}} */ (
              node.raws.value
            ) = null;
          }

          if (node.raws.important) {
            node.raws.important = replaceComments(
              node.raws.important,
              list.space
            );

            const b = matchesComments(node.raws.important);

            node.raws.important = b.length ? node.raws.important : '!important';
          } else {
            node.value = replaceComments(node.value, list.space);
          }

          return;
        }

        if (
          node.type === 'rule' &&
          node.raws.selector &&
          node.raws.selector.raw
        ) {
          node.raws.selector.raw = replaceComments(
            node.raws.selector.raw,
            list.space,
            ''
          );

          return;
        }

        if (node.type === 'atrule') {
          if (node.raws.afterName) {
            const commentsReplaced = replaceComments(
              node.raws.afterName,
              list.space
            );

            if (!commentsReplaced.length) {
              node.raws.afterName = commentsReplaced + ' ';
            } else {
              node.raws.afterName = ' ' + commentsReplaced + ' ';
            }
          }

          if (node.raws.params && node.raws.params.raw) {
            node.raws.params.raw = replaceComments(
              node.raws.params.raw,
              list.space
            );
          }
        }
      });
    },
  };
}

pluginCreator.postcss = true;
var src = pluginCreator;

const subscriber_queue = [];
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */
function writable(value, start = noop) {
    let stop;
    const subscribers = new Set();
    function set(new_value) {
        if (safe_not_equal(value, new_value)) {
            value = new_value;
            if (stop) { // store is ready
                const run_queue = !subscriber_queue.length;
                for (const subscriber of subscribers) {
                    subscriber[1]();
                    subscriber_queue.push(subscriber, value);
                }
                if (run_queue) {
                    for (let i = 0; i < subscriber_queue.length; i += 2) {
                        subscriber_queue[i][0](subscriber_queue[i + 1]);
                    }
                    subscriber_queue.length = 0;
                }
            }
        }
    }
    function update(fn) {
        set(fn(value));
    }
    function subscribe(run, invalidate = noop) {
        const subscriber = [run, invalidate];
        subscribers.add(subscriber);
        if (subscribers.size === 1) {
            stop = start(set) || noop;
        }
        run(value);
        return () => {
            subscribers.delete(subscriber);
            if (subscribers.size === 0) {
                stop();
                stop = null;
            }
        };
    }
    return { set, update, subscribe };
}

const useSingleton = function (createInstance, { withKey = false, immediate = false } = {}) {
    const UNDEFINED_INSTANCE = {};
    let _instance = UNDEFINED_INSTANCE;
    let _key;
    function checkSameKey(key) {
        if (!withKey || key === undefined || key === _key) {
            return true;
        }
        else {
            return false;
        }
    }
    function getSingleton(key) {
        if (_instance === UNDEFINED_INSTANCE || !checkSameKey(key)) {
            _key = key;
            _instance = createInstance(_key);
        }
        return _instance;
    }
    immediate && getSingleton();
    return getSingleton;
};

const UseSingleton = useSingleton;

/* src/components/Toast/toast.svelte generated by Svelte v3.55.1 */

function add_css$5(target) {
	append_styles(target, "svelte-6z5ekl", ".lbb-toast.svelte-6z5ekl{position:fixed;top:50%;left:50%;transform:translate(-50%, -50%);border-radius:4px;background-color:rgba(0, 0, 0, 0.8);padding:12px 24px;max-width:200px;color:#eee;font-size:16px;z-index:9999999}.lbb-toast--hide.svelte-6z5ekl{z-index:-1;visibility:hidden}");
}

function create_fragment$n(ctx) {
	let div;
	let t;
	let div_class_value;

	return {
		c() {
			div = element("div");
			t = text(/*content*/ ctx[2]);
			attr(div, "class", div_class_value = "lbb-toast " + (/*visiable*/ ctx[1] ? '' : 'lbb-toast--hide') + " svelte-6z5ekl");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, t);
			/*div_binding*/ ctx[4](div);
		},
		p(ctx, [dirty]) {
			if (dirty & /*content*/ 4) set_data(t, /*content*/ ctx[2]);

			if (dirty & /*visiable*/ 2 && div_class_value !== (div_class_value = "lbb-toast " + (/*visiable*/ ctx[1] ? '' : 'lbb-toast--hide') + " svelte-6z5ekl")) {
				attr(div, "class", div_class_value);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			/*div_binding*/ ctx[4](null);
		}
	};
}

function instance$m($$self, $$props, $$invalidate) {
	let toast;
	let visiable = false;
	let closeTimer = null;
	let content;

	function show({ title, duration = 1500 }) {
		$$invalidate(2, content = title);

		if (closeTimer) {
			clearTimeout(closeTimer);
		}

		$$invalidate(1, visiable = true);

		closeTimer = setTimeout(
			() => {
				$$invalidate(1, visiable = false);
				closeTimer = null;
			},
			duration
		);
	}

	function div_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			toast = $$value;
			$$invalidate(0, toast);
		});
	}

	return [toast, visiable, content, show, div_binding];
}

class Toast extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$m, create_fragment$n, safe_not_equal, { show: 3 }, add_css$5);
	}

	get show() {
		return this.$$.ctx[3];
	}
}

const ToastInstance = UseSingleton(() => {
  const toastEl = new Toast({
    target: document.body,
    props: { content: '' }
  });

  return ({ title, duration = 1500 }) => {
    toastEl.show({
      title,
      duration
    });
  }
});
const toast = ToastInstance();

function loadConfig$1(url) {
  console.log('figma-css-better: load remote config', url);
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      url,
      method: 'get',
      onload(xhr) {
        if (+xhr.status !== 200) {
          toast({ title: '配置加载失败' });
          reject(new Error('配置加载失败'));
          return
        }
        resolve(JSON.parse(xhr.response));
      },
      onerror(e) {
        toast({ title: '配置加载失败' + e.message });
        reject(e);
      },
    });
  })
}

const INNER_CONFIG = {
  id: 'inner',
  name: '内置配置',
  url: '',
  options: {
    pxToViewport: {
      unitToConvert: 'px',
      viewportWidth: 50,
      viewportHeight: 1334,
      unitPrecision: 3,
      viewportUnit: 'rpx',
      fontViewportUnit: 'rpx',
      selectorBlackList: ['.ignore'],
      minPixelValue: 1,
      mediaQuery: false,
    },
    filter: [
      'width',
      'height',
      'border',
      'border-radius',
      'font-size: ?(?!normal).*',
      'font-weight: ?(?!normal).*',
      'word-spacing',
      'line-height',
      'color',
      'opacity',
      'background',
      'background-image',
      'box-shadow',
    ],
    replace: [],
  },
};

const INIT_CONFIG_OPTIONS = {
  pxToViewport: null,
  filter: [
    'width',
    'height',
    'border',
    'border-radius',
    'font-size: ?(?!normal).*',
    'font-weight: ?(?!normal).*',
    'word-spacing',
    'line-height',
    'color',
    'opacity',
    'background',
    'background-image',
    'box-shadow',
  ],
  replace: [],
};

const appStore = writable({
  usedConfigId: GM_getValue('USED_CONFIG_ID', 'inner'),
  currentConfigData: {},
});

async function loadNewConfig(id) {
  const configLocal = [INNER_CONFIG, ...GM_getValue('CONFIG_LIST', [])].find(
    (i) => i.id === id
  );

  if (configLocal.url) {
    configLocal.options = await loadConfig$1(configLocal.url);
  }
  updateCurrentConfigData(configLocal);
}

appStore.subscribe(async (store) => {
  GM_setValue('USED_CONFIG_ID', store.usedConfigId);
  if (store.currentConfigData.id !== store.usedConfigId) {
    loadNewConfig(store.usedConfigId);
  }
});

function updateCurrentConfigData(data) {
  appStore.update((store) => {
    store.currentConfigData = data;
    return store
  });
}

var colorName = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};

/**
 * @module color-parse
 */

/**
 * Base hues
 * http://dev.w3.org/csswg/css-color/#typedef-named-hue
 */
//FIXME: use external hue detector
var baseHues = {
	red: 0,
	orange: 60,
	yellow: 120,
	green: 180,
	blue: 240,
	purple: 300
};

/**
 * Parse color from the string passed
 *
 * @return {Object} A space indicator `space`, an array `values` and `alpha`
 */
function parse (cstr) {
	var m, parts = [], alpha = 1, space;

	if (typeof cstr === 'string') {
		//keyword
		if (colorName[cstr]) {
			parts = colorName[cstr].slice();
			space = 'rgb';
		}

		//reserved words
		else if (cstr === 'transparent') {
			alpha = 0;
			space = 'rgb';
			parts = [0,0,0];
		}

		//hex
		else if (/^#[A-Fa-f0-9]+$/.test(cstr)) {
			var base = cstr.slice(1);
			var size = base.length;
			var isShort = size <= 4;
			alpha = 1;

			if (isShort) {
				parts = [
					parseInt(base[0] + base[0], 16),
					parseInt(base[1] + base[1], 16),
					parseInt(base[2] + base[2], 16)
				];
				if (size === 4) {
					alpha = parseInt(base[3] + base[3], 16) / 255;
				}
			}
			else {
				parts = [
					parseInt(base[0] + base[1], 16),
					parseInt(base[2] + base[3], 16),
					parseInt(base[4] + base[5], 16)
				];
				if (size === 8) {
					alpha = parseInt(base[6] + base[7], 16) / 255;
				}
			}

			if (!parts[0]) parts[0] = 0;
			if (!parts[1]) parts[1] = 0;
			if (!parts[2]) parts[2] = 0;

			space = 'rgb';
		}

		//color space
		else if (m = /^((?:rgb|hs[lvb]|hwb|cmyk?|xy[zy]|gray|lab|lchu?v?|[ly]uv|lms)a?)\s*\(([^\)]*)\)/.exec(cstr)) {
			var name = m[1];
			var isRGB = name === 'rgb';
			var base = name.replace(/a$/, '');
			space = base;
			var size = base === 'cmyk' ? 4 : base === 'gray' ? 1 : 3;
			parts = m[2].trim()
				.split(/\s*[,\/]\s*|\s+/)
				.map(function (x, i) {
					//<percentage>
					if (/%$/.test(x)) {
						//alpha
						if (i === size)	return parseFloat(x) / 100
						//rgb
						if (base === 'rgb') return parseFloat(x) * 255 / 100
						return parseFloat(x)
					}
					//hue
					else if (base[i] === 'h') {
						//<deg>
						if (/deg$/.test(x)) {
							return parseFloat(x)
						}
						//<base-hue>
						else if (baseHues[x] !== undefined) {
							return baseHues[x]
						}
					}
					return parseFloat(x)
				});

			if (name === base) parts.push(1);
			alpha = (isRGB) ? 1 : (parts[size] === undefined) ? 1 : parts[size];
			parts = parts.slice(0, size);
		}

		//named channels case
		else if (cstr.length > 10 && /[0-9](?:\s|\/)/.test(cstr)) {
			parts = cstr.match(/([0-9]+)/g).map(function (value) {
				return parseFloat(value)
			});

			space = cstr.match(/([a-z])/ig).join('').toLowerCase();
		}
	}

	//numeric case
	else if (!isNaN(cstr)) {
		space = 'rgb';
		parts = [cstr >>> 16, (cstr & 0x00ff00) >>> 8, cstr & 0x0000ff];
	}

	//array-like
	else if (Array.isArray(cstr) || cstr.length) {
		parts = [cstr[0], cstr[1], cstr[2]];
		space = 'rgb';
		alpha = cstr.length === 4 ? cstr[3] : 1;
	}

	//object case - detects css cases of rgb and hsl
	else if (cstr instanceof Object) {
		if (cstr.r != null || cstr.red != null || cstr.R != null) {
			space = 'rgb';
			parts = [
				cstr.r || cstr.red || cstr.R || 0,
				cstr.g || cstr.green || cstr.G || 0,
				cstr.b || cstr.blue || cstr.B || 0
			];
		}
		else {
			space = 'hsl';
			parts = [
				cstr.h || cstr.hue || cstr.H || 0,
				cstr.s || cstr.saturation || cstr.S || 0,
				cstr.l || cstr.lightness || cstr.L || cstr.b || cstr.brightness
			];
		}

		alpha = cstr.a || cstr.alpha || cstr.opacity || 1;

		if (cstr.opacity != null) alpha /= 100;
	}

	return {
		space: space,
		values: parts,
		alpha: alpha
	}
}

/**
 * RGB space.
 *
 * @module  color-space/rgb
 */

const rgb = {
	name: 'rgb',
	min: [0,0,0],
	max: [255,255,255],
	channel: ['red', 'green', 'blue'],
	alias: ['RGB']
};

/**
 * @module color-space/hsl
 */

const hsl = {
	name: 'hsl',
	min: [0,0,0],
	max: [360,100,100],
	channel: ['hue', 'saturation', 'lightness'],
	alias: ['HSL'],

	rgb: function(hsl) {
		var h = hsl[0] / 360,
				s = hsl[1] / 100,
				l = hsl[2] / 100,
				t1, t2, t3, rgb, val;

		if (s === 0) {
			val = l * 255;
			return [val, val, val];
		}

		if (l < 0.5) {
			t2 = l * (1 + s);
		}
		else {
			t2 = l + s - l * s;
		}
		t1 = 2 * l - t2;

		rgb = [0, 0, 0];
		for (var i = 0; i < 3; i++) {
			t3 = h + 1 / 3 * - (i - 1);
			if (t3 < 0) {
				t3++;
			}
			else if (t3 > 1) {
				t3--;
			}

			if (6 * t3 < 1) {
				val = t1 + (t2 - t1) * 6 * t3;
			}
			else if (2 * t3 < 1) {
				val = t2;
			}
			else if (3 * t3 < 2) {
				val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
			}
			else {
				val = t1;
			}

			rgb[i] = val * 255;
		}

		return rgb;
	}
};


//extend rgb
rgb.hsl = function(rgb) {
	var r = rgb[0]/255,
			g = rgb[1]/255,
			b = rgb[2]/255,
			min = Math.min(r, g, b),
			max = Math.max(r, g, b),
			delta = max - min,
			h, s, l;

	if (max === min) {
		h = 0;
	}
	else if (r === max) {
		h = (g - b) / delta;
	}
	else if (g === max) {
		h = 2 + (b - r) / delta;
	}
	else if (b === max) {
		h = 4 + (r - g)/ delta;
	}

	h = Math.min(h * 60, 360);

	if (h < 0) {
		h += 360;
	}

	l = (min + max) / 2;

	if (max === min) {
		s = 0;
	}
	else if (l <= 0.5) {
		s = delta / (max + min);
	}
	else {
		s = delta / (2 - max - min);
	}

	return [h, s * 100, l * 100];
};

/** @module  color-rgba */

function rgba$1 (color) {
	// template literals
	if (Array.isArray(color) && color.raw) color = String.raw(...arguments);

	var values;

	//attempt to parse non-array arguments
	var parsed = parse(color);

	if (!parsed.space) return []

	const min = parsed.space[0] === 'h' ? hsl.min : rgb.min;
	const max = parsed.space[0] === 'h' ? hsl.max : rgb.max;

	values = Array(3);
	values[0] = Math.min(Math.max(parsed.values[0], min[0]), max[0]);
	values[1] = Math.min(Math.max(parsed.values[1], min[1]), max[1]);
	values[2] = Math.min(Math.max(parsed.values[2], min[2]), max[2]);

	if (parsed.space[0] === 'h') {
		values = hsl.rgb(values);
	}

	values.push(Math.min(Math.max(parsed.alpha, 0), 1));

	return values
}

function isSameRgbaArr(a, b) {
  return a.every((i, index) => i === b[index])
}

function replace(content, colors) {
  const res = content.match(/(rgba?)\(.*?\)|#[a-fA-f\d]{6}|#[a-fA-f\d]{3}/g);
  let modified = false;
  res?.forEach((i) => {
    const foundColor = colors.find((c) => isSameRgbaArr(rgba$1(c.color), rgba$1(i)));
    if (foundColor) {
      modified = true;
      content = content.replace(
        new RegExp(`${i}(?![a-fA-f\\d])`),
        foundColor.new
      );
    }
  });
  return {
    content,
    modified,
  }
}

async function getCSS(css) {
  const {
    currentConfigData: { options },
  } = get_store_value(appStore);
  const filters = options.filter || [];
  css = css
    .split('\n')
    .filter((raw) => {
      return (
        !!raw && filters.findIndex((rule) => new RegExp(rule).test(raw)) > -1
      )
    })
    .join('\n');

  const postcssPlugins = [];
  if (options.pxToViewport) {
    postcssPlugins.push(dist(options.pxToViewport));
  }
  postcssPlugins.push(src({}));
  const postcssRes = await postcss_1(postcssPlugins).process(`{${css}}`);

  css = postcssRes.css.replace(/(^\{)|(\}$)/g, '');

  const { colors, custom } = options.replace || [];

  if (colors) {
    const res = replace(css, colors);
    css = res.content;
  }

  if (custom) {
    custom.forEach((i) => {
      const regArr = [];
      Array.isArray(i.reg)
        ? i.reg.forEach((s) => regArr.push(new RegExp(s)))
        : regArr.push(new RegExp(i.reg));

      if (regArr.every((r) => r.test(css))) {
        regArr.forEach((reg) => {
          css = css.replace(reg, '');
        });
        css = css + i.new;
      }
    });
  }
  await navigator.clipboard.writeText(css.replace(/^\s*\n/gm, ''));
  toast({
    title: '复制成功',
  });
}

/* src/components/CopyButton.svelte generated by Svelte v3.55.1 */

function add_css$4(target) {
	append_styles(target, "svelte-16mfo7u", ".fcb-copy-button.svelte-16mfo7u{padding:4px 8px;border-radius:4px;background:#05bea9;outline:none;color:#fff;cursor:pointer;margin-bottom:10px;user-select:none}");
}

function create_fragment$m(ctx) {
	let button;
	let mounted;
	let dispose;

	return {
		c() {
			button = element("button");
			button.textContent = "🔥 复制样式";
			attr(button, "id", "fcb-copy-button");
			attr(button, "class", "fcb-copy-button svelte-16mfo7u");
		},
		m(target, anchor) {
			insert(target, button, anchor);

			if (!mounted) {
				dispose = listen(button, "click", /*copy*/ ctx[0]);
				mounted = true;
			}
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(button);
			mounted = false;
			dispose();
		}
	};
}

function instance$l($$self) {
	const copy = debounce(
		() => {
			const codeText = document.querySelector('[name=propertiesPanelContainer]')?.querySelector('p.hljs-comment')?.parentElement?.innerText;

			if (!codeText) {
				toast('从网页上获取css失败');
				return;
			}

			getCSS(codeText);
		},
		500
	);

	return [copy];
}

class CopyButton extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$l, create_fragment$m, safe_not_equal, {}, add_css$4);
	}
}

/* src/components/SettingButton.svelte generated by Svelte v3.55.1 */

function create_fragment$l(ctx) {
	let button;
	let mounted;
	let dispose;

	return {
		c() {
			button = element("button");
			button.textContent = "⚙设置";
		},
		m(target, anchor) {
			insert(target, button, anchor);

			if (!mounted) {
				dispose = listen(button, "click", goToSetting);
				mounted = true;
			}
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(button);
			mounted = false;
			dispose();
		}
	};
}

function goToSetting() {
	window.open('https://lbb00.github.io/figma-css-better/setting', 'target');
}

class SettingButton extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, null, create_fragment$l, safe_not_equal, {});
	}
}

/* node_modules/.pnpm/@svelteuidev+core@0.9.0_ypfjxaydaa2meuohvziy3hvz6y/node_modules/@svelteuidev/core/internal/errors/Error.svelte generated by Svelte v3.55.1 */

function create_if_block$8(ctx) {
	let html_tag;
	let raw_value = exception(/*component*/ ctx[1], /*code*/ ctx[2]) + "";
	let html_anchor;

	return {
		c() {
			html_tag = new HtmlTag(false);
			html_anchor = empty();
			html_tag.a = html_anchor;
		},
		m(target, anchor) {
			html_tag.m(raw_value, target, anchor);
			insert(target, html_anchor, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*component, code*/ 6 && raw_value !== (raw_value = exception(/*component*/ ctx[1], /*code*/ ctx[2]) + "")) html_tag.p(raw_value);
		},
		d(detaching) {
			if (detaching) detach(html_anchor);
			if (detaching) html_tag.d();
		}
	};
}

function create_fragment$k(ctx) {
	let if_block_anchor;
	let if_block = /*observable*/ ctx[0] && create_if_block$8(ctx);

	return {
		c() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
		},
		p(ctx, [dirty]) {
			if (/*observable*/ ctx[0]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block$8(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function instance$k($$self, $$props, $$invalidate) {
	let { observable = false } = $$props;
	let { component } = $$props;
	let { code } = $$props;

	$$self.$$set = $$props => {
		if ('observable' in $$props) $$invalidate(0, observable = $$props.observable);
		if ('component' in $$props) $$invalidate(1, component = $$props.component);
		if ('code' in $$props) $$invalidate(2, code = $$props.code);
	};

	return [observable, component, code];
}

let Error$1 = class Error extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$k, create_fragment$k, safe_not_equal, { observable: 0, component: 1, code: 2 });
	}
};

const Error$2 = Error$1;

const isBrowser = () => typeof window !== 'undefined';
/** Determines whether the app is running in the browser or on the server. */
const browser = isBrowser();

const minifiedCss = '.modal-header{padding: 2px 16px;background-color: #339af0;color: white;}.modal-body{padding: 2px 16px;}.modal-footer{padding: 2px 16px;background-color: #339af0;color: white;}.modal-content{position: relative;background-color: #fefefe;margin: auto;padding: 0;border: 1px solid #888;width: 80%;box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);animation-name: animateTop;animation-duration: 0.4s;}@keyframes animateTop {from {top: -300px; opacity: 0}to {top: 0; opacity: 1}}';

const style = browser ? document.createElement('style') : undefined;
if (browser) {
    const s = style;
    s.textContent = minifiedCss;
    s.id = 'svelteui-inject';
}
/**
 * The UserException function is used to help consumers of the library better navigate through potential errors.
 *
 *
 * It **does not** throw any errors because crashing the user's application is undesirable
 *
 * @param component the component the error is bound to
 * @param message the error message for the consumer
 * @param solution the potential solution for the consumer
 */
function UserException(component, message, solution) {
    if (browser)
        document.head.appendChild(style);
    const html = `
    <div class="modal-content">
        <div class="modal-header">
            <h2>[${component} Component Error]:</h2>
            <h3>${message}</h3>
        </div>
        <div class="modal-body">
            <pre>
                ${solution ? solution : ''}
            </pre>
        </div>
        <div class="modal-footer">
            <h3>Fix the code to dismiss this error.</h3>
        </div>
    </div>        
    `;
    return html;
}

function exception(component, code) {
    const { message, solution } = code;
    if (solution) {
        return UserException(component, message, solution);
    }
    return UserException(component, message);
}

/* eslint-disable @typescript-eslint/no-explicit-any */
// This file taken from rgossiaux/svelte-headlessui
// Copyright 2020-present Hunter Perrin
function useActions(node, actions) {
    const actionReturns = [];
    if (actions) {
        for (let i = 0; i < actions.length; i++) {
            const actionEntry = actions[i];
            const action = Array.isArray(actionEntry) ? actionEntry[0] : actionEntry;
            if (Array.isArray(actionEntry) && actionEntry.length > 1) {
                actionReturns.push(action(node, actionEntry[1]));
            }
            else {
                actionReturns.push(action(node));
            }
        }
    }
    return {
        update(actions) {
            if (((actions && actions.length) || 0) != actionReturns.length) {
                throw new Error('You must not change the length of an actions array.');
            }
            if (actions) {
                for (let i = 0; i < actions.length; i++) {
                    const returnEntry = actionReturns[i];
                    if (returnEntry && returnEntry.update) {
                        const actionEntry = actions[i];
                        if (Array.isArray(actionEntry) && actionEntry.length > 1) {
                            returnEntry.update(actionEntry[1]);
                        }
                        else {
                            returnEntry.update();
                        }
                    }
                }
            }
        },
        destroy() {
            for (let i = 0; i < actionReturns.length; i++) {
                const returnEntry = actionReturns[i];
                if (returnEntry && returnEntry.destroy) {
                    returnEntry.destroy();
                }
            }
        }
    };
}

/* eslint-disable @typescript-eslint/no-empty-function */
const MODIFIER_DIVIDER = '!';
const modifierRegex = new RegExp(`^[^${MODIFIER_DIVIDER}]+(?:${MODIFIER_DIVIDER}(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$`);
/** Function for forwarding DOM events to the component's declaration */
function createEventForwarder(component, except = []) {
    // This is our pseudo $on function. It is defined on component mount.
    let $on;
    // This is a list of events bound before mount.
    const events = [];
    // And we override the $on function to forward all bound events.
    component.$on = (fullEventType, callback) => {
        const eventType = fullEventType;
        let destructor = () => { };
        for (const exception of except) {
            if (typeof exception === 'string' && exception === eventType) {
                // Bail out of the event forwarding and run the normal Svelte $on() code
                const callbacks = component.$$.callbacks[eventType] || (component.$$.callbacks[eventType] = []);
                callbacks.push(callback);
                return () => {
                    const index = callbacks.indexOf(callback);
                    if (index !== -1)
                        callbacks.splice(index, 1);
                };
            }
            if (typeof exception === 'object' && exception['name'] === eventType) {
                const oldCallback = callback;
                callback = (...props) => {
                    if (!(typeof exception === 'object' && exception['shouldExclude']())) {
                        oldCallback(...props);
                    }
                };
            }
        }
        if ($on) {
            // The event was bound programmatically.
            destructor = $on(eventType, callback);
        }
        else {
            // The event was bound before mount by Svelte.
            events.push([eventType, callback]);
        }
        return () => {
            destructor();
        };
    };
    function forward(e) {
        // Internally bubble the event up from Svelte components.
        bubble(component, e);
    }
    return (node) => {
        const destructors = [];
        const forwardDestructors = {};
        // This function is responsible for listening and forwarding
        // all bound events.
        $on = (fullEventType, callback) => {
            let eventType = fullEventType;
            let handler = callback;
            // DOM addEventListener options argument.
            let options = false;
            const modifierMatch = eventType.match(modifierRegex);
            if (modifierMatch) {
                // Parse the event modifiers.
                // Supported modifiers:
                // - preventDefault
                // - stopPropagation
                // - passive
                // - nonpassive
                // - capture
                // - once
                const parts = eventType.split(MODIFIER_DIVIDER);
                eventType = parts[0];
                const eventOptions = Object.fromEntries(parts.slice(1).map((mod) => [mod, true]));
                if (eventOptions.passive) {
                    options = options || {};
                    options.passive = true;
                }
                if (eventOptions.nonpassive) {
                    options = options || {};
                    options.passive = false;
                }
                if (eventOptions.capture) {
                    options = options || {};
                    options.capture = true;
                }
                if (eventOptions.once) {
                    options = options || {};
                    options.once = true;
                }
                if (eventOptions.preventDefault) {
                    handler = prevent_default(handler);
                }
                if (eventOptions.stopPropagation) {
                    handler = stop_propagation(handler);
                }
            }
            // Listen for the event directly, with the given options.
            const off = listen(node, eventType, handler, options);
            const destructor = () => {
                off();
                const idx = destructors.indexOf(destructor);
                if (idx > -1) {
                    destructors.splice(idx, 1);
                }
            };
            destructors.push(destructor);
            // Forward the event from Svelte.
            if (!(eventType in forwardDestructors)) {
                forwardDestructors[eventType] = listen(node, eventType, forward);
            }
            return destructor;
        };
        for (let i = 0; i < events.length; i++) {
            // Listen to all the events added before mount.
            $on(events[i][0], events[i][1]);
        }
        return {
            destroy: () => {
                // Remove all event listeners.
                for (let i = 0; i < destructors.length; i++) {
                    destructors[i]();
                }
                // Remove all event forwarders.
                for (const entry of Object.entries(forwardDestructors)) {
                    entry[1]();
                }
            }
        };
    };
}

/** --------------------- */
const key = {};
function useSvelteUIThemeContext() {
    return getContext(key);
}

const colorScheme = writable('light');

/* eslint-disable @typescript-eslint/ban-ts-comment */
function useSvelteUITheme() {
    let observer;
    colorScheme?.subscribe((mode) => {
        observer = mode;
    });
    const DEFAULT_THEME = {
        // @ts-ignore
        ...theme,
        colorNames: colorNameMap,
        colorScheme: observer,
        dark: dark?.selector,
        fn: {
            themeColor: fns.themeColor,
            size: fns.size,
            radius: fns.radius,
            rgba: fns.rgba,
            variant: fns.variant
        }
    };
    return DEFAULT_THEME;
}

function themeColor(color, shade = 0) {
    const theme = useSvelteUIThemeContext()?.theme || useSvelteUITheme();
    let _shade = '50';
    if (!isSvelteUIColor(color))
        return color;
    if (shade !== Number(0))
        _shade = `${shade.toString()}00`;
    return theme.colors[`${color}${_shade}`]?.value;
}
function isSvelteUIColor(color) {
    let valid = false;
    switch (color) {
        case 'dark':
            valid = true;
            break;
        case 'gray':
            valid = true;
            break;
        case 'red':
            valid = true;
            break;
        case 'pink':
            valid = true;
            break;
        case 'grape':
            valid = true;
            break;
        case 'violet':
            valid = true;
            break;
        case 'indigo':
            valid = true;
            break;
        case 'blue':
            valid = true;
            break;
        case 'cyan':
            valid = true;
            break;
        case 'teal':
            valid = true;
            break;
        case 'green':
            valid = true;
            break;
        case 'lime':
            valid = true;
            break;
        case 'yellow':
            valid = true;
            break;
        case 'orange':
            valid = true;
            break;
        default:
            valid = false;
            break;
    }
    return valid;
}

function size(props) {
    if (typeof props.size === 'number') {
        return props.size;
    }
    if (typeof props.sizes[props.size] === 'number') {
        return props.sizes[props.size];
    }
    return +props.sizes[props.size]?.value || +props.sizes.md?.value;
}

function radius(radii) {
    const theme = useSvelteUIThemeContext()?.theme || useSvelteUITheme();
    if (typeof radii === 'number') {
        return radii;
    }
    return theme.radii[radii].value;
}

function isHexColor(hex) {
    const replaced = hex.replace('#', '');
    return (typeof replaced === 'string' && replaced.length === 6 && !Number.isNaN(Number(`0x${replaced}`)));
}
function hexToRgba(color) {
    const replaced = color.replace('#', '');
    const parsed = parseInt(replaced, 16);
    const r = (parsed >> 16) & 255;
    const g = (parsed >> 8) & 255;
    const b = parsed & 255;
    return {
        r,
        g,
        b,
        a: 1
    };
}
function rgbStringToRgba(color) {
    const [r, g, b, a] = color
        .replace(/[^0-9,.]/g, '')
        .split(',')
        .map(Number);
    return { r, g, b, a: a || 1 };
}
function toRgba(color) {
    if (isHexColor(color)) {
        return hexToRgba(color);
    }
    if (color.startsWith('rgb')) {
        return rgbStringToRgba(color);
    }
    return {
        r: 0,
        g: 0,
        b: 0,
        a: 1
    };
}

const vFunc = (color, gradient) => {
    const { themeColor, rgba } = fns;
    const variants = {
        /** Filled variant */
        filled: {
            [`${dark.selector} &`]: {
                backgroundColor: themeColor(color, 8)
            },
            border: 'transparent',
            backgroundColor: themeColor(color, 6),
            color: 'White',
            '&:hover': { backgroundColor: themeColor(color, 7) }
        },
        /** Light variant */
        light: {
            [`${dark.selector} &`]: {
                backgroundColor: rgba(themeColor(color, 8), 0.35),
                color: color === 'dark' ? themeColor('dark', 0) : themeColor(color, 2),
                '&:hover': { backgroundColor: rgba(themeColor(color, 7), 0.45) }
            },
            border: 'transparent',
            backgroundColor: themeColor(color, 0),
            color: color === 'dark' ? themeColor('dark', 9) : themeColor(color, 6),
            '&:hover': { backgroundColor: themeColor(color, 1) }
        },
        /** Outline variant */
        outline: {
            [`${dark.selector} &`]: {
                border: `1px solid ${themeColor(color, 4)}`,
                color: `${themeColor(color, 4)}`,
                '&:hover': { backgroundColor: rgba(themeColor(color, 4), 0.05) }
            },
            border: `1px solid ${themeColor(color, 7)}`,
            backgroundColor: 'transparent',
            color: themeColor(color, 7),
            '&:hover': {
                backgroundColor: rgba(themeColor(color, 0), 0.35)
            }
        },
        /** Subtle variant */
        subtle: {
            [`${dark.selector} &`]: {
                color: color === 'dark' ? themeColor('dark', 0) : themeColor(color, 2),
                '&:hover': { backgroundColor: rgba(themeColor(color, 8), 0.35) }
            },
            border: 'transparent',
            backgroundColor: 'transparent',
            color: color === 'dark' ? themeColor('dark', 9) : themeColor(color, 6),
            '&:hover': {
                backgroundColor: themeColor(color, 0)
            }
        },
        /** Default variant */
        default: {
            [`${dark.selector} &`]: {
                border: `1px solid ${themeColor('dark', 5)}`,
                backgroundColor: themeColor('dark', 5),
                color: 'White',
                '&:hover': { backgroundColor: themeColor('dark', 4) }
            },
            border: `1px solid ${themeColor('gray', 4)}`,
            backgroundColor: 'White',
            color: 'Black',
            '&:hover': { backgroundColor: themeColor('gray', 0) }
        },
        /** White variant */
        white: {
            border: 'transparent',
            backgroundColor: 'White',
            color: themeColor(color, 7),
            '&:hover': { backgroundColor: 'White' }
        },
        gradient: {}
    };
    if (gradient) {
        /** Gradient variant */
        variants.gradient = {
            border: 'transparent',
            background: `linear-gradient(${gradient.deg}deg, $${gradient.from}600 0%, $${gradient.to}600 100%)`,
            color: 'White'
        };
    }
    return variants;
};

function randomID(prefix = 'svelteui') {
    return `${prefix}-${Math.random().toString(36).substring(2, 10)}`;
}

function rgba(color, alpha = 1) {
    if (typeof color !== 'string' || alpha > 1 || alpha < 0) {
        return 'rgba(0, 0, 0, 1)';
    }
    const { r, g, b } = toRgba(color);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const DEFAULT_GRADIENT = {
    from: 'indigo',
    to: 'cyan',
    deg: 45
};
/**
 * THe Variant function is a function that takes a variant, optional color/gradient and returns the desired styles for four specific properties.
 *
 * Some styles will return tuples of strings where the first value is the dark version of the specific style, and the second value is the light version.
 *
 * @param VariantInput - an object that has a variant, color, and optional gradient property
 * @returns an object with border, background, color, and hover property styles based on the variant
 */
function variant({ variant, color, gradient }) {
    const theme = useSvelteUIThemeContext()?.theme || useSvelteUITheme();
    const primaryShade = 6;
    if (variant === 'light') {
        return {
            border: 'transparent',
            background: [rgba(themeColor(color, 8), 0.35), rgba(themeColor(color, 0), 1)],
            color: [
                color === 'dark' ? themeColor('dark', 0) : themeColor(color, 2),
                color === 'dark' ? themeColor('dark', 9) : themeColor(color, primaryShade)
            ],
            // themeColor(color, theme.colorScheme === 'dark' ? 2 : getPrimaryShade('light')),
            hover: [rgba(themeColor(color, 7), 0.45), rgba(themeColor(color, 1), 0.65)]
        };
    }
    if (variant === 'default') {
        return {
            border: [themeColor('dark', 5), themeColor('gray', 4)],
            background: [themeColor('dark', 5), theme.colors.white.value],
            color: [theme.colors.white.value, theme.colors.black.value],
            hover: [themeColor('dark', 4), themeColor('gray', 0)]
        };
    }
    if (variant === 'white') {
        return {
            border: 'transparent',
            background: theme.colors.white.value,
            color: themeColor(color, primaryShade),
            hover: null
        };
    }
    if (variant === 'outline') {
        return {
            border: [themeColor(color, 4), themeColor(color, primaryShade)],
            background: 'transparent',
            color: [themeColor(color, 4), themeColor(color, primaryShade)],
            hover: [rgba(themeColor(color, 4), 0.05), rgba(themeColor(color, 0), 0.35)]
        };
    }
    if (variant === 'gradient') {
        const merged = {
            from: gradient?.from || DEFAULT_GRADIENT.from,
            to: gradient?.to || DEFAULT_GRADIENT.to,
            deg: gradient?.deg || DEFAULT_GRADIENT.deg
        };
        return {
            background: `linear-gradient(${merged.deg}deg, ${themeColor(merged.from, primaryShade)} 0%, ${themeColor(merged.to, primaryShade)} 100%)`,
            color: theme.colors.white.value,
            border: 'transparent',
            hover: null
        };
    }
    if (variant === 'subtle') {
        return {
            border: 'transparent',
            background: 'transparent',
            color: [
                color === 'dark' ? themeColor('dark', 0) : themeColor(color, 2),
                color === 'dark' ? themeColor('dark', 9) : themeColor(color, primaryShade)
            ],
            hover: [rgba(themeColor(color, 8), 0.35), rgba(themeColor(color, 0), 1)]
        };
    }
    return {
        border: 'transparent',
        background: [themeColor(color, 8), themeColor(color, primaryShade)],
        color: theme.colors.white.value,
        hover: themeColor(color, 7)
    };
}

const fns = {
    size,
    radius,
    themeColor,
    variant,
    rgba
};

const colors = {
    primary: '#228be6',
    white: '#ffffff',
    black: '#000000',
    dark50: '#C1C2C5',
    dark100: '#A6A7AB',
    dark200: '#909296',
    dark300: '#5c5f66',
    dark400: '#373A40',
    dark500: '#2C2E33',
    dark600: '#25262b',
    dark700: '#1A1B1E',
    dark800: '#141517',
    dark900: '#101113',
    gray50: '#f8f9fa',
    gray100: '#f1f3f5',
    gray200: '#e9ecef',
    gray300: '#dee2e6',
    gray400: '#ced4da',
    gray500: '#adb5bd',
    gray600: '#868e96',
    gray700: '#495057',
    gray800: '#343a40',
    gray900: '#212529',
    red50: '#fff5f5',
    red100: '#ffe3e3',
    red200: '#ffc9c9',
    red300: '#ffa8a8',
    red400: '#ff8787',
    red500: '#ff6b6b',
    red600: '#fa5252',
    red700: '#f03e3e',
    red800: '#e03131',
    red900: '#c92a2a',
    pink50: '#fff0f6',
    pink100: '#ffdeeb',
    pink200: '#fcc2d7',
    pink300: '#faa2c1',
    pink400: '#f783ac',
    pink500: '#f06595',
    pink600: '#e64980',
    pink700: '#d6336c',
    pink800: '#c2255c',
    pink900: '#a61e4d',
    grape50: '#f8f0fc',
    grape100: '#f3d9fa',
    grape200: '#eebefa',
    grape300: '#e599f7',
    grape400: '#da77f2',
    grape500: '#cc5de8',
    grape600: '#be4bdb',
    grape700: '#ae3ec9',
    grape800: '#9c36b5',
    grape900: '#862e9c',
    violet50: '#f3f0ff',
    violet100: '#e5dbff',
    violet200: '#d0bfff',
    violet300: '#b197fc',
    violet400: '#9775fa',
    violet500: '#845ef7',
    violet600: '#7950f2',
    violet700: '#7048e8',
    violet800: '#6741d9',
    violet900: '#5f3dc4',
    indigo50: '#edf2ff',
    indigo100: '#dbe4ff',
    indigo200: '#bac8ff',
    indigo300: '#91a7ff',
    indigo400: '#748ffc',
    indigo500: '#5c7cfa',
    indigo600: '#4c6ef5',
    indigo700: '#4263eb',
    indigo800: '#3b5bdb',
    indigo900: '#364fc7',
    blue50: '#e7f5ff',
    blue100: '#d0ebff',
    blue200: '#a5d8ff',
    blue300: '#74c0fc',
    blue400: '#4dabf7',
    blue500: '#339af0',
    blue600: '#228be6',
    blue700: '#1c7ed6',
    blue800: '#1971c2',
    blue900: '#1864ab',
    cyan50: '#e3fafc',
    cyan100: '#c5f6fa',
    cyan200: '#99e9f2',
    cyan300: '#66d9e8',
    cyan400: '#3bc9db',
    cyan500: '#22b8cf',
    cyan600: '#15aabf',
    cyan700: '#1098ad',
    cyan800: '#0c8599',
    cyan900: '#0b7285',
    teal50: '#e6fcf5',
    teal100: '#c3fae8',
    teal200: '#96f2d7',
    teal300: '#63e6be',
    teal400: '#38d9a9',
    teal500: '#20c997',
    teal600: '#12b886',
    teal700: '#0ca678',
    teal800: '#099268',
    teal900: '#087f5b',
    green50: '#ebfbee',
    green100: '#d3f9d8',
    green200: '#b2f2bb',
    green300: '#8ce99a',
    green400: '#69db7c',
    green500: '#51cf66',
    green600: '#40c057',
    green700: '#37b24d',
    green800: '#2f9e44',
    green900: '#2b8a3e',
    lime50: '#f4fce3',
    lime100: '#e9fac8',
    lime200: '#d8f5a2',
    lime300: '#c0eb75',
    lime400: '#a9e34b',
    lime500: '#94d82d',
    lime600: '#82c91e',
    lime700: '#74b816',
    lime800: '#66a80f',
    lime900: '#5c940d',
    yellow50: '#fff9db',
    yellow100: '#fff3bf',
    yellow200: '#ffec99',
    yellow300: '#ffe066',
    yellow400: '#ffd43b',
    yellow500: '#fcc419',
    yellow600: '#fab005',
    yellow700: '#f59f00',
    yellow800: '#f08c00',
    yellow900: '#e67700',
    orange50: '#fff4e6',
    orange100: '#ffe8cc',
    orange200: '#ffd8a8',
    orange300: '#ffc078',
    orange400: '#ffa94d',
    orange500: '#ff922b',
    orange600: '#fd7e14',
    orange700: '#f76707',
    orange800: '#e8590c',
    orange900: '#d9480f'
};
const colorNameMap = {
    blue: 'blue',
    cyan: 'cyan',
    dark: 'dark',
    grape: 'grape',
    gray: 'gray',
    green: 'green',
    indigo: 'indigo',
    lime: 'lime',
    orange: 'orange',
    pink: 'pink',
    red: 'red',
    teal: 'teal',
    violet: 'violet',
    yellow: 'yellow'
};

const hasOwn = {}.hasOwnProperty;
function cx(...args) {
    const classes = [];
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (!arg)
            continue;
        const argType = typeof arg;
        if (argType === 'string' || argType === 'number') {
            classes.push(arg);
        }
        else if (Array.isArray(arg)) {
            if (arg.length) {
                const inner = { ...arg };
                if (inner) {
                    classes.push(inner);
                }
            }
        }
        else if (argType === 'object') {
            if (arg.toString === Object.prototype.toString) {
                for (const key in arg) {
                    if (hasOwn.call(arg, key) && arg[key]) {
                        classes.push(key);
                    }
                }
            }
            else {
                classes.push(arg.toString());
            }
        }
    }
    return classes.join(' ');
}
function cssFactory() {
    // This is a factory function to allow for scalability
    return { cx };
}

function fromEntries(entries) {
    const o = {};
    Object.keys(entries).forEach((key) => {
        const [k, v] = entries[key];
        o[k] = v;
    });
    return o;
}

/* eslint-disable @typescript-eslint/no-unused-vars */
const CLASS_KEY = 'svelteui';
function createRef(refName) {
    return `__svelteui-ref-${refName || ''}`;
}
/**
 * Sanitizes the provided CSS object, converting certain keywords to
 * respective CSS selectors, transforms keys into generated CSS classes
 * and returns the mapping between these generated classes and their initial
 * keys.
 *
 * @param object The CSS object that has not yet been sanitized.
 * @param theme The current theme object.
 * @param ref The ref object.
 * @returns The class map that maps the name of the key in the CSS object
 * and the generated hash class.
 */
function sanitizeCss(object, theme) {
    // builds this to map the generated class name to the class key
    // given in the CSS object
    const refs = [];
    const classMap = {};
    const _sanitize = (obj) => {
        Object.keys(obj).map((value) => {
            // transforms certain keywords into the correct CSS selectors
            if (value === 'variants')
                return;
            // saves the reference value so that later it can be added
            // to reference the CSS selector
            if (value === 'ref') {
                refs.push(obj.ref);
            }
            if (value === 'darkMode') {
                obj[`${theme.dark} &`] = obj.darkMode;
            }
            // returns the recursive call if the CSS is not an object
            if (obj[value] === null || typeof obj[value] !== 'object')
                return;
            // calls the sanitize method recursively so that it can sanitize
            // all the style objects
            _sanitize(obj[value]);
            // removes the darkMode style since it has been switched
            // to the correct CSS selector
            if (value === 'darkMode') {
                delete obj[value];
            }
            else if (value.startsWith('@media')) ;
            // only adds the correct selectors if it has none
            else if (!value.startsWith('&') && !value.startsWith(theme.dark)) {
                const getStyles = css(obj[value]);
                classMap[value] = getStyles().toString();
                obj[`& .${getStyles().toString()}`] = obj[value];
                delete obj[value];
            }
        });
    };
    _sanitize(object);
    // deletes the root key since it won't be sanitized here
    delete object['& .root'];
    return { classMap, refs: Array.from(new Set(refs)) };
}
function createStyles(input) {
    const getCssObject = typeof input === 'function' ? input : () => input;
    function useStyles(params = {}, options) {
        // uses the theme present in the current context or fallbacks to the default theme
        const theme = useSvelteUIThemeContext()?.theme || useSvelteUITheme();
        const { cx } = cssFactory();
        const { override, name } = options || {};
        const dirtyCssObject = getCssObject(theme, params, createRef);
        // builds the CSS object that contains transformed values
        const sanitizedCss = Object.assign({}, dirtyCssObject);
        const { classMap, refs } = sanitizeCss(sanitizedCss, theme);
        const root = dirtyCssObject['root'] ?? undefined;
        const cssObjectClean = root !== undefined ? { ...root, ...sanitizedCss } : dirtyCssObject;
        const getStyles = css(cssObjectClean);
        // transforms the keys into strings to be consumed by the classes
        const classes = fromEntries(Object.keys(dirtyCssObject).map((keys) => {
            const ref = refs.find((r) => r.includes(keys)) ?? '';
            const getRefName = ref?.split('-') ?? [];
            const keyIsRef = ref?.split('-')[getRefName?.length - 1] === keys;
            const value = keys.toString();
            let transformedClasses = classMap[value] ?? value;
            // add the value to the array if the ref provided is valid
            if (ref && keyIsRef) {
                transformedClasses = `${transformedClasses} ${ref}`;
            }
            // generates the root styles, applying the override styles
            if (keys === 'root') {
                transformedClasses = getStyles({ css: override }).toString();
            }
            // adds a custom class that can be used to override style
            let libClass = `${CLASS_KEY}-${keys.toString()}`;
            if (name) {
                libClass = `${CLASS_KEY}-${name}-${keys.toString()}`;
                transformedClasses = `${transformedClasses} ${libClass}`;
            }
            return [keys, transformedClasses];
        }));
        return {
            cx,
            theme,
            classes,
            getStyles: css(cssObjectClean)
        };
    }
    return useStyles;
}

var t="colors",n="sizes",r="space",i={gap:r,gridGap:r,columnGap:r,gridColumnGap:r,rowGap:r,gridRowGap:r,inset:r,insetBlock:r,insetBlockEnd:r,insetBlockStart:r,insetInline:r,insetInlineEnd:r,insetInlineStart:r,margin:r,marginTop:r,marginRight:r,marginBottom:r,marginLeft:r,marginBlock:r,marginBlockEnd:r,marginBlockStart:r,marginInline:r,marginInlineEnd:r,marginInlineStart:r,padding:r,paddingTop:r,paddingRight:r,paddingBottom:r,paddingLeft:r,paddingBlock:r,paddingBlockEnd:r,paddingBlockStart:r,paddingInline:r,paddingInlineEnd:r,paddingInlineStart:r,top:r,right:r,bottom:r,left:r,scrollMargin:r,scrollMarginTop:r,scrollMarginRight:r,scrollMarginBottom:r,scrollMarginLeft:r,scrollMarginX:r,scrollMarginY:r,scrollMarginBlock:r,scrollMarginBlockEnd:r,scrollMarginBlockStart:r,scrollMarginInline:r,scrollMarginInlineEnd:r,scrollMarginInlineStart:r,scrollPadding:r,scrollPaddingTop:r,scrollPaddingRight:r,scrollPaddingBottom:r,scrollPaddingLeft:r,scrollPaddingX:r,scrollPaddingY:r,scrollPaddingBlock:r,scrollPaddingBlockEnd:r,scrollPaddingBlockStart:r,scrollPaddingInline:r,scrollPaddingInlineEnd:r,scrollPaddingInlineStart:r,fontSize:"fontSizes",background:t,backgroundColor:t,backgroundImage:t,borderImage:t,border:t,borderBlock:t,borderBlockEnd:t,borderBlockStart:t,borderBottom:t,borderBottomColor:t,borderColor:t,borderInline:t,borderInlineEnd:t,borderInlineStart:t,borderLeft:t,borderLeftColor:t,borderRight:t,borderRightColor:t,borderTop:t,borderTopColor:t,caretColor:t,color:t,columnRuleColor:t,fill:t,outline:t,outlineColor:t,stroke:t,textDecorationColor:t,fontFamily:"fonts",fontWeight:"fontWeights",lineHeight:"lineHeights",letterSpacing:"letterSpacings",blockSize:n,minBlockSize:n,maxBlockSize:n,inlineSize:n,minInlineSize:n,maxInlineSize:n,width:n,minWidth:n,maxWidth:n,height:n,minHeight:n,maxHeight:n,flexBasis:n,gridTemplateColumns:n,gridTemplateRows:n,borderWidth:"borderWidths",borderTopWidth:"borderWidths",borderRightWidth:"borderWidths",borderBottomWidth:"borderWidths",borderLeftWidth:"borderWidths",borderStyle:"borderStyles",borderTopStyle:"borderStyles",borderRightStyle:"borderStyles",borderBottomStyle:"borderStyles",borderLeftStyle:"borderStyles",borderRadius:"radii",borderTopLeftRadius:"radii",borderTopRightRadius:"radii",borderBottomRightRadius:"radii",borderBottomLeftRadius:"radii",boxShadow:"shadows",textShadow:"shadows",transition:"transitions",zIndex:"zIndices"},o=(e,t)=>"function"==typeof t?{"()":Function.prototype.toString.call(t)}:t,l=()=>{const e=Object.create(null);return (t,n,...r)=>{const i=(e=>JSON.stringify(e,o))(t);return i in e?e[i]:e[i]=n(t,...r)}},s=Symbol.for("sxs.internal"),a=(e,t)=>Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)),c=e=>{for(const t in e)return !0;return !1},{hasOwnProperty:d}=Object.prototype,g=e=>e.includes("-")?e:e.replace(/[A-Z]/g,(e=>"-"+e.toLowerCase())),p=/\s+(?![^()]*\))/,u=e=>t=>e(..."string"==typeof t?String(t).split(p):[t]),h={appearance:e=>({WebkitAppearance:e,appearance:e}),backfaceVisibility:e=>({WebkitBackfaceVisibility:e,backfaceVisibility:e}),backdropFilter:e=>({WebkitBackdropFilter:e,backdropFilter:e}),backgroundClip:e=>({WebkitBackgroundClip:e,backgroundClip:e}),boxDecorationBreak:e=>({WebkitBoxDecorationBreak:e,boxDecorationBreak:e}),clipPath:e=>({WebkitClipPath:e,clipPath:e}),content:e=>({content:e.includes('"')||e.includes("'")||/^([A-Za-z]+\([^]*|[^]*-quote|inherit|initial|none|normal|revert|unset)$/.test(e)?e:`"${e}"`}),hyphens:e=>({WebkitHyphens:e,hyphens:e}),maskImage:e=>({WebkitMaskImage:e,maskImage:e}),maskSize:e=>({WebkitMaskSize:e,maskSize:e}),tabSize:e=>({MozTabSize:e,tabSize:e}),textSizeAdjust:e=>({WebkitTextSizeAdjust:e,textSizeAdjust:e}),userSelect:e=>({WebkitUserSelect:e,userSelect:e}),marginBlock:u(((e,t)=>({marginBlockStart:e,marginBlockEnd:t||e}))),marginInline:u(((e,t)=>({marginInlineStart:e,marginInlineEnd:t||e}))),maxSize:u(((e,t)=>({maxBlockSize:e,maxInlineSize:t||e}))),minSize:u(((e,t)=>({minBlockSize:e,minInlineSize:t||e}))),paddingBlock:u(((e,t)=>({paddingBlockStart:e,paddingBlockEnd:t||e}))),paddingInline:u(((e,t)=>({paddingInlineStart:e,paddingInlineEnd:t||e})))},f=/([\d.]+)([^]*)/,m=(e,t)=>e.length?e.reduce(((e,n)=>(e.push(...t.map((e=>e.includes("&")?e.replace(/&/g,/[ +>|~]/.test(n)&&/&.*&/.test(e)?`:is(${n})`:n):n+" "+e))),e)),[]):t,b=(e,t)=>e in S&&"string"==typeof t?t.replace(/^((?:[^]*[^\w-])?)(fit-content|stretch)((?:[^\w-][^]*)?)$/,((t,n,r,i)=>n+("stretch"===r?`-moz-available${i};${g(e)}:${n}-webkit-fill-available`:`-moz-fit-content${i};${g(e)}:${n}fit-content`)+i)):String(t),S={blockSize:1,height:1,inlineSize:1,maxBlockSize:1,maxHeight:1,maxInlineSize:1,maxWidth:1,minBlockSize:1,minHeight:1,minInlineSize:1,minWidth:1,width:1},k=e=>e?e+"-":"",y=(e,t,n)=>e.replace(/([+-])?((?:\d+(?:\.\d*)?|\.\d+)(?:[Ee][+-]?\d+)?)?(\$|--)([$\w-]+)/g,((e,r,i,o,l)=>"$"==o==!!i?e:(r||"--"==o?"calc(":"")+"var(--"+("$"===o?k(t)+(l.includes("$")?"":k(n))+l.replace(/\$/g,"-"):l)+")"+(r||"--"==o?"*"+(r||"")+(i||"1")+")":""))),B=/\s*,\s*(?![^()]*\))/,$=Object.prototype.toString,x=(e,t,n,r,i)=>{let o,l,s;const a=(e,t,n)=>{let c,d;const p=e=>{for(c in e){const x=64===c.charCodeAt(0),z=x&&Array.isArray(e[c])?e[c]:[e[c]];for(d of z){const e=/[A-Z]/.test(S=c)?S:S.replace(/-[^]/g,(e=>e[1].toUpperCase())),z="object"==typeof d&&d&&d.toString===$&&(!r.utils[e]||!t.length);if(e in r.utils&&!z){const t=r.utils[e];if(t!==l){l=t,p(t(d)),l=null;continue}}else if(e in h){const t=h[e];if(t!==s){s=t,p(t(d)),s=null;continue}}if(x&&(u=c.slice(1)in r.media?"@media "+r.media[c.slice(1)]:c,c=u.replace(/\(\s*([\w-]+)\s*(=|<|<=|>|>=)\s*([\w-]+)\s*(?:(<|<=|>|>=)\s*([\w-]+)\s*)?\)/g,((e,t,n,r,i,o)=>{const l=f.test(t),s=.0625*(l?-1:1),[a,c]=l?[r,t]:[t,r];return "("+("="===n[0]?"":">"===n[0]===l?"max-":"min-")+a+":"+("="!==n[0]&&1===n.length?c.replace(f,((e,t,r)=>Number(t)+s*(">"===n?1:-1)+r)):c)+(i?") and ("+(">"===i[0]?"min-":"max-")+a+":"+(1===i.length?o.replace(f,((e,t,n)=>Number(t)+s*(">"===i?-1:1)+n)):o):"")+")"}))),z){const e=x?n.concat(c):[...n],r=x?[...t]:m(t,c.split(B));void 0!==o&&i(I(...o)),o=void 0,a(d,r,e);}else void 0===o&&(o=[[],t,n]),c=x||36!==c.charCodeAt(0)?c:`--${k(r.prefix)}${c.slice(1).replace(/\$/g,"-")}`,d=z?d:"number"==typeof d?d&&e in R?String(d)+"px":String(d):y(b(e,null==d?"":d),r.prefix,r.themeMap[e]),o[0].push(`${x?`${c} `:`${g(c)}:`}${d}`);}}var u,S;};p(e),void 0!==o&&i(I(...o)),o=void 0;};a(e,t,n);},I=(e,t,n)=>`${n.map((e=>`${e}{`)).join("")}${t.length?`${t.join(",")}{`:""}${e.join(";")}${t.length?"}":""}${Array(n.length?n.length+1:0).join("}")}`,R={animationDelay:1,animationDuration:1,backgroundSize:1,blockSize:1,border:1,borderBlock:1,borderBlockEnd:1,borderBlockEndWidth:1,borderBlockStart:1,borderBlockStartWidth:1,borderBlockWidth:1,borderBottom:1,borderBottomLeftRadius:1,borderBottomRightRadius:1,borderBottomWidth:1,borderEndEndRadius:1,borderEndStartRadius:1,borderInlineEnd:1,borderInlineEndWidth:1,borderInlineStart:1,borderInlineStartWidth:1,borderInlineWidth:1,borderLeft:1,borderLeftWidth:1,borderRadius:1,borderRight:1,borderRightWidth:1,borderSpacing:1,borderStartEndRadius:1,borderStartStartRadius:1,borderTop:1,borderTopLeftRadius:1,borderTopRightRadius:1,borderTopWidth:1,borderWidth:1,bottom:1,columnGap:1,columnRule:1,columnRuleWidth:1,columnWidth:1,containIntrinsicSize:1,flexBasis:1,fontSize:1,gap:1,gridAutoColumns:1,gridAutoRows:1,gridTemplateColumns:1,gridTemplateRows:1,height:1,inlineSize:1,inset:1,insetBlock:1,insetBlockEnd:1,insetBlockStart:1,insetInline:1,insetInlineEnd:1,insetInlineStart:1,left:1,letterSpacing:1,margin:1,marginBlock:1,marginBlockEnd:1,marginBlockStart:1,marginBottom:1,marginInline:1,marginInlineEnd:1,marginInlineStart:1,marginLeft:1,marginRight:1,marginTop:1,maxBlockSize:1,maxHeight:1,maxInlineSize:1,maxWidth:1,minBlockSize:1,minHeight:1,minInlineSize:1,minWidth:1,offsetDistance:1,offsetRotate:1,outline:1,outlineOffset:1,outlineWidth:1,overflowClipMargin:1,padding:1,paddingBlock:1,paddingBlockEnd:1,paddingBlockStart:1,paddingBottom:1,paddingInline:1,paddingInlineEnd:1,paddingInlineStart:1,paddingLeft:1,paddingRight:1,paddingTop:1,perspective:1,right:1,rowGap:1,scrollMargin:1,scrollMarginBlock:1,scrollMarginBlockEnd:1,scrollMarginBlockStart:1,scrollMarginBottom:1,scrollMarginInline:1,scrollMarginInlineEnd:1,scrollMarginInlineStart:1,scrollMarginLeft:1,scrollMarginRight:1,scrollMarginTop:1,scrollPadding:1,scrollPaddingBlock:1,scrollPaddingBlockEnd:1,scrollPaddingBlockStart:1,scrollPaddingBottom:1,scrollPaddingInline:1,scrollPaddingInlineEnd:1,scrollPaddingInlineStart:1,scrollPaddingLeft:1,scrollPaddingRight:1,scrollPaddingTop:1,shapeMargin:1,textDecoration:1,textDecorationThickness:1,textIndent:1,textUnderlineOffset:1,top:1,transitionDelay:1,transitionDuration:1,verticalAlign:1,width:1,wordSpacing:1},z=e=>String.fromCharCode(e+(e>25?39:97)),W=e=>(e=>{let t,n="";for(t=Math.abs(e);t>52;t=t/52|0)n=z(t%52)+n;return z(t%52)+n})(((e,t)=>{let n=t.length;for(;n;)e=33*e^t.charCodeAt(--n);return e})(5381,JSON.stringify(e))>>>0),j=["themed","global","styled","onevar","resonevar","allvar","inline"],E=e=>{if(e.href&&!e.href.startsWith(location.origin))return !1;try{return !!e.cssRules}catch(e){return !1}},T=e=>{let t;const n=()=>{const{cssRules:e}=t.sheet;return [].map.call(e,((n,r)=>{const{cssText:i}=n;let o="";if(i.startsWith("--sxs"))return "";if(e[r-1]&&(o=e[r-1].cssText).startsWith("--sxs")){if(!n.cssRules.length)return "";for(const e in t.rules)if(t.rules[e].group===n)return `--sxs{--sxs:${[...t.rules[e].cache].join(" ")}}${i}`;return n.cssRules.length?`${o}${i}`:""}return i})).join("")},r=()=>{if(t){const{rules:e,sheet:n}=t;if(!n.deleteRule){for(;3===Object(Object(n.cssRules)[0]).type;)n.cssRules.splice(0,1);n.cssRules=[];}for(const t in e)delete e[t];}const i=Object(e).styleSheets||[];for(const e of i)if(E(e)){for(let i=0,o=e.cssRules;o[i];++i){const l=Object(o[i]);if(1!==l.type)continue;const s=Object(o[i+1]);if(4!==s.type)continue;++i;const{cssText:a}=l;if(!a.startsWith("--sxs"))continue;const c=a.slice(14,-3).trim().split(/\s+/),d=j[c[0]];d&&(t||(t={sheet:e,reset:r,rules:{},toString:n}),t.rules[d]={group:s,index:i,cache:new Set(c)});}if(t)break}if(!t){const i=(e,t)=>({type:t,cssRules:[],insertRule(e,t){this.cssRules.splice(t,0,i(e,{import:3,undefined:1}[(e.toLowerCase().match(/^@([a-z]+)/)||[])[1]]||4));},get cssText(){return "@media{}"===e?`@media{${[].map.call(this.cssRules,(e=>e.cssText)).join("")}}`:e}});t={sheet:e?(e.head||e).appendChild(document.createElement("style")).sheet:i("","text/css"),rules:{},reset:r,toString:n};}const{sheet:o,rules:l}=t;for(let e=j.length-1;e>=0;--e){const t=j[e];if(!l[t]){const n=j[e+1],r=l[n]?l[n].index:o.cssRules.length;o.insertRule("@media{}",r),o.insertRule(`--sxs{--sxs:${e}}`,r),l[t]={group:o.cssRules[r+1],index:r,cache:new Set([e])};}v(l[t]);}};return r(),t},v=e=>{const t=e.group;let n=t.cssRules.length;e.apply=e=>{try{t.insertRule(e,n),++n;}catch(e){}};},M=Symbol(),w=l(),C=(e,t)=>w(e,(()=>(...n)=>{let r={type:null,composers:new Set};for(const t of n)if(null!=t)if(t[s]){null==r.type&&(r.type=t[s].type);for(const e of t[s].composers)r.composers.add(e);}else t.constructor!==Object||t.$$typeof?null==r.type&&(r.type=t):r.composers.add(P(t,e));return null==r.type&&(r.type="span"),r.composers.size||r.composers.add(["PJLV",{},[],[],{},[]]),L(e,r,t)})),P=({variants:e,compoundVariants:t,defaultVariants:n,...r},i)=>{const o=`${k(i.prefix)}c-${W(r)}`,l=[],s=[],a=Object.create(null),g=[];for(const e in n)a[e]=String(n[e]);if("object"==typeof e&&e)for(const t in e){p=a,u=t,d.call(p,u)||(a[t]="undefined");const n=e[t];for(const e in n){const r={[t]:String(e)};"undefined"===String(e)&&g.push(t);const i=n[e],o=[r,i,!c(i)];l.push(o);}}var p,u;if("object"==typeof t&&t)for(const e of t){let{css:t,...n}=e;t="object"==typeof t&&t||{};for(const e in n)n[e]=String(n[e]);const r=[n,t,!c(t)];s.push(r);}return [o,r,l,s,a,g]},L=(e,t,n)=>{const[r,i,o,l]=O(t.composers),c="function"==typeof t.type||t.type.$$typeof?(e=>{function t(){for(let n=0;n<t[M].length;n++){const[r,i]=t[M][n];e.rules[r].apply(i);}return t[M]=[],null}return t[M]=[],t.rules={},j.forEach((e=>t.rules[e]={apply:n=>t[M].push([e,n])})),t})(n):null,d=(c||n).rules,g=`.${r}${i.length>1?`:where(.${i.slice(1).join(".")})`:""}`,p=s=>{s="object"==typeof s&&s||D;const{css:a,...p}=s,u={};for(const e in o)if(delete p[e],e in s){let t=s[e];"object"==typeof t&&t?u[e]={"@initial":o[e],...t}:(t=String(t),u[e]="undefined"!==t||l.has(e)?t:o[e]);}else u[e]=o[e];const h=new Set([...i]);for(const[r,i,o,l]of t.composers){n.rules.styled.cache.has(r)||(n.rules.styled.cache.add(r),x(i,[`.${r}`],[],e,(e=>{d.styled.apply(e);})));const t=A(o,u,e.media),s=A(l,u,e.media,!0);for(const i of t)if(void 0!==i)for(const[t,o,l]of i){const i=`${r}-${W(o)}-${t}`;h.add(i);const s=(l?n.rules.resonevar:n.rules.onevar).cache,a=l?d.resonevar:d.onevar;s.has(i)||(s.add(i),x(o,[`.${i}`],[],e,(e=>{a.apply(e);})));}for(const t of s)if(void 0!==t)for(const[i,o]of t){const t=`${r}-${W(o)}-${i}`;h.add(t),n.rules.allvar.cache.has(t)||(n.rules.allvar.cache.add(t),x(o,[`.${t}`],[],e,(e=>{d.allvar.apply(e);})));}}if("object"==typeof a&&a){const t=`${r}-i${W(a)}-css`;h.add(t),n.rules.inline.cache.has(t)||(n.rules.inline.cache.add(t),x(a,[`.${t}`],[],e,(e=>{d.inline.apply(e);})));}for(const e of String(s.className||"").trim().split(/\s+/))e&&h.add(e);const f=p.className=[...h].join(" ");return {type:t.type,className:f,selector:g,props:p,toString:()=>f,deferredInjector:c}};return a(p,{className:r,selector:g,[s]:t,toString:()=>(n.rules.styled.cache.has(r)||p(),r)})},O=e=>{let t="";const n=[],r={},i=[];for(const[o,,,,l,s]of e){""===t&&(t=o),n.push(o),i.push(...s);for(const e in l){const t=l[e];(void 0===r[e]||"undefined"!==t||s.includes(t))&&(r[e]=t);}}return [t,n,r,new Set(i)]},A=(e,t,n,r)=>{const i=[];e:for(let[o,l,s]of e){if(s)continue;let e,a=0,c=!1;for(e in o){const r=o[e];let i=t[e];if(i!==r){if("object"!=typeof i||!i)continue e;{let e,t,o=0;for(const l in i){if(r===String(i[l])){if("@initial"!==l){const e=l.slice(1);(t=t||[]).push(e in n?n[e]:l.replace(/^@media ?/,"")),c=!0;}a+=o,e=!0;}++o;}if(t&&t.length&&(l={["@media "+t.join(", ")]:l}),!e)continue e}}}(i[a]=i[a]||[]).push([r?"cv":`${e}-${o[e]}`,l,c]);}return i},D={},H=l(),N=(e,t)=>H(e,(()=>(...n)=>{const r=()=>{for(let r of n){r="object"==typeof r&&r||{};let n=W(r);if(!t.rules.global.cache.has(n)){if(t.rules.global.cache.add(n),"@import"in r){let e=[].indexOf.call(t.sheet.cssRules,t.rules.themed.group)-1;for(let n of [].concat(r["@import"]))n=n.includes('"')||n.includes("'")?n:`"${n}"`,t.sheet.insertRule(`@import ${n};`,e++);delete r["@import"];}x(r,[],[],e,(e=>{t.rules.global.apply(e);}));}}return ""};return a(r,{toString:r})})),V=l(),G=(e,t)=>V(e,(()=>n=>{const r=`${k(e.prefix)}k-${W(n)}`,i=()=>{if(!t.rules.global.cache.has(r)){t.rules.global.cache.add(r);const i=[];x(n,[],[],e,(e=>i.push(e)));const o=`@keyframes ${r}{${i.join("")}}`;t.rules.global.apply(o);}return r};return a(i,{get name(){return i()},toString:i})})),F=class{constructor(e,t,n,r){this.token=null==e?"":String(e),this.value=null==t?"":String(t),this.scale=null==n?"":String(n),this.prefix=null==r?"":String(r);}get computedValue(){return "var("+this.variable+")"}get variable(){return "--"+k(this.prefix)+k(this.scale)+this.token}toString(){return this.computedValue}},J=l(),U=(e,t)=>J(e,(()=>(n,r)=>{r="object"==typeof n&&n||Object(r);const i=`.${n=(n="string"==typeof n?n:"")||`${k(e.prefix)}t-${W(r)}`}`,o={},l=[];for(const t in r){o[t]={};for(const n in r[t]){const i=`--${k(e.prefix)}${t}-${n}`,s=y(String(r[t][n]),e.prefix,t);o[t][n]=new F(n,s,t,e.prefix),l.push(`${i}:${s}`);}}const s=()=>{if(l.length&&!t.rules.themed.cache.has(n)){t.rules.themed.cache.add(n);const i=`${r===e.theme?":root,":""}.${n}{${l.join(";")}}`;t.rules.themed.apply(i);}return n};return {...o,get className(){return s()},selector:i,toString:s}})),Z=l(),X=e=>{let t=!1;const n=Z(e,(e=>{t=!0;const n="prefix"in(e="object"==typeof e&&e||{})?String(e.prefix):"",r="object"==typeof e.media&&e.media||{},o="object"==typeof e.root?e.root||null:globalThis.document||null,l="object"==typeof e.theme&&e.theme||{},s={prefix:n,media:r,theme:l,themeMap:"object"==typeof e.themeMap&&e.themeMap||{...i},utils:"object"==typeof e.utils&&e.utils||{}},a=T(o),c={css:C(s,a),globalCss:N(s,a),keyframes:G(s,a),createTheme:U(s,a),reset(){a.reset(),c.theme.toString();},theme:{},sheet:a,config:s,prefix:n,getCssText:a.toString,toString:a.toString};return String(c.theme=c.createTheme(l)),c}));return t||n.reset(),n};//# sourceMappingUrl=index.map

const { css, globalCss, keyframes, getCssText, theme, createTheme, config, reset } = X({
    prefix: 'svelteui',
    theme: {
        colors,
        space: {
            0: '0rem',
            xs: 10,
            sm: 12,
            md: 16,
            lg: 20,
            xl: 24,
            xsPX: '10px',
            smPX: '12px',
            mdPX: '16px',
            lgPX: '20px',
            xlPX: '24px',
            1: '0.125rem',
            2: '0.25rem',
            3: '0.375rem',
            4: '0.5rem',
            5: '0.625rem',
            6: '0.75rem',
            7: '0.875rem',
            8: '1rem',
            9: '1.25rem',
            10: '1.5rem',
            11: '1.75rem',
            12: '2rem',
            13: '2.25rem',
            14: '2.5rem',
            15: '2.75rem',
            16: '3rem',
            17: '3.5rem',
            18: '4rem',
            20: '5rem',
            24: '6rem',
            28: '7rem',
            32: '8rem',
            36: '9rem',
            40: '10rem',
            44: '11rem',
            48: '12rem',
            52: '13rem',
            56: '14rem',
            60: '15rem',
            64: '16rem',
            72: '18rem',
            80: '20rem',
            96: '24rem'
        },
        fontSizes: {
            xs: '12px',
            sm: '14px',
            md: '16px',
            lg: '18px',
            xl: '20px'
        },
        fonts: {
            standard: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
            mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
            fallback: 'Segoe UI, system-ui, sans-serif'
        },
        fontWeights: {
            thin: 100,
            extralight: 200,
            light: 300,
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
            extrabold: 800
        },
        lineHeights: {
            xs: 1,
            sm: 1.25,
            md: 1.5,
            lg: 1.625,
            xl: 1.75
        },
        letterSpacings: {
            tighter: '-0.05em',
            tight: '-0.025em',
            normal: '0',
            wide: '0.025em',
            wider: '0.05em',
            widest: '0.1em'
        },
        sizes: {},
        radii: {
            xs: '2px',
            sm: '4px',
            md: '8px',
            lg: '16px',
            xl: '32px',
            squared: '33%',
            rounded: '50%',
            pill: '9999px'
        },
        shadows: {
            xs: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
            sm: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 10px 15px -5px, rgba(0, 0, 0, 0.04) 0px 7px 7px -5px',
            md: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
            lg: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 28px 23px -7px, rgba(0, 0, 0, 0.04) 0px 12px 12px -7px',
            xl: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 36px 28px -7px, rgba(0, 0, 0, 0.04) 0px 17px 17px -7px'
        },
        zIndices: {
            1: '100',
            2: '200',
            3: '300',
            4: '400',
            5: '500',
            10: '1000',
            max: '9999'
        },
        borderWidths: {
            light: '1px',
            normal: '2px',
            bold: '3px',
            extrabold: '4px',
            black: '5px',
            xs: '1px',
            sm: '2px',
            md: '3px',
            lg: '4px',
            xl: '5px'
        },
        breakpoints: {
            xs: 576,
            sm: 768,
            md: 992,
            lg: 1200,
            xl: 1400
        },
        borderStyles: {},
        transitions: {}
    },
    media: {
        xs: '(min-width: 576px)',
        sm: '(min-width: 768px)',
        md: '(min-width: 992px)',
        lg: '(min-width: 1200px)',
        xl: '(min-width: 1400px)'
    },
    utils: {
        focusRing: (value) => ({
            WebkitTapHighlightColor: 'transparent',
            '&:focus': {
                outlineOffset: 2,
                outline: value === 'always' || value === 'auto' ? '2px solid $primary' : 'none'
            },
            '&:focus:not(:focus-visible)': {
                outline: value === 'auto' || value === 'never' ? 'none' : undefined
            }
        }),
        /** padding top */
        p: (value) => ({
            padding: value
        }),
        pt: (value) => ({
            paddingTop: value
        }),
        pr: (value) => ({
            paddingRight: value
        }),
        pb: (value) => ({
            paddingBottom: value
        }),
        pl: (value) => ({
            paddingLeft: value
        }),
        px: (value) => ({
            paddingLeft: value,
            paddingRight: value
        }),
        py: (value) => ({
            paddingTop: value,
            paddingBottom: value
        }),
        /** margin */
        m: (value) => ({
            margin: value
        }),
        /** margin-top */
        mt: (value) => ({
            marginTop: value
        }),
        mr: (value) => ({
            marginRight: value
        }),
        mb: (value) => ({
            marginBottom: value
        }),
        ml: (value) => ({
            marginLeft: value
        }),
        mx: (value) => ({
            marginLeft: value,
            marginRight: value
        }),
        my: (value) => ({
            marginTop: value,
            marginBottom: value
        }),
        ta: (value) => ({
            textAlign: value
        }),
        tt: (value) => ({
            textTransform: value
        }),
        to: (value) => ({
            textOverflow: value
        }),
        d: (value) => ({ display: value }),
        dflex: (value) => ({
            display: 'flex',
            alignItems: value,
            justifyContent: value
        }),
        fd: (value) => ({
            flexDirection: value
        }),
        fw: (value) => ({ flexWrap: value }),
        ai: (value) => ({
            alignItems: value
        }),
        ac: (value) => ({
            alignContent: value
        }),
        jc: (value) => ({
            justifyContent: value
        }),
        as: (value) => ({
            alignSelf: value
        }),
        fg: (value) => ({ flexGrow: value }),
        fs: (value) => ({
            fontSize: value
        }),
        fb: (value) => ({
            flexBasis: value
        }),
        bc: (value) => ({
            backgroundColor: value
        }),
        bf: (value) => ({
            backdropFilter: value
        }),
        bg: (value) => ({
            background: value
        }),
        bgBlur: (value) => ({
            bf: 'saturate(180%) blur(10px)',
            bg: value
        }),
        bgColor: (value) => ({
            backgroundColor: value
        }),
        backgroundClip: (value) => ({
            WebkitBackgroundClip: value,
            backgroundClip: value
        }),
        bgClip: (value) => ({
            WebkitBackgroundClip: value,
            backgroundClip: value
        }),
        br: (value) => ({
            borderRadius: value
        }),
        bw: (value) => ({
            borderWidth: value
        }),
        btrr: (value) => ({
            borderTopRightRadius: value
        }),
        bbrr: (value) => ({
            borderBottomRightRadius: value
        }),
        bblr: (value) => ({
            borderBottomLeftRadius: value
        }),
        btlr: (value) => ({
            borderTopLeftRadius: value
        }),
        bs: (value) => ({
            boxShadow: value
        }),
        normalShadow: (value) => ({
            boxShadow: `0 4px 14px 0 $${value}`
        }),
        lh: (value) => ({
            lineHeight: value
        }),
        ov: (value) => ({ overflow: value }),
        ox: (value) => ({
            overflowX: value
        }),
        oy: (value) => ({
            overflowY: value
        }),
        pe: (value) => ({
            pointerEvents: value
        }),
        events: (value) => ({
            pointerEvents: value
        }),
        us: (value) => ({
            WebkitUserSelect: value,
            userSelect: value
        }),
        userSelect: (value) => ({
            WebkitUserSelect: value,
            userSelect: value
        }),
        w: (value) => ({ width: value }),
        h: (value) => ({
            height: value
        }),
        minW: (value) => ({
            minWidth: value
        }),
        minH: (value) => ({
            minWidth: value
        }),
        mw: (value) => ({
            maxWidth: value
        }),
        maxW: (value) => ({
            maxWidth: value
        }),
        mh: (value) => ({
            maxHeight: value
        }),
        maxH: (value) => ({
            maxHeight: value
        }),
        size: (value) => ({
            width: value,
            height: value
        }),
        minSize: (value) => ({
            minWidth: value,
            minHeight: value,
            width: value,
            height: value
        }),
        sizeMin: (value) => ({
            minWidth: value,
            minHeight: value,
            width: value,
            height: value
        }),
        maxSize: (value) => ({
            maxWidth: value,
            maxHeight: value
        }),
        sizeMax: (value) => ({
            maxWidth: value,
            maxHeight: value
        }),
        appearance: (value) => ({
            WebkitAppearance: value,
            appearance: value
        }),
        scale: (value) => ({
            transform: `scale(${value})`
        }),
        linearGradient: (value) => ({
            backgroundImage: `linear-gradient(${value})`
        }),
        tdl: (value) => ({
            textDecorationLine: value
        }),
        // Text gradient effect
        textGradient: (value) => ({
            backgroundImage: `linear-gradient(${value})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
        })
    },
    themeMap: {
        ...i,
        width: 'space',
        height: 'space',
        minWidth: 'space',
        maxWidth: 'space',
        minHeight: 'space',
        maxHeight: 'space',
        flexBasis: 'space',
        gridTemplateColumns: 'space',
        gridTemplateRows: 'space',
        blockSize: 'space',
        minBlockSize: 'space',
        maxBlockSize: 'space',
        inlineSize: 'space',
        minInlineSize: 'space',
        maxInlineSize: 'space',
        borderWidth: 'borderWeights'
    }
});
/** Function for dark theme */
const dark = createTheme('dark-theme', {
    colors,
    shadows: {
        xs: '-4px 0 15px rgb(0 0 0 / 50%)',
        sm: '0 5px 20px -5px rgba(20, 20, 20, 0.1)',
        md: '0 8px 30px rgba(20, 20, 20, 0.15)',
        lg: '0 30px 60px rgba(20, 20, 20, 0.15)',
        xl: '0 40px 80px rgba(20, 20, 20, 0.25)'
    }
});
/** Global styles for SvelteUI */
globalCss({
    a: {
        focusRing: 'auto'
    },
    body: {
        [`${dark.selector} &`]: {
            backgroundColor: '$dark700',
            color: '$dark50'
        },
        backgroundColor: '$white',
        color: '$black'
    }
});
/** Normalize css function */
globalCss({
    html: {
        fontFamily: 'sans-serif',
        lineHeight: '1.15',
        textSizeAdjust: '100%',
        margin: 0
    },
    body: {
        margin: 0
    },
    'article, aside, footer, header, nav, section, figcaption, figure, main': {
        display: 'block'
    },
    h1: {
        fontSize: '2em',
        margin: 0
    },
    hr: {
        boxSizing: 'content-box',
        height: 0,
        overflow: 'visible'
    },
    pre: {
        fontFamily: 'monospace, monospace',
        fontSize: '1em'
    },
    a: {
        background: 'transparent',
        textDecorationSkip: 'objects'
    },
    'a:active, a:hover': {
        outlineWidth: 0
    },
    'abbr[title]': {
        borderBottom: 'none',
        textDecoration: 'underline'
    },
    'b, strong': {
        fontWeight: 'bolder'
    },
    'code, kbp, samp': {
        fontFamily: 'monospace, monospace',
        fontSize: '1em'
    },
    dfn: {
        fontStyle: 'italic'
    },
    mark: {
        backgroundColor: '#ff0',
        color: '#000'
    },
    small: {
        fontSize: '80%'
    },
    'sub, sup': {
        fontSize: '75%',
        lineHeight: 0,
        position: 'relative',
        verticalAlign: 'baseline'
    },
    sup: {
        top: '-0.5em'
    },
    sub: {
        bottom: '-0.25em'
    },
    'audio, video': {
        display: 'inline-block'
    },
    'audio:not([controls])': {
        display: 'none',
        height: 0
    },
    img: {
        borderStyle: 'none',
        verticalAlign: 'middle'
    },
    'svg:not(:root)': {
        overflow: 'hidden'
    },
    'button, input, optgroup, select, textarea': {
        fontFamily: 'sans-serif',
        fontSize: '100%',
        lineHeight: '1.15',
        margin: 0
    },
    'button, input': {
        overflow: 'visible'
    },
    'button, select': {
        textTransform: 'none'
    },
    'button, [type=reset], [type=submit]': {
        WebkitAppearance: 'button'
    },
    'button::-moz-focus-inner, [type=button]::-moz-focus-inner, [type=reset]::-moz-focus-inner, [type=submit]::-moz-focus-inner': {
        borderStyle: 'none',
        padding: 0
    },
    'button:-moz-focusring, [type=button]:-moz-focusring, [type=reset]:-moz-focusring, [type=submit]:-moz-focusring': {
        outline: '1px dotted ButtonText'
    },
    legend: {
        boxSizing: 'border-box',
        color: 'inherit',
        display: 'table',
        maxWidth: '100%',
        padding: 0,
        whiteSpace: 'normal'
    },
    progress: {
        display: 'inline-block',
        verticalAlign: 'baseline'
    },
    textarea: {
        overflow: 'auto'
    },
    '[type=checkbox], [type=radio]': {
        boxSizing: 'border-box',
        padding: 0
    },
    '[type=number]::-webkit-inner-spin-button, [type=number]::-webkit-outer-spin-button': {
        height: 'auto'
    },
    '[type=search]': {
        appearance: 'textfield',
        outlineOffset: '-2px'
    },
    '[type=search]::-webkit-search-cancel-button, [type=search]::-webkit-search-decoration': {
        appearance: 'none'
    },
    '::-webkit-file-upload-button': {
        appearance: 'button',
        font: 'inherit'
    },
    'details, menu': {
        display: 'block'
    },
    summary: {
        display: 'list-item'
    },
    canvas: {
        display: 'inline-block'
    },
    template: {
        display: 'none'
    },
    '[hidden]': {
        display: 'none'
    }
});

const SYSTEM_PROPS = {
    mt: 'marginTop',
    mb: 'marginBottom',
    ml: 'marginLeft',
    mr: 'marginRight',
    pt: 'paddingTop',
    pb: 'paddingBottom',
    pl: 'paddingLeft',
    pr: 'paddingRight'
};
const NEGATIVE_VALUES = ['-xs', '-sm', '-md', '-lg', '-xl'];
function isValidSizeValue(margin) {
    return typeof margin === 'string' || typeof margin === 'number';
}
function getSizeValue(margin, theme) {
    if (NEGATIVE_VALUES.includes(margin)) {
        return theme.fn.size({ size: margin.replace('-', ''), sizes: theme.space }) * -1;
    }
    return theme.fn.size({ size: margin, sizes: theme.space });
}
function getSystemStyles(systemStyles, theme) {
    const styles = {};
    if (isValidSizeValue(systemStyles.p)) {
        const value = getSizeValue(systemStyles.p, theme);
        styles.padding = value;
    }
    if (isValidSizeValue(systemStyles.m)) {
        const value = getSizeValue(systemStyles.m, theme);
        styles.margin = value;
    }
    if (isValidSizeValue(systemStyles.py)) {
        const value = getSizeValue(systemStyles.py, theme);
        styles.paddingTop = value;
        styles.paddingBottom = value;
    }
    if (isValidSizeValue(systemStyles.px)) {
        const value = getSizeValue(systemStyles.px, theme);
        styles.paddingLeft = value;
        styles.paddingRight = value;
    }
    if (isValidSizeValue(systemStyles.my)) {
        const value = getSizeValue(systemStyles.my, theme);
        styles.marginTop = value;
        styles.marginBottom = value;
    }
    if (isValidSizeValue(systemStyles.mx)) {
        const value = getSizeValue(systemStyles.mx, theme);
        styles.marginLeft = value;
        styles.marginRight = value;
    }
    Object.keys(SYSTEM_PROPS).forEach((property) => {
        if (isValidSizeValue(systemStyles[property])) {
            styles[SYSTEM_PROPS[property]] = theme.fn.size({
                size: getSizeValue(systemStyles[property], theme),
                sizes: theme.space
            });
        }
    });
    return styles;
}

/* node_modules/.pnpm/@svelteuidev+core@0.9.0_ypfjxaydaa2meuohvziy3hvz6y/node_modules/@svelteuidev/core/components/Box/Box.svelte generated by Svelte v3.55.1 */

function create_else_block$2(ctx) {
	let div;
	let div_class_value;
	let useActions_action;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[28].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[32], null);

	let div_levels = [
		{
			class: div_class_value = "" + (/*className*/ ctx[2] + " " + /*BoxStyles*/ ctx[7]({
				css: {
					.../*getCSSStyles*/ ctx[11](/*theme*/ ctx[10]),
					.../*systemStyles*/ ctx[6]
				}
			}))
		},
		/*$$restProps*/ ctx[12]
	];

	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	return {
		c() {
			div = element("div");
			if (default_slot) default_slot.c();
			set_attributes(div, div_data);
		},
		m(target, anchor) {
			insert(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			/*div_binding*/ ctx[31](div);
			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer(/*forwardEvents*/ ctx[8].call(null, div)),
					action_destroyer(useActions_action = useActions.call(null, div, /*use*/ ctx[1]))
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty[1] & /*$$scope*/ 2)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[32],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[32])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[32], dirty, null),
						null
					);
				}
			}

			set_attributes(div, div_data = get_spread_update(div_levels, [
				(!current || dirty[0] & /*className, BoxStyles, systemStyles*/ 196 && div_class_value !== (div_class_value = "" + (/*className*/ ctx[2] + " " + /*BoxStyles*/ ctx[7]({
					css: {
						.../*getCSSStyles*/ ctx[11](/*theme*/ ctx[10]),
						.../*systemStyles*/ ctx[6]
					}
				})))) && { class: div_class_value },
				dirty[0] & /*$$restProps*/ 4096 && /*$$restProps*/ ctx[12]
			]));

			if (useActions_action && is_function(useActions_action.update) && dirty[0] & /*use*/ 2) useActions_action.update.call(null, /*use*/ ctx[1]);
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if (default_slot) default_slot.d(detaching);
			/*div_binding*/ ctx[31](null);
			mounted = false;
			run_all(dispose);
		}
	};
}

// (64:50) 
function create_if_block_1$5(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;

	const switch_instance_spread_levels = [
		{
			use: [/*forwardEvents*/ ctx[8], [useActions, /*use*/ ctx[1]]]
		},
		{
			class: "" + (/*className*/ ctx[2] + " " + /*BoxStyles*/ ctx[7]({
				css: {
					.../*getCSSStyles*/ ctx[11](/*theme*/ ctx[10]),
					.../*systemStyles*/ ctx[6]
				}
			}))
		},
		/*$$restProps*/ ctx[12]
	];

	var switch_value = /*root*/ ctx[3];

	function switch_props(ctx) {
		let switch_instance_props = {
			$$slots: { default: [create_default_slot$8] },
			$$scope: { ctx }
		};

		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
		}

		return { props: switch_instance_props };
	}

	if (switch_value) {
		switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
		/*switch_instance_binding*/ ctx[30](switch_instance);
	}

	return {
		c() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		m(target, anchor) {
			if (switch_instance) mount_component(switch_instance, target, anchor);
			insert(target, switch_instance_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const switch_instance_changes = (dirty[0] & /*forwardEvents, use, className, BoxStyles, getCSSStyles, theme, systemStyles, $$restProps*/ 7622)
			? get_spread_update(switch_instance_spread_levels, [
					dirty[0] & /*forwardEvents, use*/ 258 && {
						use: [/*forwardEvents*/ ctx[8], [useActions, /*use*/ ctx[1]]]
					},
					dirty[0] & /*className, BoxStyles, getCSSStyles, theme, systemStyles*/ 3268 && {
						class: "" + (/*className*/ ctx[2] + " " + /*BoxStyles*/ ctx[7]({
							css: {
								.../*getCSSStyles*/ ctx[11](/*theme*/ ctx[10]),
								.../*systemStyles*/ ctx[6]
							}
						}))
					},
					dirty[0] & /*$$restProps*/ 4096 && get_spread_object(/*$$restProps*/ ctx[12])
				])
			: {};

			if (dirty[1] & /*$$scope*/ 2) {
				switch_instance_changes.$$scope = { dirty, ctx };
			}

			if (switch_value !== (switch_value = /*root*/ ctx[3])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
					/*switch_instance_binding*/ ctx[30](switch_instance);
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			/*switch_instance_binding*/ ctx[30](null);
			if (detaching) detach(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};
}

// (52:0) {#if isHTMLElement}
function create_if_block$7(ctx) {
	let previous_tag = /*castRoot*/ ctx[9]();
	let svelte_element_anchor;
	let current;
	let svelte_element = /*castRoot*/ ctx[9]() && create_dynamic_element$1(ctx);

	return {
		c() {
			if (svelte_element) svelte_element.c();
			svelte_element_anchor = empty();
		},
		m(target, anchor) {
			if (svelte_element) svelte_element.m(target, anchor);
			insert(target, svelte_element_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			if (/*castRoot*/ ctx[9]()) {
				if (!previous_tag) {
					svelte_element = create_dynamic_element$1(ctx);
					svelte_element.c();
					svelte_element.m(svelte_element_anchor.parentNode, svelte_element_anchor);
				} else if (safe_not_equal(previous_tag, /*castRoot*/ ctx[9]())) {
					svelte_element.d(1);
					svelte_element = create_dynamic_element$1(ctx);
					svelte_element.c();
					svelte_element.m(svelte_element_anchor.parentNode, svelte_element_anchor);
				} else {
					svelte_element.p(ctx, dirty);
				}
			} else if (previous_tag) {
				svelte_element.d(1);
				svelte_element = null;
			}

			previous_tag = /*castRoot*/ ctx[9]();
		},
		i(local) {
			if (current) return;
			transition_in(svelte_element);
			current = true;
		},
		o(local) {
			transition_out(svelte_element);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(svelte_element_anchor);
			if (svelte_element) svelte_element.d(detaching);
		}
	};
}

// (65:1) <svelte:component   this={root}   bind:this={element}   use={[forwardEvents, [useActions, use]]}   class="{className} {BoxStyles({ css: { ...getCSSStyles(theme), ...systemStyles } })}"   {...$$restProps}  >
function create_default_slot$8(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[28].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[32], null);

	return {
		c() {
			if (default_slot) default_slot.c();
		},
		m(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty[1] & /*$$scope*/ 2)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[32],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[32])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[32], dirty, null),
						null
					);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};
}

// (54:1) <svelte:element   bind:this={element}   this={castRoot()}   use:forwardEvents   use:useActions={use}   class="{className} {BoxStyles({ css: {...getCSSStyles(theme), ...systemStyles} })}"   {...$$restProps}  >
function create_dynamic_element$1(ctx) {
	let svelte_element;
	let svelte_element_class_value;
	let useActions_action;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[28].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[32], null);

	let svelte_element_levels = [
		{
			class: svelte_element_class_value = "" + (/*className*/ ctx[2] + " " + /*BoxStyles*/ ctx[7]({
				css: {
					.../*getCSSStyles*/ ctx[11](/*theme*/ ctx[10]),
					.../*systemStyles*/ ctx[6]
				}
			}))
		},
		/*$$restProps*/ ctx[12]
	];

	let svelte_element_data = {};

	for (let i = 0; i < svelte_element_levels.length; i += 1) {
		svelte_element_data = assign(svelte_element_data, svelte_element_levels[i]);
	}

	return {
		c() {
			svelte_element = element(/*castRoot*/ ctx[9]());
			if (default_slot) default_slot.c();

			if ((/-/).test(/*castRoot*/ ctx[9]())) {
				set_custom_element_data_map(svelte_element, svelte_element_data);
			} else {
				set_attributes(svelte_element, svelte_element_data);
			}
		},
		m(target, anchor) {
			insert(target, svelte_element, anchor);

			if (default_slot) {
				default_slot.m(svelte_element, null);
			}

			/*svelte_element_binding*/ ctx[29](svelte_element);
			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer(/*forwardEvents*/ ctx[8].call(null, svelte_element)),
					action_destroyer(useActions_action = useActions.call(null, svelte_element, /*use*/ ctx[1]))
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty[1] & /*$$scope*/ 2)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[32],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[32])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[32], dirty, null),
						null
					);
				}
			}

			svelte_element_data = get_spread_update(svelte_element_levels, [
				(!current || dirty[0] & /*className, BoxStyles, systemStyles*/ 196 && svelte_element_class_value !== (svelte_element_class_value = "" + (/*className*/ ctx[2] + " " + /*BoxStyles*/ ctx[7]({
					css: {
						.../*getCSSStyles*/ ctx[11](/*theme*/ ctx[10]),
						.../*systemStyles*/ ctx[6]
					}
				})))) && { class: svelte_element_class_value },
				dirty[0] & /*$$restProps*/ 4096 && /*$$restProps*/ ctx[12]
			]);

			if ((/-/).test(/*castRoot*/ ctx[9]())) {
				set_custom_element_data_map(svelte_element, svelte_element_data);
			} else {
				set_attributes(svelte_element, svelte_element_data);
			}

			if (useActions_action && is_function(useActions_action.update) && dirty[0] & /*use*/ 2) useActions_action.update.call(null, /*use*/ ctx[1]);
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(svelte_element);
			if (default_slot) default_slot.d(detaching);
			/*svelte_element_binding*/ ctx[29](null);
			mounted = false;
			run_all(dispose);
		}
	};
}

function create_fragment$j(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block$7, create_if_block_1$5, create_else_block$2];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*isHTMLElement*/ ctx[4]) return 0;
		if (/*isComponent*/ ctx[5] && typeof /*root*/ ctx[3] !== 'string') return 1;
		return 2;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function instance$j($$self, $$props, $$invalidate) {
	let BoxStyles;
	let systemStyles;

	const omit_props_names = [
		"use","element","class","css","root","m","my","mx","mt","mb","ml","mr","p","py","px","pt","pb","pl","pr"
	];

	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	let { use = [], element = undefined, class: className = '', css: css$1 = {}, root = undefined, m = undefined, my = undefined, mx = undefined, mt = undefined, mb = undefined, ml = undefined, mr = undefined, p = undefined, py = undefined, px = undefined, pt = undefined, pb = undefined, pl = undefined, pr = undefined } = $$props;

	/** An action that forwards inner dom node events from parent component */
	const forwardEvents = createEventForwarder(get_current_component());

	/** workaround for root type errors, this should be replaced by a better type system */
	const castRoot = () => root;

	const theme = useSvelteUIThemeContext()?.theme || useSvelteUITheme();
	const getCSSStyles = typeof css$1 === 'function' ? css$1 : () => css$1;
	let isHTMLElement;
	let isComponent;

	function svelte_element_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			element = $$value;
			$$invalidate(0, element);
		});
	}

	function switch_instance_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			element = $$value;
			$$invalidate(0, element);
		});
	}

	function div_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			element = $$value;
			$$invalidate(0, element);
		});
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(12, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('use' in $$new_props) $$invalidate(1, use = $$new_props.use);
		if ('element' in $$new_props) $$invalidate(0, element = $$new_props.element);
		if ('class' in $$new_props) $$invalidate(2, className = $$new_props.class);
		if ('css' in $$new_props) $$invalidate(13, css$1 = $$new_props.css);
		if ('root' in $$new_props) $$invalidate(3, root = $$new_props.root);
		if ('m' in $$new_props) $$invalidate(14, m = $$new_props.m);
		if ('my' in $$new_props) $$invalidate(15, my = $$new_props.my);
		if ('mx' in $$new_props) $$invalidate(16, mx = $$new_props.mx);
		if ('mt' in $$new_props) $$invalidate(17, mt = $$new_props.mt);
		if ('mb' in $$new_props) $$invalidate(18, mb = $$new_props.mb);
		if ('ml' in $$new_props) $$invalidate(19, ml = $$new_props.ml);
		if ('mr' in $$new_props) $$invalidate(20, mr = $$new_props.mr);
		if ('p' in $$new_props) $$invalidate(21, p = $$new_props.p);
		if ('py' in $$new_props) $$invalidate(22, py = $$new_props.py);
		if ('px' in $$new_props) $$invalidate(23, px = $$new_props.px);
		if ('pt' in $$new_props) $$invalidate(24, pt = $$new_props.pt);
		if ('pb' in $$new_props) $$invalidate(25, pb = $$new_props.pb);
		if ('pl' in $$new_props) $$invalidate(26, pl = $$new_props.pl);
		if ('pr' in $$new_props) $$invalidate(27, pr = $$new_props.pr);
		if ('$$scope' in $$new_props) $$invalidate(32, $$scope = $$new_props.$$scope);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*root*/ 8) {
			{
				$$invalidate(4, isHTMLElement = root && typeof root === 'string');
				$$invalidate(5, isComponent = root && typeof root === 'function');
			}
		}

		if ($$self.$$.dirty[0] & /*m, my, mx, mt, mb, ml, mr, p, py, px, pt, pb, pl, pr*/ 268419072) {
			$$invalidate(6, systemStyles = getSystemStyles(
				{
					m,
					my,
					mx,
					mt,
					mb,
					ml,
					mr,
					p,
					py,
					px,
					pt,
					pb,
					pl,
					pr
				},
				theme
			));
		}
	};

	$$invalidate(7, BoxStyles = css({}));

	return [
		element,
		use,
		className,
		root,
		isHTMLElement,
		isComponent,
		systemStyles,
		BoxStyles,
		forwardEvents,
		castRoot,
		theme,
		getCSSStyles,
		$$restProps,
		css$1,
		m,
		my,
		mx,
		mt,
		mb,
		ml,
		mr,
		p,
		py,
		px,
		pt,
		pb,
		pl,
		pr,
		slots,
		svelte_element_binding,
		switch_instance_binding,
		div_binding,
		$$scope
	];
}

class Box extends SvelteComponent {
	constructor(options) {
		super();

		init(
			this,
			options,
			instance$j,
			create_fragment$j,
			safe_not_equal,
			{
				use: 1,
				element: 0,
				class: 2,
				css: 13,
				root: 3,
				m: 14,
				my: 15,
				mx: 16,
				mt: 17,
				mb: 18,
				ml: 19,
				mr: 20,
				p: 21,
				py: 22,
				px: 23,
				pt: 24,
				pb: 25,
				pl: 26,
				pr: 27
			},
			null,
			[-1, -1]
		);
	}
}

const Box$1 = Box;

/* node_modules/.pnpm/@svelteuidev+core@0.9.0_ypfjxaydaa2meuohvziy3hvz6y/node_modules/@svelteuidev/core/components/Loader/loaders/Circle.svelte generated by Svelte v3.55.1 */

function create_fragment$i(ctx) {
	let svg;
	let g1;
	let g0;
	let circle;
	let path;
	let animateTransform;
	let svg_width_value;
	let svg_height_value;
	let useActions_action;
	let mounted;
	let dispose;

	return {
		c() {
			svg = svg_element("svg");
			g1 = svg_element("g");
			g0 = svg_element("g");
			circle = svg_element("circle");
			path = svg_element("path");
			animateTransform = svg_element("animateTransform");
			attr(circle, "stroke-opacity", ".5");
			attr(circle, "cx", "16");
			attr(circle, "cy", "16");
			attr(circle, "r", "16");
			attr(animateTransform, "attributeName", "transform");
			attr(animateTransform, "type", "rotate");
			attr(animateTransform, "from", "0 16 16");
			attr(animateTransform, "to", "360 16 16");
			attr(animateTransform, "dur", "1s");
			attr(animateTransform, "repeatCount", "indefinite");
			attr(path, "d", "M32 16c0-9.94-8.06-16-16-16");
			attr(g0, "transform", "translate(2.5 2.5)");
			attr(g0, "stroke-width", "5");
			attr(g1, "fill", "none");
			attr(g1, "fill-rule", "evenodd");
			attr(svg, "width", svg_width_value = `${/*size*/ ctx[1]}px`);
			attr(svg, "height", svg_height_value = `${/*size*/ ctx[1]}px`);
			attr(svg, "viewBox", "0 0 38 38");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr(svg, "stroke", /*color*/ ctx[2]);
			attr(svg, "class", /*className*/ ctx[3]);
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, g1);
			append(g1, g0);
			append(g0, circle);
			append(g0, path);
			append(path, animateTransform);

			if (!mounted) {
				dispose = action_destroyer(useActions_action = useActions.call(null, svg, /*use*/ ctx[0]));
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*size*/ 2 && svg_width_value !== (svg_width_value = `${/*size*/ ctx[1]}px`)) {
				attr(svg, "width", svg_width_value);
			}

			if (dirty & /*size*/ 2 && svg_height_value !== (svg_height_value = `${/*size*/ ctx[1]}px`)) {
				attr(svg, "height", svg_height_value);
			}

			if (dirty & /*color*/ 4) {
				attr(svg, "stroke", /*color*/ ctx[2]);
			}

			if (dirty & /*className*/ 8) {
				attr(svg, "class", /*className*/ ctx[3]);
			}

			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(svg);
			mounted = false;
			dispose();
		}
	};
}

function instance$i($$self, $$props, $$invalidate) {
	let { use = [] } = $$props;
	let { size = 25 } = $$props;
	let { color = 'blue' } = $$props;
	let { class: className = '' } = $$props;

	$$self.$$set = $$props => {
		if ('use' in $$props) $$invalidate(0, use = $$props.use);
		if ('size' in $$props) $$invalidate(1, size = $$props.size);
		if ('color' in $$props) $$invalidate(2, color = $$props.color);
		if ('class' in $$props) $$invalidate(3, className = $$props.class);
	};

	return [use, size, color, className];
}

class Circle extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$i, create_fragment$i, safe_not_equal, { use: 0, size: 1, color: 2, class: 3 });
	}
}

const Circle$1 = Circle;

/* node_modules/.pnpm/@svelteuidev+core@0.9.0_ypfjxaydaa2meuohvziy3hvz6y/node_modules/@svelteuidev/core/components/Loader/loaders/Bars.svelte generated by Svelte v3.55.1 */

function create_fragment$h(ctx) {
	let svg;
	let rect0;
	let animate0;
	let animate1;
	let rect1;
	let animate2;
	let animate3;
	let rect2;
	let animate4;
	let animate5;
	let rect3;
	let animate6;
	let animate7;
	let rect4;
	let animate8;
	let animate9;
	let svg_width_value;
	let useActions_action;
	let mounted;
	let dispose;

	return {
		c() {
			svg = svg_element("svg");
			rect0 = svg_element("rect");
			animate0 = svg_element("animate");
			animate1 = svg_element("animate");
			rect1 = svg_element("rect");
			animate2 = svg_element("animate");
			animate3 = svg_element("animate");
			rect2 = svg_element("rect");
			animate4 = svg_element("animate");
			animate5 = svg_element("animate");
			rect3 = svg_element("rect");
			animate6 = svg_element("animate");
			animate7 = svg_element("animate");
			rect4 = svg_element("rect");
			animate8 = svg_element("animate");
			animate9 = svg_element("animate");
			attr(animate0, "attributeName", "height");
			attr(animate0, "begin", "0.5s");
			attr(animate0, "dur", "1s");
			attr(animate0, "values", "120;110;100;90;80;70;60;50;40;140;120");
			attr(animate0, "calcMode", "linear");
			attr(animate0, "repeatCount", "indefinite");
			attr(animate1, "attributeName", "y");
			attr(animate1, "begin", "0.5s");
			attr(animate1, "dur", "1s");
			attr(animate1, "values", "10;15;20;25;30;35;40;45;50;0;10");
			attr(animate1, "calcMode", "linear");
			attr(animate1, "repeatCount", "indefinite");
			attr(rect0, "y", "10");
			attr(rect0, "width", "15");
			attr(rect0, "height", "120");
			attr(rect0, "rx", "6");
			attr(animate2, "attributeName", "height");
			attr(animate2, "begin", "0.25s");
			attr(animate2, "dur", "1s");
			attr(animate2, "values", "120;110;100;90;80;70;60;50;40;140;120");
			attr(animate2, "calcMode", "linear");
			attr(animate2, "repeatCount", "indefinite");
			attr(animate3, "attributeName", "y");
			attr(animate3, "begin", "0.25s");
			attr(animate3, "dur", "1s");
			attr(animate3, "values", "10;15;20;25;30;35;40;45;50;0;10");
			attr(animate3, "calcMode", "linear");
			attr(animate3, "repeatCount", "indefinite");
			attr(rect1, "x", "30");
			attr(rect1, "y", "10");
			attr(rect1, "width", "15");
			attr(rect1, "height", "120");
			attr(rect1, "rx", "6");
			attr(animate4, "attributeName", "height");
			attr(animate4, "begin", "0s");
			attr(animate4, "dur", "1s");
			attr(animate4, "values", "120;110;100;90;80;70;60;50;40;140;120");
			attr(animate4, "calcMode", "linear");
			attr(animate4, "repeatCount", "indefinite");
			attr(animate5, "attributeName", "y");
			attr(animate5, "begin", "0s");
			attr(animate5, "dur", "1s");
			attr(animate5, "values", "10;15;20;25;30;35;40;45;50;0;10");
			attr(animate5, "calcMode", "linear");
			attr(animate5, "repeatCount", "indefinite");
			attr(rect2, "x", "60");
			attr(rect2, "width", "15");
			attr(rect2, "height", "140");
			attr(rect2, "rx", "6");
			attr(animate6, "attributeName", "height");
			attr(animate6, "begin", "0.25s");
			attr(animate6, "dur", "1s");
			attr(animate6, "values", "120;110;100;90;80;70;60;50;40;140;120");
			attr(animate6, "calcMode", "linear");
			attr(animate6, "repeatCount", "indefinite");
			attr(animate7, "attributeName", "y");
			attr(animate7, "begin", "0.25s");
			attr(animate7, "dur", "1s");
			attr(animate7, "values", "10;15;20;25;30;35;40;45;50;0;10");
			attr(animate7, "calcMode", "linear");
			attr(animate7, "repeatCount", "indefinite");
			attr(rect3, "x", "90");
			attr(rect3, "y", "10");
			attr(rect3, "width", "15");
			attr(rect3, "height", "120");
			attr(rect3, "rx", "6");
			attr(animate8, "attributeName", "height");
			attr(animate8, "begin", "0.5s");
			attr(animate8, "dur", "1s");
			attr(animate8, "values", "120;110;100;90;80;70;60;50;40;140;120");
			attr(animate8, "calcMode", "linear");
			attr(animate8, "repeatCount", "indefinite");
			attr(animate9, "attributeName", "y");
			attr(animate9, "begin", "0.5s");
			attr(animate9, "dur", "1s");
			attr(animate9, "values", "10;15;20;25;30;35;40;45;50;0;10");
			attr(animate9, "calcMode", "linear");
			attr(animate9, "repeatCount", "indefinite");
			attr(rect4, "x", "120");
			attr(rect4, "y", "10");
			attr(rect4, "width", "15");
			attr(rect4, "height", "120");
			attr(rect4, "rx", "6");
			attr(svg, "viewBox", "0 0 135 140");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr(svg, "fill", /*color*/ ctx[2]);
			attr(svg, "width", svg_width_value = `${/*size*/ ctx[1]}px`);
			attr(svg, "class", /*className*/ ctx[3]);
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, rect0);
			append(rect0, animate0);
			append(rect0, animate1);
			append(svg, rect1);
			append(rect1, animate2);
			append(rect1, animate3);
			append(svg, rect2);
			append(rect2, animate4);
			append(rect2, animate5);
			append(svg, rect3);
			append(rect3, animate6);
			append(rect3, animate7);
			append(svg, rect4);
			append(rect4, animate8);
			append(rect4, animate9);

			if (!mounted) {
				dispose = action_destroyer(useActions_action = useActions.call(null, svg, /*use*/ ctx[0]));
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*color*/ 4) {
				attr(svg, "fill", /*color*/ ctx[2]);
			}

			if (dirty & /*size*/ 2 && svg_width_value !== (svg_width_value = `${/*size*/ ctx[1]}px`)) {
				attr(svg, "width", svg_width_value);
			}

			if (dirty & /*className*/ 8) {
				attr(svg, "class", /*className*/ ctx[3]);
			}

			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(svg);
			mounted = false;
			dispose();
		}
	};
}

function instance$h($$self, $$props, $$invalidate) {
	let { use = [] } = $$props;
	let { size = 25 } = $$props;
	let { color = 'blue' } = $$props;
	let { class: className = '' } = $$props;

	$$self.$$set = $$props => {
		if ('use' in $$props) $$invalidate(0, use = $$props.use);
		if ('size' in $$props) $$invalidate(1, size = $$props.size);
		if ('color' in $$props) $$invalidate(2, color = $$props.color);
		if ('class' in $$props) $$invalidate(3, className = $$props.class);
	};

	return [use, size, color, className];
}

class Bars extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$h, create_fragment$h, safe_not_equal, { use: 0, size: 1, color: 2, class: 3 });
	}
}

const Bars$1 = Bars;

/* node_modules/.pnpm/@svelteuidev+core@0.9.0_ypfjxaydaa2meuohvziy3hvz6y/node_modules/@svelteuidev/core/components/Loader/loaders/Dots.svelte generated by Svelte v3.55.1 */

function create_fragment$g(ctx) {
	let svg;
	let circle0;
	let animate0;
	let animate1;
	let circle1;
	let animate2;
	let animate3;
	let circle2;
	let animate4;
	let animate5;
	let svg_width_value;
	let svg_height_value;
	let useActions_action;
	let mounted;
	let dispose;

	return {
		c() {
			svg = svg_element("svg");
			circle0 = svg_element("circle");
			animate0 = svg_element("animate");
			animate1 = svg_element("animate");
			circle1 = svg_element("circle");
			animate2 = svg_element("animate");
			animate3 = svg_element("animate");
			circle2 = svg_element("circle");
			animate4 = svg_element("animate");
			animate5 = svg_element("animate");
			attr(animate0, "attributeName", "r");
			attr(animate0, "from", "15");
			attr(animate0, "to", "15");
			attr(animate0, "begin", "0s");
			attr(animate0, "dur", "0.8s");
			attr(animate0, "values", "15;9;15");
			attr(animate0, "calcMode", "linear");
			attr(animate0, "repeatCount", "indefinite");
			attr(animate1, "attributeName", "fill-opacity");
			attr(animate1, "from", "1");
			attr(animate1, "to", "1");
			attr(animate1, "begin", "0s");
			attr(animate1, "dur", "0.8s");
			attr(animate1, "values", "1;.5;1");
			attr(animate1, "calcMode", "linear");
			attr(animate1, "repeatCount", "indefinite");
			attr(circle0, "cx", "15");
			attr(circle0, "cy", "15");
			attr(circle0, "r", "15");
			attr(animate2, "attributeName", "r");
			attr(animate2, "from", "9");
			attr(animate2, "to", "9");
			attr(animate2, "begin", "0s");
			attr(animate2, "dur", "0.8s");
			attr(animate2, "values", "9;15;9");
			attr(animate2, "calcMode", "linear");
			attr(animate2, "repeatCount", "indefinite");
			attr(animate3, "attributeName", "fill-opacity");
			attr(animate3, "from", "0.5");
			attr(animate3, "to", "0.5");
			attr(animate3, "begin", "0s");
			attr(animate3, "dur", "0.8s");
			attr(animate3, "values", ".5;1;.5");
			attr(animate3, "calcMode", "linear");
			attr(animate3, "repeatCount", "indefinite");
			attr(circle1, "cx", "60");
			attr(circle1, "cy", "15");
			attr(circle1, "r", "9");
			attr(circle1, "fill-opacity", "0.3");
			attr(animate4, "attributeName", "r");
			attr(animate4, "from", "15");
			attr(animate4, "to", "15");
			attr(animate4, "begin", "0s");
			attr(animate4, "dur", "0.8s");
			attr(animate4, "values", "15;9;15");
			attr(animate4, "calcMode", "linear");
			attr(animate4, "repeatCount", "indefinite");
			attr(animate5, "attributeName", "fill-opacity");
			attr(animate5, "from", "1");
			attr(animate5, "to", "1");
			attr(animate5, "begin", "0s");
			attr(animate5, "dur", "0.8s");
			attr(animate5, "values", "1;.5;1");
			attr(animate5, "calcMode", "linear");
			attr(animate5, "repeatCount", "indefinite");
			attr(circle2, "cx", "105");
			attr(circle2, "cy", "15");
			attr(circle2, "r", "15");
			attr(svg, "width", svg_width_value = `${/*size*/ ctx[1]}px`);
			attr(svg, "height", svg_height_value = `${Number(/*size*/ ctx[1]) / 4}px`);
			attr(svg, "viewBox", "0 0 120 30");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr(svg, "fill", /*color*/ ctx[2]);
			attr(svg, "class", /*className*/ ctx[3]);
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, circle0);
			append(circle0, animate0);
			append(circle0, animate1);
			append(svg, circle1);
			append(circle1, animate2);
			append(circle1, animate3);
			append(svg, circle2);
			append(circle2, animate4);
			append(circle2, animate5);

			if (!mounted) {
				dispose = action_destroyer(useActions_action = useActions.call(null, svg, /*use*/ ctx[0]));
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*size*/ 2 && svg_width_value !== (svg_width_value = `${/*size*/ ctx[1]}px`)) {
				attr(svg, "width", svg_width_value);
			}

			if (dirty & /*size*/ 2 && svg_height_value !== (svg_height_value = `${Number(/*size*/ ctx[1]) / 4}px`)) {
				attr(svg, "height", svg_height_value);
			}

			if (dirty & /*color*/ 4) {
				attr(svg, "fill", /*color*/ ctx[2]);
			}

			if (dirty & /*className*/ 8) {
				attr(svg, "class", /*className*/ ctx[3]);
			}

			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(svg);
			mounted = false;
			dispose();
		}
	};
}

function instance$g($$self, $$props, $$invalidate) {
	let { use = [] } = $$props;
	let { size = 25 } = $$props;
	let { color = 'blue' } = $$props;
	let { class: className = '' } = $$props;

	$$self.$$set = $$props => {
		if ('use' in $$props) $$invalidate(0, use = $$props.use);
		if ('size' in $$props) $$invalidate(1, size = $$props.size);
		if ('color' in $$props) $$invalidate(2, color = $$props.color);
		if ('class' in $$props) $$invalidate(3, className = $$props.class);
	};

	return [use, size, color, className];
}

class Dots extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$g, create_fragment$g, safe_not_equal, { use: 0, size: 1, color: 2, class: 3 });
	}
}

const Dots$1 = Dots;

const LOADER_SIZES = {
    xs: 18,
    sm: 22,
    md: 36,
    lg: 44,
    xl: 58
};
const getCorrectShade = (color, dark = false) => {
    return theme.colors[dark ? `${color}400` : `${color}600`].value;
};

/* node_modules/.pnpm/@svelteuidev+core@0.9.0_ypfjxaydaa2meuohvziy3hvz6y/node_modules/@svelteuidev/core/components/Loader/Loader.svelte generated by Svelte v3.55.1 */

function create_fragment$f(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;

	const switch_instance_spread_levels = [
		{
			use: [/*forwardEvents*/ ctx[5], [useActions, /*use*/ ctx[1]]]
		},
		{
			color: /*color*/ ctx[4] === 'white'
			? 'white'
			: getCorrectShade(/*color*/ ctx[4])
		},
		{ size: LOADER_SIZES[/*size*/ ctx[3]] },
		{ class: /*className*/ ctx[2] },
		/*$$restProps*/ ctx[8]
	];

	var switch_value = /*LOADERS*/ ctx[6][/*defaultLoader*/ ctx[7]];

	function switch_props(ctx) {
		let switch_instance_props = {};

		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
		}

		return { props: switch_instance_props };
	}

	if (switch_value) {
		switch_instance = construct_svelte_component(switch_value, switch_props());
		/*switch_instance_binding*/ ctx[10](switch_instance);
	}

	return {
		c() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		m(target, anchor) {
			if (switch_instance) mount_component(switch_instance, target, anchor);
			insert(target, switch_instance_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const switch_instance_changes = (dirty & /*forwardEvents, useActions, use, color, getCorrectShade, LOADER_SIZES, size, className, $$restProps*/ 318)
			? get_spread_update(switch_instance_spread_levels, [
					dirty & /*forwardEvents, useActions, use*/ 34 && {
						use: [/*forwardEvents*/ ctx[5], [useActions, /*use*/ ctx[1]]]
					},
					dirty & /*color, getCorrectShade*/ 16 && {
						color: /*color*/ ctx[4] === 'white'
						? 'white'
						: getCorrectShade(/*color*/ ctx[4])
					},
					dirty & /*LOADER_SIZES, size*/ 8 && { size: LOADER_SIZES[/*size*/ ctx[3]] },
					dirty & /*className*/ 4 && { class: /*className*/ ctx[2] },
					dirty & /*$$restProps*/ 256 && get_spread_object(/*$$restProps*/ ctx[8])
				])
			: {};

			if (switch_value !== (switch_value = /*LOADERS*/ ctx[6][/*defaultLoader*/ ctx[7]])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = construct_svelte_component(switch_value, switch_props());
					/*switch_instance_binding*/ ctx[10](switch_instance);
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			/*switch_instance_binding*/ ctx[10](null);
			if (detaching) detach(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};
}

function instance$f($$self, $$props, $$invalidate) {
	const omit_props_names = ["use","element","class","size","color","variant"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { use = [], element = undefined, class: className = '', size = 'md', color = 'blue', variant = 'circle' } = $$props;

	/** An action that forwards inner dom node events from parent component */
	const forwardEvents = createEventForwarder(get_current_component());

	/** Loader logic */
	const LOADERS = { bars: Bars$1, circle: Circle$1, dots: Dots$1 };

	const defaultLoader = variant in LOADERS ? variant : 'circle';

	function switch_instance_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			element = $$value;
			$$invalidate(0, element);
		});
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(8, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('use' in $$new_props) $$invalidate(1, use = $$new_props.use);
		if ('element' in $$new_props) $$invalidate(0, element = $$new_props.element);
		if ('class' in $$new_props) $$invalidate(2, className = $$new_props.class);
		if ('size' in $$new_props) $$invalidate(3, size = $$new_props.size);
		if ('color' in $$new_props) $$invalidate(4, color = $$new_props.color);
		if ('variant' in $$new_props) $$invalidate(9, variant = $$new_props.variant);
	};

	return [
		element,
		use,
		className,
		size,
		color,
		forwardEvents,
		LOADERS,
		defaultLoader,
		$$restProps,
		variant,
		switch_instance_binding
	];
}

class Loader extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$f, create_fragment$f, safe_not_equal, {
			use: 1,
			element: 0,
			class: 2,
			size: 3,
			color: 4,
			variant: 9
		});
	}
}

const Loader$1 = Loader;

const useStyles$5 = createStyles((theme, { iconSize }) => {
    return {
        root: {
            focusRing: 'auto',
            position: 'relative',
            appearance: 'none',
            WebkitAppearance: 'none',
            WebkitTapHighlightColor: 'transparent',
            boxSizing: 'border-box',
            height: `${theme.fn.size({ size: iconSize, sizes: theme.space })}px`,
            minHeight: `${theme.fn.size({ size: iconSize, sizes: theme.space })}px`,
            width: `${theme.fn.size({ size: iconSize, sizes: theme.space })}px`,
            minWidth: `${theme.fn.size({ size: iconSize, sizes: theme.space })}px`,
            padding: 0,
            lineHeight: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            textDecoration: 'none'
        },
        icon: {
            height: `${theme.fn.size({ size: iconSize, sizes: theme.space })}px`,
            minHeight: `${theme.fn.size({ size: iconSize, sizes: theme.space })}px`,
            position: 'static',
            margin: 0,
            ml: 0,
            mr: 0,
            mt: 0,
            mb: 0
        }
    };
});

/* node_modules/.pnpm/@svelteuidev+core@0.9.0_ypfjxaydaa2meuohvziy3hvz6y/node_modules/@svelteuidev/core/components/IconRenderer/IconRenderer.svelte generated by Svelte v3.55.1 */

function create_if_block_1$4(ctx) {
	let if_block_anchor;
	let if_block = (/*icon*/ ctx[2] instanceof HTMLElement || /*icon*/ ctx[2] instanceof SVGElement) && create_if_block_2$4(ctx);

	return {
		c() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
		},
		p(ctx, dirty) {
			if (/*icon*/ ctx[2] instanceof HTMLElement || /*icon*/ ctx[2] instanceof SVGElement) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_2$4(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

// (11:0) {#if typeof icon === 'function'}
function create_if_block$6(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;

	const switch_instance_spread_levels = [
		{
			class: /*cx*/ ctx[5](/*className*/ ctx[0], /*getStyles*/ ctx[4]({ css: /*override*/ ctx[1] }))
		},
		/*iconProps*/ ctx[3]
	];

	var switch_value = /*icon*/ ctx[2];

	function switch_props(ctx) {
		let switch_instance_props = {};

		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
		}

		return { props: switch_instance_props };
	}

	if (switch_value) {
		switch_instance = construct_svelte_component(switch_value, switch_props());
	}

	return {
		c() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		m(target, anchor) {
			if (switch_instance) mount_component(switch_instance, target, anchor);
			insert(target, switch_instance_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const switch_instance_changes = (dirty & /*cx, className, getStyles, override, iconProps*/ 59)
			? get_spread_update(switch_instance_spread_levels, [
					dirty & /*cx, className, getStyles, override*/ 51 && {
						class: /*cx*/ ctx[5](/*className*/ ctx[0], /*getStyles*/ ctx[4]({ css: /*override*/ ctx[1] }))
					},
					dirty & /*iconProps*/ 8 && get_spread_object(/*iconProps*/ ctx[3])
				])
			: {};

			if (switch_value !== (switch_value = /*icon*/ ctx[2])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = construct_svelte_component(switch_value, switch_props());
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};
}

// (18:1) {#if icon instanceof HTMLElement || icon instanceof SVGElement}
function create_if_block_2$4(ctx) {
	let span;
	let raw_value = /*icon*/ ctx[2].outerHTML + "";
	let span_class_value;

	return {
		c() {
			span = element("span");
			attr(span, "class", span_class_value = /*cx*/ ctx[5](/*className*/ ctx[0], /*getStyles*/ ctx[4]({ css: /*override*/ ctx[1] })));
		},
		m(target, anchor) {
			insert(target, span, anchor);
			span.innerHTML = raw_value;
		},
		p(ctx, dirty) {
			if (dirty & /*icon*/ 4 && raw_value !== (raw_value = /*icon*/ ctx[2].outerHTML + "")) span.innerHTML = raw_value;
			if (dirty & /*cx, className, getStyles, override*/ 51 && span_class_value !== (span_class_value = /*cx*/ ctx[5](/*className*/ ctx[0], /*getStyles*/ ctx[4]({ css: /*override*/ ctx[1] })))) {
				attr(span, "class", span_class_value);
			}
		},
		d(detaching) {
			if (detaching) detach(span);
		}
	};
}

function create_fragment$e(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block$6, create_if_block_1$4];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (typeof /*icon*/ ctx[2] === 'function') return 0;
		if (!/*requiresShim*/ ctx[6]) return 1;
		return -1;
	}

	if (~(current_block_type_index = select_block_type(ctx))) {
		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	}

	return {
		c() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if (~current_block_type_index) {
				if_blocks[current_block_type_index].m(target, anchor);
			}

			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if (~current_block_type_index) {
					if_blocks[current_block_type_index].p(ctx, dirty);
				}
			} else {
				if (if_block) {
					group_outros();

					transition_out(if_blocks[previous_block_index], 1, 1, () => {
						if_blocks[previous_block_index] = null;
					});

					check_outros();
				}

				if (~current_block_type_index) {
					if_block = if_blocks[current_block_type_index];

					if (!if_block) {
						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
						if_block.c();
					} else {
						if_block.p(ctx, dirty);
					}

					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				} else {
					if_block = null;
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (~current_block_type_index) {
				if_blocks[current_block_type_index].d(detaching);
			}

			if (detaching) detach(if_block_anchor);
		}
	};
}

function instance$e($$self, $$props, $$invalidate) {
	let cx;
	let getStyles;
	let classes;
	let { className = '', override = {}, icon = undefined, iconSize = 16, iconProps = {} } = $$props;

	// Verifies if CSR only elements are defined, or else it won't use them
	const requiresShim = typeof HTMLElement === 'undefined' && typeof SVGElement === 'undefined';

	$$self.$$set = $$props => {
		if ('className' in $$props) $$invalidate(0, className = $$props.className);
		if ('override' in $$props) $$invalidate(1, override = $$props.override);
		if ('icon' in $$props) $$invalidate(2, icon = $$props.icon);
		if ('iconSize' in $$props) $$invalidate(7, iconSize = $$props.iconSize);
		if ('iconProps' in $$props) $$invalidate(3, iconProps = $$props.iconProps);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*iconSize*/ 128) {
			$$invalidate(5, { cx, getStyles, classes } = useStyles$5({ iconSize }, { name: 'IconRenderer' }), cx, ($$invalidate(4, getStyles), $$invalidate(7, iconSize)), ($$invalidate(8, classes), $$invalidate(7, iconSize)));
		}

		if ($$self.$$.dirty & /*icon, classes*/ 260) {
			if (!requiresShim && (icon instanceof HTMLElement || icon instanceof SVGElement)) {
				icon.classList.add(...classes.icon.split(' '));
			}
		}
	};

	return [
		className,
		override,
		icon,
		iconProps,
		getStyles,
		cx,
		requiresShim,
		iconSize,
		classes
	];
}

class IconRenderer extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$e, create_fragment$e, safe_not_equal, {
			className: 0,
			override: 1,
			icon: 2,
			iconSize: 7,
			iconProps: 3
		});
	}
}

const IconRenderer$1 = IconRenderer;

function getTextColor(color, variant, gradient, dark = false) {
    if (color === 'dimmed')
        return dark ? '$dark200' : '$gray600';
    if (variant === 'gradient' || gradient)
        return `$${color}600`;
    if (variant === 'link')
        return dark ? `$blue400` : `$blue700`;
    if (variant === 'text')
        return dark ? `$${color}500` : `$${color}700`;
}
const useStyles$4 = createStyles((theme, { align, color, inherit, inline, lineClamp, size, tracking, transform, underline, weight, gradient, variant }) => {
    return {
        root: {
            focusRing: 'auto',
            [`${theme.dark} &`]: {
                color: color === 'dark' ? '$dark50' : getTextColor(color, variant, gradient, true)
            },
            fontFamily: inherit ? 'inherit' : '$standard',
            fontSize: inherit ? 'inherit' : typeof size === 'string' ? `$${size}` : `${size}px`,
            fontWeight: inherit ? 'inherit' : `$${weight}`,
            letterSpacing: theme.letterSpacings[tracking]?.value,
            lineHeight: inherit
                ? 'inherit'
                : inline
                    ? 1
                    : typeof size === 'string'
                        ? `$${size}`
                        : `${size}px`,
            textTransform: transform,
            textDecoration: underline ? 'underline' : 'none',
            textAlign: align,
            cursor: variant === 'link' ? 'pointer' : 'inherit',
            color: color === 'green' ? 'Black' : getTextColor(color, variant, gradient),
            backgroundImage: variant === 'gradient'
                ? `linear-gradient(${gradient?.deg}deg, $${gradient?.from}600 0%, $${gradient?.to}600 100%)`
                : null,
            WebkitBackgroundClip: variant === 'gradient' ? 'text' : null,
            WebkitTextFillColor: variant === 'gradient' ? 'transparent' : null,
            ...(lineClamp !== undefined
                ? {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: lineClamp,
                    WebkitBoxOrient: 'vertical'
                }
                : {}),
            '&:hover': variant === 'link' && underline === true
                ? {
                    textDecoration: 'underline'
                }
                : undefined
        }
    };
});

/** Error codes for component Text
 *
 * `Object.freeze` is needed to keep modification outside of the object unavailable
 *
 * ## Code 1:
 * If using the 'gradient' prop, set 'variant' prop to 'gradient' to apply the gradient
 *
 * ## Code 2:
 * If using the 'link' variant, an href needs to be set and the root must be an anchor
 */
const TextErrors = Object.freeze([
    {
        error: true,
        message: "If using the 'gradient' prop, set 'variant' prop to 'gradient' to apply the gradient",
        solution: `
                If your component looks like this:

                &lt;Text gradient={{from: 'blue', to: 'red', deg: 45}}&gt;Text string &lt;/Text&gt;
                                                                    ^^^ - Try adding prop variant='gradient'
                `
    },
    {
        error: true,
        message: "If using the 'link' variant, an href needs to be set and the root must be an anchor",
        solution: `
                If your component looks like this:

                &lt;Text variant='link'&gt;Text string &lt;/Text&gt;
                                    ^^^ - Try adding props href && root={'a'}'
                `
    }
]);

/* node_modules/.pnpm/@svelteuidev+core@0.9.0_ypfjxaydaa2meuohvziy3hvz6y/node_modules/@svelteuidev/core/components/Text/Text.svelte generated by Svelte v3.55.1 */

function create_default_slot$7(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[24].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[26], null);

	return {
		c() {
			if (default_slot) default_slot.c();
		},
		m(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 67108864)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[26],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[26])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[26], dirty, null),
						null
					);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};
}

function create_fragment$d(ctx) {
	let error;
	let t;
	let box;
	let updating_element;
	let current;

	error = new Error$2({
			props: {
				observable: /*observable*/ ctx[6],
				component: "Text",
				code: /*err*/ ctx[7]
			}
		});

	const box_spread_levels = [
		{ root: /*root*/ ctx[4] },
		{
			use: [/*forwardEvents*/ ctx[10], [useActions, /*use*/ ctx[1]]]
		},
		{
			class: /*cx*/ ctx[9](/*className*/ ctx[2], /*getStyles*/ ctx[8]({ css: /*override*/ ctx[3] }))
		},
		{ href: /*href*/ ctx[5] ?? undefined },
		/*$$restProps*/ ctx[11]
	];

	function box_element_binding(value) {
		/*box_element_binding*/ ctx[25](value);
	}

	let box_props = {
		$$slots: { default: [create_default_slot$7] },
		$$scope: { ctx }
	};

	for (let i = 0; i < box_spread_levels.length; i += 1) {
		box_props = assign(box_props, box_spread_levels[i]);
	}

	if (/*element*/ ctx[0] !== void 0) {
		box_props.element = /*element*/ ctx[0];
	}

	box = new Box$1({ props: box_props });
	binding_callbacks.push(() => bind(box, 'element', box_element_binding));

	return {
		c() {
			create_component(error.$$.fragment);
			t = space();
			create_component(box.$$.fragment);
		},
		m(target, anchor) {
			mount_component(error, target, anchor);
			insert(target, t, anchor);
			mount_component(box, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const error_changes = {};
			if (dirty & /*observable*/ 64) error_changes.observable = /*observable*/ ctx[6];
			if (dirty & /*err*/ 128) error_changes.code = /*err*/ ctx[7];
			error.$set(error_changes);

			const box_changes = (dirty & /*root, forwardEvents, useActions, use, cx, className, getStyles, override, href, undefined, $$restProps*/ 3902)
			? get_spread_update(box_spread_levels, [
					dirty & /*root*/ 16 && { root: /*root*/ ctx[4] },
					dirty & /*forwardEvents, useActions, use*/ 1026 && {
						use: [/*forwardEvents*/ ctx[10], [useActions, /*use*/ ctx[1]]]
					},
					dirty & /*cx, className, getStyles, override*/ 780 && {
						class: /*cx*/ ctx[9](/*className*/ ctx[2], /*getStyles*/ ctx[8]({ css: /*override*/ ctx[3] }))
					},
					dirty & /*href, undefined*/ 32 && { href: /*href*/ ctx[5] ?? undefined },
					dirty & /*$$restProps*/ 2048 && get_spread_object(/*$$restProps*/ ctx[11])
				])
			: {};

			if (dirty & /*$$scope*/ 67108864) {
				box_changes.$$scope = { dirty, ctx };
			}

			if (!updating_element && dirty & /*element*/ 1) {
				updating_element = true;
				box_changes.element = /*element*/ ctx[0];
				add_flush_callback(() => updating_element = false);
			}

			box.$set(box_changes);
		},
		i(local) {
			if (current) return;
			transition_in(error.$$.fragment, local);
			transition_in(box.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(error.$$.fragment, local);
			transition_out(box.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(error, detaching);
			if (detaching) detach(t);
			destroy_component(box, detaching);
		}
	};
}

function instance$d($$self, $$props, $$invalidate) {
	let cx;
	let getStyles;

	const omit_props_names = [
		"use","element","class","override","align","color","root","transform","variant","size","weight","gradient","inline","lineClamp","underline","inherit","href","tracking"
	];

	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	let { use = [], element = undefined, class: className = '', override = {}, align = 'left', color = 'dark', root = undefined, transform = 'none', variant = 'text', size = 'md', weight = 'normal', gradient = { from: 'indigo', to: 'cyan', deg: 45 }, inline = true, lineClamp = undefined, underline = false, inherit = false, href = '', tracking = 'normal' } = $$props;

	/** An action that forwards inner dom node events from parent component */
	const forwardEvents = createEventForwarder(get_current_component());

	// --------------Error Handling-------------------
	let observable = false;

	let err;

	if (gradient.from === 'indigo' && gradient.to === 'cyan0' && gradient.deg === 45 && variant !== 'gradient') {
		observable = true;
		err = TextErrors[0];
	}

	function box_element_binding(value) {
		element = value;
		$$invalidate(0, element);
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(11, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('use' in $$new_props) $$invalidate(1, use = $$new_props.use);
		if ('element' in $$new_props) $$invalidate(0, element = $$new_props.element);
		if ('class' in $$new_props) $$invalidate(2, className = $$new_props.class);
		if ('override' in $$new_props) $$invalidate(3, override = $$new_props.override);
		if ('align' in $$new_props) $$invalidate(12, align = $$new_props.align);
		if ('color' in $$new_props) $$invalidate(13, color = $$new_props.color);
		if ('root' in $$new_props) $$invalidate(4, root = $$new_props.root);
		if ('transform' in $$new_props) $$invalidate(14, transform = $$new_props.transform);
		if ('variant' in $$new_props) $$invalidate(15, variant = $$new_props.variant);
		if ('size' in $$new_props) $$invalidate(16, size = $$new_props.size);
		if ('weight' in $$new_props) $$invalidate(17, weight = $$new_props.weight);
		if ('gradient' in $$new_props) $$invalidate(18, gradient = $$new_props.gradient);
		if ('inline' in $$new_props) $$invalidate(19, inline = $$new_props.inline);
		if ('lineClamp' in $$new_props) $$invalidate(20, lineClamp = $$new_props.lineClamp);
		if ('underline' in $$new_props) $$invalidate(21, underline = $$new_props.underline);
		if ('inherit' in $$new_props) $$invalidate(22, inherit = $$new_props.inherit);
		if ('href' in $$new_props) $$invalidate(5, href = $$new_props.href);
		if ('tracking' in $$new_props) $$invalidate(23, tracking = $$new_props.tracking);
		if ('$$scope' in $$new_props) $$invalidate(26, $$scope = $$new_props.$$scope);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*lineClamp, underline, inline, inherit, gradient, variant, align, color, transform, size, weight, tracking*/ 16773120) {
			// --------------End Error Handling-------------------
			$$invalidate(
				9,
				{ cx, getStyles } = useStyles$4(
					{
						lineClamp,
						underline,
						inline,
						inherit,
						gradient,
						variant,
						align,
						color,
						transform,
						size,
						weight,
						tracking
					},
					{ name: 'Text' }
				),
				cx,
				(((((((((((($$invalidate(8, getStyles), $$invalidate(20, lineClamp)), $$invalidate(21, underline)), $$invalidate(19, inline)), $$invalidate(22, inherit)), $$invalidate(18, gradient)), $$invalidate(15, variant)), $$invalidate(12, align)), $$invalidate(13, color)), $$invalidate(14, transform)), $$invalidate(16, size)), $$invalidate(17, weight)), $$invalidate(23, tracking))
			);
		}
	};

	return [
		element,
		use,
		className,
		override,
		root,
		href,
		observable,
		err,
		getStyles,
		cx,
		forwardEvents,
		$$restProps,
		align,
		color,
		transform,
		variant,
		size,
		weight,
		gradient,
		inline,
		lineClamp,
		underline,
		inherit,
		tracking,
		slots,
		box_element_binding,
		$$scope
	];
}

class Text extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$d, create_fragment$d, safe_not_equal, {
			use: 1,
			element: 0,
			class: 2,
			override: 3,
			align: 12,
			color: 13,
			root: 4,
			transform: 14,
			variant: 15,
			size: 16,
			weight: 17,
			gradient: 18,
			inline: 19,
			lineClamp: 20,
			underline: 21,
			inherit: 22,
			href: 5,
			tracking: 23
		});
	}
}

const Text$1 = Text;

const sizes$1 = {
    xs: {
        height: 30,
        padding: '0px 14px'
    },
    sm: {
        height: 36,
        padding: '0px 18px'
    },
    md: {
        height: 42,
        padding: '0px 22px'
    },
    lg: {
        height: 50,
        padding: '0px 26px'
    },
    xl: {
        height: 60,
        padding: '0px 32px'
    },
    'compact-xs': {
        height: 22,
        padding: '0 7px'
    },
    'compact-sm': {
        height: 26,
        padding: '0 8px'
    },
    'compact-md': {
        height: 30,
        padding: '0 10px'
    },
    'compact-lg': {
        height: 34,
        padding: '0 12px'
    },
    'compact-xl': {
        height: 40,
        padding: '0 14px'
    }
};
const useStyles$3 = createStyles((theme, { color, compact, fullSize, gradient, radius, size, variant }) => {
    return {
        root: {
            focusRing: 'auto',
            cursor: 'pointer',
            position: 'relative',
            boxSizing: 'border-box',
            textDecoration: 'none',
            outline: 'none',
            userSelect: 'none',
            appearance: 'none',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: null,
            borderRadius: typeof radius === 'number' ? radius : `$${radius}`,
            height: typeof size === 'number' ? `${size}px` : sizes$1[compact ? `compact-${size}` : size].height,
            padding: typeof size === 'number'
                ? `0px ${size}px`
                : sizes$1[compact ? `compact-${size}` : size].padding,
            fontFamily: '$standard',
            fontWeight: '$SemiBold',
            fontSize: `$${size}`,
            lineHeight: 1,
            flexGrow: 0,
            width: fullSize ? '100%' : 'auto',
            '&:hover': {
                backgroundColor: variant === 'gradient' ? null : theme.fn.themeColor(color, 7),
                backgroundSize: variant === 'gradient' ? '200%' : null
            },
            '&:active': {
                transform: 'translateY(1px)'
            },
            '&.disabled': {
                pointerEvents: 'none',
                borderColor: 'transparent',
                backgroundColor: 'rgb(233, 236, 239)',
                background: 'rgb(233, 236, 239)',
                color: 'rgb(173, 181, 189)',
                cursor: 'not-allowed'
            },
            '&.loading': {
                pointerEvents: 'none',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: -1,
                    backgroundColor: 'rgba(255, 255, 255, .5)',
                    borderRadius: `$${radius}`,
                    cursor: 'not-allowed'
                }
            }
        },
        variants: {
            variation: vFunc(color, gradient)
        }
    };
});

/** Error codes for component
 *
 * `Object.freeze` is needed to keep modification outside of the object unavailable
 *
 * ## Code 1:
 * If using the disabled prop, a loading cannot be set at the same time
 *
 * ## Code 2:
 * If using the external prop, a href prop must be associated with it
 */
const ButtonErrors = Object.freeze([
    {
        error: true,
        message: 'If using the disabled prop, a loading cannot be set at the same time',
        solution: `
                If your component looks like this:
                
                &lt;Button disabled loading ...&gt; Button Text &lt;/Button&gt;
                         ^^^^^^^^ ^^^^^^^ - Try removing one of these
                `
    },
    {
        error: true,
        message: 'If using the external prop, a href prop must be associated with it. If you have an href prop there must be content inside.',
        solution: `
                If your component looks like this:
                
                &lt;Button external ...&gt; Button Text &lt;/Button&gt;
                         ^^^^^^^^ - Try adding the href prop too
                `
    }
]);

/* node_modules/.pnpm/@svelteuidev+core@0.9.0_ypfjxaydaa2meuohvziy3hvz6y/node_modules/@svelteuidev/core/components/Button/Ripple.svelte generated by Svelte v3.55.1 */

function add_css$3(target) {
	append_styles(target, "svelte-3pkhve", ".ripple.svelte-3pkhve{display:block;position:absolute;top:0;left:0;right:0;bottom:0;overflow:hidden;border-radius:inherit;color:inherit;pointer-events:none;z-index:0;contain:strict}.ripple.svelte-3pkhve .animation{color:inherit;position:absolute;top:0;left:0;border-radius:50%;opacity:0;pointer-events:none;overflow:hidden;will-change:transform, opacity}.ripple.svelte-3pkhve .animation-enter{transition:none}.ripple.svelte-3pkhve .animation-in{transition:opacity 0.1s cubic-bezier(0.4, 0, 0.2, 1);transition:transform 0.25s cubic-bezier(0.4, 0, 0.2, 1),\n\t\t\topacity 0.1s cubic-bezier(0.4, 0, 0.2, 1)}.ripple.svelte-3pkhve .animation-out{transition:opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)}");
}

function create_fragment$c(ctx) {
	let div;

	return {
		c() {
			div = element("div");
			attr(div, "class", "ripple svelte-3pkhve");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			/*div_binding*/ ctx[4](div);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			/*div_binding*/ ctx[4](null);
		}
	};
}

function isTouchEvent(e) {
	return e.constructor.name === 'TouchEvent';
}

function transform(el, value) {
	el.style['transform'] = value;
	el.style['webkitTransform'] = value;
}

function opacity(el, value) {
	el.style['opacity'] = value.toString();
}

const calculate = (e, el) => {
	const offset = el.getBoundingClientRect();
	const target = isTouchEvent(e) ? e.touches[e.touches.length - 1] : e;
	const localX = target.clientX - offset.left;
	const localY = target.clientY - offset.top;
	let radius = 0;
	let scale = 0.3;

	// Get ripple position
	const center = el.dataset.center;

	const circle = el.dataset.circle;

	if (circle) {
		scale = 0.15;
		radius = el.clientWidth / 2;

		radius = center
		? radius
		: radius + Math.sqrt((localX - radius) ** 2 + (localY - radius) ** 2) / 4;
	} else {
		radius = Math.sqrt(el.clientWidth ** 2 + el.clientHeight ** 2) / 2;
	}

	const centerX = `${(el.clientWidth - radius * 2) / 2}px`;
	const centerY = `${(el.clientHeight - radius * 2) / 2}px`;
	const x = center ? centerX : `${localX - radius}px`;
	const y = center ? centerY : `${localY - radius}px`;
	return { radius, scale, x, y, centerX, centerY };
};

const startRipple = function (eventType, event) {
	const hideEvents = ['touchcancel', 'mouseleave', 'dragstart'];
	let container = event.currentTarget || event.target;

	if (container && !container.classList.contains('ripple')) {
		container = container.querySelector('.ripple');
	}

	if (!container) {
		return;
	}

	const prev = container.dataset.event;

	if (prev && prev !== eventType) {
		return;
	}

	container.dataset.event = eventType;

	// Create the ripple
	const wave = document.createElement('span');

	const { radius, scale, x, y, centerX, centerY } = calculate(event, container);
	const color = container.dataset.color;
	const size = `${radius * 2}px`;
	wave.className = 'animation';
	wave.style.width = size;
	wave.style.height = size;
	wave.style.background = color;
	wave.classList.add('animation-enter');
	wave.classList.add('animation--visible');
	transform(wave, `translate(${x}, ${y}) scale3d(${scale},${scale},${scale})`);
	opacity(wave, 0);
	wave.dataset.activated = String(performance.now());
	container.appendChild(wave);

	setTimeout(
		() => {
			wave.classList.remove('animation-enter');
			wave.classList.add('animation-in');
			transform(wave, `translate(${centerX}, ${centerY}) scale3d(1,1,1)`);
			opacity(wave, 0.25);
		},
		0
	);

	const releaseEvent = eventType === 'mousedown' ? 'mouseup' : 'touchend';

	const onRelease = function () {
		document.removeEventListener(releaseEvent, onRelease);

		hideEvents.forEach(name => {
			document.removeEventListener(name, onRelease);
		});

		const diff = performance.now() - Number(wave.dataset.activated);
		const delay = Math.max(250 - diff, 0);

		setTimeout(
			() => {
				wave.classList.remove('animation-in');
				wave.classList.add('animation-out');
				opacity(wave, 0);

				setTimeout(
					() => {
						wave && container.removeChild(wave);

						if (container.children.length === 0) {
							delete container.dataset.event;
						}
					},
					300
				);
			},
			delay
		);
	};

	document.addEventListener(releaseEvent, onRelease);

	hideEvents.forEach(name => {
		document.addEventListener(name, onRelease, { passive: true });
	});
};

const onMouseDown = function (e) {
	// Trigger on left click only
	if (e.button === 0) {
		startRipple(e.type, e);
	}
};

const onTouchStart = function (e) {
	if (e.changedTouches) {
		for (let i = 0; i < e.changedTouches.length; ++i) {
			startRipple(e.type, e.changedTouches[i]);
		}
	}
};

function instance$c($$self, $$props, $$invalidate) {
	let { center = false } = $$props;
	let { circle = false } = $$props;
	let { color = 'currentColor' } = $$props;
	let el;
	let trigEl;

	onMount(async () => {
		await tick();

		try {
			if (center) {
				$$invalidate(0, el.dataset.center = 'true', el);
			}

			if (circle) {
				$$invalidate(0, el.dataset.circle = 'true', el);
			}

			$$invalidate(0, el.dataset.color = color, el);
			trigEl = el.parentElement;
		} catch(err) {
			
		} // eslint-disable-line

		if (!trigEl) {
			console.error('Ripple: Trigger element not found.');
			return;
		}

		let style = window.getComputedStyle(trigEl);

		if (style.position.length === 0 || style.position === 'static') {
			trigEl.style.position = 'relative';
		}

		trigEl.addEventListener('touchstart', onTouchStart, { passive: true });
		trigEl.addEventListener('mousedown', onMouseDown, { passive: true });
	});

	onDestroy(() => {
		if (!trigEl) {
			return;
		}

		trigEl.removeEventListener('mousedown', onMouseDown);
		trigEl.removeEventListener('touchstart', onTouchStart);
	});

	function div_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(0, el);
		});
	}

	$$self.$$set = $$props => {
		if ('center' in $$props) $$invalidate(1, center = $$props.center);
		if ('circle' in $$props) $$invalidate(2, circle = $$props.circle);
		if ('color' in $$props) $$invalidate(3, color = $$props.color);
	};

	return [el, center, circle, color, div_binding];
}

class Ripple extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$c, create_fragment$c, safe_not_equal, { center: 1, circle: 2, color: 3 }, add_css$3);
	}
}

const Ripple$1 = Ripple;

/* node_modules/.pnpm/@svelteuidev+core@0.9.0_ypfjxaydaa2meuohvziy3hvz6y/node_modules/@svelteuidev/core/components/Button/Button.svelte generated by Svelte v3.55.1 */

function add_css$2(target) {
	append_styles(target, "svelte-1n9fp7y", ".uppercase.svelte-1n9fp7y{text-transform:uppercase}.loader-left.svelte-1n9fp7y{margin-right:10px}.loader-right.svelte-1n9fp7y{margin-left:10px}");
}

const get_rightIcon_slot_changes_1 = dirty => ({});
const get_rightIcon_slot_context_1 = ctx => ({});
const get_leftIcon_slot_changes_1 = dirty => ({});
const get_leftIcon_slot_context_1 = ctx => ({});
const get_rightIcon_slot_changes = dirty => ({});
const get_rightIcon_slot_context = ctx => ({});
const get_leftIcon_slot_changes = dirty => ({});
const get_leftIcon_slot_context = ctx => ({});

// (93:0) {:else}
function create_else_block$1(ctx) {
	let button;
	let current_block_type_index;
	let if_block0;
	let t0;
	let t1;
	let t2;
	let current_block_type_index_1;
	let if_block2;
	let button_class_value;
	let useActions_action;
	let current;
	let mounted;
	let dispose;
	const if_block_creators = [create_if_block_9, create_if_block_10];
	const if_blocks = [];

	function select_block_type_3(ctx, dirty) {
		if (/*loading*/ ctx[11] && /*loaderPosition*/ ctx[5] === 'left') return 0;
		if (/*$$slots*/ ctx[20].leftIcon) return 1;
		return -1;
	}

	if (~(current_block_type_index = select_block_type_3(ctx))) {
		if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	}

	const default_slot_template = /*#slots*/ ctx[27].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[26], null);
	const default_slot_or_fallback = default_slot || fallback_block_4();
	let if_block1 = /*ripple*/ ctx[13] && create_if_block_8();
	const if_block_creators_1 = [create_if_block_6, create_if_block_7];
	const if_blocks_1 = [];

	function select_block_type_4(ctx, dirty) {
		if (/*loading*/ ctx[11] && /*loaderPosition*/ ctx[5] === 'right') return 0;
		if (/*$$slots*/ ctx[20].rightIcon) return 1;
		return -1;
	}

	if (~(current_block_type_index_1 = select_block_type_4(ctx))) {
		if_block2 = if_blocks_1[current_block_type_index_1] = if_block_creators_1[current_block_type_index_1](ctx);
	}

	let button_levels = [
		{
			class: button_class_value = /*cx*/ ctx[16](
				/*className*/ ctx[3],
				/*getStyles*/ ctx[17]({
					css: /*override*/ ctx[1],
					variation: /*variant*/ ctx[4]
				}),
				{
					disabled: /*disabled*/ ctx[9],
					loading: /*loading*/ ctx[11]
				}
			)
		},
		{ disabled: /*disabled*/ ctx[9] },
		/*$$restProps*/ ctx[19],
		{ tabindex: "0" }
	];

	let button_data = {};

	for (let i = 0; i < button_levels.length; i += 1) {
		button_data = assign(button_data, button_levels[i]);
	}

	return {
		c() {
			button = element("button");
			if (if_block0) if_block0.c();
			t0 = space();
			if (default_slot_or_fallback) default_slot_or_fallback.c();
			t1 = space();
			if (if_block1) if_block1.c();
			t2 = space();
			if (if_block2) if_block2.c();
			set_attributes(button, button_data);
			toggle_class(button, "compact", /*compact*/ ctx[10]);
			toggle_class(button, "uppercase", /*uppercase*/ ctx[12]);
			toggle_class(button, "svelte-1n9fp7y", true);
		},
		m(target, anchor) {
			insert(target, button, anchor);

			if (~current_block_type_index) {
				if_blocks[current_block_type_index].m(button, null);
			}

			append(button, t0);

			if (default_slot_or_fallback) {
				default_slot_or_fallback.m(button, null);
			}

			append(button, t1);
			if (if_block1) if_block1.m(button, null);
			append(button, t2);

			if (~current_block_type_index_1) {
				if_blocks_1[current_block_type_index_1].m(button, null);
			}

			if (button.autofocus) button.focus();
			/*button_binding*/ ctx[29](button);
			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer(useActions_action = useActions.call(null, button, /*use*/ ctx[2])),
					action_destroyer(/*forwardEvents*/ ctx[18].call(null, button))
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type_3(ctx);

			if (current_block_type_index === previous_block_index) {
				if (~current_block_type_index) {
					if_blocks[current_block_type_index].p(ctx, dirty);
				}
			} else {
				if (if_block0) {
					group_outros();

					transition_out(if_blocks[previous_block_index], 1, 1, () => {
						if_blocks[previous_block_index] = null;
					});

					check_outros();
				}

				if (~current_block_type_index) {
					if_block0 = if_blocks[current_block_type_index];

					if (!if_block0) {
						if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
						if_block0.c();
					} else {
						if_block0.p(ctx, dirty);
					}

					transition_in(if_block0, 1);
					if_block0.m(button, t0);
				} else {
					if_block0 = null;
				}
			}

			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 67108864)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[26],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[26])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[26], dirty, null),
						null
					);
				}
			}

			if (/*ripple*/ ctx[13]) {
				if (if_block1) {
					if (dirty & /*ripple*/ 8192) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block_8();
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(button, t2);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}

			let previous_block_index_1 = current_block_type_index_1;
			current_block_type_index_1 = select_block_type_4(ctx);

			if (current_block_type_index_1 === previous_block_index_1) {
				if (~current_block_type_index_1) {
					if_blocks_1[current_block_type_index_1].p(ctx, dirty);
				}
			} else {
				if (if_block2) {
					group_outros();

					transition_out(if_blocks_1[previous_block_index_1], 1, 1, () => {
						if_blocks_1[previous_block_index_1] = null;
					});

					check_outros();
				}

				if (~current_block_type_index_1) {
					if_block2 = if_blocks_1[current_block_type_index_1];

					if (!if_block2) {
						if_block2 = if_blocks_1[current_block_type_index_1] = if_block_creators_1[current_block_type_index_1](ctx);
						if_block2.c();
					} else {
						if_block2.p(ctx, dirty);
					}

					transition_in(if_block2, 1);
					if_block2.m(button, null);
				} else {
					if_block2 = null;
				}
			}

			set_attributes(button, button_data = get_spread_update(button_levels, [
				(!current || dirty & /*cx, className, getStyles, override, variant, disabled, loading*/ 199194 && button_class_value !== (button_class_value = /*cx*/ ctx[16](
					/*className*/ ctx[3],
					/*getStyles*/ ctx[17]({
						css: /*override*/ ctx[1],
						variation: /*variant*/ ctx[4]
					}),
					{
						disabled: /*disabled*/ ctx[9],
						loading: /*loading*/ ctx[11]
					}
				))) && { class: button_class_value },
				(!current || dirty & /*disabled*/ 512) && { disabled: /*disabled*/ ctx[9] },
				dirty & /*$$restProps*/ 524288 && /*$$restProps*/ ctx[19],
				{ tabindex: "0" }
			]));

			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 4) useActions_action.update.call(null, /*use*/ ctx[2]);
			toggle_class(button, "compact", /*compact*/ ctx[10]);
			toggle_class(button, "uppercase", /*uppercase*/ ctx[12]);
			toggle_class(button, "svelte-1n9fp7y", true);
		},
		i(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(default_slot_or_fallback, local);
			transition_in(if_block1);
			transition_in(if_block2);
			current = true;
		},
		o(local) {
			transition_out(if_block0);
			transition_out(default_slot_or_fallback, local);
			transition_out(if_block1);
			transition_out(if_block2);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(button);

			if (~current_block_type_index) {
				if_blocks[current_block_type_index].d();
			}

			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
			if (if_block1) if_block1.d();

			if (~current_block_type_index_1) {
				if_blocks_1[current_block_type_index_1].d();
			}

			/*button_binding*/ ctx[29](null);
			mounted = false;
			run_all(dispose);
		}
	};
}

// (55:0) {#if href && !disabled}
function create_if_block$5(ctx) {
	let a;
	let current_block_type_index;
	let if_block0;
	let t0;
	let t1;
	let t2;
	let current_block_type_index_1;
	let if_block2;
	let a_class_value;
	let a_target_value;
	let useActions_action;
	let current;
	let mounted;
	let dispose;
	const if_block_creators = [create_if_block_4$1, create_if_block_5];
	const if_blocks = [];

	function select_block_type_1(ctx, dirty) {
		if (/*loading*/ ctx[11] && /*loaderPosition*/ ctx[5] === 'left') return 0;
		if (/*$$slots*/ ctx[20].leftIcon) return 1;
		return -1;
	}

	if (~(current_block_type_index = select_block_type_1(ctx))) {
		if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	}

	const default_slot_template = /*#slots*/ ctx[27].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[26], null);
	const default_slot_or_fallback = default_slot || fallback_block_1();
	let if_block1 = /*ripple*/ ctx[13] && create_if_block_3$1();
	const if_block_creators_1 = [create_if_block_1$3, create_if_block_2$3];
	const if_blocks_1 = [];

	function select_block_type_2(ctx, dirty) {
		if (/*loading*/ ctx[11] && /*loaderPosition*/ ctx[5] === 'right') return 0;
		if (/*$$slots*/ ctx[20].rightIcon) return 1;
		return -1;
	}

	if (~(current_block_type_index_1 = select_block_type_2(ctx))) {
		if_block2 = if_blocks_1[current_block_type_index_1] = if_block_creators_1[current_block_type_index_1](ctx);
	}

	let a_levels = [
		{ href: /*href*/ ctx[7] },
		{
			class: a_class_value = /*cx*/ ctx[16](
				/*className*/ ctx[3],
				/*getStyles*/ ctx[17]({
					css: /*override*/ ctx[1],
					variation: /*variant*/ ctx[4]
				}),
				{
					disabled: /*disabled*/ ctx[9],
					loading: /*loading*/ ctx[11]
				}
			)
		},
		{ role: "button" },
		{ rel: "noreferrer noopener" },
		{
			target: a_target_value = /*external*/ ctx[8] ? '_blank' : '_self'
		},
		/*$$restProps*/ ctx[19],
		{ tabindex: "0" }
	];

	let a_data = {};

	for (let i = 0; i < a_levels.length; i += 1) {
		a_data = assign(a_data, a_levels[i]);
	}

	return {
		c() {
			a = element("a");
			if (if_block0) if_block0.c();
			t0 = space();
			if (default_slot_or_fallback) default_slot_or_fallback.c();
			t1 = space();
			if (if_block1) if_block1.c();
			t2 = space();
			if (if_block2) if_block2.c();
			set_attributes(a, a_data);
			toggle_class(a, "compact", /*compact*/ ctx[10]);
			toggle_class(a, "uppercase", /*uppercase*/ ctx[12]);
			toggle_class(a, "svelte-1n9fp7y", true);
		},
		m(target, anchor) {
			insert(target, a, anchor);

			if (~current_block_type_index) {
				if_blocks[current_block_type_index].m(a, null);
			}

			append(a, t0);

			if (default_slot_or_fallback) {
				default_slot_or_fallback.m(a, null);
			}

			append(a, t1);
			if (if_block1) if_block1.m(a, null);
			append(a, t2);

			if (~current_block_type_index_1) {
				if_blocks_1[current_block_type_index_1].m(a, null);
			}

			/*a_binding*/ ctx[28](a);
			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer(useActions_action = useActions.call(null, a, /*use*/ ctx[2])),
					action_destroyer(/*forwardEvents*/ ctx[18].call(null, a))
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type_1(ctx);

			if (current_block_type_index === previous_block_index) {
				if (~current_block_type_index) {
					if_blocks[current_block_type_index].p(ctx, dirty);
				}
			} else {
				if (if_block0) {
					group_outros();

					transition_out(if_blocks[previous_block_index], 1, 1, () => {
						if_blocks[previous_block_index] = null;
					});

					check_outros();
				}

				if (~current_block_type_index) {
					if_block0 = if_blocks[current_block_type_index];

					if (!if_block0) {
						if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
						if_block0.c();
					} else {
						if_block0.p(ctx, dirty);
					}

					transition_in(if_block0, 1);
					if_block0.m(a, t0);
				} else {
					if_block0 = null;
				}
			}

			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 67108864)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[26],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[26])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[26], dirty, null),
						null
					);
				}
			}

			if (/*ripple*/ ctx[13]) {
				if (if_block1) {
					if (dirty & /*ripple*/ 8192) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block_3$1();
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(a, t2);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}

			let previous_block_index_1 = current_block_type_index_1;
			current_block_type_index_1 = select_block_type_2(ctx);

			if (current_block_type_index_1 === previous_block_index_1) {
				if (~current_block_type_index_1) {
					if_blocks_1[current_block_type_index_1].p(ctx, dirty);
				}
			} else {
				if (if_block2) {
					group_outros();

					transition_out(if_blocks_1[previous_block_index_1], 1, 1, () => {
						if_blocks_1[previous_block_index_1] = null;
					});

					check_outros();
				}

				if (~current_block_type_index_1) {
					if_block2 = if_blocks_1[current_block_type_index_1];

					if (!if_block2) {
						if_block2 = if_blocks_1[current_block_type_index_1] = if_block_creators_1[current_block_type_index_1](ctx);
						if_block2.c();
					} else {
						if_block2.p(ctx, dirty);
					}

					transition_in(if_block2, 1);
					if_block2.m(a, null);
				} else {
					if_block2 = null;
				}
			}

			set_attributes(a, a_data = get_spread_update(a_levels, [
				(!current || dirty & /*href*/ 128) && { href: /*href*/ ctx[7] },
				(!current || dirty & /*cx, className, getStyles, override, variant, disabled, loading*/ 199194 && a_class_value !== (a_class_value = /*cx*/ ctx[16](
					/*className*/ ctx[3],
					/*getStyles*/ ctx[17]({
						css: /*override*/ ctx[1],
						variation: /*variant*/ ctx[4]
					}),
					{
						disabled: /*disabled*/ ctx[9],
						loading: /*loading*/ ctx[11]
					}
				))) && { class: a_class_value },
				{ role: "button" },
				{ rel: "noreferrer noopener" },
				(!current || dirty & /*external*/ 256 && a_target_value !== (a_target_value = /*external*/ ctx[8] ? '_blank' : '_self')) && { target: a_target_value },
				dirty & /*$$restProps*/ 524288 && /*$$restProps*/ ctx[19],
				{ tabindex: "0" }
			]));

			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 4) useActions_action.update.call(null, /*use*/ ctx[2]);
			toggle_class(a, "compact", /*compact*/ ctx[10]);
			toggle_class(a, "uppercase", /*uppercase*/ ctx[12]);
			toggle_class(a, "svelte-1n9fp7y", true);
		},
		i(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(default_slot_or_fallback, local);
			transition_in(if_block1);
			transition_in(if_block2);
			current = true;
		},
		o(local) {
			transition_out(if_block0);
			transition_out(default_slot_or_fallback, local);
			transition_out(if_block1);
			transition_out(if_block2);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(a);

			if (~current_block_type_index) {
				if_blocks[current_block_type_index].d();
			}

			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
			if (if_block1) if_block1.d();

			if (~current_block_type_index_1) {
				if_blocks_1[current_block_type_index_1].d();
			}

			/*a_binding*/ ctx[28](null);
			mounted = false;
			run_all(dispose);
		}
	};
}

// (109:29) 
function create_if_block_10(ctx) {
	let span;
	let current;
	const leftIcon_slot_template = /*#slots*/ ctx[27].leftIcon;
	const leftIcon_slot = create_slot(leftIcon_slot_template, ctx, /*$$scope*/ ctx[26], get_leftIcon_slot_context_1);
	const leftIcon_slot_or_fallback = leftIcon_slot || fallback_block_5();

	return {
		c() {
			span = element("span");
			if (leftIcon_slot_or_fallback) leftIcon_slot_or_fallback.c();
			attr(span, "class", "loader-left svelte-1n9fp7y");
		},
		m(target, anchor) {
			insert(target, span, anchor);

			if (leftIcon_slot_or_fallback) {
				leftIcon_slot_or_fallback.m(span, null);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (leftIcon_slot) {
				if (leftIcon_slot.p && (!current || dirty & /*$$scope*/ 67108864)) {
					update_slot_base(
						leftIcon_slot,
						leftIcon_slot_template,
						ctx,
						/*$$scope*/ ctx[26],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[26])
						: get_slot_changes(leftIcon_slot_template, /*$$scope*/ ctx[26], dirty, get_leftIcon_slot_changes_1),
						get_leftIcon_slot_context_1
					);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(leftIcon_slot_or_fallback, local);
			current = true;
		},
		o(local) {
			transition_out(leftIcon_slot_or_fallback, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(span);
			if (leftIcon_slot_or_fallback) leftIcon_slot_or_fallback.d(detaching);
		}
	};
}

// (105:2) {#if loading && loaderPosition === 'left'}
function create_if_block_9(ctx) {
	let span;
	let loader;
	let current;

	loader = new Loader$1({
			props: {
				variant: /*loaderProps*/ ctx[6].variant,
				size: /*loaderProps*/ ctx[6].size,
				color: /*loaderProps*/ ctx[6].color
			}
		});

	return {
		c() {
			span = element("span");
			create_component(loader.$$.fragment);
			attr(span, "class", "loader-left svelte-1n9fp7y");
		},
		m(target, anchor) {
			insert(target, span, anchor);
			mount_component(loader, span, null);
			current = true;
		},
		p(ctx, dirty) {
			const loader_changes = {};
			if (dirty & /*loaderProps*/ 64) loader_changes.variant = /*loaderProps*/ ctx[6].variant;
			if (dirty & /*loaderProps*/ 64) loader_changes.size = /*loaderProps*/ ctx[6].size;
			if (dirty & /*loaderProps*/ 64) loader_changes.color = /*loaderProps*/ ctx[6].color;
			loader.$set(loader_changes);
		},
		i(local) {
			if (current) return;
			transition_in(loader.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(loader.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(span);
			destroy_component(loader);
		}
	};
}

// (111:26) X
function fallback_block_5(ctx) {
	let t;

	return {
		c() {
			t = text("X");
		},
		m(target, anchor) {
			insert(target, t, anchor);
		},
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

// (114:8) Button
function fallback_block_4(ctx) {
	let t;

	return {
		c() {
			t = text("Button");
		},
		m(target, anchor) {
			insert(target, t, anchor);
		},
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

// (115:2) {#if ripple}
function create_if_block_8(ctx) {
	let ripple_1;
	let current;
	ripple_1 = new Ripple$1({ props: { center: false, circle: false } });

	return {
		c() {
			create_component(ripple_1.$$.fragment);
		},
		m(target, anchor) {
			mount_component(ripple_1, target, anchor);
			current = true;
		},
		i(local) {
			if (current) return;
			transition_in(ripple_1.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(ripple_1.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(ripple_1, detaching);
		}
	};
}

// (122:30) 
function create_if_block_7(ctx) {
	let span;
	let current;
	const rightIcon_slot_template = /*#slots*/ ctx[27].rightIcon;
	const rightIcon_slot = create_slot(rightIcon_slot_template, ctx, /*$$scope*/ ctx[26], get_rightIcon_slot_context_1);
	const rightIcon_slot_or_fallback = rightIcon_slot || fallback_block_3();

	return {
		c() {
			span = element("span");
			if (rightIcon_slot_or_fallback) rightIcon_slot_or_fallback.c();
			attr(span, "class", "loader-right svelte-1n9fp7y");
		},
		m(target, anchor) {
			insert(target, span, anchor);

			if (rightIcon_slot_or_fallback) {
				rightIcon_slot_or_fallback.m(span, null);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (rightIcon_slot) {
				if (rightIcon_slot.p && (!current || dirty & /*$$scope*/ 67108864)) {
					update_slot_base(
						rightIcon_slot,
						rightIcon_slot_template,
						ctx,
						/*$$scope*/ ctx[26],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[26])
						: get_slot_changes(rightIcon_slot_template, /*$$scope*/ ctx[26], dirty, get_rightIcon_slot_changes_1),
						get_rightIcon_slot_context_1
					);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(rightIcon_slot_or_fallback, local);
			current = true;
		},
		o(local) {
			transition_out(rightIcon_slot_or_fallback, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(span);
			if (rightIcon_slot_or_fallback) rightIcon_slot_or_fallback.d(detaching);
		}
	};
}

// (118:2) {#if loading && loaderPosition === 'right'}
function create_if_block_6(ctx) {
	let span;
	let loader;
	let current;

	loader = new Loader$1({
			props: {
				variant: /*loaderProps*/ ctx[6].variant,
				size: /*loaderProps*/ ctx[6].size,
				color: /*loaderProps*/ ctx[6].color
			}
		});

	return {
		c() {
			span = element("span");
			create_component(loader.$$.fragment);
			attr(span, "class", "loader-right svelte-1n9fp7y");
		},
		m(target, anchor) {
			insert(target, span, anchor);
			mount_component(loader, span, null);
			current = true;
		},
		p(ctx, dirty) {
			const loader_changes = {};
			if (dirty & /*loaderProps*/ 64) loader_changes.variant = /*loaderProps*/ ctx[6].variant;
			if (dirty & /*loaderProps*/ 64) loader_changes.size = /*loaderProps*/ ctx[6].size;
			if (dirty & /*loaderProps*/ 64) loader_changes.color = /*loaderProps*/ ctx[6].color;
			loader.$set(loader_changes);
		},
		i(local) {
			if (current) return;
			transition_in(loader.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(loader.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(span);
			destroy_component(loader);
		}
	};
}

// (124:27) X
function fallback_block_3(ctx) {
	let t;

	return {
		c() {
			t = text("X");
		},
		m(target, anchor) {
			insert(target, t, anchor);
		},
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

// (74:29) 
function create_if_block_5(ctx) {
	let span;
	let current;
	const leftIcon_slot_template = /*#slots*/ ctx[27].leftIcon;
	const leftIcon_slot = create_slot(leftIcon_slot_template, ctx, /*$$scope*/ ctx[26], get_leftIcon_slot_context);
	const leftIcon_slot_or_fallback = leftIcon_slot || fallback_block_2();

	return {
		c() {
			span = element("span");
			if (leftIcon_slot_or_fallback) leftIcon_slot_or_fallback.c();
			attr(span, "class", "loader-left svelte-1n9fp7y");
		},
		m(target, anchor) {
			insert(target, span, anchor);

			if (leftIcon_slot_or_fallback) {
				leftIcon_slot_or_fallback.m(span, null);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (leftIcon_slot) {
				if (leftIcon_slot.p && (!current || dirty & /*$$scope*/ 67108864)) {
					update_slot_base(
						leftIcon_slot,
						leftIcon_slot_template,
						ctx,
						/*$$scope*/ ctx[26],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[26])
						: get_slot_changes(leftIcon_slot_template, /*$$scope*/ ctx[26], dirty, get_leftIcon_slot_changes),
						get_leftIcon_slot_context
					);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(leftIcon_slot_or_fallback, local);
			current = true;
		},
		o(local) {
			transition_out(leftIcon_slot_or_fallback, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(span);
			if (leftIcon_slot_or_fallback) leftIcon_slot_or_fallback.d(detaching);
		}
	};
}

// (70:2) {#if loading && loaderPosition === 'left'}
function create_if_block_4$1(ctx) {
	let span;
	let loader;
	let current;

	loader = new Loader$1({
			props: {
				variant: /*loaderProps*/ ctx[6].variant,
				size: /*loaderProps*/ ctx[6].size,
				color: /*loaderProps*/ ctx[6].color
			}
		});

	return {
		c() {
			span = element("span");
			create_component(loader.$$.fragment);
			attr(span, "class", "loader-left svelte-1n9fp7y");
		},
		m(target, anchor) {
			insert(target, span, anchor);
			mount_component(loader, span, null);
			current = true;
		},
		p(ctx, dirty) {
			const loader_changes = {};
			if (dirty & /*loaderProps*/ 64) loader_changes.variant = /*loaderProps*/ ctx[6].variant;
			if (dirty & /*loaderProps*/ 64) loader_changes.size = /*loaderProps*/ ctx[6].size;
			if (dirty & /*loaderProps*/ 64) loader_changes.color = /*loaderProps*/ ctx[6].color;
			loader.$set(loader_changes);
		},
		i(local) {
			if (current) return;
			transition_in(loader.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(loader.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(span);
			destroy_component(loader);
		}
	};
}

// (76:26) X
function fallback_block_2(ctx) {
	let t;

	return {
		c() {
			t = text("X");
		},
		m(target, anchor) {
			insert(target, t, anchor);
		},
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

// (79:8) Button
function fallback_block_1(ctx) {
	let t;

	return {
		c() {
			t = text("Button");
		},
		m(target, anchor) {
			insert(target, t, anchor);
		},
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

// (80:2) {#if ripple}
function create_if_block_3$1(ctx) {
	let ripple_1;
	let current;
	ripple_1 = new Ripple$1({ props: { center: false, circle: false } });

	return {
		c() {
			create_component(ripple_1.$$.fragment);
		},
		m(target, anchor) {
			mount_component(ripple_1, target, anchor);
			current = true;
		},
		i(local) {
			if (current) return;
			transition_in(ripple_1.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(ripple_1.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(ripple_1, detaching);
		}
	};
}

// (87:30) 
function create_if_block_2$3(ctx) {
	let span;
	let current;
	const rightIcon_slot_template = /*#slots*/ ctx[27].rightIcon;
	const rightIcon_slot = create_slot(rightIcon_slot_template, ctx, /*$$scope*/ ctx[26], get_rightIcon_slot_context);
	const rightIcon_slot_or_fallback = rightIcon_slot || fallback_block$1();

	return {
		c() {
			span = element("span");
			if (rightIcon_slot_or_fallback) rightIcon_slot_or_fallback.c();
			attr(span, "class", "loader-right svelte-1n9fp7y");
		},
		m(target, anchor) {
			insert(target, span, anchor);

			if (rightIcon_slot_or_fallback) {
				rightIcon_slot_or_fallback.m(span, null);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (rightIcon_slot) {
				if (rightIcon_slot.p && (!current || dirty & /*$$scope*/ 67108864)) {
					update_slot_base(
						rightIcon_slot,
						rightIcon_slot_template,
						ctx,
						/*$$scope*/ ctx[26],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[26])
						: get_slot_changes(rightIcon_slot_template, /*$$scope*/ ctx[26], dirty, get_rightIcon_slot_changes),
						get_rightIcon_slot_context
					);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(rightIcon_slot_or_fallback, local);
			current = true;
		},
		o(local) {
			transition_out(rightIcon_slot_or_fallback, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(span);
			if (rightIcon_slot_or_fallback) rightIcon_slot_or_fallback.d(detaching);
		}
	};
}

// (83:2) {#if loading && loaderPosition === 'right'}
function create_if_block_1$3(ctx) {
	let span;
	let loader;
	let current;

	loader = new Loader$1({
			props: {
				variant: /*loaderProps*/ ctx[6].variant,
				size: /*loaderProps*/ ctx[6].size,
				color: /*loaderProps*/ ctx[6].color
			}
		});

	return {
		c() {
			span = element("span");
			create_component(loader.$$.fragment);
			attr(span, "class", "loader-right svelte-1n9fp7y");
		},
		m(target, anchor) {
			insert(target, span, anchor);
			mount_component(loader, span, null);
			current = true;
		},
		p(ctx, dirty) {
			const loader_changes = {};
			if (dirty & /*loaderProps*/ 64) loader_changes.variant = /*loaderProps*/ ctx[6].variant;
			if (dirty & /*loaderProps*/ 64) loader_changes.size = /*loaderProps*/ ctx[6].size;
			if (dirty & /*loaderProps*/ 64) loader_changes.color = /*loaderProps*/ ctx[6].color;
			loader.$set(loader_changes);
		},
		i(local) {
			if (current) return;
			transition_in(loader.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(loader.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(span);
			destroy_component(loader);
		}
	};
}

// (89:27) X
function fallback_block$1(ctx) {
	let t;

	return {
		c() {
			t = text("X");
		},
		m(target, anchor) {
			insert(target, t, anchor);
		},
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

function create_fragment$b(ctx) {
	let error;
	let t;
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;

	error = new Error$2({
			props: {
				observable: /*observable*/ ctx[14],
				component: "Button",
				code: /*err*/ ctx[15]
			}
		});

	const if_block_creators = [create_if_block$5, create_else_block$1];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*href*/ ctx[7] && !/*disabled*/ ctx[9]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			create_component(error.$$.fragment);
			t = space();
			if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			mount_component(error, target, anchor);
			insert(target, t, anchor);
			if_blocks[current_block_type_index].m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const error_changes = {};
			if (dirty & /*observable*/ 16384) error_changes.observable = /*observable*/ ctx[14];
			if (dirty & /*err*/ 32768) error_changes.code = /*err*/ ctx[15];
			error.$set(error_changes);
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i(local) {
			if (current) return;
			transition_in(error.$$.fragment, local);
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(error.$$.fragment, local);
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			destroy_component(error, detaching);
			if (detaching) detach(t);
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function instance$b($$self, $$props, $$invalidate) {
	let getStyles;
	let cx;

	const omit_props_names = [
		"use","element","class","override","variant","color","size","radius","gradient","loaderPosition","loaderProps","href","external","disabled","compact","loading","uppercase","fullSize","ripple"
	];

	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	const $$slots = compute_slots(slots);

	let { use = [], element = undefined, class: className = '', override = {}, variant = 'filled', color = 'blue', size = 'sm', radius = 'sm', gradient = { from: 'indigo', to: 'cyan', deg: 45 }, loaderPosition = 'left', loaderProps = {
		size: 'xs',
		color: 'white',
		variant: 'circle'
	}, href = null, external = false, disabled = false, compact = false, loading = false, uppercase = false, fullSize = false, ripple = false } = $$props;

	/** An action that forwards inner dom node events from parent component */
	const forwardEvents = createEventForwarder(get_current_component());

	// --------------Error Handling-------------------
	let observable = false;

	let err;

	if (disabled && loading) {
		observable = true;
		err = ButtonErrors[0];
	}

	if (external && typeof href !== 'string' || href?.length < 1) {
		observable = true;
		err = ButtonErrors[1];
	}

	function a_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			element = $$value;
			$$invalidate(0, element);
		});
	}

	function button_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			element = $$value;
			$$invalidate(0, element);
		});
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(19, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('use' in $$new_props) $$invalidate(2, use = $$new_props.use);
		if ('element' in $$new_props) $$invalidate(0, element = $$new_props.element);
		if ('class' in $$new_props) $$invalidate(3, className = $$new_props.class);
		if ('override' in $$new_props) $$invalidate(1, override = $$new_props.override);
		if ('variant' in $$new_props) $$invalidate(4, variant = $$new_props.variant);
		if ('color' in $$new_props) $$invalidate(21, color = $$new_props.color);
		if ('size' in $$new_props) $$invalidate(22, size = $$new_props.size);
		if ('radius' in $$new_props) $$invalidate(23, radius = $$new_props.radius);
		if ('gradient' in $$new_props) $$invalidate(24, gradient = $$new_props.gradient);
		if ('loaderPosition' in $$new_props) $$invalidate(5, loaderPosition = $$new_props.loaderPosition);
		if ('loaderProps' in $$new_props) $$invalidate(6, loaderProps = $$new_props.loaderProps);
		if ('href' in $$new_props) $$invalidate(7, href = $$new_props.href);
		if ('external' in $$new_props) $$invalidate(8, external = $$new_props.external);
		if ('disabled' in $$new_props) $$invalidate(9, disabled = $$new_props.disabled);
		if ('compact' in $$new_props) $$invalidate(10, compact = $$new_props.compact);
		if ('loading' in $$new_props) $$invalidate(11, loading = $$new_props.loading);
		if ('uppercase' in $$new_props) $$invalidate(12, uppercase = $$new_props.uppercase);
		if ('fullSize' in $$new_props) $$invalidate(25, fullSize = $$new_props.fullSize);
		if ('ripple' in $$new_props) $$invalidate(13, ripple = $$new_props.ripple);
		if ('$$scope' in $$new_props) $$invalidate(26, $$scope = $$new_props.$$scope);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*observable*/ 16384) {
			if (observable) $$invalidate(1, override = { display: 'none' });
		}

		if ($$self.$$.dirty & /*color, compact, fullSize, gradient, radius, size, variant*/ 65012752) {
			// --------------Error Handling-------------------
			$$invalidate(
				17,
				{ getStyles, cx } = useStyles$3(
					{
						color,
						compact,
						fullSize,
						gradient,
						radius,
						size,
						variant
					},
					{ name: 'Button' }
				),
				getStyles,
				((((((($$invalidate(16, cx), $$invalidate(21, color)), $$invalidate(10, compact)), $$invalidate(25, fullSize)), $$invalidate(24, gradient)), $$invalidate(23, radius)), $$invalidate(22, size)), $$invalidate(4, variant))
			);
		}
	};

	return [
		element,
		override,
		use,
		className,
		variant,
		loaderPosition,
		loaderProps,
		href,
		external,
		disabled,
		compact,
		loading,
		uppercase,
		ripple,
		observable,
		err,
		cx,
		getStyles,
		forwardEvents,
		$$restProps,
		$$slots,
		color,
		size,
		radius,
		gradient,
		fullSize,
		$$scope,
		slots,
		a_binding,
		button_binding
	];
}

class Button extends SvelteComponent {
	constructor(options) {
		super();

		init(
			this,
			options,
			instance$b,
			create_fragment$b,
			safe_not_equal,
			{
				use: 2,
				element: 0,
				class: 3,
				override: 1,
				variant: 4,
				color: 21,
				size: 22,
				radius: 23,
				gradient: 24,
				loaderPosition: 5,
				loaderProps: 6,
				href: 7,
				external: 8,
				disabled: 9,
				compact: 10,
				loading: 11,
				uppercase: 12,
				fullSize: 25,
				ripple: 13
			},
			add_css$2
		);
	}
}

const Button$1 = Button;

const useStyles$2 = createStyles((theme, { size }) => {
    return {
        root: {
            lineHeight: theme.lineHeights.md.value
        },
        label: {
            [`${theme.dark} &`]: {
                color: theme.fn.themeColor('dark', 0)
            },
            display: 'inline-block',
            marginBottom: 4,
            fontSize: theme.fontSizes[size].value,
            fontWeight: 500,
            color: theme.fn.themeColor('gray', 9),
            wordBreak: 'break-word',
            cursor: 'default',
            WebkitTapHighlightColor: 'transparent'
        },
        error: {
            [`${theme.dark} &`]: {
                color: theme.fn.themeColor('red', 6)
            },
            marginTop: 5,
            wordBreak: 'break-word',
            color: theme.fn.themeColor('red', 7)
        },
        description: {
            [`${theme.dark} &`]: {
                color: `${theme.fn.themeColor('dark', 2)} !important`
            },
            marginTop: -3,
            marginBottom: 7,
            wordBreak: 'break-word',
            color: `${theme.fn.themeColor('gray', 6)} !important`,
            fontSize: theme.fontSizes[size].value,
            lineHeight: 1.2
        },
        required: {
            [`${theme.dark} &`]: {
                color: '$red500'
            },
            color: theme.fn.themeColor('red', 7)
        }
    };
});

/* node_modules/.pnpm/@svelteuidev+core@0.9.0_ypfjxaydaa2meuohvziy3hvz6y/node_modules/@svelteuidev/core/components/InputWrapper/LabelElement.svelte generated by Svelte v3.55.1 */

function create_if_block$4(ctx) {
	let span;

	return {
		c() {
			span = element("span");
			span.textContent = `${' *'}`;
			attr(span, "class", "required");
			attr(span, "aria-hidden", "");
		},
		m(target, anchor) {
			insert(target, span, anchor);
		},
		d(detaching) {
			if (detaching) detach(span);
		}
	};
}

// (14:0) <Box for={id} root={labelElement} class={className}>
function create_default_slot$6(ctx) {
	let t0;
	let t1;
	let if_block_anchor;
	let if_block = /*required*/ ctx[3] && create_if_block$4();

	return {
		c() {
			t0 = text(/*label*/ ctx[1]);
			t1 = space();
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			insert(target, t0, anchor);
			insert(target, t1, anchor);
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*label*/ 2) set_data(t0, /*label*/ ctx[1]);

			if (/*required*/ ctx[3]) {
				if (if_block) ; else {
					if_block = create_if_block$4();
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		d(detaching) {
			if (detaching) detach(t0);
			if (detaching) detach(t1);
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function create_fragment$a(ctx) {
	let box;
	let current;

	box = new Box$1({
			props: {
				for: /*id*/ ctx[4],
				root: /*labelElement*/ ctx[2],
				class: /*className*/ ctx[0],
				$$slots: { default: [create_default_slot$6] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(box.$$.fragment);
		},
		m(target, anchor) {
			mount_component(box, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const box_changes = {};
			if (dirty & /*id*/ 16) box_changes.for = /*id*/ ctx[4];
			if (dirty & /*labelElement*/ 4) box_changes.root = /*labelElement*/ ctx[2];
			if (dirty & /*className*/ 1) box_changes.class = /*className*/ ctx[0];

			if (dirty & /*$$scope, required, label*/ 74) {
				box_changes.$$scope = { dirty, ctx };
			}

			box.$set(box_changes);
		},
		i(local) {
			if (current) return;
			transition_in(box.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(box.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(box, detaching);
		}
	};
}

function instance$a($$self, $$props, $$invalidate) {
	let { class: className = 'label' } = $$props;
	let { label = 'label' } = $$props;
	let { labelElement = 'label' } = $$props;
	let { required = false } = $$props;
	let { id = undefined } = $$props;

	$$self.$$set = $$props => {
		if ('class' in $$props) $$invalidate(0, className = $$props.class);
		if ('label' in $$props) $$invalidate(1, label = $$props.label);
		if ('labelElement' in $$props) $$invalidate(2, labelElement = $$props.labelElement);
		if ('required' in $$props) $$invalidate(3, required = $$props.required);
		if ('id' in $$props) $$invalidate(4, id = $$props.id);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*id*/ 16) ;
	};

	return [className, label, labelElement, required, id];
}

class LabelElement extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$a, create_fragment$a, safe_not_equal, {
			class: 0,
			label: 1,
			labelElement: 2,
			required: 3,
			id: 4
		});
	}
}

const LabelElement$1 = LabelElement;

/* node_modules/.pnpm/@svelteuidev+core@0.9.0_ypfjxaydaa2meuohvziy3hvz6y/node_modules/@svelteuidev/core/components/InputWrapper/InputWrapper.svelte generated by Svelte v3.55.1 */

function create_if_block_2$2(ctx) {
	let labelelement;
	let current;

	const labelelement_spread_levels = [
		{ class: /*classes*/ ctx[15].label },
		/*_labelProps*/ ctx[13],
		{ label: /*label*/ ctx[4] },
		{ id: /*id*/ ctx[10] },
		{ labelElement: /*labelElement*/ ctx[11] },
		{ required: /*required*/ ctx[7] }
	];

	let labelelement_props = {};

	for (let i = 0; i < labelelement_spread_levels.length; i += 1) {
		labelelement_props = assign(labelelement_props, labelelement_spread_levels[i]);
	}

	labelelement = new LabelElement$1({ props: labelelement_props });

	return {
		c() {
			create_component(labelelement.$$.fragment);
		},
		m(target, anchor) {
			mount_component(labelelement, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const labelelement_changes = (dirty & /*classes, _labelProps, label, id, labelElement, required*/ 44176)
			? get_spread_update(labelelement_spread_levels, [
					dirty & /*classes*/ 32768 && { class: /*classes*/ ctx[15].label },
					dirty & /*_labelProps*/ 8192 && get_spread_object(/*_labelProps*/ ctx[13]),
					dirty & /*label*/ 16 && { label: /*label*/ ctx[4] },
					dirty & /*id*/ 1024 && { id: /*id*/ ctx[10] },
					dirty & /*labelElement*/ 2048 && { labelElement: /*labelElement*/ ctx[11] },
					dirty & /*required*/ 128 && { required: /*required*/ ctx[7] }
				])
			: {};

			labelelement.$set(labelelement_changes);
		},
		i(local) {
			if (current) return;
			transition_in(labelelement.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(labelelement.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(labelelement, detaching);
		}
	};
}

// (18:1) {#if description}
function create_if_block_1$2(ctx) {
	let text_1;
	let current;

	const text_1_spread_levels = [
		/*descriptionProps*/ ctx[8],
		{ color: "gray" },
		{ class: /*classes*/ ctx[15].description }
	];

	let text_1_props = {
		$$slots: { default: [create_default_slot_2$1] },
		$$scope: { ctx }
	};

	for (let i = 0; i < text_1_spread_levels.length; i += 1) {
		text_1_props = assign(text_1_props, text_1_spread_levels[i]);
	}

	text_1 = new Text$1({ props: text_1_props });

	return {
		c() {
			create_component(text_1.$$.fragment);
		},
		m(target, anchor) {
			mount_component(text_1, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const text_1_changes = (dirty & /*descriptionProps, classes*/ 33024)
			? get_spread_update(text_1_spread_levels, [
					dirty & /*descriptionProps*/ 256 && get_spread_object(/*descriptionProps*/ ctx[8]),
					text_1_spread_levels[1],
					dirty & /*classes*/ 32768 && { class: /*classes*/ ctx[15].description }
				])
			: {};

			if (dirty & /*$$scope, description*/ 2097184) {
				text_1_changes.$$scope = { dirty, ctx };
			}

			text_1.$set(text_1_changes);
		},
		i(local) {
			if (current) return;
			transition_in(text_1.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(text_1.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(text_1, detaching);
		}
	};
}

// (19:2) <Text {...descriptionProps} color="gray" class={classes.description}>
function create_default_slot_2$1(ctx) {
	let t;

	return {
		c() {
			t = text(/*description*/ ctx[5]);
		},
		m(target, anchor) {
			insert(target, t, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*description*/ 32) set_data(t, /*description*/ ctx[5]);
		},
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

// (24:1) {#if typeof error !== 'boolean' && error}
function create_if_block$3(ctx) {
	let text_1;
	let current;

	const text_1_spread_levels = [
		/*errorProps*/ ctx[9],
		{ size: /*size*/ ctx[12] },
		{ class: /*classes*/ ctx[15].error }
	];

	let text_1_props = {
		$$slots: { default: [create_default_slot_1$3] },
		$$scope: { ctx }
	};

	for (let i = 0; i < text_1_spread_levels.length; i += 1) {
		text_1_props = assign(text_1_props, text_1_spread_levels[i]);
	}

	text_1 = new Text$1({ props: text_1_props });

	return {
		c() {
			create_component(text_1.$$.fragment);
		},
		m(target, anchor) {
			mount_component(text_1, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const text_1_changes = (dirty & /*errorProps, size, classes*/ 37376)
			? get_spread_update(text_1_spread_levels, [
					dirty & /*errorProps*/ 512 && get_spread_object(/*errorProps*/ ctx[9]),
					dirty & /*size*/ 4096 && { size: /*size*/ ctx[12] },
					dirty & /*classes*/ 32768 && { class: /*classes*/ ctx[15].error }
				])
			: {};

			if (dirty & /*$$scope, error*/ 2097216) {
				text_1_changes.$$scope = { dirty, ctx };
			}

			text_1.$set(text_1_changes);
		},
		i(local) {
			if (current) return;
			transition_in(text_1.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(text_1.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(text_1, detaching);
		}
	};
}

// (25:2) <Text {...errorProps} {size} class={classes.error}>
function create_default_slot_1$3(ctx) {
	let t;

	return {
		c() {
			t = text(/*error*/ ctx[6]);
		},
		m(target, anchor) {
			insert(target, t, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*error*/ 64) set_data(t, /*error*/ ctx[6]);
		},
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

// (14:0) <Box bind:element {use} class={cx(className, getStyles({ css: override }))} {...$$restProps}>
function create_default_slot$5(ctx) {
	let t0;
	let t1;
	let t2;
	let if_block2_anchor;
	let current;
	let if_block0 = /*label*/ ctx[4] && create_if_block_2$2(ctx);
	let if_block1 = /*description*/ ctx[5] && create_if_block_1$2(ctx);
	const default_slot_template = /*#slots*/ ctx[19].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[21], null);
	let if_block2 = typeof /*error*/ ctx[6] !== 'boolean' && /*error*/ ctx[6] && create_if_block$3(ctx);

	return {
		c() {
			if (if_block0) if_block0.c();
			t0 = space();
			if (if_block1) if_block1.c();
			t1 = space();
			if (default_slot) default_slot.c();
			t2 = space();
			if (if_block2) if_block2.c();
			if_block2_anchor = empty();
		},
		m(target, anchor) {
			if (if_block0) if_block0.m(target, anchor);
			insert(target, t0, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert(target, t1, anchor);

			if (default_slot) {
				default_slot.m(target, anchor);
			}

			insert(target, t2, anchor);
			if (if_block2) if_block2.m(target, anchor);
			insert(target, if_block2_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			if (/*label*/ ctx[4]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*label*/ 16) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_2$2(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(t0.parentNode, t0);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			if (/*description*/ ctx[5]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty & /*description*/ 32) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block_1$2(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(t1.parentNode, t1);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}

			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 2097152)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[21],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[21])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[21], dirty, null),
						null
					);
				}
			}

			if (typeof /*error*/ ctx[6] !== 'boolean' && /*error*/ ctx[6]) {
				if (if_block2) {
					if_block2.p(ctx, dirty);

					if (dirty & /*error*/ 64) {
						transition_in(if_block2, 1);
					}
				} else {
					if_block2 = create_if_block$3(ctx);
					if_block2.c();
					transition_in(if_block2, 1);
					if_block2.m(if_block2_anchor.parentNode, if_block2_anchor);
				}
			} else if (if_block2) {
				group_outros();

				transition_out(if_block2, 1, 1, () => {
					if_block2 = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(if_block1);
			transition_in(default_slot, local);
			transition_in(if_block2);
			current = true;
		},
		o(local) {
			transition_out(if_block0);
			transition_out(if_block1);
			transition_out(default_slot, local);
			transition_out(if_block2);
			current = false;
		},
		d(detaching) {
			if (if_block0) if_block0.d(detaching);
			if (detaching) detach(t0);
			if (if_block1) if_block1.d(detaching);
			if (detaching) detach(t1);
			if (default_slot) default_slot.d(detaching);
			if (detaching) detach(t2);
			if (if_block2) if_block2.d(detaching);
			if (detaching) detach(if_block2_anchor);
		}
	};
}

function create_fragment$9(ctx) {
	let box;
	let updating_element;
	let current;

	const box_spread_levels = [
		{ use: /*use*/ ctx[1] },
		{
			class: /*cx*/ ctx[16](/*className*/ ctx[2], /*getStyles*/ ctx[14]({ css: /*override*/ ctx[3] }))
		},
		/*$$restProps*/ ctx[17]
	];

	function box_element_binding(value) {
		/*box_element_binding*/ ctx[20](value);
	}

	let box_props = {
		$$slots: { default: [create_default_slot$5] },
		$$scope: { ctx }
	};

	for (let i = 0; i < box_spread_levels.length; i += 1) {
		box_props = assign(box_props, box_spread_levels[i]);
	}

	if (/*element*/ ctx[0] !== void 0) {
		box_props.element = /*element*/ ctx[0];
	}

	box = new Box$1({ props: box_props });
	binding_callbacks.push(() => bind(box, 'element', box_element_binding));

	return {
		c() {
			create_component(box.$$.fragment);
		},
		m(target, anchor) {
			mount_component(box, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const box_changes = (dirty & /*use, cx, className, getStyles, override, $$restProps*/ 213006)
			? get_spread_update(box_spread_levels, [
					dirty & /*use*/ 2 && { use: /*use*/ ctx[1] },
					dirty & /*cx, className, getStyles, override*/ 81932 && {
						class: /*cx*/ ctx[16](/*className*/ ctx[2], /*getStyles*/ ctx[14]({ css: /*override*/ ctx[3] }))
					},
					dirty & /*$$restProps*/ 131072 && get_spread_object(/*$$restProps*/ ctx[17])
				])
			: {};

			if (dirty & /*$$scope, errorProps, size, classes, error, descriptionProps, description, _labelProps, label, id, labelElement, required*/ 2146288) {
				box_changes.$$scope = { dirty, ctx };
			}

			if (!updating_element && dirty & /*element*/ 1) {
				updating_element = true;
				box_changes.element = /*element*/ ctx[0];
				add_flush_callback(() => updating_element = false);
			}

			box.$set(box_changes);
		},
		i(local) {
			if (current) return;
			transition_in(box.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(box.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(box, detaching);
		}
	};
}

function instance$9($$self, $$props, $$invalidate) {
	let cx;
	let classes;
	let getStyles;

	const omit_props_names = [
		"use","element","class","override","label","description","error","required","labelProps","descriptionProps","errorProps","id","labelElement","size"
	];

	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	let { use = [], element = undefined, class: className = '', override = {}, label = 'label', description = null, error = null, required = false, labelProps = {}, descriptionProps = {}, errorProps = {}, id = 'input-id', labelElement = 'label', size = 'sm' } = $$props;
	let _labelProps;

	function box_element_binding(value) {
		element = value;
		$$invalidate(0, element);
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(17, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('use' in $$new_props) $$invalidate(1, use = $$new_props.use);
		if ('element' in $$new_props) $$invalidate(0, element = $$new_props.element);
		if ('class' in $$new_props) $$invalidate(2, className = $$new_props.class);
		if ('override' in $$new_props) $$invalidate(3, override = $$new_props.override);
		if ('label' in $$new_props) $$invalidate(4, label = $$new_props.label);
		if ('description' in $$new_props) $$invalidate(5, description = $$new_props.description);
		if ('error' in $$new_props) $$invalidate(6, error = $$new_props.error);
		if ('required' in $$new_props) $$invalidate(7, required = $$new_props.required);
		if ('labelProps' in $$new_props) $$invalidate(18, labelProps = $$new_props.labelProps);
		if ('descriptionProps' in $$new_props) $$invalidate(8, descriptionProps = $$new_props.descriptionProps);
		if ('errorProps' in $$new_props) $$invalidate(9, errorProps = $$new_props.errorProps);
		if ('id' in $$new_props) $$invalidate(10, id = $$new_props.id);
		if ('labelElement' in $$new_props) $$invalidate(11, labelElement = $$new_props.labelElement);
		if ('size' in $$new_props) $$invalidate(12, size = $$new_props.size);
		if ('$$scope' in $$new_props) $$invalidate(21, $$scope = $$new_props.$$scope);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*labelElement, id, labelProps*/ 265216) {
			{
				$$invalidate(13, _labelProps = labelElement === 'label'
				? { htmlFor: id, ...labelProps }
				: { ...labelProps });
			}
		}

		if ($$self.$$.dirty & /*size*/ 4096) {
			$$invalidate(16, { cx, classes, getStyles } = useStyles$2({ size }, { name: 'InputWrapper' }), cx, ($$invalidate(15, classes), $$invalidate(12, size)), ($$invalidate(14, getStyles), $$invalidate(12, size)));
		}
	};

	return [
		element,
		use,
		className,
		override,
		label,
		description,
		error,
		required,
		descriptionProps,
		errorProps,
		id,
		labelElement,
		size,
		_labelProps,
		getStyles,
		classes,
		cx,
		$$restProps,
		labelProps,
		slots,
		box_element_binding,
		$$scope
	];
}

class InputWrapper extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$9, create_fragment$9, safe_not_equal, {
			use: 1,
			element: 0,
			class: 2,
			override: 3,
			label: 4,
			description: 5,
			error: 6,
			required: 7,
			labelProps: 18,
			descriptionProps: 8,
			errorProps: 9,
			id: 10,
			labelElement: 11,
			size: 12
		});
	}
}

const InputWrapper$1 = InputWrapper;

const POSITIONS = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
    apart: 'space-between'
};
const useStyles$1 = createStyles((theme, { align, direction, grow, noWrap, position, spacing, children }) => {
    return {
        root: {
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: direction,
            alignItems: align ||
                (direction === 'row'
                    ? 'center'
                    : grow
                        ? 'stretch'
                        : position === 'apart'
                            ? 'flex-start'
                            : POSITIONS[position]),
            flexWrap: noWrap ? 'nowrap' : 'wrap',
            justifyContent: direction === 'row' ? POSITIONS[position] : undefined,
            gap: theme.fn.size({ size: spacing, sizes: theme.space }),
            '& > *': {
                boxSizing: 'border-box',
                maxWidth: grow && direction === 'row'
                    ? `calc(${100 / children}% - ${theme.fn.size({ size: spacing, sizes: theme.space }) -
                        theme.fn.size({ size: spacing, sizes: theme.space }) / children}px)`
                    : undefined,
                flexGrow: grow ? 1 : 0
            }
        }
    };
});

/* node_modules/.pnpm/@svelteuidev+core@0.9.0_ypfjxaydaa2meuohvziy3hvz6y/node_modules/@svelteuidev/core/components/Group/Group.svelte generated by Svelte v3.55.1 */

function create_default_slot$4(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[14].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[16], null);

	return {
		c() {
			if (default_slot) default_slot.c();
		},
		m(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 65536)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[16],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[16])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[16], dirty, null),
						null
					);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};
}

function create_fragment$8(ctx) {
	let box;
	let updating_element;
	let current;

	const box_spread_levels = [
		{ use: /*use*/ ctx[1] },
		{
			class: /*cx*/ ctx[5](/*className*/ ctx[2], /*getStyles*/ ctx[4]({ css: /*override*/ ctx[3] }))
		},
		/*$$restProps*/ ctx[6]
	];

	function box_element_binding(value) {
		/*box_element_binding*/ ctx[15](value);
	}

	let box_props = {
		$$slots: { default: [create_default_slot$4] },
		$$scope: { ctx }
	};

	for (let i = 0; i < box_spread_levels.length; i += 1) {
		box_props = assign(box_props, box_spread_levels[i]);
	}

	if (/*element*/ ctx[0] !== void 0) {
		box_props.element = /*element*/ ctx[0];
	}

	box = new Box$1({ props: box_props });
	binding_callbacks.push(() => bind(box, 'element', box_element_binding));

	return {
		c() {
			create_component(box.$$.fragment);
		},
		m(target, anchor) {
			mount_component(box, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const box_changes = (dirty & /*use, cx, className, getStyles, override, $$restProps*/ 126)
			? get_spread_update(box_spread_levels, [
					dirty & /*use*/ 2 && { use: /*use*/ ctx[1] },
					dirty & /*cx, className, getStyles, override*/ 60 && {
						class: /*cx*/ ctx[5](/*className*/ ctx[2], /*getStyles*/ ctx[4]({ css: /*override*/ ctx[3] }))
					},
					dirty & /*$$restProps*/ 64 && get_spread_object(/*$$restProps*/ ctx[6])
				])
			: {};

			if (dirty & /*$$scope*/ 65536) {
				box_changes.$$scope = { dirty, ctx };
			}

			if (!updating_element && dirty & /*element*/ 1) {
				updating_element = true;
				box_changes.element = /*element*/ ctx[0];
				add_flush_callback(() => updating_element = false);
			}

			box.$set(box_changes);
		},
		i(local) {
			if (current) return;
			transition_in(box.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(box.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(box, detaching);
		}
	};
}

function instance$8($$self, $$props, $$invalidate) {
	let cx;
	let getStyles;

	const omit_props_names = [
		"use","element","class","override","position","noWrap","grow","spacing","direction","align"
	];

	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	let { use = [], element = undefined, class: className = '', override = {}, position = 'left', noWrap = false, grow = false, spacing = 'md', direction = 'row', align = 'center' } = $$props;

	/** The children being rendered */
	let children;

	function box_element_binding(value) {
		element = value;
		$$invalidate(0, element);
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(6, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('use' in $$new_props) $$invalidate(1, use = $$new_props.use);
		if ('element' in $$new_props) $$invalidate(0, element = $$new_props.element);
		if ('class' in $$new_props) $$invalidate(2, className = $$new_props.class);
		if ('override' in $$new_props) $$invalidate(3, override = $$new_props.override);
		if ('position' in $$new_props) $$invalidate(7, position = $$new_props.position);
		if ('noWrap' in $$new_props) $$invalidate(8, noWrap = $$new_props.noWrap);
		if ('grow' in $$new_props) $$invalidate(9, grow = $$new_props.grow);
		if ('spacing' in $$new_props) $$invalidate(10, spacing = $$new_props.spacing);
		if ('direction' in $$new_props) $$invalidate(11, direction = $$new_props.direction);
		if ('align' in $$new_props) $$invalidate(12, align = $$new_props.align);
		if ('$$scope' in $$new_props) $$invalidate(16, $$scope = $$new_props.$$scope);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*element*/ 1) {
			/** can only get access to children at runtime */
			onMount(() => {
				$$invalidate(13, children = element.childElementCount);
			});
		}

		if ($$self.$$.dirty & /*align, children, direction, grow, noWrap, position, spacing*/ 16256) {
			$$invalidate(
				5,
				{ cx, getStyles } = useStyles$1(
					{
						align,
						children,
						direction,
						grow,
						noWrap,
						position,
						spacing
					},
					{ name: 'Group' }
				),
				cx,
				(((((((($$invalidate(4, getStyles), $$invalidate(12, align)), $$invalidate(13, children)), $$invalidate(11, direction)), $$invalidate(9, grow)), $$invalidate(8, noWrap)), $$invalidate(7, position)), $$invalidate(10, spacing)), $$invalidate(0, element))
			);
		}
	};

	return [
		element,
		use,
		className,
		override,
		getStyles,
		cx,
		$$restProps,
		position,
		noWrap,
		grow,
		spacing,
		direction,
		align,
		children,
		slots,
		box_element_binding,
		$$scope
	];
}

class Group extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$8, create_fragment$8, safe_not_equal, {
			use: 1,
			element: 0,
			class: 2,
			override: 3,
			position: 7,
			noWrap: 8,
			grow: 9,
			spacing: 10,
			direction: 11,
			align: 12
		});
	}
}

const Group$1 = Group;

const sizes = {
    xs: 30,
    sm: 36,
    md: 42,
    lg: 50,
    xl: 60
};
const useStyles = createStyles((theme, { icon, iconWidth, invalid, multiline, radius, rightSectionWidth, size, variant, showRightSection }) => {
    return {
        root: {
            darkMode: {
                '& .input': variant === 'headless'
                    ? {}
                    : {
                        color: '$dark50'
                    },
                '&:disabled': {
                    backgroundColor: '$dark600'
                },
                '&::placeholder': {
                    color: '$dark300'
                }
            },
            position: 'relative'
        },
        input: variant === 'headless'
            ? {}
            : {
                height: multiline
                    ? variant === 'unstyled'
                        ? undefined
                        : 'auto'
                    : typeof size === 'number'
                        ? `${size}px`
                        : sizes[size] ?? sizes.md,
                WebkitTapHighlightColor: 'transparent',
                lineHeight: multiline ? '$md' : `${sizes[size] - 2}px`,
                appearance: 'none',
                resize: 'none',
                boxSizing: 'border-box',
                fontSize: typeof size === 'number' ? `${size}px` : `${size}`,
                width: '100%',
                color: 'Black',
                display: 'block',
                textAlign: 'left',
                minHeight: variant === 'default' || variant === 'filled' ? sizes[size] ?? sizes.md : null,
                paddingLeft: (variant === 'default' && icon) || (variant === 'filled' && icon)
                    ? sizes[size] ?? sizes.md / 3
                    : 12,
                paddingRight: variant === 'default' || variant === 'filled'
                    ? showRightSection
                        ? rightSectionWidth
                        : null
                    : null,
                borderRadius: variant === 'default' || variant === 'filled' ? `$${radius}` : null,
                '&:disabled': {
                    backgroundColor: '$gray100',
                    color: '$dark200',
                    opacity: 0.6,
                    cursor: 'not-allowed',
                    '&::placeholder': {
                        color: '$dark200'
                    }
                },
                '&::placeholder': {
                    opacity: 1,
                    userSelect: 'none',
                    color: '$gray500'
                },
                '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button, &::-webkit-search-decoration, &::-webkit-search-cancel-button, &::-webkit-search-results-button, &::-webkit-search-results-decoration': {
                    appearance: 'none'
                },
                '&[type=number]': {
                    MozAppearance: 'textfield'
                },
                '&.defaultVariant': {
                    [`${theme.dark} &`]: {
                        border: `1px solid $dark500`,
                        backgroundColor: '$dark800',
                        '&:focus, &:focus-within': {
                            borderColor: '$blue800'
                        }
                    },
                    border: `1px solid $gray400`,
                    backgroundColor: 'White',
                    transition: 'border-color 100ms ease',
                    '&:focus, &:focus-within': {
                        outline: 'none',
                        borderColor: '$blue500'
                    }
                },
                '&.filledVariant': {
                    [`${theme.dark} &`]: {
                        backgroundColor: '$dark500',
                        '&:focus, &:focus-within': {
                            borderColor: '$blue800 !important'
                        }
                    },
                    border: '1px solid transparent',
                    backgroundColor: '$gray100',
                    '&:focus, &:focus-within': {
                        outline: 'none',
                        borderColor: `$blue500 !important`
                    }
                },
                '&.unstyledVariant': {
                    [`${theme.dark} &`]: {
                        color: '$dark50'
                    },
                    borderWidth: 0,
                    color: 'Black',
                    backgroundColor: 'transparent',
                    minHeight: 28,
                    outline: 0,
                    '&:focus, &:focus-within': {
                        outline: 'none',
                        borderColor: 'transparent'
                    },
                    '&:disabled': {
                        backgroundColor: 'transparent',
                        '&:focus, &:focus-within': {
                            outline: 'none',
                            borderColor: 'transparent'
                        }
                    }
                }
            },
        withIcon: {
            paddingLeft: typeof iconWidth === 'number' ? iconWidth : sizes[size] ?? sizes.md
        },
        disabled: {
            darkMode: {
                backgroundColor: '$dark600 !important'
            },
            backgroundColor: '$gray100 !important',
            color: '$dark200 !important',
            opacity: 0.6,
            cursor: 'not-allowed',
            '&::placeholder': {
                color: '$dark200 !important'
            }
        },
        invalid: {
            darkMode: {
                color: '$red600 !important',
                borderColor: '$red600 !important',
                '&::placeholder': {
                    color: '$red600 !important'
                }
            },
            color: '$red700 !important',
            borderColor: '$red700 !important',
            '&::placeholder': {
                opacity: 1,
                color: '$red700 !important'
            }
        },
        icon: {
            darkMode: {
                color: invalid ? 'red600' : '$dark200'
            },
            pointerEvents: 'none',
            position: 'absolute',
            zIndex: 1,
            left: 0,
            top: 8,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: sizes[size] ?? sizes.md,
            color: invalid ? '$red700' : '$gray500'
        },
        rightSection: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: rightSectionWidth
        }
    };
});

/* node_modules/.pnpm/@svelteuidev+core@0.9.0_ypfjxaydaa2meuohvziy3hvz6y/node_modules/@svelteuidev/core/components/Input/Input.svelte generated by Svelte v3.55.1 */
const get_rightSection_slot_changes$2 = dirty => ({});
const get_rightSection_slot_context$2 = ctx => ({});

// (74:1) {#if icon}
function create_if_block_4(ctx) {
	let iconrenderer;
	let current;

	const iconrenderer_spread_levels = [
		{ icon: /*icon*/ ctx[6] },
		{ className: /*classes*/ ctx[22].icon },
		/*iconProps*/ ctx[7],
		{ iconSize: 16 }
	];

	let iconrenderer_props = {};

	for (let i = 0; i < iconrenderer_spread_levels.length; i += 1) {
		iconrenderer_props = assign(iconrenderer_props, iconrenderer_spread_levels[i]);
	}

	iconrenderer = new IconRenderer$1({ props: iconrenderer_props });

	return {
		c() {
			create_component(iconrenderer.$$.fragment);
		},
		m(target, anchor) {
			mount_component(iconrenderer, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const iconrenderer_changes = (dirty[0] & /*icon, classes, iconProps*/ 4194496)
			? get_spread_update(iconrenderer_spread_levels, [
					dirty[0] & /*icon*/ 64 && { icon: /*icon*/ ctx[6] },
					dirty[0] & /*classes*/ 4194304 && { className: /*classes*/ ctx[22].icon },
					dirty[0] & /*iconProps*/ 128 && get_spread_object(/*iconProps*/ ctx[7]),
					iconrenderer_spread_levels[3]
				])
			: {};

			iconrenderer.$set(iconrenderer_changes);
		},
		i(local) {
			if (current) return;
			transition_in(iconrenderer.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(iconrenderer.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(iconrenderer, detaching);
		}
	};
}

// (127:51) 
function create_if_block_3(ctx) {
	let switch_instance;
	let updating_element;
	let updating_value;
	let switch_instance_anchor;
	let current;

	const switch_instance_spread_levels = [
		{
			use: [/*forwardEvents*/ ctx[24], [useActions, /*use*/ ctx[2]]]
		},
		{ "aria-invalid": /*invalid*/ ctx[15] },
		{
			class: /*cx*/ ctx[23](
				/*className*/ ctx[3],
				{
					[/*classes*/ ctx[22].disabled]: /*disabled*/ ctx[14],
					[/*classes*/ ctx[22].invalid]: /*invalid*/ ctx[15],
					[/*classes*/ ctx[22].withIcon]: /*icon*/ ctx[6]
				},
				`${/*variant*/ ctx[13]}Variant`
			)
		},
		{ disabled: /*disabled*/ ctx[14] },
		{ required: /*required*/ ctx[12] },
		{ id: /*id*/ ctx[11] },
		{ type: /*type*/ ctx[17] },
		/*$$restProps*/ ctx[28]
	];

	function switch_instance_element_binding(value) {
		/*switch_instance_element_binding*/ ctx[37](value);
	}

	function switch_instance_value_binding(value) {
		/*switch_instance_value_binding*/ ctx[38](value);
	}

	var switch_value = /*root*/ ctx[5];

	function switch_props(ctx) {
		let switch_instance_props = {
			$$slots: { default: [create_default_slot_1$2] },
			$$scope: { ctx }
		};

		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
		}

		if (/*element*/ ctx[0] !== void 0) {
			switch_instance_props.element = /*element*/ ctx[0];
		}

		if (/*value*/ ctx[1] !== void 0) {
			switch_instance_props.value = /*value*/ ctx[1];
		}

		return { props: switch_instance_props };
	}

	if (switch_value) {
		switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
		binding_callbacks.push(() => bind(switch_instance, 'element', switch_instance_element_binding));
		binding_callbacks.push(() => bind(switch_instance, 'value', switch_instance_value_binding));
	}

	return {
		c() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		m(target, anchor) {
			if (switch_instance) mount_component(switch_instance, target, anchor);
			insert(target, switch_instance_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const switch_instance_changes = (dirty[0] & /*forwardEvents, use, invalid, cx, className, classes, disabled, icon, variant, required, id, type, $$restProps*/ 297990220)
			? get_spread_update(switch_instance_spread_levels, [
					dirty[0] & /*forwardEvents, use*/ 16777220 && {
						use: [/*forwardEvents*/ ctx[24], [useActions, /*use*/ ctx[2]]]
					},
					dirty[0] & /*invalid*/ 32768 && { "aria-invalid": /*invalid*/ ctx[15] },
					dirty[0] & /*cx, className, classes, disabled, invalid, icon, variant*/ 12640328 && {
						class: /*cx*/ ctx[23](
							/*className*/ ctx[3],
							{
								[/*classes*/ ctx[22].disabled]: /*disabled*/ ctx[14],
								[/*classes*/ ctx[22].invalid]: /*invalid*/ ctx[15],
								[/*classes*/ ctx[22].withIcon]: /*icon*/ ctx[6]
							},
							`${/*variant*/ ctx[13]}Variant`
						)
					},
					dirty[0] & /*disabled*/ 16384 && { disabled: /*disabled*/ ctx[14] },
					dirty[0] & /*required*/ 4096 && { required: /*required*/ ctx[12] },
					dirty[0] & /*id*/ 2048 && { id: /*id*/ ctx[11] },
					dirty[0] & /*type*/ 131072 && { type: /*type*/ ctx[17] },
					dirty[0] & /*$$restProps*/ 268435456 && get_spread_object(/*$$restProps*/ ctx[28])
				])
			: {};

			if (dirty[1] & /*$$scope*/ 256) {
				switch_instance_changes.$$scope = { dirty, ctx };
			}

			if (!updating_element && dirty[0] & /*element*/ 1) {
				updating_element = true;
				switch_instance_changes.element = /*element*/ ctx[0];
				add_flush_callback(() => updating_element = false);
			}

			if (!updating_value && dirty[0] & /*value*/ 2) {
				updating_value = true;
				switch_instance_changes.value = /*value*/ ctx[1];
				add_flush_callback(() => updating_value = false);
			}

			if (switch_value !== (switch_value = /*root*/ ctx[5])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
					binding_callbacks.push(() => bind(switch_instance, 'element', switch_instance_element_binding));
					binding_callbacks.push(() => bind(switch_instance, 'value', switch_instance_value_binding));
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};
}

// (102:50) 
function create_if_block_2$1(ctx) {
	let previous_tag = /*castRoot*/ ctx[25]();
	let svelte_element_anchor;
	let current;
	let svelte_element = /*castRoot*/ ctx[25]() && create_dynamic_element(ctx);

	return {
		c() {
			if (svelte_element) svelte_element.c();
			svelte_element_anchor = empty();
		},
		m(target, anchor) {
			if (svelte_element) svelte_element.m(target, anchor);
			insert(target, svelte_element_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			if (/*castRoot*/ ctx[25]()) {
				if (!previous_tag) {
					svelte_element = create_dynamic_element(ctx);
					svelte_element.c();
					svelte_element.m(svelte_element_anchor.parentNode, svelte_element_anchor);
				} else if (safe_not_equal(previous_tag, /*castRoot*/ ctx[25]())) {
					svelte_element.d(1);
					svelte_element = create_dynamic_element(ctx);
					svelte_element.c();
					svelte_element.m(svelte_element_anchor.parentNode, svelte_element_anchor);
				} else {
					svelte_element.p(ctx, dirty);
				}
			} else if (previous_tag) {
				svelte_element.d(1);
				svelte_element = null;
			}

			previous_tag = /*castRoot*/ ctx[25]();
		},
		i(local) {
			if (current) return;
			transition_in(svelte_element);
			current = true;
		},
		o(local) {
			transition_out(svelte_element);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(svelte_element_anchor);
			if (svelte_element) svelte_element.d(detaching);
		}
	};
}

// (77:1) {#if isHTMLElement && root === 'input'}
function create_if_block_1$1(ctx) {
	let input;
	let input_class_value;
	let useActions_action;
	let mounted;
	let dispose;

	let input_levels = [
		{ value: /*value*/ ctx[1] },
		{ type: /*type*/ ctx[17] },
		{ required: /*required*/ ctx[12] },
		{ disabled: /*disabled*/ ctx[14] },
		{ id: /*id*/ ctx[11] },
		{ placeholder: /*placeholder*/ ctx[18] },
		{ autocomplete: /*autocomplete*/ ctx[16] },
		{ "aria-invalid": /*invalid*/ ctx[15] },
		{
			class: input_class_value = /*cx*/ ctx[23](
				/*className*/ ctx[3],
				/*classes*/ ctx[22].input,
				{
					[/*classes*/ ctx[22].disabled]: /*disabled*/ ctx[14],
					[/*classes*/ ctx[22].invalid]: /*invalid*/ ctx[15]
				},
				`${/*variant*/ ctx[13]}Variant`
			)
		},
		/*$$restProps*/ ctx[28]
	];

	let input_data = {};

	for (let i = 0; i < input_levels.length; i += 1) {
		input_data = assign(input_data, input_levels[i]);
	}

	return {
		c() {
			input = element("input");
			set_attributes(input, input_data);
			toggle_class(input, "disabled", /*disabled*/ ctx[14]);
			toggle_class(input, "invalid", /*invalid*/ ctx[15]);
			toggle_class(input, "withIcon", /*icon*/ ctx[6]);
		},
		m(target, anchor) {
			insert(target, input, anchor);
			input.value = input_data.value;
			if (input.autofocus) input.focus();
			/*input_binding*/ ctx[35](input);

			if (!mounted) {
				dispose = [
					action_destroyer(useActions_action = useActions.call(null, input, /*use*/ ctx[2])),
					action_destroyer(/*forwardEvents*/ ctx[24].call(null, input)),
					listen(input, "input", /*onInput*/ ctx[27])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			set_attributes(input, input_data = get_spread_update(input_levels, [
				dirty[0] & /*value*/ 2 && input.value !== /*value*/ ctx[1] && { value: /*value*/ ctx[1] },
				dirty[0] & /*type*/ 131072 && { type: /*type*/ ctx[17] },
				dirty[0] & /*required*/ 4096 && { required: /*required*/ ctx[12] },
				dirty[0] & /*disabled*/ 16384 && { disabled: /*disabled*/ ctx[14] },
				dirty[0] & /*id*/ 2048 && { id: /*id*/ ctx[11] },
				dirty[0] & /*placeholder*/ 262144 && { placeholder: /*placeholder*/ ctx[18] },
				dirty[0] & /*autocomplete*/ 65536 && { autocomplete: /*autocomplete*/ ctx[16] },
				dirty[0] & /*invalid*/ 32768 && { "aria-invalid": /*invalid*/ ctx[15] },
				dirty[0] & /*cx, className, classes, disabled, invalid, variant*/ 12640264 && input_class_value !== (input_class_value = /*cx*/ ctx[23](
					/*className*/ ctx[3],
					/*classes*/ ctx[22].input,
					{
						[/*classes*/ ctx[22].disabled]: /*disabled*/ ctx[14],
						[/*classes*/ ctx[22].invalid]: /*invalid*/ ctx[15]
					},
					`${/*variant*/ ctx[13]}Variant`
				)) && { class: input_class_value },
				dirty[0] & /*$$restProps*/ 268435456 && /*$$restProps*/ ctx[28]
			]));

			if ('value' in input_data) {
				input.value = input_data.value;
			}

			if (useActions_action && is_function(useActions_action.update) && dirty[0] & /*use*/ 4) useActions_action.update.call(null, /*use*/ ctx[2]);
			toggle_class(input, "disabled", /*disabled*/ ctx[14]);
			toggle_class(input, "invalid", /*invalid*/ ctx[15]);
			toggle_class(input, "withIcon", /*icon*/ ctx[6]);
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(input);
			/*input_binding*/ ctx[35](null);
			mounted = false;
			run_all(dispose);
		}
	};
}

// (128:2) <svelte:component    this={root}    bind:element    bind:value    use={[forwardEvents, [useActions, use]]}    aria-invalid={invalid}    class={cx(     className,     {      [classes.disabled]: disabled,      [classes.invalid]: invalid,      [classes.withIcon]: icon     },     `${variant}Variant`    )}    {disabled}    {required}    {id}    {type}    {...$$restProps}   >
function create_default_slot_1$2(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[34].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[39], null);

	return {
		c() {
			if (default_slot) default_slot.c();
		},
		m(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty[1] & /*$$scope*/ 256)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[39],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[39])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[39], dirty, null),
						null
					);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};
}

// (106:2) <svelte:element    this={castRoot()}    bind:this={element}    {value}    {required}    {disabled}    {id}    {autocomplete}       {type}    aria-invalid={invalid}    class:disabled    class:invalid    class:withIcon={icon}    class={cx(className, classes.input, `${variant}Variant`)}    on:change={onChange}    use:useActions={use}    use:forwardEvents    {...$$restProps}   >
function create_dynamic_element(ctx) {
	let svelte_element;
	let svelte_element_class_value;
	let useActions_action;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[34].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[39], null);

	let svelte_element_levels = [
		{ value: /*value*/ ctx[1] },
		{ required: /*required*/ ctx[12] },
		{ disabled: /*disabled*/ ctx[14] },
		{ id: /*id*/ ctx[11] },
		{ autocomplete: /*autocomplete*/ ctx[16] },
		{ type: /*type*/ ctx[17] },
		{ "aria-invalid": /*invalid*/ ctx[15] },
		{
			class: svelte_element_class_value = /*cx*/ ctx[23](/*className*/ ctx[3], /*classes*/ ctx[22].input, `${/*variant*/ ctx[13]}Variant`)
		},
		/*$$restProps*/ ctx[28]
	];

	let svelte_element_data = {};

	for (let i = 0; i < svelte_element_levels.length; i += 1) {
		svelte_element_data = assign(svelte_element_data, svelte_element_levels[i]);
	}

	return {
		c() {
			svelte_element = element(/*castRoot*/ ctx[25]());
			if (default_slot) default_slot.c();

			if ((/-/).test(/*castRoot*/ ctx[25]())) {
				set_custom_element_data_map(svelte_element, svelte_element_data);
			} else {
				set_attributes(svelte_element, svelte_element_data);
			}

			toggle_class(svelte_element, "disabled", /*disabled*/ ctx[14]);
			toggle_class(svelte_element, "invalid", /*invalid*/ ctx[15]);
			toggle_class(svelte_element, "withIcon", /*icon*/ ctx[6]);
		},
		m(target, anchor) {
			insert(target, svelte_element, anchor);

			if (default_slot) {
				default_slot.m(svelte_element, null);
			}

			/*svelte_element_binding*/ ctx[36](svelte_element);
			current = true;

			if (!mounted) {
				dispose = [
					listen(svelte_element, "change", /*onChange*/ ctx[26]),
					action_destroyer(useActions_action = useActions.call(null, svelte_element, /*use*/ ctx[2])),
					action_destroyer(/*forwardEvents*/ ctx[24].call(null, svelte_element))
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty[1] & /*$$scope*/ 256)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[39],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[39])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[39], dirty, null),
						null
					);
				}
			}

			svelte_element_data = get_spread_update(svelte_element_levels, [
				(!current || dirty[0] & /*value*/ 2) && { value: /*value*/ ctx[1] },
				(!current || dirty[0] & /*required*/ 4096) && { required: /*required*/ ctx[12] },
				(!current || dirty[0] & /*disabled*/ 16384) && { disabled: /*disabled*/ ctx[14] },
				(!current || dirty[0] & /*id*/ 2048) && { id: /*id*/ ctx[11] },
				(!current || dirty[0] & /*autocomplete*/ 65536) && { autocomplete: /*autocomplete*/ ctx[16] },
				(!current || dirty[0] & /*type*/ 131072) && { type: /*type*/ ctx[17] },
				(!current || dirty[0] & /*invalid*/ 32768) && { "aria-invalid": /*invalid*/ ctx[15] },
				(!current || dirty[0] & /*cx, className, classes, variant*/ 12591112 && svelte_element_class_value !== (svelte_element_class_value = /*cx*/ ctx[23](/*className*/ ctx[3], /*classes*/ ctx[22].input, `${/*variant*/ ctx[13]}Variant`))) && { class: svelte_element_class_value },
				dirty[0] & /*$$restProps*/ 268435456 && /*$$restProps*/ ctx[28]
			]);

			if ((/-/).test(/*castRoot*/ ctx[25]())) {
				set_custom_element_data_map(svelte_element, svelte_element_data);
			} else {
				set_attributes(svelte_element, svelte_element_data);
			}

			if (useActions_action && is_function(useActions_action.update) && dirty[0] & /*use*/ 4) useActions_action.update.call(null, /*use*/ ctx[2]);
			toggle_class(svelte_element, "disabled", /*disabled*/ ctx[14]);
			toggle_class(svelte_element, "invalid", /*invalid*/ ctx[15]);
			toggle_class(svelte_element, "withIcon", /*icon*/ ctx[6]);
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(svelte_element);
			if (default_slot) default_slot.d(detaching);
			/*svelte_element_binding*/ ctx[36](null);
			mounted = false;
			run_all(dispose);
		}
	};
}

// (152:1) {#if showRightSection}
function create_if_block$2(ctx) {
	let div;
	let div_class_value;
	let current;
	const rightSection_slot_template = /*#slots*/ ctx[34].rightSection;
	const rightSection_slot = create_slot(rightSection_slot_template, ctx, /*$$scope*/ ctx[39], get_rightSection_slot_context$2);

	let div_levels = [
		/*rightSectionProps*/ ctx[9],
		{
			class: div_class_value = /*classes*/ ctx[22].rightSection
		}
	];

	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	return {
		c() {
			div = element("div");
			if (rightSection_slot) rightSection_slot.c();
			set_attributes(div, div_data);
		},
		m(target, anchor) {
			insert(target, div, anchor);

			if (rightSection_slot) {
				rightSection_slot.m(div, null);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (rightSection_slot) {
				if (rightSection_slot.p && (!current || dirty[1] & /*$$scope*/ 256)) {
					update_slot_base(
						rightSection_slot,
						rightSection_slot_template,
						ctx,
						/*$$scope*/ ctx[39],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[39])
						: get_slot_changes(rightSection_slot_template, /*$$scope*/ ctx[39], dirty, get_rightSection_slot_changes$2),
						get_rightSection_slot_context$2
					);
				}
			}

			set_attributes(div, div_data = get_spread_update(div_levels, [
				dirty[0] & /*rightSectionProps*/ 512 && /*rightSectionProps*/ ctx[9],
				(!current || dirty[0] & /*classes*/ 4194304 && div_class_value !== (div_class_value = /*classes*/ ctx[22].rightSection)) && { class: div_class_value }
			]));
		},
		i(local) {
			if (current) return;
			transition_in(rightSection_slot, local);
			current = true;
		},
		o(local) {
			transition_out(rightSection_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if (rightSection_slot) rightSection_slot.d(detaching);
		}
	};
}

// (73:0) <Box {...wrapperProps} class={getStyles({ css: override })} {...$$restProps}>
function create_default_slot$3(ctx) {
	let t0;
	let show_if;
	let current_block_type_index;
	let if_block1;
	let t1;
	let if_block2_anchor;
	let current;
	let if_block0 = /*icon*/ ctx[6] && create_if_block_4(ctx);
	const if_block_creators = [create_if_block_1$1, create_if_block_2$1, create_if_block_3];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (dirty[0] & /*isHTMLElement, root*/ 524320) show_if = null;
		if (/*isHTMLElement*/ ctx[19] && /*root*/ ctx[5] === 'input') return 0;
		if (show_if == null) show_if = !!(/*isHTMLElement*/ ctx[19] && isInput(String(/*root*/ ctx[5])));
		if (show_if) return 1;
		if (/*isComponent*/ ctx[20] && typeof /*root*/ ctx[5] !== 'string') return 2;
		return -1;
	}

	if (~(current_block_type_index = select_block_type(ctx, [-1, -1]))) {
		if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	}

	let if_block2 = /*showRightSection*/ ctx[8] && create_if_block$2(ctx);

	return {
		c() {
			if (if_block0) if_block0.c();
			t0 = space();
			if (if_block1) if_block1.c();
			t1 = space();
			if (if_block2) if_block2.c();
			if_block2_anchor = empty();
		},
		m(target, anchor) {
			if (if_block0) if_block0.m(target, anchor);
			insert(target, t0, anchor);

			if (~current_block_type_index) {
				if_blocks[current_block_type_index].m(target, anchor);
			}

			insert(target, t1, anchor);
			if (if_block2) if_block2.m(target, anchor);
			insert(target, if_block2_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			if (/*icon*/ ctx[6]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty[0] & /*icon*/ 64) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_4(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(t0.parentNode, t0);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx, dirty);

			if (current_block_type_index === previous_block_index) {
				if (~current_block_type_index) {
					if_blocks[current_block_type_index].p(ctx, dirty);
				}
			} else {
				if (if_block1) {
					group_outros();

					transition_out(if_blocks[previous_block_index], 1, 1, () => {
						if_blocks[previous_block_index] = null;
					});

					check_outros();
				}

				if (~current_block_type_index) {
					if_block1 = if_blocks[current_block_type_index];

					if (!if_block1) {
						if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
						if_block1.c();
					} else {
						if_block1.p(ctx, dirty);
					}

					transition_in(if_block1, 1);
					if_block1.m(t1.parentNode, t1);
				} else {
					if_block1 = null;
				}
			}

			if (/*showRightSection*/ ctx[8]) {
				if (if_block2) {
					if_block2.p(ctx, dirty);

					if (dirty[0] & /*showRightSection*/ 256) {
						transition_in(if_block2, 1);
					}
				} else {
					if_block2 = create_if_block$2(ctx);
					if_block2.c();
					transition_in(if_block2, 1);
					if_block2.m(if_block2_anchor.parentNode, if_block2_anchor);
				}
			} else if (if_block2) {
				group_outros();

				transition_out(if_block2, 1, 1, () => {
					if_block2 = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(if_block1);
			transition_in(if_block2);
			current = true;
		},
		o(local) {
			transition_out(if_block0);
			transition_out(if_block1);
			transition_out(if_block2);
			current = false;
		},
		d(detaching) {
			if (if_block0) if_block0.d(detaching);
			if (detaching) detach(t0);

			if (~current_block_type_index) {
				if_blocks[current_block_type_index].d(detaching);
			}

			if (detaching) detach(t1);
			if (if_block2) if_block2.d(detaching);
			if (detaching) detach(if_block2_anchor);
		}
	};
}

function create_fragment$7(ctx) {
	let box;
	let current;

	const box_spread_levels = [
		/*wrapperProps*/ ctx[10],
		{
			class: /*getStyles*/ ctx[21]({ css: /*override*/ ctx[4] })
		},
		/*$$restProps*/ ctx[28]
	];

	let box_props = {
		$$slots: { default: [create_default_slot$3] },
		$$scope: { ctx }
	};

	for (let i = 0; i < box_spread_levels.length; i += 1) {
		box_props = assign(box_props, box_spread_levels[i]);
	}

	box = new Box$1({ props: box_props });

	return {
		c() {
			create_component(box.$$.fragment);
		},
		m(target, anchor) {
			mount_component(box, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const box_changes = (dirty[0] & /*wrapperProps, getStyles, override, $$restProps*/ 270533648)
			? get_spread_update(box_spread_levels, [
					dirty[0] & /*wrapperProps*/ 1024 && get_spread_object(/*wrapperProps*/ ctx[10]),
					dirty[0] & /*getStyles, override*/ 2097168 && {
						class: /*getStyles*/ ctx[21]({ css: /*override*/ ctx[4] })
					},
					dirty[0] & /*$$restProps*/ 268435456 && get_spread_object(/*$$restProps*/ ctx[28])
				])
			: {};

			if (dirty[0] & /*rightSectionProps, classes, showRightSection, value, type, required, disabled, id, placeholder, autocomplete, invalid, cx, className, variant, $$restProps, element, use, icon, isHTMLElement, root, isComponent, iconProps*/ 283114479 | dirty[1] & /*$$scope*/ 256) {
				box_changes.$$scope = { dirty, ctx };
			}

			box.$set(box_changes);
		},
		i(local) {
			if (current) return;
			transition_in(box.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(box.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(box, detaching);
		}
	};
}

function isInput(root) {
	return ['input', 'select', 'textarea', 'datalist'].includes(root);
}

function instance$7($$self, $$props, $$invalidate) {
	let cx;
	let classes;
	let getStyles;

	const omit_props_names = [
		"use","element","class","override","root","icon","iconWidth","iconProps","showRightSection","rightSectionWidth","rightSectionProps","wrapperProps","id","required","radius","variant","disabled","size","value","invalid","multiline","autocomplete","type","placeholder"
	];

	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	const $$slots = compute_slots(slots);
	let { use = [], element = undefined, class: className = '', override = {}, root = 'input', icon = null, iconWidth = 36, iconProps = { size: 20, color: 'currentColor' }, showRightSection = $$slots.rightSection, rightSectionWidth = 36, rightSectionProps = {}, wrapperProps = {}, id = 'input-id', required = false, radius = 'sm', variant = 'default', disabled = false, size = 'sm', value = '', invalid = false, multiline = false, autocomplete = 'on', type = 'text', placeholder = undefined } = $$props;

	/** An action that forwards inner dom node events from parent component */
	const forwardEvents = createEventForwarder(get_current_component());

	function castRoot() {
		return root;
	}

	let isHTMLElement = true;
	let isComponent = false;

	function onChange() {
		// the 'this' keyword in this case is the
		// HTML element provided in prop 'root'
		$$invalidate(1, value = this.value);
	}

	function onInput(event) {
		if (event.target.type === 'checkbox') {
			$$invalidate(1, value = event.target.checked);
		} else if (event.target.type === 'number' || event.target.type === 'range') {
			$$invalidate(1, value = +event.target.value);
		} else {
			$$invalidate(1, value = event.target.value);
		}
	}

	function input_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			element = $$value;
			$$invalidate(0, element);
		});
	}

	function svelte_element_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			element = $$value;
			$$invalidate(0, element);
		});
	}

	function switch_instance_element_binding(value) {
		element = value;
		$$invalidate(0, element);
	}

	function switch_instance_value_binding(value$1) {
		value = value$1;
		$$invalidate(1, value);
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(28, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('use' in $$new_props) $$invalidate(2, use = $$new_props.use);
		if ('element' in $$new_props) $$invalidate(0, element = $$new_props.element);
		if ('class' in $$new_props) $$invalidate(3, className = $$new_props.class);
		if ('override' in $$new_props) $$invalidate(4, override = $$new_props.override);
		if ('root' in $$new_props) $$invalidate(5, root = $$new_props.root);
		if ('icon' in $$new_props) $$invalidate(6, icon = $$new_props.icon);
		if ('iconWidth' in $$new_props) $$invalidate(29, iconWidth = $$new_props.iconWidth);
		if ('iconProps' in $$new_props) $$invalidate(7, iconProps = $$new_props.iconProps);
		if ('showRightSection' in $$new_props) $$invalidate(8, showRightSection = $$new_props.showRightSection);
		if ('rightSectionWidth' in $$new_props) $$invalidate(30, rightSectionWidth = $$new_props.rightSectionWidth);
		if ('rightSectionProps' in $$new_props) $$invalidate(9, rightSectionProps = $$new_props.rightSectionProps);
		if ('wrapperProps' in $$new_props) $$invalidate(10, wrapperProps = $$new_props.wrapperProps);
		if ('id' in $$new_props) $$invalidate(11, id = $$new_props.id);
		if ('required' in $$new_props) $$invalidate(12, required = $$new_props.required);
		if ('radius' in $$new_props) $$invalidate(31, radius = $$new_props.radius);
		if ('variant' in $$new_props) $$invalidate(13, variant = $$new_props.variant);
		if ('disabled' in $$new_props) $$invalidate(14, disabled = $$new_props.disabled);
		if ('size' in $$new_props) $$invalidate(32, size = $$new_props.size);
		if ('value' in $$new_props) $$invalidate(1, value = $$new_props.value);
		if ('invalid' in $$new_props) $$invalidate(15, invalid = $$new_props.invalid);
		if ('multiline' in $$new_props) $$invalidate(33, multiline = $$new_props.multiline);
		if ('autocomplete' in $$new_props) $$invalidate(16, autocomplete = $$new_props.autocomplete);
		if ('type' in $$new_props) $$invalidate(17, type = $$new_props.type);
		if ('placeholder' in $$new_props) $$invalidate(18, placeholder = $$new_props.placeholder);
		if ('$$scope' in $$new_props) $$invalidate(39, $$scope = $$new_props.$$scope);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*root*/ 32) {
			{
				$$invalidate(19, isHTMLElement = root && typeof root === 'string');
				$$invalidate(20, isComponent = root && typeof root === 'function');
			}
		}

		if ($$self.$$.dirty[0] & /*icon, iconWidth, invalid, rightSectionWidth, showRightSection, variant*/ 1610654016 | $$self.$$.dirty[1] & /*multiline, radius, size*/ 7) {
			$$invalidate(
				23,
				{ cx, classes, getStyles } = useStyles(
					{
						icon,
						iconWidth,
						invalid,
						multiline,
						radius,
						rightSectionWidth,
						showRightSection,
						size,
						variant
					},
					{ name: 'Input' }
				),
				cx,
				((((((((($$invalidate(22, classes), $$invalidate(6, icon)), $$invalidate(29, iconWidth)), $$invalidate(15, invalid)), $$invalidate(33, multiline)), $$invalidate(31, radius)), $$invalidate(30, rightSectionWidth)), $$invalidate(8, showRightSection)), $$invalidate(32, size)), $$invalidate(13, variant)),
				((((((((($$invalidate(21, getStyles), $$invalidate(6, icon)), $$invalidate(29, iconWidth)), $$invalidate(15, invalid)), $$invalidate(33, multiline)), $$invalidate(31, radius)), $$invalidate(30, rightSectionWidth)), $$invalidate(8, showRightSection)), $$invalidate(32, size)), $$invalidate(13, variant))
			);
		}
	};

	return [
		element,
		value,
		use,
		className,
		override,
		root,
		icon,
		iconProps,
		showRightSection,
		rightSectionProps,
		wrapperProps,
		id,
		required,
		variant,
		disabled,
		invalid,
		autocomplete,
		type,
		placeholder,
		isHTMLElement,
		isComponent,
		getStyles,
		classes,
		cx,
		forwardEvents,
		castRoot,
		onChange,
		onInput,
		$$restProps,
		iconWidth,
		rightSectionWidth,
		radius,
		size,
		multiline,
		slots,
		input_binding,
		svelte_element_binding,
		switch_instance_element_binding,
		switch_instance_value_binding,
		$$scope
	];
}

class Input extends SvelteComponent {
	constructor(options) {
		super();

		init(
			this,
			options,
			instance$7,
			create_fragment$7,
			safe_not_equal,
			{
				use: 2,
				element: 0,
				class: 3,
				override: 4,
				root: 5,
				icon: 6,
				iconWidth: 29,
				iconProps: 7,
				showRightSection: 8,
				rightSectionWidth: 30,
				rightSectionProps: 9,
				wrapperProps: 10,
				id: 11,
				required: 12,
				radius: 31,
				variant: 13,
				disabled: 14,
				size: 32,
				value: 1,
				invalid: 15,
				multiline: 33,
				autocomplete: 16,
				type: 17,
				placeholder: 18
			},
			null,
			[-1, -1]
		);
	}
}

const Input$1 = Input;

/* node_modules/.pnpm/@svelteuidev+core@0.9.0_ypfjxaydaa2meuohvziy3hvz6y/node_modules/@svelteuidev/core/components/NativeSelect/ChevronUpDown.svelte generated by Svelte v3.55.1 */

function create_fragment$6(ctx) {
	let svg;
	let path;

	return {
		c() {
			svg = svg_element("svg");
			path = svg_element("path");
			attr(path, "d", "M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z");
			attr(path, "fill", /*color*/ ctx[0]);
			attr(path, "fill-rule", "evenodd");
			attr(path, "clip-rule", "evenodd");
			attr(svg, "width", /*size*/ ctx[1]);
			attr(svg, "height", /*size*/ ctx[1]);
			attr(svg, "viewBox", "0 0 15 15");
			attr(svg, "fill", "none");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			set_style(svg, "color", "#868e96");
			attr(svg, "data-chevron", "true");
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, path);
		},
		p(ctx, [dirty]) {
			if (dirty & /*color*/ 1) {
				attr(path, "fill", /*color*/ ctx[0]);
			}

			if (dirty & /*size*/ 2) {
				attr(svg, "width", /*size*/ ctx[1]);
			}

			if (dirty & /*size*/ 2) {
				attr(svg, "height", /*size*/ ctx[1]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

function instance$6($$self, $$props, $$invalidate) {
	let { color = 'currentColor' } = $$props;
	let { size = 15 } = $$props;

	$$self.$$set = $$props => {
		if ('color' in $$props) $$invalidate(0, color = $$props.color);
		if ('size' in $$props) $$invalidate(1, size = $$props.size);
	};

	return [color, size];
}

class ChevronUpDown extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$6, create_fragment$6, safe_not_equal, { color: 0, size: 1 });
	}
}

const ChevronUpDown$1 = ChevronUpDown;

/* node_modules/.pnpm/@svelteuidev+core@0.9.0_ypfjxaydaa2meuohvziy3hvz6y/node_modules/@svelteuidev/core/components/NativeSelect/NativeSelect.svelte generated by Svelte v3.55.1 */

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[35] = list[i];
	return child_ctx;
}

const get_rightSection_slot_changes$1 = dirty => ({
	size: dirty[0] & /*iconProps*/ 2048,
	color: dirty[0] & /*iconProps*/ 2048
});

const get_rightSection_slot_context$1 = ctx => ({
	size: /*iconProps*/ ctx[11].size,
	color: /*iconProps*/ ctx[11].color
});

// (74:2) {#if placeholder}
function create_if_block$1(ctx) {
	let option;
	let t;
	let option_selected_value;

	return {
		c() {
			option = element("option");
			t = text(/*placeholder*/ ctx[5]);
			option.__value = "";
			option.value = option.__value;
			option.disabled = true;
			option.hidden = true;
			option.selected = option_selected_value = !/*value*/ ctx[1];
		},
		m(target, anchor) {
			insert(target, option, anchor);
			append(option, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*placeholder*/ 32) set_data(t, /*placeholder*/ ctx[5]);

			if (dirty[0] & /*value*/ 2 && option_selected_value !== (option_selected_value = !/*value*/ ctx[1])) {
				option.selected = option_selected_value;
			}
		},
		d(detaching) {
			if (detaching) detach(option);
		}
	};
}

// (83:2) {:else}
function create_else_block(ctx) {
	let option;

	return {
		c() {
			option = element("option");
			option.textContent = "Add Some Options";
			option.__value = "";
			option.value = option.__value;
			option.disabled = true;
			option.hidden = true;
		},
		m(target, anchor) {
			insert(target, option, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(option);
		}
	};
}

// (79:2) {#each formattedData as item}
function create_each_block(ctx) {
	let option;
	let t0_value = (/*item*/ ctx[35].label ?? /*item*/ ctx[35].value) + "";
	let t0;
	let t1;
	let option_value_value;
	let option_disabled_value;
	let option_selected_value;

	return {
		c() {
			option = element("option");
			t0 = text(t0_value);
			t1 = space();
			option.__value = option_value_value = /*item*/ ctx[35].value;
			option.value = option.__value;
			option.disabled = option_disabled_value = /*item*/ ctx[35].disabled;
			option.selected = option_selected_value = /*item*/ ctx[35].value === /*value*/ ctx[1];
		},
		m(target, anchor) {
			insert(target, option, anchor);
			append(option, t0);
			append(option, t1);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*formattedData*/ 16777216 && t0_value !== (t0_value = (/*item*/ ctx[35].label ?? /*item*/ ctx[35].value) + "")) set_data(t0, t0_value);

			if (dirty[0] & /*formattedData*/ 16777216 && option_value_value !== (option_value_value = /*item*/ ctx[35].value)) {
				option.__value = option_value_value;
				option.value = option.__value;
			}

			if (dirty[0] & /*formattedData*/ 16777216 && option_disabled_value !== (option_disabled_value = /*item*/ ctx[35].disabled)) {
				option.disabled = option_disabled_value;
			}

			if (dirty[0] & /*formattedData, value*/ 16777218 && option_selected_value !== (option_selected_value = /*item*/ ctx[35].value === /*value*/ ctx[1])) {
				option.selected = option_selected_value;
			}
		},
		d(detaching) {
			if (detaching) detach(option);
		}
	};
}

// (52:1) <Input   bind:element   use={[forwardEvents, [useActions, use]]}   bind:value   root="select"   id={uuid}   autocomplete="off"   invalid={Boolean(error)}   override={{ ...base, ...inputStyle }}   {size}   {icon}   {radius}   {variant}   {required}   {disabled}   {iconWidth}   {iconProps}   {placeholder}   {rightSectionWidth}   {rightSectionProps}   {...$$restProps}  >
function create_default_slot_1$1(ctx) {
	let t;
	let each_1_anchor;
	let if_block = /*placeholder*/ ctx[5] && create_if_block$1(ctx);
	let each_value = /*formattedData*/ ctx[24];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	let each_1_else = null;

	if (!each_value.length) {
		each_1_else = create_else_block();
	}

	return {
		c() {
			if (if_block) if_block.c();
			t = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();

			if (each_1_else) {
				each_1_else.c();
			}
		},
		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert(target, t, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert(target, each_1_anchor, anchor);

			if (each_1_else) {
				each_1_else.m(target, anchor);
			}
		},
		p(ctx, dirty) {
			if (/*placeholder*/ ctx[5]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block$1(ctx);
					if_block.c();
					if_block.m(t.parentNode, t);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty[0] & /*formattedData, value*/ 16777218) {
				each_value = /*formattedData*/ ctx[24];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;

				if (!each_value.length && each_1_else) {
					each_1_else.p(ctx, dirty);
				} else if (!each_value.length) {
					each_1_else = create_else_block();
					each_1_else.c();
					each_1_else.m(each_1_anchor.parentNode, each_1_anchor);
				} else if (each_1_else) {
					each_1_else.d(1);
					each_1_else = null;
				}
			}
		},
		d(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach(t);
			destroy_each(each_blocks, detaching);
			if (detaching) detach(each_1_anchor);
			if (each_1_else) each_1_else.d(detaching);
		}
	};
}

// (87:75)      
function fallback_block(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	var switch_value = ChevronUpDown$1;

	function switch_props(ctx) {
		return {
			props: {
				size: /*iconProps*/ ctx[11].size,
				color: /*iconProps*/ ctx[11].color
			}
		};
	}

	if (switch_value) {
		switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
	}

	return {
		c() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		m(target, anchor) {
			if (switch_instance) mount_component(switch_instance, target, anchor);
			insert(target, switch_instance_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const switch_instance_changes = {};
			if (dirty[0] & /*iconProps*/ 2048) switch_instance_changes.size = /*iconProps*/ ctx[11].size;
			if (dirty[0] & /*iconProps*/ 2048) switch_instance_changes.color = /*iconProps*/ ctx[11].color;

			if (switch_value !== (switch_value = ChevronUpDown$1)) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};
}

// (86:2) <svelte:fragment slot="rightSection">
function create_rightSection_slot$1(ctx) {
	let current;
	const rightSection_slot_template = /*#slots*/ ctx[31].rightSection;
	const rightSection_slot = create_slot(rightSection_slot_template, ctx, /*$$scope*/ ctx[34], get_rightSection_slot_context$1);
	const rightSection_slot_or_fallback = rightSection_slot || fallback_block(ctx);

	return {
		c() {
			if (rightSection_slot_or_fallback) rightSection_slot_or_fallback.c();
		},
		m(target, anchor) {
			if (rightSection_slot_or_fallback) {
				rightSection_slot_or_fallback.m(target, anchor);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (rightSection_slot) {
				if (rightSection_slot.p && (!current || dirty[0] & /*iconProps*/ 2048 | dirty[1] & /*$$scope*/ 8)) {
					update_slot_base(
						rightSection_slot,
						rightSection_slot_template,
						ctx,
						/*$$scope*/ ctx[34],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[34])
						: get_slot_changes(rightSection_slot_template, /*$$scope*/ ctx[34], dirty, get_rightSection_slot_changes$1),
						get_rightSection_slot_context$1
					);
				}
			} else {
				if (rightSection_slot_or_fallback && rightSection_slot_or_fallback.p && (!current || dirty[0] & /*iconProps*/ 2048)) {
					rightSection_slot_or_fallback.p(ctx, !current ? [-1, -1] : dirty);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(rightSection_slot_or_fallback, local);
			current = true;
		},
		o(local) {
			transition_out(rightSection_slot_or_fallback, local);
			current = false;
		},
		d(detaching) {
			if (rightSection_slot_or_fallback) rightSection_slot_or_fallback.d(detaching);
		}
	};
}

// (38:0) <InputWrapper  id={uuid}  class={className}  {size}  {label}  {error}  {override}  {required}  {labelProps}  {errorProps}  {description}  {descriptionProps}  {...wrapperProps} >
function create_default_slot$2(ctx) {
	let input;
	let updating_element;
	let updating_value;
	let current;

	const input_spread_levels = [
		{
			use: [/*forwardEvents*/ ctx[26], [useActions, /*use*/ ctx[2]]]
		},
		{ root: "select" },
		{ id: /*uuid*/ ctx[25] },
		{ autocomplete: "off" },
		{ invalid: Boolean(/*error*/ ctx[20]) },
		{
			override: {
				.../*base*/ ctx[27],
				.../*inputStyle*/ ctx[6]
			}
		},
		{ size: /*size*/ ctx[8] },
		{ icon: /*icon*/ ctx[9] },
		{ radius: /*radius*/ ctx[15] },
		{ variant: /*variant*/ ctx[16] },
		{ required: /*required*/ ctx[14] },
		{ disabled: /*disabled*/ ctx[17] },
		{ iconWidth: /*iconWidth*/ ctx[10] },
		{ iconProps: /*iconProps*/ ctx[11] },
		{ placeholder: /*placeholder*/ ctx[5] },
		{
			rightSectionWidth: /*rightSectionWidth*/ ctx[12]
		},
		{
			rightSectionProps: /*rightSectionProps*/ ctx[13]
		},
		/*$$restProps*/ ctx[28]
	];

	function input_element_binding(value) {
		/*input_element_binding*/ ctx[32](value);
	}

	function input_value_binding(value) {
		/*input_value_binding*/ ctx[33](value);
	}

	let input_props = {
		$$slots: {
			rightSection: [create_rightSection_slot$1],
			default: [create_default_slot_1$1]
		},
		$$scope: { ctx }
	};

	for (let i = 0; i < input_spread_levels.length; i += 1) {
		input_props = assign(input_props, input_spread_levels[i]);
	}

	if (/*element*/ ctx[0] !== void 0) {
		input_props.element = /*element*/ ctx[0];
	}

	if (/*value*/ ctx[1] !== void 0) {
		input_props.value = /*value*/ ctx[1];
	}

	input = new Input$1({ props: input_props });
	binding_callbacks.push(() => bind(input, 'element', input_element_binding));
	binding_callbacks.push(() => bind(input, 'value', input_value_binding));

	return {
		c() {
			create_component(input.$$.fragment);
		},
		m(target, anchor) {
			mount_component(input, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const input_changes = (dirty[0] & /*forwardEvents, use, uuid, error, base, inputStyle, size, icon, radius, variant, required, disabled, iconWidth, iconProps, placeholder, rightSectionWidth, rightSectionProps, $$restProps*/ 504627044)
			? get_spread_update(input_spread_levels, [
					dirty[0] & /*forwardEvents, use*/ 67108868 && {
						use: [/*forwardEvents*/ ctx[26], [useActions, /*use*/ ctx[2]]]
					},
					input_spread_levels[1],
					dirty[0] & /*uuid*/ 33554432 && { id: /*uuid*/ ctx[25] },
					input_spread_levels[3],
					dirty[0] & /*error*/ 1048576 && { invalid: Boolean(/*error*/ ctx[20]) },
					dirty[0] & /*base, inputStyle*/ 134217792 && {
						override: {
							.../*base*/ ctx[27],
							.../*inputStyle*/ ctx[6]
						}
					},
					dirty[0] & /*size*/ 256 && { size: /*size*/ ctx[8] },
					dirty[0] & /*icon*/ 512 && { icon: /*icon*/ ctx[9] },
					dirty[0] & /*radius*/ 32768 && { radius: /*radius*/ ctx[15] },
					dirty[0] & /*variant*/ 65536 && { variant: /*variant*/ ctx[16] },
					dirty[0] & /*required*/ 16384 && { required: /*required*/ ctx[14] },
					dirty[0] & /*disabled*/ 131072 && { disabled: /*disabled*/ ctx[17] },
					dirty[0] & /*iconWidth*/ 1024 && { iconWidth: /*iconWidth*/ ctx[10] },
					dirty[0] & /*iconProps*/ 2048 && { iconProps: /*iconProps*/ ctx[11] },
					dirty[0] & /*placeholder*/ 32 && { placeholder: /*placeholder*/ ctx[5] },
					dirty[0] & /*rightSectionWidth*/ 4096 && {
						rightSectionWidth: /*rightSectionWidth*/ ctx[12]
					},
					dirty[0] & /*rightSectionProps*/ 8192 && {
						rightSectionProps: /*rightSectionProps*/ ctx[13]
					},
					dirty[0] & /*$$restProps*/ 268435456 && get_spread_object(/*$$restProps*/ ctx[28])
				])
			: {};

			if (dirty[0] & /*iconProps, formattedData, value, placeholder*/ 16779298 | dirty[1] & /*$$scope*/ 8) {
				input_changes.$$scope = { dirty, ctx };
			}

			if (!updating_element && dirty[0] & /*element*/ 1) {
				updating_element = true;
				input_changes.element = /*element*/ ctx[0];
				add_flush_callback(() => updating_element = false);
			}

			if (!updating_value && dirty[0] & /*value*/ 2) {
				updating_value = true;
				input_changes.value = /*value*/ ctx[1];
				add_flush_callback(() => updating_value = false);
			}

			input.$set(input_changes);
		},
		i(local) {
			if (current) return;
			transition_in(input.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(input.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(input, detaching);
		}
	};
}

function create_fragment$5(ctx) {
	let inputwrapper;
	let current;

	const inputwrapper_spread_levels = [
		{ id: /*uuid*/ ctx[25] },
		{ class: /*className*/ ctx[3] },
		{ size: /*size*/ ctx[8] },
		{ label: /*label*/ ctx[18] },
		{ error: /*error*/ ctx[20] },
		{ override: /*override*/ ctx[4] },
		{ required: /*required*/ ctx[14] },
		{ labelProps: /*labelProps*/ ctx[21] },
		{ errorProps: /*errorProps*/ ctx[23] },
		{ description: /*description*/ ctx[19] },
		{
			descriptionProps: /*descriptionProps*/ ctx[22]
		},
		/*wrapperProps*/ ctx[7]
	];

	let inputwrapper_props = {
		$$slots: { default: [create_default_slot$2] },
		$$scope: { ctx }
	};

	for (let i = 0; i < inputwrapper_spread_levels.length; i += 1) {
		inputwrapper_props = assign(inputwrapper_props, inputwrapper_spread_levels[i]);
	}

	inputwrapper = new InputWrapper$1({ props: inputwrapper_props });

	return {
		c() {
			create_component(inputwrapper.$$.fragment);
		},
		m(target, anchor) {
			mount_component(inputwrapper, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const inputwrapper_changes = (dirty[0] & /*uuid, className, size, label, error, override, required, labelProps, errorProps, description, descriptionProps, wrapperProps*/ 50086296)
			? get_spread_update(inputwrapper_spread_levels, [
					dirty[0] & /*uuid*/ 33554432 && { id: /*uuid*/ ctx[25] },
					dirty[0] & /*className*/ 8 && { class: /*className*/ ctx[3] },
					dirty[0] & /*size*/ 256 && { size: /*size*/ ctx[8] },
					dirty[0] & /*label*/ 262144 && { label: /*label*/ ctx[18] },
					dirty[0] & /*error*/ 1048576 && { error: /*error*/ ctx[20] },
					dirty[0] & /*override*/ 16 && { override: /*override*/ ctx[4] },
					dirty[0] & /*required*/ 16384 && { required: /*required*/ ctx[14] },
					dirty[0] & /*labelProps*/ 2097152 && { labelProps: /*labelProps*/ ctx[21] },
					dirty[0] & /*errorProps*/ 8388608 && { errorProps: /*errorProps*/ ctx[23] },
					dirty[0] & /*description*/ 524288 && { description: /*description*/ ctx[19] },
					dirty[0] & /*descriptionProps*/ 4194304 && {
						descriptionProps: /*descriptionProps*/ ctx[22]
					},
					dirty[0] & /*wrapperProps*/ 128 && get_spread_object(/*wrapperProps*/ ctx[7])
				])
			: {};

			if (dirty[0] & /*use, error, inputStyle, size, icon, radius, variant, required, disabled, iconWidth, iconProps, placeholder, rightSectionWidth, rightSectionProps, $$restProps, element, value, formattedData*/ 286523239 | dirty[1] & /*$$scope*/ 8) {
				inputwrapper_changes.$$scope = { dirty, ctx };
			}

			inputwrapper.$set(inputwrapper_changes);
		},
		i(local) {
			if (current) return;
			transition_in(inputwrapper.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(inputwrapper.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(inputwrapper, detaching);
		}
	};
}

function instance$5($$self, $$props, $$invalidate) {
	const omit_props_names = [
		"use","element","class","override","id","placeholder","data","inputStyle","wrapperProps","size","icon","iconWidth","iconProps","rightSectionWidth","rightSectionProps","required","radius","variant","disabled","value","label","description","error","labelProps","descriptionProps","errorProps"
	];

	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	let { use = [], element = undefined, class: className = '', override = {}, id = 'NativeSelect', placeholder = '', data = [], inputStyle = {}, wrapperProps = {}, size = 'sm', icon = null, iconWidth = 36, iconProps = { size: 20, color: 'currentColor' }, rightSectionWidth = 36, rightSectionProps = {}, required = false, radius = 'sm', variant = 'default', disabled = false, value = '', label = '', description = '', error = '', labelProps = {}, descriptionProps = {}, errorProps = {} } = $$props;

	/** Generate random id for label and select elements*/
	const uuid = randomID(id);

	/** Map through the data and format it*/
	let formattedData = [];

	/** An action that forwards inner dom node events from parent component */
	const forwardEvents = createEventForwarder(get_current_component());

	/** When no icon is present give the left section 12px of padding*/
	const base = { '& .input': { paddingLeft: 12 } };

	function input_element_binding(value) {
		element = value;
		$$invalidate(0, element);
	}

	function input_value_binding(value$1) {
		value = value$1;
		$$invalidate(1, value);
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(28, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('use' in $$new_props) $$invalidate(2, use = $$new_props.use);
		if ('element' in $$new_props) $$invalidate(0, element = $$new_props.element);
		if ('class' in $$new_props) $$invalidate(3, className = $$new_props.class);
		if ('override' in $$new_props) $$invalidate(4, override = $$new_props.override);
		if ('id' in $$new_props) $$invalidate(29, id = $$new_props.id);
		if ('placeholder' in $$new_props) $$invalidate(5, placeholder = $$new_props.placeholder);
		if ('data' in $$new_props) $$invalidate(30, data = $$new_props.data);
		if ('inputStyle' in $$new_props) $$invalidate(6, inputStyle = $$new_props.inputStyle);
		if ('wrapperProps' in $$new_props) $$invalidate(7, wrapperProps = $$new_props.wrapperProps);
		if ('size' in $$new_props) $$invalidate(8, size = $$new_props.size);
		if ('icon' in $$new_props) $$invalidate(9, icon = $$new_props.icon);
		if ('iconWidth' in $$new_props) $$invalidate(10, iconWidth = $$new_props.iconWidth);
		if ('iconProps' in $$new_props) $$invalidate(11, iconProps = $$new_props.iconProps);
		if ('rightSectionWidth' in $$new_props) $$invalidate(12, rightSectionWidth = $$new_props.rightSectionWidth);
		if ('rightSectionProps' in $$new_props) $$invalidate(13, rightSectionProps = $$new_props.rightSectionProps);
		if ('required' in $$new_props) $$invalidate(14, required = $$new_props.required);
		if ('radius' in $$new_props) $$invalidate(15, radius = $$new_props.radius);
		if ('variant' in $$new_props) $$invalidate(16, variant = $$new_props.variant);
		if ('disabled' in $$new_props) $$invalidate(17, disabled = $$new_props.disabled);
		if ('value' in $$new_props) $$invalidate(1, value = $$new_props.value);
		if ('label' in $$new_props) $$invalidate(18, label = $$new_props.label);
		if ('description' in $$new_props) $$invalidate(19, description = $$new_props.description);
		if ('error' in $$new_props) $$invalidate(20, error = $$new_props.error);
		if ('labelProps' in $$new_props) $$invalidate(21, labelProps = $$new_props.labelProps);
		if ('descriptionProps' in $$new_props) $$invalidate(22, descriptionProps = $$new_props.descriptionProps);
		if ('errorProps' in $$new_props) $$invalidate(23, errorProps = $$new_props.errorProps);
		if ('$$scope' in $$new_props) $$invalidate(34, $$scope = $$new_props.$$scope);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*data*/ 1073741824) {
			data && $$invalidate(24, formattedData = data.map(item => typeof item === 'string'
			? { label: item, value: item }
			: item));
		}
	};

	return [
		element,
		value,
		use,
		className,
		override,
		placeholder,
		inputStyle,
		wrapperProps,
		size,
		icon,
		iconWidth,
		iconProps,
		rightSectionWidth,
		rightSectionProps,
		required,
		radius,
		variant,
		disabled,
		label,
		description,
		error,
		labelProps,
		descriptionProps,
		errorProps,
		formattedData,
		uuid,
		forwardEvents,
		base,
		$$restProps,
		id,
		data,
		slots,
		input_element_binding,
		input_value_binding,
		$$scope
	];
}

class NativeSelect extends SvelteComponent {
	constructor(options) {
		super();

		init(
			this,
			options,
			instance$5,
			create_fragment$5,
			safe_not_equal,
			{
				use: 2,
				element: 0,
				class: 3,
				override: 4,
				id: 29,
				placeholder: 5,
				data: 30,
				inputStyle: 6,
				wrapperProps: 7,
				size: 8,
				icon: 9,
				iconWidth: 10,
				iconProps: 11,
				rightSectionWidth: 12,
				rightSectionProps: 13,
				required: 14,
				radius: 15,
				variant: 16,
				disabled: 17,
				value: 1,
				label: 18,
				description: 19,
				error: 20,
				labelProps: 21,
				descriptionProps: 22,
				errorProps: 23
			},
			null,
			[-1, -1]
		);
	}
}

const NativeSelect$1 = NativeSelect;

/* node_modules/.pnpm/@svelteuidev+core@0.9.0_ypfjxaydaa2meuohvziy3hvz6y/node_modules/@svelteuidev/core/components/TextInput/TextInput.svelte generated by Svelte v3.55.1 */
const get_rightSection_slot_changes = dirty => ({});
const get_rightSection_slot_context = ctx => ({ slot: "rightSection" });

// (66:2) 
function create_rightSection_slot(ctx) {
	let current;
	const rightSection_slot_template = /*#slots*/ ctx[23].rightSection;
	const rightSection_slot = create_slot(rightSection_slot_template, ctx, /*$$scope*/ ctx[26], get_rightSection_slot_context);

	return {
		c() {
			if (rightSection_slot) rightSection_slot.c();
		},
		m(target, anchor) {
			if (rightSection_slot) {
				rightSection_slot.m(target, anchor);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (rightSection_slot) {
				if (rightSection_slot.p && (!current || dirty & /*$$scope*/ 67108864)) {
					update_slot_base(
						rightSection_slot,
						rightSection_slot_template,
						ctx,
						/*$$scope*/ ctx[26],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[26])
						: get_slot_changes(rightSection_slot_template, /*$$scope*/ ctx[26], dirty, get_rightSection_slot_changes),
						get_rightSection_slot_context
					);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(rightSection_slot, local);
			current = true;
		},
		o(local) {
			transition_out(rightSection_slot, local);
			current = false;
		},
		d(detaching) {
			if (rightSection_slot) rightSection_slot.d(detaching);
		}
	};
}

// (40:0) <InputWrapper  bind:element  class={className}  {override}  {label}  {description}  {error}  {required}  {labelProps}  {descriptionProps}  {errorProps}  id={baseId}  {labelElement}  {size} >
function create_default_slot$1(ctx) {
	let input;
	let updating_value;
	let current;

	const input_spread_levels = [
		{ required: /*required*/ ctx[8] },
		{ size: /*size*/ ctx[13] },
		{ id: /*baseId*/ ctx[17] },
		{ placeholder: /*placeholder*/ ctx[14] },
		/*$$restProps*/ ctx[19],
		{
			use: [/*forwardEvents*/ ctx[16], [useActions, /*use*/ ctx[2]]]
		},
		{ invalid: /*_invalid*/ ctx[15] },
		{
			showRightSection: /*_showRightSection*/ ctx[18]
		}
	];

	function input_value_binding(value) {
		/*input_value_binding*/ ctx[24](value);
	}

	let input_props = {
		$$slots: { rightSection: [create_rightSection_slot] },
		$$scope: { ctx }
	};

	for (let i = 0; i < input_spread_levels.length; i += 1) {
		input_props = assign(input_props, input_spread_levels[i]);
	}

	if (/*value*/ ctx[1] !== void 0) {
		input_props.value = /*value*/ ctx[1];
	}

	input = new Input$1({ props: input_props });
	binding_callbacks.push(() => bind(input, 'value', input_value_binding));

	return {
		c() {
			create_component(input.$$.fragment);
		},
		m(target, anchor) {
			mount_component(input, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const input_changes = (dirty & /*required, size, baseId, placeholder, $$restProps, forwardEvents, useActions, use, _invalid, _showRightSection*/ 1040644)
			? get_spread_update(input_spread_levels, [
					dirty & /*required*/ 256 && { required: /*required*/ ctx[8] },
					dirty & /*size*/ 8192 && { size: /*size*/ ctx[13] },
					dirty & /*baseId*/ 131072 && { id: /*baseId*/ ctx[17] },
					dirty & /*placeholder*/ 16384 && { placeholder: /*placeholder*/ ctx[14] },
					dirty & /*$$restProps*/ 524288 && get_spread_object(/*$$restProps*/ ctx[19]),
					dirty & /*forwardEvents, useActions, use*/ 65540 && {
						use: [/*forwardEvents*/ ctx[16], [useActions, /*use*/ ctx[2]]]
					},
					dirty & /*_invalid*/ 32768 && { invalid: /*_invalid*/ ctx[15] },
					dirty & /*_showRightSection*/ 262144 && {
						showRightSection: /*_showRightSection*/ ctx[18]
					}
				])
			: {};

			if (dirty & /*$$scope*/ 67108864) {
				input_changes.$$scope = { dirty, ctx };
			}

			if (!updating_value && dirty & /*value*/ 2) {
				updating_value = true;
				input_changes.value = /*value*/ ctx[1];
				add_flush_callback(() => updating_value = false);
			}

			input.$set(input_changes);
		},
		i(local) {
			if (current) return;
			transition_in(input.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(input.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(input, detaching);
		}
	};
}

function create_fragment$4(ctx) {
	let inputwrapper;
	let updating_element;
	let current;

	function inputwrapper_element_binding(value) {
		/*inputwrapper_element_binding*/ ctx[25](value);
	}

	let inputwrapper_props = {
		class: /*className*/ ctx[3],
		override: /*override*/ ctx[4],
		label: /*label*/ ctx[5],
		description: /*description*/ ctx[6],
		error: /*error*/ ctx[7],
		required: /*required*/ ctx[8],
		labelProps: /*labelProps*/ ctx[9],
		descriptionProps: /*descriptionProps*/ ctx[10],
		errorProps: /*errorProps*/ ctx[11],
		id: /*baseId*/ ctx[17],
		labelElement: /*labelElement*/ ctx[12],
		size: /*size*/ ctx[13],
		$$slots: { default: [create_default_slot$1] },
		$$scope: { ctx }
	};

	if (/*element*/ ctx[0] !== void 0) {
		inputwrapper_props.element = /*element*/ ctx[0];
	}

	inputwrapper = new InputWrapper$1({ props: inputwrapper_props });
	binding_callbacks.push(() => bind(inputwrapper, 'element', inputwrapper_element_binding));

	return {
		c() {
			create_component(inputwrapper.$$.fragment);
		},
		m(target, anchor) {
			mount_component(inputwrapper, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const inputwrapper_changes = {};
			if (dirty & /*className*/ 8) inputwrapper_changes.class = /*className*/ ctx[3];
			if (dirty & /*override*/ 16) inputwrapper_changes.override = /*override*/ ctx[4];
			if (dirty & /*label*/ 32) inputwrapper_changes.label = /*label*/ ctx[5];
			if (dirty & /*description*/ 64) inputwrapper_changes.description = /*description*/ ctx[6];
			if (dirty & /*error*/ 128) inputwrapper_changes.error = /*error*/ ctx[7];
			if (dirty & /*required*/ 256) inputwrapper_changes.required = /*required*/ ctx[8];
			if (dirty & /*labelProps*/ 512) inputwrapper_changes.labelProps = /*labelProps*/ ctx[9];
			if (dirty & /*descriptionProps*/ 1024) inputwrapper_changes.descriptionProps = /*descriptionProps*/ ctx[10];
			if (dirty & /*errorProps*/ 2048) inputwrapper_changes.errorProps = /*errorProps*/ ctx[11];
			if (dirty & /*labelElement*/ 4096) inputwrapper_changes.labelElement = /*labelElement*/ ctx[12];
			if (dirty & /*size*/ 8192) inputwrapper_changes.size = /*size*/ ctx[13];

			if (dirty & /*$$scope, required, size, placeholder, $$restProps, use, _invalid, value*/ 67690758) {
				inputwrapper_changes.$$scope = { dirty, ctx };
			}

			if (!updating_element && dirty & /*element*/ 1) {
				updating_element = true;
				inputwrapper_changes.element = /*element*/ ctx[0];
				add_flush_callback(() => updating_element = false);
			}

			inputwrapper.$set(inputwrapper_changes);
		},
		i(local) {
			if (current) return;
			transition_in(inputwrapper.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(inputwrapper.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(inputwrapper, detaching);
		}
	};
}

function instance$4($$self, $$props, $$invalidate) {
	let _invalid;

	const omit_props_names = [
		"use","element","class","override","label","description","error","required","labelProps","descriptionProps","errorProps","invalid","id","labelElement","size","showRightSection","value","placeholder"
	];

	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	const $$slots = compute_slots(slots);
	let { use = [], element = undefined, class: className = '', override = {}, label = '', description = null, error = null, required = false, labelProps = {}, descriptionProps = {}, errorProps = {}, invalid = false, id = 'input-id', labelElement = 'label', size = 'sm', showRightSection = undefined, value = '', placeholder = '' } = $$props;

	/** An action that forwards inner dom node events from parent component */
	const forwardEvents = createEventForwarder(get_current_component());

	const baseId = randomID(id);

	// Flag that enables the override of the right section slot
	// of the Input component only if it was provided
	const _showRightSection = showRightSection === undefined
	? !!$$slots.rightSection
	: showRightSection;

	function input_value_binding(value$1) {
		value = value$1;
		$$invalidate(1, value);
	}

	function inputwrapper_element_binding(value) {
		element = value;
		$$invalidate(0, element);
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(19, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('use' in $$new_props) $$invalidate(2, use = $$new_props.use);
		if ('element' in $$new_props) $$invalidate(0, element = $$new_props.element);
		if ('class' in $$new_props) $$invalidate(3, className = $$new_props.class);
		if ('override' in $$new_props) $$invalidate(4, override = $$new_props.override);
		if ('label' in $$new_props) $$invalidate(5, label = $$new_props.label);
		if ('description' in $$new_props) $$invalidate(6, description = $$new_props.description);
		if ('error' in $$new_props) $$invalidate(7, error = $$new_props.error);
		if ('required' in $$new_props) $$invalidate(8, required = $$new_props.required);
		if ('labelProps' in $$new_props) $$invalidate(9, labelProps = $$new_props.labelProps);
		if ('descriptionProps' in $$new_props) $$invalidate(10, descriptionProps = $$new_props.descriptionProps);
		if ('errorProps' in $$new_props) $$invalidate(11, errorProps = $$new_props.errorProps);
		if ('invalid' in $$new_props) $$invalidate(20, invalid = $$new_props.invalid);
		if ('id' in $$new_props) $$invalidate(21, id = $$new_props.id);
		if ('labelElement' in $$new_props) $$invalidate(12, labelElement = $$new_props.labelElement);
		if ('size' in $$new_props) $$invalidate(13, size = $$new_props.size);
		if ('showRightSection' in $$new_props) $$invalidate(22, showRightSection = $$new_props.showRightSection);
		if ('value' in $$new_props) $$invalidate(1, value = $$new_props.value);
		if ('placeholder' in $$new_props) $$invalidate(14, placeholder = $$new_props.placeholder);
		if ('$$scope' in $$new_props) $$invalidate(26, $$scope = $$new_props.$$scope);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*invalid, error*/ 1048704) {
			$$invalidate(15, _invalid = invalid || !!error);
		}
	};

	return [
		element,
		value,
		use,
		className,
		override,
		label,
		description,
		error,
		required,
		labelProps,
		descriptionProps,
		errorProps,
		labelElement,
		size,
		placeholder,
		_invalid,
		forwardEvents,
		baseId,
		_showRightSection,
		$$restProps,
		invalid,
		id,
		showRightSection,
		slots,
		input_value_binding,
		inputwrapper_element_binding,
		$$scope
	];
}

class TextInput extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$4, create_fragment$4, safe_not_equal, {
			use: 2,
			element: 0,
			class: 3,
			override: 4,
			label: 5,
			description: 6,
			error: 7,
			required: 8,
			labelProps: 9,
			descriptionProps: 10,
			errorProps: 11,
			invalid: 20,
			id: 21,
			labelElement: 12,
			size: 13,
			showRightSection: 22,
			value: 1,
			placeholder: 14
		});
	}
}

const TextInput$1 = TextInput;

/* src/components/ConfigSelect.svelte generated by Svelte v3.55.1 */

function create_fragment$3(ctx) {
	let nativeselect;
	let updating_value;
	let current;

	function nativeselect_value_binding(value) {
		/*nativeselect_value_binding*/ ctx[2](value);
	}

	let nativeselect_props = { data: /*configSelectData*/ ctx[0] };

	if (/*$appStore*/ ctx[1].usedConfigId !== void 0) {
		nativeselect_props.value = /*$appStore*/ ctx[1].usedConfigId;
	}

	nativeselect = new NativeSelect$1({ props: nativeselect_props });
	binding_callbacks.push(() => bind(nativeselect, 'value', nativeselect_value_binding));

	return {
		c() {
			create_component(nativeselect.$$.fragment);
		},
		m(target, anchor) {
			mount_component(nativeselect, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const nativeselect_changes = {};
			if (dirty & /*configSelectData*/ 1) nativeselect_changes.data = /*configSelectData*/ ctx[0];

			if (!updating_value && dirty & /*$appStore*/ 2) {
				updating_value = true;
				nativeselect_changes.value = /*$appStore*/ ctx[1].usedConfigId;
				add_flush_callback(() => updating_value = false);
			}

			nativeselect.$set(nativeselect_changes);
		},
		i(local) {
			if (current) return;
			transition_in(nativeselect.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(nativeselect.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(nativeselect, detaching);
		}
	};
}

function instance$3($$self, $$props, $$invalidate) {
	let configSelectData;
	let $appStore;
	component_subscribe($$self, appStore, $$value => $$invalidate(1, $appStore = $$value));

	function nativeselect_value_binding(value) {
		if ($$self.$$.not_equal($appStore.usedConfigId, value)) {
			$appStore.usedConfigId = value;
			appStore.set($appStore);
		}
	}

	$$invalidate(0, configSelectData = [INNER_CONFIG, ...GM_getValue('CONFIG_LIST', [])].map(config => {
		return { label: config.name, value: config.id };
	}));

	return [configSelectData, $appStore, nativeselect_value_binding];
}

class ConfigSelect extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});
	}
}

/* src/components/Actions.svelte generated by Svelte v3.55.1 */

function create_fragment$2(ctx) {
	let copybutton;
	let t0;
	let settingbutton;
	let t1;
	let configselect;
	let current;
	copybutton = new CopyButton({ props: { codeEl: /*codeEl*/ ctx[0] } });
	settingbutton = new SettingButton({});
	configselect = new ConfigSelect({});

	return {
		c() {
			create_component(copybutton.$$.fragment);
			t0 = space();
			create_component(settingbutton.$$.fragment);
			t1 = space();
			create_component(configselect.$$.fragment);
		},
		m(target, anchor) {
			mount_component(copybutton, target, anchor);
			insert(target, t0, anchor);
			mount_component(settingbutton, target, anchor);
			insert(target, t1, anchor);
			mount_component(configselect, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const copybutton_changes = {};
			if (dirty & /*codeEl*/ 1) copybutton_changes.codeEl = /*codeEl*/ ctx[0];
			copybutton.$set(copybutton_changes);
		},
		i(local) {
			if (current) return;
			transition_in(copybutton.$$.fragment, local);
			transition_in(settingbutton.$$.fragment, local);
			transition_in(configselect.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(copybutton.$$.fragment, local);
			transition_out(settingbutton.$$.fragment, local);
			transition_out(configselect.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(copybutton, detaching);
			if (detaching) detach(t0);
			destroy_component(settingbutton, detaching);
			if (detaching) detach(t1);
			destroy_component(configselect, detaching);
		}
	};
}

function instance$2($$self, $$props, $$invalidate) {
	let { codeEl } = $$props;

	$$self.$$set = $$props => {
		if ('codeEl' in $$props) $$invalidate(0, codeEl = $$props.codeEl);
	};

	return [codeEl];
}

class Actions extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$2, create_fragment$2, safe_not_equal, { codeEl: 0 });
	}
}

let nanoid = (size = 21) =>
  crypto.getRandomValues(new Uint8Array(size)).reduce((id, byte) => {
    byte &= 63;
    if (byte < 36) {
      id += byte.toString(36);
    } else if (byte < 62) {
      id += (byte - 26).toString(36).toUpperCase();
    } else if (byte > 62) {
      id += '-';
    } else {
      id += '_';
    }
    return id
  }, '');

/* src/components/JSONEditor.svelte generated by Svelte v3.55.1 */

function add_css$1(target) {
	append_styles(target, "svelte-1v4iww6", ".fcb-setting-textarea.svelte-1v4iww6{margin-top:10px;width:100%;height:400px;outline:none;border-radius:6px;padding:8px 6px;background:#f8f8f8}");
}

function create_fragment$1(ctx) {
	let textarea;
	let textarea_value_value;
	let mounted;
	let dispose;

	return {
		c() {
			textarea = element("textarea");
			attr(textarea, "class", "fcb-setting-textarea svelte-1v4iww6");
			textarea.value = textarea_value_value = JSON.stringify(/*value*/ ctx[0], null, 2);
			textarea.disabled = /*disabled*/ ctx[1];
		},
		m(target, anchor) {
			insert(target, textarea, anchor);

			if (!mounted) {
				dispose = listen(textarea, "input", /*onInput*/ ctx[2]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*value*/ 1 && textarea_value_value !== (textarea_value_value = JSON.stringify(/*value*/ ctx[0], null, 2))) {
				textarea.value = textarea_value_value;
			}

			if (dirty & /*disabled*/ 2) {
				textarea.disabled = /*disabled*/ ctx[1];
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(textarea);
			mounted = false;
			dispose();
		}
	};
}

function instance$1($$self, $$props, $$invalidate) {
	let { value = {} } = $$props;
	let { disabled = false } = $$props;

	function onInput(e) {
		$$invalidate(0, value = JSON.parse(e.target.value));
	}

	$$self.$$set = $$props => {
		if ('value' in $$props) $$invalidate(0, value = $$props.value);
		if ('disabled' in $$props) $$invalidate(1, disabled = $$props.disabled);
	};

	return [value, disabled, onInput];
}

class JSONEditor extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$1, create_fragment$1, safe_not_equal, { value: 0, disabled: 1 }, add_css$1);
	}
}

/* src/components/SettingPanel.svelte generated by Svelte v3.55.1 */

function add_css(target) {
	append_styles(target, "svelte-1h6610i", ":root{color:#333}h2.svelte-1h6610i{margin-top:20px}");
}

// (107:4) <Button on:click={addConfig}>
function create_default_slot_3(ctx) {
	let t;

	return {
		c() {
			t = text("添加配置");
		},
		m(target, anchor) {
			insert(target, t, anchor);
		},
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

// (109:2) {#if currentConfig}
function create_if_block(ctx) {
	let div;
	let h2;
	let t1;
	let t2;
	let if_block1_anchor;
	let current;
	let if_block0 = /*configData*/ ctx[1] && create_if_block_2(ctx);
	let if_block1 = !/*isInnerConfig*/ ctx[3] && create_if_block_1(ctx);

	return {
		c() {
			div = element("div");
			h2 = element("h2");
			h2.textContent = "配置";
			t1 = space();
			if (if_block0) if_block0.c();
			t2 = space();
			if (if_block1) if_block1.c();
			if_block1_anchor = empty();
			attr(h2, "class", "svelte-1h6610i");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, h2);
			append(div, t1);
			if (if_block0) if_block0.m(div, null);
			insert(target, t2, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert(target, if_block1_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			if (/*configData*/ ctx[1]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*configData*/ 2) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_2(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(div, null);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			if (!/*isInnerConfig*/ ctx[3]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty & /*isInnerConfig*/ 8) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block_1(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(if_block1);
			current = true;
		},
		o(local) {
			transition_out(if_block0);
			transition_out(if_block1);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if (if_block0) if_block0.d();
			if (detaching) detach(t2);
			if (if_block1) if_block1.d(detaching);
			if (detaching) detach(if_block1_anchor);
		}
	};
}

// (112:6) {#if configData}
function create_if_block_2(ctx) {
	let textinput0;
	let updating_value;
	let t0;
	let textinput1;
	let updating_value_1;
	let t1;
	let textinput2;
	let updating_value_2;
	let t2;
	let jsoneditor;
	let updating_value_3;
	let current;

	function textinput0_value_binding(value) {
		/*textinput0_value_binding*/ ctx[11](value);
	}

	let textinput0_props = { label: "id", disabled: true };

	if (/*configData*/ ctx[1].id !== void 0) {
		textinput0_props.value = /*configData*/ ctx[1].id;
	}

	textinput0 = new TextInput$1({ props: textinput0_props });
	binding_callbacks.push(() => bind(textinput0, 'value', textinput0_value_binding));

	function textinput1_value_binding(value) {
		/*textinput1_value_binding*/ ctx[12](value);
	}

	let textinput1_props = {
		label: "url",
		disabled: /*isInnerConfig*/ ctx[3]
	};

	if (/*configData*/ ctx[1].url !== void 0) {
		textinput1_props.value = /*configData*/ ctx[1].url;
	}

	textinput1 = new TextInput$1({ props: textinput1_props });
	binding_callbacks.push(() => bind(textinput1, 'value', textinput1_value_binding));

	function textinput2_value_binding(value) {
		/*textinput2_value_binding*/ ctx[13](value);
	}

	let textinput2_props = {
		label: "name",
		disabled: /*isInnerConfig*/ ctx[3]
	};

	if (/*configData*/ ctx[1].name !== void 0) {
		textinput2_props.value = /*configData*/ ctx[1].name;
	}

	textinput2 = new TextInput$1({ props: textinput2_props });
	binding_callbacks.push(() => bind(textinput2, 'value', textinput2_value_binding));

	function jsoneditor_value_binding(value) {
		/*jsoneditor_value_binding*/ ctx[14](value);
	}

	let jsoneditor_props = {
		disabled: /*configData*/ ctx[1].url || /*isInnerConfig*/ ctx[3]
	};

	if (/*configData*/ ctx[1].options !== void 0) {
		jsoneditor_props.value = /*configData*/ ctx[1].options;
	}

	jsoneditor = new JSONEditor({ props: jsoneditor_props });
	binding_callbacks.push(() => bind(jsoneditor, 'value', jsoneditor_value_binding));

	return {
		c() {
			create_component(textinput0.$$.fragment);
			t0 = space();
			create_component(textinput1.$$.fragment);
			t1 = space();
			create_component(textinput2.$$.fragment);
			t2 = space();
			create_component(jsoneditor.$$.fragment);
		},
		m(target, anchor) {
			mount_component(textinput0, target, anchor);
			insert(target, t0, anchor);
			mount_component(textinput1, target, anchor);
			insert(target, t1, anchor);
			mount_component(textinput2, target, anchor);
			insert(target, t2, anchor);
			mount_component(jsoneditor, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const textinput0_changes = {};

			if (!updating_value && dirty & /*configData*/ 2) {
				updating_value = true;
				textinput0_changes.value = /*configData*/ ctx[1].id;
				add_flush_callback(() => updating_value = false);
			}

			textinput0.$set(textinput0_changes);
			const textinput1_changes = {};
			if (dirty & /*isInnerConfig*/ 8) textinput1_changes.disabled = /*isInnerConfig*/ ctx[3];

			if (!updating_value_1 && dirty & /*configData*/ 2) {
				updating_value_1 = true;
				textinput1_changes.value = /*configData*/ ctx[1].url;
				add_flush_callback(() => updating_value_1 = false);
			}

			textinput1.$set(textinput1_changes);
			const textinput2_changes = {};
			if (dirty & /*isInnerConfig*/ 8) textinput2_changes.disabled = /*isInnerConfig*/ ctx[3];

			if (!updating_value_2 && dirty & /*configData*/ 2) {
				updating_value_2 = true;
				textinput2_changes.value = /*configData*/ ctx[1].name;
				add_flush_callback(() => updating_value_2 = false);
			}

			textinput2.$set(textinput2_changes);
			const jsoneditor_changes = {};
			if (dirty & /*configData, isInnerConfig*/ 10) jsoneditor_changes.disabled = /*configData*/ ctx[1].url || /*isInnerConfig*/ ctx[3];

			if (!updating_value_3 && dirty & /*configData*/ 2) {
				updating_value_3 = true;
				jsoneditor_changes.value = /*configData*/ ctx[1].options;
				add_flush_callback(() => updating_value_3 = false);
			}

			jsoneditor.$set(jsoneditor_changes);
		},
		i(local) {
			if (current) return;
			transition_in(textinput0.$$.fragment, local);
			transition_in(textinput1.$$.fragment, local);
			transition_in(textinput2.$$.fragment, local);
			transition_in(jsoneditor.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(textinput0.$$.fragment, local);
			transition_out(textinput1.$$.fragment, local);
			transition_out(textinput2.$$.fragment, local);
			transition_out(jsoneditor.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(textinput0, detaching);
			if (detaching) detach(t0);
			destroy_component(textinput1, detaching);
			if (detaching) detach(t1);
			destroy_component(textinput2, detaching);
			if (detaching) detach(t2);
			destroy_component(jsoneditor, detaching);
		}
	};
}

// (130:4) {#if !isInnerConfig}
function create_if_block_1(ctx) {
	let group;
	let current;

	group = new Group$1({
			props: {
				position: "right",
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(group.$$.fragment);
		},
		m(target, anchor) {
			mount_component(group, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const group_changes = {};

			if (dirty & /*$$scope*/ 524288) {
				group_changes.$$scope = { dirty, ctx };
			}

			group.$set(group_changes);
		},
		i(local) {
			if (current) return;
			transition_in(group.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(group.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(group, detaching);
		}
	};
}

// (132:8) <Button on:click={deleteConfig}>
function create_default_slot_2(ctx) {
	let t;

	return {
		c() {
			t = text("删除配置");
		},
		m(target, anchor) {
			insert(target, t, anchor);
		},
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

// (133:8) <Button on:click={saveConfig}>
function create_default_slot_1(ctx) {
	let t;

	return {
		c() {
			t = text("保存");
		},
		m(target, anchor) {
			insert(target, t, anchor);
		},
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

// (131:6) <Group position="right">
function create_default_slot(ctx) {
	let button0;
	let t;
	let button1;
	let current;

	button0 = new Button$1({
			props: {
				$$slots: { default: [create_default_slot_2] },
				$$scope: { ctx }
			}
		});

	button0.$on("click", /*deleteConfig*/ ctx[5]);

	button1 = new Button$1({
			props: {
				$$slots: { default: [create_default_slot_1] },
				$$scope: { ctx }
			}
		});

	button1.$on("click", /*saveConfig*/ ctx[7]);

	return {
		c() {
			create_component(button0.$$.fragment);
			t = space();
			create_component(button1.$$.fragment);
		},
		m(target, anchor) {
			mount_component(button0, target, anchor);
			insert(target, t, anchor);
			mount_component(button1, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const button0_changes = {};

			if (dirty & /*$$scope*/ 524288) {
				button0_changes.$$scope = { dirty, ctx };
			}

			button0.$set(button0_changes);
			const button1_changes = {};

			if (dirty & /*$$scope*/ 524288) {
				button1_changes.$$scope = { dirty, ctx };
			}

			button1.$set(button1_changes);
		},
		i(local) {
			if (current) return;
			transition_in(button0.$$.fragment, local);
			transition_in(button1.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(button0.$$.fragment, local);
			transition_out(button1.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(button0, detaching);
			if (detaching) detach(t);
			destroy_component(button1, detaching);
		}
	};
}

function create_fragment(ctx) {
	let div1;
	let div0;
	let nativeselect;
	let updating_value;
	let t0;
	let button;
	let t1;
	let current;

	function nativeselect_value_binding(value) {
		/*nativeselect_value_binding*/ ctx[10](value);
	}

	let nativeselect_props = {
		label: "切换配置",
		data: /*configSelectData*/ ctx[4]
	};

	if (/*currentConfigId*/ ctx[0] !== void 0) {
		nativeselect_props.value = /*currentConfigId*/ ctx[0];
	}

	nativeselect = new NativeSelect$1({ props: nativeselect_props });
	binding_callbacks.push(() => bind(nativeselect, 'value', nativeselect_value_binding));

	button = new Button$1({
			props: {
				$$slots: { default: [create_default_slot_3] },
				$$scope: { ctx }
			}
		});

	button.$on("click", /*addConfig*/ ctx[6]);
	let if_block = /*currentConfig*/ ctx[2] && create_if_block(ctx);

	return {
		c() {
			div1 = element("div");
			div0 = element("div");
			create_component(nativeselect.$$.fragment);
			t0 = space();
			create_component(button.$$.fragment);
			t1 = space();
			if (if_block) if_block.c();
			attr(div1, "class", "fcb-setting");
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, div0);
			mount_component(nativeselect, div0, null);
			append(div0, t0);
			mount_component(button, div0, null);
			append(div1, t1);
			if (if_block) if_block.m(div1, null);
			current = true;
		},
		p(ctx, [dirty]) {
			const nativeselect_changes = {};
			if (dirty & /*configSelectData*/ 16) nativeselect_changes.data = /*configSelectData*/ ctx[4];

			if (!updating_value && dirty & /*currentConfigId*/ 1) {
				updating_value = true;
				nativeselect_changes.value = /*currentConfigId*/ ctx[0];
				add_flush_callback(() => updating_value = false);
			}

			nativeselect.$set(nativeselect_changes);
			const button_changes = {};

			if (dirty & /*$$scope*/ 524288) {
				button_changes.$$scope = { dirty, ctx };
			}

			button.$set(button_changes);

			if (/*currentConfig*/ ctx[2]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*currentConfig*/ 4) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(div1, null);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(nativeselect.$$.fragment, local);
			transition_in(button.$$.fragment, local);
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(nativeselect.$$.fragment, local);
			transition_out(button.$$.fragment, local);
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div1);
			destroy_component(nativeselect);
			destroy_component(button);
			if (if_block) if_block.d();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let configSelectData;
	let currentConfig;
	let isInnerConfig;
	let $appStore;
	component_subscribe($$self, appStore, $$value => $$invalidate(15, $appStore = $$value));
	let configList = [INNER_CONFIG, ...GM_getValue('CONFIG_LIST', [])];
	let currentConfigId = $appStore.usedConfigId;
	let configData;

	// 避免死循环，不知道有没有啥更好的办法
	let loadUrl = undefined;

	function syncConfigData() {
		$$invalidate(1, configData = structuredClone(currentConfig));
	}

	async function loadConfigData() {
		$$invalidate(9, loadUrl = configData.url);
		const options = await loadConfig$1(configData.url);
		$$invalidate(1, configData.options = options, configData);
	}

	function deleteConfig() {
		$$invalidate(8, configList = configList.filter(config => config.id !== currentConfigId));
		$$invalidate(0, currentConfigId = configList[0].id);
		cacheLocalConfig();
	}

	function addConfig() {
		const id = nanoid();

		$$invalidate(8, configList = [
			...configList,
			{
				id,
				name: 'new config - ' + Date.now(),
				url: '',
				options: structuredClone(INIT_CONFIG_OPTIONS)
			}
		]);

		$$invalidate(0, currentConfigId = id);
	}

	function cacheLocalConfig() {
		GM_setValue('CONFIG_LIST', configList.filter(i => i.id !== 'inner').map(i => {
			if (i.id === currentConfigId) {
				if (configData.url) {
					return { ...configData, options: {} };
				}

				return configData;
			}

			return i;
		}));
	}

	function saveConfig() {
		cacheLocalConfig();
		toast({ title: '保存成功' });
	}

	function nativeselect_value_binding(value) {
		currentConfigId = value;
		$$invalidate(0, currentConfigId);
	}

	function textinput0_value_binding(value) {
		if ($$self.$$.not_equal(configData.id, value)) {
			configData.id = value;
			$$invalidate(1, configData);
		}
	}

	function textinput1_value_binding(value) {
		if ($$self.$$.not_equal(configData.url, value)) {
			configData.url = value;
			$$invalidate(1, configData);
		}
	}

	function textinput2_value_binding(value) {
		if ($$self.$$.not_equal(configData.name, value)) {
			configData.name = value;
			$$invalidate(1, configData);
		}
	}

	function jsoneditor_value_binding(value) {
		if ($$self.$$.not_equal(configData.options, value)) {
			configData.options = value;
			$$invalidate(1, configData);
		}
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*configList*/ 256) {
			$$invalidate(4, configSelectData = configList.map(config => {
				return { label: config.name, value: config.id };
			}));
		}

		if ($$self.$$.dirty & /*configList, currentConfigId*/ 257) {
			$$invalidate(2, currentConfig = structuredClone(configList.find(config => config.id === currentConfigId)));
		}

		if ($$self.$$.dirty & /*currentConfig*/ 4) {
			if (currentConfig) {
				syncConfigData();
			}
		}

		if ($$self.$$.dirty & /*configData*/ 2) {
			if (!configData.url) {
				$$invalidate(9, loadUrl = undefined);
			}
		}

		if ($$self.$$.dirty & /*configData, loadUrl*/ 514) {
			if (configData.url && configData.url !== loadUrl) {
				loadConfigData();
			}
		}

		if ($$self.$$.dirty & /*currentConfigId*/ 1) {
			$$invalidate(3, isInnerConfig = currentConfigId === 'inner');
		}
	};

	return [
		currentConfigId,
		configData,
		currentConfig,
		isInnerConfig,
		configSelectData,
		deleteConfig,
		addConfig,
		saveConfig,
		configList,
		loadUrl,
		nativeselect_value_binding,
		textinput0_value_binding,
		textinput1_value_binding,
		textinput2_value_binding,
		jsoneditor_value_binding
	];
}

class SettingPanel extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {}, add_css);
	}
}

const PX_TO_VIEWPORT_CONFIG_KEY = '__PX_TO_VIEWPORT_CONFIG';
const FILTER_CONFIG_KEY = '__FILTER_CONFIG';
const REPLACE_CONFIG_KEY = '__REPLACE_CONFIG_KEY';

const CONFIG_URL = '__CONFIG_URL';

const installFigmaPlugin = debounce(function (el) {
  const btnEl = el.querySelector('#fcb-copy-button');
  const codeEl = el.querySelector('p.hljs-comment');
  if (!btnEl && codeEl) {
    const targetEl = document.createElement('div');
    codeEl.parentElement.parentElement.prepend(targetEl);
    // eslint-disable-next-line no-new
    new Actions({
      target: targetEl,
    });
  }
}, 500);

function checkFigma() {
  const oldLog = unsafeWindow.console.log;
  unsafeWindow.console.log = function (...args) {
    if (/\[Fullscreen\] loadtime/gi.test(args[0])) {
      setTimeout(() => {
        const el = document.querySelector('[name=propertiesPanelContainer]');
        if (el) {
          installFigmaPlugin(el);
          el.addEventListener(
            'DOMSubtreeModified',
            installFigmaPlugin.bind(null, el),
            false
          );
        } else {
          toast({
            title: 'FigmaCssBetter 初始化失败',
            duration: 5000,
          });
        }
      }, 1000);
    }
    oldLog(...args);
  };
}

function checkSetting() {
  if (
    /^https:\/\/lbb00.github.io\/figma-css-better\/setting/.test(
      window.location.href
    )
  ) {
    const mainEl = document.querySelector('main');

    // eslint-disable-next-line no-new
    new SettingPanel({
      target: mainEl,
    });
  }
}

function loadConfig() {
  const configUrl = GM_getValue(CONFIG_URL, '');
  if (configUrl) {
    GM_xmlhttpRequest({
      url: configUrl,
      method: 'get',
      onload(xhr) {
        if (+xhr.status !== 200) {
          toast({ title: '配置加载失败' });
          return
        }
        const { pxToViewport, filter, replace } = JSON.parse(xhr.response);
        GM_setValue(PX_TO_VIEWPORT_CONFIG_KEY, pxToViewport);
        GM_setValue(FILTER_CONFIG_KEY, filter);
        GM_setValue(REPLACE_CONFIG_KEY, replace);
      },
      onerror(e) {
        toast({ title: '配置加载失败' + e.message });
      },
    });
  }
}

function main() {
  loadConfig();
  checkFigma();
  checkSetting();
}
main();
