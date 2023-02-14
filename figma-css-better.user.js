// ==UserScript==
// @name        Figma CSS Better
// @namespace   https://github.com/lbb00
// @version     2.0.0
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
// @grant       GM_deleteValue
// @grant       GM_xmlhttpRequest
// ==/UserScript==

(function() {
  "use strict";
  var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
  const freeGlobal$1 = freeGlobal;
  var freeSelf = typeof self == "object" && self && self.Object === Object && self, root$1 = freeGlobal$1 || freeSelf || Function("return this")();
  const root$2 = root$1;
  var Symbol$1 = root$2.Symbol;
  const Symbol$2 = Symbol$1;
  var objectProto$1 = Object.prototype, hasOwnProperty = objectProto$1.hasOwnProperty, nativeObjectToString$1 = objectProto$1.toString, symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : void 0;
  function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag$1), tag = value[symToStringTag$1];
    try {
      value[symToStringTag$1] = void 0;
      var unmasked = !0;
    } catch {
    }
    var result2 = nativeObjectToString$1.call(value);
    return unmasked && (isOwn ? value[symToStringTag$1] = tag : delete value[symToStringTag$1]), result2;
  }
  var objectProto = Object.prototype, nativeObjectToString = objectProto.toString;
  function objectToString(value) {
    return nativeObjectToString.call(value);
  }
  var nullTag = "[object Null]", undefinedTag = "[object Undefined]", symToStringTag = Symbol$2 ? Symbol$2.toStringTag : void 0;
  function baseGetTag(value) {
    return value == null ? value === void 0 ? undefinedTag : nullTag : symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
  }
  function isObjectLike(value) {
    return value != null && typeof value == "object";
  }
  var symbolTag = "[object Symbol]";
  function isSymbol(value) {
    return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
  }
  var reWhitespace = /\s/;
  function trimmedEndIndex(string) {
    for (var index = string.length; index-- && reWhitespace.test(string.charAt(index)); )
      ;
    return index;
  }
  var reTrimStart = /^\s+/;
  function baseTrim(string) {
    return string && string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "");
  }
  function isObject(value) {
    var type = typeof value;
    return value != null && (type == "object" || type == "function");
  }
  var NAN = 0 / 0, reIsBadHex = /^[-+]0x[0-9a-f]+$/i, reIsBinary = /^0b[01]+$/i, reIsOctal = /^0o[0-7]+$/i, freeParseInt = parseInt;
  function toNumber(value) {
    if (typeof value == "number")
      return value;
    if (isSymbol(value))
      return NAN;
    if (isObject(value)) {
      var other = typeof value.valueOf == "function" ? value.valueOf() : value;
      value = isObject(other) ? other + "" : other;
    }
    if (typeof value != "string")
      return value === 0 ? value : +value;
    value = baseTrim(value);
    var isBinary = reIsBinary.test(value);
    return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
  }
  var now = function() {
    return root$2.Date.now();
  };
  const now$1 = now;
  var FUNC_ERROR_TEXT = "Expected a function", nativeMax = Math.max, nativeMin = Math.min;
  function debounce(func, wait, options) {
    var lastArgs, lastThis, maxWait, result2, timerId, lastCallTime, lastInvokeTime = 0, leading = !1, maxing = !1, trailing = !0;
    if (typeof func != "function")
      throw new TypeError(FUNC_ERROR_TEXT);
    wait = toNumber(wait) || 0, isObject(options) && (leading = !!options.leading, maxing = "maxWait" in options, maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait, trailing = "trailing" in options ? !!options.trailing : trailing);
    function invokeFunc(time) {
      var args = lastArgs, thisArg = lastThis;
      return lastArgs = lastThis = void 0, lastInvokeTime = time, result2 = func.apply(thisArg, args), result2;
    }
    function leadingEdge(time) {
      return lastInvokeTime = time, timerId = setTimeout(timerExpired, wait), leading ? invokeFunc(time) : result2;
    }
    function remainingWait(time) {
      var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
      return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
    }
    function shouldInvoke(time) {
      var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
      return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
    }
    function timerExpired() {
      var time = now$1();
      if (shouldInvoke(time))
        return trailingEdge(time);
      timerId = setTimeout(timerExpired, remainingWait(time));
    }
    function trailingEdge(time) {
      return timerId = void 0, trailing && lastArgs ? invokeFunc(time) : (lastArgs = lastThis = void 0, result2);
    }
    function cancel() {
      timerId !== void 0 && clearTimeout(timerId), lastInvokeTime = 0, lastArgs = lastCallTime = lastThis = timerId = void 0;
    }
    function flush2() {
      return timerId === void 0 ? result2 : trailingEdge(now$1());
    }
    function debounced() {
      var time = now$1(), isInvoking = shouldInvoke(time);
      if (lastArgs = arguments, lastThis = this, lastCallTime = time, isInvoking) {
        if (timerId === void 0)
          return leadingEdge(lastCallTime);
        if (maxing)
          return clearTimeout(timerId), timerId = setTimeout(timerExpired, wait), invokeFunc(lastCallTime);
      }
      return timerId === void 0 && (timerId = setTimeout(timerExpired, wait)), result2;
    }
    return debounced.cancel = cancel, debounced.flush = flush2, debounced;
  }
  function noop() {
  }
  function assign(tar, src2) {
    for (const k2 in src2)
      tar[k2] = src2[k2];
    return tar;
  }
  function run(fn) {
    return fn();
  }
  function blank_object() {
    return /* @__PURE__ */ Object.create(null);
  }
  function run_all(fns2) {
    fns2.forEach(run);
  }
  function is_function(thing) {
    return typeof thing == "function";
  }
  function safe_not_equal(a2, b2) {
    return a2 != a2 ? b2 == b2 : a2 !== b2 || a2 && typeof a2 == "object" || typeof a2 == "function";
  }
  function is_empty(obj) {
    return Object.keys(obj).length === 0;
  }
  function subscribe(store, ...callbacks) {
    if (store == null)
      return noop;
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
  }
  function get_store_value(store) {
    let value;
    return subscribe(store, (_) => value = _)(), value;
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
    return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
  }
  function get_slot_changes(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
      const lets = definition[2](fn(dirty));
      if ($$scope.dirty === void 0)
        return lets;
      if (typeof lets == "object") {
        const merged = [], len = Math.max($$scope.dirty.length, lets.length);
        for (let i2 = 0; i2 < len; i2 += 1)
          merged[i2] = $$scope.dirty[i2] | lets[i2];
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
      const dirty = [], length = $$scope.ctx.length / 32;
      for (let i2 = 0; i2 < length; i2++)
        dirty[i2] = -1;
      return dirty;
    }
    return -1;
  }
  function exclude_internal_props(props) {
    const result2 = {};
    for (const k2 in props)
      k2[0] !== "$" && (result2[k2] = props[k2]);
    return result2;
  }
  function compute_rest_props(props, keys) {
    const rest = {};
    keys = new Set(keys);
    for (const k2 in props)
      !keys.has(k2) && k2[0] !== "$" && (rest[k2] = props[k2]);
    return rest;
  }
  function compute_slots(slots) {
    const result2 = {};
    for (const key2 in slots)
      result2[key2] = !0;
    return result2;
  }
  function action_destroyer(action_result) {
    return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
  }
  function append(target, node2) {
    target.appendChild(node2);
  }
  function append_styles(target, style_sheet_id, styles) {
    const append_styles_to = get_root_for_style(target);
    if (!append_styles_to.getElementById(style_sheet_id)) {
      const style2 = element("style");
      style2.id = style_sheet_id, style2.textContent = styles, append_stylesheet(append_styles_to, style2);
    }
  }
  function get_root_for_style(node2) {
    if (!node2)
      return document;
    const root2 = node2.getRootNode ? node2.getRootNode() : node2.ownerDocument;
    return root2 && root2.host ? root2 : node2.ownerDocument;
  }
  function append_stylesheet(node2, style2) {
    return append(node2.head || node2, style2), style2.sheet;
  }
  function insert(target, node2, anchor) {
    target.insertBefore(node2, anchor || null);
  }
  function detach(node2) {
    node2.parentNode && node2.parentNode.removeChild(node2);
  }
  function destroy_each(iterations, detaching) {
    for (let i2 = 0; i2 < iterations.length; i2 += 1)
      iterations[i2] && iterations[i2].d(detaching);
  }
  function element(name) {
    return document.createElement(name);
  }
  function svg_element(name) {
    return document.createElementNS("http://www.w3.org/2000/svg", name);
  }
  function text(data) {
    return document.createTextNode(data);
  }
  function space() {
    return text(" ");
  }
  function empty() {
    return text("");
  }
  function listen(node2, event, handler, options) {
    return node2.addEventListener(event, handler, options), () => node2.removeEventListener(event, handler, options);
  }
  function prevent_default(fn) {
    return function(event) {
      return event.preventDefault(), fn.call(this, event);
    };
  }
  function stop_propagation(fn) {
    return function(event) {
      return event.stopPropagation(), fn.call(this, event);
    };
  }
  function attr(node2, attribute, value) {
    value == null ? node2.removeAttribute(attribute) : node2.getAttribute(attribute) !== value && node2.setAttribute(attribute, value);
  }
  function set_attributes(node2, attributes) {
    const descriptors = Object.getOwnPropertyDescriptors(node2.__proto__);
    for (const key2 in attributes)
      attributes[key2] == null ? node2.removeAttribute(key2) : key2 === "style" ? node2.style.cssText = attributes[key2] : key2 === "__value" ? node2.value = node2[key2] = attributes[key2] : descriptors[key2] && descriptors[key2].set ? node2[key2] = attributes[key2] : attr(node2, key2, attributes[key2]);
  }
  function set_custom_element_data_map(node2, data_map) {
    Object.keys(data_map).forEach((key2) => {
      set_custom_element_data(node2, key2, data_map[key2]);
    });
  }
  function set_custom_element_data(node2, prop, value) {
    prop in node2 ? node2[prop] = typeof node2[prop] == "boolean" && value === "" ? !0 : value : attr(node2, prop, value);
  }
  function children(element2) {
    return Array.from(element2.childNodes);
  }
  function set_data(text2, data) {
    data = "" + data, text2.wholeText !== data && (text2.data = data);
  }
  function set_style(node2, key2, value, important) {
    value === null ? node2.style.removeProperty(key2) : node2.style.setProperty(key2, value, important ? "important" : "");
  }
  function toggle_class(element2, name, toggle) {
    element2.classList[toggle ? "add" : "remove"](name);
  }
  class HtmlTag {
    constructor(is_svg = !1) {
      this.is_svg = !1, this.is_svg = is_svg, this.e = this.n = null;
    }
    c(html) {
      this.h(html);
    }
    m(html, target, anchor = null) {
      this.e || (this.is_svg ? this.e = svg_element(target.nodeName) : this.e = element(target.nodeName), this.t = target, this.c(html)), this.i(anchor);
    }
    h(html) {
      this.e.innerHTML = html, this.n = Array.from(this.e.childNodes);
    }
    i(anchor) {
      for (let i2 = 0; i2 < this.n.length; i2 += 1)
        insert(this.t, this.n[i2], anchor);
    }
    p(html) {
      this.d(), this.h(html), this.i(this.a);
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
      throw new Error("Function called outside component initialization");
    return current_component;
  }
  function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
  }
  function onDestroy(fn) {
    get_current_component().$$.on_destroy.push(fn);
  }
  function getContext(key2) {
    return get_current_component().$$.context.get(key2);
  }
  function bubble(component, event) {
    const callbacks = component.$$.callbacks[event.type];
    callbacks && callbacks.slice().forEach((fn) => fn.call(this, event));
  }
  const dirty_components = [], binding_callbacks = [], render_callbacks = [], flush_callbacks = [], resolved_promise = Promise.resolve();
  let update_scheduled = !1;
  function schedule_update() {
    update_scheduled || (update_scheduled = !0, resolved_promise.then(flush));
  }
  function tick() {
    return schedule_update(), resolved_promise;
  }
  function add_render_callback(fn) {
    render_callbacks.push(fn);
  }
  function add_flush_callback(fn) {
    flush_callbacks.push(fn);
  }
  const seen_callbacks = /* @__PURE__ */ new Set();
  let flushidx = 0;
  function flush() {
    if (flushidx !== 0)
      return;
    const saved_component = current_component;
    do {
      try {
        for (; flushidx < dirty_components.length; ) {
          const component = dirty_components[flushidx];
          flushidx++, set_current_component(component), update(component.$$);
        }
      } catch (e) {
        throw dirty_components.length = 0, flushidx = 0, e;
      }
      for (set_current_component(null), dirty_components.length = 0, flushidx = 0; binding_callbacks.length; )
        binding_callbacks.pop()();
      for (let i2 = 0; i2 < render_callbacks.length; i2 += 1) {
        const callback = render_callbacks[i2];
        seen_callbacks.has(callback) || (seen_callbacks.add(callback), callback());
      }
      render_callbacks.length = 0;
    } while (dirty_components.length);
    for (; flush_callbacks.length; )
      flush_callbacks.pop()();
    update_scheduled = !1, seen_callbacks.clear(), set_current_component(saved_component);
  }
  function update($$) {
    if ($$.fragment !== null) {
      $$.update(), run_all($$.before_update);
      const dirty = $$.dirty;
      $$.dirty = [-1], $$.fragment && $$.fragment.p($$.ctx, dirty), $$.after_update.forEach(add_render_callback);
    }
  }
  const outroing = /* @__PURE__ */ new Set();
  let outros;
  function group_outros() {
    outros = {
      r: 0,
      c: [],
      p: outros
      // parent group
    };
  }
  function check_outros() {
    outros.r || run_all(outros.c), outros = outros.p;
  }
  function transition_in(block, local) {
    block && block.i && (outroing.delete(block), block.i(local));
  }
  function transition_out(block, local, detach2, callback) {
    if (block && block.o) {
      if (outroing.has(block))
        return;
      outroing.add(block), outros.c.push(() => {
        outroing.delete(block), callback && (detach2 && block.d(1), callback());
      }), block.o(local);
    } else
      callback && callback();
  }
  function get_spread_update(levels, updates) {
    const update2 = {}, to_null_out = {}, accounted_for = { $$scope: 1 };
    let i2 = levels.length;
    for (; i2--; ) {
      const o2 = levels[i2], n2 = updates[i2];
      if (n2) {
        for (const key2 in o2)
          key2 in n2 || (to_null_out[key2] = 1);
        for (const key2 in n2)
          accounted_for[key2] || (update2[key2] = n2[key2], accounted_for[key2] = 1);
        levels[i2] = n2;
      } else
        for (const key2 in o2)
          accounted_for[key2] = 1;
    }
    for (const key2 in to_null_out)
      key2 in update2 || (update2[key2] = void 0);
    return update2;
  }
  function get_spread_object(spread_props) {
    return typeof spread_props == "object" && spread_props !== null ? spread_props : {};
  }
  function bind(component, name, callback) {
    const index = component.$$.props[name];
    index !== void 0 && (component.$$.bound[index] = callback, callback(component.$$.ctx[index]));
  }
  function create_component(block) {
    block && block.c();
  }
  function mount_component(component, target, anchor, customElement) {
    const { fragment, after_update } = component.$$;
    fragment && fragment.m(target, anchor), customElement || add_render_callback(() => {
      const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
      component.$$.on_destroy ? component.$$.on_destroy.push(...new_on_destroy) : run_all(new_on_destroy), component.$$.on_mount = [];
    }), after_update.forEach(add_render_callback);
  }
  function destroy_component(component, detaching) {
    const $$ = component.$$;
    $$.fragment !== null && (run_all($$.on_destroy), $$.fragment && $$.fragment.d(detaching), $$.on_destroy = $$.fragment = null, $$.ctx = []);
  }
  function make_dirty(component, i2) {
    component.$$.dirty[0] === -1 && (dirty_components.push(component), schedule_update(), component.$$.dirty.fill(0)), component.$$.dirty[i2 / 31 | 0] |= 1 << i2 % 31;
  }
  function init(component, options, instance2, create_fragment2, not_equal, props, append_styles2, dirty = [-1]) {
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
      skip_bound: !1,
      root: options.target || parent_component.$$.root
    };
    append_styles2 && append_styles2($$.root);
    let ready = !1;
    if ($$.ctx = instance2 ? instance2(component, options.props || {}, (i2, ret, ...rest) => {
      const value = rest.length ? rest[0] : ret;
      return $$.ctx && not_equal($$.ctx[i2], $$.ctx[i2] = value) && (!$$.skip_bound && $$.bound[i2] && $$.bound[i2](value), ready && make_dirty(component, i2)), ret;
    }) : [], $$.update(), ready = !0, run_all($$.before_update), $$.fragment = create_fragment2 ? create_fragment2($$.ctx) : !1, options.target) {
      if (options.hydrate) {
        const nodes = children(options.target);
        $$.fragment && $$.fragment.l(nodes), nodes.forEach(detach);
      } else
        $$.fragment && $$.fragment.c();
      options.intro && transition_in(component.$$.fragment), mount_component(component, options.target, options.anchor, options.customElement), flush();
    }
    set_current_component(parent_component);
  }
  class SvelteComponent {
    $destroy() {
      destroy_component(this, 1), this.$destroy = noop;
    }
    $on(type, callback) {
      if (!is_function(callback))
        return noop;
      const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      return callbacks.push(callback), () => {
        const index = callbacks.indexOf(callback);
        index !== -1 && callbacks.splice(index, 1);
      };
    }
    $set($$props) {
      this.$$set && !is_empty($$props) && (this.$$.skip_bound = !0, this.$$set($$props), this.$$.skip_bound = !1);
    }
  }
  var commonjsGlobal = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
  function getAugmentedNamespace(n2) {
    if (n2.__esModule)
      return n2;
    var f2 = n2.default;
    if (typeof f2 == "function") {
      var a2 = function a3() {
        if (this instanceof a3) {
          var args = [null];
          args.push.apply(args, arguments);
          var Ctor = Function.bind.apply(f2, args);
          return new Ctor();
        }
        return f2.apply(this, arguments);
      };
      a2.prototype = f2.prototype;
    } else
      a2 = {};
    return Object.defineProperty(a2, "__esModule", { value: !0 }), Object.keys(n2).forEach(function(k2) {
      var d2 = Object.getOwnPropertyDescriptor(n2, k2);
      Object.defineProperty(a2, k2, d2.get ? d2 : {
        enumerable: !0,
        get: function() {
          return n2[k2];
        }
      });
    }), a2;
  }
  var picocolors_browserExports = {}, picocolors_browser = {
    get exports() {
      return picocolors_browserExports;
    },
    set exports(v2) {
      picocolors_browserExports = v2;
    }
  }, x$1 = String, create = function() {
    return { isColorSupported: !1, reset: x$1, bold: x$1, dim: x$1, italic: x$1, underline: x$1, inverse: x$1, hidden: x$1, strikethrough: x$1, black: x$1, red: x$1, green: x$1, yellow: x$1, blue: x$1, magenta: x$1, cyan: x$1, white: x$1, gray: x$1, bgBlack: x$1, bgRed: x$1, bgGreen: x$1, bgYellow: x$1, bgBlue: x$1, bgMagenta: x$1, bgCyan: x$1, bgWhite: x$1 };
  };
  picocolors_browser.exports = create(), picocolors_browserExports.createColors = create;
  const require$$2 = /* @__PURE__ */ getAugmentedNamespace(/* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: {}
  }, Symbol.toStringTag, { value: "Module" })));
  let pico = picocolors_browserExports, terminalHighlight$1 = require$$2, CssSyntaxError$3 = class CssSyntaxError2 extends Error {
    constructor(message, line, column, source, file, plugin) {
      super(message), this.name = "CssSyntaxError", this.reason = message, file && (this.file = file), source && (this.source = source), plugin && (this.plugin = plugin), typeof line < "u" && typeof column < "u" && (typeof line == "number" ? (this.line = line, this.column = column) : (this.line = line.line, this.column = line.column, this.endLine = column.line, this.endColumn = column.column)), this.setMessage(), Error.captureStackTrace && Error.captureStackTrace(this, CssSyntaxError2);
    }
    setMessage() {
      this.message = this.plugin ? this.plugin + ": " : "", this.message += this.file ? this.file : "<css input>", typeof this.line < "u" && (this.message += ":" + this.line + ":" + this.column), this.message += ": " + this.reason;
    }
    showSourceCode(color) {
      if (!this.source)
        return "";
      let css2 = this.source;
      color == null && (color = pico.isColorSupported), terminalHighlight$1 && color && (css2 = terminalHighlight$1(css2));
      let lines = css2.split(/\r?\n/), start = Math.max(this.line - 3, 0), end = Math.min(this.line + 2, lines.length), maxWidth = String(end).length, mark, aside;
      if (color) {
        let { bold, red, gray } = pico.createColors(!0);
        mark = (text2) => bold(red(text2)), aside = (text2) => gray(text2);
      } else
        mark = aside = (str) => str;
      return lines.slice(start, end).map((line, index) => {
        let number = start + 1 + index, gutter = " " + (" " + number).slice(-maxWidth) + " | ";
        if (number === this.line) {
          let spacing = aside(gutter.replace(/\d/g, " ")) + line.slice(0, this.column - 1).replace(/[^\t]/g, " ");
          return mark(">") + aside(gutter) + line + `
 ` + spacing + mark("^");
        }
        return " " + aside(gutter) + line;
      }).join(`
`);
    }
    toString() {
      let code = this.showSourceCode();
      return code && (code = `

` + code + `
`), this.name + ": " + this.message + code;
    }
  };
  var cssSyntaxError = CssSyntaxError$3;
  CssSyntaxError$3.default = CssSyntaxError$3;
  var symbols = {};
  symbols.isClean = Symbol("isClean"), symbols.my = Symbol("my");
  const DEFAULT_RAW = {
    colon: ": ",
    indent: "    ",
    beforeDecl: `
`,
    beforeRule: `
`,
    beforeOpen: " ",
    beforeClose: `
`,
    beforeComment: `
`,
    after: `
`,
    emptyBody: "",
    commentLeft: " ",
    commentRight: " ",
    semicolon: !1
  };
  function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
  }
  let Stringifier$2 = class {
    constructor(builder) {
      this.builder = builder;
    }
    stringify(node2, semicolon) {
      if (!this[node2.type])
        throw new Error(
          "Unknown AST node type " + node2.type + ". Maybe you need to change PostCSS stringifier."
        );
      this[node2.type](node2, semicolon);
    }
    document(node2) {
      this.body(node2);
    }
    root(node2) {
      this.body(node2), node2.raws.after && this.builder(node2.raws.after);
    }
    comment(node2) {
      let left = this.raw(node2, "left", "commentLeft"), right = this.raw(node2, "right", "commentRight");
      this.builder("/*" + left + node2.text + right + "*/", node2);
    }
    decl(node2, semicolon) {
      let between = this.raw(node2, "between", "colon"), string = node2.prop + between + this.rawValue(node2, "value");
      node2.important && (string += node2.raws.important || " !important"), semicolon && (string += ";"), this.builder(string, node2);
    }
    rule(node2) {
      this.block(node2, this.rawValue(node2, "selector")), node2.raws.ownSemicolon && this.builder(node2.raws.ownSemicolon, node2, "end");
    }
    atrule(node2, semicolon) {
      let name = "@" + node2.name, params = node2.params ? this.rawValue(node2, "params") : "";
      if (typeof node2.raws.afterName < "u" ? name += node2.raws.afterName : params && (name += " "), node2.nodes)
        this.block(node2, name + params);
      else {
        let end = (node2.raws.between || "") + (semicolon ? ";" : "");
        this.builder(name + params + end, node2);
      }
    }
    body(node2) {
      let last = node2.nodes.length - 1;
      for (; last > 0 && node2.nodes[last].type === "comment"; )
        last -= 1;
      let semicolon = this.raw(node2, "semicolon");
      for (let i2 = 0; i2 < node2.nodes.length; i2++) {
        let child = node2.nodes[i2], before = this.raw(child, "before");
        before && this.builder(before), this.stringify(child, last !== i2 || semicolon);
      }
    }
    block(node2, start) {
      let between = this.raw(node2, "between", "beforeOpen");
      this.builder(start + between + "{", node2, "start");
      let after;
      node2.nodes && node2.nodes.length ? (this.body(node2), after = this.raw(node2, "after")) : after = this.raw(node2, "after", "emptyBody"), after && this.builder(after), this.builder("}", node2, "end");
    }
    raw(node2, own, detect) {
      let value;
      if (detect || (detect = own), own && (value = node2.raws[own], typeof value < "u"))
        return value;
      let parent = node2.parent;
      if (detect === "before" && (!parent || parent.type === "root" && parent.first === node2 || parent && parent.type === "document"))
        return "";
      if (!parent)
        return DEFAULT_RAW[detect];
      let root2 = node2.root();
      if (root2.rawCache || (root2.rawCache = {}), typeof root2.rawCache[detect] < "u")
        return root2.rawCache[detect];
      if (detect === "before" || detect === "after")
        return this.beforeAfter(node2, detect);
      {
        let method = "raw" + capitalize(detect);
        this[method] ? value = this[method](root2, node2) : root2.walk((i2) => {
          if (value = i2.raws[own], typeof value < "u")
            return !1;
        });
      }
      return typeof value > "u" && (value = DEFAULT_RAW[detect]), root2.rawCache[detect] = value, value;
    }
    rawSemicolon(root2) {
      let value;
      return root2.walk((i2) => {
        if (i2.nodes && i2.nodes.length && i2.last.type === "decl" && (value = i2.raws.semicolon, typeof value < "u"))
          return !1;
      }), value;
    }
    rawEmptyBody(root2) {
      let value;
      return root2.walk((i2) => {
        if (i2.nodes && i2.nodes.length === 0 && (value = i2.raws.after, typeof value < "u"))
          return !1;
      }), value;
    }
    rawIndent(root2) {
      if (root2.raws.indent)
        return root2.raws.indent;
      let value;
      return root2.walk((i2) => {
        let p2 = i2.parent;
        if (p2 && p2 !== root2 && p2.parent && p2.parent === root2 && typeof i2.raws.before < "u") {
          let parts = i2.raws.before.split(`
`);
          return value = parts[parts.length - 1], value = value.replace(/\S/g, ""), !1;
        }
      }), value;
    }
    rawBeforeComment(root2, node2) {
      let value;
      return root2.walkComments((i2) => {
        if (typeof i2.raws.before < "u")
          return value = i2.raws.before, value.includes(`
`) && (value = value.replace(/[^\n]+$/, "")), !1;
      }), typeof value > "u" ? value = this.raw(node2, null, "beforeDecl") : value && (value = value.replace(/\S/g, "")), value;
    }
    rawBeforeDecl(root2, node2) {
      let value;
      return root2.walkDecls((i2) => {
        if (typeof i2.raws.before < "u")
          return value = i2.raws.before, value.includes(`
`) && (value = value.replace(/[^\n]+$/, "")), !1;
      }), typeof value > "u" ? value = this.raw(node2, null, "beforeRule") : value && (value = value.replace(/\S/g, "")), value;
    }
    rawBeforeRule(root2) {
      let value;
      return root2.walk((i2) => {
        if (i2.nodes && (i2.parent !== root2 || root2.first !== i2) && typeof i2.raws.before < "u")
          return value = i2.raws.before, value.includes(`
`) && (value = value.replace(/[^\n]+$/, "")), !1;
      }), value && (value = value.replace(/\S/g, "")), value;
    }
    rawBeforeClose(root2) {
      let value;
      return root2.walk((i2) => {
        if (i2.nodes && i2.nodes.length > 0 && typeof i2.raws.after < "u")
          return value = i2.raws.after, value.includes(`
`) && (value = value.replace(/[^\n]+$/, "")), !1;
      }), value && (value = value.replace(/\S/g, "")), value;
    }
    rawBeforeOpen(root2) {
      let value;
      return root2.walk((i2) => {
        if (i2.type !== "decl" && (value = i2.raws.between, typeof value < "u"))
          return !1;
      }), value;
    }
    rawColon(root2) {
      let value;
      return root2.walkDecls((i2) => {
        if (typeof i2.raws.between < "u")
          return value = i2.raws.between.replace(/[^\s:]/g, ""), !1;
      }), value;
    }
    beforeAfter(node2, detect) {
      let value;
      node2.type === "decl" ? value = this.raw(node2, null, "beforeDecl") : node2.type === "comment" ? value = this.raw(node2, null, "beforeComment") : detect === "before" ? value = this.raw(node2, null, "beforeRule") : value = this.raw(node2, null, "beforeClose");
      let buf = node2.parent, depth = 0;
      for (; buf && buf.type !== "root"; )
        depth += 1, buf = buf.parent;
      if (value.includes(`
`)) {
        let indent = this.raw(node2, null, "indent");
        if (indent.length)
          for (let step = 0; step < depth; step++)
            value += indent;
      }
      return value;
    }
    rawValue(node2, prop) {
      let value = node2[prop], raw = node2.raws[prop];
      return raw && raw.value === value ? raw.raw : value;
    }
  };
  var stringifier = Stringifier$2;
  Stringifier$2.default = Stringifier$2;
  let Stringifier$1 = stringifier;
  function stringify$4(node2, builder) {
    new Stringifier$1(builder).stringify(node2);
  }
  var stringify_1 = stringify$4;
  stringify$4.default = stringify$4;
  let { isClean: isClean$2, my: my$2 } = symbols, CssSyntaxError$2 = cssSyntaxError, Stringifier = stringifier, stringify$3 = stringify_1;
  function cloneNode(obj, parent) {
    let cloned = new obj.constructor();
    for (let i2 in obj) {
      if (!Object.prototype.hasOwnProperty.call(obj, i2) || i2 === "proxyCache")
        continue;
      let value = obj[i2], type = typeof value;
      i2 === "parent" && type === "object" ? parent && (cloned[i2] = parent) : i2 === "source" ? cloned[i2] = value : Array.isArray(value) ? cloned[i2] = value.map((j2) => cloneNode(j2, cloned)) : (type === "object" && value !== null && (value = cloneNode(value)), cloned[i2] = value);
    }
    return cloned;
  }
  let Node$4 = class {
    constructor(defaults = {}) {
      this.raws = {}, this[isClean$2] = !1, this[my$2] = !0;
      for (let name in defaults)
        if (name === "nodes") {
          this.nodes = [];
          for (let node2 of defaults[name])
            typeof node2.clone == "function" ? this.append(node2.clone()) : this.append(node2);
        } else
          this[name] = defaults[name];
    }
    error(message, opts = {}) {
      if (this.source) {
        let { start, end } = this.rangeBy(opts);
        return this.source.input.error(
          message,
          { line: start.line, column: start.column },
          { line: end.line, column: end.column },
          opts
        );
      }
      return new CssSyntaxError$2(message);
    }
    warn(result2, text2, opts) {
      let data = { node: this };
      for (let i2 in opts)
        data[i2] = opts[i2];
      return result2.warn(text2, data);
    }
    remove() {
      return this.parent && this.parent.removeChild(this), this.parent = void 0, this;
    }
    toString(stringifier2 = stringify$3) {
      stringifier2.stringify && (stringifier2 = stringifier2.stringify);
      let result2 = "";
      return stringifier2(this, (i2) => {
        result2 += i2;
      }), result2;
    }
    assign(overrides = {}) {
      for (let name in overrides)
        this[name] = overrides[name];
      return this;
    }
    clone(overrides = {}) {
      let cloned = cloneNode(this);
      for (let name in overrides)
        cloned[name] = overrides[name];
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
        for (let node2 of nodes)
          node2 === this ? foundSelf = !0 : foundSelf ? (this.parent.insertAfter(bookmark, node2), bookmark = node2) : this.parent.insertBefore(bookmark, node2);
        foundSelf || this.remove();
      }
      return this;
    }
    next() {
      if (!this.parent)
        return;
      let index = this.parent.index(this);
      return this.parent.nodes[index + 1];
    }
    prev() {
      if (!this.parent)
        return;
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
      let result2 = this;
      for (; result2.parent && result2.parent.type !== "document"; )
        result2 = result2.parent;
      return result2;
    }
    raw(prop, defaultType) {
      return new Stringifier().raw(this, prop, defaultType);
    }
    cleanRaws(keepBetween) {
      delete this.raws.before, delete this.raws.after, keepBetween || delete this.raws.between;
    }
    toJSON(_, inputs) {
      let fixed = {}, emitInputs = inputs == null;
      inputs = inputs || /* @__PURE__ */ new Map();
      let inputsNextIndex = 0;
      for (let name in this) {
        if (!Object.prototype.hasOwnProperty.call(this, name) || name === "parent" || name === "proxyCache")
          continue;
        let value = this[name];
        if (Array.isArray(value))
          fixed[name] = value.map((i2) => typeof i2 == "object" && i2.toJSON ? i2.toJSON(null, inputs) : i2);
        else if (typeof value == "object" && value.toJSON)
          fixed[name] = value.toJSON(null, inputs);
        else if (name === "source") {
          let inputId = inputs.get(value.input);
          inputId == null && (inputId = inputsNextIndex, inputs.set(value.input, inputsNextIndex), inputsNextIndex++), fixed[name] = {
            inputId,
            start: value.start,
            end: value.end
          };
        } else
          fixed[name] = value;
      }
      return emitInputs && (fixed.inputs = [...inputs.keys()].map((input2) => input2.toJSON())), fixed;
    }
    positionInside(index) {
      let string = this.toString(), column = this.source.start.column, line = this.source.start.line;
      for (let i2 = 0; i2 < index; i2++)
        string[i2] === `
` ? (column = 1, line += 1) : column += 1;
      return { line, column };
    }
    positionBy(opts) {
      let pos = this.source.start;
      if (opts.index)
        pos = this.positionInside(opts.index);
      else if (opts.word) {
        let index = this.toString().indexOf(opts.word);
        index !== -1 && (pos = this.positionInside(index));
      }
      return pos;
    }
    rangeBy(opts) {
      let start = {
        line: this.source.start.line,
        column: this.source.start.column
      }, end = this.source.end ? {
        line: this.source.end.line,
        column: this.source.end.column + 1
      } : {
        line: start.line,
        column: start.column + 1
      };
      if (opts.word) {
        let index = this.toString().indexOf(opts.word);
        index !== -1 && (start = this.positionInside(index), end = this.positionInside(index + opts.word.length));
      } else
        opts.start ? start = {
          line: opts.start.line,
          column: opts.start.column
        } : opts.index && (start = this.positionInside(opts.index)), opts.end ? end = {
          line: opts.end.line,
          column: opts.end.column
        } : opts.endIndex ? end = this.positionInside(opts.endIndex) : opts.index && (end = this.positionInside(opts.index + 1));
      return (end.line < start.line || end.line === start.line && end.column <= start.column) && (end = { line: start.line, column: start.column + 1 }), { start, end };
    }
    getProxyProcessor() {
      return {
        set(node2, prop, value) {
          return node2[prop] === value || (node2[prop] = value, (prop === "prop" || prop === "value" || prop === "name" || prop === "params" || prop === "important" || /* c8 ignore next */
          prop === "text") && node2.markDirty()), !0;
        },
        get(node2, prop) {
          return prop === "proxyOf" ? node2 : prop === "root" ? () => node2.root().toProxy() : node2[prop];
        }
      };
    }
    toProxy() {
      return this.proxyCache || (this.proxyCache = new Proxy(this, this.getProxyProcessor())), this.proxyCache;
    }
    addToError(error) {
      if (error.postcssNode = this, error.stack && this.source && /\n\s{4}at /.test(error.stack)) {
        let s2 = this.source;
        error.stack = error.stack.replace(
          /\n\s{4}at /,
          `$&${s2.input.from}:${s2.start.line}:${s2.start.column}$&`
        );
      }
      return error;
    }
    markDirty() {
      if (this[isClean$2]) {
        this[isClean$2] = !1;
        let next = this;
        for (; next = next.parent; )
          next[isClean$2] = !1;
      }
    }
    get proxyOf() {
      return this;
    }
  };
  var node = Node$4;
  Node$4.default = Node$4;
  let Node$3 = node, Declaration$4 = class extends Node$3 {
    constructor(defaults) {
      defaults && typeof defaults.value < "u" && typeof defaults.value != "string" && (defaults = { ...defaults, value: String(defaults.value) }), super(defaults), this.type = "decl";
    }
    get variable() {
      return this.prop.startsWith("--") || this.prop[0] === "$";
    }
  };
  var declaration = Declaration$4;
  Declaration$4.default = Declaration$4;
  let urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
  var nonSecure = { nanoid: (size2 = 21) => {
    let id = "", i2 = size2;
    for (; i2--; )
      id += urlAlphabet[Math.random() * 64 | 0];
    return id;
  }, customAlphabet: (alphabet, defaultSize = 21) => (size2 = defaultSize) => {
    let id = "", i2 = size2;
    for (; i2--; )
      id += alphabet[Math.random() * alphabet.length | 0];
    return id;
  } };
  let { SourceMapConsumer: SourceMapConsumer$2, SourceMapGenerator: SourceMapGenerator$2 } = require$$2, { existsSync, readFileSync } = require$$2, { dirname: dirname$1, join } = require$$2;
  function fromBase64(str) {
    return Buffer ? Buffer.from(str, "base64").toString() : window.atob(str);
  }
  let PreviousMap$2 = class {
    constructor(css2, opts) {
      if (opts.map === !1)
        return;
      this.loadAnnotation(css2), this.inline = this.startWith(this.annotation, "data:");
      let prev = opts.map ? opts.map.prev : void 0, text2 = this.loadMap(opts.from, prev);
      !this.mapFile && opts.from && (this.mapFile = opts.from), this.mapFile && (this.root = dirname$1(this.mapFile)), text2 && (this.text = text2);
    }
    consumer() {
      return this.consumerCache || (this.consumerCache = new SourceMapConsumer$2(this.text)), this.consumerCache;
    }
    withContent() {
      return !!(this.consumer().sourcesContent && this.consumer().sourcesContent.length > 0);
    }
    startWith(string, start) {
      return string ? string.substr(0, start.length) === start : !1;
    }
    getAnnotationURL(sourceMapString) {
      return sourceMapString.replace(/^\/\*\s*# sourceMappingURL=/, "").trim();
    }
    loadAnnotation(css2) {
      let comments = css2.match(/\/\*\s*# sourceMappingURL=/gm);
      if (!comments)
        return;
      let start = css2.lastIndexOf(comments.pop()), end = css2.indexOf("*/", start);
      start > -1 && end > -1 && (this.annotation = this.getAnnotationURL(css2.substring(start, end)));
    }
    decodeInline(text2) {
      let baseCharsetUri = /^data:application\/json;charset=utf-?8;base64,/, baseUri = /^data:application\/json;base64,/, charsetUri = /^data:application\/json;charset=utf-?8,/, uri = /^data:application\/json,/;
      if (charsetUri.test(text2) || uri.test(text2))
        return decodeURIComponent(text2.substr(RegExp.lastMatch.length));
      if (baseCharsetUri.test(text2) || baseUri.test(text2))
        return fromBase64(text2.substr(RegExp.lastMatch.length));
      let encoding = text2.match(/data:application\/json;([^,]+),/)[1];
      throw new Error("Unsupported source map encoding " + encoding);
    }
    loadFile(path) {
      if (this.root = dirname$1(path), existsSync(path))
        return this.mapFile = path, readFileSync(path, "utf-8").toString().trim();
    }
    loadMap(file, prev) {
      if (prev === !1)
        return !1;
      if (prev) {
        if (typeof prev == "string")
          return prev;
        if (typeof prev == "function") {
          let prevPath = prev(file);
          if (prevPath) {
            let map = this.loadFile(prevPath);
            if (!map)
              throw new Error(
                "Unable to load previous source map: " + prevPath.toString()
              );
            return map;
          }
        } else {
          if (prev instanceof SourceMapConsumer$2)
            return SourceMapGenerator$2.fromSourceMap(prev).toString();
          if (prev instanceof SourceMapGenerator$2)
            return prev.toString();
          if (this.isMap(prev))
            return JSON.stringify(prev);
          throw new Error(
            "Unsupported previous source map format: " + prev.toString()
          );
        }
      } else {
        if (this.inline)
          return this.decodeInline(this.annotation);
        if (this.annotation) {
          let map = this.annotation;
          return file && (map = join(dirname$1(file), map)), this.loadFile(map);
        }
      }
    }
    isMap(map) {
      return typeof map != "object" ? !1 : typeof map.mappings == "string" || typeof map._mappings == "string" || Array.isArray(map.sections);
    }
  };
  var previousMap = PreviousMap$2;
  PreviousMap$2.default = PreviousMap$2;
  let { SourceMapConsumer: SourceMapConsumer$1, SourceMapGenerator: SourceMapGenerator$1 } = require$$2, { fileURLToPath, pathToFileURL: pathToFileURL$1 } = require$$2, { resolve: resolve$1, isAbsolute } = require$$2, { nanoid: nanoid$1 } = nonSecure, terminalHighlight = require$$2, CssSyntaxError$1 = cssSyntaxError, PreviousMap$1 = previousMap, fromOffsetCache = Symbol("fromOffsetCache"), sourceMapAvailable$1 = Boolean(SourceMapConsumer$1 && SourceMapGenerator$1), pathAvailable$1 = Boolean(resolve$1 && isAbsolute), Input$6 = class {
    constructor(css2, opts = {}) {
      if (css2 === null || typeof css2 > "u" || typeof css2 == "object" && !css2.toString)
        throw new Error(`PostCSS received ${css2} instead of CSS string`);
      if (this.css = css2.toString(), this.css[0] === "\uFEFF" || this.css[0] === "￾" ? (this.hasBOM = !0, this.css = this.css.slice(1)) : this.hasBOM = !1, opts.from && (!pathAvailable$1 || /^\w+:\/\//.test(opts.from) || isAbsolute(opts.from) ? this.file = opts.from : this.file = resolve$1(opts.from)), pathAvailable$1 && sourceMapAvailable$1) {
        let map = new PreviousMap$1(this.css, opts);
        if (map.text) {
          this.map = map;
          let file = map.consumer().file;
          !this.file && file && (this.file = this.mapResolve(file));
        }
      }
      this.file || (this.id = "<input css " + nanoid$1(6) + ">"), this.map && (this.map.file = this.from);
    }
    fromOffset(offset) {
      let lastLine, lineToIndex;
      if (this[fromOffsetCache])
        lineToIndex = this[fromOffsetCache];
      else {
        let lines = this.css.split(`
`);
        lineToIndex = new Array(lines.length);
        let prevIndex = 0;
        for (let i2 = 0, l2 = lines.length; i2 < l2; i2++)
          lineToIndex[i2] = prevIndex, prevIndex += lines[i2].length + 1;
        this[fromOffsetCache] = lineToIndex;
      }
      lastLine = lineToIndex[lineToIndex.length - 1];
      let min = 0;
      if (offset >= lastLine)
        min = lineToIndex.length - 1;
      else {
        let max = lineToIndex.length - 2, mid;
        for (; min < max; )
          if (mid = min + (max - min >> 1), offset < lineToIndex[mid])
            max = mid - 1;
          else if (offset >= lineToIndex[mid + 1])
            min = mid + 1;
          else {
            min = mid;
            break;
          }
      }
      return {
        line: min + 1,
        col: offset - lineToIndex[min] + 1
      };
    }
    error(message, line, column, opts = {}) {
      let result2, endLine, endColumn;
      if (line && typeof line == "object") {
        let start = line, end = column;
        if (typeof line.offset == "number") {
          let pos = this.fromOffset(start.offset);
          line = pos.line, column = pos.col;
        } else
          line = start.line, column = start.column;
        if (typeof end.offset == "number") {
          let pos = this.fromOffset(end.offset);
          endLine = pos.line, endColumn = pos.col;
        } else
          endLine = end.line, endColumn = end.column;
      } else if (!column) {
        let pos = this.fromOffset(line);
        line = pos.line, column = pos.col;
      }
      let origin = this.origin(line, column, endLine, endColumn);
      return origin ? result2 = new CssSyntaxError$1(
        message,
        origin.endLine === void 0 ? origin.line : { line: origin.line, column: origin.column },
        origin.endLine === void 0 ? origin.column : { line: origin.endLine, column: origin.endColumn },
        origin.source,
        origin.file,
        opts.plugin
      ) : result2 = new CssSyntaxError$1(
        message,
        endLine === void 0 ? line : { line, column },
        endLine === void 0 ? column : { line: endLine, column: endColumn },
        this.css,
        this.file,
        opts.plugin
      ), result2.input = { line, column, endLine, endColumn, source: this.css }, this.file && (pathToFileURL$1 && (result2.input.url = pathToFileURL$1(this.file).toString()), result2.input.file = this.file), result2;
    }
    origin(line, column, endLine, endColumn) {
      if (!this.map)
        return !1;
      let consumer = this.map.consumer(), from = consumer.originalPositionFor({ line, column });
      if (!from.source)
        return !1;
      let to;
      typeof endLine == "number" && (to = consumer.originalPositionFor({ line: endLine, column: endColumn }));
      let fromUrl;
      isAbsolute(from.source) ? fromUrl = pathToFileURL$1(from.source) : fromUrl = new URL(
        from.source,
        this.map.consumer().sourceRoot || pathToFileURL$1(this.map.mapFile)
      );
      let result2 = {
        url: fromUrl.toString(),
        line: from.line,
        column: from.column,
        endLine: to && to.line,
        endColumn: to && to.column
      };
      if (fromUrl.protocol === "file:")
        if (fileURLToPath)
          result2.file = fileURLToPath(fromUrl);
        else
          throw new Error("file: protocol is not available in this PostCSS build");
      let source = consumer.sourceContentFor(from.source);
      return source && (result2.source = source), result2;
    }
    mapResolve(file) {
      return /^\w+:\/\//.test(file) ? file : resolve$1(this.map.consumer().sourceRoot || this.map.root || ".", file);
    }
    get from() {
      return this.file || this.id;
    }
    toJSON() {
      let json = {};
      for (let name of ["hasBOM", "css", "file", "id"])
        this[name] != null && (json[name] = this[name]);
      return this.map && (json.map = { ...this.map }, json.map.consumerCache && (json.map.consumerCache = void 0)), json;
    }
  };
  var input = Input$6;
  Input$6.default = Input$6, terminalHighlight && terminalHighlight.registerInput && terminalHighlight.registerInput(Input$6);
  let { SourceMapConsumer, SourceMapGenerator } = require$$2, { dirname, resolve, relative, sep } = require$$2, { pathToFileURL } = require$$2, Input$5 = input, sourceMapAvailable = Boolean(SourceMapConsumer && SourceMapGenerator), pathAvailable = Boolean(dirname && resolve && relative && sep);
  var mapGenerator = class {
    constructor(stringify2, root2, opts, cssString) {
      this.stringify = stringify2, this.mapOpts = opts.map || {}, this.root = root2, this.opts = opts, this.css = cssString;
    }
    isMap() {
      return typeof this.opts.map < "u" ? !!this.opts.map : this.previous().length > 0;
    }
    previous() {
      if (!this.previousMaps)
        if (this.previousMaps = [], this.root)
          this.root.walk((node2) => {
            if (node2.source && node2.source.input.map) {
              let map = node2.source.input.map;
              this.previousMaps.includes(map) || this.previousMaps.push(map);
            }
          });
        else {
          let input2 = new Input$5(this.css, this.opts);
          input2.map && this.previousMaps.push(input2.map);
        }
      return this.previousMaps;
    }
    isInline() {
      if (typeof this.mapOpts.inline < "u")
        return this.mapOpts.inline;
      let annotation = this.mapOpts.annotation;
      return typeof annotation < "u" && annotation !== !0 ? !1 : this.previous().length ? this.previous().some((i2) => i2.inline) : !0;
    }
    isSourcesContent() {
      return typeof this.mapOpts.sourcesContent < "u" ? this.mapOpts.sourcesContent : this.previous().length ? this.previous().some((i2) => i2.withContent()) : !0;
    }
    clearAnnotation() {
      if (this.mapOpts.annotation !== !1)
        if (this.root) {
          let node2;
          for (let i2 = this.root.nodes.length - 1; i2 >= 0; i2--)
            node2 = this.root.nodes[i2], node2.type === "comment" && node2.text.indexOf("# sourceMappingURL=") === 0 && this.root.removeChild(i2);
        } else
          this.css && (this.css = this.css.replace(/(\n)?\/\*#[\S\s]*?\*\/$/gm, ""));
    }
    setSourcesContent() {
      let already = {};
      if (this.root)
        this.root.walk((node2) => {
          if (node2.source) {
            let from = node2.source.input.from;
            from && !already[from] && (already[from] = !0, this.map.setSourceContent(
              this.toUrl(this.path(from)),
              node2.source.input.css
            ));
          }
        });
      else if (this.css) {
        let from = this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>";
        this.map.setSourceContent(from, this.css);
      }
    }
    applyPrevMaps() {
      for (let prev of this.previous()) {
        let from = this.toUrl(this.path(prev.file)), root2 = prev.root || dirname(prev.file), map;
        this.mapOpts.sourcesContent === !1 ? (map = new SourceMapConsumer(prev.text), map.sourcesContent && (map.sourcesContent = map.sourcesContent.map(() => null))) : map = prev.consumer(), this.map.applySourceMap(map, from, this.toUrl(this.path(root2)));
      }
    }
    isAnnotation() {
      return this.isInline() ? !0 : typeof this.mapOpts.annotation < "u" ? this.mapOpts.annotation : this.previous().length ? this.previous().some((i2) => i2.annotation) : !0;
    }
    toBase64(str) {
      return Buffer ? Buffer.from(str).toString("base64") : window.btoa(unescape(encodeURIComponent(str)));
    }
    addAnnotation() {
      let content;
      this.isInline() ? content = "data:application/json;base64," + this.toBase64(this.map.toString()) : typeof this.mapOpts.annotation == "string" ? content = this.mapOpts.annotation : typeof this.mapOpts.annotation == "function" ? content = this.mapOpts.annotation(this.opts.to, this.root) : content = this.outputFile() + ".map";
      let eol = `
`;
      this.css.includes(`\r
`) && (eol = `\r
`), this.css += eol + "/*# sourceMappingURL=" + content + " */";
    }
    outputFile() {
      return this.opts.to ? this.path(this.opts.to) : this.opts.from ? this.path(this.opts.from) : "to.css";
    }
    generateMap() {
      if (this.root)
        this.generateString();
      else if (this.previous().length === 1) {
        let prev = this.previous()[0].consumer();
        prev.file = this.outputFile(), this.map = SourceMapGenerator.fromSourceMap(prev);
      } else
        this.map = new SourceMapGenerator({ file: this.outputFile() }), this.map.addMapping({
          source: this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>",
          generated: { line: 1, column: 0 },
          original: { line: 1, column: 0 }
        });
      return this.isSourcesContent() && this.setSourcesContent(), this.root && this.previous().length > 0 && this.applyPrevMaps(), this.isAnnotation() && this.addAnnotation(), this.isInline() ? [this.css] : [this.css, this.map];
    }
    path(file) {
      if (file.indexOf("<") === 0 || /^\w+:\/\//.test(file) || this.mapOpts.absolute)
        return file;
      let from = this.opts.to ? dirname(this.opts.to) : ".";
      return typeof this.mapOpts.annotation == "string" && (from = dirname(resolve(from, this.mapOpts.annotation))), file = relative(from, file), file;
    }
    toUrl(path) {
      return sep === "\\" && (path = path.replace(/\\/g, "/")), encodeURI(path).replace(/[#?]/g, encodeURIComponent);
    }
    sourcePath(node2) {
      if (this.mapOpts.from)
        return this.toUrl(this.mapOpts.from);
      if (this.mapOpts.absolute) {
        if (pathToFileURL)
          return pathToFileURL(node2.source.input.from).toString();
        throw new Error(
          "`map.absolute` option is not available in this PostCSS build"
        );
      } else
        return this.toUrl(this.path(node2.source.input.from));
    }
    generateString() {
      this.css = "", this.map = new SourceMapGenerator({ file: this.outputFile() });
      let line = 1, column = 1, noSource = "<no source>", mapping = {
        source: "",
        generated: { line: 0, column: 0 },
        original: { line: 0, column: 0 }
      }, lines, last;
      this.stringify(this.root, (str, node2, type) => {
        if (this.css += str, node2 && type !== "end" && (mapping.generated.line = line, mapping.generated.column = column - 1, node2.source && node2.source.start ? (mapping.source = this.sourcePath(node2), mapping.original.line = node2.source.start.line, mapping.original.column = node2.source.start.column - 1, this.map.addMapping(mapping)) : (mapping.source = noSource, mapping.original.line = 1, mapping.original.column = 0, this.map.addMapping(mapping))), lines = str.match(/\n/g), lines ? (line += lines.length, last = str.lastIndexOf(`
`), column = str.length - last) : column += str.length, node2 && type !== "start") {
          let p2 = node2.parent || { raws: {} };
          (node2.type !== "decl" || node2 !== p2.last || p2.raws.semicolon) && (node2.source && node2.source.end ? (mapping.source = this.sourcePath(node2), mapping.original.line = node2.source.end.line, mapping.original.column = node2.source.end.column - 1, mapping.generated.line = line, mapping.generated.column = column - 2, this.map.addMapping(mapping)) : (mapping.source = noSource, mapping.original.line = 1, mapping.original.column = 0, mapping.generated.line = line, mapping.generated.column = column - 1, this.map.addMapping(mapping)));
        }
      });
    }
    generate() {
      if (this.clearAnnotation(), pathAvailable && sourceMapAvailable && this.isMap())
        return this.generateMap();
      {
        let result2 = "";
        return this.stringify(this.root, (i2) => {
          result2 += i2;
        }), [result2];
      }
    }
  };
  let Node$2 = node, Comment$4 = class extends Node$2 {
    constructor(defaults) {
      super(defaults), this.type = "comment";
    }
  };
  var comment = Comment$4;
  Comment$4.default = Comment$4;
  let { isClean: isClean$1, my: my$1 } = symbols, Declaration$3 = declaration, Comment$3 = comment, Node$1 = node, parse$5, Rule$4, AtRule$4, Root$6;
  function cleanSource(nodes) {
    return nodes.map((i2) => (i2.nodes && (i2.nodes = cleanSource(i2.nodes)), delete i2.source, i2));
  }
  function markDirtyUp(node2) {
    if (node2[isClean$1] = !1, node2.proxyOf.nodes)
      for (let i2 of node2.proxyOf.nodes)
        markDirtyUp(i2);
  }
  let Container$7 = class Container2 extends Node$1 {
    push(child) {
      return child.parent = this, this.proxyOf.nodes.push(child), this;
    }
    each(callback) {
      if (!this.proxyOf.nodes)
        return;
      let iterator = this.getIterator(), index, result2;
      for (; this.indexes[iterator] < this.proxyOf.nodes.length && (index = this.indexes[iterator], result2 = callback(this.proxyOf.nodes[index], index), result2 !== !1); )
        this.indexes[iterator] += 1;
      return delete this.indexes[iterator], result2;
    }
    walk(callback) {
      return this.each((child, i2) => {
        let result2;
        try {
          result2 = callback(child, i2);
        } catch (e) {
          throw child.addToError(e);
        }
        return result2 !== !1 && child.walk && (result2 = child.walk(callback)), result2;
      });
    }
    walkDecls(prop, callback) {
      return callback ? prop instanceof RegExp ? this.walk((child, i2) => {
        if (child.type === "decl" && prop.test(child.prop))
          return callback(child, i2);
      }) : this.walk((child, i2) => {
        if (child.type === "decl" && child.prop === prop)
          return callback(child, i2);
      }) : (callback = prop, this.walk((child, i2) => {
        if (child.type === "decl")
          return callback(child, i2);
      }));
    }
    walkRules(selector, callback) {
      return callback ? selector instanceof RegExp ? this.walk((child, i2) => {
        if (child.type === "rule" && selector.test(child.selector))
          return callback(child, i2);
      }) : this.walk((child, i2) => {
        if (child.type === "rule" && child.selector === selector)
          return callback(child, i2);
      }) : (callback = selector, this.walk((child, i2) => {
        if (child.type === "rule")
          return callback(child, i2);
      }));
    }
    walkAtRules(name, callback) {
      return callback ? name instanceof RegExp ? this.walk((child, i2) => {
        if (child.type === "atrule" && name.test(child.name))
          return callback(child, i2);
      }) : this.walk((child, i2) => {
        if (child.type === "atrule" && child.name === name)
          return callback(child, i2);
      }) : (callback = name, this.walk((child, i2) => {
        if (child.type === "atrule")
          return callback(child, i2);
      }));
    }
    walkComments(callback) {
      return this.walk((child, i2) => {
        if (child.type === "comment")
          return callback(child, i2);
      });
    }
    append(...children2) {
      for (let child of children2) {
        let nodes = this.normalize(child, this.last);
        for (let node2 of nodes)
          this.proxyOf.nodes.push(node2);
      }
      return this.markDirty(), this;
    }
    prepend(...children2) {
      children2 = children2.reverse();
      for (let child of children2) {
        let nodes = this.normalize(child, this.first, "prepend").reverse();
        for (let node2 of nodes)
          this.proxyOf.nodes.unshift(node2);
        for (let id in this.indexes)
          this.indexes[id] = this.indexes[id] + nodes.length;
      }
      return this.markDirty(), this;
    }
    cleanRaws(keepBetween) {
      if (super.cleanRaws(keepBetween), this.nodes)
        for (let node2 of this.nodes)
          node2.cleanRaws(keepBetween);
    }
    insertBefore(exist, add) {
      exist = this.index(exist);
      let type = exist === 0 ? "prepend" : !1, nodes = this.normalize(add, this.proxyOf.nodes[exist], type).reverse();
      for (let node2 of nodes)
        this.proxyOf.nodes.splice(exist, 0, node2);
      let index;
      for (let id in this.indexes)
        index = this.indexes[id], exist <= index && (this.indexes[id] = index + nodes.length);
      return this.markDirty(), this;
    }
    insertAfter(exist, add) {
      exist = this.index(exist);
      let nodes = this.normalize(add, this.proxyOf.nodes[exist]).reverse();
      for (let node2 of nodes)
        this.proxyOf.nodes.splice(exist + 1, 0, node2);
      let index;
      for (let id in this.indexes)
        index = this.indexes[id], exist < index && (this.indexes[id] = index + nodes.length);
      return this.markDirty(), this;
    }
    removeChild(child) {
      child = this.index(child), this.proxyOf.nodes[child].parent = void 0, this.proxyOf.nodes.splice(child, 1);
      let index;
      for (let id in this.indexes)
        index = this.indexes[id], index >= child && (this.indexes[id] = index - 1);
      return this.markDirty(), this;
    }
    removeAll() {
      for (let node2 of this.proxyOf.nodes)
        node2.parent = void 0;
      return this.proxyOf.nodes = [], this.markDirty(), this;
    }
    replaceValues(pattern, opts, callback) {
      return callback || (callback = opts, opts = {}), this.walkDecls((decl) => {
        opts.props && !opts.props.includes(decl.prop) || opts.fast && !decl.value.includes(opts.fast) || (decl.value = decl.value.replace(pattern, callback));
      }), this.markDirty(), this;
    }
    every(condition) {
      return this.nodes.every(condition);
    }
    some(condition) {
      return this.nodes.some(condition);
    }
    index(child) {
      return typeof child == "number" ? child : (child.proxyOf && (child = child.proxyOf), this.proxyOf.nodes.indexOf(child));
    }
    get first() {
      if (this.proxyOf.nodes)
        return this.proxyOf.nodes[0];
    }
    get last() {
      if (this.proxyOf.nodes)
        return this.proxyOf.nodes[this.proxyOf.nodes.length - 1];
    }
    normalize(nodes, sample) {
      if (typeof nodes == "string")
        nodes = cleanSource(parse$5(nodes).nodes);
      else if (Array.isArray(nodes)) {
        nodes = nodes.slice(0);
        for (let i2 of nodes)
          i2.parent && i2.parent.removeChild(i2, "ignore");
      } else if (nodes.type === "root" && this.type !== "document") {
        nodes = nodes.nodes.slice(0);
        for (let i2 of nodes)
          i2.parent && i2.parent.removeChild(i2, "ignore");
      } else if (nodes.type)
        nodes = [nodes];
      else if (nodes.prop) {
        if (typeof nodes.value > "u")
          throw new Error("Value field is missed in node creation");
        typeof nodes.value != "string" && (nodes.value = String(nodes.value)), nodes = [new Declaration$3(nodes)];
      } else if (nodes.selector)
        nodes = [new Rule$4(nodes)];
      else if (nodes.name)
        nodes = [new AtRule$4(nodes)];
      else if (nodes.text)
        nodes = [new Comment$3(nodes)];
      else
        throw new Error("Unknown node type in node creation");
      return nodes.map((i2) => (i2[my$1] || Container2.rebuild(i2), i2 = i2.proxyOf, i2.parent && i2.parent.removeChild(i2), i2[isClean$1] && markDirtyUp(i2), typeof i2.raws.before > "u" && sample && typeof sample.raws.before < "u" && (i2.raws.before = sample.raws.before.replace(/\S/g, "")), i2.parent = this.proxyOf, i2));
    }
    getProxyProcessor() {
      return {
        set(node2, prop, value) {
          return node2[prop] === value || (node2[prop] = value, (prop === "name" || prop === "params" || prop === "selector") && node2.markDirty()), !0;
        },
        get(node2, prop) {
          return prop === "proxyOf" ? node2 : node2[prop] ? prop === "each" || typeof prop == "string" && prop.startsWith("walk") ? (...args) => node2[prop](
            ...args.map((i2) => typeof i2 == "function" ? (child, index) => i2(child.toProxy(), index) : i2)
          ) : prop === "every" || prop === "some" ? (cb) => node2[prop](
            (child, ...other) => cb(child.toProxy(), ...other)
          ) : prop === "root" ? () => node2.root().toProxy() : prop === "nodes" ? node2.nodes.map((i2) => i2.toProxy()) : prop === "first" || prop === "last" ? node2[prop].toProxy() : node2[prop] : node2[prop];
        }
      };
    }
    getIterator() {
      this.lastEach || (this.lastEach = 0), this.indexes || (this.indexes = {}), this.lastEach += 1;
      let iterator = this.lastEach;
      return this.indexes[iterator] = 0, iterator;
    }
  };
  Container$7.registerParse = (dependant) => {
    parse$5 = dependant;
  }, Container$7.registerRule = (dependant) => {
    Rule$4 = dependant;
  }, Container$7.registerAtRule = (dependant) => {
    AtRule$4 = dependant;
  }, Container$7.registerRoot = (dependant) => {
    Root$6 = dependant;
  };
  var container = Container$7;
  Container$7.default = Container$7, Container$7.rebuild = (node2) => {
    node2.type === "atrule" ? Object.setPrototypeOf(node2, AtRule$4.prototype) : node2.type === "rule" ? Object.setPrototypeOf(node2, Rule$4.prototype) : node2.type === "decl" ? Object.setPrototypeOf(node2, Declaration$3.prototype) : node2.type === "comment" ? Object.setPrototypeOf(node2, Comment$3.prototype) : node2.type === "root" && Object.setPrototypeOf(node2, Root$6.prototype), node2[my$1] = !0, node2.nodes && node2.nodes.forEach((child) => {
      Container$7.rebuild(child);
    });
  };
  let Container$6 = container, LazyResult$4, Processor$3, Document$3 = class extends Container$6 {
    constructor(defaults) {
      super({ type: "document", ...defaults }), this.nodes || (this.nodes = []);
    }
    toResult(opts = {}) {
      return new LazyResult$4(new Processor$3(), this, opts).stringify();
    }
  };
  Document$3.registerLazyResult = (dependant) => {
    LazyResult$4 = dependant;
  }, Document$3.registerProcessor = (dependant) => {
    Processor$3 = dependant;
  };
  var document$1 = Document$3;
  Document$3.default = Document$3;
  let Warning$2 = class {
    constructor(text2, opts = {}) {
      if (this.type = "warning", this.text = text2, opts.node && opts.node.source) {
        let range = opts.node.rangeBy(opts);
        this.line = range.start.line, this.column = range.start.column, this.endLine = range.end.line, this.endColumn = range.end.column;
      }
      for (let opt in opts)
        this[opt] = opts[opt];
    }
    toString() {
      return this.node ? this.node.error(this.text, {
        plugin: this.plugin,
        index: this.index,
        word: this.word
      }).message : this.plugin ? this.plugin + ": " + this.text : this.text;
    }
  };
  var warning = Warning$2;
  Warning$2.default = Warning$2;
  let Warning$1 = warning, Result$3 = class {
    constructor(processor2, root2, opts) {
      this.processor = processor2, this.messages = [], this.root = root2, this.opts = opts, this.css = void 0, this.map = void 0;
    }
    toString() {
      return this.css;
    }
    warn(text2, opts = {}) {
      opts.plugin || this.lastPlugin && this.lastPlugin.postcssPlugin && (opts.plugin = this.lastPlugin.postcssPlugin);
      let warning2 = new Warning$1(text2, opts);
      return this.messages.push(warning2), warning2;
    }
    warnings() {
      return this.messages.filter((i2) => i2.type === "warning");
    }
    get content() {
      return this.css;
    }
  };
  var result = Result$3;
  Result$3.default = Result$3;
  const SINGLE_QUOTE = "'".charCodeAt(0), DOUBLE_QUOTE = '"'.charCodeAt(0), BACKSLASH = "\\".charCodeAt(0), SLASH = "/".charCodeAt(0), NEWLINE = `
`.charCodeAt(0), SPACE = " ".charCodeAt(0), FEED = "\f".charCodeAt(0), TAB = "	".charCodeAt(0), CR = "\r".charCodeAt(0), OPEN_SQUARE = "[".charCodeAt(0), CLOSE_SQUARE = "]".charCodeAt(0), OPEN_PARENTHESES = "(".charCodeAt(0), CLOSE_PARENTHESES = ")".charCodeAt(0), OPEN_CURLY = "{".charCodeAt(0), CLOSE_CURLY = "}".charCodeAt(0), SEMICOLON = ";".charCodeAt(0), ASTERISK = "*".charCodeAt(0), COLON = ":".charCodeAt(0), AT = "@".charCodeAt(0), RE_AT_END = /[\t\n\f\r "#'()/;[\\\]{}]/g, RE_WORD_END = /[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g, RE_BAD_BRACKET = /.[\n"'(/\\]/, RE_HEX_ESCAPE = /[\da-f]/i;
  var tokenize = function(input2, options = {}) {
    let css2 = input2.css.valueOf(), ignore = options.ignoreErrors, code, next, quote, content, escape, escaped, escapePos, prev, n2, currentToken, length = css2.length, pos = 0, buffer = [], returned = [];
    function position() {
      return pos;
    }
    function unclosed(what) {
      throw input2.error("Unclosed " + what, pos);
    }
    function endOfFile() {
      return returned.length === 0 && pos >= length;
    }
    function nextToken(opts) {
      if (returned.length)
        return returned.pop();
      if (pos >= length)
        return;
      let ignoreUnclosed = opts ? opts.ignoreUnclosed : !1;
      switch (code = css2.charCodeAt(pos), code) {
        case NEWLINE:
        case SPACE:
        case TAB:
        case CR:
        case FEED: {
          next = pos;
          do
            next += 1, code = css2.charCodeAt(next);
          while (code === SPACE || code === NEWLINE || code === TAB || code === CR || code === FEED);
          currentToken = ["space", css2.slice(pos, next)], pos = next - 1;
          break;
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
          break;
        }
        case OPEN_PARENTHESES: {
          if (prev = buffer.length ? buffer.pop()[1] : "", n2 = css2.charCodeAt(pos + 1), prev === "url" && n2 !== SINGLE_QUOTE && n2 !== DOUBLE_QUOTE && n2 !== SPACE && n2 !== NEWLINE && n2 !== TAB && n2 !== FEED && n2 !== CR) {
            next = pos;
            do {
              if (escaped = !1, next = css2.indexOf(")", next + 1), next === -1)
                if (ignore || ignoreUnclosed) {
                  next = pos;
                  break;
                } else
                  unclosed("bracket");
              for (escapePos = next; css2.charCodeAt(escapePos - 1) === BACKSLASH; )
                escapePos -= 1, escaped = !escaped;
            } while (escaped);
            currentToken = ["brackets", css2.slice(pos, next + 1), pos, next], pos = next;
          } else
            next = css2.indexOf(")", pos + 1), content = css2.slice(pos, next + 1), next === -1 || RE_BAD_BRACKET.test(content) ? currentToken = ["(", "(", pos] : (currentToken = ["brackets", content, pos, next], pos = next);
          break;
        }
        case SINGLE_QUOTE:
        case DOUBLE_QUOTE: {
          quote = code === SINGLE_QUOTE ? "'" : '"', next = pos;
          do {
            if (escaped = !1, next = css2.indexOf(quote, next + 1), next === -1)
              if (ignore || ignoreUnclosed) {
                next = pos + 1;
                break;
              } else
                unclosed("string");
            for (escapePos = next; css2.charCodeAt(escapePos - 1) === BACKSLASH; )
              escapePos -= 1, escaped = !escaped;
          } while (escaped);
          currentToken = ["string", css2.slice(pos, next + 1), pos, next], pos = next;
          break;
        }
        case AT: {
          RE_AT_END.lastIndex = pos + 1, RE_AT_END.test(css2), RE_AT_END.lastIndex === 0 ? next = css2.length - 1 : next = RE_AT_END.lastIndex - 2, currentToken = ["at-word", css2.slice(pos, next + 1), pos, next], pos = next;
          break;
        }
        case BACKSLASH: {
          for (next = pos, escape = !0; css2.charCodeAt(next + 1) === BACKSLASH; )
            next += 1, escape = !escape;
          if (code = css2.charCodeAt(next + 1), escape && code !== SLASH && code !== SPACE && code !== NEWLINE && code !== TAB && code !== CR && code !== FEED && (next += 1, RE_HEX_ESCAPE.test(css2.charAt(next)))) {
            for (; RE_HEX_ESCAPE.test(css2.charAt(next + 1)); )
              next += 1;
            css2.charCodeAt(next + 1) === SPACE && (next += 1);
          }
          currentToken = ["word", css2.slice(pos, next + 1), pos, next], pos = next;
          break;
        }
        default: {
          code === SLASH && css2.charCodeAt(pos + 1) === ASTERISK ? (next = css2.indexOf("*/", pos + 2) + 1, next === 0 && (ignore || ignoreUnclosed ? next = css2.length : unclosed("comment")), currentToken = ["comment", css2.slice(pos, next + 1), pos, next], pos = next) : (RE_WORD_END.lastIndex = pos + 1, RE_WORD_END.test(css2), RE_WORD_END.lastIndex === 0 ? next = css2.length - 1 : next = RE_WORD_END.lastIndex - 2, currentToken = ["word", css2.slice(pos, next + 1), pos, next], buffer.push(currentToken), pos = next);
          break;
        }
      }
      return pos++, currentToken;
    }
    function back(token) {
      returned.push(token);
    }
    return {
      back,
      nextToken,
      endOfFile,
      position
    };
  };
  let Container$5 = container, AtRule$3 = class extends Container$5 {
    constructor(defaults) {
      super(defaults), this.type = "atrule";
    }
    append(...children2) {
      return this.proxyOf.nodes || (this.nodes = []), super.append(...children2);
    }
    prepend(...children2) {
      return this.proxyOf.nodes || (this.nodes = []), super.prepend(...children2);
    }
  };
  var atRule = AtRule$3;
  AtRule$3.default = AtRule$3, Container$5.registerAtRule(AtRule$3);
  let Container$4 = container, LazyResult$3, Processor$2, Root$5 = class extends Container$4 {
    constructor(defaults) {
      super(defaults), this.type = "root", this.nodes || (this.nodes = []);
    }
    removeChild(child, ignore) {
      let index = this.index(child);
      return !ignore && index === 0 && this.nodes.length > 1 && (this.nodes[1].raws.before = this.nodes[index].raws.before), super.removeChild(child);
    }
    normalize(child, sample, type) {
      let nodes = super.normalize(child);
      if (sample) {
        if (type === "prepend")
          this.nodes.length > 1 ? sample.raws.before = this.nodes[1].raws.before : delete sample.raws.before;
        else if (this.first !== sample)
          for (let node2 of nodes)
            node2.raws.before = sample.raws.before;
      }
      return nodes;
    }
    toResult(opts = {}) {
      return new LazyResult$3(new Processor$2(), this, opts).stringify();
    }
  };
  Root$5.registerLazyResult = (dependant) => {
    LazyResult$3 = dependant;
  }, Root$5.registerProcessor = (dependant) => {
    Processor$2 = dependant;
  };
  var root = Root$5;
  Root$5.default = Root$5, Container$4.registerRoot(Root$5);
  let list$2 = {
    split(string, separators, last) {
      let array = [], current = "", split = !1, func = 0, inQuote = !1, prevQuote = "", escape = !1;
      for (let letter of string)
        escape ? escape = !1 : letter === "\\" ? escape = !0 : inQuote ? letter === prevQuote && (inQuote = !1) : letter === '"' || letter === "'" ? (inQuote = !0, prevQuote = letter) : letter === "(" ? func += 1 : letter === ")" ? func > 0 && (func -= 1) : func === 0 && separators.includes(letter) && (split = !0), split ? (current !== "" && array.push(current.trim()), current = "", split = !1) : current += letter;
      return (last || current !== "") && array.push(current.trim()), array;
    },
    space(string) {
      let spaces = [" ", `
`, "	"];
      return list$2.split(string, spaces);
    },
    comma(string) {
      return list$2.split(string, [","], !0);
    }
  };
  var list_1 = list$2;
  list$2.default = list$2;
  let Container$3 = container, list$1 = list_1, Rule$3 = class extends Container$3 {
    constructor(defaults) {
      super(defaults), this.type = "rule", this.nodes || (this.nodes = []);
    }
    get selectors() {
      return list$1.comma(this.selector);
    }
    set selectors(values) {
      let match = this.selector ? this.selector.match(/,\s*/) : null, sep2 = match ? match[0] : "," + this.raw("between", "beforeOpen");
      this.selector = values.join(sep2);
    }
  };
  var rule = Rule$3;
  Rule$3.default = Rule$3, Container$3.registerRule(Rule$3);
  let Declaration$2 = declaration, tokenizer = tokenize, Comment$2 = comment, AtRule$2 = atRule, Root$4 = root, Rule$2 = rule;
  const SAFE_COMMENT_NEIGHBOR = {
    empty: !0,
    space: !0
  };
  function findLastWithPosition(tokens) {
    for (let i2 = tokens.length - 1; i2 >= 0; i2--) {
      let token = tokens[i2], pos = token[3] || token[2];
      if (pos)
        return pos;
    }
  }
  var parser = class {
    constructor(input2) {
      this.input = input2, this.root = new Root$4(), this.current = this.root, this.spaces = "", this.semicolon = !1, this.customProperty = !1, this.createTokenizer(), this.root.source = { input: input2, start: { offset: 0, line: 1, column: 1 } };
    }
    createTokenizer() {
      this.tokenizer = tokenizer(this.input);
    }
    parse() {
      let token;
      for (; !this.tokenizer.endOfFile(); )
        switch (token = this.tokenizer.nextToken(), token[0]) {
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
            break;
        }
      this.endFile();
    }
    comment(token) {
      let node2 = new Comment$2();
      this.init(node2, token[2]), node2.source.end = this.getPosition(token[3] || token[2]);
      let text2 = token[1].slice(2, -2);
      if (/^\s*$/.test(text2))
        node2.text = "", node2.raws.left = text2, node2.raws.right = "";
      else {
        let match = text2.match(/^(\s*)([^]*\S)(\s*)$/);
        node2.text = match[2], node2.raws.left = match[1], node2.raws.right = match[3];
      }
    }
    emptyRule(token) {
      let node2 = new Rule$2();
      this.init(node2, token[2]), node2.selector = "", node2.raws.between = "", this.current = node2;
    }
    other(start) {
      let end = !1, type = null, colon = !1, bracket = null, brackets = [], customProperty = start[1].startsWith("--"), tokens = [], token = start;
      for (; token; ) {
        if (type = token[0], tokens.push(token), type === "(" || type === "[")
          bracket || (bracket = token), brackets.push(type === "(" ? ")" : "]");
        else if (customProperty && colon && type === "{")
          bracket || (bracket = token), brackets.push("}");
        else if (brackets.length === 0)
          if (type === ";")
            if (colon) {
              this.decl(tokens, customProperty);
              return;
            } else
              break;
          else if (type === "{") {
            this.rule(tokens);
            return;
          } else if (type === "}") {
            this.tokenizer.back(tokens.pop()), end = !0;
            break;
          } else
            type === ":" && (colon = !0);
        else
          type === brackets[brackets.length - 1] && (brackets.pop(), brackets.length === 0 && (bracket = null));
        token = this.tokenizer.nextToken();
      }
      if (this.tokenizer.endOfFile() && (end = !0), brackets.length > 0 && this.unclosedBracket(bracket), end && colon) {
        if (!customProperty)
          for (; tokens.length && (token = tokens[tokens.length - 1][0], !(token !== "space" && token !== "comment")); )
            this.tokenizer.back(tokens.pop());
        this.decl(tokens, customProperty);
      } else
        this.unknownWord(tokens);
    }
    rule(tokens) {
      tokens.pop();
      let node2 = new Rule$2();
      this.init(node2, tokens[0][2]), node2.raws.between = this.spacesAndCommentsFromEnd(tokens), this.raw(node2, "selector", tokens), this.current = node2;
    }
    decl(tokens, customProperty) {
      let node2 = new Declaration$2();
      this.init(node2, tokens[0][2]);
      let last = tokens[tokens.length - 1];
      for (last[0] === ";" && (this.semicolon = !0, tokens.pop()), node2.source.end = this.getPosition(
        last[3] || last[2] || findLastWithPosition(tokens)
      ); tokens[0][0] !== "word"; )
        tokens.length === 1 && this.unknownWord(tokens), node2.raws.before += tokens.shift()[1];
      for (node2.source.start = this.getPosition(tokens[0][2]), node2.prop = ""; tokens.length; ) {
        let type = tokens[0][0];
        if (type === ":" || type === "space" || type === "comment")
          break;
        node2.prop += tokens.shift()[1];
      }
      node2.raws.between = "";
      let token;
      for (; tokens.length; )
        if (token = tokens.shift(), token[0] === ":") {
          node2.raws.between += token[1];
          break;
        } else
          token[0] === "word" && /\w/.test(token[1]) && this.unknownWord([token]), node2.raws.between += token[1];
      (node2.prop[0] === "_" || node2.prop[0] === "*") && (node2.raws.before += node2.prop[0], node2.prop = node2.prop.slice(1));
      let firstSpaces = [], next;
      for (; tokens.length && (next = tokens[0][0], !(next !== "space" && next !== "comment")); )
        firstSpaces.push(tokens.shift());
      this.precheckMissedSemicolon(tokens);
      for (let i2 = tokens.length - 1; i2 >= 0; i2--) {
        if (token = tokens[i2], token[1].toLowerCase() === "!important") {
          node2.important = !0;
          let string = this.stringFrom(tokens, i2);
          string = this.spacesFromEnd(tokens) + string, string !== " !important" && (node2.raws.important = string);
          break;
        } else if (token[1].toLowerCase() === "important") {
          let cache = tokens.slice(0), str = "";
          for (let j2 = i2; j2 > 0; j2--) {
            let type = cache[j2][0];
            if (str.trim().indexOf("!") === 0 && type !== "space")
              break;
            str = cache.pop()[1] + str;
          }
          str.trim().indexOf("!") === 0 && (node2.important = !0, node2.raws.important = str, tokens = cache);
        }
        if (token[0] !== "space" && token[0] !== "comment")
          break;
      }
      tokens.some((i2) => i2[0] !== "space" && i2[0] !== "comment") && (node2.raws.between += firstSpaces.map((i2) => i2[1]).join(""), firstSpaces = []), this.raw(node2, "value", firstSpaces.concat(tokens), customProperty), node2.value.includes(":") && !customProperty && this.checkMissedSemicolon(tokens);
    }
    atrule(token) {
      let node2 = new AtRule$2();
      node2.name = token[1].slice(1), node2.name === "" && this.unnamedAtrule(node2, token), this.init(node2, token[2]);
      let type, prev, shift, last = !1, open = !1, params = [], brackets = [];
      for (; !this.tokenizer.endOfFile(); ) {
        if (token = this.tokenizer.nextToken(), type = token[0], type === "(" || type === "[" ? brackets.push(type === "(" ? ")" : "]") : type === "{" && brackets.length > 0 ? brackets.push("}") : type === brackets[brackets.length - 1] && brackets.pop(), brackets.length === 0)
          if (type === ";") {
            node2.source.end = this.getPosition(token[2]), this.semicolon = !0;
            break;
          } else if (type === "{") {
            open = !0;
            break;
          } else if (type === "}") {
            if (params.length > 0) {
              for (shift = params.length - 1, prev = params[shift]; prev && prev[0] === "space"; )
                prev = params[--shift];
              prev && (node2.source.end = this.getPosition(prev[3] || prev[2]));
            }
            this.end(token);
            break;
          } else
            params.push(token);
        else
          params.push(token);
        if (this.tokenizer.endOfFile()) {
          last = !0;
          break;
        }
      }
      node2.raws.between = this.spacesAndCommentsFromEnd(params), params.length ? (node2.raws.afterName = this.spacesAndCommentsFromStart(params), this.raw(node2, "params", params), last && (token = params[params.length - 1], node2.source.end = this.getPosition(token[3] || token[2]), this.spaces = node2.raws.between, node2.raws.between = "")) : (node2.raws.afterName = "", node2.params = ""), open && (node2.nodes = [], this.current = node2);
    }
    end(token) {
      this.current.nodes && this.current.nodes.length && (this.current.raws.semicolon = this.semicolon), this.semicolon = !1, this.current.raws.after = (this.current.raws.after || "") + this.spaces, this.spaces = "", this.current.parent ? (this.current.source.end = this.getPosition(token[2]), this.current = this.current.parent) : this.unexpectedClose(token);
    }
    endFile() {
      this.current.parent && this.unclosedBlock(), this.current.nodes && this.current.nodes.length && (this.current.raws.semicolon = this.semicolon), this.current.raws.after = (this.current.raws.after || "") + this.spaces;
    }
    freeSemicolon(token) {
      if (this.spaces += token[1], this.current.nodes) {
        let prev = this.current.nodes[this.current.nodes.length - 1];
        prev && prev.type === "rule" && !prev.raws.ownSemicolon && (prev.raws.ownSemicolon = this.spaces, this.spaces = "");
      }
    }
    // Helpers
    getPosition(offset) {
      let pos = this.input.fromOffset(offset);
      return {
        offset,
        line: pos.line,
        column: pos.col
      };
    }
    init(node2, offset) {
      this.current.push(node2), node2.source = {
        start: this.getPosition(offset),
        input: this.input
      }, node2.raws.before = this.spaces, this.spaces = "", node2.type !== "comment" && (this.semicolon = !1);
    }
    raw(node2, prop, tokens, customProperty) {
      let token, type, length = tokens.length, value = "", clean = !0, next, prev;
      for (let i2 = 0; i2 < length; i2 += 1)
        token = tokens[i2], type = token[0], type === "space" && i2 === length - 1 && !customProperty ? clean = !1 : type === "comment" ? (prev = tokens[i2 - 1] ? tokens[i2 - 1][0] : "empty", next = tokens[i2 + 1] ? tokens[i2 + 1][0] : "empty", !SAFE_COMMENT_NEIGHBOR[prev] && !SAFE_COMMENT_NEIGHBOR[next] ? value.slice(-1) === "," ? clean = !1 : value += token[1] : clean = !1) : value += token[1];
      if (!clean) {
        let raw = tokens.reduce((all, i2) => all + i2[1], "");
        node2.raws[prop] = { value, raw };
      }
      node2[prop] = value;
    }
    spacesAndCommentsFromEnd(tokens) {
      let lastTokenType, spaces = "";
      for (; tokens.length && (lastTokenType = tokens[tokens.length - 1][0], !(lastTokenType !== "space" && lastTokenType !== "comment")); )
        spaces = tokens.pop()[1] + spaces;
      return spaces;
    }
    spacesAndCommentsFromStart(tokens) {
      let next, spaces = "";
      for (; tokens.length && (next = tokens[0][0], !(next !== "space" && next !== "comment")); )
        spaces += tokens.shift()[1];
      return spaces;
    }
    spacesFromEnd(tokens) {
      let lastTokenType, spaces = "";
      for (; tokens.length && (lastTokenType = tokens[tokens.length - 1][0], lastTokenType === "space"); )
        spaces = tokens.pop()[1] + spaces;
      return spaces;
    }
    stringFrom(tokens, from) {
      let result2 = "";
      for (let i2 = from; i2 < tokens.length; i2++)
        result2 += tokens[i2][1];
      return tokens.splice(from, tokens.length - from), result2;
    }
    colon(tokens) {
      let brackets = 0, token, type, prev;
      for (let [i2, element2] of tokens.entries()) {
        if (token = element2, type = token[0], type === "(" && (brackets += 1), type === ")" && (brackets -= 1), brackets === 0 && type === ":")
          if (!prev)
            this.doubleColon(token);
          else {
            if (prev[0] === "word" && prev[1] === "progid")
              continue;
            return i2;
          }
        prev = token;
      }
      return !1;
    }
    // Errors
    unclosedBracket(bracket) {
      throw this.input.error(
        "Unclosed bracket",
        { offset: bracket[2] },
        { offset: bracket[2] + 1 }
      );
    }
    unknownWord(tokens) {
      throw this.input.error(
        "Unknown word",
        { offset: tokens[0][2] },
        { offset: tokens[0][2] + tokens[0][1].length }
      );
    }
    unexpectedClose(token) {
      throw this.input.error(
        "Unexpected }",
        { offset: token[2] },
        { offset: token[2] + 1 }
      );
    }
    unclosedBlock() {
      let pos = this.current.source.start;
      throw this.input.error("Unclosed block", pos.line, pos.column);
    }
    doubleColon(token) {
      throw this.input.error(
        "Double colon",
        { offset: token[2] },
        { offset: token[2] + token[1].length }
      );
    }
    unnamedAtrule(node2, token) {
      throw this.input.error(
        "At-rule without name",
        { offset: token[2] },
        { offset: token[2] + token[1].length }
      );
    }
    precheckMissedSemicolon() {
    }
    checkMissedSemicolon(tokens) {
      let colon = this.colon(tokens);
      if (colon === !1)
        return;
      let founded = 0, token;
      for (let j2 = colon - 1; j2 >= 0 && (token = tokens[j2], !(token[0] !== "space" && (founded += 1, founded === 2))); j2--)
        ;
      throw this.input.error(
        "Missed semicolon",
        token[0] === "word" ? token[3] + 1 : token[2]
      );
    }
  };
  let Container$2 = container, Parser = parser, Input$4 = input;
  function parse$4(css2, opts) {
    let input2 = new Input$4(css2, opts), parser2 = new Parser(input2);
    try {
      parser2.parse();
    } catch (e) {
      throw e;
    }
    return parser2.root;
  }
  var parse_1 = parse$4;
  parse$4.default = parse$4, Container$2.registerParse(parse$4);
  let { isClean, my } = symbols, MapGenerator$1 = mapGenerator, stringify$2 = stringify_1, Container$1 = container, Document$2 = document$1, Result$2 = result, parse$3 = parse_1, Root$3 = root;
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
  }, CHILDREN = 0;
  function isPromise(obj) {
    return typeof obj == "object" && typeof obj.then == "function";
  }
  function getEvents(node2) {
    let key2 = !1, type = TYPE_TO_CLASS_NAME[node2.type];
    return node2.type === "decl" ? key2 = node2.prop.toLowerCase() : node2.type === "atrule" && (key2 = node2.name.toLowerCase()), key2 && node2.append ? [
      type,
      type + "-" + key2,
      CHILDREN,
      type + "Exit",
      type + "Exit-" + key2
    ] : key2 ? [type, type + "-" + key2, type + "Exit", type + "Exit-" + key2] : node2.append ? [type, CHILDREN, type + "Exit"] : [type, type + "Exit"];
  }
  function toStack(node2) {
    let events;
    return node2.type === "document" ? events = ["Document", CHILDREN, "DocumentExit"] : node2.type === "root" ? events = ["Root", CHILDREN, "RootExit"] : events = getEvents(node2), {
      node: node2,
      events,
      eventIndex: 0,
      visitors: [],
      visitorIndex: 0,
      iterator: 0
    };
  }
  function cleanMarks(node2) {
    return node2[isClean] = !1, node2.nodes && node2.nodes.forEach((i2) => cleanMarks(i2)), node2;
  }
  let postcss$1 = {}, LazyResult$2 = class LazyResult2 {
    constructor(processor2, css2, opts) {
      this.stringified = !1, this.processed = !1;
      let root2;
      if (typeof css2 == "object" && css2 !== null && (css2.type === "root" || css2.type === "document"))
        root2 = cleanMarks(css2);
      else if (css2 instanceof LazyResult2 || css2 instanceof Result$2)
        root2 = cleanMarks(css2.root), css2.map && (typeof opts.map > "u" && (opts.map = {}), opts.map.inline || (opts.map.inline = !1), opts.map.prev = css2.map);
      else {
        let parser2 = parse$3;
        opts.syntax && (parser2 = opts.syntax.parse), opts.parser && (parser2 = opts.parser), parser2.parse && (parser2 = parser2.parse);
        try {
          root2 = parser2(css2, opts);
        } catch (error) {
          this.processed = !0, this.error = error;
        }
        root2 && !root2[my] && Container$1.rebuild(root2);
      }
      this.result = new Result$2(processor2, root2, opts), this.helpers = { ...postcss$1, result: this.result, postcss: postcss$1 }, this.plugins = this.processor.plugins.map((plugin) => typeof plugin == "object" && plugin.prepare ? { ...plugin, ...plugin.prepare(this.result) } : plugin);
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
      return this.async().then(onFulfilled, onRejected);
    }
    catch(onRejected) {
      return this.async().catch(onRejected);
    }
    finally(onFinally) {
      return this.async().then(onFinally, onFinally);
    }
    async() {
      return this.error ? Promise.reject(this.error) : this.processed ? Promise.resolve(this.result) : (this.processing || (this.processing = this.runAsync()), this.processing);
    }
    sync() {
      if (this.error)
        throw this.error;
      if (this.processed)
        return this.result;
      if (this.processed = !0, this.processing)
        throw this.getAsyncError();
      for (let plugin of this.plugins) {
        let promise = this.runOnRoot(plugin);
        if (isPromise(promise))
          throw this.getAsyncError();
      }
      if (this.prepareVisitors(), this.hasListener) {
        let root2 = this.result.root;
        for (; !root2[isClean]; )
          root2[isClean] = !0, this.walkSync(root2);
        if (this.listeners.OnceExit)
          if (root2.type === "document")
            for (let subRoot of root2.nodes)
              this.visitSync(this.listeners.OnceExit, subRoot);
          else
            this.visitSync(this.listeners.OnceExit, root2);
      }
      return this.result;
    }
    stringify() {
      if (this.error)
        throw this.error;
      if (this.stringified)
        return this.result;
      this.stringified = !0, this.sync();
      let opts = this.result.opts, str = stringify$2;
      opts.syntax && (str = opts.syntax.stringify), opts.stringifier && (str = opts.stringifier), str.stringify && (str = str.stringify);
      let data = new MapGenerator$1(str, this.result.root, this.result.opts).generate();
      return this.result.css = data[0], this.result.map = data[1], this.result;
    }
    walkSync(node2) {
      node2[isClean] = !0;
      let events = getEvents(node2);
      for (let event of events)
        if (event === CHILDREN)
          node2.nodes && node2.each((child) => {
            child[isClean] || this.walkSync(child);
          });
        else {
          let visitors = this.listeners[event];
          if (visitors && this.visitSync(visitors, node2.toProxy()))
            return;
        }
    }
    visitSync(visitors, node2) {
      for (let [plugin, visitor] of visitors) {
        this.result.lastPlugin = plugin;
        let promise;
        try {
          promise = visitor(node2, this.helpers);
        } catch (e) {
          throw this.handleError(e, node2.proxyOf);
        }
        if (node2.type !== "root" && node2.type !== "document" && !node2.parent)
          return !0;
        if (isPromise(promise))
          throw this.getAsyncError();
      }
    }
    runOnRoot(plugin) {
      this.result.lastPlugin = plugin;
      try {
        if (typeof plugin == "object" && plugin.Once) {
          if (this.result.root.type === "document") {
            let roots = this.result.root.nodes.map(
              (root2) => plugin.Once(root2, this.helpers)
            );
            return isPromise(roots[0]) ? Promise.all(roots) : roots;
          }
          return plugin.Once(this.result.root, this.helpers);
        } else if (typeof plugin == "function")
          return plugin(this.result.root, this.result);
      } catch (error) {
        throw this.handleError(error);
      }
    }
    getAsyncError() {
      throw new Error("Use process(css).then(cb) to work with async plugins");
    }
    handleError(error, node2) {
      let plugin = this.result.lastPlugin;
      try {
        node2 && node2.addToError(error), this.error = error, error.name === "CssSyntaxError" && !error.plugin ? (error.plugin = plugin.postcssPlugin, error.setMessage()) : plugin.postcssVersion;
      } catch (err) {
        console && console.error && console.error(err);
      }
      return error;
    }
    async runAsync() {
      this.plugin = 0;
      for (let i2 = 0; i2 < this.plugins.length; i2++) {
        let plugin = this.plugins[i2], promise = this.runOnRoot(plugin);
        if (isPromise(promise))
          try {
            await promise;
          } catch (error) {
            throw this.handleError(error);
          }
      }
      if (this.prepareVisitors(), this.hasListener) {
        let root2 = this.result.root;
        for (; !root2[isClean]; ) {
          root2[isClean] = !0;
          let stack = [toStack(root2)];
          for (; stack.length > 0; ) {
            let promise = this.visitTick(stack);
            if (isPromise(promise))
              try {
                await promise;
              } catch (e) {
                let node2 = stack[stack.length - 1].node;
                throw this.handleError(e, node2);
              }
          }
        }
        if (this.listeners.OnceExit)
          for (let [plugin, visitor] of this.listeners.OnceExit) {
            this.result.lastPlugin = plugin;
            try {
              if (root2.type === "document") {
                let roots = root2.nodes.map(
                  (subRoot) => visitor(subRoot, this.helpers)
                );
                await Promise.all(roots);
              } else
                await visitor(root2, this.helpers);
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
        this.listeners[type] || (this.listeners[type] = []), this.listeners[type].push([plugin, cb]);
      };
      for (let plugin of this.plugins)
        if (typeof plugin == "object")
          for (let event in plugin) {
            if (!PLUGIN_PROPS[event] && /^[A-Z]/.test(event))
              throw new Error(
                `Unknown event ${event} in ${plugin.postcssPlugin}. Try to update PostCSS (${this.processor.version} now).`
              );
            if (!NOT_VISITORS[event])
              if (typeof plugin[event] == "object")
                for (let filter in plugin[event])
                  filter === "*" ? add(plugin, event, plugin[event][filter]) : add(
                    plugin,
                    event + "-" + filter.toLowerCase(),
                    plugin[event][filter]
                  );
              else
                typeof plugin[event] == "function" && add(plugin, event, plugin[event]);
          }
      this.hasListener = Object.keys(this.listeners).length > 0;
    }
    visitTick(stack) {
      let visit = stack[stack.length - 1], { node: node2, visitors } = visit;
      if (node2.type !== "root" && node2.type !== "document" && !node2.parent) {
        stack.pop();
        return;
      }
      if (visitors.length > 0 && visit.visitorIndex < visitors.length) {
        let [plugin, visitor] = visitors[visit.visitorIndex];
        visit.visitorIndex += 1, visit.visitorIndex === visitors.length && (visit.visitors = [], visit.visitorIndex = 0), this.result.lastPlugin = plugin;
        try {
          return visitor(node2.toProxy(), this.helpers);
        } catch (e) {
          throw this.handleError(e, node2);
        }
      }
      if (visit.iterator !== 0) {
        let iterator = visit.iterator, child;
        for (; child = node2.nodes[node2.indexes[iterator]]; )
          if (node2.indexes[iterator] += 1, !child[isClean]) {
            child[isClean] = !0, stack.push(toStack(child));
            return;
          }
        visit.iterator = 0, delete node2.indexes[iterator];
      }
      let events = visit.events;
      for (; visit.eventIndex < events.length; ) {
        let event = events[visit.eventIndex];
        if (visit.eventIndex += 1, event === CHILDREN) {
          node2.nodes && node2.nodes.length && (node2[isClean] = !0, visit.iterator = node2.getIterator());
          return;
        } else if (this.listeners[event]) {
          visit.visitors = this.listeners[event];
          return;
        }
      }
      stack.pop();
    }
  };
  LazyResult$2.registerPostcss = (dependant) => {
    postcss$1 = dependant;
  };
  var lazyResult = LazyResult$2;
  LazyResult$2.default = LazyResult$2, Root$3.registerLazyResult(LazyResult$2), Document$2.registerLazyResult(LazyResult$2);
  let MapGenerator = mapGenerator, stringify$1 = stringify_1, parse$2 = parse_1;
  const Result$1 = result;
  let NoWorkResult$1 = class {
    constructor(processor2, css2, opts) {
      css2 = css2.toString(), this.stringified = !1, this._processor = processor2, this._css = css2, this._opts = opts, this._map = void 0;
      let root2, str = stringify$1;
      this.result = new Result$1(this._processor, root2, this._opts), this.result.css = css2;
      let self2 = this;
      Object.defineProperty(this.result, "root", {
        get() {
          return self2.root;
        }
      });
      let map = new MapGenerator(str, root2, this._opts, css2);
      if (map.isMap()) {
        let [generatedCSS, generatedMap] = map.generate();
        generatedCSS && (this.result.css = generatedCSS), generatedMap && (this.result.map = generatedMap);
      }
    }
    get [Symbol.toStringTag]() {
      return "NoWorkResult";
    }
    get processor() {
      return this.result.processor;
    }
    get opts() {
      return this.result.opts;
    }
    get css() {
      return this.result.css;
    }
    get content() {
      return this.result.css;
    }
    get map() {
      return this.result.map;
    }
    get root() {
      if (this._root)
        return this._root;
      let root2, parser2 = parse$2;
      try {
        root2 = parser2(this._css, this._opts);
      } catch (error) {
        this.error = error;
      }
      if (this.error)
        throw this.error;
      return this._root = root2, root2;
    }
    get messages() {
      return [];
    }
    warnings() {
      return [];
    }
    toString() {
      return this._css;
    }
    then(onFulfilled, onRejected) {
      return this.async().then(onFulfilled, onRejected);
    }
    catch(onRejected) {
      return this.async().catch(onRejected);
    }
    finally(onFinally) {
      return this.async().then(onFinally, onFinally);
    }
    async() {
      return this.error ? Promise.reject(this.error) : Promise.resolve(this.result);
    }
    sync() {
      if (this.error)
        throw this.error;
      return this.result;
    }
  };
  var noWorkResult = NoWorkResult$1;
  NoWorkResult$1.default = NoWorkResult$1;
  let NoWorkResult = noWorkResult, LazyResult$1 = lazyResult, Document$1 = document$1, Root$2 = root, Processor$1 = class {
    constructor(plugins = []) {
      this.version = "8.4.16", this.plugins = this.normalize(plugins);
    }
    use(plugin) {
      return this.plugins = this.plugins.concat(this.normalize([plugin])), this;
    }
    process(css2, opts = {}) {
      return this.plugins.length === 0 && typeof opts.parser > "u" && typeof opts.stringifier > "u" && typeof opts.syntax > "u" ? new NoWorkResult(this, css2, opts) : new LazyResult$1(this, css2, opts);
    }
    normalize(plugins) {
      let normalized = [];
      for (let i2 of plugins)
        if (i2.postcss === !0 ? i2 = i2() : i2.postcss && (i2 = i2.postcss), typeof i2 == "object" && Array.isArray(i2.plugins))
          normalized = normalized.concat(i2.plugins);
        else if (typeof i2 == "object" && i2.postcssPlugin)
          normalized.push(i2);
        else if (typeof i2 == "function")
          normalized.push(i2);
        else if (!(typeof i2 == "object" && (i2.parse || i2.stringify)))
          throw new Error(i2 + " is not a PostCSS plugin");
      return normalized;
    }
  };
  var processor = Processor$1;
  Processor$1.default = Processor$1, Root$2.registerProcessor(Processor$1), Document$1.registerProcessor(Processor$1);
  let Declaration$1 = declaration, PreviousMap = previousMap, Comment$1 = comment, AtRule$1 = atRule, Input$3 = input, Root$1 = root, Rule$1 = rule;
  function fromJSON$1(json, inputs) {
    if (Array.isArray(json))
      return json.map((n2) => fromJSON$1(n2));
    let { inputs: ownInputs, ...defaults } = json;
    if (ownInputs) {
      inputs = [];
      for (let input2 of ownInputs) {
        let inputHydrated = { ...input2, __proto__: Input$3.prototype };
        inputHydrated.map && (inputHydrated.map = {
          ...inputHydrated.map,
          __proto__: PreviousMap.prototype
        }), inputs.push(inputHydrated);
      }
    }
    if (defaults.nodes && (defaults.nodes = json.nodes.map((n2) => fromJSON$1(n2, inputs))), defaults.source) {
      let { inputId, ...source } = defaults.source;
      defaults.source = source, inputId != null && (defaults.source.input = inputs[inputId]);
    }
    if (defaults.type === "root")
      return new Root$1(defaults);
    if (defaults.type === "decl")
      return new Declaration$1(defaults);
    if (defaults.type === "rule")
      return new Rule$1(defaults);
    if (defaults.type === "comment")
      return new Comment$1(defaults);
    if (defaults.type === "atrule")
      return new AtRule$1(defaults);
    throw new Error("Unknown node type: " + json.type);
  }
  var fromJSON_1 = fromJSON$1;
  fromJSON$1.default = fromJSON$1;
  let CssSyntaxError = cssSyntaxError, Declaration = declaration, LazyResult = lazyResult, Container = container, Processor = processor, stringify = stringify_1, fromJSON = fromJSON_1, Document = document$1, Warning = warning, Comment = comment, AtRule = atRule, Result = result, Input$2 = input, parse$1 = parse_1, list = list_1, Rule = rule, Root = root, Node = node;
  function postcss(...plugins) {
    return plugins.length === 1 && Array.isArray(plugins[0]) && (plugins = plugins[0]), new Processor(plugins);
  }
  postcss.plugin = function(name, initializer) {
    let warningPrinted = !1;
    function creator(...args) {
      console && console.warn && !warningPrinted && (warningPrinted = !0, console.warn(
        name + `: postcss.plugin was deprecated. Migration guide:
https://evilmartians.com/chronicles/postcss-8-plugin-migration`
      ), "cn".startsWith("cn") && console.warn(
        name + `: 里面 postcss.plugin 被弃用. 迁移指南:
https://www.w3ctech.com/topic/2226`
      ));
      let transformer = initializer(...args);
      return transformer.postcssPlugin = name, transformer.postcssVersion = new Processor().version, transformer;
    }
    let cache;
    return Object.defineProperty(creator, "postcss", {
      get() {
        return cache || (cache = creator()), cache;
      }
    }), creator.process = function(css2, processOpts, pluginOpts) {
      return postcss([creator(pluginOpts)]).process(css2, processOpts);
    }, creator;
  }, postcss.stringify = stringify, postcss.parse = parse$1, postcss.fromJSON = fromJSON, postcss.list = list, postcss.comment = (defaults) => new Comment(defaults), postcss.atRule = (defaults) => new AtRule(defaults), postcss.decl = (defaults) => new Declaration(defaults), postcss.rule = (defaults) => new Rule(defaults), postcss.root = (defaults) => new Root(defaults), postcss.document = (defaults) => new Document(defaults), postcss.CssSyntaxError = CssSyntaxError, postcss.Declaration = Declaration, postcss.Container = Container, postcss.Processor = Processor, postcss.Document = Document, postcss.Comment = Comment, postcss.Warning = Warning, postcss.AtRule = AtRule, postcss.Result = Result, postcss.Input = Input$2, postcss.Rule = Rule, postcss.Root = Root, postcss.Node = Node, LazyResult.registerPostcss(postcss);
  var postcss_1 = postcss;
  postcss.default = postcss, postcss_1.stringify, postcss_1.fromJSON, postcss_1.plugin, postcss_1.parse, postcss_1.list, postcss_1.document, postcss_1.comment, postcss_1.atRule, postcss_1.rule, postcss_1.decl, postcss_1.root, postcss_1.CssSyntaxError, postcss_1.Declaration, postcss_1.Container, postcss_1.Processor, postcss_1.Document, postcss_1.Comment, postcss_1.Warning, postcss_1.AtRule, postcss_1.Result, postcss_1.Input, postcss_1.Rule, postcss_1.Root, postcss_1.Node;
  var pixelUnitRegexp = {};
  Object.defineProperty(pixelUnitRegexp, "__esModule", { value: !0 });
  function getUnitRegexp(unit) {
    return new RegExp(`"[^"]+"|'[^']+'|url\\([^\\)]+\\)|(\\d*\\.?\\d+)` + unit, "g");
  }
  pixelUnitRegexp.default = getUnitRegexp;
  var propListMatcher = {};
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: !0 }), exports.createPropListMatcher = exports.filterPropList = void 0, exports.filterPropList = {
      exact: function(list2) {
        return list2.filter(function(m2) {
          return m2.match(/^[^\*\!]+$/);
        });
      },
      contain: function(list2) {
        return list2.filter(function(m2) {
          return m2.match(/^\*.+\*$/);
        }).map(function(m2) {
          return m2.substr(1, m2.length - 2);
        });
      },
      endWith: function(list2) {
        return list2.filter(function(m2) {
          return m2.match(/^\*[^\*]+$/);
        }).map(function(m2) {
          return m2.substr(1);
        });
      },
      startWith: function(list2) {
        return list2.filter(function(m2) {
          return m2.match(/^[^\*\!]+\*$/);
        }).map(function(m2) {
          return m2.substr(0, m2.length - 1);
        });
      },
      notExact: function(list2) {
        return list2.filter(function(m2) {
          return m2.match(/^\![^\*].*$/);
        }).map(function(m2) {
          return m2.substr(1);
        });
      },
      notContain: function(list2) {
        return list2.filter(function(m2) {
          return m2.match(/^\!\*.+\*$/);
        }).map(function(m2) {
          return m2.substr(2, m2.length - 3);
        });
      },
      notEndWith: function(list2) {
        return list2.filter(function(m2) {
          return m2.match(/^\!\*[^\*]+$/);
        }).map(function(m2) {
          return m2.substr(2);
        });
      },
      notStartWith: function(list2) {
        return list2.filter(function(m2) {
          return m2.match(/^\![^\*]+\*$/);
        }).map(function(m2) {
          return m2.substr(1, m2.length - 2);
        });
      }
    };
    const matcherMap = /* @__PURE__ */ new Map();
    function _createPropListMatcher(propList) {
      var hasWild = propList.indexOf("*") > -1, matchAll = hasWild && propList.length === 1, lists = {
        exact: exports.filterPropList.exact(propList),
        contain: exports.filterPropList.contain(propList),
        startWith: exports.filterPropList.startWith(propList),
        endWith: exports.filterPropList.endWith(propList),
        notExact: exports.filterPropList.notExact(propList),
        notContain: exports.filterPropList.notContain(propList),
        notStartWith: exports.filterPropList.notStartWith(propList),
        notEndWith: exports.filterPropList.notEndWith(propList)
      };
      return function(prop) {
        return matchAll ? !0 : (hasWild || lists.exact.indexOf(prop) > -1 || lists.contain.some(function(m2) {
          return prop.indexOf(m2) > -1;
        }) || lists.startWith.some(function(m2) {
          return prop.indexOf(m2) === 0;
        }) || lists.endWith.some(function(m2) {
          return prop.indexOf(m2) === prop.length - m2.length;
        })) && !(lists.notExact.indexOf(prop) > -1 || lists.notContain.some(function(m2) {
          return prop.indexOf(m2) > -1;
        }) || lists.notStartWith.some(function(m2) {
          return prop.indexOf(m2) === 0;
        }) || lists.notEndWith.some(function(m2) {
          return prop.indexOf(m2) === prop.length - m2.length;
        }));
      };
    }
    function createPropListMatcher(propList) {
      const key2 = propList.join(",");
      return matcherMap.has(key2) || matcherMap.set(key2, _createPropListMatcher(propList)), matcherMap.get(key2);
    }
    exports.createPropListMatcher = createPropListMatcher;
  })(propListMatcher);
  var __importDefault = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  const pixel_unit_regexp_1 = __importDefault(pixelUnitRegexp), prop_list_matcher_1 = propListMatcher, getDefault = () => ({
    unitToConvert: "px",
    viewportWidth: 320,
    viewportHeight: 568,
    unitPrecision: 5,
    viewportUnit: "vw",
    fontViewportUnit: "vw",
    selectorBlackList: [],
    propList: ["*"],
    minPixelValue: 1,
    mediaQuery: !1,
    replace: !0,
    landscape: !1,
    landscapeUnit: "vw",
    exclude: [],
    landscapeWidth: 568
  }), postcssPlugin = "postcss-px2vp", IGNORE_NEXT_COMMENT = "px-to-viewport-ignore-next", IGNORE_PREV_COMMENT = "px-to-viewport-ignore", isExclude = (exclude, file) => file ? Array.isArray(exclude) ? exclude.some((reg) => reg.test(file)) : exclude.test(file) : !1;
  function getOption(option, rule2) {
    return typeof option == "function" ? option(rule2) : option;
  }
  function toFixed(number, precision) {
    var multiplier = Math.pow(10, precision + 1), wholeNumber = Math.floor(number * multiplier);
    return Math.round(wholeNumber / 10) * 10 / multiplier;
  }
  function createPxReplace(opts, viewportUnit, viewportSize) {
    return function(m2, $1) {
      if (!$1)
        return m2;
      var pixels = parseFloat($1);
      if (pixels <= opts.minPixelValue)
        return m2;
      var parsedVal = toFixed(pixels / viewportSize * 100, opts.unitPrecision);
      return parsedVal === 0 ? "0" : `${parsedVal}${viewportUnit}`;
    };
  }
  function validateParams(params, mediaQuery) {
    return !params || params && mediaQuery;
  }
  function getUnit(prop, opts) {
    return prop.includes("font") ? opts.fontViewportUnit : opts.viewportUnit;
  }
  function declarationExists(decls, prop, value) {
    return decls ? decls.some(function(decl) {
      return decl.prop === prop && decl.value === value;
    }) : !1;
  }
  function optionCreator({ options, rule: rule2, defaultOptions }) {
    return options ? Object.assign(Object.assign({}, defaultOptions), Object.entries(options).reduce((prev, [key2, value]) => (prev[key2] = getOption(value, rule2), prev), {})) : defaultOptions;
  }
  const blacklistedSelector = (blacklist, selector) => blacklist.some((rule2) => typeof rule2 == "string" ? selector.includes(rule2) : rule2.test(selector)), px2vp = (options) => {
    const landscapeRules = [], defaultOptions = getDefault();
    return {
      postcssPlugin,
      Once(root2, { atRule: atRule2, result: result2 }) {
        if (root2.walkRules((rule2) => {
          var _a, _b;
          const file = (_a = rule2.source) === null || _a === void 0 ? void 0 : _a.input.file, { exclude, selectorBlackList, propList, landscape, unitToConvert, minPixelValue, unitPrecision, landscapeUnit, landscapeWidth, fontViewportUnit, viewportUnit, mediaQuery, viewportWidth, replace: replace2 } = optionCreator({ options, rule: rule2, defaultOptions }), pxRegex = pixel_unit_regexp_1.default(unitToConvert), satisfyPropList = prop_list_matcher_1.createPropListMatcher(propList), params = (_b = rule2.parent) === null || _b === void 0 ? void 0 : _b.params;
          if (!(isExclude(exclude, file) || blacklistedSelector(selectorBlackList, rule2.selector))) {
            if (landscape && !params) {
              const landscapeRule = rule2.clone().removeAll();
              rule2.walkDecls((decl) => {
                const { value, prop } = decl;
                !value.includes(unitToConvert) || !satisfyPropList(prop) || (landscapeRule.append(decl.clone({
                  value: value.replace(pxRegex, createPxReplace({ minPixelValue, unitPrecision }, landscapeUnit, landscapeWidth))
                })), landscapeRule.nodes.length > 0 && landscapeRules.push(landscapeRule));
              });
            }
            validateParams(params, mediaQuery) && rule2.walkDecls((decl, i2) => {
              var _a2, _b2;
              let { value, prop } = decl;
              if (!value.includes(unitToConvert) || !satisfyPropList(prop))
                return;
              const prev = decl.prev();
              if (prev?.type === "comment" && prev.text === IGNORE_NEXT_COMMENT) {
                prev.remove();
                return;
              }
              const next = decl.next();
              if (next?.type === "comment" && next.text === IGNORE_PREV_COMMENT)
                if (/\n/.test((_a2 = next.raws.before) !== null && _a2 !== void 0 ? _a2 : ""))
                  result2.warn("Unexpected comment /* " + IGNORE_PREV_COMMENT + " */ must be after declaration at same line.", { node: next });
                else {
                  next.remove();
                  return;
                }
              const [unit, size2] = landscape && params?.includes("landscape") ? [landscapeUnit, landscapeWidth] : [
                getUnit(prop, { viewportUnit, fontViewportUnit }),
                viewportWidth
              ];
              value = value.replace(pxRegex, createPxReplace({ minPixelValue, unitPrecision }, unit, size2)), !declarationExists(decl.parent, prop, value) && (replace2 ? decl.value = value : (_b2 = decl.parent) === null || _b2 === void 0 || _b2.insertAfter(i2, decl.clone({ value })));
            });
          }
        }), landscapeRules.length) {
          const landscapeRoot = atRule2({
            params: "(orientation: landscape)",
            name: "media"
          });
          landscapeRules.forEach((rule2) => {
            landscapeRoot.append(rule2);
          }), root2.append(landscapeRoot);
        }
      }
    };
  };
  px2vp.postcss = !0;
  var dist = px2vp;
  function CommentRemover$1(options) {
    this.options = options;
  }
  CommentRemover$1.prototype.canRemove = function(comment2) {
    const remove = this.options.remove;
    if (remove)
      return remove(comment2);
    if (!(comment2.indexOf("!") === 0) || this.options.removeAll || this._hasFirst)
      return !0;
    if (this.options.removeAllButFirst && !this._hasFirst)
      return this._hasFirst = !0, !1;
  };
  var commentRemover = CommentRemover$1, commentParser$1 = function(input2) {
    const tokens = [], length = input2.length;
    let pos = 0, next;
    for (; pos < length; )
      next = input2.indexOf("/*", pos), ~next ? (tokens.push([0, pos, next]), pos = next, next = input2.indexOf("*/", pos + 2), tokens.push([1, pos + 2, next]), pos = next + 2) : (tokens.push([0, pos, length]), pos = length);
    return tokens;
  };
  const CommentRemover = commentRemover, commentParser = commentParser$1;
  function pluginCreator(opts = {}) {
    const remover = new CommentRemover(opts), matcherCache = /* @__PURE__ */ new Map(), replacerCache = /* @__PURE__ */ new Map();
    function matchesComments(source) {
      if (matcherCache.has(source))
        return matcherCache.get(source);
      const result2 = commentParser(source).filter(([type]) => type);
      return matcherCache.set(source, result2), result2;
    }
    function replaceComments(source, space2, separator = " ") {
      const key2 = source + "@|@" + separator;
      if (replacerCache.has(key2))
        return replacerCache.get(key2);
      const parsed = commentParser(source).reduce((value, [type, start, end]) => {
        const contents = source.slice(start, end);
        return type ? remover.canRemove(contents) ? value + separator : `${value}/*${contents}*/` : value + contents;
      }, ""), result2 = space2(parsed).join(" ");
      return replacerCache.set(key2, result2), result2;
    }
    return {
      postcssPlugin: "postcss-discard-comments",
      OnceExit(css2, { list: list2 }) {
        css2.walk((node2) => {
          if (node2.type === "comment" && remover.canRemove(node2.text)) {
            node2.remove();
            return;
          }
          if (typeof node2.raws.between == "string" && (node2.raws.between = replaceComments(node2.raws.between, list2.space)), node2.type === "decl") {
            if (node2.raws.value && node2.raws.value.raw && (node2.raws.value.value === node2.value ? node2.value = replaceComments(node2.raws.value.raw, list2.space) : node2.value = replaceComments(node2.value, list2.space), node2.raws.value = null), node2.raws.important) {
              node2.raws.important = replaceComments(
                node2.raws.important,
                list2.space
              );
              const b2 = matchesComments(node2.raws.important);
              node2.raws.important = b2.length ? node2.raws.important : "!important";
            } else
              node2.value = replaceComments(node2.value, list2.space);
            return;
          }
          if (node2.type === "rule" && node2.raws.selector && node2.raws.selector.raw) {
            node2.raws.selector.raw = replaceComments(
              node2.raws.selector.raw,
              list2.space,
              ""
            );
            return;
          }
          if (node2.type === "atrule") {
            if (node2.raws.afterName) {
              const commentsReplaced = replaceComments(
                node2.raws.afterName,
                list2.space
              );
              commentsReplaced.length ? node2.raws.afterName = " " + commentsReplaced + " " : node2.raws.afterName = commentsReplaced + " ";
            }
            node2.raws.params && node2.raws.params.raw && (node2.raws.params.raw = replaceComments(
              node2.raws.params.raw,
              list2.space
            ));
          }
        });
      }
    };
  }
  pluginCreator.postcss = !0;
  var src = pluginCreator;
  const subscriber_queue = [];
  function writable(value, start = noop) {
    let stop;
    const subscribers = /* @__PURE__ */ new Set();
    function set(new_value) {
      if (safe_not_equal(value, new_value) && (value = new_value, stop)) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers)
          subscriber[1](), subscriber_queue.push(subscriber, value);
        if (run_queue) {
          for (let i2 = 0; i2 < subscriber_queue.length; i2 += 2)
            subscriber_queue[i2][0](subscriber_queue[i2 + 1]);
          subscriber_queue.length = 0;
        }
      }
    }
    function update2(fn) {
      set(fn(value));
    }
    function subscribe2(run2, invalidate = noop) {
      const subscriber = [run2, invalidate];
      return subscribers.add(subscriber), subscribers.size === 1 && (stop = start(set) || noop), run2(value), () => {
        subscribers.delete(subscriber), subscribers.size === 0 && (stop(), stop = null);
      };
    }
    return { set, update: update2, subscribe: subscribe2 };
  }
  const UseSingleton = function(createInstance, { withKey = !1, immediate = !1 } = {}) {
    const UNDEFINED_INSTANCE = {};
    let _instance = UNDEFINED_INSTANCE, _key;
    function checkSameKey(key2) {
      return !withKey || key2 === void 0 || key2 === _key;
    }
    function getSingleton(key2) {
      return (_instance === UNDEFINED_INSTANCE || !checkSameKey(key2)) && (_key = key2, _instance = createInstance(_key)), _instance;
    }
    return immediate && getSingleton(), getSingleton;
  };
  function add_css$5(target) {
    append_styles(target, "svelte-6z5ekl", ".lbb-toast.svelte-6z5ekl{position:fixed;top:50%;left:50%;transform:translate(-50%, -50%);border-radius:4px;background-color:rgba(0, 0, 0, 0.8);padding:12px 24px;max-width:200px;color:#eee;font-size:16px;z-index:9999999}.lbb-toast--hide.svelte-6z5ekl{z-index:-1;visibility:hidden}");
  }
  function create_fragment$n(ctx) {
    let div, t2, div_class_value;
    return {
      c() {
        div = element("div"), t2 = text(
          /*content*/
          ctx[2]
        ), attr(div, "class", div_class_value = "lbb-toast " + /*visiable*/
        (ctx[1] ? "" : "lbb-toast--hide") + " svelte-6z5ekl");
      },
      m(target, anchor) {
        insert(target, div, anchor), append(div, t2), ctx[4](div);
      },
      p(ctx2, [dirty]) {
        dirty & /*content*/
        4 && set_data(
          t2,
          /*content*/
          ctx2[2]
        ), dirty & /*visiable*/
        2 && div_class_value !== (div_class_value = "lbb-toast " + /*visiable*/
        (ctx2[1] ? "" : "lbb-toast--hide") + " svelte-6z5ekl") && attr(div, "class", div_class_value);
      },
      i: noop,
      o: noop,
      d(detaching) {
        detaching && detach(div), ctx[4](null);
      }
    };
  }
  function instance$m($$self, $$props, $$invalidate) {
    let toast2, visiable = !1, closeTimer = null, content;
    function show({ title, duration = 1500 }) {
      $$invalidate(2, content = title), closeTimer && clearTimeout(closeTimer), $$invalidate(1, visiable = !0), closeTimer = setTimeout(
        () => {
          $$invalidate(1, visiable = !1), closeTimer = null;
        },
        duration
      );
    }
    function div_binding($$value) {
      binding_callbacks[$$value ? "unshift" : "push"](() => {
        toast2 = $$value, $$invalidate(0, toast2);
      });
    }
    return [toast2, visiable, content, show, div_binding];
  }
  class Toast extends SvelteComponent {
    constructor(options) {
      super(), init(this, options, instance$m, create_fragment$n, safe_not_equal, { show: 3 }, add_css$5);
    }
    get show() {
      return this.$$.ctx[3];
    }
  }
  const toast = UseSingleton(() => {
    const toastEl = new Toast({
      target: document.body,
      props: { content: "" }
    });
    return ({ title, duration = 1500 }) => {
      toastEl.show({
        title,
        duration
      });
    };
  })();
  function loadConfig$1(url) {
    return console.log("figma-css-better: load remote config", url), new Promise((resolve2, reject) => {
      GM_xmlhttpRequest({
        url,
        method: "get",
        onload(xhr) {
          if (+xhr.status != 200) {
            toast({ title: "配置加载失败" }), reject(new Error("配置加载失败"));
            return;
          }
          resolve2(JSON.parse(xhr.response));
        },
        onerror(e) {
          toast({ title: "配置加载失败" + e.message }), reject(e);
        }
      });
    });
  }
  const INNER_CONFIG = {
    id: "inner",
    name: "内置配置(小程序)",
    url: "",
    options: {
      pxToViewport: {
        unitToConvert: "px",
        viewportWidth: 50,
        viewportHeight: 1334,
        unitPrecision: 3,
        viewportUnit: "rpx",
        fontViewportUnit: "rpx",
        selectorBlackList: [".ignore"],
        minPixelValue: 1,
        mediaQuery: !1
      },
      filter: [
        "width",
        "height",
        "border",
        "border-radius",
        "font-size: ?(?!normal).*",
        "font-weight: ?(?!normal).*",
        "word-spacing",
        "line-height",
        "color",
        "opacity",
        "background",
        "background-image",
        "box-shadow"
      ],
      replace: []
    }
  }, INIT_CONFIG_OPTIONS = {
    pxToViewport: null,
    filter: [
      "width",
      "height",
      "border",
      "border-radius",
      "font-size: ?(?!normal).*",
      "font-weight: ?(?!normal).*",
      "word-spacing",
      "line-height",
      "color",
      "opacity",
      "background",
      "background-image",
      "box-shadow"
    ],
    replace: []
  };
  if (console.log("old config url", GM_getValue("__CONFIG_URL")), GM_getValue("__CONFIG_URL")) {
    const configList = GM_getValue("CONFIG_LIST", []);
    configList.every((i2) => i2.id !== "older") && (configList.push({
      id: "older",
      name: "回响小程序",
      url: GM_getValue("__CONFIG_URL")
    }), GM_setValue("CONFIG_LIST", configList), GM_setValue("USED_CONFIG_ID", "older")), GM_deleteValue("__CONFIG_URL");
  }
  const appStore = writable({
    usedConfigId: GM_getValue("USED_CONFIG_ID", "inner"),
    currentConfigData: {}
  });
  async function loadNewConfig(id) {
    const configLocal = [INNER_CONFIG, ...GM_getValue("CONFIG_LIST", [])].find(
      (i2) => i2.id === id
    );
    configLocal.url && (configLocal.options = await loadConfig$1(configLocal.url)), updateCurrentConfigData(configLocal);
  }
  appStore.subscribe(async (store) => {
    GM_setValue("USED_CONFIG_ID", store.usedConfigId), store.currentConfigData.id !== store.usedConfigId && loadNewConfig(store.usedConfigId);
  });
  function updateCurrentConfigData(data) {
    appStore.update((store) => (store.currentConfigData = data, store));
  }
  var colorName = {
    aliceblue: [240, 248, 255],
    antiquewhite: [250, 235, 215],
    aqua: [0, 255, 255],
    aquamarine: [127, 255, 212],
    azure: [240, 255, 255],
    beige: [245, 245, 220],
    bisque: [255, 228, 196],
    black: [0, 0, 0],
    blanchedalmond: [255, 235, 205],
    blue: [0, 0, 255],
    blueviolet: [138, 43, 226],
    brown: [165, 42, 42],
    burlywood: [222, 184, 135],
    cadetblue: [95, 158, 160],
    chartreuse: [127, 255, 0],
    chocolate: [210, 105, 30],
    coral: [255, 127, 80],
    cornflowerblue: [100, 149, 237],
    cornsilk: [255, 248, 220],
    crimson: [220, 20, 60],
    cyan: [0, 255, 255],
    darkblue: [0, 0, 139],
    darkcyan: [0, 139, 139],
    darkgoldenrod: [184, 134, 11],
    darkgray: [169, 169, 169],
    darkgreen: [0, 100, 0],
    darkgrey: [169, 169, 169],
    darkkhaki: [189, 183, 107],
    darkmagenta: [139, 0, 139],
    darkolivegreen: [85, 107, 47],
    darkorange: [255, 140, 0],
    darkorchid: [153, 50, 204],
    darkred: [139, 0, 0],
    darksalmon: [233, 150, 122],
    darkseagreen: [143, 188, 143],
    darkslateblue: [72, 61, 139],
    darkslategray: [47, 79, 79],
    darkslategrey: [47, 79, 79],
    darkturquoise: [0, 206, 209],
    darkviolet: [148, 0, 211],
    deeppink: [255, 20, 147],
    deepskyblue: [0, 191, 255],
    dimgray: [105, 105, 105],
    dimgrey: [105, 105, 105],
    dodgerblue: [30, 144, 255],
    firebrick: [178, 34, 34],
    floralwhite: [255, 250, 240],
    forestgreen: [34, 139, 34],
    fuchsia: [255, 0, 255],
    gainsboro: [220, 220, 220],
    ghostwhite: [248, 248, 255],
    gold: [255, 215, 0],
    goldenrod: [218, 165, 32],
    gray: [128, 128, 128],
    green: [0, 128, 0],
    greenyellow: [173, 255, 47],
    grey: [128, 128, 128],
    honeydew: [240, 255, 240],
    hotpink: [255, 105, 180],
    indianred: [205, 92, 92],
    indigo: [75, 0, 130],
    ivory: [255, 255, 240],
    khaki: [240, 230, 140],
    lavender: [230, 230, 250],
    lavenderblush: [255, 240, 245],
    lawngreen: [124, 252, 0],
    lemonchiffon: [255, 250, 205],
    lightblue: [173, 216, 230],
    lightcoral: [240, 128, 128],
    lightcyan: [224, 255, 255],
    lightgoldenrodyellow: [250, 250, 210],
    lightgray: [211, 211, 211],
    lightgreen: [144, 238, 144],
    lightgrey: [211, 211, 211],
    lightpink: [255, 182, 193],
    lightsalmon: [255, 160, 122],
    lightseagreen: [32, 178, 170],
    lightskyblue: [135, 206, 250],
    lightslategray: [119, 136, 153],
    lightslategrey: [119, 136, 153],
    lightsteelblue: [176, 196, 222],
    lightyellow: [255, 255, 224],
    lime: [0, 255, 0],
    limegreen: [50, 205, 50],
    linen: [250, 240, 230],
    magenta: [255, 0, 255],
    maroon: [128, 0, 0],
    mediumaquamarine: [102, 205, 170],
    mediumblue: [0, 0, 205],
    mediumorchid: [186, 85, 211],
    mediumpurple: [147, 112, 219],
    mediumseagreen: [60, 179, 113],
    mediumslateblue: [123, 104, 238],
    mediumspringgreen: [0, 250, 154],
    mediumturquoise: [72, 209, 204],
    mediumvioletred: [199, 21, 133],
    midnightblue: [25, 25, 112],
    mintcream: [245, 255, 250],
    mistyrose: [255, 228, 225],
    moccasin: [255, 228, 181],
    navajowhite: [255, 222, 173],
    navy: [0, 0, 128],
    oldlace: [253, 245, 230],
    olive: [128, 128, 0],
    olivedrab: [107, 142, 35],
    orange: [255, 165, 0],
    orangered: [255, 69, 0],
    orchid: [218, 112, 214],
    palegoldenrod: [238, 232, 170],
    palegreen: [152, 251, 152],
    paleturquoise: [175, 238, 238],
    palevioletred: [219, 112, 147],
    papayawhip: [255, 239, 213],
    peachpuff: [255, 218, 185],
    peru: [205, 133, 63],
    pink: [255, 192, 203],
    plum: [221, 160, 221],
    powderblue: [176, 224, 230],
    purple: [128, 0, 128],
    rebeccapurple: [102, 51, 153],
    red: [255, 0, 0],
    rosybrown: [188, 143, 143],
    royalblue: [65, 105, 225],
    saddlebrown: [139, 69, 19],
    salmon: [250, 128, 114],
    sandybrown: [244, 164, 96],
    seagreen: [46, 139, 87],
    seashell: [255, 245, 238],
    sienna: [160, 82, 45],
    silver: [192, 192, 192],
    skyblue: [135, 206, 235],
    slateblue: [106, 90, 205],
    slategray: [112, 128, 144],
    slategrey: [112, 128, 144],
    snow: [255, 250, 250],
    springgreen: [0, 255, 127],
    steelblue: [70, 130, 180],
    tan: [210, 180, 140],
    teal: [0, 128, 128],
    thistle: [216, 191, 216],
    tomato: [255, 99, 71],
    turquoise: [64, 224, 208],
    violet: [238, 130, 238],
    wheat: [245, 222, 179],
    white: [255, 255, 255],
    whitesmoke: [245, 245, 245],
    yellow: [255, 255, 0],
    yellowgreen: [154, 205, 50]
  }, baseHues = {
    red: 0,
    orange: 60,
    yellow: 120,
    green: 180,
    blue: 240,
    purple: 300
  };
  function parse(cstr) {
    var m2, parts = [], alpha = 1, space2;
    if (typeof cstr == "string")
      if (colorName[cstr])
        parts = colorName[cstr].slice(), space2 = "rgb";
      else if (cstr === "transparent")
        alpha = 0, space2 = "rgb", parts = [0, 0, 0];
      else if (/^#[A-Fa-f0-9]+$/.test(cstr)) {
        var base = cstr.slice(1), size2 = base.length, isShort = size2 <= 4;
        alpha = 1, isShort ? (parts = [
          parseInt(base[0] + base[0], 16),
          parseInt(base[1] + base[1], 16),
          parseInt(base[2] + base[2], 16)
        ], size2 === 4 && (alpha = parseInt(base[3] + base[3], 16) / 255)) : (parts = [
          parseInt(base[0] + base[1], 16),
          parseInt(base[2] + base[3], 16),
          parseInt(base[4] + base[5], 16)
        ], size2 === 8 && (alpha = parseInt(base[6] + base[7], 16) / 255)), parts[0] || (parts[0] = 0), parts[1] || (parts[1] = 0), parts[2] || (parts[2] = 0), space2 = "rgb";
      } else if (m2 = /^((?:rgb|hs[lvb]|hwb|cmyk?|xy[zy]|gray|lab|lchu?v?|[ly]uv|lms)a?)\s*\(([^\)]*)\)/.exec(cstr)) {
        var name = m2[1], isRGB = name === "rgb", base = name.replace(/a$/, "");
        space2 = base;
        var size2 = base === "cmyk" ? 4 : base === "gray" ? 1 : 3;
        parts = m2[2].trim().split(/\s*[,\/]\s*|\s+/).map(function(x2, i2) {
          if (/%$/.test(x2))
            return i2 === size2 ? parseFloat(x2) / 100 : base === "rgb" ? parseFloat(x2) * 255 / 100 : parseFloat(x2);
          if (base[i2] === "h") {
            if (/deg$/.test(x2))
              return parseFloat(x2);
            if (baseHues[x2] !== void 0)
              return baseHues[x2];
          }
          return parseFloat(x2);
        }), name === base && parts.push(1), alpha = isRGB || parts[size2] === void 0 ? 1 : parts[size2], parts = parts.slice(0, size2);
      } else
        cstr.length > 10 && /[0-9](?:\s|\/)/.test(cstr) && (parts = cstr.match(/([0-9]+)/g).map(function(value) {
          return parseFloat(value);
        }), space2 = cstr.match(/([a-z])/ig).join("").toLowerCase());
    else
      isNaN(cstr) ? Array.isArray(cstr) || cstr.length ? (parts = [cstr[0], cstr[1], cstr[2]], space2 = "rgb", alpha = cstr.length === 4 ? cstr[3] : 1) : cstr instanceof Object && (cstr.r != null || cstr.red != null || cstr.R != null ? (space2 = "rgb", parts = [
        cstr.r || cstr.red || cstr.R || 0,
        cstr.g || cstr.green || cstr.G || 0,
        cstr.b || cstr.blue || cstr.B || 0
      ]) : (space2 = "hsl", parts = [
        cstr.h || cstr.hue || cstr.H || 0,
        cstr.s || cstr.saturation || cstr.S || 0,
        cstr.l || cstr.lightness || cstr.L || cstr.b || cstr.brightness
      ]), alpha = cstr.a || cstr.alpha || cstr.opacity || 1, cstr.opacity != null && (alpha /= 100)) : (space2 = "rgb", parts = [cstr >>> 16, (cstr & 65280) >>> 8, cstr & 255]);
    return {
      space: space2,
      values: parts,
      alpha
    };
  }
  const rgb = {
    name: "rgb",
    min: [0, 0, 0],
    max: [255, 255, 255],
    channel: ["red", "green", "blue"],
    alias: ["RGB"]
  }, hsl = {
    name: "hsl",
    min: [0, 0, 0],
    max: [360, 100, 100],
    channel: ["hue", "saturation", "lightness"],
    alias: ["HSL"],
    rgb: function(hsl2) {
      var h2 = hsl2[0] / 360, s2 = hsl2[1] / 100, l2 = hsl2[2] / 100, t1, t2, t3, rgb2, val;
      if (s2 === 0)
        return val = l2 * 255, [val, val, val];
      l2 < 0.5 ? t2 = l2 * (1 + s2) : t2 = l2 + s2 - l2 * s2, t1 = 2 * l2 - t2, rgb2 = [0, 0, 0];
      for (var i2 = 0; i2 < 3; i2++)
        t3 = h2 + 1 / 3 * -(i2 - 1), t3 < 0 ? t3++ : t3 > 1 && t3--, 6 * t3 < 1 ? val = t1 + (t2 - t1) * 6 * t3 : 2 * t3 < 1 ? val = t2 : 3 * t3 < 2 ? val = t1 + (t2 - t1) * (2 / 3 - t3) * 6 : val = t1, rgb2[i2] = val * 255;
      return rgb2;
    }
  };
  rgb.hsl = function(rgb2) {
    var r2 = rgb2[0] / 255, g2 = rgb2[1] / 255, b2 = rgb2[2] / 255, min = Math.min(r2, g2, b2), max = Math.max(r2, g2, b2), delta = max - min, h2, s2, l2;
    return max === min ? h2 = 0 : r2 === max ? h2 = (g2 - b2) / delta : g2 === max ? h2 = 2 + (b2 - r2) / delta : b2 === max && (h2 = 4 + (r2 - g2) / delta), h2 = Math.min(h2 * 60, 360), h2 < 0 && (h2 += 360), l2 = (min + max) / 2, max === min ? s2 = 0 : l2 <= 0.5 ? s2 = delta / (max + min) : s2 = delta / (2 - max - min), [h2, s2 * 100, l2 * 100];
  };
  function rgba$1(color) {
    Array.isArray(color) && color.raw && (color = String.raw(...arguments));
    var values, parsed = parse(color);
    if (!parsed.space)
      return [];
    const min = parsed.space[0] === "h" ? hsl.min : rgb.min, max = parsed.space[0] === "h" ? hsl.max : rgb.max;
    return values = Array(3), values[0] = Math.min(Math.max(parsed.values[0], min[0]), max[0]), values[1] = Math.min(Math.max(parsed.values[1], min[1]), max[1]), values[2] = Math.min(Math.max(parsed.values[2], min[2]), max[2]), parsed.space[0] === "h" && (values = hsl.rgb(values)), values.push(Math.min(Math.max(parsed.alpha, 0), 1)), values;
  }
  function isSameRgbaArr(a2, b2) {
    return a2.every((i2, index) => i2 === b2[index]);
  }
  function replace(content, colors2) {
    const res = content.match(/(rgba?)\(.*?\)|#[a-fA-f\d]{6}|#[a-fA-f\d]{3}/g);
    let modified = !1;
    return res?.forEach((i2) => {
      const foundColor = colors2.find((c2) => isSameRgbaArr(rgba$1(c2.color), rgba$1(i2)));
      foundColor && (modified = !0, content = content.replace(
        new RegExp(`${i2}(?![a-fA-f\\d])`),
        foundColor.new
      ));
    }), {
      content,
      modified
    };
  }
  async function getCSS(css2) {
    const {
      currentConfigData: { options }
    } = get_store_value(appStore), filters = options.filter || [];
    css2 = css2.split(`
`).filter((raw) => !!raw && filters.findIndex((rule2) => new RegExp(rule2).test(raw)) > -1).join(`
`);
    const postcssPlugins = [];
    options.pxToViewport && postcssPlugins.push(dist(options.pxToViewport)), postcssPlugins.push(src({})), css2 = (await postcss_1(postcssPlugins).process(`{${css2}}`)).css.replace(/(^\{)|(\}$)/g, "");
    const { colors: colors2, custom } = options.replace || {};
    colors2 && (css2 = replace(css2, colors2).content), custom && custom.forEach((i2) => {
      const regArr = [];
      Array.isArray(i2.reg) ? i2.reg.forEach((s2) => regArr.push(new RegExp(s2))) : regArr.push(new RegExp(i2.reg)), regArr.every((r2) => r2.test(css2)) && (regArr.forEach((reg) => {
        css2 = css2.replace(reg, "");
      }), css2 = css2 + i2.new);
    }), await navigator.clipboard.writeText(css2.replace(/^\s*\n/gm, "")), toast({
      title: "复制成功"
    });
  }
  function add_css$4(target) {
    append_styles(target, "svelte-16mfo7u", ".fcb-copy-button.svelte-16mfo7u{padding:4px 8px;border-radius:4px;background:#05bea9;outline:none;color:#fff;cursor:pointer;margin-bottom:10px;user-select:none}");
  }
  function create_fragment$m(ctx) {
    let button, mounted, dispose;
    return {
      c() {
        button = element("button"), button.textContent = "🔥 复制样式", attr(button, "id", "fcb-copy-button"), attr(button, "class", "fcb-copy-button svelte-16mfo7u");
      },
      m(target, anchor) {
        insert(target, button, anchor), mounted || (dispose = listen(
          button,
          "click",
          /*copy*/
          ctx[0]
        ), mounted = !0);
      },
      p: noop,
      i: noop,
      o: noop,
      d(detaching) {
        detaching && detach(button), mounted = !1, dispose();
      }
    };
  }
  function instance$l($$self) {
    return [debounce(
      () => {
        const codeText = document.querySelector("[name=propertiesPanelContainer]")?.querySelector("p.hljs-comment")?.parentElement?.innerText;
        if (!codeText) {
          toast("从网页上获取css失败");
          return;
        }
        getCSS(codeText);
      },
      500
    )];
  }
  class CopyButton extends SvelteComponent {
    constructor(options) {
      super(), init(this, options, instance$l, create_fragment$m, safe_not_equal, {}, add_css$4);
    }
  }
  function create_fragment$l(ctx) {
    let button, mounted, dispose;
    return {
      c() {
        button = element("button"), button.textContent = "⚙设置";
      },
      m(target, anchor) {
        insert(target, button, anchor), mounted || (dispose = listen(button, "click", goToSetting), mounted = !0);
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
      super(), init(this, options, null, create_fragment$l, safe_not_equal, {});
    }
  }
  function create_if_block$8(ctx) {
    let html_tag, raw_value = exception(
      /*component*/
      ctx[1],
      /*code*/
      ctx[2]
    ) + "", html_anchor;
    return {
      c() {
        html_tag = new HtmlTag(!1), html_anchor = empty(), html_tag.a = html_anchor;
      },
      m(target, anchor) {
        html_tag.m(raw_value, target, anchor), insert(target, html_anchor, anchor);
      },
      p(ctx2, dirty) {
        dirty & /*component, code*/
        6 && raw_value !== (raw_value = exception(
          /*component*/
          ctx2[1],
          /*code*/
          ctx2[2]
        ) + "") && html_tag.p(raw_value);
      },
      d(detaching) {
        detaching && detach(html_anchor), detaching && html_tag.d();
      }
    };
  }
  function create_fragment$k(ctx) {
    let if_block_anchor, if_block = (
      /*observable*/
      ctx[0] && create_if_block$8(ctx)
    );
    return {
      c() {
        if_block && if_block.c(), if_block_anchor = empty();
      },
      m(target, anchor) {
        if_block && if_block.m(target, anchor), insert(target, if_block_anchor, anchor);
      },
      p(ctx2, [dirty]) {
        /*observable*/
        ctx2[0] ? if_block ? if_block.p(ctx2, dirty) : (if_block = create_if_block$8(ctx2), if_block.c(), if_block.m(if_block_anchor.parentNode, if_block_anchor)) : if_block && (if_block.d(1), if_block = null);
      },
      i: noop,
      o: noop,
      d(detaching) {
        if_block && if_block.d(detaching), detaching && detach(if_block_anchor);
      }
    };
  }
  function instance$k($$self, $$props, $$invalidate) {
    let { observable = !1 } = $$props, { component } = $$props, { code } = $$props;
    return $$self.$$set = ($$props2) => {
      "observable" in $$props2 && $$invalidate(0, observable = $$props2.observable), "component" in $$props2 && $$invalidate(1, component = $$props2.component), "code" in $$props2 && $$invalidate(2, code = $$props2.code);
    }, [observable, component, code];
  }
  const Error$2 = class extends SvelteComponent {
    constructor(options) {
      super(), init(this, options, instance$k, create_fragment$k, safe_not_equal, { observable: 0, component: 1, code: 2 });
    }
  }, browser = (() => typeof window < "u")(), minifiedCss = ".modal-header{padding: 2px 16px;background-color: #339af0;color: white;}.modal-body{padding: 2px 16px;}.modal-footer{padding: 2px 16px;background-color: #339af0;color: white;}.modal-content{position: relative;background-color: #fefefe;margin: auto;padding: 0;border: 1px solid #888;width: 80%;box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);animation-name: animateTop;animation-duration: 0.4s;}@keyframes animateTop {from {top: -300px; opacity: 0}to {top: 0; opacity: 1}}", style = browser ? document.createElement("style") : void 0;
  if (browser) {
    const s2 = style;
    s2.textContent = minifiedCss, s2.id = "svelteui-inject";
  }
  function UserException(component, message, solution) {
    return browser && document.head.appendChild(style), `
    <div class="modal-content">
        <div class="modal-header">
            <h2>[${component} Component Error]:</h2>
            <h3>${message}</h3>
        </div>
        <div class="modal-body">
            <pre>
                ${solution || ""}
            </pre>
        </div>
        <div class="modal-footer">
            <h3>Fix the code to dismiss this error.</h3>
        </div>
    </div>        
    `;
  }
  function exception(component, code) {
    const { message, solution } = code;
    return solution ? UserException(component, message, solution) : UserException(component, message);
  }
  function useActions(node2, actions) {
    const actionReturns = [];
    if (actions)
      for (let i2 = 0; i2 < actions.length; i2++) {
        const actionEntry = actions[i2], action = Array.isArray(actionEntry) ? actionEntry[0] : actionEntry;
        Array.isArray(actionEntry) && actionEntry.length > 1 ? actionReturns.push(action(node2, actionEntry[1])) : actionReturns.push(action(node2));
      }
    return {
      update(actions2) {
        if ((actions2 && actions2.length || 0) != actionReturns.length)
          throw new Error("You must not change the length of an actions array.");
        if (actions2)
          for (let i2 = 0; i2 < actions2.length; i2++) {
            const returnEntry = actionReturns[i2];
            if (returnEntry && returnEntry.update) {
              const actionEntry = actions2[i2];
              Array.isArray(actionEntry) && actionEntry.length > 1 ? returnEntry.update(actionEntry[1]) : returnEntry.update();
            }
          }
      },
      destroy() {
        for (let i2 = 0; i2 < actionReturns.length; i2++) {
          const returnEntry = actionReturns[i2];
          returnEntry && returnEntry.destroy && returnEntry.destroy();
        }
      }
    };
  }
  const MODIFIER_DIVIDER = "!", modifierRegex = new RegExp(`^[^${MODIFIER_DIVIDER}]+(?:${MODIFIER_DIVIDER}(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$`);
  function createEventForwarder(component, except = []) {
    let $on;
    const events = [];
    component.$on = (fullEventType, callback) => {
      const eventType = fullEventType;
      let destructor = () => {
      };
      for (const exception2 of except) {
        if (typeof exception2 == "string" && exception2 === eventType) {
          const callbacks = component.$$.callbacks[eventType] || (component.$$.callbacks[eventType] = []);
          return callbacks.push(callback), () => {
            const index = callbacks.indexOf(callback);
            index !== -1 && callbacks.splice(index, 1);
          };
        }
        if (typeof exception2 == "object" && exception2.name === eventType) {
          const oldCallback = callback;
          callback = (...props) => {
            typeof exception2 == "object" && exception2.shouldExclude() || oldCallback(...props);
          };
        }
      }
      return $on ? destructor = $on(eventType, callback) : events.push([eventType, callback]), () => {
        destructor();
      };
    };
    function forward(e) {
      bubble(component, e);
    }
    return (node2) => {
      const destructors = [], forwardDestructors = {};
      $on = (fullEventType, callback) => {
        let eventType = fullEventType, handler = callback, options = !1;
        if (eventType.match(modifierRegex)) {
          const parts = eventType.split(MODIFIER_DIVIDER);
          eventType = parts[0];
          const eventOptions = Object.fromEntries(parts.slice(1).map((mod) => [mod, !0]));
          eventOptions.passive && (options = options || {}, options.passive = !0), eventOptions.nonpassive && (options = options || {}, options.passive = !1), eventOptions.capture && (options = options || {}, options.capture = !0), eventOptions.once && (options = options || {}, options.once = !0), eventOptions.preventDefault && (handler = prevent_default(handler)), eventOptions.stopPropagation && (handler = stop_propagation(handler));
        }
        const off = listen(node2, eventType, handler, options), destructor = () => {
          off();
          const idx = destructors.indexOf(destructor);
          idx > -1 && destructors.splice(idx, 1);
        };
        return destructors.push(destructor), eventType in forwardDestructors || (forwardDestructors[eventType] = listen(node2, eventType, forward)), destructor;
      };
      for (let i2 = 0; i2 < events.length; i2++)
        $on(events[i2][0], events[i2][1]);
      return {
        destroy: () => {
          for (let i2 = 0; i2 < destructors.length; i2++)
            destructors[i2]();
          for (const entry of Object.entries(forwardDestructors))
            entry[1]();
        }
      };
    };
  }
  const key = {};
  function useSvelteUIThemeContext() {
    return getContext(key);
  }
  const colorScheme = writable("light");
  function useSvelteUITheme() {
    let observer;
    return colorScheme?.subscribe((mode) => {
      observer = mode;
    }), {
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
  }
  function themeColor(color, shade = 0) {
    const theme2 = useSvelteUIThemeContext()?.theme || useSvelteUITheme();
    let _shade = "50";
    return isSvelteUIColor(color) ? (shade !== Number(0) && (_shade = `${shade.toString()}00`), theme2.colors[`${color}${_shade}`]?.value) : color;
  }
  function isSvelteUIColor(color) {
    let valid = !1;
    switch (color) {
      case "dark":
        valid = !0;
        break;
      case "gray":
        valid = !0;
        break;
      case "red":
        valid = !0;
        break;
      case "pink":
        valid = !0;
        break;
      case "grape":
        valid = !0;
        break;
      case "violet":
        valid = !0;
        break;
      case "indigo":
        valid = !0;
        break;
      case "blue":
        valid = !0;
        break;
      case "cyan":
        valid = !0;
        break;
      case "teal":
        valid = !0;
        break;
      case "green":
        valid = !0;
        break;
      case "lime":
        valid = !0;
        break;
      case "yellow":
        valid = !0;
        break;
      case "orange":
        valid = !0;
        break;
      default:
        valid = !1;
        break;
    }
    return valid;
  }
  function size(props) {
    return typeof props.size == "number" ? props.size : typeof props.sizes[props.size] == "number" ? props.sizes[props.size] : +props.sizes[props.size]?.value || +props.sizes.md?.value;
  }
  function radius(radii) {
    const theme2 = useSvelteUIThemeContext()?.theme || useSvelteUITheme();
    return typeof radii == "number" ? radii : theme2.radii[radii].value;
  }
  function isHexColor(hex) {
    const replaced = hex.replace("#", "");
    return typeof replaced == "string" && replaced.length === 6 && !Number.isNaN(Number(`0x${replaced}`));
  }
  function hexToRgba(color) {
    const replaced = color.replace("#", ""), parsed = parseInt(replaced, 16), r2 = parsed >> 16 & 255, g2 = parsed >> 8 & 255, b2 = parsed & 255;
    return {
      r: r2,
      g: g2,
      b: b2,
      a: 1
    };
  }
  function rgbStringToRgba(color) {
    const [r2, g2, b2, a2] = color.replace(/[^0-9,.]/g, "").split(",").map(Number);
    return { r: r2, g: g2, b: b2, a: a2 || 1 };
  }
  function toRgba(color) {
    return isHexColor(color) ? hexToRgba(color) : color.startsWith("rgb") ? rgbStringToRgba(color) : {
      r: 0,
      g: 0,
      b: 0,
      a: 1
    };
  }
  const vFunc = (color, gradient) => {
    const { themeColor: themeColor2, rgba: rgba2 } = fns, variants = {
      /** Filled variant */
      filled: {
        [`${dark.selector} &`]: {
          backgroundColor: themeColor2(color, 8)
        },
        border: "transparent",
        backgroundColor: themeColor2(color, 6),
        color: "White",
        "&:hover": { backgroundColor: themeColor2(color, 7) }
      },
      /** Light variant */
      light: {
        [`${dark.selector} &`]: {
          backgroundColor: rgba2(themeColor2(color, 8), 0.35),
          color: color === "dark" ? themeColor2("dark", 0) : themeColor2(color, 2),
          "&:hover": { backgroundColor: rgba2(themeColor2(color, 7), 0.45) }
        },
        border: "transparent",
        backgroundColor: themeColor2(color, 0),
        color: color === "dark" ? themeColor2("dark", 9) : themeColor2(color, 6),
        "&:hover": { backgroundColor: themeColor2(color, 1) }
      },
      /** Outline variant */
      outline: {
        [`${dark.selector} &`]: {
          border: `1px solid ${themeColor2(color, 4)}`,
          color: `${themeColor2(color, 4)}`,
          "&:hover": { backgroundColor: rgba2(themeColor2(color, 4), 0.05) }
        },
        border: `1px solid ${themeColor2(color, 7)}`,
        backgroundColor: "transparent",
        color: themeColor2(color, 7),
        "&:hover": {
          backgroundColor: rgba2(themeColor2(color, 0), 0.35)
        }
      },
      /** Subtle variant */
      subtle: {
        [`${dark.selector} &`]: {
          color: color === "dark" ? themeColor2("dark", 0) : themeColor2(color, 2),
          "&:hover": { backgroundColor: rgba2(themeColor2(color, 8), 0.35) }
        },
        border: "transparent",
        backgroundColor: "transparent",
        color: color === "dark" ? themeColor2("dark", 9) : themeColor2(color, 6),
        "&:hover": {
          backgroundColor: themeColor2(color, 0)
        }
      },
      /** Default variant */
      default: {
        [`${dark.selector} &`]: {
          border: `1px solid ${themeColor2("dark", 5)}`,
          backgroundColor: themeColor2("dark", 5),
          color: "White",
          "&:hover": { backgroundColor: themeColor2("dark", 4) }
        },
        border: `1px solid ${themeColor2("gray", 4)}`,
        backgroundColor: "White",
        color: "Black",
        "&:hover": { backgroundColor: themeColor2("gray", 0) }
      },
      /** White variant */
      white: {
        border: "transparent",
        backgroundColor: "White",
        color: themeColor2(color, 7),
        "&:hover": { backgroundColor: "White" }
      },
      gradient: {}
    };
    return gradient && (variants.gradient = {
      border: "transparent",
      background: `linear-gradient(${gradient.deg}deg, $${gradient.from}600 0%, $${gradient.to}600 100%)`,
      color: "White"
    }), variants;
  };
  function randomID(prefix = "svelteui") {
    return `${prefix}-${Math.random().toString(36).substring(2, 10)}`;
  }
  function rgba(color, alpha = 1) {
    if (typeof color != "string" || alpha > 1 || alpha < 0)
      return "rgba(0, 0, 0, 1)";
    const { r: r2, g: g2, b: b2 } = toRgba(color);
    return `rgba(${r2}, ${g2}, ${b2}, ${alpha})`;
  }
  const DEFAULT_GRADIENT = {
    from: "indigo",
    to: "cyan",
    deg: 45
  };
  function variant({ variant: variant2, color, gradient }) {
    const theme2 = useSvelteUIThemeContext()?.theme || useSvelteUITheme(), primaryShade = 6;
    if (variant2 === "light")
      return {
        border: "transparent",
        background: [rgba(themeColor(color, 8), 0.35), rgba(themeColor(color, 0), 1)],
        color: [
          color === "dark" ? themeColor("dark", 0) : themeColor(color, 2),
          color === "dark" ? themeColor("dark", 9) : themeColor(color, primaryShade)
        ],
        // themeColor(color, theme.colorScheme === 'dark' ? 2 : getPrimaryShade('light')),
        hover: [rgba(themeColor(color, 7), 0.45), rgba(themeColor(color, 1), 0.65)]
      };
    if (variant2 === "default")
      return {
        border: [themeColor("dark", 5), themeColor("gray", 4)],
        background: [themeColor("dark", 5), theme2.colors.white.value],
        color: [theme2.colors.white.value, theme2.colors.black.value],
        hover: [themeColor("dark", 4), themeColor("gray", 0)]
      };
    if (variant2 === "white")
      return {
        border: "transparent",
        background: theme2.colors.white.value,
        color: themeColor(color, primaryShade),
        hover: null
      };
    if (variant2 === "outline")
      return {
        border: [themeColor(color, 4), themeColor(color, primaryShade)],
        background: "transparent",
        color: [themeColor(color, 4), themeColor(color, primaryShade)],
        hover: [rgba(themeColor(color, 4), 0.05), rgba(themeColor(color, 0), 0.35)]
      };
    if (variant2 === "gradient") {
      const merged = {
        from: gradient?.from || DEFAULT_GRADIENT.from,
        to: gradient?.to || DEFAULT_GRADIENT.to,
        deg: gradient?.deg || DEFAULT_GRADIENT.deg
      };
      return {
        background: `linear-gradient(${merged.deg}deg, ${themeColor(merged.from, primaryShade)} 0%, ${themeColor(merged.to, primaryShade)} 100%)`,
        color: theme2.colors.white.value,
        border: "transparent",
        hover: null
      };
    }
    return variant2 === "subtle" ? {
      border: "transparent",
      background: "transparent",
      color: [
        color === "dark" ? themeColor("dark", 0) : themeColor(color, 2),
        color === "dark" ? themeColor("dark", 9) : themeColor(color, primaryShade)
      ],
      hover: [rgba(themeColor(color, 8), 0.35), rgba(themeColor(color, 0), 1)]
    } : {
      border: "transparent",
      background: [themeColor(color, 8), themeColor(color, primaryShade)],
      color: theme2.colors.white.value,
      hover: themeColor(color, 7)
    };
  }
  const fns = {
    size,
    radius,
    themeColor,
    variant,
    rgba
  }, colors = {
    primary: "#228be6",
    white: "#ffffff",
    black: "#000000",
    dark50: "#C1C2C5",
    dark100: "#A6A7AB",
    dark200: "#909296",
    dark300: "#5c5f66",
    dark400: "#373A40",
    dark500: "#2C2E33",
    dark600: "#25262b",
    dark700: "#1A1B1E",
    dark800: "#141517",
    dark900: "#101113",
    gray50: "#f8f9fa",
    gray100: "#f1f3f5",
    gray200: "#e9ecef",
    gray300: "#dee2e6",
    gray400: "#ced4da",
    gray500: "#adb5bd",
    gray600: "#868e96",
    gray700: "#495057",
    gray800: "#343a40",
    gray900: "#212529",
    red50: "#fff5f5",
    red100: "#ffe3e3",
    red200: "#ffc9c9",
    red300: "#ffa8a8",
    red400: "#ff8787",
    red500: "#ff6b6b",
    red600: "#fa5252",
    red700: "#f03e3e",
    red800: "#e03131",
    red900: "#c92a2a",
    pink50: "#fff0f6",
    pink100: "#ffdeeb",
    pink200: "#fcc2d7",
    pink300: "#faa2c1",
    pink400: "#f783ac",
    pink500: "#f06595",
    pink600: "#e64980",
    pink700: "#d6336c",
    pink800: "#c2255c",
    pink900: "#a61e4d",
    grape50: "#f8f0fc",
    grape100: "#f3d9fa",
    grape200: "#eebefa",
    grape300: "#e599f7",
    grape400: "#da77f2",
    grape500: "#cc5de8",
    grape600: "#be4bdb",
    grape700: "#ae3ec9",
    grape800: "#9c36b5",
    grape900: "#862e9c",
    violet50: "#f3f0ff",
    violet100: "#e5dbff",
    violet200: "#d0bfff",
    violet300: "#b197fc",
    violet400: "#9775fa",
    violet500: "#845ef7",
    violet600: "#7950f2",
    violet700: "#7048e8",
    violet800: "#6741d9",
    violet900: "#5f3dc4",
    indigo50: "#edf2ff",
    indigo100: "#dbe4ff",
    indigo200: "#bac8ff",
    indigo300: "#91a7ff",
    indigo400: "#748ffc",
    indigo500: "#5c7cfa",
    indigo600: "#4c6ef5",
    indigo700: "#4263eb",
    indigo800: "#3b5bdb",
    indigo900: "#364fc7",
    blue50: "#e7f5ff",
    blue100: "#d0ebff",
    blue200: "#a5d8ff",
    blue300: "#74c0fc",
    blue400: "#4dabf7",
    blue500: "#339af0",
    blue600: "#228be6",
    blue700: "#1c7ed6",
    blue800: "#1971c2",
    blue900: "#1864ab",
    cyan50: "#e3fafc",
    cyan100: "#c5f6fa",
    cyan200: "#99e9f2",
    cyan300: "#66d9e8",
    cyan400: "#3bc9db",
    cyan500: "#22b8cf",
    cyan600: "#15aabf",
    cyan700: "#1098ad",
    cyan800: "#0c8599",
    cyan900: "#0b7285",
    teal50: "#e6fcf5",
    teal100: "#c3fae8",
    teal200: "#96f2d7",
    teal300: "#63e6be",
    teal400: "#38d9a9",
    teal500: "#20c997",
    teal600: "#12b886",
    teal700: "#0ca678",
    teal800: "#099268",
    teal900: "#087f5b",
    green50: "#ebfbee",
    green100: "#d3f9d8",
    green200: "#b2f2bb",
    green300: "#8ce99a",
    green400: "#69db7c",
    green500: "#51cf66",
    green600: "#40c057",
    green700: "#37b24d",
    green800: "#2f9e44",
    green900: "#2b8a3e",
    lime50: "#f4fce3",
    lime100: "#e9fac8",
    lime200: "#d8f5a2",
    lime300: "#c0eb75",
    lime400: "#a9e34b",
    lime500: "#94d82d",
    lime600: "#82c91e",
    lime700: "#74b816",
    lime800: "#66a80f",
    lime900: "#5c940d",
    yellow50: "#fff9db",
    yellow100: "#fff3bf",
    yellow200: "#ffec99",
    yellow300: "#ffe066",
    yellow400: "#ffd43b",
    yellow500: "#fcc419",
    yellow600: "#fab005",
    yellow700: "#f59f00",
    yellow800: "#f08c00",
    yellow900: "#e67700",
    orange50: "#fff4e6",
    orange100: "#ffe8cc",
    orange200: "#ffd8a8",
    orange300: "#ffc078",
    orange400: "#ffa94d",
    orange500: "#ff922b",
    orange600: "#fd7e14",
    orange700: "#f76707",
    orange800: "#e8590c",
    orange900: "#d9480f"
  }, colorNameMap = {
    blue: "blue",
    cyan: "cyan",
    dark: "dark",
    grape: "grape",
    gray: "gray",
    green: "green",
    indigo: "indigo",
    lime: "lime",
    orange: "orange",
    pink: "pink",
    red: "red",
    teal: "teal",
    violet: "violet",
    yellow: "yellow"
  }, hasOwn = {}.hasOwnProperty;
  function cx(...args) {
    const classes = [];
    for (let i2 = 0; i2 < args.length; i2++) {
      const arg = args[i2];
      if (!arg)
        continue;
      const argType = typeof arg;
      if (argType === "string" || argType === "number")
        classes.push(arg);
      else if (Array.isArray(arg)) {
        if (arg.length) {
          const inner = { ...arg };
          inner && classes.push(inner);
        }
      } else if (argType === "object")
        if (arg.toString === Object.prototype.toString)
          for (const key2 in arg)
            hasOwn.call(arg, key2) && arg[key2] && classes.push(key2);
        else
          classes.push(arg.toString());
    }
    return classes.join(" ");
  }
  function cssFactory() {
    return { cx };
  }
  function fromEntries(entries) {
    const o2 = {};
    return Object.keys(entries).forEach((key2) => {
      const [k2, v2] = entries[key2];
      o2[k2] = v2;
    }), o2;
  }
  const CLASS_KEY = "svelteui";
  function createRef(refName) {
    return `__svelteui-ref-${refName || ""}`;
  }
  function sanitizeCss(object, theme2) {
    const refs = [], classMap = {}, _sanitize = (obj) => {
      Object.keys(obj).map((value) => {
        if (value !== "variants" && (value === "ref" && refs.push(obj.ref), value === "darkMode" && (obj[`${theme2.dark} &`] = obj.darkMode), !(obj[value] === null || typeof obj[value] != "object"))) {
          if (_sanitize(obj[value]), value === "darkMode")
            delete obj[value];
          else if (!value.startsWith("@media")) {
            if (!value.startsWith("&") && !value.startsWith(theme2.dark)) {
              const getStyles = css(obj[value]);
              classMap[value] = getStyles().toString(), obj[`& .${getStyles().toString()}`] = obj[value], delete obj[value];
            }
          }
        }
      });
    };
    return _sanitize(object), delete object["& .root"], { classMap, refs: Array.from(new Set(refs)) };
  }
  function createStyles(input2) {
    const getCssObject = typeof input2 == "function" ? input2 : () => input2;
    function useStyles2(params = {}, options) {
      const theme2 = useSvelteUIThemeContext()?.theme || useSvelteUITheme(), { cx: cx2 } = cssFactory(), { override, name } = options || {}, dirtyCssObject = getCssObject(theme2, params, createRef), sanitizedCss = Object.assign({}, dirtyCssObject), { classMap, refs } = sanitizeCss(sanitizedCss, theme2), root2 = dirtyCssObject.root ?? void 0, cssObjectClean = root2 !== void 0 ? { ...root2, ...sanitizedCss } : dirtyCssObject, getStyles = css(cssObjectClean), classes = fromEntries(Object.keys(dirtyCssObject).map((keys) => {
        const ref = refs.find((r2) => r2.includes(keys)) ?? "", getRefName = ref?.split("-") ?? [], keyIsRef = ref?.split("-")[getRefName?.length - 1] === keys, value = keys.toString();
        let transformedClasses = classMap[value] ?? value;
        ref && keyIsRef && (transformedClasses = `${transformedClasses} ${ref}`), keys === "root" && (transformedClasses = getStyles({ css: override }).toString());
        let libClass = `${CLASS_KEY}-${keys.toString()}`;
        return name && (libClass = `${CLASS_KEY}-${name}-${keys.toString()}`, transformedClasses = `${transformedClasses} ${libClass}`), [keys, transformedClasses];
      }));
      return {
        cx: cx2,
        theme: theme2,
        classes,
        getStyles: css(cssObjectClean)
      };
    }
    return useStyles2;
  }
  var t = "colors", n = "sizes", r = "space", i = { gap: r, gridGap: r, columnGap: r, gridColumnGap: r, rowGap: r, gridRowGap: r, inset: r, insetBlock: r, insetBlockEnd: r, insetBlockStart: r, insetInline: r, insetInlineEnd: r, insetInlineStart: r, margin: r, marginTop: r, marginRight: r, marginBottom: r, marginLeft: r, marginBlock: r, marginBlockEnd: r, marginBlockStart: r, marginInline: r, marginInlineEnd: r, marginInlineStart: r, padding: r, paddingTop: r, paddingRight: r, paddingBottom: r, paddingLeft: r, paddingBlock: r, paddingBlockEnd: r, paddingBlockStart: r, paddingInline: r, paddingInlineEnd: r, paddingInlineStart: r, top: r, right: r, bottom: r, left: r, scrollMargin: r, scrollMarginTop: r, scrollMarginRight: r, scrollMarginBottom: r, scrollMarginLeft: r, scrollMarginX: r, scrollMarginY: r, scrollMarginBlock: r, scrollMarginBlockEnd: r, scrollMarginBlockStart: r, scrollMarginInline: r, scrollMarginInlineEnd: r, scrollMarginInlineStart: r, scrollPadding: r, scrollPaddingTop: r, scrollPaddingRight: r, scrollPaddingBottom: r, scrollPaddingLeft: r, scrollPaddingX: r, scrollPaddingY: r, scrollPaddingBlock: r, scrollPaddingBlockEnd: r, scrollPaddingBlockStart: r, scrollPaddingInline: r, scrollPaddingInlineEnd: r, scrollPaddingInlineStart: r, fontSize: "fontSizes", background: t, backgroundColor: t, backgroundImage: t, borderImage: t, border: t, borderBlock: t, borderBlockEnd: t, borderBlockStart: t, borderBottom: t, borderBottomColor: t, borderColor: t, borderInline: t, borderInlineEnd: t, borderInlineStart: t, borderLeft: t, borderLeftColor: t, borderRight: t, borderRightColor: t, borderTop: t, borderTopColor: t, caretColor: t, color: t, columnRuleColor: t, fill: t, outline: t, outlineColor: t, stroke: t, textDecorationColor: t, fontFamily: "fonts", fontWeight: "fontWeights", lineHeight: "lineHeights", letterSpacing: "letterSpacings", blockSize: n, minBlockSize: n, maxBlockSize: n, inlineSize: n, minInlineSize: n, maxInlineSize: n, width: n, minWidth: n, maxWidth: n, height: n, minHeight: n, maxHeight: n, flexBasis: n, gridTemplateColumns: n, gridTemplateRows: n, borderWidth: "borderWidths", borderTopWidth: "borderWidths", borderRightWidth: "borderWidths", borderBottomWidth: "borderWidths", borderLeftWidth: "borderWidths", borderStyle: "borderStyles", borderTopStyle: "borderStyles", borderRightStyle: "borderStyles", borderBottomStyle: "borderStyles", borderLeftStyle: "borderStyles", borderRadius: "radii", borderTopLeftRadius: "radii", borderTopRightRadius: "radii", borderBottomRightRadius: "radii", borderBottomLeftRadius: "radii", boxShadow: "shadows", textShadow: "shadows", transition: "transitions", zIndex: "zIndices" }, o = (e, t2) => typeof t2 == "function" ? { "()": Function.prototype.toString.call(t2) } : t2, l = () => {
    const e = /* @__PURE__ */ Object.create(null);
    return (t2, n2, ...r2) => {
      const i2 = ((e2) => JSON.stringify(e2, o))(t2);
      return i2 in e ? e[i2] : e[i2] = n2(t2, ...r2);
    };
  }, s = Symbol.for("sxs.internal"), a = (e, t2) => Object.defineProperties(e, Object.getOwnPropertyDescriptors(t2)), c = (e) => {
    for (const t2 in e)
      return !0;
    return !1;
  }, { hasOwnProperty: d } = Object.prototype, g = (e) => e.includes("-") ? e : e.replace(/[A-Z]/g, (e2) => "-" + e2.toLowerCase()), p = /\s+(?![^()]*\))/, u = (e) => (t2) => e(...typeof t2 == "string" ? String(t2).split(p) : [t2]), h = { appearance: (e) => ({ WebkitAppearance: e, appearance: e }), backfaceVisibility: (e) => ({ WebkitBackfaceVisibility: e, backfaceVisibility: e }), backdropFilter: (e) => ({ WebkitBackdropFilter: e, backdropFilter: e }), backgroundClip: (e) => ({ WebkitBackgroundClip: e, backgroundClip: e }), boxDecorationBreak: (e) => ({ WebkitBoxDecorationBreak: e, boxDecorationBreak: e }), clipPath: (e) => ({ WebkitClipPath: e, clipPath: e }), content: (e) => ({ content: e.includes('"') || e.includes("'") || /^([A-Za-z]+\([^]*|[^]*-quote|inherit|initial|none|normal|revert|unset)$/.test(e) ? e : `"${e}"` }), hyphens: (e) => ({ WebkitHyphens: e, hyphens: e }), maskImage: (e) => ({ WebkitMaskImage: e, maskImage: e }), maskSize: (e) => ({ WebkitMaskSize: e, maskSize: e }), tabSize: (e) => ({ MozTabSize: e, tabSize: e }), textSizeAdjust: (e) => ({ WebkitTextSizeAdjust: e, textSizeAdjust: e }), userSelect: (e) => ({ WebkitUserSelect: e, userSelect: e }), marginBlock: u((e, t2) => ({ marginBlockStart: e, marginBlockEnd: t2 || e })), marginInline: u((e, t2) => ({ marginInlineStart: e, marginInlineEnd: t2 || e })), maxSize: u((e, t2) => ({ maxBlockSize: e, maxInlineSize: t2 || e })), minSize: u((e, t2) => ({ minBlockSize: e, minInlineSize: t2 || e })), paddingBlock: u((e, t2) => ({ paddingBlockStart: e, paddingBlockEnd: t2 || e })), paddingInline: u((e, t2) => ({ paddingInlineStart: e, paddingInlineEnd: t2 || e })) }, f = /([\d.]+)([^]*)/, m = (e, t2) => e.length ? e.reduce((e2, n2) => (e2.push(...t2.map((e3) => e3.includes("&") ? e3.replace(/&/g, /[ +>|~]/.test(n2) && /&.*&/.test(e3) ? `:is(${n2})` : n2) : n2 + " " + e3)), e2), []) : t2, b = (e, t2) => e in S && typeof t2 == "string" ? t2.replace(/^((?:[^]*[^\w-])?)(fit-content|stretch)((?:[^\w-][^]*)?)$/, (t3, n2, r2, i2) => n2 + (r2 === "stretch" ? `-moz-available${i2};${g(e)}:${n2}-webkit-fill-available` : `-moz-fit-content${i2};${g(e)}:${n2}fit-content`) + i2) : String(t2), S = { blockSize: 1, height: 1, inlineSize: 1, maxBlockSize: 1, maxHeight: 1, maxInlineSize: 1, maxWidth: 1, minBlockSize: 1, minHeight: 1, minInlineSize: 1, minWidth: 1, width: 1 }, k = (e) => e ? e + "-" : "", y = (e, t2, n2) => e.replace(/([+-])?((?:\d+(?:\.\d*)?|\.\d+)(?:[Ee][+-]?\d+)?)?(\$|--)([$\w-]+)/g, (e2, r2, i2, o2, l2) => o2 == "$" == !!i2 ? e2 : (r2 || o2 == "--" ? "calc(" : "") + "var(--" + (o2 === "$" ? k(t2) + (l2.includes("$") ? "" : k(n2)) + l2.replace(/\$/g, "-") : l2) + ")" + (r2 || o2 == "--" ? "*" + (r2 || "") + (i2 || "1") + ")" : "")), B = /\s*,\s*(?![^()]*\))/, $ = Object.prototype.toString, x = (e, t2, n2, r2, i2) => {
    let o2, l2, s2;
    const a2 = (e2, t3, n3) => {
      let c2, d2;
      const p2 = (e3) => {
        for (c2 in e3) {
          const x2 = c2.charCodeAt(0) === 64, z2 = x2 && Array.isArray(e3[c2]) ? e3[c2] : [e3[c2]];
          for (d2 of z2) {
            const e4 = /[A-Z]/.test(S2 = c2) ? S2 : S2.replace(/-[^]/g, (e5) => e5[1].toUpperCase()), z3 = typeof d2 == "object" && d2 && d2.toString === $ && (!r2.utils[e4] || !t3.length);
            if (e4 in r2.utils && !z3) {
              const t4 = r2.utils[e4];
              if (t4 !== l2) {
                l2 = t4, p2(t4(d2)), l2 = null;
                continue;
              }
            } else if (e4 in h) {
              const t4 = h[e4];
              if (t4 !== s2) {
                s2 = t4, p2(t4(d2)), s2 = null;
                continue;
              }
            }
            if (x2 && (u2 = c2.slice(1) in r2.media ? "@media " + r2.media[c2.slice(1)] : c2, c2 = u2.replace(/\(\s*([\w-]+)\s*(=|<|<=|>|>=)\s*([\w-]+)\s*(?:(<|<=|>|>=)\s*([\w-]+)\s*)?\)/g, (e5, t4, n4, r3, i3, o3) => {
              const l3 = f.test(t4), s3 = 0.0625 * (l3 ? -1 : 1), [a3, c3] = l3 ? [r3, t4] : [t4, r3];
              return "(" + (n4[0] === "=" ? "" : n4[0] === ">" === l3 ? "max-" : "min-") + a3 + ":" + (n4[0] !== "=" && n4.length === 1 ? c3.replace(f, (e6, t5, r4) => Number(t5) + s3 * (n4 === ">" ? 1 : -1) + r4) : c3) + (i3 ? ") and (" + (i3[0] === ">" ? "min-" : "max-") + a3 + ":" + (i3.length === 1 ? o3.replace(f, (e6, t5, n5) => Number(t5) + s3 * (i3 === ">" ? -1 : 1) + n5) : o3) : "") + ")";
            })), z3) {
              const e5 = x2 ? n3.concat(c2) : [...n3], r3 = x2 ? [...t3] : m(t3, c2.split(B));
              o2 !== void 0 && i2(I(...o2)), o2 = void 0, a2(d2, r3, e5);
            } else
              o2 === void 0 && (o2 = [[], t3, n3]), c2 = x2 || c2.charCodeAt(0) !== 36 ? c2 : `--${k(r2.prefix)}${c2.slice(1).replace(/\$/g, "-")}`, d2 = z3 ? d2 : typeof d2 == "number" ? d2 && e4 in R ? String(d2) + "px" : String(d2) : y(b(e4, d2 ?? ""), r2.prefix, r2.themeMap[e4]), o2[0].push(`${x2 ? `${c2} ` : `${g(c2)}:`}${d2}`);
          }
        }
        var u2, S2;
      };
      p2(e2), o2 !== void 0 && i2(I(...o2)), o2 = void 0;
    };
    a2(e, t2, n2);
  }, I = (e, t2, n2) => `${n2.map((e2) => `${e2}{`).join("")}${t2.length ? `${t2.join(",")}{` : ""}${e.join(";")}${t2.length ? "}" : ""}${Array(n2.length ? n2.length + 1 : 0).join("}")}`, R = { animationDelay: 1, animationDuration: 1, backgroundSize: 1, blockSize: 1, border: 1, borderBlock: 1, borderBlockEnd: 1, borderBlockEndWidth: 1, borderBlockStart: 1, borderBlockStartWidth: 1, borderBlockWidth: 1, borderBottom: 1, borderBottomLeftRadius: 1, borderBottomRightRadius: 1, borderBottomWidth: 1, borderEndEndRadius: 1, borderEndStartRadius: 1, borderInlineEnd: 1, borderInlineEndWidth: 1, borderInlineStart: 1, borderInlineStartWidth: 1, borderInlineWidth: 1, borderLeft: 1, borderLeftWidth: 1, borderRadius: 1, borderRight: 1, borderRightWidth: 1, borderSpacing: 1, borderStartEndRadius: 1, borderStartStartRadius: 1, borderTop: 1, borderTopLeftRadius: 1, borderTopRightRadius: 1, borderTopWidth: 1, borderWidth: 1, bottom: 1, columnGap: 1, columnRule: 1, columnRuleWidth: 1, columnWidth: 1, containIntrinsicSize: 1, flexBasis: 1, fontSize: 1, gap: 1, gridAutoColumns: 1, gridAutoRows: 1, gridTemplateColumns: 1, gridTemplateRows: 1, height: 1, inlineSize: 1, inset: 1, insetBlock: 1, insetBlockEnd: 1, insetBlockStart: 1, insetInline: 1, insetInlineEnd: 1, insetInlineStart: 1, left: 1, letterSpacing: 1, margin: 1, marginBlock: 1, marginBlockEnd: 1, marginBlockStart: 1, marginBottom: 1, marginInline: 1, marginInlineEnd: 1, marginInlineStart: 1, marginLeft: 1, marginRight: 1, marginTop: 1, maxBlockSize: 1, maxHeight: 1, maxInlineSize: 1, maxWidth: 1, minBlockSize: 1, minHeight: 1, minInlineSize: 1, minWidth: 1, offsetDistance: 1, offsetRotate: 1, outline: 1, outlineOffset: 1, outlineWidth: 1, overflowClipMargin: 1, padding: 1, paddingBlock: 1, paddingBlockEnd: 1, paddingBlockStart: 1, paddingBottom: 1, paddingInline: 1, paddingInlineEnd: 1, paddingInlineStart: 1, paddingLeft: 1, paddingRight: 1, paddingTop: 1, perspective: 1, right: 1, rowGap: 1, scrollMargin: 1, scrollMarginBlock: 1, scrollMarginBlockEnd: 1, scrollMarginBlockStart: 1, scrollMarginBottom: 1, scrollMarginInline: 1, scrollMarginInlineEnd: 1, scrollMarginInlineStart: 1, scrollMarginLeft: 1, scrollMarginRight: 1, scrollMarginTop: 1, scrollPadding: 1, scrollPaddingBlock: 1, scrollPaddingBlockEnd: 1, scrollPaddingBlockStart: 1, scrollPaddingBottom: 1, scrollPaddingInline: 1, scrollPaddingInlineEnd: 1, scrollPaddingInlineStart: 1, scrollPaddingLeft: 1, scrollPaddingRight: 1, scrollPaddingTop: 1, shapeMargin: 1, textDecoration: 1, textDecorationThickness: 1, textIndent: 1, textUnderlineOffset: 1, top: 1, transitionDelay: 1, transitionDuration: 1, verticalAlign: 1, width: 1, wordSpacing: 1 }, z = (e) => String.fromCharCode(e + (e > 25 ? 39 : 97)), W = (e) => ((e2) => {
    let t2, n2 = "";
    for (t2 = Math.abs(e2); t2 > 52; t2 = t2 / 52 | 0)
      n2 = z(t2 % 52) + n2;
    return z(t2 % 52) + n2;
  })(((e2, t2) => {
    let n2 = t2.length;
    for (; n2; )
      e2 = 33 * e2 ^ t2.charCodeAt(--n2);
    return e2;
  })(5381, JSON.stringify(e)) >>> 0), j = ["themed", "global", "styled", "onevar", "resonevar", "allvar", "inline"], E = (e) => {
    if (e.href && !e.href.startsWith(location.origin))
      return !1;
    try {
      return !!e.cssRules;
    } catch {
      return !1;
    }
  }, T = (e) => {
    let t2;
    const n2 = () => {
      const { cssRules: e2 } = t2.sheet;
      return [].map.call(e2, (n3, r3) => {
        const { cssText: i2 } = n3;
        let o2 = "";
        if (i2.startsWith("--sxs"))
          return "";
        if (e2[r3 - 1] && (o2 = e2[r3 - 1].cssText).startsWith("--sxs")) {
          if (!n3.cssRules.length)
            return "";
          for (const e3 in t2.rules)
            if (t2.rules[e3].group === n3)
              return `--sxs{--sxs:${[...t2.rules[e3].cache].join(" ")}}${i2}`;
          return n3.cssRules.length ? `${o2}${i2}` : "";
        }
        return i2;
      }).join("");
    }, r2 = () => {
      if (t2) {
        const { rules: e2, sheet: n3 } = t2;
        if (!n3.deleteRule) {
          for (; Object(Object(n3.cssRules)[0]).type === 3; )
            n3.cssRules.splice(0, 1);
          n3.cssRules = [];
        }
        for (const t3 in e2)
          delete e2[t3];
      }
      const i2 = Object(e).styleSheets || [];
      for (const e2 of i2)
        if (E(e2)) {
          for (let i3 = 0, o3 = e2.cssRules; o3[i3]; ++i3) {
            const l3 = Object(o3[i3]);
            if (l3.type !== 1)
              continue;
            const s2 = Object(o3[i3 + 1]);
            if (s2.type !== 4)
              continue;
            ++i3;
            const { cssText: a2 } = l3;
            if (!a2.startsWith("--sxs"))
              continue;
            const c2 = a2.slice(14, -3).trim().split(/\s+/), d2 = j[c2[0]];
            d2 && (t2 || (t2 = { sheet: e2, reset: r2, rules: {}, toString: n2 }), t2.rules[d2] = { group: s2, index: i3, cache: new Set(c2) });
          }
          if (t2)
            break;
        }
      if (!t2) {
        const i3 = (e2, t3) => ({ type: t3, cssRules: [], insertRule(e3, t4) {
          this.cssRules.splice(t4, 0, i3(e3, { import: 3, undefined: 1 }[(e3.toLowerCase().match(/^@([a-z]+)/) || [])[1]] || 4));
        }, get cssText() {
          return e2 === "@media{}" ? `@media{${[].map.call(this.cssRules, (e3) => e3.cssText).join("")}}` : e2;
        } });
        t2 = { sheet: e ? (e.head || e).appendChild(document.createElement("style")).sheet : i3("", "text/css"), rules: {}, reset: r2, toString: n2 };
      }
      const { sheet: o2, rules: l2 } = t2;
      for (let e2 = j.length - 1; e2 >= 0; --e2) {
        const t3 = j[e2];
        if (!l2[t3]) {
          const n3 = j[e2 + 1], r3 = l2[n3] ? l2[n3].index : o2.cssRules.length;
          o2.insertRule("@media{}", r3), o2.insertRule(`--sxs{--sxs:${e2}}`, r3), l2[t3] = { group: o2.cssRules[r3 + 1], index: r3, cache: /* @__PURE__ */ new Set([e2]) };
        }
        v(l2[t3]);
      }
    };
    return r2(), t2;
  }, v = (e) => {
    const t2 = e.group;
    let n2 = t2.cssRules.length;
    e.apply = (e2) => {
      try {
        t2.insertRule(e2, n2), ++n2;
      } catch {
      }
    };
  }, M = Symbol(), w = l(), C = (e, t2) => w(e, () => (...n2) => {
    let r2 = { type: null, composers: /* @__PURE__ */ new Set() };
    for (const t3 of n2)
      if (t3 != null)
        if (t3[s]) {
          r2.type == null && (r2.type = t3[s].type);
          for (const e2 of t3[s].composers)
            r2.composers.add(e2);
        } else
          t3.constructor !== Object || t3.$$typeof ? r2.type == null && (r2.type = t3) : r2.composers.add(P(t3, e));
    return r2.type == null && (r2.type = "span"), r2.composers.size || r2.composers.add(["PJLV", {}, [], [], {}, []]), L(e, r2, t2);
  }), P = ({ variants: e, compoundVariants: t2, defaultVariants: n2, ...r2 }, i2) => {
    const o2 = `${k(i2.prefix)}c-${W(r2)}`, l2 = [], s2 = [], a2 = /* @__PURE__ */ Object.create(null), g2 = [];
    for (const e2 in n2)
      a2[e2] = String(n2[e2]);
    if (typeof e == "object" && e)
      for (const t3 in e) {
        p2 = a2, u2 = t3, d.call(p2, u2) || (a2[t3] = "undefined");
        const n3 = e[t3];
        for (const e2 in n3) {
          const r3 = { [t3]: String(e2) };
          String(e2) === "undefined" && g2.push(t3);
          const i3 = n3[e2], o3 = [r3, i3, !c(i3)];
          l2.push(o3);
        }
      }
    var p2, u2;
    if (typeof t2 == "object" && t2)
      for (const e2 of t2) {
        let { css: t3, ...n3 } = e2;
        t3 = typeof t3 == "object" && t3 || {};
        for (const e3 in n3)
          n3[e3] = String(n3[e3]);
        const r3 = [n3, t3, !c(t3)];
        s2.push(r3);
      }
    return [o2, r2, l2, s2, a2, g2];
  }, L = (e, t2, n2) => {
    const [r2, i2, o2, l2] = O(t2.composers), c2 = typeof t2.type == "function" || t2.type.$$typeof ? ((e2) => {
      function t3() {
        for (let n3 = 0; n3 < t3[M].length; n3++) {
          const [r3, i3] = t3[M][n3];
          e2.rules[r3].apply(i3);
        }
        return t3[M] = [], null;
      }
      return t3[M] = [], t3.rules = {}, j.forEach((e3) => t3.rules[e3] = { apply: (n3) => t3[M].push([e3, n3]) }), t3;
    })(n2) : null, d2 = (c2 || n2).rules, g2 = `.${r2}${i2.length > 1 ? `:where(.${i2.slice(1).join(".")})` : ""}`, p2 = (s2) => {
      s2 = typeof s2 == "object" && s2 || D;
      const { css: a2, ...p3 } = s2, u2 = {};
      for (const e2 in o2)
        if (delete p3[e2], e2 in s2) {
          let t3 = s2[e2];
          typeof t3 == "object" && t3 ? u2[e2] = { "@initial": o2[e2], ...t3 } : (t3 = String(t3), u2[e2] = t3 !== "undefined" || l2.has(e2) ? t3 : o2[e2]);
        } else
          u2[e2] = o2[e2];
      const h2 = /* @__PURE__ */ new Set([...i2]);
      for (const [r3, i3, o3, l3] of t2.composers) {
        n2.rules.styled.cache.has(r3) || (n2.rules.styled.cache.add(r3), x(i3, [`.${r3}`], [], e, (e2) => {
          d2.styled.apply(e2);
        }));
        const t3 = A(o3, u2, e.media), s3 = A(l3, u2, e.media, !0);
        for (const i4 of t3)
          if (i4 !== void 0)
            for (const [t4, o4, l4] of i4) {
              const i5 = `${r3}-${W(o4)}-${t4}`;
              h2.add(i5);
              const s4 = (l4 ? n2.rules.resonevar : n2.rules.onevar).cache, a3 = l4 ? d2.resonevar : d2.onevar;
              s4.has(i5) || (s4.add(i5), x(o4, [`.${i5}`], [], e, (e2) => {
                a3.apply(e2);
              }));
            }
        for (const t4 of s3)
          if (t4 !== void 0)
            for (const [i4, o4] of t4) {
              const t5 = `${r3}-${W(o4)}-${i4}`;
              h2.add(t5), n2.rules.allvar.cache.has(t5) || (n2.rules.allvar.cache.add(t5), x(o4, [`.${t5}`], [], e, (e2) => {
                d2.allvar.apply(e2);
              }));
            }
      }
      if (typeof a2 == "object" && a2) {
        const t3 = `${r2}-i${W(a2)}-css`;
        h2.add(t3), n2.rules.inline.cache.has(t3) || (n2.rules.inline.cache.add(t3), x(a2, [`.${t3}`], [], e, (e2) => {
          d2.inline.apply(e2);
        }));
      }
      for (const e2 of String(s2.className || "").trim().split(/\s+/))
        e2 && h2.add(e2);
      const f2 = p3.className = [...h2].join(" ");
      return { type: t2.type, className: f2, selector: g2, props: p3, toString: () => f2, deferredInjector: c2 };
    };
    return a(p2, { className: r2, selector: g2, [s]: t2, toString: () => (n2.rules.styled.cache.has(r2) || p2(), r2) });
  }, O = (e) => {
    let t2 = "";
    const n2 = [], r2 = {}, i2 = [];
    for (const [o2, , , , l2, s2] of e) {
      t2 === "" && (t2 = o2), n2.push(o2), i2.push(...s2);
      for (const e2 in l2) {
        const t3 = l2[e2];
        (r2[e2] === void 0 || t3 !== "undefined" || s2.includes(t3)) && (r2[e2] = t3);
      }
    }
    return [t2, n2, r2, new Set(i2)];
  }, A = (e, t2, n2, r2) => {
    const i2 = [];
    e:
      for (let [o2, l2, s2] of e) {
        if (s2)
          continue;
        let e2, a2 = 0, c2 = !1;
        for (e2 in o2) {
          const r3 = o2[e2];
          let i3 = t2[e2];
          if (i3 !== r3) {
            if (typeof i3 != "object" || !i3)
              continue e;
            {
              let e3, t3, o3 = 0;
              for (const l3 in i3) {
                if (r3 === String(i3[l3])) {
                  if (l3 !== "@initial") {
                    const e4 = l3.slice(1);
                    (t3 = t3 || []).push(e4 in n2 ? n2[e4] : l3.replace(/^@media ?/, "")), c2 = !0;
                  }
                  a2 += o3, e3 = !0;
                }
                ++o3;
              }
              if (t3 && t3.length && (l2 = { ["@media " + t3.join(", ")]: l2 }), !e3)
                continue e;
            }
          }
        }
        (i2[a2] = i2[a2] || []).push([r2 ? "cv" : `${e2}-${o2[e2]}`, l2, c2]);
      }
    return i2;
  }, D = {}, H = l(), N = (e, t2) => H(e, () => (...n2) => {
    const r2 = () => {
      for (let r3 of n2) {
        r3 = typeof r3 == "object" && r3 || {};
        let n3 = W(r3);
        if (!t2.rules.global.cache.has(n3)) {
          if (t2.rules.global.cache.add(n3), "@import" in r3) {
            let e2 = [].indexOf.call(t2.sheet.cssRules, t2.rules.themed.group) - 1;
            for (let n4 of [].concat(r3["@import"]))
              n4 = n4.includes('"') || n4.includes("'") ? n4 : `"${n4}"`, t2.sheet.insertRule(`@import ${n4};`, e2++);
            delete r3["@import"];
          }
          x(r3, [], [], e, (e2) => {
            t2.rules.global.apply(e2);
          });
        }
      }
      return "";
    };
    return a(r2, { toString: r2 });
  }), V = l(), G = (e, t2) => V(e, () => (n2) => {
    const r2 = `${k(e.prefix)}k-${W(n2)}`, i2 = () => {
      if (!t2.rules.global.cache.has(r2)) {
        t2.rules.global.cache.add(r2);
        const i3 = [];
        x(n2, [], [], e, (e2) => i3.push(e2));
        const o2 = `@keyframes ${r2}{${i3.join("")}}`;
        t2.rules.global.apply(o2);
      }
      return r2;
    };
    return a(i2, { get name() {
      return i2();
    }, toString: i2 });
  }), F = class {
    constructor(e, t2, n2, r2) {
      this.token = e == null ? "" : String(e), this.value = t2 == null ? "" : String(t2), this.scale = n2 == null ? "" : String(n2), this.prefix = r2 == null ? "" : String(r2);
    }
    get computedValue() {
      return "var(" + this.variable + ")";
    }
    get variable() {
      return "--" + k(this.prefix) + k(this.scale) + this.token;
    }
    toString() {
      return this.computedValue;
    }
  }, J = l(), U = (e, t2) => J(e, () => (n2, r2) => {
    r2 = typeof n2 == "object" && n2 || Object(r2);
    const i2 = `.${n2 = (n2 = typeof n2 == "string" ? n2 : "") || `${k(e.prefix)}t-${W(r2)}`}`, o2 = {}, l2 = [];
    for (const t3 in r2) {
      o2[t3] = {};
      for (const n3 in r2[t3]) {
        const i3 = `--${k(e.prefix)}${t3}-${n3}`, s3 = y(String(r2[t3][n3]), e.prefix, t3);
        o2[t3][n3] = new F(n3, s3, t3, e.prefix), l2.push(`${i3}:${s3}`);
      }
    }
    const s2 = () => {
      if (l2.length && !t2.rules.themed.cache.has(n2)) {
        t2.rules.themed.cache.add(n2);
        const i3 = `${r2 === e.theme ? ":root," : ""}.${n2}{${l2.join(";")}}`;
        t2.rules.themed.apply(i3);
      }
      return n2;
    };
    return { ...o2, get className() {
      return s2();
    }, selector: i2, toString: s2 };
  }), Z = l(), X = (e) => {
    let t2 = !1;
    const n2 = Z(e, (e2) => {
      t2 = !0;
      const n3 = "prefix" in (e2 = typeof e2 == "object" && e2 || {}) ? String(e2.prefix) : "", r2 = typeof e2.media == "object" && e2.media || {}, o2 = typeof e2.root == "object" ? e2.root || null : globalThis.document || null, l2 = typeof e2.theme == "object" && e2.theme || {}, s2 = { prefix: n3, media: r2, theme: l2, themeMap: typeof e2.themeMap == "object" && e2.themeMap || { ...i }, utils: typeof e2.utils == "object" && e2.utils || {} }, a2 = T(o2), c2 = { css: C(s2, a2), globalCss: N(s2, a2), keyframes: G(s2, a2), createTheme: U(s2, a2), reset() {
        a2.reset(), c2.theme.toString();
      }, theme: {}, sheet: a2, config: s2, prefix: n3, getCssText: a2.toString, toString: a2.toString };
      return String(c2.theme = c2.createTheme(l2)), c2;
    });
    return t2 || n2.reset(), n2;
  };
  const { css, globalCss, keyframes, getCssText, theme, createTheme, config, reset } = X({
    prefix: "svelteui",
    theme: {
      colors,
      space: {
        0: "0rem",
        xs: 10,
        sm: 12,
        md: 16,
        lg: 20,
        xl: 24,
        xsPX: "10px",
        smPX: "12px",
        mdPX: "16px",
        lgPX: "20px",
        xlPX: "24px",
        1: "0.125rem",
        2: "0.25rem",
        3: "0.375rem",
        4: "0.5rem",
        5: "0.625rem",
        6: "0.75rem",
        7: "0.875rem",
        8: "1rem",
        9: "1.25rem",
        10: "1.5rem",
        11: "1.75rem",
        12: "2rem",
        13: "2.25rem",
        14: "2.5rem",
        15: "2.75rem",
        16: "3rem",
        17: "3.5rem",
        18: "4rem",
        20: "5rem",
        24: "6rem",
        28: "7rem",
        32: "8rem",
        36: "9rem",
        40: "10rem",
        44: "11rem",
        48: "12rem",
        52: "13rem",
        56: "14rem",
        60: "15rem",
        64: "16rem",
        72: "18rem",
        80: "20rem",
        96: "24rem"
      },
      fontSizes: {
        xs: "12px",
        sm: "14px",
        md: "16px",
        lg: "18px",
        xl: "20px"
      },
      fonts: {
        standard: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
        mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
        fallback: "Segoe UI, system-ui, sans-serif"
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
        tighter: "-0.05em",
        tight: "-0.025em",
        normal: "0",
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.1em"
      },
      sizes: {},
      radii: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "16px",
        xl: "32px",
        squared: "33%",
        rounded: "50%",
        pill: "9999px"
      },
      shadows: {
        xs: "0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)",
        sm: "0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 10px 15px -5px, rgba(0, 0, 0, 0.04) 0px 7px 7px -5px",
        md: "0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
        lg: "0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 28px 23px -7px, rgba(0, 0, 0, 0.04) 0px 12px 12px -7px",
        xl: "0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 36px 28px -7px, rgba(0, 0, 0, 0.04) 0px 17px 17px -7px"
      },
      zIndices: {
        1: "100",
        2: "200",
        3: "300",
        4: "400",
        5: "500",
        10: "1000",
        max: "9999"
      },
      borderWidths: {
        light: "1px",
        normal: "2px",
        bold: "3px",
        extrabold: "4px",
        black: "5px",
        xs: "1px",
        sm: "2px",
        md: "3px",
        lg: "4px",
        xl: "5px"
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
      xs: "(min-width: 576px)",
      sm: "(min-width: 768px)",
      md: "(min-width: 992px)",
      lg: "(min-width: 1200px)",
      xl: "(min-width: 1400px)"
    },
    utils: {
      focusRing: (value) => ({
        WebkitTapHighlightColor: "transparent",
        "&:focus": {
          outlineOffset: 2,
          outline: value === "always" || value === "auto" ? "2px solid $primary" : "none"
        },
        "&:focus:not(:focus-visible)": {
          outline: value === "auto" || value === "never" ? "none" : void 0
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
        display: "flex",
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
        bf: "saturate(180%) blur(10px)",
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
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent"
      })
    },
    themeMap: {
      ...i,
      width: "space",
      height: "space",
      minWidth: "space",
      maxWidth: "space",
      minHeight: "space",
      maxHeight: "space",
      flexBasis: "space",
      gridTemplateColumns: "space",
      gridTemplateRows: "space",
      blockSize: "space",
      minBlockSize: "space",
      maxBlockSize: "space",
      inlineSize: "space",
      minInlineSize: "space",
      maxInlineSize: "space",
      borderWidth: "borderWeights"
    }
  }), dark = createTheme("dark-theme", {
    colors,
    shadows: {
      xs: "-4px 0 15px rgb(0 0 0 / 50%)",
      sm: "0 5px 20px -5px rgba(20, 20, 20, 0.1)",
      md: "0 8px 30px rgba(20, 20, 20, 0.15)",
      lg: "0 30px 60px rgba(20, 20, 20, 0.15)",
      xl: "0 40px 80px rgba(20, 20, 20, 0.25)"
    }
  });
  globalCss({
    a: {
      focusRing: "auto"
    },
    body: {
      [`${dark.selector} &`]: {
        backgroundColor: "$dark700",
        color: "$dark50"
      },
      backgroundColor: "$white",
      color: "$black"
    }
  }), globalCss({
    html: {
      fontFamily: "sans-serif",
      lineHeight: "1.15",
      textSizeAdjust: "100%",
      margin: 0
    },
    body: {
      margin: 0
    },
    "article, aside, footer, header, nav, section, figcaption, figure, main": {
      display: "block"
    },
    h1: {
      fontSize: "2em",
      margin: 0
    },
    hr: {
      boxSizing: "content-box",
      height: 0,
      overflow: "visible"
    },
    pre: {
      fontFamily: "monospace, monospace",
      fontSize: "1em"
    },
    a: {
      background: "transparent",
      textDecorationSkip: "objects"
    },
    "a:active, a:hover": {
      outlineWidth: 0
    },
    "abbr[title]": {
      borderBottom: "none",
      textDecoration: "underline"
    },
    "b, strong": {
      fontWeight: "bolder"
    },
    "code, kbp, samp": {
      fontFamily: "monospace, monospace",
      fontSize: "1em"
    },
    dfn: {
      fontStyle: "italic"
    },
    mark: {
      backgroundColor: "#ff0",
      color: "#000"
    },
    small: {
      fontSize: "80%"
    },
    "sub, sup": {
      fontSize: "75%",
      lineHeight: 0,
      position: "relative",
      verticalAlign: "baseline"
    },
    sup: {
      top: "-0.5em"
    },
    sub: {
      bottom: "-0.25em"
    },
    "audio, video": {
      display: "inline-block"
    },
    "audio:not([controls])": {
      display: "none",
      height: 0
    },
    img: {
      borderStyle: "none",
      verticalAlign: "middle"
    },
    "svg:not(:root)": {
      overflow: "hidden"
    },
    "button, input, optgroup, select, textarea": {
      fontFamily: "sans-serif",
      fontSize: "100%",
      lineHeight: "1.15",
      margin: 0
    },
    "button, input": {
      overflow: "visible"
    },
    "button, select": {
      textTransform: "none"
    },
    "button, [type=reset], [type=submit]": {
      WebkitAppearance: "button"
    },
    "button::-moz-focus-inner, [type=button]::-moz-focus-inner, [type=reset]::-moz-focus-inner, [type=submit]::-moz-focus-inner": {
      borderStyle: "none",
      padding: 0
    },
    "button:-moz-focusring, [type=button]:-moz-focusring, [type=reset]:-moz-focusring, [type=submit]:-moz-focusring": {
      outline: "1px dotted ButtonText"
    },
    legend: {
      boxSizing: "border-box",
      color: "inherit",
      display: "table",
      maxWidth: "100%",
      padding: 0,
      whiteSpace: "normal"
    },
    progress: {
      display: "inline-block",
      verticalAlign: "baseline"
    },
    textarea: {
      overflow: "auto"
    },
    "[type=checkbox], [type=radio]": {
      boxSizing: "border-box",
      padding: 0
    },
    "[type=number]::-webkit-inner-spin-button, [type=number]::-webkit-outer-spin-button": {
      height: "auto"
    },
    "[type=search]": {
      appearance: "textfield",
      outlineOffset: "-2px"
    },
    "[type=search]::-webkit-search-cancel-button, [type=search]::-webkit-search-decoration": {
      appearance: "none"
    },
    "::-webkit-file-upload-button": {
      appearance: "button",
      font: "inherit"
    },
    "details, menu": {
      display: "block"
    },
    summary: {
      display: "list-item"
    },
    canvas: {
      display: "inline-block"
    },
    template: {
      display: "none"
    },
    "[hidden]": {
      display: "none"
    }
  });
  const SYSTEM_PROPS = {
    mt: "marginTop",
    mb: "marginBottom",
    ml: "marginLeft",
    mr: "marginRight",
    pt: "paddingTop",
    pb: "paddingBottom",
    pl: "paddingLeft",
    pr: "paddingRight"
  }, NEGATIVE_VALUES = ["-xs", "-sm", "-md", "-lg", "-xl"];
  function isValidSizeValue(margin) {
    return typeof margin == "string" || typeof margin == "number";
  }
  function getSizeValue(margin, theme2) {
    return NEGATIVE_VALUES.includes(margin) ? theme2.fn.size({ size: margin.replace("-", ""), sizes: theme2.space }) * -1 : theme2.fn.size({ size: margin, sizes: theme2.space });
  }
  function getSystemStyles(systemStyles, theme2) {
    const styles = {};
    if (isValidSizeValue(systemStyles.p)) {
      const value = getSizeValue(systemStyles.p, theme2);
      styles.padding = value;
    }
    if (isValidSizeValue(systemStyles.m)) {
      const value = getSizeValue(systemStyles.m, theme2);
      styles.margin = value;
    }
    if (isValidSizeValue(systemStyles.py)) {
      const value = getSizeValue(systemStyles.py, theme2);
      styles.paddingTop = value, styles.paddingBottom = value;
    }
    if (isValidSizeValue(systemStyles.px)) {
      const value = getSizeValue(systemStyles.px, theme2);
      styles.paddingLeft = value, styles.paddingRight = value;
    }
    if (isValidSizeValue(systemStyles.my)) {
      const value = getSizeValue(systemStyles.my, theme2);
      styles.marginTop = value, styles.marginBottom = value;
    }
    if (isValidSizeValue(systemStyles.mx)) {
      const value = getSizeValue(systemStyles.mx, theme2);
      styles.marginLeft = value, styles.marginRight = value;
    }
    return Object.keys(SYSTEM_PROPS).forEach((property) => {
      isValidSizeValue(systemStyles[property]) && (styles[SYSTEM_PROPS[property]] = theme2.fn.size({
        size: getSizeValue(systemStyles[property], theme2),
        sizes: theme2.space
      }));
    }), styles;
  }
  function create_else_block$2(ctx) {
    let div, div_class_value, useActions_action, current, mounted, dispose;
    const default_slot_template = (
      /*#slots*/
      ctx[28].default
    ), default_slot = create_slot(
      default_slot_template,
      ctx,
      /*$$scope*/
      ctx[32],
      null
    );
    let div_levels = [
      {
        class: div_class_value = /*className*/
        ctx[2] + " " + /*BoxStyles*/
        ctx[7]({
          css: {
            .../*getCSSStyles*/
            ctx[11](
              /*theme*/
              ctx[10]
            ),
            .../*systemStyles*/
            ctx[6]
          }
        })
      },
      /*$$restProps*/
      ctx[12]
    ], div_data = {};
    for (let i2 = 0; i2 < div_levels.length; i2 += 1)
      div_data = assign(div_data, div_levels[i2]);
    return {
      c() {
        div = element("div"), default_slot && default_slot.c(), set_attributes(div, div_data);
      },
      m(target, anchor) {
        insert(target, div, anchor), default_slot && default_slot.m(div, null), ctx[31](div), current = !0, mounted || (dispose = [
          action_destroyer(
            /*forwardEvents*/
            ctx[8].call(null, div)
          ),
          action_destroyer(useActions_action = useActions.call(
            null,
            div,
            /*use*/
            ctx[1]
          ))
        ], mounted = !0);
      },
      p(ctx2, dirty) {
        default_slot && default_slot.p && (!current || dirty[1] & /*$$scope*/
        2) && update_slot_base(
          default_slot,
          default_slot_template,
          ctx2,
          /*$$scope*/
          ctx2[32],
          current ? get_slot_changes(
            default_slot_template,
            /*$$scope*/
            ctx2[32],
            dirty,
            null
          ) : get_all_dirty_from_scope(
            /*$$scope*/
            ctx2[32]
          ),
          null
        ), set_attributes(div, div_data = get_spread_update(div_levels, [
          (!current || dirty[0] & /*className, BoxStyles, systemStyles*/
          196 && div_class_value !== (div_class_value = /*className*/
          ctx2[2] + " " + /*BoxStyles*/
          ctx2[7]({
            css: {
              .../*getCSSStyles*/
              ctx2[11](
                /*theme*/
                ctx2[10]
              ),
              .../*systemStyles*/
              ctx2[6]
            }
          }))) && { class: div_class_value },
          dirty[0] & /*$$restProps*/
          4096 && /*$$restProps*/
          ctx2[12]
        ])), useActions_action && is_function(useActions_action.update) && dirty[0] & /*use*/
        2 && useActions_action.update.call(
          null,
          /*use*/
          ctx2[1]
        );
      },
      i(local) {
        current || (transition_in(default_slot, local), current = !0);
      },
      o(local) {
        transition_out(default_slot, local), current = !1;
      },
      d(detaching) {
        detaching && detach(div), default_slot && default_slot.d(detaching), ctx[31](null), mounted = !1, run_all(dispose);
      }
    };
  }
  function create_if_block_1$5(ctx) {
    let switch_instance, switch_instance_anchor, current;
    const switch_instance_spread_levels = [
      {
        use: [
          /*forwardEvents*/
          ctx[8],
          [
            useActions,
            /*use*/
            ctx[1]
          ]
        ]
      },
      {
        class: (
          /*className*/
          ctx[2] + " " + /*BoxStyles*/
          ctx[7]({
            css: {
              .../*getCSSStyles*/
              ctx[11](
                /*theme*/
                ctx[10]
              ),
              .../*systemStyles*/
              ctx[6]
            }
          })
        )
      },
      /*$$restProps*/
      ctx[12]
    ];
    var switch_value = (
      /*root*/
      ctx[3]
    );
    function switch_props(ctx2) {
      let switch_instance_props = {
        $$slots: { default: [create_default_slot$8] },
        $$scope: { ctx: ctx2 }
      };
      for (let i2 = 0; i2 < switch_instance_spread_levels.length; i2 += 1)
        switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i2]);
      return { props: switch_instance_props };
    }
    return switch_value && (switch_instance = construct_svelte_component(switch_value, switch_props(ctx)), ctx[30](switch_instance)), {
      c() {
        switch_instance && create_component(switch_instance.$$.fragment), switch_instance_anchor = empty();
      },
      m(target, anchor) {
        switch_instance && mount_component(switch_instance, target, anchor), insert(target, switch_instance_anchor, anchor), current = !0;
      },
      p(ctx2, dirty) {
        const switch_instance_changes = dirty[0] & /*forwardEvents, use, className, BoxStyles, getCSSStyles, theme, systemStyles, $$restProps*/
        7622 ? get_spread_update(switch_instance_spread_levels, [
          dirty[0] & /*forwardEvents, use*/
          258 && {
            use: [
              /*forwardEvents*/
              ctx2[8],
              [
                useActions,
                /*use*/
                ctx2[1]
              ]
            ]
          },
          dirty[0] & /*className, BoxStyles, getCSSStyles, theme, systemStyles*/
          3268 && {
            class: (
              /*className*/
              ctx2[2] + " " + /*BoxStyles*/
              ctx2[7]({
                css: {
                  .../*getCSSStyles*/
                  ctx2[11](
                    /*theme*/
                    ctx2[10]
                  ),
                  .../*systemStyles*/
                  ctx2[6]
                }
              })
            )
          },
          dirty[0] & /*$$restProps*/
          4096 && get_spread_object(
            /*$$restProps*/
            ctx2[12]
          )
        ]) : {};
        if (dirty[1] & /*$$scope*/
        2 && (switch_instance_changes.$$scope = { dirty, ctx: ctx2 }), switch_value !== (switch_value = /*root*/
        ctx2[3])) {
          if (switch_instance) {
            group_outros();
            const old_component = switch_instance;
            transition_out(old_component.$$.fragment, 1, 0, () => {
              destroy_component(old_component, 1);
            }), check_outros();
          }
          switch_value ? (switch_instance = construct_svelte_component(switch_value, switch_props(ctx2)), ctx2[30](switch_instance), create_component(switch_instance.$$.fragment), transition_in(switch_instance.$$.fragment, 1), mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor)) : switch_instance = null;
        } else
          switch_value && switch_instance.$set(switch_instance_changes);
      },
      i(local) {
        current || (switch_instance && transition_in(switch_instance.$$.fragment, local), current = !0);
      },
      o(local) {
        switch_instance && transition_out(switch_instance.$$.fragment, local), current = !1;
      },
      d(detaching) {
        ctx[30](null), detaching && detach(switch_instance_anchor), switch_instance && destroy_component(switch_instance, detaching);
      }
    };
  }
  function create_if_block$7(ctx) {
    let previous_tag = (
      /*castRoot*/
      ctx[9]()
    ), svelte_element_anchor, current, svelte_element = (
      /*castRoot*/
      ctx[9]() && create_dynamic_element$1(ctx)
    );
    return {
      c() {
        svelte_element && svelte_element.c(), svelte_element_anchor = empty();
      },
      m(target, anchor) {
        svelte_element && svelte_element.m(target, anchor), insert(target, svelte_element_anchor, anchor), current = !0;
      },
      p(ctx2, dirty) {
        /*castRoot*/
        ctx2[9]() ? previous_tag ? safe_not_equal(
          previous_tag,
          /*castRoot*/
          ctx2[9]()
        ) ? (svelte_element.d(1), svelte_element = create_dynamic_element$1(ctx2), svelte_element.c(), svelte_element.m(svelte_element_anchor.parentNode, svelte_element_anchor)) : svelte_element.p(ctx2, dirty) : (svelte_element = create_dynamic_element$1(ctx2), svelte_element.c(), svelte_element.m(svelte_element_anchor.parentNode, svelte_element_anchor)) : previous_tag && (svelte_element.d(1), svelte_element = null), previous_tag = /*castRoot*/
        ctx2[9]();
      },
      i(local) {
        current || (transition_in(svelte_element), current = !0);
      },
      o(local) {
        transition_out(svelte_element), current = !1;
      },
      d(detaching) {
        detaching && detach(svelte_element_anchor), svelte_element && svelte_element.d(detaching);
      }
    };
  }
  function create_default_slot$8(ctx) {
    let current;
    const default_slot_template = (
      /*#slots*/
      ctx[28].default
    ), default_slot = create_slot(
      default_slot_template,
      ctx,
      /*$$scope*/
      ctx[32],
      null
    );
    return {
      c() {
        default_slot && default_slot.c();
      },
      m(target, anchor) {
        default_slot && default_slot.m(target, anchor), current = !0;
      },
      p(ctx2, dirty) {
        default_slot && default_slot.p && (!current || dirty[1] & /*$$scope*/
        2) && update_slot_base(
          default_slot,
          default_slot_template,
          ctx2,
          /*$$scope*/
          ctx2[32],
          current ? get_slot_changes(
            default_slot_template,
            /*$$scope*/
            ctx2[32],
            dirty,
            null
          ) : get_all_dirty_from_scope(
            /*$$scope*/
            ctx2[32]
          ),
          null
        );
      },
      i(local) {
        current || (transition_in(default_slot, local), current = !0);
      },
      o(local) {
        transition_out(default_slot, local), current = !1;
      },
      d(detaching) {
        default_slot && default_slot.d(detaching);
      }
    };
  }
  function create_dynamic_element$1(ctx) {
    let svelte_element, svelte_element_class_value, useActions_action, current, mounted, dispose;
    const default_slot_template = (
      /*#slots*/
      ctx[28].default
    ), default_slot = create_slot(
      default_slot_template,
      ctx,
      /*$$scope*/
      ctx[32],
      null
    );
    let svelte_element_levels = [
      {
        class: svelte_element_class_value = /*className*/
        ctx[2] + " " + /*BoxStyles*/
        ctx[7]({
          css: {
            .../*getCSSStyles*/
            ctx[11](
              /*theme*/
              ctx[10]
            ),
            .../*systemStyles*/
            ctx[6]
          }
        })
      },
      /*$$restProps*/
      ctx[12]
    ], svelte_element_data = {};
    for (let i2 = 0; i2 < svelte_element_levels.length; i2 += 1)
      svelte_element_data = assign(svelte_element_data, svelte_element_levels[i2]);
    return {
      c() {
        svelte_element = element(
          /*castRoot*/
          ctx[9]()
        ), default_slot && default_slot.c(), /-/.test(
          /*castRoot*/
          ctx[9]()
        ) ? set_custom_element_data_map(svelte_element, svelte_element_data) : set_attributes(svelte_element, svelte_element_data);
      },
      m(target, anchor) {
        insert(target, svelte_element, anchor), default_slot && default_slot.m(svelte_element, null), ctx[29](svelte_element), current = !0, mounted || (dispose = [
          action_destroyer(
            /*forwardEvents*/
            ctx[8].call(null, svelte_element)
          ),
          action_destroyer(useActions_action = useActions.call(
            null,
            svelte_element,
            /*use*/
            ctx[1]
          ))
        ], mounted = !0);
      },
      p(ctx2, dirty) {
        default_slot && default_slot.p && (!current || dirty[1] & /*$$scope*/
        2) && update_slot_base(
          default_slot,
          default_slot_template,
          ctx2,
          /*$$scope*/
          ctx2[32],
          current ? get_slot_changes(
            default_slot_template,
            /*$$scope*/
            ctx2[32],
            dirty,
            null
          ) : get_all_dirty_from_scope(
            /*$$scope*/
            ctx2[32]
          ),
          null
        ), svelte_element_data = get_spread_update(svelte_element_levels, [
          (!current || dirty[0] & /*className, BoxStyles, systemStyles*/
          196 && svelte_element_class_value !== (svelte_element_class_value = /*className*/
          ctx2[2] + " " + /*BoxStyles*/
          ctx2[7]({
            css: {
              .../*getCSSStyles*/
              ctx2[11](
                /*theme*/
                ctx2[10]
              ),
              .../*systemStyles*/
              ctx2[6]
            }
          }))) && { class: svelte_element_class_value },
          dirty[0] & /*$$restProps*/
          4096 && /*$$restProps*/
          ctx2[12]
        ]), /-/.test(
          /*castRoot*/
          ctx2[9]()
        ) ? set_custom_element_data_map(svelte_element, svelte_element_data) : set_attributes(svelte_element, svelte_element_data), useActions_action && is_function(useActions_action.update) && dirty[0] & /*use*/
        2 && useActions_action.update.call(
          null,
          /*use*/
          ctx2[1]
        );
      },
      i(local) {
        current || (transition_in(default_slot, local), current = !0);
      },
      o(local) {
        transition_out(default_slot, local), current = !1;
      },
      d(detaching) {
        detaching && detach(svelte_element), default_slot && default_slot.d(detaching), ctx[29](null), mounted = !1, run_all(dispose);
      }
    };
  }
  function create_fragment$j(ctx) {
    let current_block_type_index, if_block, if_block_anchor, current;
    const if_block_creators = [create_if_block$7, create_if_block_1$5, create_else_block$2], if_blocks = [];
    function select_block_type(ctx2, dirty) {
      return (
        /*isHTMLElement*/
        ctx2[4] ? 0 : (
          /*isComponent*/
          ctx2[5] && typeof /*root*/
          ctx2[3] != "string" ? 1 : 2
        )
      );
    }
    return current_block_type_index = select_block_type(ctx), if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx), {
      c() {
        if_block.c(), if_block_anchor = empty();
      },
      m(target, anchor) {
        if_blocks[current_block_type_index].m(target, anchor), insert(target, if_block_anchor, anchor), current = !0;
      },
      p(ctx2, dirty) {
        let previous_block_index = current_block_type_index;
        current_block_type_index = select_block_type(ctx2), current_block_type_index === previous_block_index ? if_blocks[current_block_type_index].p(ctx2, dirty) : (group_outros(), transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        }), check_outros(), if_block = if_blocks[current_block_type_index], if_block ? if_block.p(ctx2, dirty) : (if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2), if_block.c()), transition_in(if_block, 1), if_block.m(if_block_anchor.parentNode, if_block_anchor));
      },
      i(local) {
        current || (transition_in(if_block), current = !0);
      },
      o(local) {
        transition_out(if_block), current = !1;
      },
      d(detaching) {
        if_blocks[current_block_type_index].d(detaching), detaching && detach(if_block_anchor);
      }
    };
  }
  function instance$j($$self, $$props, $$invalidate) {
    let BoxStyles, systemStyles;
    const omit_props_names = [
      "use",
      "element",
      "class",
      "css",
      "root",
      "m",
      "my",
      "mx",
      "mt",
      "mb",
      "ml",
      "mr",
      "p",
      "py",
      "px",
      "pt",
      "pb",
      "pl",
      "pr"
    ];
    let $$restProps = compute_rest_props($$props, omit_props_names), { $$slots: slots = {}, $$scope } = $$props, { use = [], element: element2 = void 0, class: className = "", css: css$1 = {}, root: root2 = void 0, m: m2 = void 0, my: my2 = void 0, mx = void 0, mt = void 0, mb = void 0, ml = void 0, mr = void 0, p: p2 = void 0, py = void 0, px = void 0, pt = void 0, pb = void 0, pl = void 0, pr = void 0 } = $$props;
    const forwardEvents = createEventForwarder(get_current_component()), castRoot = () => root2, theme2 = useSvelteUIThemeContext()?.theme || useSvelteUITheme(), getCSSStyles = typeof css$1 == "function" ? css$1 : () => css$1;
    let isHTMLElement, isComponent;
    function svelte_element_binding($$value) {
      binding_callbacks[$$value ? "unshift" : "push"](() => {
        element2 = $$value, $$invalidate(0, element2);
      });
    }
    function switch_instance_binding($$value) {
      binding_callbacks[$$value ? "unshift" : "push"](() => {
        element2 = $$value, $$invalidate(0, element2);
      });
    }
    function div_binding($$value) {
      binding_callbacks[$$value ? "unshift" : "push"](() => {
        element2 = $$value, $$invalidate(0, element2);
      });
    }
    return $$self.$$set = ($$new_props) => {
      $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)), $$invalidate(12, $$restProps = compute_rest_props($$props, omit_props_names)), "use" in $$new_props && $$invalidate(1, use = $$new_props.use), "element" in $$new_props && $$invalidate(0, element2 = $$new_props.element), "class" in $$new_props && $$invalidate(2, className = $$new_props.class), "css" in $$new_props && $$invalidate(13, css$1 = $$new_props.css), "root" in $$new_props && $$invalidate(3, root2 = $$new_props.root), "m" in $$new_props && $$invalidate(14, m2 = $$new_props.m), "my" in $$new_props && $$invalidate(15, my2 = $$new_props.my), "mx" in $$new_props && $$invalidate(16, mx = $$new_props.mx), "mt" in $$new_props && $$invalidate(17, mt = $$new_props.mt), "mb" in $$new_props && $$invalidate(18, mb = $$new_props.mb), "ml" in $$new_props && $$invalidate(19, ml = $$new_props.ml), "mr" in $$new_props && $$invalidate(20, mr = $$new_props.mr), "p" in $$new_props && $$invalidate(21, p2 = $$new_props.p), "py" in $$new_props && $$invalidate(22, py = $$new_props.py), "px" in $$new_props && $$invalidate(23, px = $$new_props.px), "pt" in $$new_props && $$invalidate(24, pt = $$new_props.pt), "pb" in $$new_props && $$invalidate(25, pb = $$new_props.pb), "pl" in $$new_props && $$invalidate(26, pl = $$new_props.pl), "pr" in $$new_props && $$invalidate(27, pr = $$new_props.pr), "$$scope" in $$new_props && $$invalidate(32, $$scope = $$new_props.$$scope);
    }, $$self.$$.update = () => {
      $$self.$$.dirty[0] & /*root*/
      8 && ($$invalidate(4, isHTMLElement = root2 && typeof root2 == "string"), $$invalidate(5, isComponent = root2 && typeof root2 == "function")), $$self.$$.dirty[0] & /*m, my, mx, mt, mb, ml, mr, p, py, px, pt, pb, pl, pr*/
      268419072 && $$invalidate(6, systemStyles = getSystemStyles(
        {
          m: m2,
          my: my2,
          mx,
          mt,
          mb,
          ml,
          mr,
          p: p2,
          py,
          px,
          pt,
          pb,
          pl,
          pr
        },
        theme2
      ));
    }, $$invalidate(7, BoxStyles = css({})), [
      element2,
      use,
      className,
      root2,
      isHTMLElement,
      isComponent,
      systemStyles,
      BoxStyles,
      forwardEvents,
      castRoot,
      theme2,
      getCSSStyles,
      $$restProps,
      css$1,
      m2,
      my2,
      mx,
      mt,
      mb,
      ml,
      mr,
      p2,
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
      super(), init(
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
  function create_fragment$i(ctx) {
    let svg, g1, g0, circle, path, animateTransform, svg_width_value, svg_height_value, useActions_action, mounted, dispose;
    return {
      c() {
        svg = svg_element("svg"), g1 = svg_element("g"), g0 = svg_element("g"), circle = svg_element("circle"), path = svg_element("path"), animateTransform = svg_element("animateTransform"), attr(circle, "stroke-opacity", ".5"), attr(circle, "cx", "16"), attr(circle, "cy", "16"), attr(circle, "r", "16"), attr(animateTransform, "attributeName", "transform"), attr(animateTransform, "type", "rotate"), attr(animateTransform, "from", "0 16 16"), attr(animateTransform, "to", "360 16 16"), attr(animateTransform, "dur", "1s"), attr(animateTransform, "repeatCount", "indefinite"), attr(path, "d", "M32 16c0-9.94-8.06-16-16-16"), attr(g0, "transform", "translate(2.5 2.5)"), attr(g0, "stroke-width", "5"), attr(g1, "fill", "none"), attr(g1, "fill-rule", "evenodd"), attr(svg, "width", svg_width_value = `${/*size*/
        ctx[1]}px`), attr(svg, "height", svg_height_value = `${/*size*/
        ctx[1]}px`), attr(svg, "viewBox", "0 0 38 38"), attr(svg, "xmlns", "http://www.w3.org/2000/svg"), attr(
          svg,
          "stroke",
          /*color*/
          ctx[2]
        ), attr(
          svg,
          "class",
          /*className*/
          ctx[3]
        );
      },
      m(target, anchor) {
        insert(target, svg, anchor), append(svg, g1), append(g1, g0), append(g0, circle), append(g0, path), append(path, animateTransform), mounted || (dispose = action_destroyer(useActions_action = useActions.call(
          null,
          svg,
          /*use*/
          ctx[0]
        )), mounted = !0);
      },
      p(ctx2, [dirty]) {
        dirty & /*size*/
        2 && svg_width_value !== (svg_width_value = `${/*size*/
        ctx2[1]}px`) && attr(svg, "width", svg_width_value), dirty & /*size*/
        2 && svg_height_value !== (svg_height_value = `${/*size*/
        ctx2[1]}px`) && attr(svg, "height", svg_height_value), dirty & /*color*/
        4 && attr(
          svg,
          "stroke",
          /*color*/
          ctx2[2]
        ), dirty & /*className*/
        8 && attr(
          svg,
          "class",
          /*className*/
          ctx2[3]
        ), useActions_action && is_function(useActions_action.update) && dirty & /*use*/
        1 && useActions_action.update.call(
          null,
          /*use*/
          ctx2[0]
        );
      },
      i: noop,
      o: noop,
      d(detaching) {
        detaching && detach(svg), mounted = !1, dispose();
      }
    };
  }
  function instance$i($$self, $$props, $$invalidate) {
    let { use = [] } = $$props, { size: size2 = 25 } = $$props, { color = "blue" } = $$props, { class: className = "" } = $$props;
    return $$self.$$set = ($$props2) => {
      "use" in $$props2 && $$invalidate(0, use = $$props2.use), "size" in $$props2 && $$invalidate(1, size2 = $$props2.size), "color" in $$props2 && $$invalidate(2, color = $$props2.color), "class" in $$props2 && $$invalidate(3, className = $$props2.class);
    }, [use, size2, color, className];
  }
  class Circle extends SvelteComponent {
    constructor(options) {
      super(), init(this, options, instance$i, create_fragment$i, safe_not_equal, { use: 0, size: 1, color: 2, class: 3 });
    }
  }
  const Circle$1 = Circle;
  function create_fragment$h(ctx) {
    let svg, rect0, animate0, animate1, rect1, animate2, animate3, rect2, animate4, animate5, rect3, animate6, animate7, rect4, animate8, animate9, svg_width_value, useActions_action, mounted, dispose;
    return {
      c() {
        svg = svg_element("svg"), rect0 = svg_element("rect"), animate0 = svg_element("animate"), animate1 = svg_element("animate"), rect1 = svg_element("rect"), animate2 = svg_element("animate"), animate3 = svg_element("animate"), rect2 = svg_element("rect"), animate4 = svg_element("animate"), animate5 = svg_element("animate"), rect3 = svg_element("rect"), animate6 = svg_element("animate"), animate7 = svg_element("animate"), rect4 = svg_element("rect"), animate8 = svg_element("animate"), animate9 = svg_element("animate"), attr(animate0, "attributeName", "height"), attr(animate0, "begin", "0.5s"), attr(animate0, "dur", "1s"), attr(animate0, "values", "120;110;100;90;80;70;60;50;40;140;120"), attr(animate0, "calcMode", "linear"), attr(animate0, "repeatCount", "indefinite"), attr(animate1, "attributeName", "y"), attr(animate1, "begin", "0.5s"), attr(animate1, "dur", "1s"), attr(animate1, "values", "10;15;20;25;30;35;40;45;50;0;10"), attr(animate1, "calcMode", "linear"), attr(animate1, "repeatCount", "indefinite"), attr(rect0, "y", "10"), attr(rect0, "width", "15"), attr(rect0, "height", "120"), attr(rect0, "rx", "6"), attr(animate2, "attributeName", "height"), attr(animate2, "begin", "0.25s"), attr(animate2, "dur", "1s"), attr(animate2, "values", "120;110;100;90;80;70;60;50;40;140;120"), attr(animate2, "calcMode", "linear"), attr(animate2, "repeatCount", "indefinite"), attr(animate3, "attributeName", "y"), attr(animate3, "begin", "0.25s"), attr(animate3, "dur", "1s"), attr(animate3, "values", "10;15;20;25;30;35;40;45;50;0;10"), attr(animate3, "calcMode", "linear"), attr(animate3, "repeatCount", "indefinite"), attr(rect1, "x", "30"), attr(rect1, "y", "10"), attr(rect1, "width", "15"), attr(rect1, "height", "120"), attr(rect1, "rx", "6"), attr(animate4, "attributeName", "height"), attr(animate4, "begin", "0s"), attr(animate4, "dur", "1s"), attr(animate4, "values", "120;110;100;90;80;70;60;50;40;140;120"), attr(animate4, "calcMode", "linear"), attr(animate4, "repeatCount", "indefinite"), attr(animate5, "attributeName", "y"), attr(animate5, "begin", "0s"), attr(animate5, "dur", "1s"), attr(animate5, "values", "10;15;20;25;30;35;40;45;50;0;10"), attr(animate5, "calcMode", "linear"), attr(animate5, "repeatCount", "indefinite"), attr(rect2, "x", "60"), attr(rect2, "width", "15"), attr(rect2, "height", "140"), attr(rect2, "rx", "6"), attr(animate6, "attributeName", "height"), attr(animate6, "begin", "0.25s"), attr(animate6, "dur", "1s"), attr(animate6, "values", "120;110;100;90;80;70;60;50;40;140;120"), attr(animate6, "calcMode", "linear"), attr(animate6, "repeatCount", "indefinite"), attr(animate7, "attributeName", "y"), attr(animate7, "begin", "0.25s"), attr(animate7, "dur", "1s"), attr(animate7, "values", "10;15;20;25;30;35;40;45;50;0;10"), attr(animate7, "calcMode", "linear"), attr(animate7, "repeatCount", "indefinite"), attr(rect3, "x", "90"), attr(rect3, "y", "10"), attr(rect3, "width", "15"), attr(rect3, "height", "120"), attr(rect3, "rx", "6"), attr(animate8, "attributeName", "height"), attr(animate8, "begin", "0.5s"), attr(animate8, "dur", "1s"), attr(animate8, "values", "120;110;100;90;80;70;60;50;40;140;120"), attr(animate8, "calcMode", "linear"), attr(animate8, "repeatCount", "indefinite"), attr(animate9, "attributeName", "y"), attr(animate9, "begin", "0.5s"), attr(animate9, "dur", "1s"), attr(animate9, "values", "10;15;20;25;30;35;40;45;50;0;10"), attr(animate9, "calcMode", "linear"), attr(animate9, "repeatCount", "indefinite"), attr(rect4, "x", "120"), attr(rect4, "y", "10"), attr(rect4, "width", "15"), attr(rect4, "height", "120"), attr(rect4, "rx", "6"), attr(svg, "viewBox", "0 0 135 140"), attr(svg, "xmlns", "http://www.w3.org/2000/svg"), attr(
          svg,
          "fill",
          /*color*/
          ctx[2]
        ), attr(svg, "width", svg_width_value = `${/*size*/
        ctx[1]}px`), attr(
          svg,
          "class",
          /*className*/
          ctx[3]
        );
      },
      m(target, anchor) {
        insert(target, svg, anchor), append(svg, rect0), append(rect0, animate0), append(rect0, animate1), append(svg, rect1), append(rect1, animate2), append(rect1, animate3), append(svg, rect2), append(rect2, animate4), append(rect2, animate5), append(svg, rect3), append(rect3, animate6), append(rect3, animate7), append(svg, rect4), append(rect4, animate8), append(rect4, animate9), mounted || (dispose = action_destroyer(useActions_action = useActions.call(
          null,
          svg,
          /*use*/
          ctx[0]
        )), mounted = !0);
      },
      p(ctx2, [dirty]) {
        dirty & /*color*/
        4 && attr(
          svg,
          "fill",
          /*color*/
          ctx2[2]
        ), dirty & /*size*/
        2 && svg_width_value !== (svg_width_value = `${/*size*/
        ctx2[1]}px`) && attr(svg, "width", svg_width_value), dirty & /*className*/
        8 && attr(
          svg,
          "class",
          /*className*/
          ctx2[3]
        ), useActions_action && is_function(useActions_action.update) && dirty & /*use*/
        1 && useActions_action.update.call(
          null,
          /*use*/
          ctx2[0]
        );
      },
      i: noop,
      o: noop,
      d(detaching) {
        detaching && detach(svg), mounted = !1, dispose();
      }
    };
  }
  function instance$h($$self, $$props, $$invalidate) {
    let { use = [] } = $$props, { size: size2 = 25 } = $$props, { color = "blue" } = $$props, { class: className = "" } = $$props;
    return $$self.$$set = ($$props2) => {
      "use" in $$props2 && $$invalidate(0, use = $$props2.use), "size" in $$props2 && $$invalidate(1, size2 = $$props2.size), "color" in $$props2 && $$invalidate(2, color = $$props2.color), "class" in $$props2 && $$invalidate(3, className = $$props2.class);
    }, [use, size2, color, className];
  }
  class Bars extends SvelteComponent {
    constructor(options) {
      super(), init(this, options, instance$h, create_fragment$h, safe_not_equal, { use: 0, size: 1, color: 2, class: 3 });
    }
  }
  const Bars$1 = Bars;
  function create_fragment$g(ctx) {
    let svg, circle0, animate0, animate1, circle1, animate2, animate3, circle2, animate4, animate5, svg_width_value, svg_height_value, useActions_action, mounted, dispose;
    return {
      c() {
        svg = svg_element("svg"), circle0 = svg_element("circle"), animate0 = svg_element("animate"), animate1 = svg_element("animate"), circle1 = svg_element("circle"), animate2 = svg_element("animate"), animate3 = svg_element("animate"), circle2 = svg_element("circle"), animate4 = svg_element("animate"), animate5 = svg_element("animate"), attr(animate0, "attributeName", "r"), attr(animate0, "from", "15"), attr(animate0, "to", "15"), attr(animate0, "begin", "0s"), attr(animate0, "dur", "0.8s"), attr(animate0, "values", "15;9;15"), attr(animate0, "calcMode", "linear"), attr(animate0, "repeatCount", "indefinite"), attr(animate1, "attributeName", "fill-opacity"), attr(animate1, "from", "1"), attr(animate1, "to", "1"), attr(animate1, "begin", "0s"), attr(animate1, "dur", "0.8s"), attr(animate1, "values", "1;.5;1"), attr(animate1, "calcMode", "linear"), attr(animate1, "repeatCount", "indefinite"), attr(circle0, "cx", "15"), attr(circle0, "cy", "15"), attr(circle0, "r", "15"), attr(animate2, "attributeName", "r"), attr(animate2, "from", "9"), attr(animate2, "to", "9"), attr(animate2, "begin", "0s"), attr(animate2, "dur", "0.8s"), attr(animate2, "values", "9;15;9"), attr(animate2, "calcMode", "linear"), attr(animate2, "repeatCount", "indefinite"), attr(animate3, "attributeName", "fill-opacity"), attr(animate3, "from", "0.5"), attr(animate3, "to", "0.5"), attr(animate3, "begin", "0s"), attr(animate3, "dur", "0.8s"), attr(animate3, "values", ".5;1;.5"), attr(animate3, "calcMode", "linear"), attr(animate3, "repeatCount", "indefinite"), attr(circle1, "cx", "60"), attr(circle1, "cy", "15"), attr(circle1, "r", "9"), attr(circle1, "fill-opacity", "0.3"), attr(animate4, "attributeName", "r"), attr(animate4, "from", "15"), attr(animate4, "to", "15"), attr(animate4, "begin", "0s"), attr(animate4, "dur", "0.8s"), attr(animate4, "values", "15;9;15"), attr(animate4, "calcMode", "linear"), attr(animate4, "repeatCount", "indefinite"), attr(animate5, "attributeName", "fill-opacity"), attr(animate5, "from", "1"), attr(animate5, "to", "1"), attr(animate5, "begin", "0s"), attr(animate5, "dur", "0.8s"), attr(animate5, "values", "1;.5;1"), attr(animate5, "calcMode", "linear"), attr(animate5, "repeatCount", "indefinite"), attr(circle2, "cx", "105"), attr(circle2, "cy", "15"), attr(circle2, "r", "15"), attr(svg, "width", svg_width_value = `${/*size*/
        ctx[1]}px`), attr(svg, "height", svg_height_value = `${Number(
          /*size*/
          ctx[1]
        ) / 4}px`), attr(svg, "viewBox", "0 0 120 30"), attr(svg, "xmlns", "http://www.w3.org/2000/svg"), attr(
          svg,
          "fill",
          /*color*/
          ctx[2]
        ), attr(
          svg,
          "class",
          /*className*/
          ctx[3]
        );
      },
      m(target, anchor) {
        insert(target, svg, anchor), append(svg, circle0), append(circle0, animate0), append(circle0, animate1), append(svg, circle1), append(circle1, animate2), append(circle1, animate3), append(svg, circle2), append(circle2, animate4), append(circle2, animate5), mounted || (dispose = action_destroyer(useActions_action = useActions.call(
          null,
          svg,
          /*use*/
          ctx[0]
        )), mounted = !0);
      },
      p(ctx2, [dirty]) {
        dirty & /*size*/
        2 && svg_width_value !== (svg_width_value = `${/*size*/
        ctx2[1]}px`) && attr(svg, "width", svg_width_value), dirty & /*size*/
        2 && svg_height_value !== (svg_height_value = `${Number(
          /*size*/
          ctx2[1]
        ) / 4}px`) && attr(svg, "height", svg_height_value), dirty & /*color*/
        4 && attr(
          svg,
          "fill",
          /*color*/
          ctx2[2]
        ), dirty & /*className*/
        8 && attr(
          svg,
          "class",
          /*className*/
          ctx2[3]
        ), useActions_action && is_function(useActions_action.update) && dirty & /*use*/
        1 && useActions_action.update.call(
          null,
          /*use*/
          ctx2[0]
        );
      },
      i: noop,
      o: noop,
      d(detaching) {
        detaching && detach(svg), mounted = !1, dispose();
      }
    };
  }
  function instance$g($$self, $$props, $$invalidate) {
    let { use = [] } = $$props, { size: size2 = 25 } = $$props, { color = "blue" } = $$props, { class: className = "" } = $$props;
    return $$self.$$set = ($$props2) => {
      "use" in $$props2 && $$invalidate(0, use = $$props2.use), "size" in $$props2 && $$invalidate(1, size2 = $$props2.size), "color" in $$props2 && $$invalidate(2, color = $$props2.color), "class" in $$props2 && $$invalidate(3, className = $$props2.class);
    }, [use, size2, color, className];
  }
  class Dots extends SvelteComponent {
    constructor(options) {
      super(), init(this, options, instance$g, create_fragment$g, safe_not_equal, { use: 0, size: 1, color: 2, class: 3 });
    }
  }
  const Dots$1 = Dots, LOADER_SIZES = {
    xs: 18,
    sm: 22,
    md: 36,
    lg: 44,
    xl: 58
  }, getCorrectShade = (color, dark2 = !1) => theme.colors[dark2 ? `${color}400` : `${color}600`].value;
  function create_fragment$f(ctx) {
    let switch_instance, switch_instance_anchor, current;
    const switch_instance_spread_levels = [
      {
        use: [
          /*forwardEvents*/
          ctx[5],
          [
            useActions,
            /*use*/
            ctx[1]
          ]
        ]
      },
      {
        color: (
          /*color*/
          ctx[4] === "white" ? "white" : getCorrectShade(
            /*color*/
            ctx[4]
          )
        )
      },
      { size: LOADER_SIZES[
        /*size*/
        ctx[3]
      ] },
      { class: (
        /*className*/
        ctx[2]
      ) },
      /*$$restProps*/
      ctx[8]
    ];
    var switch_value = (
      /*LOADERS*/
      ctx[6][
        /*defaultLoader*/
        ctx[7]
      ]
    );
    function switch_props(ctx2) {
      let switch_instance_props = {};
      for (let i2 = 0; i2 < switch_instance_spread_levels.length; i2 += 1)
        switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i2]);
      return { props: switch_instance_props };
    }
    return switch_value && (switch_instance = construct_svelte_component(switch_value, switch_props()), ctx[10](switch_instance)), {
      c() {
        switch_instance && create_component(switch_instance.$$.fragment), switch_instance_anchor = empty();
      },
      m(target, anchor) {
        switch_instance && mount_component(switch_instance, target, anchor), insert(target, switch_instance_anchor, anchor), current = !0;
      },
      p(ctx2, [dirty]) {
        const switch_instance_changes = dirty & /*forwardEvents, useActions, use, color, getCorrectShade, LOADER_SIZES, size, className, $$restProps*/
        318 ? get_spread_update(switch_instance_spread_levels, [
          dirty & /*forwardEvents, useActions, use*/
          34 && {
            use: [
              /*forwardEvents*/
              ctx2[5],
              [
                useActions,
                /*use*/
                ctx2[1]
              ]
            ]
          },
          dirty & /*color, getCorrectShade*/
          16 && {
            color: (
              /*color*/
              ctx2[4] === "white" ? "white" : getCorrectShade(
                /*color*/
                ctx2[4]
              )
            )
          },
          dirty & /*LOADER_SIZES, size*/
          8 && { size: LOADER_SIZES[
            /*size*/
            ctx2[3]
          ] },
          dirty & /*className*/
          4 && { class: (
            /*className*/
            ctx2[2]
          ) },
          dirty & /*$$restProps*/
          256 && get_spread_object(
            /*$$restProps*/
            ctx2[8]
          )
        ]) : {};
        if (switch_value !== (switch_value = /*LOADERS*/
        ctx2[6][
          /*defaultLoader*/
          ctx2[7]
        ])) {
          if (switch_instance) {
            group_outros();
            const old_component = switch_instance;
            transition_out(old_component.$$.fragment, 1, 0, () => {
              destroy_component(old_component, 1);
            }), check_outros();
          }
          switch_value ? (switch_instance = construct_svelte_component(switch_value, switch_props()), ctx2[10](switch_instance), create_component(switch_instance.$$.fragment), transition_in(switch_instance.$$.fragment, 1), mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor)) : switch_instance = null;
        } else
          switch_value && switch_instance.$set(switch_instance_changes);
      },
      i(local) {
        current || (switch_instance && transition_in(switch_instance.$$.fragment, local), current = !0);
      },
      o(local) {
        switch_instance && transition_out(switch_instance.$$.fragment, local), current = !1;
      },
      d(detaching) {
        ctx[10](null), detaching && detach(switch_instance_anchor), switch_instance && destroy_component(switch_instance, detaching);
      }
    };
  }
  function instance$f($$self, $$props, $$invalidate) {
    const omit_props_names = ["use", "element", "class", "size", "color", "variant"];
    let $$restProps = compute_rest_props($$props, omit_props_names), { use = [], element: element2 = void 0, class: className = "", size: size2 = "md", color = "blue", variant: variant2 = "circle" } = $$props;
    const forwardEvents = createEventForwarder(get_current_component()), LOADERS = { bars: Bars$1, circle: Circle$1, dots: Dots$1 }, defaultLoader = variant2 in LOADERS ? variant2 : "circle";
    function switch_instance_binding($$value) {
      binding_callbacks[$$value ? "unshift" : "push"](() => {
        element2 = $$value, $$invalidate(0, element2);
      });
    }
    return $$self.$$set = ($$new_props) => {
      $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)), $$invalidate(8, $$restProps = compute_rest_props($$props, omit_props_names)), "use" in $$new_props && $$invalidate(1, use = $$new_props.use), "element" in $$new_props && $$invalidate(0, element2 = $$new_props.element), "class" in $$new_props && $$invalidate(2, className = $$new_props.class), "size" in $$new_props && $$invalidate(3, size2 = $$new_props.size), "color" in $$new_props && $$invalidate(4, color = $$new_props.color), "variant" in $$new_props && $$invalidate(9, variant2 = $$new_props.variant);
    }, [
      element2,
      use,
      className,
      size2,
      color,
      forwardEvents,
      LOADERS,
      defaultLoader,
      $$restProps,
      variant2,
      switch_instance_binding
    ];
  }
  class Loader extends SvelteComponent {
    constructor(options) {
      super(), init(this, options, instance$f, create_fragment$f, safe_not_equal, {
        use: 1,
        element: 0,
        class: 2,
        size: 3,
        color: 4,
        variant: 9
      });
    }
  }
  const Loader$1 = Loader, useStyles$5 = createStyles((theme2, { iconSize }) => ({
    root: {
      focusRing: "auto",
      position: "relative",
      appearance: "none",
      WebkitAppearance: "none",
      WebkitTapHighlightColor: "transparent",
      boxSizing: "border-box",
      height: `${theme2.fn.size({ size: iconSize, sizes: theme2.space })}px`,
      minHeight: `${theme2.fn.size({ size: iconSize, sizes: theme2.space })}px`,
      width: `${theme2.fn.size({ size: iconSize, sizes: theme2.space })}px`,
      minWidth: `${theme2.fn.size({ size: iconSize, sizes: theme2.space })}px`,
      padding: 0,
      lineHeight: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      textDecoration: "none"
    },
    icon: {
      height: `${theme2.fn.size({ size: iconSize, sizes: theme2.space })}px`,
      minHeight: `${theme2.fn.size({ size: iconSize, sizes: theme2.space })}px`,
      position: "static",
      margin: 0,
      ml: 0,
      mr: 0,
      mt: 0,
      mb: 0
    }
  }));
  function create_if_block_1$4(ctx) {
    let if_block_anchor, if_block = (
      /*icon*/
      (ctx[2] instanceof HTMLElement || /*icon*/
      ctx[2] instanceof SVGElement) && create_if_block_2$4(ctx)
    );
    return {
      c() {
        if_block && if_block.c(), if_block_anchor = empty();
      },
      m(target, anchor) {
        if_block && if_block.m(target, anchor), insert(target, if_block_anchor, anchor);
      },
      p(ctx2, dirty) {
        /*icon*/
        ctx2[2] instanceof HTMLElement || /*icon*/
        ctx2[2] instanceof SVGElement ? if_block ? if_block.p(ctx2, dirty) : (if_block = create_if_block_2$4(ctx2), if_block.c(), if_block.m(if_block_anchor.parentNode, if_block_anchor)) : if_block && (if_block.d(1), if_block = null);
      },
      i: noop,
      o: noop,
      d(detaching) {
        if_block && if_block.d(detaching), detaching && detach(if_block_anchor);
      }
    };
  }
  function create_if_block$6(ctx) {
    let switch_instance, switch_instance_anchor, current;
    const switch_instance_spread_levels = [
      {
        class: (
          /*cx*/
          ctx[5](
            /*className*/
            ctx[0],
            /*getStyles*/
            ctx[4]({ css: (
              /*override*/
              ctx[1]
            ) })
          )
        )
      },
      /*iconProps*/
      ctx[3]
    ];
    var switch_value = (
      /*icon*/
      ctx[2]
    );
    function switch_props(ctx2) {
      let switch_instance_props = {};
      for (let i2 = 0; i2 < switch_instance_spread_levels.length; i2 += 1)
        switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i2]);
      return { props: switch_instance_props };
    }
    return switch_value && (switch_instance = construct_svelte_component(switch_value, switch_props())), {
      c() {
        switch_instance && create_component(switch_instance.$$.fragment), switch_instance_anchor = empty();
      },
      m(target, anchor) {
        switch_instance && mount_component(switch_instance, target, anchor), insert(target, switch_instance_anchor, anchor), current = !0;
      },
      p(ctx2, dirty) {
        const switch_instance_changes = dirty & /*cx, className, getStyles, override, iconProps*/
        59 ? get_spread_update(switch_instance_spread_levels, [
          dirty & /*cx, className, getStyles, override*/
          51 && {
            class: (
              /*cx*/
              ctx2[5](
                /*className*/
                ctx2[0],
                /*getStyles*/
                ctx2[4]({ css: (
                  /*override*/
                  ctx2[1]
                ) })
              )
            )
          },
          dirty & /*iconProps*/
          8 && get_spread_object(
            /*iconProps*/
            ctx2[3]
          )
        ]) : {};
        if (switch_value !== (switch_value = /*icon*/
        ctx2[2])) {
          if (switch_instance) {
            group_outros();
            const old_component = switch_instance;
            transition_out(old_component.$$.fragment, 1, 0, () => {
              destroy_component(old_component, 1);
            }), check_outros();
          }
          switch_value ? (switch_instance = construct_svelte_component(switch_value, switch_props()), create_component(switch_instance.$$.fragment), transition_in(switch_instance.$$.fragment, 1), mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor)) : switch_instance = null;
        } else
          switch_value && switch_instance.$set(switch_instance_changes);
      },
      i(local) {
        current || (switch_instance && transition_in(switch_instance.$$.fragment, local), current = !0);
      },
      o(local) {
        switch_instance && transition_out(switch_instance.$$.fragment, local), current = !1;
      },
      d(detaching) {
        detaching && detach(switch_instance_anchor), switch_instance && destroy_component(switch_instance, detaching);
      }
    };
  }
  function create_if_block_2$4(ctx) {
    let span, raw_value = (
      /*icon*/
      ctx[2].outerHTML + ""
    ), span_class_value;
    return {
      c() {
        span = element("span"), attr(span, "class", span_class_value = /*cx*/
        ctx[5](
          /*className*/
          ctx[0],
          /*getStyles*/
          ctx[4]({ css: (
            /*override*/
            ctx[1]
          ) })
        ));
      },
      m(target, anchor) {
        insert(target, span, anchor), span.innerHTML = raw_value;
      },
      p(ctx2, dirty) {
        dirty & /*icon*/
        4 && raw_value !== (raw_value = /*icon*/
        ctx2[2].outerHTML + "") && (span.innerHTML = raw_value), dirty & /*cx, className, getStyles, override*/
        51 && span_class_value !== (span_class_value = /*cx*/
        ctx2[5](
          /*className*/
          ctx2[0],
          /*getStyles*/
          ctx2[4]({ css: (
            /*override*/
            ctx2[1]
          ) })
        )) && attr(span, "class", span_class_value);
      },
      d(detaching) {
        detaching && detach(span);
      }
    };
  }
  function create_fragment$e(ctx) {
    let current_block_type_index, if_block, if_block_anchor, current;
    const if_block_creators = [create_if_block$6, create_if_block_1$4], if_blocks = [];
    function select_block_type(ctx2, dirty) {
      return typeof /*icon*/
      ctx2[2] == "function" ? 0 : (
        /*requiresShim*/
        ctx2[6] ? -1 : 1
      );
    }
    return ~(current_block_type_index = select_block_type(ctx)) && (if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx)), {
      c() {
        if_block && if_block.c(), if_block_anchor = empty();
      },
      m(target, anchor) {
        ~current_block_type_index && if_blocks[current_block_type_index].m(target, anchor), insert(target, if_block_anchor, anchor), current = !0;
      },
      p(ctx2, [dirty]) {
        let previous_block_index = current_block_type_index;
        current_block_type_index = select_block_type(ctx2), current_block_type_index === previous_block_index ? ~current_block_type_index && if_blocks[current_block_type_index].p(ctx2, dirty) : (if_block && (group_outros(), transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        }), check_outros()), ~current_block_type_index ? (if_block = if_blocks[current_block_type_index], if_block ? if_block.p(ctx2, dirty) : (if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2), if_block.c()), transition_in(if_block, 1), if_block.m(if_block_anchor.parentNode, if_block_anchor)) : if_block = null);
      },
      i(local) {
        current || (transition_in(if_block), current = !0);
      },
      o(local) {
        transition_out(if_block), current = !1;
      },
      d(detaching) {
        ~current_block_type_index && if_blocks[current_block_type_index].d(detaching), detaching && detach(if_block_anchor);
      }
    };
  }
  function instance$e($$self, $$props, $$invalidate) {
    let cx2, getStyles, classes, { className = "", override = {}, icon = void 0, iconSize = 16, iconProps = {} } = $$props;
    const requiresShim = typeof HTMLElement > "u" && typeof SVGElement > "u";
    return $$self.$$set = ($$props2) => {
      "className" in $$props2 && $$invalidate(0, className = $$props2.className), "override" in $$props2 && $$invalidate(1, override = $$props2.override), "icon" in $$props2 && $$invalidate(2, icon = $$props2.icon), "iconSize" in $$props2 && $$invalidate(7, iconSize = $$props2.iconSize), "iconProps" in $$props2 && $$invalidate(3, iconProps = $$props2.iconProps);
    }, $$self.$$.update = () => {
      $$self.$$.dirty & /*iconSize*/
      128 && $$invalidate(5, { cx: cx2, getStyles, classes } = useStyles$5({ iconSize }, { name: "IconRenderer" }), cx2, ($$invalidate(4, getStyles), $$invalidate(7, iconSize)), ($$invalidate(8, classes), $$invalidate(7, iconSize))), $$self.$$.dirty & /*icon, classes*/
      260 && !requiresShim && (icon instanceof HTMLElement || icon instanceof SVGElement) && icon.classList.add(...classes.icon.split(" "));
    }, [
      className,
      override,
      icon,
      iconProps,
      getStyles,
      cx2,
      requiresShim,
      iconSize,
      classes
    ];
  }
  class IconRenderer extends SvelteComponent {
    constructor(options) {
      super(), init(this, options, instance$e, create_fragment$e, safe_not_equal, {
        className: 0,
        override: 1,
        icon: 2,
        iconSize: 7,
        iconProps: 3
      });
    }
  }
  const IconRenderer$1 = IconRenderer;
  function getTextColor(color, variant2, gradient, dark2 = !1) {
    if (color === "dimmed")
      return dark2 ? "$dark200" : "$gray600";
    if (variant2 === "gradient" || gradient)
      return `$${color}600`;
    if (variant2 === "link")
      return dark2 ? "$blue400" : "$blue700";
    if (variant2 === "text")
      return dark2 ? `$${color}500` : `$${color}700`;
  }
  const useStyles$4 = createStyles((theme2, { align, color, inherit, inline, lineClamp, size: size2, tracking, transform: transform2, underline, weight, gradient, variant: variant2 }) => ({
    root: {
      focusRing: "auto",
      [`${theme2.dark} &`]: {
        color: color === "dark" ? "$dark50" : getTextColor(color, variant2, gradient, !0)
      },
      fontFamily: inherit ? "inherit" : "$standard",
      fontSize: inherit ? "inherit" : typeof size2 == "string" ? `$${size2}` : `${size2}px`,
      fontWeight: inherit ? "inherit" : `$${weight}`,
      letterSpacing: theme2.letterSpacings[tracking]?.value,
      lineHeight: inherit ? "inherit" : inline ? 1 : typeof size2 == "string" ? `$${size2}` : `${size2}px`,
      textTransform: transform2,
      textDecoration: underline ? "underline" : "none",
      textAlign: align,
      cursor: variant2 === "link" ? "pointer" : "inherit",
      color: color === "green" ? "Black" : getTextColor(color, variant2, gradient),
      backgroundImage: variant2 === "gradient" ? `linear-gradient(${gradient?.deg}deg, $${gradient?.from}600 0%, $${gradient?.to}600 100%)` : null,
      WebkitBackgroundClip: variant2 === "gradient" ? "text" : null,
      WebkitTextFillColor: variant2 === "gradient" ? "transparent" : null,
      ...lineClamp !== void 0 ? {
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitLineClamp: lineClamp,
        WebkitBoxOrient: "vertical"
      } : {},
      "&:hover": variant2 === "link" && underline === !0 ? {
        textDecoration: "underline"
      } : void 0
    }
  })), TextErrors = Object.freeze([
    {
      error: !0,
      message: "If using the 'gradient' prop, set 'variant' prop to 'gradient' to apply the gradient",
      solution: `
                If your component looks like this:

                &lt;Text gradient={{from: 'blue', to: 'red', deg: 45}}&gt;Text string &lt;/Text&gt;
                                                                    ^^^ - Try adding prop variant='gradient'
                `
    },
    {
      error: !0,
      message: "If using the 'link' variant, an href needs to be set and the root must be an anchor",
      solution: `
                If your component looks like this:

                &lt;Text variant='link'&gt;Text string &lt;/Text&gt;
                                    ^^^ - Try adding props href && root={'a'}'
                `
    }
  ]);
  function create_default_slot$7(ctx) {
    let current;
    const default_slot_template = (
      /*#slots*/
      ctx[24].default
    ), default_slot = create_slot(
      default_slot_template,
      ctx,
      /*$$scope*/
      ctx[26],
      null
    );
    return {
      c() {
        default_slot && default_slot.c();
      },
      m(target, anchor) {
        default_slot && default_slot.m(target, anchor), current = !0;
      },
      p(ctx2, dirty) {
        default_slot && default_slot.p && (!current || dirty & /*$$scope*/
        67108864) && update_slot_base(
          default_slot,
          default_slot_template,
          ctx2,
          /*$$scope*/
          ctx2[26],
          current ? get_slot_changes(
            default_slot_template,
            /*$$scope*/
            ctx2[26],
            dirty,
            null
          ) : get_all_dirty_from_scope(
            /*$$scope*/
            ctx2[26]
          ),
          null
        );
      },
      i(local) {
        current || (transition_in(default_slot, local), current = !0);
      },
      o(local) {
        transition_out(default_slot, local), current = !1;
      },
      d(detaching) {
        default_slot && default_slot.d(detaching);
      }
    };
  }
  function create_fragment$d(ctx) {
    let error, t2, box, updating_element, current;
    error = new Error$2({
      props: {
        observable: (
          /*observable*/
          ctx[6]
        ),
        component: "Text",
        code: (
          /*err*/
          ctx[7]
        )
      }
    });
    const box_spread_levels = [
      { root: (
        /*root*/
        ctx[4]
      ) },
      {
        use: [
          /*forwardEvents*/
          ctx[10],
          [
            useActions,
            /*use*/
            ctx[1]
          ]
        ]
      },
      {
        class: (
          /*cx*/
          ctx[9](
            /*className*/
            ctx[2],
            /*getStyles*/
            ctx[8]({ css: (
              /*override*/
              ctx[3]
            ) })
          )
        )
      },
      { href: (
        /*href*/
        ctx[5] ?? void 0
      ) },
      /*$$restProps*/
      ctx[11]
    ];
    function box_element_binding(value) {
      ctx[25](value);
    }
    let box_props = {
      $$slots: { default: [create_default_slot$7] },
      $$scope: { ctx }
    };
    for (let i2 = 0; i2 < box_spread_levels.length; i2 += 1)
      box_props = assign(box_props, box_spread_levels[i2]);
    return (
      /*element*/
      ctx[0] !== void 0 && (box_props.element = /*element*/
      ctx[0]), box = new Box$1({ props: box_props }), binding_callbacks.push(() => bind(box, "element", box_element_binding)), {
        c() {
          create_component(error.$$.fragment), t2 = space(), create_component(box.$$.fragment);
        },
        m(target, anchor) {
          mount_component(error, target, anchor), insert(target, t2, anchor), mount_component(box, target, anchor), current = !0;
        },
        p(ctx2, [dirty]) {
          const error_changes = {};
          dirty & /*observable*/
          64 && (error_changes.observable = /*observable*/
          ctx2[6]), dirty & /*err*/
          128 && (error_changes.code = /*err*/
          ctx2[7]), error.$set(error_changes);
          const box_changes = dirty & /*root, forwardEvents, useActions, use, cx, className, getStyles, override, href, undefined, $$restProps*/
          3902 ? get_spread_update(box_spread_levels, [
            dirty & /*root*/
            16 && { root: (
              /*root*/
              ctx2[4]
            ) },
            dirty & /*forwardEvents, useActions, use*/
            1026 && {
              use: [
                /*forwardEvents*/
                ctx2[10],
                [
                  useActions,
                  /*use*/
                  ctx2[1]
                ]
              ]
            },
            dirty & /*cx, className, getStyles, override*/
            780 && {
              class: (
                /*cx*/
                ctx2[9](
                  /*className*/
                  ctx2[2],
                  /*getStyles*/
                  ctx2[8]({ css: (
                    /*override*/
                    ctx2[3]
                  ) })
                )
              )
            },
            dirty & /*href, undefined*/
            32 && { href: (
              /*href*/
              ctx2[5] ?? void 0
            ) },
            dirty & /*$$restProps*/
            2048 && get_spread_object(
              /*$$restProps*/
              ctx2[11]
            )
          ]) : {};
          dirty & /*$$scope*/
          67108864 && (box_changes.$$scope = { dirty, ctx: ctx2 }), !updating_element && dirty & /*element*/
          1 && (updating_element = !0, box_changes.element = /*element*/
          ctx2[0], add_flush_callback(() => updating_element = !1)), box.$set(box_changes);
        },
        i(local) {
          current || (transition_in(error.$$.fragment, local), transition_in(box.$$.fragment, local), current = !0);
        },
        o(local) {
          transition_out(error.$$.fragment, local), transition_out(box.$$.fragment, local), current = !1;
        },
        d(detaching) {
          destroy_component(error, detaching), detaching && detach(t2), destroy_component(box, detaching);
        }
      }
    );
  }
  function instance$d($$self, $$props, $$invalidate) {
    let cx2, getStyles;
    const omit_props_names = [
      "use",
      "element",
      "class",
      "override",
      "align",
      "color",
      "root",
      "transform",
      "variant",
      "size",
      "weight",
      "gradient",
      "inline",
      "lineClamp",
      "underline",
      "inherit",
      "href",
      "tracking"
    ];
    let $$restProps = compute_rest_props($$props, omit_props_names), { $$slots: slots = {}, $$scope } = $$props, { use = [], element: element2 = void 0, class: className = "", override = {}, align = "left", color = "dark", root: root2 = void 0, transform: transform2 = "none", variant: variant2 = "text", size: size2 = "md", weight = "normal", gradient = { from: "indigo", to: "cyan", deg: 45 }, inline = !0, lineClamp = void 0, underline = !1, inherit = !1, href = "", tracking = "normal" } = $$props;
    const forwardEvents = createEventForwarder(get_current_component());
    let observable = !1, err;
    gradient.from === "indigo" && gradient.to === "cyan0" && gradient.deg === 45 && variant2 !== "gradient" && (observable = !0, err = TextErrors[0]);
    function box_element_binding(value) {
      element2 = value, $$invalidate(0, element2);
    }
    return $$self.$$set = ($$new_props) => {
      $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)), $$invalidate(11, $$restProps = compute_rest_props($$props, omit_props_names)), "use" in $$new_props && $$invalidate(1, use = $$new_props.use), "element" in $$new_props && $$invalidate(0, element2 = $$new_props.element), "class" in $$new_props && $$invalidate(2, className = $$new_props.class), "override" in $$new_props && $$invalidate(3, override = $$new_props.override), "align" in $$new_props && $$invalidate(12, align = $$new_props.align), "color" in $$new_props && $$invalidate(13, color = $$new_props.color), "root" in $$new_props && $$invalidate(4, root2 = $$new_props.root), "transform" in $$new_props && $$invalidate(14, transform2 = $$new_props.transform), "variant" in $$new_props && $$invalidate(15, variant2 = $$new_props.variant), "size" in $$new_props && $$invalidate(16, size2 = $$new_props.size), "weight" in $$new_props && $$invalidate(17, weight = $$new_props.weight), "gradient" in $$new_props && $$invalidate(18, gradient = $$new_props.gradient), "inline" in $$new_props && $$invalidate(19, inline = $$new_props.inline), "lineClamp" in $$new_props && $$invalidate(20, lineClamp = $$new_props.lineClamp), "underline" in $$new_props && $$invalidate(21, underline = $$new_props.underline), "inherit" in $$new_props && $$invalidate(22, inherit = $$new_props.inherit), "href" in $$new_props && $$invalidate(5, href = $$new_props.href), "tracking" in $$new_props && $$invalidate(23, tracking = $$new_props.tracking), "$$scope" in $$new_props && $$invalidate(26, $$scope = $$new_props.$$scope);
    }, $$self.$$.update = () => {
      $$self.$$.dirty & /*lineClamp, underline, inline, inherit, gradient, variant, align, color, transform, size, weight, tracking*/
      16773120 && $$invalidate(
        9,
        { cx: cx2, getStyles } = useStyles$4(
          {
            lineClamp,
            underline,
            inline,
            inherit,
            gradient,
            variant: variant2,
            align,
            color,
            transform: transform2,
            size: size2,
            weight,
            tracking
          },
          { name: "Text" }
        ),
        cx2,
        ($$invalidate(8, getStyles), $$invalidate(20, lineClamp), $$invalidate(21, underline), $$invalidate(19, inline), $$invalidate(22, inherit), $$invalidate(18, gradient), $$invalidate(15, variant2), $$invalidate(12, align), $$invalidate(13, color), $$invalidate(14, transform2), $$invalidate(16, size2), $$invalidate(17, weight), $$invalidate(23, tracking))
      );
    }, [
      element2,
      use,
      className,
      override,
      root2,
      href,
      observable,
      err,
      getStyles,
      cx2,
      forwardEvents,
      $$restProps,
      align,
      color,
      transform2,
      variant2,
      size2,
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
      super(), init(this, options, instance$d, create_fragment$d, safe_not_equal, {
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
  const Text$1 = Text, sizes$1 = {
    xs: {
      height: 30,
      padding: "0px 14px"
    },
    sm: {
      height: 36,
      padding: "0px 18px"
    },
    md: {
      height: 42,
      padding: "0px 22px"
    },
    lg: {
      height: 50,
      padding: "0px 26px"
    },
    xl: {
      height: 60,
      padding: "0px 32px"
    },
    "compact-xs": {
      height: 22,
      padding: "0 7px"
    },
    "compact-sm": {
      height: 26,
      padding: "0 8px"
    },
    "compact-md": {
      height: 30,
      padding: "0 10px"
    },
    "compact-lg": {
      height: 34,
      padding: "0 12px"
    },
    "compact-xl": {
      height: 40,
      padding: "0 14px"
    }
  }, useStyles$3 = createStyles((theme2, { color, compact, fullSize, gradient, radius: radius2, size: size2, variant: variant2 }) => ({
    root: {
      focusRing: "auto",
      cursor: "pointer",
      position: "relative",
      boxSizing: "border-box",
      textDecoration: "none",
      outline: "none",
      userSelect: "none",
      appearance: "none",
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: null,
      borderRadius: typeof radius2 == "number" ? radius2 : `$${radius2}`,
      height: typeof size2 == "number" ? `${size2}px` : sizes$1[compact ? `compact-${size2}` : size2].height,
      padding: typeof size2 == "number" ? `0px ${size2}px` : sizes$1[compact ? `compact-${size2}` : size2].padding,
      fontFamily: "$standard",
      fontWeight: "$SemiBold",
      fontSize: `$${size2}`,
      lineHeight: 1,
      flexGrow: 0,
      width: fullSize ? "100%" : "auto",
      "&:hover": {
        backgroundColor: variant2 === "gradient" ? null : theme2.fn.themeColor(color, 7),
        backgroundSize: variant2 === "gradient" ? "200%" : null
      },
      "&:active": {
        transform: "translateY(1px)"
      },
      "&.disabled": {
        pointerEvents: "none",
        borderColor: "transparent",
        backgroundColor: "rgb(233, 236, 239)",
        background: "rgb(233, 236, 239)",
        color: "rgb(173, 181, 189)",
        cursor: "not-allowed"
      },
      "&.loading": {
        pointerEvents: "none",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: -1,
          backgroundColor: "rgba(255, 255, 255, .5)",
          borderRadius: `$${radius2}`,
          cursor: "not-allowed"
        }
      }
    },
    variants: {
      variation: vFunc(color, gradient)
    }
  })), ButtonErrors = Object.freeze([
    {
      error: !0,
      message: "If using the disabled prop, a loading cannot be set at the same time",
      solution: `
                If your component looks like this:
                
                &lt;Button disabled loading ...&gt; Button Text &lt;/Button&gt;
                         ^^^^^^^^ ^^^^^^^ - Try removing one of these
                `
    },
    {
      error: !0,
      message: "If using the external prop, a href prop must be associated with it. If you have an href prop there must be content inside.",
      solution: `
                If your component looks like this:
                
                &lt;Button external ...&gt; Button Text &lt;/Button&gt;
                         ^^^^^^^^ - Try adding the href prop too
                `
    }
  ]);
  function add_css$3(target) {
    append_styles(target, "svelte-3pkhve", `.ripple.svelte-3pkhve{display:block;position:absolute;top:0;left:0;right:0;bottom:0;overflow:hidden;border-radius:inherit;color:inherit;pointer-events:none;z-index:0;contain:strict}.ripple.svelte-3pkhve .animation{color:inherit;position:absolute;top:0;left:0;border-radius:50%;opacity:0;pointer-events:none;overflow:hidden;will-change:transform, opacity}.ripple.svelte-3pkhve .animation-enter{transition:none}.ripple.svelte-3pkhve .animation-in{transition:opacity 0.1s cubic-bezier(0.4, 0, 0.2, 1);transition:transform 0.25s cubic-bezier(0.4, 0, 0.2, 1),
			opacity 0.1s cubic-bezier(0.4, 0, 0.2, 1)}.ripple.svelte-3pkhve .animation-out{transition:opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)}`);
  }
  function create_fragment$c(ctx) {
    let div;
    return {
      c() {
        div = element("div"), attr(div, "class", "ripple svelte-3pkhve");
      },
      m(target, anchor) {
        insert(target, div, anchor), ctx[4](div);
      },
      p: noop,
      i: noop,
      o: noop,
      d(detaching) {
        detaching && detach(div), ctx[4](null);
      }
    };
  }
  function isTouchEvent(e) {
    return e.constructor.name === "TouchEvent";
  }
  function transform(el, value) {
    el.style.transform = value, el.style.webkitTransform = value;
  }
  function opacity(el, value) {
    el.style.opacity = value.toString();
  }
  const calculate = (e, el) => {
    const offset = el.getBoundingClientRect(), target = isTouchEvent(e) ? e.touches[e.touches.length - 1] : e, localX = target.clientX - offset.left, localY = target.clientY - offset.top;
    let radius2 = 0, scale = 0.3;
    const center = el.dataset.center;
    el.dataset.circle ? (scale = 0.15, radius2 = el.clientWidth / 2, radius2 = center ? radius2 : radius2 + Math.sqrt((localX - radius2) ** 2 + (localY - radius2) ** 2) / 4) : radius2 = Math.sqrt(el.clientWidth ** 2 + el.clientHeight ** 2) / 2;
    const centerX = `${(el.clientWidth - radius2 * 2) / 2}px`, centerY = `${(el.clientHeight - radius2 * 2) / 2}px`, x2 = center ? centerX : `${localX - radius2}px`, y2 = center ? centerY : `${localY - radius2}px`;
    return { radius: radius2, scale, x: x2, y: y2, centerX, centerY };
  }, startRipple = function(eventType, event) {
    const hideEvents = ["touchcancel", "mouseleave", "dragstart"];
    let container2 = event.currentTarget || event.target;
    if (container2 && !container2.classList.contains("ripple") && (container2 = container2.querySelector(".ripple")), !container2)
      return;
    const prev = container2.dataset.event;
    if (prev && prev !== eventType)
      return;
    container2.dataset.event = eventType;
    const wave = document.createElement("span"), { radius: radius2, scale, x: x2, y: y2, centerX, centerY } = calculate(event, container2), color = container2.dataset.color, size2 = `${radius2 * 2}px`;
    wave.className = "animation", wave.style.width = size2, wave.style.height = size2, wave.style.background = color, wave.classList.add("animation-enter"), wave.classList.add("animation--visible"), transform(wave, `translate(${x2}, ${y2}) scale3d(${scale},${scale},${scale})`), opacity(wave, 0), wave.dataset.activated = String(performance.now()), container2.appendChild(wave), setTimeout(
      () => {
        wave.classList.remove("animation-enter"), wave.classList.add("animation-in"), transform(wave, `translate(${centerX}, ${centerY}) scale3d(1,1,1)`), opacity(wave, 0.25);
      },
      0
    );
    const releaseEvent = eventType === "mousedown" ? "mouseup" : "touchend", onRelease = function() {
      document.removeEventListener(releaseEvent, onRelease), hideEvents.forEach((name) => {
        document.removeEventListener(name, onRelease);
      });
      const diff = performance.now() - Number(wave.dataset.activated), delay = Math.max(250 - diff, 0);
      setTimeout(
        () => {
          wave.classList.remove("animation-in"), wave.classList.add("animation-out"), opacity(wave, 0), setTimeout(
            () => {
              wave && container2.removeChild(wave), container2.children.length === 0 && delete container2.dataset.event;
            },
            300
          );
        },
        delay
      );
    };
    document.addEventListener(releaseEvent, onRelease), hideEvents.forEach((name) => {
      document.addEventListener(name, onRelease, { passive: !0 });
    });
  }, onMouseDown = function(e) {
    e.button === 0 && startRipple(e.type, e);
  }, onTouchStart = function(e) {
    if (e.changedTouches)
      for (let i2 = 0; i2 < e.changedTouches.length; ++i2)
        startRipple(e.type, e.changedTouches[i2]);
  };
  function instance$c($$self, $$props, $$invalidate) {
    let { center = !1 } = $$props, { circle = !1 } = $$props, { color = "currentColor" } = $$props, el, trigEl;
    onMount(async () => {
      await tick();
      try {
        center && $$invalidate(0, el.dataset.center = "true", el), circle && $$invalidate(0, el.dataset.circle = "true", el), $$invalidate(0, el.dataset.color = color, el), trigEl = el.parentElement;
      } catch {
      }
      if (!trigEl) {
        console.error("Ripple: Trigger element not found.");
        return;
      }
      let style2 = window.getComputedStyle(trigEl);
      (style2.position.length === 0 || style2.position === "static") && (trigEl.style.position = "relative"), trigEl.addEventListener("touchstart", onTouchStart, { passive: !0 }), trigEl.addEventListener("mousedown", onMouseDown, { passive: !0 });
    }), onDestroy(() => {
      trigEl && (trigEl.removeEventListener("mousedown", onMouseDown), trigEl.removeEventListener("touchstart", onTouchStart));
    });
    function div_binding($$value) {
      binding_callbacks[$$value ? "unshift" : "push"](() => {
        el = $$value, $$invalidate(0, el);
      });
    }
    return $$self.$$set = ($$props2) => {
      "center" in $$props2 && $$invalidate(1, center = $$props2.center), "circle" in $$props2 && $$invalidate(2, circle = $$props2.circle), "color" in $$props2 && $$invalidate(3, color = $$props2.color);
    }, [el, center, circle, color, div_binding];
  }
  class Ripple extends SvelteComponent {
    constructor(options) {
      super(), init(this, options, instance$c, create_fragment$c, safe_not_equal, { center: 1, circle: 2, color: 3 }, add_css$3);
    }
  }
  const Ripple$1 = Ripple;
  function add_css$2(target) {
    append_styles(target, "svelte-1n9fp7y", ".uppercase.svelte-1n9fp7y{text-transform:uppercase}.loader-left.svelte-1n9fp7y{margin-right:10px}.loader-right.svelte-1n9fp7y{margin-left:10px}");
  }
  const get_rightIcon_slot_changes_1 = (dirty) => ({}), get_rightIcon_slot_context_1 = (ctx) => ({}), get_leftIcon_slot_changes_1 = (dirty) => ({}), get_leftIcon_slot_context_1 = (ctx) => ({}), get_rightIcon_slot_changes = (dirty) => ({}), get_rightIcon_slot_context = (ctx) => ({}), get_leftIcon_slot_changes = (dirty) => ({}), get_leftIcon_slot_context = (ctx) => ({});
  function create_else_block$1(ctx) {
    let button, current_block_type_index, if_block0, t0, t1, t2, current_block_type_index_1, if_block2, button_class_value, useActions_action, current, mounted, dispose;
    const if_block_creators = [create_if_block_9, create_if_block_10], if_blocks = [];
    function select_block_type_3(ctx2, dirty) {
      return (
        /*loading*/
        ctx2[11] && /*loaderPosition*/
        ctx2[5] === "left" ? 0 : (
          /*$$slots*/
          ctx2[20].leftIcon ? 1 : -1
        )
      );
    }
    ~(current_block_type_index = select_block_type_3(ctx)) && (if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx));
    const default_slot_template = (
      /*#slots*/
      ctx[27].default
    ), default_slot = create_slot(
      default_slot_template,
      ctx,
      /*$$scope*/
      ctx[26],
      null
    ), default_slot_or_fallback = default_slot || fallback_block_4();
    let if_block1 = (
      /*ripple*/
      ctx[13] && create_if_block_8()
    );
    const if_block_creators_1 = [create_if_block_6, create_if_block_7], if_blocks_1 = [];
    function select_block_type_4(ctx2, dirty) {
      return (
        /*loading*/
        ctx2[11] && /*loaderPosition*/
        ctx2[5] === "right" ? 0 : (
          /*$$slots*/
          ctx2[20].rightIcon ? 1 : -1
        )
      );
    }
    ~(current_block_type_index_1 = select_block_type_4(ctx)) && (if_block2 = if_blocks_1[current_block_type_index_1] = if_block_creators_1[current_block_type_index_1](ctx));
    let button_levels = [
      {
        class: button_class_value = /*cx*/
        ctx[16](
          /*className*/
          ctx[3],
          /*getStyles*/
          ctx[17]({
            css: (
              /*override*/
              ctx[1]
            ),
            variation: (
              /*variant*/
              ctx[4]
            )
          }),
          {
            disabled: (
              /*disabled*/
              ctx[9]
            ),
            loading: (
              /*loading*/
              ctx[11]
            )
          }
        )
      },
      { disabled: (
        /*disabled*/
        ctx[9]
      ) },
      /*$$restProps*/
      ctx[19],
      { tabindex: "0" }
    ], button_data = {};
    for (let i2 = 0; i2 < button_levels.length; i2 += 1)
      button_data = assign(button_data, button_levels[i2]);
    return {
      c() {
        button = element("button"), if_block0 && if_block0.c(), t0 = space(), default_slot_or_fallback && default_slot_or_fallback.c(), t1 = space(), if_block1 && if_block1.c(), t2 = space(), if_block2 && if_block2.c(), set_attributes(button, button_data), toggle_class(
          button,
          "compact",
          /*compact*/
          ctx[10]
        ), toggle_class(
          button,
          "uppercase",
          /*uppercase*/
          ctx[12]
        ), toggle_class(button, "svelte-1n9fp7y", !0);
      },
      m(target, anchor) {
        insert(target, button, anchor), ~current_block_type_index && if_blocks[current_block_type_index].m(button, null), append(button, t0), default_slot_or_fallback && default_slot_or_fallback.m(button, null), append(button, t1), if_block1 && if_block1.m(button, null), append(button, t2), ~current_block_type_index_1 && if_blocks_1[current_block_type_index_1].m(button, null), button.autofocus && button.focus(), ctx[29](button), current = !0, mounted || (dispose = [
          action_destroyer(useActions_action = useActions.call(
            null,
            button,
            /*use*/
            ctx[2]
          )),
          action_destroyer(
            /*forwardEvents*/
            ctx[18].call(null, button)
          )
        ], mounted = !0);
      },
      p(ctx2, dirty) {
        let previous_block_index = current_block_type_index;
        current_block_type_index = select_block_type_3(ctx2), current_block_type_index === previous_block_index ? ~current_block_type_index && if_blocks[current_block_type_index].p(ctx2, dirty) : (if_block0 && (group_outros(), transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        }), check_outros()), ~current_block_type_index ? (if_block0 = if_blocks[current_block_type_index], if_block0 ? if_block0.p(ctx2, dirty) : (if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2), if_block0.c()), transition_in(if_block0, 1), if_block0.m(button, t0)) : if_block0 = null), default_slot && default_slot.p && (!current || dirty & /*$$scope*/
        67108864) && update_slot_base(
          default_slot,
          default_slot_template,
          ctx2,
          /*$$scope*/
          ctx2[26],
          current ? get_slot_changes(
            default_slot_template,
            /*$$scope*/
            ctx2[26],
            dirty,
            null
          ) : get_all_dirty_from_scope(
            /*$$scope*/
            ctx2[26]
          ),
          null
        ), /*ripple*/
        ctx2[13] ? if_block1 ? dirty & /*ripple*/
        8192 && transition_in(if_block1, 1) : (if_block1 = create_if_block_8(), if_block1.c(), transition_in(if_block1, 1), if_block1.m(button, t2)) : if_block1 && (group_outros(), transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        }), check_outros());
        let previous_block_index_1 = current_block_type_index_1;
        current_block_type_index_1 = select_block_type_4(ctx2), current_block_type_index_1 === previous_block_index_1 ? ~current_block_type_index_1 && if_blocks_1[current_block_type_index_1].p(ctx2, dirty) : (if_block2 && (group_outros(), transition_out(if_blocks_1[previous_block_index_1], 1, 1, () => {
          if_blocks_1[previous_block_index_1] = null;
        }), check_outros()), ~current_block_type_index_1 ? (if_block2 = if_blocks_1[current_block_type_index_1], if_block2 ? if_block2.p(ctx2, dirty) : (if_block2 = if_blocks_1[current_block_type_index_1] = if_block_creators_1[current_block_type_index_1](ctx2), if_block2.c()), transition_in(if_block2, 1), if_block2.m(button, null)) : if_block2 = null), set_attributes(button, button_data = get_spread_update(button_levels, [
          (!current || dirty & /*cx, className, getStyles, override, variant, disabled, loading*/
          199194 && button_class_value !== (button_class_value = /*cx*/
          ctx2[16](
            /*className*/
            ctx2[3],
            /*getStyles*/
            ctx2[17]({
              css: (
                /*override*/
                ctx2[1]
              ),
              variation: (
                /*variant*/
                ctx2[4]
              )
            }),
            {
              disabled: (
                /*disabled*/
                ctx2[9]
              ),
              loading: (
                /*loading*/
                ctx2[11]
              )
            }
          ))) && { class: button_class_value },
          (!current || dirty & /*disabled*/
          512) && { disabled: (
            /*disabled*/
            ctx2[9]
          ) },
          dirty & /*$$restProps*/
          524288 && /*$$restProps*/
          ctx2[19],
          { tabindex: "0" }
        ])), useActions_action && is_function(useActions_action.update) && dirty & /*use*/
        4 && useActions_action.update.call(
          null,
          /*use*/
          ctx2[2]
        ), toggle_class(
          button,
          "compact",
          /*compact*/
          ctx2[10]
        ), toggle_class(
          button,
          "uppercase",
          /*uppercase*/
          ctx2[12]
        ), toggle_class(button, "svelte-1n9fp7y", !0);
      },
      i(local) {
        current || (transition_in(if_block0), transition_in(default_slot_or_fallback, local), transition_in(if_block1), transition_in(if_block2), current = !0);
      },
      o(local) {
        transition_out(if_block0), transition_out(default_slot_or_fallback, local), transition_out(if_block1), transition_out(if_block2), current = !1;
      },
      d(detaching) {
        detaching && detach(button), ~current_block_type_index && if_blocks[current_block_type_index].d(), default_slot_or_fallback && default_slot_or_fallback.d(detaching), if_block1 && if_block1.d(), ~current_block_type_index_1 && if_blocks_1[current_block_type_index_1].d(), ctx[29](null), mounted = !1, run_all(dispose);
      }
    };
  }
  function create_if_block$5(ctx) {
    let a2, current_block_type_index, if_block0, t0, t1, t2, current_block_type_index_1, if_block2, a_class_value, a_target_value, useActions_action, current, mounted, dispose;
    const if_block_creators = [create_if_block_4$1, create_if_block_5], if_blocks = [];
    function select_block_type_1(ctx2, dirty) {
      return (
        /*loading*/
        ctx2[11] && /*loaderPosition*/
        ctx2[5] === "left" ? 0 : (
          /*$$slots*/
          ctx2[20].leftIcon ? 1 : -1
        )
      );
    }
    ~(current_block_type_index = select_block_type_1(ctx)) && (if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx));
    const default_slot_template = (
      /*#slots*/
      ctx[27].default
    ), default_slot = create_slot(
      default_slot_template,
      ctx,
      /*$$scope*/
      ctx[26],
      null
    ), default_slot_or_fallback = default_slot || fallback_block_1();
    let if_block1 = (
      /*ripple*/
      ctx[13] && create_if_block_3$1()
    );
    const if_block_creators_1 = [create_if_block_1$3, create_if_block_2$3], if_blocks_1 = [];
    function select_block_type_2(ctx2, dirty) {
      return (
        /*loading*/
        ctx2[11] && /*loaderPosition*/
        ctx2[5] === "right" ? 0 : (
          /*$$slots*/
          ctx2[20].rightIcon ? 1 : -1
        )
      );
    }
    ~(current_block_type_index_1 = select_block_type_2(ctx)) && (if_block2 = if_blocks_1[current_block_type_index_1] = if_block_creators_1[current_block_type_index_1](ctx));
    let a_levels = [
      { href: (
        /*href*/
        ctx[7]
      ) },
      {
        class: a_class_value = /*cx*/
        ctx[16](
          /*className*/
          ctx[3],
          /*getStyles*/
          ctx[17]({
            css: (
              /*override*/
              ctx[1]
            ),
            variation: (
              /*variant*/
              ctx[4]
            )
          }),
          {
            disabled: (
              /*disabled*/
              ctx[9]
            ),
            loading: (
              /*loading*/
              ctx[11]
            )
          }
        )
      },
      { role: "button" },
      { rel: "noreferrer noopener" },
      {
        target: a_target_value = /*external*/
        ctx[8] ? "_blank" : "_self"
      },
      /*$$restProps*/
      ctx[19],
      { tabindex: "0" }
    ], a_data = {};
    for (let i2 = 0; i2 < a_levels.length; i2 += 1)
      a_data = assign(a_data, a_levels[i2]);
    return {
      c() {
        a2 = element("a"), if_block0 && if_block0.c(), t0 = space(), default_slot_or_fallback && default_slot_or_fallback.c(), t1 = space(), if_block1 && if_block1.c(), t2 = space(), if_block2 && if_block2.c(), set_attributes(a2, a_data), toggle_class(
          a2,
          "compact",
          /*compact*/
          ctx[10]
        ), toggle_class(
          a2,
          "uppercase",
          /*uppercase*/
          ctx[12]
        ), toggle_class(a2, "svelte-1n9fp7y", !0);
      },
      m(target, anchor) {
        insert(target, a2, anchor), ~current_block_type_index && if_blocks[current_block_type_index].m(a2, null), append(a2, t0), default_slot_or_fallback && default_slot_or_fallback.m(a2, null), append(a2, t1), if_block1 && if_block1.m(a2, null), append(a2, t2), ~current_block_type_index_1 && if_blocks_1[current_block_type_index_1].m(a2, null), ctx[28](a2), current = !0, mounted || (dispose = [
          action_destroyer(useActions_action = useActions.call(
            null,
            a2,
            /*use*/
            ctx[2]
          )),
          action_destroyer(
            /*forwardEvents*/
            ctx[18].call(null, a2)
          )
        ], mounted = !0);
      },
      p(ctx2, dirty) {
        let previous_block_index = current_block_type_index;
        current_block_type_index = select_block_type_1(ctx2), current_block_type_index === previous_block_index ? ~current_block_type_index && if_blocks[current_block_type_index].p(ctx2, dirty) : (if_block0 && (group_outros(), transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        }), check_outros()), ~current_block_type_index ? (if_block0 = if_blocks[current_block_type_index], if_block0 ? if_block0.p(ctx2, dirty) : (if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2), if_block0.c()), transition_in(if_block0, 1), if_block0.m(a2, t0)) : if_block0 = null), default_slot && default_slot.p && (!current || dirty & /*$$scope*/
        67108864) && update_slot_base(
          default_slot,
          default_slot_template,
          ctx2,
          /*$$scope*/
          ctx2[26],
          current ? get_slot_changes(
            default_slot_template,
            /*$$scope*/
            ctx2[26],
            dirty,
            null
          ) : get_all_dirty_from_scope(
            /*$$scope*/
            ctx2[26]
          ),
          null
        ), /*ripple*/
        ctx2[13] ? if_block1 ? dirty & /*ripple*/
        8192 && transition_in(if_block1, 1) : (if_block1 = create_if_block_3$1(), if_block1.c(), transition_in(if_block1, 1), if_block1.m(a2, t2)) : if_block1 && (group_outros(), transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        }), check_outros());
        let previous_block_index_1 = current_block_type_index_1;
        current_block_type_index_1 = select_block_type_2(ctx2), current_block_type_index_1 === previous_block_index_1 ? ~current_block_type_index_1 && if_blocks_1[current_block_type_index_1].p(ctx2, dirty) : (if_block2 && (group_outros(), transition_out(if_blocks_1[previous_block_index_1], 1, 1, () => {
          if_blocks_1[previous_block_index_1] = null;
        }), check_outros()), ~current_block_type_index_1 ? (if_block2 = if_blocks_1[current_block_type_index_1], if_block2 ? if_block2.p(ctx2, dirty) : (if_block2 = if_blocks_1[current_block_type_index_1] = if_block_creators_1[current_block_type_index_1](ctx2), if_block2.c()), transition_in(if_block2, 1), if_block2.m(a2, null)) : if_block2 = null), set_attributes(a2, a_data = get_spread_update(a_levels, [
          (!current || dirty & /*href*/
          128) && { href: (
            /*href*/
            ctx2[7]
          ) },
          (!current || dirty & /*cx, className, getStyles, override, variant, disabled, loading*/
          199194 && a_class_value !== (a_class_value = /*cx*/
          ctx2[16](
            /*className*/
            ctx2[3],
            /*getStyles*/
            ctx2[17]({
              css: (
                /*override*/
                ctx2[1]
              ),
              variation: (
                /*variant*/
                ctx2[4]
              )
            }),
            {
              disabled: (
                /*disabled*/
                ctx2[9]
              ),
              loading: (
                /*loading*/
                ctx2[11]
              )
            }
          ))) && { class: a_class_value },
          { role: "button" },
          { rel: "noreferrer noopener" },
          (!current || dirty & /*external*/
          256 && a_target_value !== (a_target_value = /*external*/
          ctx2[8] ? "_blank" : "_self")) && { target: a_target_value },
          dirty & /*$$restProps*/
          524288 && /*$$restProps*/
          ctx2[19],
          { tabindex: "0" }
        ])), useActions_action && is_function(useActions_action.update) && dirty & /*use*/
        4 && useActions_action.update.call(
          null,
          /*use*/
          ctx2[2]
        ), toggle_class(
          a2,
          "compact",
          /*compact*/
          ctx2[10]
        ), toggle_class(
          a2,
          "uppercase",
          /*uppercase*/
          ctx2[12]
        ), toggle_class(a2, "svelte-1n9fp7y", !0);
      },
      i(local) {
        current || (transition_in(if_block0), transition_in(default_slot_or_fallback, local), transition_in(if_block1), transition_in(if_block2), current = !0);
      },
      o(local) {
        transition_out(if_block0), transition_out(default_slot_or_fallback, local), transition_out(if_block1), transition_out(if_block2), current = !1;
      },
      d(detaching) {
        detaching && detach(a2), ~current_block_type_index && if_blocks[current_block_type_index].d(), default_slot_or_fallback && default_slot_or_fallback.d(detaching), if_block1 && if_block1.d(), ~current_block_type_index_1 && if_blocks_1[current_block_type_index_1].d(), ctx[28](null), mounted = !1, run_all(dispose);
      }
    };
  }
  function create_if_block_10(ctx) {
    let span, current;
    const leftIcon_slot_template = (
      /*#slots*/
      ctx[27].leftIcon
    ), leftIcon_slot = create_slot(
      leftIcon_slot_template,
      ctx,
      /*$$scope*/
      ctx[26],
      get_leftIcon_slot_context_1
    ), leftIcon_slot_or_fallback = leftIcon_slot || fallback_block_5();
    return {
      c() {
        span = element("span"), leftIcon_slot_or_fallback && leftIcon_slot_or_fallback.c(), attr(span, "class", "loader-left svelte-1n9fp7y");
      },
      m(target, anchor) {
        insert(target, span, anchor), leftIcon_slot_or_fallback && leftIcon_slot_or_fallback.m(span, null), current = !0;
      },
      p(ctx2, dirty) {
        leftIcon_slot && leftIcon_slot.p && (!current || dirty & /*$$scope*/
        67108864) && update_slot_base(
          leftIcon_slot,
          leftIcon_slot_template,
          ctx2,
          /*$$scope*/
          ctx2[26],
          current ? get_slot_changes(
            leftIcon_slot_template,
            /*$$scope*/
            ctx2[26],
            dirty,
            get_leftIcon_slot_changes_1
          ) : get_all_dirty_from_scope(
            /*$$scope*/
            ctx2[26]
          ),
          get_leftIcon_slot_context_1
        );
      },
      i(local) {
        current || (transition_in(leftIcon_slot_or_fallback, local), current = !0);
      },
      o(local) {
        transition_out(leftIcon_slot_or_fallback, local), current = !1;
      },
      d(detaching) {
        detaching && detach(span), leftIcon_slot_or_fallback && leftIcon_slot_or_fallback.d(detaching);
      }
    };
  }
  function create_if_block_9(ctx) {
    let span, loader, current;
    return loader = new Loader$1({
      props: {
        variant: (
          /*loaderProps*/
          ctx[6].variant
        ),
        size: (
          /*loaderProps*/
          ctx[6].size
        ),
        color: (
          /*loaderProps*/
          ctx[6].color
        )
      }
    }), {
      c() {
        span = element("span"), create_component(loader.$$.fragment), attr(span, "class", "loader-left svelte-1n9fp7y");
      },
      m(target, anchor) {
        insert(target, span, anchor), mount_component(loader, span, null), current = !0;
      },
      p(ctx2, dirty) {
        const loader_changes = {};
        dirty & /*loaderProps*/
        64 && (loader_changes.variant = /*loaderProps*/
        ctx2[6].variant), dirty & /*loaderProps*/
        64 && (loader_changes.size = /*loaderProps*/
        ctx2[6].size), dirty & /*loaderProps*/
        64 && (loader_changes.color = /*loaderProps*/
        ctx2[6].color), loader.$set(loader_changes);
      },
      i(local) {
        current || (transition_in(loader.$$.fragment, local), current = !0);
      },
      o(local) {
        transition_out(loader.$$.fragment, local), current = !1;
      },
      d(detaching) {
        detaching && detach(span), destroy_component(loader);
      }
    };
  }
  function fallback_block_5(ctx) {
    let t2;
    return {
      c() {
        t2 = text("X");
      },
      m(target, anchor) {
        insert(target, t2, anchor);
      },
      d(detaching) {
        detaching && detach(t2);
      }
    };
  }
  function fallback_block_4(ctx) {
    let t2;
    return {
      c() {
        t2 = text("Button");
      },
      m(target, anchor) {
        insert(target, t2, anchor);
      },
      d(detaching) {
        detaching && detach(t2);
      }
    };
  }
  function create_if_block_8(ctx) {
    let ripple_1, current;
    return ripple_1 = new Ripple$1({ props: { center: !1, circle: !1 } }), {
      c() {
        create_component(ripple_1.$$.fragment);
      },
      m(target, anchor) {
        mount_component(ripple_1, target, anchor), current = !0;
      },
      i(local) {
        current || (transition_in(ripple_1.$$.fragment, local), current = !0);
      },
      o(local) {
        transition_out(ripple_1.$$.fragment, local), current = !1;
      },
      d(detaching) {
        destroy_component(ripple_1, detaching);
      }
    };
  }
  function create_if_block_7(ctx) {
    let span, current;
    const rightIcon_slot_template = (
      /*#slots*/
      ctx[27].rightIcon
    ), rightIcon_slot = create_slot(
      rightIcon_slot_template,
      ctx,
      /*$$scope*/
      ctx[26],
      get_rightIcon_slot_context_1
    ), rightIcon_slot_or_fallback = rightIcon_slot || fallback_block_3();
    return {
      c() {
        span = element("span"), rightIcon_slot_or_fallback && rightIcon_slot_or_fallback.c(), attr(span, "class", "loader-right svelte-1n9fp7y");
      },
      m(target, anchor) {
        insert(target, span, anchor), rightIcon_slot_or_fallback && rightIcon_slot_or_fallback.m(span, null), current = !0;
      },
      p(ctx2, dirty) {
        rightIcon_slot && rightIcon_slot.p && (!current || dirty & /*$$scope*/
        67108864) && update_slot_base(
          rightIcon_slot,
          rightIcon_slot_template,
          ctx2,
          /*$$scope*/
          ctx2[26],
          current ? get_slot_changes(
            rightIcon_slot_template,
            /*$$scope*/
            ctx2[26],
            dirty,
            get_rightIcon_slot_changes_1
          ) : get_all_dirty_from_scope(
            /*$$scope*/
            ctx2[26]
          ),
          get_rightIcon_slot_context_1
        );
      },
      i(local) {
        current || (transition_in(rightIcon_slot_or_fallback, local), current = !0);
      },
      o(local) {
        transition_out(rightIcon_slot_or_fallback, local), current = !1;
      },
      d(detaching) {
        detaching && detach(span), rightIcon_slot_or_fallback && rightIcon_slot_or_fallback.d(detaching);
      }
    };
  }
  function create_if_block_6(ctx) {
    let span, loader, current;
    return loader = new Loader$1({
      props: {
        variant: (
          /*loaderProps*/
          ctx[6].variant
        ),
        size: (
          /*loaderProps*/
          ctx[6].size
        ),
        color: (
          /*loaderProps*/
          ctx[6].color
        )
      }
    }), {
      c() {
        span = element("span"), create_component(loader.$$.fragment), attr(span, "class", "loader-right svelte-1n9fp7y");
      },
      m(target, anchor) {
        insert(target, span, anchor), mount_component(loader, span, null), current = !0;
      },
      p(ctx2, dirty) {
        const loader_changes = {};
        dirty & /*loaderProps*/
        64 && (loader_changes.variant = /*loaderProps*/
        ctx2[6].variant), dirty & /*loaderProps*/
        64 && (loader_changes.size = /*loaderProps*/
        ctx2[6].size), dirty & /*loaderProps*/
        64 && (loader_changes.color = /*loaderProps*/
        ctx2[6].color), loader.$set(loader_changes);
      },
      i(local) {
        current || (transition_in(loader.$$.fragment, local), current = !0);
      },
      o(local) {
        transition_out(loader.$$.fragment, local), current = !1;
      },
      d(detaching) {
        detaching && detach(span), destroy_component(loader);
      }
    };
  }
  function fallback_block_3(ctx) {
    let t2;
    return {
      c() {
        t2 = text("X");
      },
      m(target, anchor) {
        insert(target, t2, anchor);
      },
      d(detaching) {
        detaching && detach(t2);
      }
    };
  }
  function create_if_block_5(ctx) {
    let span, current;
    const leftIcon_slot_template = (
      /*#slots*/
      ctx[27].leftIcon
    ), leftIcon_slot = create_slot(
      leftIcon_slot_template,
      ctx,
      /*$$scope*/
      ctx[26],
      get_leftIcon_slot_context
    ), leftIcon_slot_or_fallback = leftIcon_slot || fallback_block_2();
    return {
      c() {
        span = element("span"), leftIcon_slot_or_fallback && leftIcon_slot_or_fallback.c(), attr(span, "class", "loader-left svelte-1n9fp7y");
      },
      m(target, anchor) {
        insert(target, span, anchor), leftIcon_slot_or_fallback && leftIcon_slot_or_fallback.m(span, null), current = !0;
      },
      p(ctx2, dirty) {
        leftIcon_slot && leftIcon_slot.p && (!current || dirty & /*$$scope*/
        67108864) && update_slot_base(
          leftIcon_slot,
          leftIcon_slot_template,
          ctx2,
          /*$$scope*/
          ctx2[26],
          current ? get_slot_changes(
            leftIcon_slot_template,
            /*$$scope*/
            ctx2[26],
            dirty,
            get_leftIcon_slot_changes
          ) : get_all_dirty_from_scope(
            /*$$scope*/
            ctx2[26]
          ),
          get_leftIcon_slot_context
        );
      },
      i(local) {
        current || (transition_in(leftIcon_slot_or_fallback, local), current = !0);
      },
      o(local) {
        transition_out(leftIcon_slot_or_fallback, local), current = !1;
      },
      d(detaching) {
        detaching && detach(span), leftIcon_slot_or_fallback && leftIcon_slot_or_fallback.d(detaching);
      }
    };
  }
  function create_if_block_4$1(ctx) {
    let span, loader, current;
    return loader = new Loader$1({
      props: {
        variant: (
          /*loaderProps*/
          ctx[6].variant
        ),
        size: (
          /*loaderProps*/
          ctx[6].size
        ),
        color: (
          /*loaderProps*/
          ctx[6].color
        )
      }
    }), {
      c() {
        span = element("span"), create_component(loader.$$.fragment), attr(span, "class", "loader-left svelte-1n9fp7y");
      },
      m(target, anchor) {
        insert(target, span, anchor), mount_component(loader, span, null), current = !0;
      },
      p(ctx2, dirty) {
        const loader_changes = {};
        dirty & /*loaderProps*/
        64 && (loader_changes.variant = /*loaderProps*/
        ctx2[6].variant), dirty & /*loaderProps*/
        64 && (loader_changes.size = /*loaderProps*/
        ctx2[6].size), dirty & /*loaderProps*/
        64 && (loader_changes.color = /*loaderProps*/
        ctx2[6].color), loader.$set(loader_changes);
      },
      i(local) {
        current || (transition_in(loader.$$.fragment, local), current = !0);
      },
      o(local) {
        transition_out(loader.$$.fragment, local), current = !1;
      },
      d(detaching) {
        detaching && detach(span), destroy_component(loader);
      }
    };
  }
  function fallback_block_2(ctx) {
    let t2;
    return {
      c() {
        t2 = text("X");
      },
      m(target, anchor) {
        insert(target, t2, anchor);
      },
      d(detaching) {
        detaching && detach(t2);
      }
    };
  }
  function fallback_block_1(ctx) {
    let t2;
    return {
      c() {
        t2 = text("Button");
      },
      m(target, anchor) {
        insert(target, t2, anchor);
      },
      d(detaching) {
        detaching && detach(t2);
      }
    };
  }
  function create_if_block_3$1(ctx) {
    let ripple_1, current;
    return ripple_1 = new Ripple$1({ props: { center: !1, circle: !1 } }), {
      c() {
        create_component(ripple_1.$$.fragment);
      },
      m(target, anchor) {
        mount_component(ripple_1, target, anchor), current = !0;
      },
      i(local) {
        current || (transition_in(ripple_1.$$.fragment, local), current = !0);
      },
      o(local) {
        transition_out(ripple_1.$$.fragment, local), current = !1;
      },
      d(detaching) {
        destroy_component(ripple_1, detaching);
      }
    };
  }
  function create_if_block_2$3(ctx) {
    let span, current;
    const rightIcon_slot_template = (
      /*#slots*/
      ctx[27].rightIcon
    ), rightIcon_slot = create_slot(
      rightIcon_slot_template,
      ctx,
      /*$$scope*/
      ctx[26],
      get_rightIcon_slot_context
    ), rightIcon_slot_or_fallback = rightIcon_slot || fallback_block$1();
    return {
      c() {
        span = element("span"), rightIcon_slot_or_fallback && rightIcon_slot_or_fallback.c(), attr(span, "class", "loader-right svelte-1n9fp7y");
      },
      m(target, anchor) {
        insert(target, span, anchor), rightIcon_slot_or_fallback && rightIcon_slot_or_fallback.m(span, null), current = !0;
      },
      p(ctx2, dirty) {
        rightIcon_slot && rightIcon_slot.p && (!current || dirty & /*$$scope*/
        67108864) && update_slot_base(
          rightIcon_slot,
          rightIcon_slot_template,
          ctx2,
          /*$$scope*/
          ctx2[26],
          current ? get_slot_changes(
            rightIcon_slot_template,
            /*$$scope*/
            ctx2[26],
            dirty,
            get_rightIcon_slot_changes
          ) : get_all_dirty_from_scope(
            /*$$scope*/
            ctx2[26]
          ),
          get_rightIcon_slot_context
        );
      },
      i(local) {
        current || (transition_in(rightIcon_slot_or_fallback, local), current = !0);
      },
      o(local) {
        transition_out(rightIcon_slot_or_fallback, local), current = !1;
      },
      d(detaching) {
        detaching && detach(span), rightIcon_slot_or_fallback && rightIcon_slot_or_fallback.d(detaching);
      }
    };
  }
  function create_if_block_1$3(ctx) {
    let span, loader, current;
    return loader = new Loader$1({
      props: {
        variant: (
          /*loaderProps*/
          ctx[6].variant
        ),
        size: (
          /*loaderProps*/
          ctx[6].size
        ),
        color: (
          /*loaderProps*/
          ctx[6].color
        )
      }
    }), {
      c() {
        span = element("span"), create_component(loader.$$.fragment), attr(span, "class", "loader-right svelte-1n9fp7y");
      },
      m(target, anchor) {
        insert(target, span, anchor), mount_component(loader, span, null), current = !0;
      },
      p(ctx2, dirty) {
        const loader_changes = {};
        dirty & /*loaderProps*/
        64 && (loader_changes.variant = /*loaderProps*/
        ctx2[6].variant), dirty & /*loaderProps*/
        64 && (loader_changes.size = /*loaderProps*/
        ctx2[6].size), dirty & /*loaderProps*/
        64 && (loader_changes.color = /*loaderProps*/
        ctx2[6].color), loader.$set(loader_changes);
      },
      i(local) {
        current || (transition_in(loader.$$.fragment, local), current = !0);
      },
      o(local) {
        transition_out(loader.$$.fragment, local), current = !1;
      },
      d(detaching) {
        detaching && detach(span), destroy_component(loader);
      }
    };
  }
  function fallback_block$1(ctx) {
    let t2;
    return {
      c() {
        t2 = text("X");
      },
      m(target, anchor) {
        insert(target, t2, anchor);
      },
      d(detaching) {
        detaching && detach(t2);
      }
    };
  }
  function create_fragment$b(ctx) {
    let error, t2, current_block_type_index, if_block, if_block_anchor, current;
    error = new Error$2({
      props: {
        observable: (
          /*observable*/
          ctx[14]
        ),
        component: "Button",
        code: (
          /*err*/
          ctx[15]
        )
      }
    });
    const if_block_creators = [create_if_block$5, create_else_block$1], if_blocks = [];
    function select_block_type(ctx2, dirty) {
      return (
        /*href*/
        ctx2[7] && !/*disabled*/
        ctx2[9] ? 0 : 1
      );
    }
    return current_block_type_index = select_block_type(ctx), if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx), {
      c() {
        create_component(error.$$.fragment), t2 = space(), if_block.c(), if_block_anchor = empty();
      },
      m(target, anchor) {
        mount_component(error, target, anchor), insert(target, t2, anchor), if_blocks[current_block_type_index].m(target, anchor), insert(target, if_block_anchor, anchor), current = !0;
      },
      p(ctx2, [dirty]) {
        const error_changes = {};
        dirty & /*observable*/
        16384 && (error_changes.observable = /*observable*/
        ctx2[14]), dirty & /*err*/
        32768 && (error_changes.code = /*err*/
        ctx2[15]), error.$set(error_changes);
        let previous_block_index = current_block_type_index;
        current_block_type_index = select_block_type(ctx2), current_block_type_index === previous_block_index ? if_blocks[current_block_type_index].p(ctx2, dirty) : (group_outros(), transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        }), check_outros(), if_block = if_blocks[current_block_type_index], if_block ? if_block.p(ctx2, dirty) : (if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2), if_block.c()), transition_in(if_block, 1), if_block.m(if_block_anchor.parentNode, if_block_anchor));
      },
      i(local) {
        current || (transition_in(error.$$.fragment, local), transition_in(if_block), current = !0);
      },
      o(local) {
        transition_out(error.$$.fragment, local), transition_out(if_block), current = !1;
      },
      d(detaching) {
        destroy_component(error, detaching), detaching && detach(t2), if_blocks[current_block_type_index].d(detaching), detaching && detach(if_block_anchor);
      }
    };
  }
  function instance$b($$self, $$props, $$invalidate) {
    let getStyles, cx2;
    const omit_props_names = [
      "use",
      "element",
      "class",
      "override",
      "variant",
      "color",
      "size",
      "radius",
      "gradient",
      "loaderPosition",
      "loaderProps",
      "href",
      "external",
      "disabled",
      "compact",
      "loading",
      "uppercase",
      "fullSize",
      "ripple"
    ];
    let $$restProps = compute_rest_props($$props, omit_props_names), { $$slots: slots = {}, $$scope } = $$props;
    const $$slots = compute_slots(slots);
    let { use = [], element: element2 = void 0, class: className = "", override = {}, variant: variant2 = "filled", color = "blue", size: size2 = "sm", radius: radius2 = "sm", gradient = { from: "indigo", to: "cyan", deg: 45 }, loaderPosition = "left", loaderProps = {
      size: "xs",
      color: "white",
      variant: "circle"
    }, href = null, external = !1, disabled = !1, compact = !1, loading = !1, uppercase = !1, fullSize = !1, ripple = !1 } = $$props;
    const forwardEvents = createEventForwarder(get_current_component());
    let observable = !1, err;
    disabled && loading && (observable = !0, err = ButtonErrors[0]), (external && typeof href != "string" || href?.length < 1) && (observable = !0, err = ButtonErrors[1]);
    function a_binding($$value) {
      binding_callbacks[$$value ? "unshift" : "push"](() => {
        element2 = $$value, $$invalidate(0, element2);
      });
    }
    function button_binding($$value) {
      binding_callbacks[$$value ? "unshift" : "push"](() => {
        element2 = $$value, $$invalidate(0, element2);
      });
    }
    return $$self.$$set = ($$new_props) => {
      $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)), $$invalidate(19, $$restProps = compute_rest_props($$props, omit_props_names)), "use" in $$new_props && $$invalidate(2, use = $$new_props.use), "element" in $$new_props && $$invalidate(0, element2 = $$new_props.element), "class" in $$new_props && $$invalidate(3, className = $$new_props.class), "override" in $$new_props && $$invalidate(1, override = $$new_props.override), "variant" in $$new_props && $$invalidate(4, variant2 = $$new_props.variant), "color" in $$new_props && $$invalidate(21, color = $$new_props.color), "size" in $$new_props && $$invalidate(22, size2 = $$new_props.size), "radius" in $$new_props && $$invalidate(23, radius2 = $$new_props.radius), "gradient" in $$new_props && $$invalidate(24, gradient = $$new_props.gradient), "loaderPosition" in $$new_props && $$invalidate(5, loaderPosition = $$new_props.loaderPosition), "loaderProps" in $$new_props && $$invalidate(6, loaderProps = $$new_props.loaderProps), "href" in $$new_props && $$invalidate(7, href = $$new_props.href), "external" in $$new_props && $$invalidate(8, external = $$new_props.external), "disabled" in $$new_props && $$invalidate(9, disabled = $$new_props.disabled), "compact" in $$new_props && $$invalidate(10, compact = $$new_props.compact), "loading" in $$new_props && $$invalidate(11, loading = $$new_props.loading), "uppercase" in $$new_props && $$invalidate(12, uppercase = $$new_props.uppercase), "fullSize" in $$new_props && $$invalidate(25, fullSize = $$new_props.fullSize), "ripple" in $$new_props && $$invalidate(13, ripple = $$new_props.ripple), "$$scope" in $$new_props && $$invalidate(26, $$scope = $$new_props.$$scope);
    }, $$self.$$.update = () => {
      $$self.$$.dirty & /*observable*/
      16384 && observable && $$invalidate(1, override = { display: "none" }), $$self.$$.dirty & /*color, compact, fullSize, gradient, radius, size, variant*/
      65012752 && $$invalidate(
        17,
        { getStyles, cx: cx2 } = useStyles$3(
          {
            color,
            compact,
            fullSize,
            gradient,
            radius: radius2,
            size: size2,
            variant: variant2
          },
          { name: "Button" }
        ),
        getStyles,
        ($$invalidate(16, cx2), $$invalidate(21, color), $$invalidate(10, compact), $$invalidate(25, fullSize), $$invalidate(24, gradient), $$invalidate(23, radius2), $$invalidate(22, size2), $$invalidate(4, variant2))
      );
    }, [
      element2,
      override,
      use,
      className,
      variant2,
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
      cx2,
      getStyles,
      forwardEvents,
      $$restProps,
      $$slots,
      color,
      size2,
      radius2,
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
      super(), init(
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
  const Button$1 = Button, useStyles$2 = createStyles((theme2, { size: size2 }) => ({
    root: {
      lineHeight: theme2.lineHeights.md.value
    },
    label: {
      [`${theme2.dark} &`]: {
        color: theme2.fn.themeColor("dark", 0)
      },
      display: "inline-block",
      marginBottom: 4,
      fontSize: theme2.fontSizes[size2].value,
      fontWeight: 500,
      color: theme2.fn.themeColor("gray", 9),
      wordBreak: "break-word",
      cursor: "default",
      WebkitTapHighlightColor: "transparent"
    },
    error: {
      [`${theme2.dark} &`]: {
        color: theme2.fn.themeColor("red", 6)
      },
      marginTop: 5,
      wordBreak: "break-word",
      color: theme2.fn.themeColor("red", 7)
    },
    description: {
      [`${theme2.dark} &`]: {
        color: `${theme2.fn.themeColor("dark", 2)} !important`
      },
      marginTop: -3,
      marginBottom: 7,
      wordBreak: "break-word",
      color: `${theme2.fn.themeColor("gray", 6)} !important`,
      fontSize: theme2.fontSizes[size2].value,
      lineHeight: 1.2
    },
    required: {
      [`${theme2.dark} &`]: {
        color: "$red500"
      },
      color: theme2.fn.themeColor("red", 7)
    }
  }));
  function create_if_block$4(ctx) {
    let span;
    return {
      c() {
        span = element("span"), span.textContent = " *", attr(span, "class", "required"), attr(span, "aria-hidden", "");
      },
      m(target, anchor) {
        insert(target, span, anchor);
      },
      d(detaching) {
        detaching && detach(span);
      }
    };
  }
  function create_default_slot$6(ctx) {
    let t0, t1, if_block_anchor, if_block = (
      /*required*/
      ctx[3] && create_if_block$4()
    );
    return {
      c() {
        t0 = text(
          /*label*/
          ctx[1]
        ), t1 = space(), if_block && if_block.c(), if_block_anchor = empty();
      },
      m(target, anchor) {
        insert(target, t0, anchor), insert(target, t1, anchor), if_block && if_block.m(target, anchor), insert(target, if_block_anchor, anchor);
      },
      p(ctx2, dirty) {
        dirty & /*label*/
        2 && set_data(
          t0,
          /*label*/
          ctx2[1]
        ), /*required*/
        ctx2[3] ? if_block || (if_block = create_if_block$4(), if_block.c(), if_block.m(if_block_anchor.parentNode, if_block_anchor)) : if_block && (if_block.d(1), if_block = null);
      },
      d(detaching) {
        detaching && detach(t0), detaching && detach(t1), if_block && if_block.d(detaching), detaching && detach(if_block_anchor);
      }
    };
  }
  function create_fragment$a(ctx) {
    let box, current;
    return box = new Box$1({
      props: {
        for: (
          /*id*/
          ctx[4]
        ),
        root: (
          /*labelElement*/
          ctx[2]
        ),
        class: (
          /*className*/
          ctx[0]
        ),
        $$slots: { default: [create_default_slot$6] },
        $$scope: { ctx }
      }
    }), {
      c() {
        create_component(box.$$.fragment);
      },
      m(target, anchor) {
        mount_component(box, target, anchor), current = !0;
      },
      p(ctx2, [dirty]) {
        const box_changes = {};
        dirty & /*id*/
        16 && (box_changes.for = /*id*/
        ctx2[4]), dirty & /*labelElement*/
        4 && (box_changes.root = /*labelElement*/
        ctx2[2]), dirty & /*className*/
        1 && (box_changes.class = /*className*/
        ctx2[0]), dirty & /*$$scope, required, label*/
        74 && (box_changes.$$scope = { dirty, ctx: ctx2 }), box.$set(box_changes);
      },
      i(local) {
        current || (transition_in(box.$$.fragment, local), current = !0);
      },
      o(local) {
        transition_out(box.$$.fragment, local), current = !1;
      },
      d(detaching) {
        destroy_component(box, detaching);
      }
    };
  }
  function instance$a($$self, $$props, $$invalidate) {
    let { class: className = "label" } = $$props, { label = "label" } = $$props, { labelElement = "label" } = $$props, { required = !1 } = $$props, { id = void 0 } = $$props;
    return $$self.$$set = ($$props2) => {
      "class" in $$props2 && $$invalidate(0, className = $$props2.class), "label" in $$props2 && $$invalidate(1, label = $$props2.label), "labelElement" in $$props2 && $$invalidate(2, labelElement = $$props2.labelElement), "required" in $$props2 && $$invalidate(3, required = $$props2.required), "id" in $$props2 && $$invalidate(4, id = $$props2.id);
    }, $$self.$$.update = () => {
      $$self.$$.dirty & /*id*/
      16;
    }, [className, label, labelElement, required, id];
  }
  class LabelElement extends SvelteComponent {
    constructor(options) {
      super(), init(this, options, instance$a, create_fragment$a, safe_not_equal, {
        class: 0,
        label: 1,
        labelElement: 2,
        required: 3,
        id: 4
      });
    }
  }
  const LabelElement$1 = LabelElement;
  function create_if_block_2$2(ctx) {
    let labelelement, current;
    const labelelement_spread_levels = [
      { class: (
        /*classes*/
        ctx[15].label
      ) },
      /*_labelProps*/
      ctx[13],
      { label: (
        /*label*/
        ctx[4]
      ) },
      { id: (
        /*id*/
        ctx[10]
      ) },
      { labelElement: (
        /*labelElement*/
        ctx[11]
      ) },
      { required: (
        /*required*/
        ctx[7]
      ) }
    ];
    let labelelement_props = {};
    for (let i2 = 0; i2 < labelelement_spread_levels.length; i2 += 1)
      labelelement_props = assign(labelelement_props, labelelement_spread_levels[i2]);
    return labelelement = new LabelElement$1({ props: labelelement_props }), {
      c() {
        create_component(labelelement.$$.fragment);
      },
      m(target, anchor) {
        mount_component(labelelement, target, anchor), current = !0;
      },
      p(ctx2, dirty) {
        const labelelement_changes = dirty & /*classes, _labelProps, label, id, labelElement, required*/
        44176 ? get_spread_update(labelelement_spread_levels, [
          dirty & /*classes*/
          32768 && { class: (
            /*classes*/
            ctx2[15].label
          ) },
          dirty & /*_labelProps*/
          8192 && get_spread_object(
            /*_labelProps*/
            ctx2[13]
          ),
          dirty & /*label*/
          16 && { label: (
            /*label*/
            ctx2[4]
          ) },
          dirty & /*id*/
          1024 && { id: (
            /*id*/
            ctx2[10]
          ) },
          dirty & /*labelElement*/
          2048 && { labelElement: (
            /*labelElement*/
            ctx2[11]
          ) },
          dirty & /*required*/
          128 && { required: (
            /*required*/
            ctx2[7]
          ) }
        ]) : {};
        labelelement.$set(labelelement_changes);
      },
      i(local) {
        current || (transition_in(labelelement.$$.fragment, local), current = !0);
      },
      o(local) {
        transition_out(labelelement.$$.fragment, local), current = !1;
      },
      d(detaching) {
        destroy_component(labelelement, detaching);
      }
    };
  }
  function create_if_block_1$2(ctx) {
    let text_1, current;
    const text_1_spread_levels = [
      /*descriptionProps*/
      ctx[8],
      { color: "gray" },
      { class: (
        /*classes*/
        ctx[15].description
      ) }
    ];
    let text_1_props = {
      $$slots: { default: [create_default_slot_2$1] },
      $$scope: { ctx }
    };
    for (let i2 = 0; i2 < text_1_spread_levels.length; i2 += 1)
      text_1_props = assign(text_1_props, text_1_spread_levels[i2]);
    return text_1 = new Text$1({ props: text_1_props }), {
      c() {
        create_component(text_1.$$.fragment);
      },
      m(target, anchor) {
        mount_component(text_1, target, anchor), current = !0;
      },
      p(ctx2, dirty) {
        const text_1_changes = dirty & /*descriptionProps, classes*/
        33024 ? get_spread_update(text_1_spread_levels, [
          dirty & /*descriptionProps*/
          256 && get_spread_object(
            /*descriptionProps*/
            ctx2[8]
          ),
          text_1_spread_levels[1],
          dirty & /*classes*/
          32768 && { class: (
            /*classes*/
            ctx2[15].description
          ) }
        ]) : {};
        dirty & /*$$scope, description*/
        2097184 && (text_1_changes.$$scope = { dirty, ctx: ctx2 }), text_1.$set(text_1_changes);
      },
      i(local) {
        current || (transition_in(text_1.$$.fragment, local), current = !0);
      },
      o(local) {
        transition_out(text_1.$$.fragment, local), current = !1;
      },
      d(detaching) {
        destroy_component(text_1, detaching);
      }
    };
  }
  function create_default_slot_2$1(ctx) {
    let t2;
    return {
      c() {
        t2 = text(
          /*description*/
          ctx[5]
        );
      },
      m(target, anchor) {
        insert(target, t2, anchor);
      },
      p(ctx2, dirty) {
        dirty & /*description*/
        32 && set_data(
          t2,
          /*description*/
          ctx2[5]
        );
      },
      d(detaching) {
        detaching && detach(t2);
      }
    };
  }
  function create_if_block$3(ctx) {
    let text_1, current;
    const text_1_spread_levels = [
      /*errorProps*/
      ctx[9],
      { size: (
        /*size*/
        ctx[12]
      ) },
      { class: (
        /*classes*/
        ctx[15].error
      ) }
    ];
    let text_1_props = {
      $$slots: { default: [create_default_slot_1$3] },
      $$scope: { ctx }
    };
    for (let i2 = 0; i2 < text_1_spread_levels.length; i2 += 1)
      text_1_props = assign(text_1_props, text_1_spread_levels[i2]);
    return text_1 = new Text$1({ props: text_1_props }), {
      c() {
        create_component(text_1.$$.fragment);
      },
      m(target, anchor) {
        mount_component(text_1, target, anchor), current = !0;
      },
      p(ctx2, dirty) {
        const text_1_changes = dirty & /*errorProps, size, classes*/
        37376 ? get_spread_update(text_1_spread_levels, [
          dirty & /*errorProps*/
          512 && get_spread_object(
            /*errorProps*/
            ctx2[9]
          ),
          dirty & /*size*/
          4096 && { size: (
            /*size*/
            ctx2[12]
          ) },
          dirty & /*classes*/
          32768 && { class: (
            /*classes*/
            ctx2[15].error
          ) }
        ]) : {};
        dirty & /*$$scope, error*/
        2097216 && (text_1_changes.$$scope = { dirty, ctx: ctx2 }), text_1.$set(text_1_changes);
      },
      i(local) {
        current || (transition_in(text_1.$$.fragment, local), current = !0);
      },
      o(local) {
        transition_out(text_1.$$.fragment, local), current = !1;
      },
      d(detaching) {
        destroy_component(text_1, detaching);
      }
    };
  }
  function create_default_slot_1$3(ctx) {
    let t2;
    return {
      c() {
        t2 = text(
          /*error*/
          ctx[6]
        );
      },
      m(target, anchor) {
        insert(target, t2, anchor);
      },
      p(ctx2, dirty) {
        dirty & /*error*/
        64 && set_data(
          t2,
          /*error*/
          ctx2[6]
        );
      },
      d(detaching) {
        detaching && detach(t2);
      }
    };
  }
  function create_default_slot$5(ctx) {
    let t0, t1, t2, if_block2_anchor, current, if_block0 = (
      /*label*/
      ctx[4] && create_if_block_2$2(ctx)
    ), if_block1 = (
      /*description*/
      ctx[5] && create_if_block_1$2(ctx)
    );
    const default_slot_template = (
      /*#slots*/
      ctx[19].default
    ), default_slot = create_slot(
      default_slot_template,
      ctx,
      /*$$scope*/
      ctx[21],
      null
    );
    let if_block2 = typeof /*error*/
    ctx[6] != "boolean" && /*error*/
    ctx[6] && create_if_block$3(ctx);
    return {
      c() {
        if_block0 && if_block0.c(), t0 = space(), if_block1 && if_block1.c(), t1 = space(), default_slot && default_slot.c(), t2 = space(), if_block2 && if_block2.c(), if_block2_anchor = empty();
      },
      m(target, anchor) {
        if_block0 && if_block0.m(target, anchor), insert(target, t0, anchor), if_block1 && if_block1.m(target, anchor), insert(target, t1, anchor), default_slot && default_slot.m(target, anchor), insert(target, t2, anchor), if_block2 && if_block2.m(target, anchor), insert(target, if_block2_anchor, anchor), current = !0;
      },
      p(ctx2, dirty) {
        /*label*/
        ctx2[4] ? if_block0 ? (if_block0.p(ctx2, dirty), dirty & /*label*/
        16 && transition_in(if_block0, 1)) : (if_block0 = create_if_block_2$2(ctx2), if_block0.c(), transition_in(if_block0, 1), if_block0.m(t0.parentNode, t0)) : if_block0 && (group_outros(), transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        }), check_outros()), /*description*/
        ctx2[5] ? if_block1 ? (if_block1.p(ctx2, dirty), dirty & /*description*/
        32 && transition_in(if_block1, 1)) : (if_block1 = create_if_block_1$2(ctx2), if_block1.c(), transition_in(if_block1, 1), if_block1.m(t1.parentNode, t1)) : if_block1 && (group_outros(), transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        }), check_outros()), default_slot && default_slot.p && (!current || dirty & /*$$scope*/
        2097152) && update_slot_base(
          default_slot,
          default_slot_template,
          ctx2,
          /*$$scope*/
          ctx2[21],
          current ? get_slot_changes(
            default_slot_template,
            /*$$scope*/
            ctx2[21],
            dirty,
            null
          ) : get_all_dirty_from_scope(
            /*$$scope*/
            ctx2[21]
          ),
          null
        ), typeof /*error*/
        ctx2[6] != "boolean" && /*error*/
        ctx2[6] ? if_block2 ? (if_block2.p(ctx2, dirty), dirty & /*error*/
        64 && transition_in(if_block2, 1)) : (if_block2 = create_if_block$3(ctx2), if_block2.c(), transition_in(if_block2, 1), if_block2.m(if_block2_anchor.parentNode, if_block2_anchor)) : if_block2 && (group_outros(), transition_out(if_block2, 1, 1, () => {
          if_block2 = null;
        }), check_outros());
      },
      i(local) {
        current || (transition_in(if_block0), transition_in(if_block1), transition_in(default_slot, local), transition_in(if_block2), current = !0);
      },
      o(local) {
        transition_out(if_block0), transition_out(if_block1), transition_out(default_slot, local), transition_out(if_block2), current = !1;
      },
      d(detaching) {
        if_block0 && if_block0.d(detaching), detaching && detach(t0), if_block1 && if_block1.d(detaching), detaching && detach(t1), default_slot && default_slot.d(detaching), detaching && detach(t2), if_block2 && if_block2.d(detaching), detaching && detach(if_block2_anchor);
      }
    };
  }
  function create_fragment$9(ctx) {
    let box, updating_element, current;
    const box_spread_levels = [
      { use: (
        /*use*/
        ctx[1]
      ) },
      {
        class: (
          /*cx*/
          ctx[16](
            /*className*/
            ctx[2],
            /*getStyles*/
            ctx[14]({ css: (
              /*override*/
              ctx[3]
            ) })
          )
        )
      },
      /*$$restProps*/
      ctx[17]
    ];
    function box_element_binding(value) {
      ctx[20](value);
    }
    let box_props = {
      $$slots: { default: [create_default_slot$5] },
      $$scope: { ctx }
    };
    for (let i2 = 0; i2 < box_spread_levels.length; i2 += 1)
      box_props = assign(box_props, box_spread_levels[i2]);
    return (
      /*element*/
      ctx[0] !== void 0 && (box_props.element = /*element*/
      ctx[0]), box = new Box$1({ props: box_props }), binding_callbacks.push(() => bind(box, "element", box_element_binding)), {
        c() {
          create_component(box.$$.fragment);
        },
        m(target, anchor) {
          mount_component(box, target, anchor), current = !0;
        },
        p(ctx2, [dirty]) {
          const box_changes = dirty & /*use, cx, className, getStyles, override, $$restProps*/
          213006 ? get_spread_update(box_spread_levels, [
            dirty & /*use*/
            2 && { use: (
              /*use*/
              ctx2[1]
            ) },
            dirty & /*cx, className, getStyles, override*/
            81932 && {
              class: (
                /*cx*/
                ctx2[16](
                  /*className*/
                  ctx2[2],
                  /*getStyles*/
                  ctx2[14]({ css: (
                    /*override*/
                    ctx2[3]
                  ) })
                )
              )
            },
            dirty & /*$$restProps*/
            131072 && get_spread_object(
              /*$$restProps*/
              ctx2[17]
            )
          ]) : {};
          dirty & /*$$scope, errorProps, size, classes, error, descriptionProps, description, _labelProps, label, id, labelElement, required*/
          2146288 && (box_changes.$$scope = { dirty, ctx: ctx2 }), !updating_element && dirty & /*element*/
          1 && (updating_element = !0, box_changes.element = /*element*/
          ctx2[0], add_flush_callback(() => updating_element = !1)), box.$set(box_changes);
        },
        i(local) {
          current || (transition_in(box.$$.fragment, local), current = !0);
        },
        o(local) {
          transition_out(box.$$.fragment, local), current = !1;
        },
        d(detaching) {
          destroy_component(box, detaching);
        }
      }
    );
  }
  function instance$9($$self, $$props, $$invalidate) {
    let cx2, classes, getStyles;
    const omit_props_names = [
      "use",
      "element",
      "class",
      "override",
      "label",
      "description",
      "error",
      "required",
      "labelProps",
      "descriptionProps",
      "errorProps",
      "id",
      "labelElement",
      "size"
    ];
    let $$restProps = compute_rest_props($$props, omit_props_names), { $$slots: slots = {}, $$scope } = $$props, { use = [], element: element2 = void 0, class: className = "", override = {}, label = "label", description = null, error = null, required = !1, labelProps = {}, descriptionProps = {}, errorProps = {}, id = "input-id", labelElement = "label", size: size2 = "sm" } = $$props, _labelProps;
    function box_element_binding(value) {
      element2 = value, $$invalidate(0, element2);
    }
    return $$self.$$set = ($$new_props) => {
      $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)), $$invalidate(17, $$restProps = compute_rest_props($$props, omit_props_names)), "use" in $$new_props && $$invalidate(1, use = $$new_props.use), "element" in $$new_props && $$invalidate(0, element2 = $$new_props.element), "class" in $$new_props && $$invalidate(2, className = $$new_props.class), "override" in $$new_props && $$invalidate(3, override = $$new_props.override), "label" in $$new_props && $$invalidate(4, label = $$new_props.label), "description" in $$new_props && $$invalidate(5, description = $$new_props.description), "error" in $$new_props && $$invalidate(6, error = $$new_props.error), "required" in $$new_props && $$invalidate(7, required = $$new_props.required), "labelProps" in $$new_props && $$invalidate(18, labelProps = $$new_props.labelProps), "descriptionProps" in $$new_props && $$invalidate(8, descriptionProps = $$new_props.descriptionProps), "errorProps" in $$new_props && $$invalidate(9, errorProps = $$new_props.errorProps), "id" in $$new_props && $$invalidate(10, id = $$new_props.id), "labelElement" in $$new_props && $$invalidate(11, labelElement = $$new_props.labelElement), "size" in $$new_props && $$invalidate(12, size2 = $$new_props.size), "$$scope" in $$new_props && $$invalidate(21, $$scope = $$new_props.$$scope);
    }, $$self.$$.update = () => {
      $$self.$$.dirty & /*labelElement, id, labelProps*/
      265216 && $$invalidate(13, _labelProps = labelElement === "label" ? { htmlFor: id, ...labelProps } : { ...labelProps }), $$self.$$.dirty & /*size*/
      4096 && $$invalidate(16, { cx: cx2, classes, getStyles } = useStyles$2({ size: size2 }, { name: "InputWrapper" }), cx2, ($$invalidate(15, classes), $$invalidate(12, size2)), ($$invalidate(14, getStyles), $$invalidate(12, size2)));
    }, [
      element2,
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
      size2,
      _labelProps,
      getStyles,
      classes,
      cx2,
      $$restProps,
      labelProps,
      slots,
      box_element_binding,
      $$scope
    ];
  }
  class InputWrapper extends SvelteComponent {
    constructor(options) {
      super(), init(this, options, instance$9, create_fragment$9, safe_not_equal, {
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
  const InputWrapper$1 = InputWrapper, POSITIONS = {
    left: "flex-start",
    center: "center",
    right: "flex-end",
    apart: "space-between"
  }, useStyles$1 = createStyles((theme2, { align, direction, grow, noWrap, position, spacing, children: children2 }) => ({
    root: {
      boxSizing: "border-box",
      display: "flex",
      flexDirection: direction,
      alignItems: align || (direction === "row" ? "center" : grow ? "stretch" : position === "apart" ? "flex-start" : POSITIONS[position]),
      flexWrap: noWrap ? "nowrap" : "wrap",
      justifyContent: direction === "row" ? POSITIONS[position] : void 0,
      gap: theme2.fn.size({ size: spacing, sizes: theme2.space }),
      "& > *": {
        boxSizing: "border-box",
        maxWidth: grow && direction === "row" ? `calc(${100 / children2}% - ${theme2.fn.size({ size: spacing, sizes: theme2.space }) - theme2.fn.size({ size: spacing, sizes: theme2.space }) / children2}px)` : void 0,
        flexGrow: grow ? 1 : 0
      }
    }
  }));
  function create_default_slot$4(ctx) {
    let current;
    const default_slot_template = (
      /*#slots*/
      ctx[14].default
    ), default_slot = create_slot(
      default_slot_template,
      ctx,
      /*$$scope*/
      ctx[16],
      null
    );
    return {
      c() {
        default_slot && default_slot.c();
      },
      m(target, anchor) {
        default_slot && default_slot.m(target, anchor), current = !0;
      },
      p(ctx2, dirty) {
        default_slot && default_slot.p && (!current || dirty & /*$$scope*/
        65536) && update_slot_base(
          default_slot,
          default_slot_template,
          ctx2,
          /*$$scope*/
          ctx2[16],
          current ? get_slot_changes(
            default_slot_template,
            /*$$scope*/
            ctx2[16],
            dirty,
            null
          ) : get_all_dirty_from_scope(
            /*$$scope*/
            ctx2[16]
          ),
          null
        );
      },
      i(local) {
        current || (transition_in(default_slot, local), current = !0);
      },
      o(local) {
        transition_out(default_slot, local), current = !1;
      },
      d(detaching) {
        default_slot && default_slot.d(detaching);
      }
    };
  }
  function create_fragment$8(ctx) {
    let box, updating_element, current;
    const box_spread_levels = [
      { use: (
        /*use*/
        ctx[1]
      ) },
      {
        class: (
          /*cx*/
          ctx[5](
            /*className*/
            ctx[2],
            /*getStyles*/
            ctx[4]({ css: (
              /*override*/
              ctx[3]
            ) })
          )
        )
      },
      /*$$restProps*/
      ctx[6]
    ];
    function box_element_binding(value) {
      ctx[15](value);
    }
    let box_props = {
      $$slots: { default: [create_default_slot$4] },
      $$scope: { ctx }
    };
    for (let i2 = 0; i2 < box_spread_levels.length; i2 += 1)
      box_props = assign(box_props, box_spread_levels[i2]);
    return (
      /*element*/
      ctx[0] !== void 0 && (box_props.element = /*element*/
      ctx[0]), box = new Box$1({ props: box_props }), binding_callbacks.push(() => bind(box, "element", box_element_binding)), {
        c() {
          create_component(box.$$.fragment);
        },
        m(target, anchor) {
          mount_component(box, target, anchor), current = !0;
        },
        p(ctx2, [dirty]) {
          const box_changes = dirty & /*use, cx, className, getStyles, override, $$restProps*/
          126 ? get_spread_update(box_spread_levels, [
            dirty & /*use*/
            2 && { use: (
              /*use*/
              ctx2[1]
            ) },
            dirty & /*cx, className, getStyles, override*/
            60 && {
              class: (
                /*cx*/
                ctx2[5](
                  /*className*/
                  ctx2[2],
                  /*getStyles*/
                  ctx2[4]({ css: (
                    /*override*/
                    ctx2[3]
                  ) })
                )
              )
            },
            dirty & /*$$restProps*/
            64 && get_spread_object(
              /*$$restProps*/
              ctx2[6]
            )
          ]) : {};
          dirty & /*$$scope*/
          65536 && (box_changes.$$scope = { dirty, ctx: ctx2 }), !updating_element && dirty & /*element*/
          1 && (updating_element = !0, box_changes.element = /*element*/
          ctx2[0], add_flush_callback(() => updating_element = !1)), box.$set(box_changes);
        },
        i(local) {
          current || (transition_in(box.$$.fragment, local), current = !0);
        },
        o(local) {
          transition_out(box.$$.fragment, local), current = !1;
        },
        d(detaching) {
          destroy_component(box, detaching);
        }
      }
    );
  }
  function instance$8($$self, $$props, $$invalidate) {
    let cx2, getStyles;
    const omit_props_names = [
      "use",
      "element",
      "class",
      "override",
      "position",
      "noWrap",
      "grow",
      "spacing",
      "direction",
      "align"
    ];
    let $$restProps = compute_rest_props($$props, omit_props_names), { $$slots: slots = {}, $$scope } = $$props, { use = [], element: element2 = void 0, class: className = "", override = {}, position = "left", noWrap = !1, grow = !1, spacing = "md", direction = "row", align = "center" } = $$props, children2;
    function box_element_binding(value) {
      element2 = value, $$invalidate(0, element2);
    }
    return $$self.$$set = ($$new_props) => {
      $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)), $$invalidate(6, $$restProps = compute_rest_props($$props, omit_props_names)), "use" in $$new_props && $$invalidate(1, use = $$new_props.use), "element" in $$new_props && $$invalidate(0, element2 = $$new_props.element), "class" in $$new_props && $$invalidate(2, className = $$new_props.class), "override" in $$new_props && $$invalidate(3, override = $$new_props.override), "position" in $$new_props && $$invalidate(7, position = $$new_props.position), "noWrap" in $$new_props && $$invalidate(8, noWrap = $$new_props.noWrap), "grow" in $$new_props && $$invalidate(9, grow = $$new_props.grow), "spacing" in $$new_props && $$invalidate(10, spacing = $$new_props.spacing), "direction" in $$new_props && $$invalidate(11, direction = $$new_props.direction), "align" in $$new_props && $$invalidate(12, align = $$new_props.align), "$$scope" in $$new_props && $$invalidate(16, $$scope = $$new_props.$$scope);
    }, $$self.$$.update = () => {
      $$self.$$.dirty & /*element*/
      1 && onMount(() => {
        $$invalidate(13, children2 = element2.childElementCount);
      }), $$self.$$.dirty & /*align, children, direction, grow, noWrap, position, spacing*/
      16256 && $$invalidate(
        5,
        { cx: cx2, getStyles } = useStyles$1(
          {
            align,
            children: children2,
            direction,
            grow,
            noWrap,
            position,
            spacing
          },
          { name: "Group" }
        ),
        cx2,
        ($$invalidate(4, getStyles), $$invalidate(12, align), $$invalidate(13, children2), $$invalidate(11, direction), $$invalidate(9, grow), $$invalidate(8, noWrap), $$invalidate(7, position), $$invalidate(10, spacing), $$invalidate(0, element2))
      );
    }, [
      element2,
      use,
      className,
      override,
      getStyles,
      cx2,
      $$restProps,
      position,
      noWrap,
      grow,
      spacing,
      direction,
      align,
      children2,
      slots,
      box_element_binding,
      $$scope
    ];
  }
  class Group extends SvelteComponent {
    constructor(options) {
      super(), init(this, options, instance$8, create_fragment$8, safe_not_equal, {
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
  const Group$1 = Group, sizes = {
    xs: 30,
    sm: 36,
    md: 42,
    lg: 50,
    xl: 60
  }, useStyles = createStyles((theme2, { icon, iconWidth, invalid, multiline, radius: radius2, rightSectionWidth, size: size2, variant: variant2, showRightSection }) => ({
    root: {
      darkMode: {
        "& .input": variant2 === "headless" ? {} : {
          color: "$dark50"
        },
        "&:disabled": {
          backgroundColor: "$dark600"
        },
        "&::placeholder": {
          color: "$dark300"
        }
      },
      position: "relative"
    },
    input: variant2 === "headless" ? {} : {
      height: multiline ? variant2 === "unstyled" ? void 0 : "auto" : typeof size2 == "number" ? `${size2}px` : sizes[size2] ?? sizes.md,
      WebkitTapHighlightColor: "transparent",
      lineHeight: multiline ? "$md" : `${sizes[size2] - 2}px`,
      appearance: "none",
      resize: "none",
      boxSizing: "border-box",
      fontSize: typeof size2 == "number" ? `${size2}px` : `${size2}`,
      width: "100%",
      color: "Black",
      display: "block",
      textAlign: "left",
      minHeight: variant2 === "default" || variant2 === "filled" ? sizes[size2] ?? sizes.md : null,
      paddingLeft: variant2 === "default" && icon || variant2 === "filled" && icon ? sizes[size2] ?? sizes.md / 3 : 12,
      paddingRight: (variant2 === "default" || variant2 === "filled") && showRightSection ? rightSectionWidth : null,
      borderRadius: variant2 === "default" || variant2 === "filled" ? `$${radius2}` : null,
      "&:disabled": {
        backgroundColor: "$gray100",
        color: "$dark200",
        opacity: 0.6,
        cursor: "not-allowed",
        "&::placeholder": {
          color: "$dark200"
        }
      },
      "&::placeholder": {
        opacity: 1,
        userSelect: "none",
        color: "$gray500"
      },
      "&::-webkit-inner-spin-button, &::-webkit-outer-spin-button, &::-webkit-search-decoration, &::-webkit-search-cancel-button, &::-webkit-search-results-button, &::-webkit-search-results-decoration": {
        appearance: "none"
      },
      "&[type=number]": {
        MozAppearance: "textfield"
      },
      "&.defaultVariant": {
        [`${theme2.dark} &`]: {
          border: "1px solid $dark500",
          backgroundColor: "$dark800",
          "&:focus, &:focus-within": {
            borderColor: "$blue800"
          }
        },
        border: "1px solid $gray400",
        backgroundColor: "White",
        transition: "border-color 100ms ease",
        "&:focus, &:focus-within": {
          outline: "none",
          borderColor: "$blue500"
        }
      },
      "&.filledVariant": {
        [`${theme2.dark} &`]: {
          backgroundColor: "$dark500",
          "&:focus, &:focus-within": {
            borderColor: "$blue800 !important"
          }
        },
        border: "1px solid transparent",
        backgroundColor: "$gray100",
        "&:focus, &:focus-within": {
          outline: "none",
          borderColor: "$blue500 !important"
        }
      },
      "&.unstyledVariant": {
        [`${theme2.dark} &`]: {
          color: "$dark50"
        },
        borderWidth: 0,
        color: "Black",
        backgroundColor: "transparent",
        minHeight: 28,
        outline: 0,
        "&:focus, &:focus-within": {
          outline: "none",
          borderColor: "transparent"
        },
        "&:disabled": {
          backgroundColor: "transparent",
          "&:focus, &:focus-within": {
            outline: "none",
            borderColor: "transparent"
          }
        }
      }
    },
    withIcon: {
      paddingLeft: typeof iconWidth == "number" ? iconWidth : sizes[size2] ?? sizes.md
    },
    disabled: {
      darkMode: {
        backgroundColor: "$dark600 !important"
      },
      backgroundColor: "$gray100 !important",
      color: "$dark200 !important",
      opacity: 0.6,
      cursor: "not-allowed",
      "&::placeholder": {
        color: "$dark200 !important"
      }
    },
    invalid: {
      darkMode: {
        color: "$red600 !important",
        borderColor: "$red600 !important",
        "&::placeholder": {
          color: "$red600 !important"
        }
      },
      color: "$red700 !important",
      borderColor: "$red700 !important",
      "&::placeholder": {
        opacity: 1,
        color: "$red700 !important"
      }
    },
    icon: {
      darkMode: {
        color: invalid ? "red600" : "$dark200"
      },
      pointerEvents: "none",
      position: "absolute",
      zIndex: 1,
      left: 0,
      top: 8,
      bottom: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: sizes[size2] ?? sizes.md,
      color: invalid ? "$red700" : "$gray500"
    },
    rightSection: {
      position: "absolute",
      top: 0,
      bottom: 0,
      right: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: rightSectionWidth
    }
  })), get_rightSection_slot_changes$2 = (dirty) => ({}), get_rightSection_slot_context$2 = (ctx) => ({});
  function create_if_block_4(ctx) {
    let iconrenderer, current;
    const iconrenderer_spread_levels = [
      { icon: (
        /*icon*/
        ctx[6]
      ) },
      { className: (
        /*classes*/
        ctx[22].icon
      ) },
      /*iconProps*/
      ctx[7],
      { iconSize: 16 }
    ];
    let iconrenderer_props = {};
    for (let i2 = 0; i2 < iconrenderer_spread_levels.length; i2 += 1)
      iconrenderer_props = assign(iconrenderer_props, iconrenderer_spread_levels[i2]);
    return iconrenderer = new IconRenderer$1({ props: iconrenderer_props }), {
      c() {
        create_component(iconrenderer.$$.fragment);
      },
      m(target, anchor) {
        mount_component(iconrenderer, target, anchor), current = !0;
      },
      p(ctx2, dirty) {
        const iconrenderer_changes = dirty[0] & /*icon, classes, iconProps*/
        4194496 ? get_spread_update(iconrenderer_spread_levels, [
          dirty[0] & /*icon*/
          64 && { icon: (
            /*icon*/
            ctx2[6]
          ) },
          dirty[0] & /*classes*/
          4194304 && { className: (
            /*classes*/
            ctx2[22].icon
          ) },
          dirty[0] & /*iconProps*/
          128 && get_spread_object(
            /*iconProps*/
            ctx2[7]
          ),
          iconrenderer_spread_levels[3]
        ]) : {};
        iconrenderer.$set(iconrenderer_changes);
      },
      i(local) {
        current || (transition_in(iconrenderer.$$.fragment, local), current = !0);
      },
      o(local) {
        transition_out(iconrenderer.$$.fragment, local), current = !1;
      },
      d(detaching) {
        destroy_component(iconrenderer, detaching);
      }
    };
  }
  function create_if_block_3(ctx) {
    let switch_instance, updating_element, updating_value, switch_instance_anchor, current;
    const switch_instance_spread_levels = [
      {
        use: [
          /*forwardEvents*/
          ctx[24],
          [
            useActions,
            /*use*/
            ctx[2]
          ]
        ]
      },
      { "aria-invalid": (
        /*invalid*/
        ctx[15]
      ) },
      {
        class: (
          /*cx*/
          ctx[23](
            /*className*/
            ctx[3],
            {
              [
                /*classes*/
                ctx[22].disabled
              ]: (
                /*disabled*/
                ctx[14]
              ),
              [
                /*classes*/
                ctx[22].invalid
              ]: (
                /*invalid*/
                ctx[15]
              ),
              [
                /*classes*/
                ctx[22].withIcon
              ]: (
                /*icon*/
                ctx[6]
              )
            },
            `${/*variant*/
            ctx[13]}Variant`
          )
        )
      },
      { disabled: (
        /*disabled*/
        ctx[14]
      ) },
      { required: (
        /*required*/
        ctx[12]
      ) },
      { id: (
        /*id*/
        ctx[11]
      ) },
      { type: (
        /*type*/
        ctx[17]
      ) },
      /*$$restProps*/
      ctx[28]
    ];
    function switch_instance_element_binding(value) {
      ctx[37](value);
    }
    function switch_instance_value_binding(value) {
      ctx[38](value);
    }
    var switch_value = (
      /*root*/
      ctx[5]
    );
    function switch_props(ctx2) {
      let switch_instance_props = {
        $$slots: { default: [create_default_slot_1$2] },
        $$scope: { ctx: ctx2 }
      };
      for (let i2 = 0; i2 < switch_instance_spread_levels.length; i2 += 1)
        switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i2]);
      return (
        /*element*/
        ctx2[0] !== void 0 && (switch_instance_props.element = /*element*/
        ctx2[0]), /*value*/
        ctx2[1] !== void 0 && (switch_instance_props.value = /*value*/
        ctx2[1]), { props: switch_instance_props }
      );
    }
    return switch_value && (switch_instance = construct_svelte_component(switch_value, switch_props(ctx)), binding_callbacks.push(() => bind(switch_instance, "element", switch_instance_element_binding)), binding_callbacks.push(() => bind(switch_instance, "value", switch_instance_value_binding))), {
      c() {
        switch_instance && create_component(switch_instance.$$.fragment), switch_instance_anchor = empty();
      },
      m(target, anchor) {
        switch_instance && mount_component(switch_instance, target, anchor), insert(target, switch_instance_anchor, anchor), current = !0;
      },
      p(ctx2, dirty) {
        const switch_instance_changes = dirty[0] & /*forwardEvents, use, invalid, cx, className, classes, disabled, icon, variant, required, id, type, $$restProps*/
        297990220 ? get_spread_update(switch_instance_spread_levels, [
          dirty[0] & /*forwardEvents, use*/
          16777220 && {
            use: [
              /*forwardEvents*/
              ctx2[24],
              [
                useActions,
                /*use*/
                ctx2[2]
              ]
            ]
          },
          dirty[0] & /*invalid*/
          32768 && { "aria-invalid": (
            /*invalid*/
            ctx2[15]
          ) },
          dirty[0] & /*cx, className, classes, disabled, invalid, icon, variant*/
          12640328 && {
            class: (
              /*cx*/
              ctx2[23](
                /*className*/
                ctx2[3],
                {
                  [
                    /*classes*/
                    ctx2[22].disabled
                  ]: (
                    /*disabled*/
                    ctx2[14]
                  ),
                  [
                    /*classes*/
                    ctx2[22].invalid
                  ]: (
                    /*invalid*/
                    ctx2[15]
                  ),
                  [
                    /*classes*/
                    ctx2[22].withIcon
                  ]: (
                    /*icon*/
                    ctx2[6]
                  )
                },
                `${/*variant*/
                ctx2[13]}Variant`
              )
            )
          },
          dirty[0] & /*disabled*/
          16384 && { disabled: (
            /*disabled*/
            ctx2[14]
          ) },
          dirty[0] & /*required*/
          4096 && { required: (
            /*required*/
            ctx2[12]
          ) },
          dirty[0] & /*id*/
          2048 && { id: (
            /*id*/
            ctx2[11]
          ) },
          dirty[0] & /*type*/
          131072 && { type: (
            /*type*/
            ctx2[17]
          ) },
          dirty[0] & /*$$restProps*/
          268435456 && get_spread_object(
            /*$$restProps*/
            ctx2[28]
          )
        ]) : {};
        if (dirty[1] & /*$$scope*/
        256 && (switch_instance_changes.$$scope = { dirty, ctx: ctx2 }), !updating_element && dirty[0] & /*element*/
        1 && (updating_element = !0, switch_instance_changes.element = /*element*/
        ctx2[0], add_flush_callback(() => updating_element = !1)), !updating_value && dirty[0] & /*value*/
        2 && (updating_value = !0, switch_instance_changes.value = /*value*/
        ctx2[1], add_flush_callback(() => updating_value = !1)), switch_value !== (switch_value = /*root*/
        ctx2[5])) {
          if (switch_instance) {
            group_outros();
            const old_component = switch_instance;
            transition_out(old_component.$$.fragment, 1, 0, () => {
              destroy_component(old_component, 1);
            }), check_outros();
          }
          switch_value ? (switch_instance = construct_svelte_component(switch_value, switch_props(ctx2)), binding_callbacks.push(() => bind(switch_instance, "element", switch_instance_element_binding)), binding_callbacks.push(() => bind(switch_instance, "value", switch_instance_value_binding)), create_component(switch_instance.$$.fragment), transition_in(switch_instance.$$.fragment, 1), mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor)) : switch_instance = null;
        } else
          switch_value && switch_instance.$set(switch_instance_changes);
      },
      i(local) {
        current || (switch_instance && transition_in(switch_instance.$$.fragment, local), current = !0);
      },
      o(local) {
        switch_instance && transition_out(switch_instance.$$.fragment, local), current = !1;
      },
      d(detaching) {
        detaching && detach(switch_instance_anchor), switch_instance && destroy_component(switch_instance, detaching);
      }
    };
  }
  function create_if_block_2$1(ctx) {
    let previous_tag = (
      /*castRoot*/
      ctx[25]()
    ), svelte_element_anchor, current, svelte_element = (
      /*castRoot*/
      ctx[25]() && create_dynamic_element(ctx)
    );
    return {
      c() {
        svelte_element && svelte_element.c(), svelte_element_anchor = empty();
      },
      m(target, anchor) {
        svelte_element && svelte_element.m(target, anchor), insert(target, svelte_element_anchor, anchor), current = !0;
      },
      p(ctx2, dirty) {
        /*castRoot*/
        ctx2[25]() ? previous_tag ? safe_not_equal(
          previous_tag,
          /*castRoot*/
          ctx2[25]()
        ) ? (svelte_element.d(1), svelte_element = create_dynamic_element(ctx2), svelte_element.c(), svelte_element.m(svelte_element_anchor.parentNode, svelte_element_anchor)) : svelte_element.p(ctx2, dirty) : (svelte_element = create_dynamic_element(ctx2), svelte_element.c(), svelte_element.m(svelte_element_anchor.parentNode, svelte_element_anchor)) : previous_tag && (svelte_element.d(1), svelte_element = null), previous_tag = /*castRoot*/
        ctx2[25]();
      },
      i(local) {
        current || (transition_in(svelte_element), current = !0);
      },
      o(local) {
        transition_out(svelte_element), current = !1;
      },
      d(detaching) {
        detaching && detach(svelte_element_anchor), svelte_element && svelte_element.d(detaching);
      }
    };
  }
  function create_if_block_1$1(ctx) {
    let input2, input_class_value, useActions_action, mounted, dispose, input_levels = [
      { value: (
        /*value*/
        ctx[1]
      ) },
      { type: (
        /*type*/
        ctx[17]
      ) },
      { required: (
        /*required*/
        ctx[12]
      ) },
      { disabled: (
        /*disabled*/
        ctx[14]
      ) },
      { id: (
        /*id*/
        ctx[11]
      ) },
      { placeholder: (
        /*placeholder*/
        ctx[18]
      ) },
      { autocomplete: (
        /*autocomplete*/
        ctx[16]
      ) },
      { "aria-invalid": (
        /*invalid*/
        ctx[15]
      ) },
      {
        class: input_class_value = /*cx*/
        ctx[23](
          /*className*/
          ctx[3],
          /*classes*/
          ctx[22].input,
          {
            [
              /*classes*/
              ctx[22].disabled
            ]: (
              /*disabled*/
              ctx[14]
            ),
            [
              /*classes*/
              ctx[22].invalid
            ]: (
              /*invalid*/
              ctx[15]
            )
          },
          `${/*variant*/
          ctx[13]}Variant`
        )
      },
      /*$$restProps*/
      ctx[28]
    ], input_data = {};
    for (let i2 = 0; i2 < input_levels.length; i2 += 1)
      input_data = assign(input_data, input_levels[i2]);
    return {
      c() {
        input2 = element("input"), set_attributes(input2, input_data), toggle_class(
          input2,
          "disabled",
          /*disabled*/
          ctx[14]
        ), toggle_class(
          input2,
          "invalid",
          /*invalid*/
          ctx[15]
        ), toggle_class(
          input2,
          "withIcon",
          /*icon*/
          ctx[6]
        );
      },
      m(target, anchor) {
        insert(target, input2, anchor), input2.value = input_data.value, input2.autofocus && input2.focus(), ctx[35](input2), mounted || (dispose = [
          action_destroyer(useActions_action = useActions.call(
            null,
            input2,
            /*use*/
            ctx[2]
          )),
          action_destroyer(
            /*forwardEvents*/
            ctx[24].call(null, input2)
          ),
          listen(
            input2,
            "input",
            /*onInput*/
            ctx[27]
          )
        ], mounted = !0);
      },
      p(ctx2, dirty) {
        set_attributes(input2, input_data = get_spread_update(input_levels, [
          dirty[0] & /*value*/
          2 && input2.value !== /*value*/
          ctx2[1] && { value: (
            /*value*/
            ctx2[1]
          ) },
          dirty[0] & /*type*/
          131072 && { type: (
            /*type*/
            ctx2[17]
          ) },
          dirty[0] & /*required*/
          4096 && { required: (
            /*required*/
            ctx2[12]
          ) },
          dirty[0] & /*disabled*/
          16384 && { disabled: (
            /*disabled*/
            ctx2[14]
          ) },
          dirty[0] & /*id*/
          2048 && { id: (
            /*id*/
            ctx2[11]
          ) },
          dirty[0] & /*placeholder*/
          262144 && { placeholder: (
            /*placeholder*/
            ctx2[18]
          ) },
          dirty[0] & /*autocomplete*/
          65536 && { autocomplete: (
            /*autocomplete*/
            ctx2[16]
          ) },
          dirty[0] & /*invalid*/
          32768 && { "aria-invalid": (
            /*invalid*/
            ctx2[15]
          ) },
          dirty[0] & /*cx, className, classes, disabled, invalid, variant*/
          12640264 && input_class_value !== (input_class_value = /*cx*/
          ctx2[23](
            /*className*/
            ctx2[3],
            /*classes*/
            ctx2[22].input,
            {
              [
                /*classes*/
                ctx2[22].disabled
              ]: (
                /*disabled*/
                ctx2[14]
              ),
              [
                /*classes*/
                ctx2[22].invalid
              ]: (
                /*invalid*/
                ctx2[15]
              )
            },
            `${/*variant*/
            ctx2[13]}Variant`
          )) && { class: input_class_value },
          dirty[0] & /*$$restProps*/
          268435456 && /*$$restProps*/
          ctx2[28]
        ])), "value" in input_data && (input2.value = input_data.value), useActions_action && is_function(useActions_action.update) && dirty[0] & /*use*/
        4 && useActions_action.update.call(
          null,
          /*use*/
          ctx2[2]
        ), toggle_class(
          input2,
          "disabled",
          /*disabled*/
          ctx2[14]
        ), toggle_class(
          input2,
          "invalid",
          /*invalid*/
          ctx2[15]
        ), toggle_class(
          input2,
          "withIcon",
          /*icon*/
          ctx2[6]
        );
      },
      i: noop,
      o: noop,
      d(detaching) {
        detaching && detach(input2), ctx[35](null), mounted = !1, run_all(dispose);
      }
    };
  }
  function create_default_slot_1$2(ctx) {
    let current;
    const default_slot_template = (
      /*#slots*/
      ctx[34].default
    ), default_slot = create_slot(
      default_slot_template,
      ctx,
      /*$$scope*/
      ctx[39],
      null
    );
    return {
      c() {
        default_slot && default_slot.c();
      },
      m(target, anchor) {
        default_slot && default_slot.m(target, anchor), current = !0;
      },
      p(ctx2, dirty) {
        default_slot && default_slot.p && (!current || dirty[1] & /*$$scope*/
        256) && update_slot_base(
          default_slot,
          default_slot_template,
          ctx2,
          /*$$scope*/
          ctx2[39],
          current ? get_slot_changes(
            default_slot_template,
            /*$$scope*/
            ctx2[39],
            dirty,
            null
          ) : get_all_dirty_from_scope(
            /*$$scope*/
            ctx2[39]
          ),
          null
        );
      },
      i(local) {
        current || (transition_in(default_slot, local), current = !0);
      },
      o(local) {
        transition_out(default_slot, local), current = !1;
      },
      d(detaching) {
        default_slot && default_slot.d(detaching);
      }
    };
  }
  function create_dynamic_element(ctx) {
    let svelte_element, svelte_element_class_value, useActions_action, current, mounted, dispose;
    const default_slot_template = (
      /*#slots*/
      ctx[34].default
    ), default_slot = create_slot(
      default_slot_template,
      ctx,
      /*$$scope*/
      ctx[39],
      null
    );
    let svelte_element_levels = [
      { value: (
        /*value*/
        ctx[1]
      ) },
      { required: (
        /*required*/
        ctx[12]
      ) },
      { disabled: (
        /*disabled*/
        ctx[14]
      ) },
      { id: (
        /*id*/
        ctx[11]
      ) },
      { autocomplete: (
        /*autocomplete*/
        ctx[16]
      ) },
      { type: (
        /*type*/
        ctx[17]
      ) },
      { "aria-invalid": (
        /*invalid*/
        ctx[15]
      ) },
      {
        class: svelte_element_class_value = /*cx*/
        ctx[23](
          /*className*/
          ctx[3],
          /*classes*/
          ctx[22].input,
          `${/*variant*/
          ctx[13]}Variant`
        )
      },
      /*$$restProps*/
      ctx[28]
    ], svelte_element_data = {};
    for (let i2 = 0; i2 < svelte_element_levels.length; i2 += 1)
      svelte_element_data = assign(svelte_element_data, svelte_element_levels[i2]);
    return {
      c() {
        svelte_element = element(
          /*castRoot*/
          ctx[25]()
        ), default_slot && default_slot.c(), /-/.test(
          /*castRoot*/
          ctx[25]()
        ) ? set_custom_element_data_map(svelte_element, svelte_element_data) : set_attributes(svelte_element, svelte_element_data), toggle_class(
          svelte_element,
          "disabled",
          /*disabled*/
          ctx[14]
        ), toggle_class(
          svelte_element,
          "invalid",
          /*invalid*/
          ctx[15]
        ), toggle_class(
          svelte_element,
          "withIcon",
          /*icon*/
          ctx[6]
        );
      },
      m(target, anchor) {
        insert(target, svelte_element, anchor), default_slot && default_slot.m(svelte_element, null), ctx[36](svelte_element), current = !0, mounted || (dispose = [
          listen(
            svelte_element,
            "change",
            /*onChange*/
            ctx[26]
          ),
          action_destroyer(useActions_action = useActions.call(
            null,
            svelte_element,
            /*use*/
            ctx[2]
          )),
          action_destroyer(
            /*forwardEvents*/
            ctx[24].call(null, svelte_element)
          )
        ], mounted = !0);
      },
      p(ctx2, dirty) {
        default_slot && default_slot.p && (!current || dirty[1] & /*$$scope*/
        256) && update_slot_base(
          default_slot,
          default_slot_template,
          ctx2,
          /*$$scope*/
          ctx2[39],
          current ? get_slot_changes(
            default_slot_template,
            /*$$scope*/
            ctx2[39],
            dirty,
            null
          ) : get_all_dirty_from_scope(
            /*$$scope*/
            ctx2[39]
          ),
          null
        ), svelte_element_data = get_spread_update(svelte_element_levels, [
          (!current || dirty[0] & /*value*/
          2) && { value: (
            /*value*/
            ctx2[1]
          ) },
          (!current || dirty[0] & /*required*/
          4096) && { required: (
            /*required*/
            ctx2[12]
          ) },
          (!current || dirty[0] & /*disabled*/
          16384) && { disabled: (
            /*disabled*/
            ctx2[14]
          ) },
          (!current || dirty[0] & /*id*/
          2048) && { id: (
            /*id*/
            ctx2[11]
          ) },
          (!current || dirty[0] & /*autocomplete*/
          65536) && { autocomplete: (
            /*autocomplete*/
            ctx2[16]
          ) },
          (!current || dirty[0] & /*type*/
          131072) && { type: (
            /*type*/
            ctx2[17]
          ) },
          (!current || dirty[0] & /*invalid*/
          32768) && { "aria-invalid": (
            /*invalid*/
            ctx2[15]
          ) },
          (!current || dirty[0] & /*cx, className, classes, variant*/
          12591112 && svelte_element_class_value !== (svelte_element_class_value = /*cx*/
          ctx2[23](
            /*className*/
            ctx2[3],
            /*classes*/
            ctx2[22].input,
            `${/*variant*/
            ctx2[13]}Variant`
          ))) && { class: svelte_element_class_value },
          dirty[0] & /*$$restProps*/
          268435456 && /*$$restProps*/
          ctx2[28]
        ]), /-/.test(
          /*castRoot*/
          ctx2[25]()
        ) ? set_custom_element_data_map(svelte_element, svelte_element_data) : set_attributes(svelte_element, svelte_element_data), useActions_action && is_function(useActions_action.update) && dirty[0] & /*use*/
        4 && useActions_action.update.call(
          null,
          /*use*/
          ctx2[2]
        ), toggle_class(
          svelte_element,
          "disabled",
          /*disabled*/
          ctx2[14]
        ), toggle_class(
          svelte_element,
          "invalid",
          /*invalid*/
          ctx2[15]
        ), toggle_class(
          svelte_element,
          "withIcon",
          /*icon*/
          ctx2[6]
        );
      },
      i(local) {
        current || (transition_in(default_slot, local), current = !0);
      },
      o(local) {
        transition_out(default_slot, local), current = !1;
      },
      d(detaching) {
        detaching && detach(svelte_element), default_slot && default_slot.d(detaching), ctx[36](null), mounted = !1, run_all(dispose);
      }
    };
  }
  function create_if_block$2(ctx) {
    let div, div_class_value, current;
    const rightSection_slot_template = (
      /*#slots*/
      ctx[34].rightSection
    ), rightSection_slot = create_slot(
      rightSection_slot_template,
      ctx,
      /*$$scope*/
      ctx[39],
      get_rightSection_slot_context$2
    );
    let div_levels = [
      /*rightSectionProps*/
      ctx[9],
      {
        class: div_class_value = /*classes*/
        ctx[22].rightSection
      }
    ], div_data = {};
    for (let i2 = 0; i2 < div_levels.length; i2 += 1)
      div_data = assign(div_data, div_levels[i2]);
    return {
      c() {
        div = element("div"), rightSection_slot && rightSection_slot.c(), set_attributes(div, div_data);
      },
      m(target, anchor) {
        insert(target, div, anchor), rightSection_slot && rightSection_slot.m(div, null), current = !0;
      },
      p(ctx2, dirty) {
        rightSection_slot && rightSection_slot.p && (!current || dirty[1] & /*$$scope*/
        256) && update_slot_base(
          rightSection_slot,
          rightSection_slot_template,
          ctx2,
          /*$$scope*/
          ctx2[39],
          current ? get_slot_changes(
            rightSection_slot_template,
            /*$$scope*/
            ctx2[39],
            dirty,
            get_rightSection_slot_changes$2
          ) : get_all_dirty_from_scope(
            /*$$scope*/
            ctx2[39]
          ),
          get_rightSection_slot_context$2
        ), set_attributes(div, div_data = get_spread_update(div_levels, [
          dirty[0] & /*rightSectionProps*/
          512 && /*rightSectionProps*/
          ctx2[9],
          (!current || dirty[0] & /*classes*/
          4194304 && div_class_value !== (div_class_value = /*classes*/
          ctx2[22].rightSection)) && { class: div_class_value }
        ]));
      },
      i(local) {
        current || (transition_in(rightSection_slot, local), current = !0);
      },
      o(local) {
        transition_out(rightSection_slot, local), current = !1;
      },
      d(detaching) {
        detaching && detach(div), rightSection_slot && rightSection_slot.d(detaching);
      }
    };
  }
  function create_default_slot$3(ctx) {
    let t0, show_if, current_block_type_index, if_block1, t1, if_block2_anchor, current, if_block0 = (
      /*icon*/
      ctx[6] && create_if_block_4(ctx)
    );
    const if_block_creators = [create_if_block_1$1, create_if_block_2$1, create_if_block_3], if_blocks = [];
    function select_block_type(ctx2, dirty) {
      return dirty[0] & /*isHTMLElement, root*/
      524320 && (show_if = null), /*isHTMLElement*/
      ctx2[19] && /*root*/
      ctx2[5] === "input" ? 0 : (show_if == null && (show_if = !!/*isHTMLElement*/
      (ctx2[19] && isInput(String(
        /*root*/
        ctx2[5]
      )))), show_if ? 1 : (
        /*isComponent*/
        ctx2[20] && typeof /*root*/
        ctx2[5] != "string" ? 2 : -1
      ));
    }
    ~(current_block_type_index = select_block_type(ctx, [-1, -1])) && (if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx));
    let if_block2 = (
      /*showRightSection*/
      ctx[8] && create_if_block$2(ctx)
    );
    return {
      c() {
        if_block0 && if_block0.c(), t0 = space(), if_block1 && if_block1.c(), t1 = space(), if_block2 && if_block2.c(), if_block2_anchor = empty();
      },
      m(target, anchor) {
        if_block0 && if_block0.m(target, anchor), insert(target, t0, anchor), ~current_block_type_index && if_blocks[current_block_type_index].m(target, anchor), insert(target, t1, anchor), if_block2 && if_block2.m(target, anchor), insert(target, if_block2_anchor, anchor), current = !0;
      },
      p(ctx2, dirty) {
        /*icon*/
        ctx2[6] ? if_block0 ? (if_block0.p(ctx2, dirty), dirty[0] & /*icon*/
        64 && transition_in(if_block0, 1)) : (if_block0 = create_if_block_4(ctx2), if_block0.c(), transition_in(if_block0, 1), if_block0.m(t0.parentNode, t0)) : if_block0 && (group_outros(), transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        }), check_outros());
        let previous_block_index = current_block_type_index;
        current_block_type_index = select_block_type(ctx2, dirty), current_block_type_index === previous_block_index ? ~current_block_type_index && if_blocks[current_block_type_index].p(ctx2, dirty) : (if_block1 && (group_outros(), transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        }), check_outros()), ~current_block_type_index ? (if_block1 = if_blocks[current_block_type_index], if_block1 ? if_block1.p(ctx2, dirty) : (if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2), if_block1.c()), transition_in(if_block1, 1), if_block1.m(t1.parentNode, t1)) : if_block1 = null), /*showRightSection*/
        ctx2[8] ? if_block2 ? (if_block2.p(ctx2, dirty), dirty[0] & /*showRightSection*/
        256 && transition_in(if_block2, 1)) : (if_block2 = create_if_block$2(ctx2), if_block2.c(), transition_in(if_block2, 1), if_block2.m(if_block2_anchor.parentNode, if_block2_anchor)) : if_block2 && (group_outros(), transition_out(if_block2, 1, 1, () => {
          if_block2 = null;
        }), check_outros());
      },
      i(local) {
        current || (transition_in(if_block0), transition_in(if_block1), transition_in(if_block2), current = !0);
      },
      o(local) {
        transition_out(if_block0), transition_out(if_block1), transition_out(if_block2), current = !1;
      },
      d(detaching) {
        if_block0 && if_block0.d(detaching), detaching && detach(t0), ~current_block_type_index && if_blocks[current_block_type_index].d(detaching), detaching && detach(t1), if_block2 && if_block2.d(detaching), detaching && detach(if_block2_anchor);
      }
    };
  }
  function create_fragment$7(ctx) {
    let box, current;
    const box_spread_levels = [
      /*wrapperProps*/
      ctx[10],
      {
        class: (
          /*getStyles*/
          ctx[21]({ css: (
            /*override*/
            ctx[4]
          ) })
        )
      },
      /*$$restProps*/
      ctx[28]
    ];
    let box_props = {
      $$slots: { default: [create_default_slot$3] },
      $$scope: { ctx }
    };
    for (let i2 = 0; i2 < box_spread_levels.length; i2 += 1)
      box_props = assign(box_props, box_spread_levels[i2]);
    return box = new Box$1({ props: box_props }), {
      c() {
        create_component(box.$$.fragment);
      },
      m(target, anchor) {
        mount_component(box, target, anchor), current = !0;
      },
      p(ctx2, dirty) {
        const box_changes = dirty[0] & /*wrapperProps, getStyles, override, $$restProps*/
        270533648 ? get_spread_update(box_spread_levels, [
          dirty[0] & /*wrapperProps*/
          1024 && get_spread_object(
            /*wrapperProps*/
            ctx2[10]
          ),
          dirty[0] & /*getStyles, override*/
          2097168 && {
            class: (
              /*getStyles*/
              ctx2[21]({ css: (
                /*override*/
                ctx2[4]
              ) })
            )
          },
          dirty[0] & /*$$restProps*/
          268435456 && get_spread_object(
            /*$$restProps*/
            ctx2[28]
          )
        ]) : {};
        dirty[0] & /*rightSectionProps, classes, showRightSection, value, type, required, disabled, id, placeholder, autocomplete, invalid, cx, className, variant, $$restProps, element, use, icon, isHTMLElement, root, isComponent, iconProps*/
        283114479 | dirty[1] & /*$$scope*/
        256 && (box_changes.$$scope = { dirty, ctx: ctx2 }), box.$set(box_changes);
      },
      i(local) {
        current || (transition_in(box.$$.fragment, local), current = !0);
      },
      o(local) {
        transition_out(box.$$.fragment, local), current = !1;
      },
      d(detaching) {
        destroy_component(box, detaching);
      }
    };
  }
  function isInput(root2) {
    return ["input", "select", "textarea", "datalist"].includes(root2);
  }
  function instance$7($$self, $$props, $$invalidate) {
    let cx2, classes, getStyles;
    const omit_props_names = [
      "use",
      "element",
      "class",
      "override",
      "root",
      "icon",
      "iconWidth",
      "iconProps",
      "showRightSection",
      "rightSectionWidth",
      "rightSectionProps",
      "wrapperProps",
      "id",
      "required",
      "radius",
      "variant",
      "disabled",
      "size",
      "value",
      "invalid",
      "multiline",
      "autocomplete",
      "type",
      "placeholder"
    ];
    let $$restProps = compute_rest_props($$props, omit_props_names), { $$slots: slots = {}, $$scope } = $$props;
    const $$slots = compute_slots(slots);
    let { use = [], element: element2 = void 0, class: className = "", override = {}, root: root2 = "input", icon = null, iconWidth = 36, iconProps = { size: 20, color: "currentColor" }, showRightSection = $$slots.rightSection, rightSectionWidth = 36, rightSectionProps = {}, wrapperProps = {}, id = "input-id", required = !1, radius: radius2 = "sm", variant: variant2 = "default", disabled = !1, size: size2 = "sm", value = "", invalid = !1, multiline = !1, autocomplete = "on", type = "text", placeholder = void 0 } = $$props;
    const forwardEvents = createEventForwarder(get_current_component());
    function castRoot() {
      return root2;
    }
    let isHTMLElement = !0, isComponent = !1;
    function onChange() {
      $$invalidate(1, value = this.value);
    }
    function onInput(event) {
      event.target.type === "checkbox" ? $$invalidate(1, value = event.target.checked) : event.target.type === "number" || event.target.type === "range" ? $$invalidate(1, value = +event.target.value) : $$invalidate(1, value = event.target.value);
    }
    function input_binding($$value) {
      binding_callbacks[$$value ? "unshift" : "push"](() => {
        element2 = $$value, $$invalidate(0, element2);
      });
    }
    function svelte_element_binding($$value) {
      binding_callbacks[$$value ? "unshift" : "push"](() => {
        element2 = $$value, $$invalidate(0, element2);
      });
    }
    function switch_instance_element_binding(value2) {
      element2 = value2, $$invalidate(0, element2);
    }
    function switch_instance_value_binding(value$1) {
      value = value$1, $$invalidate(1, value);
    }
    return $$self.$$set = ($$new_props) => {
      $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)), $$invalidate(28, $$restProps = compute_rest_props($$props, omit_props_names)), "use" in $$new_props && $$invalidate(2, use = $$new_props.use), "element" in $$new_props && $$invalidate(0, element2 = $$new_props.element), "class" in $$new_props && $$invalidate(3, className = $$new_props.class), "override" in $$new_props && $$invalidate(4, override = $$new_props.override), "root" in $$new_props && $$invalidate(5, root2 = $$new_props.root), "icon" in $$new_props && $$invalidate(6, icon = $$new_props.icon), "iconWidth" in $$new_props && $$invalidate(29, iconWidth = $$new_props.iconWidth), "iconProps" in $$new_props && $$invalidate(7, iconProps = $$new_props.iconProps), "showRightSection" in $$new_props && $$invalidate(8, showRightSection = $$new_props.showRightSection), "rightSectionWidth" in $$new_props && $$invalidate(30, rightSectionWidth = $$new_props.rightSectionWidth), "rightSectionProps" in $$new_props && $$invalidate(9, rightSectionProps = $$new_props.rightSectionProps), "wrapperProps" in $$new_props && $$invalidate(10, wrapperProps = $$new_props.wrapperProps), "id" in $$new_props && $$invalidate(11, id = $$new_props.id), "required" in $$new_props && $$invalidate(12, required = $$new_props.required), "radius" in $$new_props && $$invalidate(31, radius2 = $$new_props.radius), "variant" in $$new_props && $$invalidate(13, variant2 = $$new_props.variant), "disabled" in $$new_props && $$invalidate(14, disabled = $$new_props.disabled), "size" in $$new_props && $$invalidate(32, size2 = $$new_props.size), "value" in $$new_props && $$invalidate(1, value = $$new_props.value), "invalid" in $$new_props && $$invalidate(15, invalid = $$new_props.invalid), "multiline" in $$new_props && $$invalidate(33, multiline = $$new_props.multiline), "autocomplete" in $$new_props && $$invalidate(16, autocomplete = $$new_props.autocomplete), "type" in $$new_props && $$invalidate(17, type = $$new_props.type), "placeholder" in $$new_props && $$invalidate(18, placeholder = $$new_props.placeholder), "$$scope" in $$new_props && $$invalidate(39, $$scope = $$new_props.$$scope);
    }, $$self.$$.update = () => {
      $$self.$$.dirty[0] & /*root*/
      32 && ($$invalidate(19, isHTMLElement = root2 && typeof root2 == "string"), $$invalidate(20, isComponent = root2 && typeof root2 == "function")), $$self.$$.dirty[0] & /*icon, iconWidth, invalid, rightSectionWidth, showRightSection, variant*/
      1610654016 | $$self.$$.dirty[1] & /*multiline, radius, size*/
      7 && $$invalidate(
        23,
        { cx: cx2, classes, getStyles } = useStyles(
          {
            icon,
            iconWidth,
            invalid,
            multiline,
            radius: radius2,
            rightSectionWidth,
            showRightSection,
            size: size2,
            variant: variant2
          },
          { name: "Input" }
        ),
        cx2,
        ($$invalidate(22, classes), $$invalidate(6, icon), $$invalidate(29, iconWidth), $$invalidate(15, invalid), $$invalidate(33, multiline), $$invalidate(31, radius2), $$invalidate(30, rightSectionWidth), $$invalidate(8, showRightSection), $$invalidate(32, size2), $$invalidate(13, variant2)),
        ($$invalidate(21, getStyles), $$invalidate(6, icon), $$invalidate(29, iconWidth), $$invalidate(15, invalid), $$invalidate(33, multiline), $$invalidate(31, radius2), $$invalidate(30, rightSectionWidth), $$invalidate(8, showRightSection), $$invalidate(32, size2), $$invalidate(13, variant2))
      );
    }, [
      element2,
      value,
      use,
      className,
      override,
      root2,
      icon,
      iconProps,
      showRightSection,
      rightSectionProps,
      wrapperProps,
      id,
      required,
      variant2,
      disabled,
      invalid,
      autocomplete,
      type,
      placeholder,
      isHTMLElement,
      isComponent,
      getStyles,
      classes,
      cx2,
      forwardEvents,
      castRoot,
      onChange,
      onInput,
      $$restProps,
      iconWidth,
      rightSectionWidth,
      radius2,
      size2,
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
      super(), init(
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
  function create_fragment$6(ctx) {
    let svg, path;
    return {
      c() {
        svg = svg_element("svg"), path = svg_element("path"), attr(path, "d", "M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z"), attr(
          path,
          "fill",
          /*color*/
          ctx[0]
        ), attr(path, "fill-rule", "evenodd"), attr(path, "clip-rule", "evenodd"), attr(
          svg,
          "width",
          /*size*/
          ctx[1]
        ), attr(
          svg,
          "height",
          /*size*/
          ctx[1]
        ), attr(svg, "viewBox", "0 0 15 15"), attr(svg, "fill", "none"), attr(svg, "xmlns", "http://www.w3.org/2000/svg"), set_style(svg, "color", "#868e96"), attr(svg, "data-chevron", "true");
      },
      m(target, anchor) {
        insert(target, svg, anchor), append(svg, path);
      },
      p(ctx2, [dirty]) {
        dirty & /*color*/
        1 && attr(
          path,
          "fill",
          /*color*/
          ctx2[0]
        ), dirty & /*size*/
        2 && attr(
          svg,
          "width",
          /*size*/
          ctx2[1]
        ), dirty & /*size*/
        2 && attr(
          svg,
          "height",
          /*size*/
          ctx2[1]
        );
      },
      i: noop,
      o: noop,
      d(detaching) {
        detaching && detach(svg);
      }
    };
  }
  function instance$6($$self, $$props, $$invalidate) {
    let { color = "currentColor" } = $$props, { size: size2 = 15 } = $$props;
    return $$self.$$set = ($$props2) => {
      "color" in $$props2 && $$invalidate(0, color = $$props2.color), "size" in $$props2 && $$invalidate(1, size2 = $$props2.size);
    }, [color, size2];
  }
  class ChevronUpDown extends SvelteComponent {
    constructor(options) {
      super(), init(this, options, instance$6, create_fragment$6, safe_not_equal, { color: 0, size: 1 });
    }
  }
  const ChevronUpDown$1 = ChevronUpDown;
  function get_each_context(ctx, list2, i2) {
    const child_ctx = ctx.slice();
    return child_ctx[35] = list2[i2], child_ctx;
  }
  const get_rightSection_slot_changes$1 = (dirty) => ({
    size: dirty[0] & /*iconProps*/
    2048,
    color: dirty[0] & /*iconProps*/
    2048
  }), get_rightSection_slot_context$1 = (ctx) => ({
    size: (
      /*iconProps*/
      ctx[11].size
    ),
    color: (
      /*iconProps*/
      ctx[11].color
    )
  });
  function create_if_block$1(ctx) {
    let option, t2, option_selected_value;
    return {
      c() {
        option = element("option"), t2 = text(
          /*placeholder*/
          ctx[5]
        ), option.__value = "", option.value = option.__value, option.disabled = !0, option.hidden = !0, option.selected = option_selected_value = !/*value*/
        ctx[1];
      },
      m(target, anchor) {
        insert(target, option, anchor), append(option, t2);
      },
      p(ctx2, dirty) {
        dirty[0] & /*placeholder*/
        32 && set_data(
          t2,
          /*placeholder*/
          ctx2[5]
        ), dirty[0] & /*value*/
        2 && option_selected_value !== (option_selected_value = !/*value*/
        ctx2[1]) && (option.selected = option_selected_value);
      },
      d(detaching) {
        detaching && detach(option);
      }
    };
  }
  function create_else_block(ctx) {
    let option;
    return {
      c() {
        option = element("option"), option.textContent = "Add Some Options", option.__value = "", option.value = option.__value, option.disabled = !0, option.hidden = !0;
      },
      m(target, anchor) {
        insert(target, option, anchor);
      },
      p: noop,
      d(detaching) {
        detaching && detach(option);
      }
    };
  }
  function create_each_block(ctx) {
    let option, t0_value = (
      /*item*/
      (ctx[35].label ?? /*item*/
      ctx[35].value) + ""
    ), t0, t1, option_value_value, option_disabled_value, option_selected_value;
    return {
      c() {
        option = element("option"), t0 = text(t0_value), t1 = space(), option.__value = option_value_value = /*item*/
        ctx[35].value, option.value = option.__value, option.disabled = option_disabled_value = /*item*/
        ctx[35].disabled, option.selected = option_selected_value = /*item*/
        ctx[35].value === /*value*/
        ctx[1];
      },
      m(target, anchor) {
        insert(target, option, anchor), append(option, t0), append(option, t1);
      },
      p(ctx2, dirty) {
        dirty[0] & /*formattedData*/
        16777216 && t0_value !== (t0_value = /*item*/
        (ctx2[35].label ?? /*item*/
        ctx2[35].value) + "") && set_data(t0, t0_value), dirty[0] & /*formattedData*/
        16777216 && option_value_value !== (option_value_value = /*item*/
        ctx2[35].value) && (option.__value = option_value_value, option.value = option.__value), dirty[0] & /*formattedData*/
        16777216 && option_disabled_value !== (option_disabled_value = /*item*/
        ctx2[35].disabled) && (option.disabled = option_disabled_value), dirty[0] & /*formattedData, value*/
        16777218 && option_selected_value !== (option_selected_value = /*item*/
        ctx2[35].value === /*value*/
        ctx2[1]) && (option.selected = option_selected_value);
      },
      d(detaching) {
        detaching && detach(option);
      }
    };
  }
  function create_default_slot_1$1(ctx) {
    let t2, each_1_anchor, if_block = (
      /*placeholder*/
      ctx[5] && create_if_block$1(ctx)
    ), each_value = (
      /*formattedData*/
      ctx[24]
    ), each_blocks = [];
    for (let i2 = 0; i2 < each_value.length; i2 += 1)
      each_blocks[i2] = create_each_block(get_each_context(ctx, each_value, i2));
    let each_1_else = null;
    return each_value.length || (each_1_else = create_else_block()), {
      c() {
        if_block && if_block.c(), t2 = space();
        for (let i2 = 0; i2 < each_blocks.length; i2 += 1)
          each_blocks[i2].c();
        each_1_anchor = empty(), each_1_else && each_1_else.c();
      },
      m(target, anchor) {
        if_block && if_block.m(target, anchor), insert(target, t2, anchor);
        for (let i2 = 0; i2 < each_blocks.length; i2 += 1)
          each_blocks[i2].m(target, anchor);
        insert(target, each_1_anchor, anchor), each_1_else && each_1_else.m(target, anchor);
      },
      p(ctx2, dirty) {
        if (/*placeholder*/
        ctx2[5] ? if_block ? if_block.p(ctx2, dirty) : (if_block = create_if_block$1(ctx2), if_block.c(), if_block.m(t2.parentNode, t2)) : if_block && (if_block.d(1), if_block = null), dirty[0] & /*formattedData, value*/
        16777218) {
          each_value = /*formattedData*/
          ctx2[24];
          let i2;
          for (i2 = 0; i2 < each_value.length; i2 += 1) {
            const child_ctx = get_each_context(ctx2, each_value, i2);
            each_blocks[i2] ? each_blocks[i2].p(child_ctx, dirty) : (each_blocks[i2] = create_each_block(child_ctx), each_blocks[i2].c(), each_blocks[i2].m(each_1_anchor.parentNode, each_1_anchor));
          }
          for (; i2 < each_blocks.length; i2 += 1)
            each_blocks[i2].d(1);
          each_blocks.length = each_value.length, !each_value.length && each_1_else ? each_1_else.p(ctx2, dirty) : each_value.length ? each_1_else && (each_1_else.d(1), each_1_else = null) : (each_1_else = create_else_block(), each_1_else.c(), each_1_else.m(each_1_anchor.parentNode, each_1_anchor));
        }
      },
      d(detaching) {
        if_block && if_block.d(detaching), detaching && detach(t2), destroy_each(each_blocks, detaching), detaching && detach(each_1_anchor), each_1_else && each_1_else.d(detaching);
      }
    };
  }
  function fallback_block(ctx) {
    let switch_instance, switch_instance_anchor, current;
    var switch_value = ChevronUpDown$1;
    function switch_props(ctx2) {
      return {
        props: {
          size: (
            /*iconProps*/
            ctx2[11].size
          ),
          color: (
            /*iconProps*/
            ctx2[11].color
          )
        }
      };
    }
    return switch_value && (switch_instance = construct_svelte_component(switch_value, switch_props(ctx))), {
      c() {
        switch_instance && create_component(switch_instance.$$.fragment), switch_instance_anchor = empty();
      },
      m(target, anchor) {
        switch_instance && mount_component(switch_instance, target, anchor), insert(target, switch_instance_anchor, anchor), current = !0;
      },
      p(ctx2, dirty) {
        const switch_instance_changes = {};
        if (dirty[0] & /*iconProps*/
        2048 && (switch_instance_changes.size = /*iconProps*/
        ctx2[11].size), dirty[0] & /*iconProps*/
        2048 && (switch_instance_changes.color = /*iconProps*/
        ctx2[11].color), switch_value !== (switch_value = ChevronUpDown$1)) {
          if (switch_instance) {
            group_outros();
            const old_component = switch_instance;
            transition_out(old_component.$$.fragment, 1, 0, () => {
              destroy_component(old_component, 1);
            }), check_outros();
          }
          switch_value ? (switch_instance = construct_svelte_component(switch_value, switch_props(ctx2)), create_component(switch_instance.$$.fragment), transition_in(switch_instance.$$.fragment, 1), mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor)) : switch_instance = null;
        } else
          switch_value && switch_instance.$set(switch_instance_changes);
      },
      i(local) {
        current || (switch_instance && transition_in(switch_instance.$$.fragment, local), current = !0);
      },
      o(local) {
        switch_instance && transition_out(switch_instance.$$.fragment, local), current = !1;
      },
      d(detaching) {
        detaching && detach(switch_instance_anchor), switch_instance && destroy_component(switch_instance, detaching);
      }
    };
  }
  function create_rightSection_slot$1(ctx) {
    let current;
    const rightSection_slot_template = (
      /*#slots*/
      ctx[31].rightSection
    ), rightSection_slot = create_slot(
      rightSection_slot_template,
      ctx,
      /*$$scope*/
      ctx[34],
      get_rightSection_slot_context$1
    ), rightSection_slot_or_fallback = rightSection_slot || fallback_block(ctx);
    return {
      c() {
        rightSection_slot_or_fallback && rightSection_slot_or_fallback.c();
      },
      m(target, anchor) {
        rightSection_slot_or_fallback && rightSection_slot_or_fallback.m(target, anchor), current = !0;
      },
      p(ctx2, dirty) {
        rightSection_slot ? rightSection_slot.p && (!current || dirty[0] & /*iconProps*/
        2048 | dirty[1] & /*$$scope*/
        8) && update_slot_base(
          rightSection_slot,
          rightSection_slot_template,
          ctx2,
          /*$$scope*/
          ctx2[34],
          current ? get_slot_changes(
            rightSection_slot_template,
            /*$$scope*/
            ctx2[34],
            dirty,
            get_rightSection_slot_changes$1
          ) : get_all_dirty_from_scope(
            /*$$scope*/
            ctx2[34]
          ),
          get_rightSection_slot_context$1
        ) : rightSection_slot_or_fallback && rightSection_slot_or_fallback.p && (!current || dirty[0] & /*iconProps*/
        2048) && rightSection_slot_or_fallback.p(ctx2, current ? dirty : [-1, -1]);
      },
      i(local) {
        current || (transition_in(rightSection_slot_or_fallback, local), current = !0);
      },
      o(local) {
        transition_out(rightSection_slot_or_fallback, local), current = !1;
      },
      d(detaching) {
        rightSection_slot_or_fallback && rightSection_slot_or_fallback.d(detaching);
      }
    };
  }
  function create_default_slot$2(ctx) {
    let input2, updating_element, updating_value, current;
    const input_spread_levels = [
      {
        use: [
          /*forwardEvents*/
          ctx[26],
          [
            useActions,
            /*use*/
            ctx[2]
          ]
        ]
      },
      { root: "select" },
      { id: (
        /*uuid*/
        ctx[25]
      ) },
      { autocomplete: "off" },
      { invalid: Boolean(
        /*error*/
        ctx[20]
      ) },
      {
        override: {
          .../*base*/
          ctx[27],
          .../*inputStyle*/
          ctx[6]
        }
      },
      { size: (
        /*size*/
        ctx[8]
      ) },
      { icon: (
        /*icon*/
        ctx[9]
      ) },
      { radius: (
        /*radius*/
        ctx[15]
      ) },
      { variant: (
        /*variant*/
        ctx[16]
      ) },
      { required: (
        /*required*/
        ctx[14]
      ) },
      { disabled: (
        /*disabled*/
        ctx[17]
      ) },
      { iconWidth: (
        /*iconWidth*/
        ctx[10]
      ) },
      { iconProps: (
        /*iconProps*/
        ctx[11]
      ) },
      { placeholder: (
        /*placeholder*/
        ctx[5]
      ) },
      {
        rightSectionWidth: (
          /*rightSectionWidth*/
          ctx[12]
        )
      },
      {
        rightSectionProps: (
          /*rightSectionProps*/
          ctx[13]
        )
      },
      /*$$restProps*/
      ctx[28]
    ];
    function input_element_binding(value) {
      ctx[32](value);
    }
    function input_value_binding(value) {
      ctx[33](value);
    }
    let input_props = {
      $$slots: {
        rightSection: [create_rightSection_slot$1],
        default: [create_default_slot_1$1]
      },
      $$scope: { ctx }
    };
    for (let i2 = 0; i2 < input_spread_levels.length; i2 += 1)
      input_props = assign(input_props, input_spread_levels[i2]);
    return (
      /*element*/
      ctx[0] !== void 0 && (input_props.element = /*element*/
      ctx[0]), /*value*/
      ctx[1] !== void 0 && (input_props.value = /*value*/
      ctx[1]), input2 = new Input$1({ props: input_props }), binding_callbacks.push(() => bind(input2, "element", input_element_binding)), binding_callbacks.push(() => bind(input2, "value", input_value_binding)), {
        c() {
          create_component(input2.$$.fragment);
        },
        m(target, anchor) {
          mount_component(input2, target, anchor), current = !0;
        },
        p(ctx2, dirty) {
          const input_changes = dirty[0] & /*forwardEvents, use, uuid, error, base, inputStyle, size, icon, radius, variant, required, disabled, iconWidth, iconProps, placeholder, rightSectionWidth, rightSectionProps, $$restProps*/
          504627044 ? get_spread_update(input_spread_levels, [
            dirty[0] & /*forwardEvents, use*/
            67108868 && {
              use: [
                /*forwardEvents*/
                ctx2[26],
                [
                  useActions,
                  /*use*/
                  ctx2[2]
                ]
              ]
            },
            input_spread_levels[1],
            dirty[0] & /*uuid*/
            33554432 && { id: (
              /*uuid*/
              ctx2[25]
            ) },
            input_spread_levels[3],
            dirty[0] & /*error*/
            1048576 && { invalid: Boolean(
              /*error*/
              ctx2[20]
            ) },
            dirty[0] & /*base, inputStyle*/
            134217792 && {
              override: {
                .../*base*/
                ctx2[27],
                .../*inputStyle*/
                ctx2[6]
              }
            },
            dirty[0] & /*size*/
            256 && { size: (
              /*size*/
              ctx2[8]
            ) },
            dirty[0] & /*icon*/
            512 && { icon: (
              /*icon*/
              ctx2[9]
            ) },
            dirty[0] & /*radius*/
            32768 && { radius: (
              /*radius*/
              ctx2[15]
            ) },
            dirty[0] & /*variant*/
            65536 && { variant: (
              /*variant*/
              ctx2[16]
            ) },
            dirty[0] & /*required*/
            16384 && { required: (
              /*required*/
              ctx2[14]
            ) },
            dirty[0] & /*disabled*/
            131072 && { disabled: (
              /*disabled*/
              ctx2[17]
            ) },
            dirty[0] & /*iconWidth*/
            1024 && { iconWidth: (
              /*iconWidth*/
              ctx2[10]
            ) },
            dirty[0] & /*iconProps*/
            2048 && { iconProps: (
              /*iconProps*/
              ctx2[11]
            ) },
            dirty[0] & /*placeholder*/
            32 && { placeholder: (
              /*placeholder*/
              ctx2[5]
            ) },
            dirty[0] & /*rightSectionWidth*/
            4096 && {
              rightSectionWidth: (
                /*rightSectionWidth*/
                ctx2[12]
              )
            },
            dirty[0] & /*rightSectionProps*/
            8192 && {
              rightSectionProps: (
                /*rightSectionProps*/
                ctx2[13]
              )
            },
            dirty[0] & /*$$restProps*/
            268435456 && get_spread_object(
              /*$$restProps*/
              ctx2[28]
            )
          ]) : {};
          dirty[0] & /*iconProps, formattedData, value, placeholder*/
          16779298 | dirty[1] & /*$$scope*/
          8 && (input_changes.$$scope = { dirty, ctx: ctx2 }), !updating_element && dirty[0] & /*element*/
          1 && (updating_element = !0, input_changes.element = /*element*/
          ctx2[0], add_flush_callback(() => updating_element = !1)), !updating_value && dirty[0] & /*value*/
          2 && (updating_value = !0, input_changes.value = /*value*/
          ctx2[1], add_flush_callback(() => updating_value = !1)), input2.$set(input_changes);
        },
        i(local) {
          current || (transition_in(input2.$$.fragment, local), current = !0);
        },
        o(local) {
          transition_out(input2.$$.fragment, local), current = !1;
        },
        d(detaching) {
          destroy_component(input2, detaching);
        }
      }
    );
  }
  function create_fragment$5(ctx) {
    let inputwrapper, current;
    const inputwrapper_spread_levels = [
      { id: (
        /*uuid*/
        ctx[25]
      ) },
      { class: (
        /*className*/
        ctx[3]
      ) },
      { size: (
        /*size*/
        ctx[8]
      ) },
      { label: (
        /*label*/
        ctx[18]
      ) },
      { error: (
        /*error*/
        ctx[20]
      ) },
      { override: (
        /*override*/
        ctx[4]
      ) },
      { required: (
        /*required*/
        ctx[14]
      ) },
      { labelProps: (
        /*labelProps*/
        ctx[21]
      ) },
      { errorProps: (
        /*errorProps*/
        ctx[23]
      ) },
      { description: (
        /*description*/
        ctx[19]
      ) },
      {
        descriptionProps: (
          /*descriptionProps*/
          ctx[22]
        )
      },
      /*wrapperProps*/
      ctx[7]
    ];
    let inputwrapper_props = {
      $$slots: { default: [create_default_slot$2] },
      $$scope: { ctx }
    };
    for (let i2 = 0; i2 < inputwrapper_spread_levels.length; i2 += 1)
      inputwrapper_props = assign(inputwrapper_props, inputwrapper_spread_levels[i2]);
    return inputwrapper = new InputWrapper$1({ props: inputwrapper_props }), {
      c() {
        create_component(inputwrapper.$$.fragment);
      },
      m(target, anchor) {
        mount_component(inputwrapper, target, anchor), current = !0;
      },
      p(ctx2, dirty) {
        const inputwrapper_changes = dirty[0] & /*uuid, className, size, label, error, override, required, labelProps, errorProps, description, descriptionProps, wrapperProps*/
        50086296 ? get_spread_update(inputwrapper_spread_levels, [
          dirty[0] & /*uuid*/
          33554432 && { id: (
            /*uuid*/
            ctx2[25]
          ) },
          dirty[0] & /*className*/
          8 && { class: (
            /*className*/
            ctx2[3]
          ) },
          dirty[0] & /*size*/
          256 && { size: (
            /*size*/
            ctx2[8]
          ) },
          dirty[0] & /*label*/
          262144 && { label: (
            /*label*/
            ctx2[18]
          ) },
          dirty[0] & /*error*/
          1048576 && { error: (
            /*error*/
            ctx2[20]
          ) },
          dirty[0] & /*override*/
          16 && { override: (
            /*override*/
            ctx2[4]
          ) },
          dirty[0] & /*required*/
          16384 && { required: (
            /*required*/
            ctx2[14]
          ) },
          dirty[0] & /*labelProps*/
          2097152 && { labelProps: (
            /*labelProps*/
            ctx2[21]
          ) },
          dirty[0] & /*errorProps*/
          8388608 && { errorProps: (
            /*errorProps*/
            ctx2[23]
          ) },
          dirty[0] & /*description*/
          524288 && { description: (
            /*description*/
            ctx2[19]
          ) },
          dirty[0] & /*descriptionProps*/
          4194304 && {
            descriptionProps: (
              /*descriptionProps*/
              ctx2[22]
            )
          },
          dirty[0] & /*wrapperProps*/
          128 && get_spread_object(
            /*wrapperProps*/
            ctx2[7]
          )
        ]) : {};
        dirty[0] & /*use, error, inputStyle, size, icon, radius, variant, required, disabled, iconWidth, iconProps, placeholder, rightSectionWidth, rightSectionProps, $$restProps, element, value, formattedData*/
        286523239 | dirty[1] & /*$$scope*/
        8 && (inputwrapper_changes.$$scope = { dirty, ctx: ctx2 }), inputwrapper.$set(inputwrapper_changes);
      },
      i(local) {
        current || (transition_in(inputwrapper.$$.fragment, local), current = !0);
      },
      o(local) {
        transition_out(inputwrapper.$$.fragment, local), current = !1;
      },
      d(detaching) {
        destroy_component(inputwrapper, detaching);
      }
    };
  }
  function instance$5($$self, $$props, $$invalidate) {
    const omit_props_names = [
      "use",
      "element",
      "class",
      "override",
      "id",
      "placeholder",
      "data",
      "inputStyle",
      "wrapperProps",
      "size",
      "icon",
      "iconWidth",
      "iconProps",
      "rightSectionWidth",
      "rightSectionProps",
      "required",
      "radius",
      "variant",
      "disabled",
      "value",
      "label",
      "description",
      "error",
      "labelProps",
      "descriptionProps",
      "errorProps"
    ];
    let $$restProps = compute_rest_props($$props, omit_props_names), { $$slots: slots = {}, $$scope } = $$props, { use = [], element: element2 = void 0, class: className = "", override = {}, id = "NativeSelect", placeholder = "", data = [], inputStyle = {}, wrapperProps = {}, size: size2 = "sm", icon = null, iconWidth = 36, iconProps = { size: 20, color: "currentColor" }, rightSectionWidth = 36, rightSectionProps = {}, required = !1, radius: radius2 = "sm", variant: variant2 = "default", disabled = !1, value = "", label = "", description = "", error = "", labelProps = {}, descriptionProps = {}, errorProps = {} } = $$props;
    const uuid = randomID(id);
    let formattedData = [];
    const forwardEvents = createEventForwarder(get_current_component()), base = { "& .input": { paddingLeft: 12 } };
    function input_element_binding(value2) {
      element2 = value2, $$invalidate(0, element2);
    }
    function input_value_binding(value$1) {
      value = value$1, $$invalidate(1, value);
    }
    return $$self.$$set = ($$new_props) => {
      $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)), $$invalidate(28, $$restProps = compute_rest_props($$props, omit_props_names)), "use" in $$new_props && $$invalidate(2, use = $$new_props.use), "element" in $$new_props && $$invalidate(0, element2 = $$new_props.element), "class" in $$new_props && $$invalidate(3, className = $$new_props.class), "override" in $$new_props && $$invalidate(4, override = $$new_props.override), "id" in $$new_props && $$invalidate(29, id = $$new_props.id), "placeholder" in $$new_props && $$invalidate(5, placeholder = $$new_props.placeholder), "data" in $$new_props && $$invalidate(30, data = $$new_props.data), "inputStyle" in $$new_props && $$invalidate(6, inputStyle = $$new_props.inputStyle), "wrapperProps" in $$new_props && $$invalidate(7, wrapperProps = $$new_props.wrapperProps), "size" in $$new_props && $$invalidate(8, size2 = $$new_props.size), "icon" in $$new_props && $$invalidate(9, icon = $$new_props.icon), "iconWidth" in $$new_props && $$invalidate(10, iconWidth = $$new_props.iconWidth), "iconProps" in $$new_props && $$invalidate(11, iconProps = $$new_props.iconProps), "rightSectionWidth" in $$new_props && $$invalidate(12, rightSectionWidth = $$new_props.rightSectionWidth), "rightSectionProps" in $$new_props && $$invalidate(13, rightSectionProps = $$new_props.rightSectionProps), "required" in $$new_props && $$invalidate(14, required = $$new_props.required), "radius" in $$new_props && $$invalidate(15, radius2 = $$new_props.radius), "variant" in $$new_props && $$invalidate(16, variant2 = $$new_props.variant), "disabled" in $$new_props && $$invalidate(17, disabled = $$new_props.disabled), "value" in $$new_props && $$invalidate(1, value = $$new_props.value), "label" in $$new_props && $$invalidate(18, label = $$new_props.label), "description" in $$new_props && $$invalidate(19, description = $$new_props.description), "error" in $$new_props && $$invalidate(20, error = $$new_props.error), "labelProps" in $$new_props && $$invalidate(21, labelProps = $$new_props.labelProps), "descriptionProps" in $$new_props && $$invalidate(22, descriptionProps = $$new_props.descriptionProps), "errorProps" in $$new_props && $$invalidate(23, errorProps = $$new_props.errorProps), "$$scope" in $$new_props && $$invalidate(34, $$scope = $$new_props.$$scope);
    }, $$self.$$.update = () => {
      $$self.$$.dirty[0] & /*data*/
      1073741824 && data && $$invalidate(24, formattedData = data.map((item) => typeof item == "string" ? { label: item, value: item } : item));
    }, [
      element2,
      value,
      use,
      className,
      override,
      placeholder,
      inputStyle,
      wrapperProps,
      size2,
      icon,
      iconWidth,
      iconProps,
      rightSectionWidth,
      rightSectionProps,
      required,
      radius2,
      variant2,
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
      super(), init(
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
  const NativeSelect$1 = NativeSelect, get_rightSection_slot_changes = (dirty) => ({}), get_rightSection_slot_context = (ctx) => ({ slot: "rightSection" });
  function create_rightSection_slot(ctx) {
    let current;
    const rightSection_slot_template = (
      /*#slots*/
      ctx[23].rightSection
    ), rightSection_slot = create_slot(
      rightSection_slot_template,
      ctx,
      /*$$scope*/
      ctx[26],
      get_rightSection_slot_context
    );
    return {
      c() {
        rightSection_slot && rightSection_slot.c();
      },
      m(target, anchor) {
        rightSection_slot && rightSection_slot.m(target, anchor), current = !0;
      },
      p(ctx2, dirty) {
        rightSection_slot && rightSection_slot.p && (!current || dirty & /*$$scope*/
        67108864) && update_slot_base(
          rightSection_slot,
          rightSection_slot_template,
          ctx2,
          /*$$scope*/
          ctx2[26],
          current ? get_slot_changes(
            rightSection_slot_template,
            /*$$scope*/
            ctx2[26],
            dirty,
            get_rightSection_slot_changes
          ) : get_all_dirty_from_scope(
            /*$$scope*/
            ctx2[26]
          ),
          get_rightSection_slot_context
        );
      },
      i(local) {
        current || (transition_in(rightSection_slot, local), current = !0);
      },
      o(local) {
        transition_out(rightSection_slot, local), current = !1;
      },
      d(detaching) {
        rightSection_slot && rightSection_slot.d(detaching);
      }
    };
  }
  function create_default_slot$1(ctx) {
    let input2, updating_value, current;
    const input_spread_levels = [
      { required: (
        /*required*/
        ctx[8]
      ) },
      { size: (
        /*size*/
        ctx[13]
      ) },
      { id: (
        /*baseId*/
        ctx[17]
      ) },
      { placeholder: (
        /*placeholder*/
        ctx[14]
      ) },
      /*$$restProps*/
      ctx[19],
      {
        use: [
          /*forwardEvents*/
          ctx[16],
          [
            useActions,
            /*use*/
            ctx[2]
          ]
        ]
      },
      { invalid: (
        /*_invalid*/
        ctx[15]
      ) },
      {
        showRightSection: (
          /*_showRightSection*/
          ctx[18]
        )
      }
    ];
    function input_value_binding(value) {
      ctx[24](value);
    }
    let input_props = {
      $$slots: { rightSection: [create_rightSection_slot] },
      $$scope: { ctx }
    };
    for (let i2 = 0; i2 < input_spread_levels.length; i2 += 1)
      input_props = assign(input_props, input_spread_levels[i2]);
    return (
      /*value*/
      ctx[1] !== void 0 && (input_props.value = /*value*/
      ctx[1]), input2 = new Input$1({ props: input_props }), binding_callbacks.push(() => bind(input2, "value", input_value_binding)), {
        c() {
          create_component(input2.$$.fragment);
        },
        m(target, anchor) {
          mount_component(input2, target, anchor), current = !0;
        },
        p(ctx2, dirty) {
          const input_changes = dirty & /*required, size, baseId, placeholder, $$restProps, forwardEvents, useActions, use, _invalid, _showRightSection*/
          1040644 ? get_spread_update(input_spread_levels, [
            dirty & /*required*/
            256 && { required: (
              /*required*/
              ctx2[8]
            ) },
            dirty & /*size*/
            8192 && { size: (
              /*size*/
              ctx2[13]
            ) },
            dirty & /*baseId*/
            131072 && { id: (
              /*baseId*/
              ctx2[17]
            ) },
            dirty & /*placeholder*/
            16384 && { placeholder: (
              /*placeholder*/
              ctx2[14]
            ) },
            dirty & /*$$restProps*/
            524288 && get_spread_object(
              /*$$restProps*/
              ctx2[19]
            ),
            dirty & /*forwardEvents, useActions, use*/
            65540 && {
              use: [
                /*forwardEvents*/
                ctx2[16],
                [
                  useActions,
                  /*use*/
                  ctx2[2]
                ]
              ]
            },
            dirty & /*_invalid*/
            32768 && { invalid: (
              /*_invalid*/
              ctx2[15]
            ) },
            dirty & /*_showRightSection*/
            262144 && {
              showRightSection: (
                /*_showRightSection*/
                ctx2[18]
              )
            }
          ]) : {};
          dirty & /*$$scope*/
          67108864 && (input_changes.$$scope = { dirty, ctx: ctx2 }), !updating_value && dirty & /*value*/
          2 && (updating_value = !0, input_changes.value = /*value*/
          ctx2[1], add_flush_callback(() => updating_value = !1)), input2.$set(input_changes);
        },
        i(local) {
          current || (transition_in(input2.$$.fragment, local), current = !0);
        },
        o(local) {
          transition_out(input2.$$.fragment, local), current = !1;
        },
        d(detaching) {
          destroy_component(input2, detaching);
        }
      }
    );
  }
  function create_fragment$4(ctx) {
    let inputwrapper, updating_element, current;
    function inputwrapper_element_binding(value) {
      ctx[25](value);
    }
    let inputwrapper_props = {
      class: (
        /*className*/
        ctx[3]
      ),
      override: (
        /*override*/
        ctx[4]
      ),
      label: (
        /*label*/
        ctx[5]
      ),
      description: (
        /*description*/
        ctx[6]
      ),
      error: (
        /*error*/
        ctx[7]
      ),
      required: (
        /*required*/
        ctx[8]
      ),
      labelProps: (
        /*labelProps*/
        ctx[9]
      ),
      descriptionProps: (
        /*descriptionProps*/
        ctx[10]
      ),
      errorProps: (
        /*errorProps*/
        ctx[11]
      ),
      id: (
        /*baseId*/
        ctx[17]
      ),
      labelElement: (
        /*labelElement*/
        ctx[12]
      ),
      size: (
        /*size*/
        ctx[13]
      ),
      $$slots: { default: [create_default_slot$1] },
      $$scope: { ctx }
    };
    return (
      /*element*/
      ctx[0] !== void 0 && (inputwrapper_props.element = /*element*/
      ctx[0]), inputwrapper = new InputWrapper$1({ props: inputwrapper_props }), binding_callbacks.push(() => bind(inputwrapper, "element", inputwrapper_element_binding)), {
        c() {
          create_component(inputwrapper.$$.fragment);
        },
        m(target, anchor) {
          mount_component(inputwrapper, target, anchor), current = !0;
        },
        p(ctx2, [dirty]) {
          const inputwrapper_changes = {};
          dirty & /*className*/
          8 && (inputwrapper_changes.class = /*className*/
          ctx2[3]), dirty & /*override*/
          16 && (inputwrapper_changes.override = /*override*/
          ctx2[4]), dirty & /*label*/
          32 && (inputwrapper_changes.label = /*label*/
          ctx2[5]), dirty & /*description*/
          64 && (inputwrapper_changes.description = /*description*/
          ctx2[6]), dirty & /*error*/
          128 && (inputwrapper_changes.error = /*error*/
          ctx2[7]), dirty & /*required*/
          256 && (inputwrapper_changes.required = /*required*/
          ctx2[8]), dirty & /*labelProps*/
          512 && (inputwrapper_changes.labelProps = /*labelProps*/
          ctx2[9]), dirty & /*descriptionProps*/
          1024 && (inputwrapper_changes.descriptionProps = /*descriptionProps*/
          ctx2[10]), dirty & /*errorProps*/
          2048 && (inputwrapper_changes.errorProps = /*errorProps*/
          ctx2[11]), dirty & /*labelElement*/
          4096 && (inputwrapper_changes.labelElement = /*labelElement*/
          ctx2[12]), dirty & /*size*/
          8192 && (inputwrapper_changes.size = /*size*/
          ctx2[13]), dirty & /*$$scope, required, size, placeholder, $$restProps, use, _invalid, value*/
          67690758 && (inputwrapper_changes.$$scope = { dirty, ctx: ctx2 }), !updating_element && dirty & /*element*/
          1 && (updating_element = !0, inputwrapper_changes.element = /*element*/
          ctx2[0], add_flush_callback(() => updating_element = !1)), inputwrapper.$set(inputwrapper_changes);
        },
        i(local) {
          current || (transition_in(inputwrapper.$$.fragment, local), current = !0);
        },
        o(local) {
          transition_out(inputwrapper.$$.fragment, local), current = !1;
        },
        d(detaching) {
          destroy_component(inputwrapper, detaching);
        }
      }
    );
  }
  function instance$4($$self, $$props, $$invalidate) {
    let _invalid;
    const omit_props_names = [
      "use",
      "element",
      "class",
      "override",
      "label",
      "description",
      "error",
      "required",
      "labelProps",
      "descriptionProps",
      "errorProps",
      "invalid",
      "id",
      "labelElement",
      "size",
      "showRightSection",
      "value",
      "placeholder"
    ];
    let $$restProps = compute_rest_props($$props, omit_props_names), { $$slots: slots = {}, $$scope } = $$props;
    const $$slots = compute_slots(slots);
    let { use = [], element: element2 = void 0, class: className = "", override = {}, label = "", description = null, error = null, required = !1, labelProps = {}, descriptionProps = {}, errorProps = {}, invalid = !1, id = "input-id", labelElement = "label", size: size2 = "sm", showRightSection = void 0, value = "", placeholder = "" } = $$props;
    const forwardEvents = createEventForwarder(get_current_component()), baseId = randomID(id), _showRightSection = showRightSection === void 0 ? !!$$slots.rightSection : showRightSection;
    function input_value_binding(value$1) {
      value = value$1, $$invalidate(1, value);
    }
    function inputwrapper_element_binding(value2) {
      element2 = value2, $$invalidate(0, element2);
    }
    return $$self.$$set = ($$new_props) => {
      $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)), $$invalidate(19, $$restProps = compute_rest_props($$props, omit_props_names)), "use" in $$new_props && $$invalidate(2, use = $$new_props.use), "element" in $$new_props && $$invalidate(0, element2 = $$new_props.element), "class" in $$new_props && $$invalidate(3, className = $$new_props.class), "override" in $$new_props && $$invalidate(4, override = $$new_props.override), "label" in $$new_props && $$invalidate(5, label = $$new_props.label), "description" in $$new_props && $$invalidate(6, description = $$new_props.description), "error" in $$new_props && $$invalidate(7, error = $$new_props.error), "required" in $$new_props && $$invalidate(8, required = $$new_props.required), "labelProps" in $$new_props && $$invalidate(9, labelProps = $$new_props.labelProps), "descriptionProps" in $$new_props && $$invalidate(10, descriptionProps = $$new_props.descriptionProps), "errorProps" in $$new_props && $$invalidate(11, errorProps = $$new_props.errorProps), "invalid" in $$new_props && $$invalidate(20, invalid = $$new_props.invalid), "id" in $$new_props && $$invalidate(21, id = $$new_props.id), "labelElement" in $$new_props && $$invalidate(12, labelElement = $$new_props.labelElement), "size" in $$new_props && $$invalidate(13, size2 = $$new_props.size), "showRightSection" in $$new_props && $$invalidate(22, showRightSection = $$new_props.showRightSection), "value" in $$new_props && $$invalidate(1, value = $$new_props.value), "placeholder" in $$new_props && $$invalidate(14, placeholder = $$new_props.placeholder), "$$scope" in $$new_props && $$invalidate(26, $$scope = $$new_props.$$scope);
    }, $$self.$$.update = () => {
      $$self.$$.dirty & /*invalid, error*/
      1048704 && $$invalidate(15, _invalid = invalid || !!error);
    }, [
      element2,
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
      size2,
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
      super(), init(this, options, instance$4, create_fragment$4, safe_not_equal, {
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
  function create_fragment$3(ctx) {
    let nativeselect, updating_value, current;
    function nativeselect_value_binding(value) {
      ctx[2](value);
    }
    let nativeselect_props = { data: (
      /*configSelectData*/
      ctx[0]
    ) };
    return (
      /*$appStore*/
      ctx[1].usedConfigId !== void 0 && (nativeselect_props.value = /*$appStore*/
      ctx[1].usedConfigId), nativeselect = new NativeSelect$1({ props: nativeselect_props }), binding_callbacks.push(() => bind(nativeselect, "value", nativeselect_value_binding)), {
        c() {
          create_component(nativeselect.$$.fragment);
        },
        m(target, anchor) {
          mount_component(nativeselect, target, anchor), current = !0;
        },
        p(ctx2, [dirty]) {
          const nativeselect_changes = {};
          dirty & /*configSelectData*/
          1 && (nativeselect_changes.data = /*configSelectData*/
          ctx2[0]), !updating_value && dirty & /*$appStore*/
          2 && (updating_value = !0, nativeselect_changes.value = /*$appStore*/
          ctx2[1].usedConfigId, add_flush_callback(() => updating_value = !1)), nativeselect.$set(nativeselect_changes);
        },
        i(local) {
          current || (transition_in(nativeselect.$$.fragment, local), current = !0);
        },
        o(local) {
          transition_out(nativeselect.$$.fragment, local), current = !1;
        },
        d(detaching) {
          destroy_component(nativeselect, detaching);
        }
      }
    );
  }
  function instance$3($$self, $$props, $$invalidate) {
    let configSelectData, $appStore;
    component_subscribe($$self, appStore, ($$value) => $$invalidate(1, $appStore = $$value));
    function nativeselect_value_binding(value) {
      $$self.$$.not_equal($appStore.usedConfigId, value) && ($appStore.usedConfigId = value, appStore.set($appStore));
    }
    return $$invalidate(0, configSelectData = [INNER_CONFIG, ...GM_getValue("CONFIG_LIST", [])].map((config2) => ({ label: config2.name, value: config2.id }))), [configSelectData, $appStore, nativeselect_value_binding];
  }
  class ConfigSelect extends SvelteComponent {
    constructor(options) {
      super(), init(this, options, instance$3, create_fragment$3, safe_not_equal, {});
    }
  }
  function create_fragment$2(ctx) {
    let copybutton, t0, settingbutton, t1, configselect, current;
    return copybutton = new CopyButton({ props: { codeEl: (
      /*codeEl*/
      ctx[0]
    ) } }), settingbutton = new SettingButton({}), configselect = new ConfigSelect({}), {
      c() {
        create_component(copybutton.$$.fragment), t0 = space(), create_component(settingbutton.$$.fragment), t1 = space(), create_component(configselect.$$.fragment);
      },
      m(target, anchor) {
        mount_component(copybutton, target, anchor), insert(target, t0, anchor), mount_component(settingbutton, target, anchor), insert(target, t1, anchor), mount_component(configselect, target, anchor), current = !0;
      },
      p(ctx2, [dirty]) {
        const copybutton_changes = {};
        dirty & /*codeEl*/
        1 && (copybutton_changes.codeEl = /*codeEl*/
        ctx2[0]), copybutton.$set(copybutton_changes);
      },
      i(local) {
        current || (transition_in(copybutton.$$.fragment, local), transition_in(settingbutton.$$.fragment, local), transition_in(configselect.$$.fragment, local), current = !0);
      },
      o(local) {
        transition_out(copybutton.$$.fragment, local), transition_out(settingbutton.$$.fragment, local), transition_out(configselect.$$.fragment, local), current = !1;
      },
      d(detaching) {
        destroy_component(copybutton, detaching), detaching && detach(t0), destroy_component(settingbutton, detaching), detaching && detach(t1), destroy_component(configselect, detaching);
      }
    };
  }
  function instance$2($$self, $$props, $$invalidate) {
    let { codeEl } = $$props;
    return $$self.$$set = ($$props2) => {
      "codeEl" in $$props2 && $$invalidate(0, codeEl = $$props2.codeEl);
    }, [codeEl];
  }
  class Actions extends SvelteComponent {
    constructor(options) {
      super(), init(this, options, instance$2, create_fragment$2, safe_not_equal, { codeEl: 0 });
    }
  }
  let nanoid = (size2 = 21) => crypto.getRandomValues(new Uint8Array(size2)).reduce((id, byte) => (byte &= 63, byte < 36 ? id += byte.toString(36) : byte < 62 ? id += (byte - 26).toString(36).toUpperCase() : byte > 62 ? id += "-" : id += "_", id), "");
  function add_css$1(target) {
    append_styles(target, "svelte-1v4iww6", ".fcb-setting-textarea.svelte-1v4iww6{margin-top:10px;width:100%;height:400px;outline:none;border-radius:6px;padding:8px 6px;background:#f8f8f8}");
  }
  function create_fragment$1(ctx) {
    let textarea, textarea_value_value, mounted, dispose;
    return {
      c() {
        textarea = element("textarea"), attr(textarea, "class", "fcb-setting-textarea svelte-1v4iww6"), textarea.value = textarea_value_value = JSON.stringify(
          /*value*/
          ctx[0] || {},
          null,
          2
        ), textarea.disabled = /*disabled*/
        ctx[1];
      },
      m(target, anchor) {
        insert(target, textarea, anchor), mounted || (dispose = listen(
          textarea,
          "input",
          /*onInput*/
          ctx[2]
        ), mounted = !0);
      },
      p(ctx2, [dirty]) {
        dirty & /*value*/
        1 && textarea_value_value !== (textarea_value_value = JSON.stringify(
          /*value*/
          ctx2[0] || {},
          null,
          2
        )) && (textarea.value = textarea_value_value), dirty & /*disabled*/
        2 && (textarea.disabled = /*disabled*/
        ctx2[1]);
      },
      i: noop,
      o: noop,
      d(detaching) {
        detaching && detach(textarea), mounted = !1, dispose();
      }
    };
  }
  function instance$1($$self, $$props, $$invalidate) {
    let { value = {} } = $$props, { disabled = !1 } = $$props;
    function onInput(e) {
      $$invalidate(0, value = JSON.parse(e.target.value));
    }
    return $$self.$$set = ($$props2) => {
      "value" in $$props2 && $$invalidate(0, value = $$props2.value), "disabled" in $$props2 && $$invalidate(1, disabled = $$props2.disabled);
    }, [value, disabled, onInput];
  }
  class JSONEditor extends SvelteComponent {
    constructor(options) {
      super(), init(this, options, instance$1, create_fragment$1, safe_not_equal, { value: 0, disabled: 1 }, add_css$1);
    }
  }
  function add_css(target) {
    append_styles(target, "svelte-1h6610i", ":root{color:#333}h2.svelte-1h6610i{margin-top:20px}");
  }
  function create_default_slot_3(ctx) {
    let t2;
    return {
      c() {
        t2 = text("添加配置");
      },
      m(target, anchor) {
        insert(target, t2, anchor);
      },
      d(detaching) {
        detaching && detach(t2);
      }
    };
  }
  function create_if_block(ctx) {
    let div, h2, t1, t2, if_block1_anchor, current, if_block0 = (
      /*configData*/
      ctx[1] && create_if_block_2(ctx)
    ), if_block1 = !/*isInnerConfig*/
    ctx[3] && create_if_block_1(ctx);
    return {
      c() {
        div = element("div"), h2 = element("h2"), h2.textContent = "配置", t1 = space(), if_block0 && if_block0.c(), t2 = space(), if_block1 && if_block1.c(), if_block1_anchor = empty(), attr(h2, "class", "svelte-1h6610i");
      },
      m(target, anchor) {
        insert(target, div, anchor), append(div, h2), append(div, t1), if_block0 && if_block0.m(div, null), insert(target, t2, anchor), if_block1 && if_block1.m(target, anchor), insert(target, if_block1_anchor, anchor), current = !0;
      },
      p(ctx2, dirty) {
        /*configData*/
        ctx2[1] ? if_block0 ? (if_block0.p(ctx2, dirty), dirty & /*configData*/
        2 && transition_in(if_block0, 1)) : (if_block0 = create_if_block_2(ctx2), if_block0.c(), transition_in(if_block0, 1), if_block0.m(div, null)) : if_block0 && (group_outros(), transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        }), check_outros()), /*isInnerConfig*/
        ctx2[3] ? if_block1 && (group_outros(), transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        }), check_outros()) : if_block1 ? (if_block1.p(ctx2, dirty), dirty & /*isInnerConfig*/
        8 && transition_in(if_block1, 1)) : (if_block1 = create_if_block_1(ctx2), if_block1.c(), transition_in(if_block1, 1), if_block1.m(if_block1_anchor.parentNode, if_block1_anchor));
      },
      i(local) {
        current || (transition_in(if_block0), transition_in(if_block1), current = !0);
      },
      o(local) {
        transition_out(if_block0), transition_out(if_block1), current = !1;
      },
      d(detaching) {
        detaching && detach(div), if_block0 && if_block0.d(), detaching && detach(t2), if_block1 && if_block1.d(detaching), detaching && detach(if_block1_anchor);
      }
    };
  }
  function create_if_block_2(ctx) {
    let textinput0, updating_value, t0, textinput1, updating_value_1, t1, textinput2, updating_value_2, t2, jsoneditor, updating_value_3, current;
    function textinput0_value_binding(value) {
      ctx[11](value);
    }
    let textinput0_props = { label: "id", disabled: !0 };
    /*configData*/
    ctx[1].id !== void 0 && (textinput0_props.value = /*configData*/
    ctx[1].id), textinput0 = new TextInput$1({ props: textinput0_props }), binding_callbacks.push(() => bind(textinput0, "value", textinput0_value_binding));
    function textinput1_value_binding(value) {
      ctx[12](value);
    }
    let textinput1_props = {
      label: "url",
      disabled: (
        /*isInnerConfig*/
        ctx[3]
      )
    };
    /*configData*/
    ctx[1].url !== void 0 && (textinput1_props.value = /*configData*/
    ctx[1].url), textinput1 = new TextInput$1({ props: textinput1_props }), binding_callbacks.push(() => bind(textinput1, "value", textinput1_value_binding));
    function textinput2_value_binding(value) {
      ctx[13](value);
    }
    let textinput2_props = {
      label: "name",
      disabled: (
        /*isInnerConfig*/
        ctx[3]
      )
    };
    /*configData*/
    ctx[1].name !== void 0 && (textinput2_props.value = /*configData*/
    ctx[1].name), textinput2 = new TextInput$1({ props: textinput2_props }), binding_callbacks.push(() => bind(textinput2, "value", textinput2_value_binding));
    function jsoneditor_value_binding(value) {
      ctx[14](value);
    }
    let jsoneditor_props = {
      disabled: (
        /*configData*/
        ctx[1].url || /*isInnerConfig*/
        ctx[3]
      )
    };
    return (
      /*configData*/
      ctx[1].options !== void 0 && (jsoneditor_props.value = /*configData*/
      ctx[1].options), jsoneditor = new JSONEditor({ props: jsoneditor_props }), binding_callbacks.push(() => bind(jsoneditor, "value", jsoneditor_value_binding)), {
        c() {
          create_component(textinput0.$$.fragment), t0 = space(), create_component(textinput1.$$.fragment), t1 = space(), create_component(textinput2.$$.fragment), t2 = space(), create_component(jsoneditor.$$.fragment);
        },
        m(target, anchor) {
          mount_component(textinput0, target, anchor), insert(target, t0, anchor), mount_component(textinput1, target, anchor), insert(target, t1, anchor), mount_component(textinput2, target, anchor), insert(target, t2, anchor), mount_component(jsoneditor, target, anchor), current = !0;
        },
        p(ctx2, dirty) {
          const textinput0_changes = {};
          !updating_value && dirty & /*configData*/
          2 && (updating_value = !0, textinput0_changes.value = /*configData*/
          ctx2[1].id, add_flush_callback(() => updating_value = !1)), textinput0.$set(textinput0_changes);
          const textinput1_changes = {};
          dirty & /*isInnerConfig*/
          8 && (textinput1_changes.disabled = /*isInnerConfig*/
          ctx2[3]), !updating_value_1 && dirty & /*configData*/
          2 && (updating_value_1 = !0, textinput1_changes.value = /*configData*/
          ctx2[1].url, add_flush_callback(() => updating_value_1 = !1)), textinput1.$set(textinput1_changes);
          const textinput2_changes = {};
          dirty & /*isInnerConfig*/
          8 && (textinput2_changes.disabled = /*isInnerConfig*/
          ctx2[3]), !updating_value_2 && dirty & /*configData*/
          2 && (updating_value_2 = !0, textinput2_changes.value = /*configData*/
          ctx2[1].name, add_flush_callback(() => updating_value_2 = !1)), textinput2.$set(textinput2_changes);
          const jsoneditor_changes = {};
          dirty & /*configData, isInnerConfig*/
          10 && (jsoneditor_changes.disabled = /*configData*/
          ctx2[1].url || /*isInnerConfig*/
          ctx2[3]), !updating_value_3 && dirty & /*configData*/
          2 && (updating_value_3 = !0, jsoneditor_changes.value = /*configData*/
          ctx2[1].options, add_flush_callback(() => updating_value_3 = !1)), jsoneditor.$set(jsoneditor_changes);
        },
        i(local) {
          current || (transition_in(textinput0.$$.fragment, local), transition_in(textinput1.$$.fragment, local), transition_in(textinput2.$$.fragment, local), transition_in(jsoneditor.$$.fragment, local), current = !0);
        },
        o(local) {
          transition_out(textinput0.$$.fragment, local), transition_out(textinput1.$$.fragment, local), transition_out(textinput2.$$.fragment, local), transition_out(jsoneditor.$$.fragment, local), current = !1;
        },
        d(detaching) {
          destroy_component(textinput0, detaching), detaching && detach(t0), destroy_component(textinput1, detaching), detaching && detach(t1), destroy_component(textinput2, detaching), detaching && detach(t2), destroy_component(jsoneditor, detaching);
        }
      }
    );
  }
  function create_if_block_1(ctx) {
    let group, current;
    return group = new Group$1({
      props: {
        position: "right",
        $$slots: { default: [create_default_slot] },
        $$scope: { ctx }
      }
    }), {
      c() {
        create_component(group.$$.fragment);
      },
      m(target, anchor) {
        mount_component(group, target, anchor), current = !0;
      },
      p(ctx2, dirty) {
        const group_changes = {};
        dirty & /*$$scope*/
        524288 && (group_changes.$$scope = { dirty, ctx: ctx2 }), group.$set(group_changes);
      },
      i(local) {
        current || (transition_in(group.$$.fragment, local), current = !0);
      },
      o(local) {
        transition_out(group.$$.fragment, local), current = !1;
      },
      d(detaching) {
        destroy_component(group, detaching);
      }
    };
  }
  function create_default_slot_2(ctx) {
    let t2;
    return {
      c() {
        t2 = text("删除配置");
      },
      m(target, anchor) {
        insert(target, t2, anchor);
      },
      d(detaching) {
        detaching && detach(t2);
      }
    };
  }
  function create_default_slot_1(ctx) {
    let t2;
    return {
      c() {
        t2 = text("保存");
      },
      m(target, anchor) {
        insert(target, t2, anchor);
      },
      d(detaching) {
        detaching && detach(t2);
      }
    };
  }
  function create_default_slot(ctx) {
    let button0, t2, button1, current;
    return button0 = new Button$1({
      props: {
        color: "red",
        $$slots: { default: [create_default_slot_2] },
        $$scope: { ctx }
      }
    }), button0.$on(
      "click",
      /*deleteConfig*/
      ctx[5]
    ), button1 = new Button$1({
      props: {
        color: "green",
        $$slots: { default: [create_default_slot_1] },
        $$scope: { ctx }
      }
    }), button1.$on(
      "click",
      /*saveConfig*/
      ctx[7]
    ), {
      c() {
        create_component(button0.$$.fragment), t2 = space(), create_component(button1.$$.fragment);
      },
      m(target, anchor) {
        mount_component(button0, target, anchor), insert(target, t2, anchor), mount_component(button1, target, anchor), current = !0;
      },
      p(ctx2, dirty) {
        const button0_changes = {};
        dirty & /*$$scope*/
        524288 && (button0_changes.$$scope = { dirty, ctx: ctx2 }), button0.$set(button0_changes);
        const button1_changes = {};
        dirty & /*$$scope*/
        524288 && (button1_changes.$$scope = { dirty, ctx: ctx2 }), button1.$set(button1_changes);
      },
      i(local) {
        current || (transition_in(button0.$$.fragment, local), transition_in(button1.$$.fragment, local), current = !0);
      },
      o(local) {
        transition_out(button0.$$.fragment, local), transition_out(button1.$$.fragment, local), current = !1;
      },
      d(detaching) {
        destroy_component(button0, detaching), detaching && detach(t2), destroy_component(button1, detaching);
      }
    };
  }
  function create_fragment(ctx) {
    let div1, div0, nativeselect, updating_value, t0, button, t1, current;
    function nativeselect_value_binding(value) {
      ctx[10](value);
    }
    let nativeselect_props = {
      label: "切换配置",
      data: (
        /*configSelectData*/
        ctx[4]
      )
    };
    /*currentConfigId*/
    ctx[0] !== void 0 && (nativeselect_props.value = /*currentConfigId*/
    ctx[0]), nativeselect = new NativeSelect$1({ props: nativeselect_props }), binding_callbacks.push(() => bind(nativeselect, "value", nativeselect_value_binding)), button = new Button$1({
      props: {
        $$slots: { default: [create_default_slot_3] },
        $$scope: { ctx }
      }
    }), button.$on(
      "click",
      /*addConfig*/
      ctx[6]
    );
    let if_block = (
      /*currentConfig*/
      ctx[2] && create_if_block(ctx)
    );
    return {
      c() {
        div1 = element("div"), div0 = element("div"), create_component(nativeselect.$$.fragment), t0 = space(), create_component(button.$$.fragment), t1 = space(), if_block && if_block.c(), attr(div1, "class", "fcb-setting");
      },
      m(target, anchor) {
        insert(target, div1, anchor), append(div1, div0), mount_component(nativeselect, div0, null), append(div0, t0), mount_component(button, div0, null), append(div1, t1), if_block && if_block.m(div1, null), current = !0;
      },
      p(ctx2, [dirty]) {
        const nativeselect_changes = {};
        dirty & /*configSelectData*/
        16 && (nativeselect_changes.data = /*configSelectData*/
        ctx2[4]), !updating_value && dirty & /*currentConfigId*/
        1 && (updating_value = !0, nativeselect_changes.value = /*currentConfigId*/
        ctx2[0], add_flush_callback(() => updating_value = !1)), nativeselect.$set(nativeselect_changes);
        const button_changes = {};
        dirty & /*$$scope*/
        524288 && (button_changes.$$scope = { dirty, ctx: ctx2 }), button.$set(button_changes), /*currentConfig*/
        ctx2[2] ? if_block ? (if_block.p(ctx2, dirty), dirty & /*currentConfig*/
        4 && transition_in(if_block, 1)) : (if_block = create_if_block(ctx2), if_block.c(), transition_in(if_block, 1), if_block.m(div1, null)) : if_block && (group_outros(), transition_out(if_block, 1, 1, () => {
          if_block = null;
        }), check_outros());
      },
      i(local) {
        current || (transition_in(nativeselect.$$.fragment, local), transition_in(button.$$.fragment, local), transition_in(if_block), current = !0);
      },
      o(local) {
        transition_out(nativeselect.$$.fragment, local), transition_out(button.$$.fragment, local), transition_out(if_block), current = !1;
      },
      d(detaching) {
        detaching && detach(div1), destroy_component(nativeselect), destroy_component(button), if_block && if_block.d();
      }
    };
  }
  function instance($$self, $$props, $$invalidate) {
    let configSelectData, currentConfig, isInnerConfig, $appStore;
    component_subscribe($$self, appStore, ($$value) => $$invalidate(15, $appStore = $$value));
    let configList = [INNER_CONFIG, ...GM_getValue("CONFIG_LIST", [])], currentConfigId = $appStore.usedConfigId, configData, loadUrl;
    function syncConfigData() {
      $$invalidate(1, configData = structuredClone(currentConfig));
    }
    async function loadConfigData() {
      $$invalidate(9, loadUrl = configData.url);
      const options = await loadConfig$1(configData.url);
      $$invalidate(1, configData.options = options, configData);
    }
    function deleteConfig() {
      $$invalidate(8, configList = configList.filter((config2) => config2.id !== currentConfigId)), $$invalidate(0, currentConfigId = configList[0].id), cacheLocalConfig();
    }
    function addConfig() {
      const id = nanoid();
      $$invalidate(8, configList = [
        ...configList,
        {
          id,
          name: "new config - " + Date.now(),
          url: "",
          options: structuredClone(INIT_CONFIG_OPTIONS)
        }
      ]), $$invalidate(0, currentConfigId = id);
    }
    function cacheLocalConfig() {
      const newList = configList.filter((i2) => i2.id !== "inner").map((i2) => i2.id === currentConfigId ? configData.url ? { ...configData, options: {} } : configData : i2);
      GM_setValue("CONFIG_LIST", newList), $$invalidate(8, configList = [INNER_CONFIG, ...newList]);
    }
    function saveConfig() {
      cacheLocalConfig(), toast({ title: "保存成功" });
    }
    function nativeselect_value_binding(value) {
      currentConfigId = value, $$invalidate(0, currentConfigId);
    }
    function textinput0_value_binding(value) {
      $$self.$$.not_equal(configData.id, value) && (configData.id = value, $$invalidate(1, configData));
    }
    function textinput1_value_binding(value) {
      $$self.$$.not_equal(configData.url, value) && (configData.url = value, $$invalidate(1, configData));
    }
    function textinput2_value_binding(value) {
      $$self.$$.not_equal(configData.name, value) && (configData.name = value, $$invalidate(1, configData));
    }
    function jsoneditor_value_binding(value) {
      $$self.$$.not_equal(configData.options, value) && (configData.options = value, $$invalidate(1, configData));
    }
    return $$self.$$.update = () => {
      $$self.$$.dirty & /*configList*/
      256 && $$invalidate(4, configSelectData = configList.map((config2) => ({ label: config2.name, value: config2.id }))), $$self.$$.dirty & /*configList, currentConfigId*/
      257 && $$invalidate(2, currentConfig = structuredClone(configList.find((config2) => config2.id === currentConfigId))), $$self.$$.dirty & /*currentConfig*/
      4 && currentConfig && syncConfigData(), $$self.$$.dirty & /*configData*/
      2 && (configData.url || $$invalidate(9, loadUrl = void 0)), $$self.$$.dirty & /*configData, loadUrl*/
      514 && configData.url && configData.url !== loadUrl && loadConfigData(), $$self.$$.dirty & /*currentConfigId*/
      1 && $$invalidate(3, isInnerConfig = currentConfigId === "inner");
    }, [
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
      super(), init(this, options, instance, create_fragment, safe_not_equal, {}, add_css);
    }
  }
  const PX_TO_VIEWPORT_CONFIG_KEY = "__PX_TO_VIEWPORT_CONFIG", FILTER_CONFIG_KEY = "__FILTER_CONFIG", REPLACE_CONFIG_KEY = "__REPLACE_CONFIG_KEY", CONFIG_URL = "__CONFIG_URL", installFigmaPlugin = debounce(function(el) {
    const btnEl = el.querySelector("#fcb-copy-button"), codeEl = el.querySelector("p.hljs-comment");
    if (!btnEl && codeEl) {
      const targetEl = document.createElement("div");
      codeEl.parentElement.parentElement.prepend(targetEl), new Actions({
        target: targetEl
      });
    }
  }, 500);
  function checkFigma() {
    const oldLog = unsafeWindow.console.log;
    unsafeWindow.console.log = function(...args) {
      /\[Fullscreen\] loadtime/gi.test(args[0]) && setTimeout(() => {
        const el = document.querySelector("[name=propertiesPanelContainer]");
        el ? (installFigmaPlugin(el), el.addEventListener(
          "DOMSubtreeModified",
          installFigmaPlugin.bind(null, el),
          !1
        )) : toast({
          title: "FigmaCssBetter 初始化失败",
          duration: 5e3
        });
      }, 1e3), oldLog(...args);
    };
  }
  function checkSetting() {
    if (/^https:\/\/lbb00.github.io\/figma-css-better\/setting/.test(
      window.location.href
    )) {
      const mainEl = document.querySelector("main");
      new SettingPanel({
        target: mainEl
      });
    }
  }
  function loadConfig() {
    const configUrl = GM_getValue(CONFIG_URL, "");
    configUrl && GM_xmlhttpRequest({
      url: configUrl,
      method: "get",
      onload(xhr) {
        if (+xhr.status != 200) {
          toast({ title: "配置加载失败" });
          return;
        }
        const { pxToViewport, filter, replace: replace2 } = JSON.parse(xhr.response);
        GM_setValue(PX_TO_VIEWPORT_CONFIG_KEY, pxToViewport), GM_setValue(FILTER_CONFIG_KEY, filter), GM_setValue(REPLACE_CONFIG_KEY, replace2);
      },
      onerror(e) {
        toast({ title: "配置加载失败" + e.message });
      }
    });
  }
  function main() {
    loadConfig(), checkFigma(), checkSetting();
  }
  main();
})();
