import { jsxs as k, jsx as r, Fragment as be } from "react/jsx-runtime";
import R, { forwardRef as w, useState as q, useRef as K, useEffect as j, useCallback as W, useImperativeHandle as No, createContext as ue, useContext as Y, useId as Co, useMemo as Lo } from "react";
import { createPortal as je } from "react-dom";
function Rt(e) {
  var t, n, o = "";
  if (typeof e == "string" || typeof e == "number") o += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var a = e.length;
    for (t = 0; t < a; t++) e[t] && (n = Rt(e[t])) && (o && (o += " "), o += n);
  } else for (n in e) e[n] && (o && (o += " "), o += n);
  return o;
}
function _() {
  for (var e, t, n = 0, o = "", a = arguments.length; n < a; n++) (e = arguments[n]) && (t = Rt(e)) && (o && (o += " "), o += t);
  return o;
}
const So = "_button_p6vg6_3", To = "_sm_p6vg6_22", Io = "_md_p6vg6_27", Ao = "_lg_p6vg6_32", Eo = "_xl_p6vg6_37", Do = "_disabled_p6vg6_48", Fo = "_destructive_p6vg6_52", Mo = "_outline_p6vg6_62", Bo = "_ghost_p6vg6_72", zo = "_brutal_p6vg6_83", qo = "_primary_p6vg6_92", Ro = "_secondary_p6vg6_102", Po = "_danger_p6vg6_112", Ho = "_withShadow_p6vg6_123", jo = "_fullWidth_p6vg6_138", Wo = "_loading_p6vg6_152", Go = "_loader_p6vg6_157", Jo = "_spin_p6vg6_1", Vo = "_icon_p6vg6_179", Ko = "_content_p6vg6_185", Oo = "_glitch_p6vg6_191", Ce = {
  button: So,
  sm: To,
  md: Io,
  lg: Ao,
  xl: Eo,
  default: "_default_p6vg6_43",
  disabled: Do,
  destructive: Fo,
  outline: Mo,
  ghost: Bo,
  brutal: zo,
  primary: qo,
  secondary: Ro,
  danger: Po,
  withShadow: Ho,
  fullWidth: jo,
  loading: Wo,
  loader: Go,
  spin: Jo,
  icon: Vo,
  content: Ko,
  glitch: Oo,
  "brutal-glitch-1": "_brutal-glitch-1_p6vg6_1",
  "brutal-glitch-2": "_brutal-glitch-2_p6vg6_1"
}, Yo = w(
  ({
    children: e,
    className: t,
    variant: n = "default",
    size: o = "md",
    fullWidth: a = !1,
    loading: s = !1,
    leftIcon: c,
    rightIcon: l,
    brutalistShadow: i = !0,
    glitch: h = !1,
    disabled: m,
    ...u
  }, d) => /* @__PURE__ */ k(
    "button",
    {
      ref: d,
      className: _(
        Ce.button,
        Ce[n],
        Ce[o],
        {
          [Ce.fullWidth]: a,
          [Ce.loading]: s,
          [Ce.withShadow]: i,
          [Ce.glitch]: h,
          [Ce.disabled]: m || s
        },
        t
      ),
      disabled: m || s,
      "data-text": h ? e : void 0,
      ...u,
      children: [
        s && /* @__PURE__ */ r("span", { className: Ce.loader }),
        c && /* @__PURE__ */ r("span", { className: Ce.icon, children: c }),
        /* @__PURE__ */ r("span", { className: Ce.content, children: e }),
        l && /* @__PURE__ */ r("span", { className: Ce.icon, children: l })
      ]
    }
  )
);
Yo.displayName = "Button";
const Xo = "_input_dm8h2_4", Uo = "_sm_dm8h2_25", Zo = "_md_dm8h2_31", Qo = "_lg_dm8h2_37", ea = "_withLeftIcon_dm8h2_44", ta = "_withRightIcon_dm8h2_56", na = "_error_dm8h2_73", ra = "_success_dm8h2_78", oa = "_withShadow_dm8h2_88", aa = "_readOnly_dm8h2_110", sa = "_disabled_dm8h2_128", la = "_inputWrapper_dm8h2_149", ca = "_fullWidth_dm8h2_156", ia = "_icon_dm8h2_216", da = "_leftIcon_dm8h2_233", ua = "_rightIcon_dm8h2_237", re = {
  input: Xo,
  sm: Uo,
  md: Zo,
  lg: Qo,
  withLeftIcon: ea,
  withRightIcon: ta,
  default: "_default_dm8h2_69",
  error: na,
  success: ra,
  withShadow: oa,
  readOnly: aa,
  disabled: sa,
  inputWrapper: la,
  fullWidth: ca,
  icon: ia,
  leftIcon: da,
  rightIcon: ua
}, _a = w(
  ({
    className: e,
    variant: t = "default",
    size: n = "md",
    leftIcon: o,
    rightIcon: a,
    fullWidth: s = !1,
    brutalistShadow: c = !0,
    disabled: l,
    readOnly: i,
    type: h = "text",
    ...m
  }, u) => {
    const d = /* @__PURE__ */ r(
      "input",
      {
        ref: u,
        type: h,
        className: _(
          re.input,
          re[t],
          re[n],
          {
            [re.withLeftIcon]: o,
            [re.withRightIcon]: a,
            [re.disabled]: l,
            [re.readOnly]: i,
            [re.withShadow]: c && !l && !i
          },
          e
        ),
        disabled: l,
        readOnly: i,
        ...m
      }
    );
    return o || a ? /* @__PURE__ */ k(
      "div",
      {
        className: _(
          re.inputWrapper,
          re[t],
          re[n],
          {
            [re.fullWidth]: s,
            [re.disabled]: l,
            [re.readOnly]: i,
            [re.withShadow]: c && !l && !i
          }
        ),
        children: [
          o && /* @__PURE__ */ r("span", { className: _(re.icon, re.leftIcon), children: o }),
          d,
          a && /* @__PURE__ */ r("span", { className: _(re.icon, re.rightIcon), children: a })
        ]
      }
    ) : d;
  }
);
_a.displayName = "Input";
const ma = "_container_tzk6s_4", ha = "_sm_tzk6s_11", pa = "_md_tzk6s_15", ga = "_lg_tzk6s_19", ba = "_input_tzk6s_24", fa = "_error_tzk6s_75", va = "_success_tzk6s_80", ya = "_withShadow_tzk6s_91", wa = "_filled_tzk6s_129", xa = "_disabled_tzk6s_149", Ge = {
  container: ma,
  sm: ha,
  md: pa,
  lg: ga,
  input: ba,
  default: "_default_tzk6s_71",
  error: fa,
  success: va,
  withShadow: ya,
  filled: wa,
  disabled: xa
}, $a = w(
  ({
    length: e = 6,
    value: t = "",
    onChange: n,
    onComplete: o,
    variant: a = "default",
    size: s = "md",
    disabled: c = !1,
    autoFocus: l = !1,
    type: i = "text",
    placeholder: h = "•",
    className: m,
    brutalistShadow: u = !0
  }, d) => {
    const [p, x] = q(() => {
      const v = t.split("").slice(0, e);
      return [...v, ...Array(e - v.length).fill("")];
    }), f = K([]);
    j(() => {
      const v = t.split("").slice(0, e);
      x([...v, ...Array(e - v.length).fill("")]);
    }, [t, e]);
    const g = (v) => {
      var y, b;
      f.current[v] && ((y = f.current[v]) == null || y.focus(), (b = f.current[v]) == null || b.select());
    }, $ = (v, y) => {
      if (i === "number" && y && !/^\d+$/.test(y)) return;
      const b = [...p];
      b[v] = y.slice(-1), x(b);
      const N = b.join("");
      n == null || n(N), y && v < e - 1 && g(v + 1), N.length === e && !b.includes("") && (o == null || o(N));
    }, C = (v, y) => {
      y.key === "Backspace" && !p[v] && v > 0 || y.key === "ArrowLeft" && v > 0 ? (y.preventDefault(), g(v - 1)) : y.key === "ArrowRight" && v < e - 1 && (y.preventDefault(), g(v + 1));
    }, L = (v) => {
      v.preventDefault();
      const y = v.clipboardData.getData("text/plain").slice(0, e);
      if (i === "number" && !/^\d+$/.test(y)) return;
      const b = [...p];
      y.split("").forEach((S, D) => {
        D < e && (b[D] = S);
      }), x(b);
      const N = b.join("");
      n == null || n(N);
      const z = b.map((S, D) => S !== "" ? D : -1).filter((S) => S !== -1).pop() ?? -1;
      g(Math.min(z + 1, e - 1)), N.length === e && !b.includes("") && (o == null || o(N));
    };
    return /* @__PURE__ */ r(
      "div",
      {
        ref: d,
        className: _(
          Ge.container,
          Ge[s],
          m
        ),
        children: Array.from({ length: e }).map((v, y) => /* @__PURE__ */ r(
          "input",
          {
            ref: (b) => f.current[y] = b,
            type: "text",
            inputMode: i === "number" ? "numeric" : "text",
            pattern: i === "number" ? "\\d*" : void 0,
            maxLength: 1,
            value: p[y],
            onChange: (b) => $(y, b.target.value),
            onKeyDown: (b) => C(y, b),
            onPaste: y === 0 ? L : void 0,
            onFocus: (b) => b.target.select(),
            placeholder: h,
            disabled: c,
            autoFocus: l && y === 0,
            className: _(
              Ge.input,
              Ge[a],
              Ge[s],
              {
                [Ge.filled]: p[y],
                [Ge.disabled]: c,
                [Ge.withShadow]: u && !c
              }
            )
          },
          y
        ))
      }
    );
  }
);
$a.displayName = "InputOTP";
const ka = "_wrapper_1912d_3", Na = "_fullWidth_1912d_10", Ca = "_textarea_1912d_15", La = "_autoResize_1912d_32", Sa = "_withShadow_1912d_38", Ta = "_sm_1912d_53", Ia = "_md_1912d_59", Aa = "_lg_1912d_65", Ea = "_error_1912d_81", Da = "_success_1912d_96", Fa = "_disabled_1912d_112", Ma = "_readOnly_1912d_124", Ba = "_overLimit_1912d_141", za = "_characterCount_1912d_146", fe = {
  wrapper: ka,
  fullWidth: Na,
  textarea: Ca,
  autoResize: La,
  withShadow: Sa,
  sm: Ta,
  md: Ia,
  lg: Aa,
  default: "_default_1912d_72",
  error: Ea,
  success: Da,
  disabled: Fa,
  readOnly: Ma,
  overLimit: Ba,
  characterCount: za
}, qa = w(
  ({
    className: e,
    variant: t = "default",
    size: n = "md",
    autoResize: o = !1,
    showCharacterCount: a = !1,
    maxCharacters: s,
    minRows: c = 3,
    maxRows: l = 10,
    fullWidth: i = !1,
    brutalistShadow: h = !0,
    width: m,
    minWidth: u,
    maxWidth: d,
    disabled: p,
    readOnly: x,
    value: f,
    defaultValue: g,
    onChange: $,
    ...C
  }, L) => {
    const [v, y] = q(g || ""), b = K(null), N = f !== void 0, z = N ? f : v, S = String(z).length, D = W(
      (T) => {
        b.current = T, L && (typeof L == "function" ? L(T) : L.current = T);
      },
      [L]
    ), E = W(() => {
      const T = b.current;
      if (!T || !o) return;
      T.style.height = "auto";
      const P = T.scrollHeight, X = `${c * 1.5}rem`, B = `${l * 1.5}rem`;
      P <= parseInt(X) * 16 ? (T.style.height = X, T.style.overflowY = "hidden") : P >= parseInt(B) * 16 ? (T.style.height = B, T.style.overflowY = "auto") : (T.style.height = `${P}px`, T.style.overflowY = "hidden");
    }, [o, c, l]);
    j(() => {
      E();
    }, [z, E]), j(() => {
      if (!o) return;
      const T = () => E();
      return window.addEventListener("resize", T), () => window.removeEventListener("resize", T);
    }, [o, E]);
    const F = (T) => {
      const P = T.target.value;
      s && P.length > s || (N || y(P), $ == null || $(T), o && setTimeout(() => E(), 0));
    }, M = s ? S > s : !1, I = (T) => {
      if (T !== void 0)
        return typeof T == "number" ? `${T}px` : T;
    }, A = {
      width: I(m),
      minWidth: I(u),
      maxWidth: I(d)
    };
    return /* @__PURE__ */ k(
      "div",
      {
        className: _(
          fe.wrapper,
          {
            [fe.fullWidth]: i
          }
        ),
        style: A,
        children: [
          /* @__PURE__ */ r(
            "textarea",
            {
              ref: D,
              className: _(
                fe.textarea,
                fe[t],
                fe[n],
                {
                  [fe.disabled]: p,
                  [fe.readOnly]: x,
                  [fe.withShadow]: h && !p && !x,
                  [fe.autoResize]: o,
                  [fe.overLimit]: M
                },
                e
              ),
              disabled: p,
              readOnly: x,
              value: z,
              onChange: F,
              rows: o ? void 0 : c,
              ...C
            }
          ),
          a && /* @__PURE__ */ r(
            "div",
            {
              className: _(
                fe.characterCount,
                {
                  [fe.error]: M || t === "error",
                  [fe.success]: t === "success"
                }
              ),
              children: /* @__PURE__ */ k("span", { className: fe.count, children: [
                S,
                s && ` / ${s}`
              ] })
            }
          )
        ]
      }
    );
  }
);
qa.displayName = "Textarea";
const Ra = "_selectWrapper_1tzaq_4", Pa = "_fullWidth_1tzaq_11", Ha = "_trigger_1tzaq_16", ja = "_sm_1tzaq_39", Wa = "_md_1tzaq_46", Ga = "_lg_1tzaq_53", Ja = "_error_1tzaq_65", Va = "_success_1tzaq_70", Ka = "_withShadow_1tzaq_105", Oa = "_value_1tzaq_123", Ya = "_placeholder_1tzaq_131", Xa = "_arrow_1tzaq_136", Ua = "_arrowOpen_1tzaq_145", Za = "_disabled_1tzaq_157", Qa = "_dropdown_1tzaq_162", es = "_brutalistDropdown_1tzaq_1", ts = "_optionGroup_1tzaq_188", ns = "_groupLabel_1tzaq_196", rs = "_option_1tzaq_188", os = "_focused_1tzaq_236", as = "_selected_1tzaq_244", Z = {
  selectWrapper: Ra,
  fullWidth: Pa,
  trigger: Ha,
  sm: ja,
  md: Wa,
  lg: Ga,
  default: "_default_1tzaq_61",
  error: Ja,
  success: Va,
  withShadow: Ka,
  value: Oa,
  placeholder: Ya,
  arrow: Xa,
  arrowOpen: Ua,
  disabled: Za,
  dropdown: Qa,
  brutalistDropdown: es,
  optionGroup: ts,
  groupLabel: ns,
  option: rs,
  focused: os,
  selected: as
};
function qt(e) {
  return "options" in e;
}
const Pt = w(
  ({
    className: e,
    variant: t = "default",
    size: n = "md",
    options: o = [],
    placeholder: a = "Select an option...",
    fullWidth: s = !1,
    brutalistShadow: c = !0,
    disabled: l = !1,
    value: i,
    defaultValue: h,
    onChange: m,
    onBlur: u,
    onFocus: d,
    name: p,
    id: x
  }, f) => {
    const [g, $] = q(!1), [C, L] = q(i || h || ""), [v, y] = q(-1), b = K(null), N = K(null);
    No(f, () => b.current, []);
    const z = [];
    o.forEach((I) => {
      qt(I) ? z.push(...I.options.filter((A) => !A.disabled)) : I.disabled || z.push(I);
    }), j(() => {
      i !== void 0 && L(i);
    }, [i]), j(() => {
      const I = (A) => {
        b.current && !b.current.contains(A.target) && ($(!1), y(-1));
      };
      if (g)
        return document.addEventListener("mousedown", I), () => document.removeEventListener("mousedown", I);
    }, [g]);
    const S = () => {
      l || ($(!g), y(-1), g ? u == null || u() : d == null || d());
    }, D = (I) => {
      var A;
      L(I), $(!1), y(-1), m == null || m(I), u == null || u(), (A = N.current) == null || A.focus();
    }, E = (I) => {
      var A;
      if (!l)
        switch (I.key) {
          case "Enter":
          case " ":
            I.preventDefault(), g && v >= 0 ? D(z[v].value) : $(!g);
            break;
          case "Escape":
            $(!1), y(-1), (A = N.current) == null || A.focus();
            break;
          case "ArrowDown":
            I.preventDefault(), g ? y(
              (T) => T < z.length - 1 ? T + 1 : T
            ) : ($(!0), y(0));
            break;
          case "ArrowUp":
            I.preventDefault(), g && y((T) => T > 0 ? T - 1 : T);
            break;
        }
    }, F = z.find((I) => I.value === C), M = (F == null ? void 0 : F.label) || a;
    return /* @__PURE__ */ k(
      "div",
      {
        ref: b,
        className: _(
          Z.selectWrapper,
          Z[t],
          Z[n],
          {
            [Z.fullWidth]: s,
            [Z.disabled]: l,
            [Z.withShadow]: c && !l,
            [Z.isOpen]: g
          },
          e
        ),
        children: [
          /* @__PURE__ */ r(
            "input",
            {
              type: "hidden",
              name: p,
              value: C
            }
          ),
          /* @__PURE__ */ k(
            "button",
            {
              ref: N,
              type: "button",
              className: Z.trigger,
              onClick: S,
              onKeyDown: E,
              disabled: l,
              "aria-haspopup": "listbox",
              "aria-expanded": g,
              "aria-labelledby": x,
              id: x,
              children: [
                /* @__PURE__ */ r("span", { className: _(Z.value, { [Z.placeholder]: !F }), children: M }),
                /* @__PURE__ */ r("div", { className: Z.arrow, children: /* @__PURE__ */ r(
                  "svg",
                  {
                    width: "12",
                    height: "8",
                    viewBox: "0 0 12 8",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    className: _({ [Z.arrowOpen]: g }),
                    children: /* @__PURE__ */ r(
                      "path",
                      {
                        d: "M1 1L6 6L11 1",
                        stroke: "currentColor",
                        strokeWidth: "2",
                        strokeLinecap: "square",
                        strokeLinejoin: "miter"
                      }
                    )
                  }
                ) })
              ]
            }
          ),
          g && /* @__PURE__ */ r("div", { className: Z.dropdown, role: "listbox", children: o.map((I, A) => {
            if (qt(I))
              return /* @__PURE__ */ k("div", { className: Z.optionGroup, children: [
                /* @__PURE__ */ r("div", { className: Z.groupLabel, children: I.label }),
                I.options.map((T) => {
                  const P = z.findIndex((X) => X.value === T.value);
                  return /* @__PURE__ */ r(
                    "button",
                    {
                      type: "button",
                      className: _(
                        Z.option,
                        {
                          [Z.selected]: T.value === C,
                          [Z.focused]: P === v,
                          [Z.disabled]: T.disabled
                        }
                      ),
                      onClick: () => !T.disabled && D(T.value),
                      disabled: T.disabled,
                      role: "option",
                      "aria-selected": T.value === C,
                      children: T.label
                    },
                    T.value
                  );
                })
              ] }, `group-${A}`);
            {
              const T = z.findIndex((P) => P.value === I.value);
              return /* @__PURE__ */ r(
                "button",
                {
                  type: "button",
                  className: _(
                    Z.option,
                    {
                      [Z.selected]: I.value === C,
                      [Z.focused]: T === v,
                      [Z.disabled]: I.disabled
                    }
                  ),
                  onClick: () => !I.disabled && D(I.value),
                  disabled: I.disabled,
                  role: "option",
                  "aria-selected": I.value === C,
                  children: I.label
                },
                I.value
              );
            }
          }) })
        ]
      }
    );
  }
);
Pt.displayName = "CustomSelect";
const ss = "_select_hw06m_4", ls = "_sm_hw06m_29", cs = "_md_hw06m_36", is = "_lg_hw06m_43", ds = "_fullWidth_hw06m_51", us = "_error_hw06m_60", _s = "_success_hw06m_65", ms = "_withShadow_hw06m_77", hs = "_disabled_hw06m_117", ps = "_hasPlaceholder_hw06m_125", gs = "_selectWrapper_hw06m_204", bs = "_arrow_hw06m_267", ve = {
  select: ss,
  sm: ls,
  md: cs,
  lg: is,
  fullWidth: ds,
  default: "_default_hw06m_56",
  error: us,
  success: _s,
  withShadow: ms,
  disabled: hs,
  hasPlaceholder: ps,
  selectWrapper: gs,
  arrow: bs
};
function fs(e) {
  return "options" in e;
}
const vs = w(
  ({
    className: e,
    variant: t = "default",
    size: n = "md",
    options: o = [],
    placeholder: a,
    fullWidth: s = !1,
    brutalistShadow: c = !0,
    customArrow: l = !0,
    useCustomDropdown: i = !0,
    onValueChange: h,
    disabled: m,
    children: u,
    ...d
  }, p) => {
    if (i) {
      let f = o;
      return o.length === 0 && u && (f = [], R.Children.forEach(u, (g) => {
        if (R.isValidElement(g)) {
          if (g.type === "option") {
            const $ = g.props.value || "", C = g.props.children || "";
            $ && C && f.push({
              value: $,
              label: C,
              disabled: g.props.disabled
            });
          } else if (g.type === "optgroup") {
            const $ = g.props.label || "", C = [];
            R.Children.forEach(g.props.children, (L) => {
              if (R.isValidElement(L) && L.type === "option") {
                const v = L.props, y = v.value || "", b = v.children || "";
                y && b && C.push({
                  value: String(y),
                  label: String(b),
                  disabled: v.disabled
                });
              }
            }), C.length > 0 && f.push({
              label: $,
              options: C
            });
          }
        }
      })), /* @__PURE__ */ r(
        Pt,
        {
          variant: t,
          size: n,
          options: f,
          placeholder: a,
          fullWidth: s,
          brutalistShadow: c,
          disabled: m,
          value: d.value,
          defaultValue: d.defaultValue,
          onChange: h || ((g) => {
            var C;
            const $ = {
              target: { value: g },
              currentTarget: { value: g }
            };
            (C = d.onChange) == null || C.call(d, $);
          }),
          onBlur: d.onBlur ? () => {
            var g;
            return (g = d.onBlur) == null ? void 0 : g.call(d, {});
          } : void 0,
          onFocus: d.onFocus ? () => {
            var g;
            return (g = d.onFocus) == null ? void 0 : g.call(d, {});
          } : void 0,
          className: e,
          name: d.name,
          id: d.id
        }
      );
    }
    const x = /* @__PURE__ */ k(
      "select",
      {
        ref: p,
        className: _(
          ve.select,
          ve[t],
          ve[n],
          {
            [ve.disabled]: m,
            [ve.withShadow]: c && !m,
            [ve.fullWidth]: s,
            [ve.hasPlaceholder]: a && !d.value && !d.defaultValue
          },
          e
        ),
        disabled: m,
        ...d,
        children: [
          a && /* @__PURE__ */ r("option", { value: "", disabled: !0, hidden: !0, children: a }),
          u || o.map((f, g) => fs(f) ? /* @__PURE__ */ r("optgroup", { label: f.label, children: f.options.map(($) => /* @__PURE__ */ r(
            "option",
            {
              value: $.value,
              disabled: $.disabled,
              children: $.label
            },
            $.value
          )) }, `group-${g}`) : /* @__PURE__ */ r(
            "option",
            {
              value: f.value,
              disabled: f.disabled,
              children: f.label
            },
            f.value
          ))
        ]
      }
    );
    return l ? /* @__PURE__ */ k(
      "div",
      {
        className: _(
          ve.selectWrapper,
          ve[t],
          ve[n],
          {
            [ve.fullWidth]: s,
            [ve.disabled]: m,
            [ve.withShadow]: c && !m
          }
        ),
        children: [
          x,
          /* @__PURE__ */ r("div", { className: ve.arrow, children: /* @__PURE__ */ r(
            "svg",
            {
              width: "12",
              height: "8",
              viewBox: "0 0 12 8",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ r(
                "path",
                {
                  d: "M1 1L6 6L11 1",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "square",
                  strokeLinejoin: "miter"
                }
              )
            }
          ) })
        ]
      }
    ) : x;
  }
);
vs.displayName = "Select";
const ys = "_container_wk3i0_3", ws = "_checkboxWrapper_wk3i0_11", xs = "_input_wk3i0_18", $s = "_checkbox_wk3i0_11", ks = "_withShadow_wk3i0_40", Ns = "_sm_wk3i0_45", Cs = "_md_wk3i0_50", Ls = "_lg_wk3i0_55", Ss = "_checkmark_wk3i0_61", Ts = "_indeterminateLine_wk3i0_71", Is = "_label_wk3i0_81", As = "_indeterminate_wk3i0_71", Es = "_disabled_wk3i0_118", Ds = "_error_wk3i0_164", Fs = "_checkAnimation_wk3i0_1", Le = {
  container: ys,
  checkboxWrapper: ws,
  input: xs,
  checkbox: $s,
  withShadow: ks,
  sm: Ns,
  md: Cs,
  lg: Ls,
  checkmark: Ss,
  indeterminateLine: Ts,
  label: Is,
  indeterminate: As,
  disabled: Es,
  error: Ds,
  checkAnimation: Fs
}, Ms = w(
  ({
    className: e,
    size: t = "md",
    label: n,
    indeterminate: o = !1,
    error: a = !1,
    brutalistShadow: s = !0,
    disabled: c,
    id: l,
    ...i
  }, h) => {
    const m = K(null), u = h || m;
    j(() => {
      const p = typeof u == "function" ? null : u.current;
      p && (p.indeterminate = o);
    }, [o, u]);
    const d = l || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    return /* @__PURE__ */ k(
      "div",
      {
        className: _(
          Le.container,
          Le[t],
          {
            [Le.disabled]: c,
            [Le.error]: a
          },
          e
        ),
        children: [
          /* @__PURE__ */ k("div", { className: Le.checkboxWrapper, children: [
            /* @__PURE__ */ r(
              "input",
              {
                ref: u,
                type: "checkbox",
                id: d,
                className: Le.input,
                disabled: c,
                "aria-invalid": a,
                ...i
              }
            ),
            /* @__PURE__ */ k(
              "div",
              {
                className: _(
                  Le.checkbox,
                  {
                    [Le.withShadow]: s,
                    [Le.indeterminate]: o
                  }
                ),
                children: [
                  /* @__PURE__ */ r(
                    "svg",
                    {
                      className: Le.checkmark,
                      viewBox: "0 0 24 24",
                      fill: "none",
                      "aria-hidden": "true",
                      children: /* @__PURE__ */ r(
                        "path",
                        {
                          d: "M5 13L9 17L19 7",
                          stroke: "currentColor",
                          strokeWidth: "4",
                          strokeLinecap: "square",
                          strokeLinejoin: "miter"
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ r("div", { className: Le.indeterminateLine })
                ]
              }
            )
          ] }),
          n && /* @__PURE__ */ r("label", { htmlFor: d, className: Le.label, children: n })
        ]
      }
    );
  }
);
Ms.displayName = "Checkbox";
const Bs = "_group_19r3l_4", zs = "_vertical_19r3l_9", qs = "_horizontal_19r3l_13", Rs = "_container_19r3l_19", Ps = "_radioWrapper_19r3l_27", Hs = "_input_19r3l_33", js = "_radio_19r3l_27", Ws = "_withShadow_19r3l_57", Gs = "_sm_19r3l_62", Js = "_md_19r3l_67", Vs = "_lg_19r3l_72", Ks = "_indicator_19r3l_78", Os = "_label_19r3l_123", Ys = "_disabled_19r3l_150", Xs = "_error_19r3l_196", Us = "_selectAnimation_19r3l_1", Zs = "_checked_19r3l_253", he = {
  group: Bs,
  vertical: zs,
  horizontal: qs,
  container: Rs,
  radioWrapper: Ps,
  input: Hs,
  radio: js,
  withShadow: Ws,
  sm: Gs,
  md: Js,
  lg: Vs,
  indicator: Ks,
  label: Os,
  disabled: Ys,
  error: Xs,
  selectAnimation: Us,
  checked: Zs
}, Ht = ue(void 0), s0 = ({
  name: e,
  value: t,
  defaultValue: n,
  onChange: o,
  children: a,
  direction: s = "vertical",
  size: c = "md",
  disabled: l = !1,
  error: i = !1,
  brutalistShadow: h = !0,
  className: m
}) => {
  const [u, d] = q(n), p = t !== void 0, x = p ? t : u, f = (g) => {
    p || d(g), o == null || o(g);
  };
  return /* @__PURE__ */ r(
    Ht.Provider,
    {
      value: {
        name: e,
        value: x,
        onChange: f,
        disabled: l,
        error: i,
        size: c,
        brutalistShadow: h
      },
      children: /* @__PURE__ */ r(
        "div",
        {
          className: _(
            he.group,
            he[s],
            {
              [he.disabled]: l,
              [he.error]: i
            },
            m
          ),
          role: "radiogroup",
          "aria-invalid": i,
          children: a
        }
      )
    }
  );
}, Qs = w(
  ({
    className: e,
    value: t,
    label: n,
    size: o,
    disabled: a,
    error: s,
    brutalistShadow: c,
    id: l,
    ...i
  }, h) => {
    const m = Y(Ht);
    if (!m)
      throw new Error("Radio must be used within RadioGroup");
    const {
      name: u,
      value: d,
      onChange: p,
      disabled: x,
      error: f,
      size: g,
      brutalistShadow: $
    } = m, C = o || g || "md", L = a || x, v = s || f, y = c !== void 0 ? c : $, b = t === d, N = l || `radio-${u}-${t}`, z = () => {
      L || p(t);
    };
    return /* @__PURE__ */ k(
      "div",
      {
        className: _(
          he.container,
          he[C],
          {
            [he.disabled]: L,
            [he.error]: v,
            [he.checked]: b
          },
          e
        ),
        children: [
          /* @__PURE__ */ k("div", { className: he.radioWrapper, children: [
            /* @__PURE__ */ r(
              "input",
              {
                ref: h,
                type: "radio",
                id: N,
                name: u,
                value: t,
                checked: b,
                onChange: () => z(),
                className: he.input,
                disabled: L,
                "aria-invalid": v,
                ...i
              }
            ),
            /* @__PURE__ */ r(
              "div",
              {
                className: _(
                  he.radio,
                  {
                    [he.withShadow]: y
                  }
                ),
                children: /* @__PURE__ */ r("div", { className: he.indicator })
              }
            )
          ] }),
          n && /* @__PURE__ */ r("label", { htmlFor: N, className: he.label, children: n })
        ]
      }
    );
  }
);
Qs.displayName = "Radio";
const el = "_container_nb9zw_3", tl = "_labelLeft_nb9zw_11", nl = "_switchWrapper_nb9zw_15", rl = "_input_nb9zw_21", ol = "_withShadow_nb9zw_44", al = "_sm_nb9zw_49", sl = "_md_nb9zw_54", ll = "_lg_nb9zw_59", cl = "_thumb_nb9zw_65", il = "_checked_nb9zw_95", dl = "_label_nb9zw_11", ul = "_disabled_nb9zw_135", _l = "_loading_nb9zw_192", ml = "_loadingIndicator_nb9zw_196", hl = "_loadingPulse_nb9zw_1", pl = "_slideIn_nb9zw_1", ye = {
  container: el,
  labelLeft: tl,
  switchWrapper: nl,
  input: rl,
  switch: "_switch_nb9zw_15",
  withShadow: ol,
  sm: al,
  md: sl,
  lg: ll,
  thumb: cl,
  checked: il,
  label: dl,
  disabled: ul,
  loading: _l,
  loadingIndicator: ml,
  loadingPulse: hl,
  slideIn: pl
}, gl = w(
  ({
    className: e,
    size: t = "md",
    label: n,
    labelPosition: o = "right",
    loading: a = !1,
    brutalistShadow: s = !0,
    disabled: c,
    checked: l,
    defaultChecked: i,
    onChange: h,
    onCheckedChange: m,
    id: u,
    ...d
  }, p) => {
    const [x, f] = q(i ?? !1), g = l !== void 0, $ = g ? l : x, C = W((N) => {
      const z = N.target.checked;
      g || f(z), h == null || h(N), m == null || m(z);
    }, [g, h, m]), L = u || `switch-${Math.random().toString(36).substr(2, 9)}`, v = c || a, y = /* @__PURE__ */ k("div", { className: ye.switchWrapper, children: [
      /* @__PURE__ */ r(
        "input",
        {
          ref: p,
          type: "checkbox",
          id: L,
          className: ye.input,
          disabled: v,
          checked: $,
          onChange: C,
          ...d
        }
      ),
      /* @__PURE__ */ r(
        "div",
        {
          className: _(
            ye.switch,
            {
              [ye.withShadow]: s,
              [ye.checked]: $,
              [ye.loading]: a
            }
          ),
          children: /* @__PURE__ */ r("div", { className: ye.thumb, children: a && /* @__PURE__ */ r("div", { className: ye.loadingIndicator }) })
        }
      )
    ] }), b = n && /* @__PURE__ */ r("label", { htmlFor: L, className: ye.label, children: n });
    return /* @__PURE__ */ k(
      "div",
      {
        className: _(
          ye.container,
          ye[t],
          {
            [ye.disabled]: v,
            [ye.labelLeft]: o === "left"
          },
          e
        ),
        children: [
          o === "left" && b,
          y,
          o === "right" && b
        ]
      }
    );
  }
);
gl.displayName = "Switch";
const bl = "_toggle_cd741_4", fl = "_sm_cd741_23", vl = "_md_cd741_29", yl = "_lg_cd741_35", wl = "_disabled_cd741_48", xl = "_pressed_cd741_52", $l = "_brutal_cd741_61", kl = "_outline_cd741_81", Nl = "_withShadow_cd741_101", Cl = "_press_cd741_52", Ue = {
  toggle: bl,
  sm: fl,
  md: vl,
  lg: yl,
  default: "_default_cd741_42",
  disabled: wl,
  pressed: xl,
  brutal: $l,
  outline: kl,
  withShadow: Nl,
  press: Cl
}, Ll = w(
  ({
    className: e,
    variant: t = "default",
    size: n = "md",
    pressed: o,
    defaultPressed: a = !1,
    onPressedChange: s,
    onClick: c,
    disabled: l,
    brutalistShadow: i = !0,
    children: h,
    asChild: m = !1,
    ...u
  }, d) => {
    const [p, x] = q(a), f = o !== void 0, g = f ? o : p, $ = W((L) => {
      if (l) return;
      const v = !g;
      f || x(v), c == null || c(L), s == null || s(v);
    }, [f, g, c, s, l]);
    return /* @__PURE__ */ r(
      m ? "span" : "button",
      {
        ref: d,
        type: m ? void 0 : "button",
        role: "button",
        "aria-pressed": g,
        "data-state": g ? "on" : "off",
        className: _(
          Ue.toggle,
          Ue[t],
          Ue[n],
          {
            [Ue.pressed]: g,
            [Ue.disabled]: l,
            [Ue.withShadow]: i && !l
          },
          e
        ),
        onClick: $,
        disabled: l,
        ...u,
        children: h
      }
    );
  }
);
Ll.displayName = "Toggle";
const Sl = "_root_1v2uv_4", Tl = "_trigger_1v2uv_10", Il = "_content_1v2uv_16", Al = "_fadeIn_1v2uv_1", El = "_contentInner_1v2uv_26", Dl = "_withShadow_1v2uv_32", Fl = "_top_1v2uv_37", Ml = "_right_1v2uv_41", Bl = "_bottom_1v2uv_45", zl = "_left_1v2uv_49", ql = "_arrow_1v2uv_54", Rl = "_profileCard_1v2uv_195", Pl = "_profileAvatar_1v2uv_201", Hl = "_profileInfo_1v2uv_209", jl = "_profileName_1v2uv_214", Wl = "_profileBio_1v2uv_219", Gl = "_profileStats_1v2uv_224", Jl = "_profileStat_1v2uv_224", Vl = "_profileStatValue_1v2uv_236", Kl = "_profileStatLabel_1v2uv_241", Ye = {
  root: Sl,
  trigger: Tl,
  content: Il,
  fadeIn: Al,
  contentInner: El,
  withShadow: Dl,
  top: Fl,
  right: Ml,
  bottom: Bl,
  left: zl,
  arrow: ql,
  profileCard: Rl,
  profileAvatar: Pl,
  profileInfo: Hl,
  profileName: jl,
  profileBio: Wl,
  profileStats: Gl,
  profileStat: Jl,
  profileStatValue: Vl,
  profileStatLabel: Kl
}, jt = R.createContext(null), Wt = () => {
  const e = R.useContext(jt);
  if (!e)
    throw new Error("HoverCard components must be used within a HoverCard");
  return e;
}, Gt = ({
  children: e,
  defaultOpen: t = !1,
  open: n,
  onOpenChange: o,
  openDelay: a = 700,
  closeDelay: s = 300
}) => {
  const [c, l] = q(t), i = n !== void 0, h = i ? n : c, m = K(null), u = K(), d = K(), p = (x) => {
    u.current && clearTimeout(u.current), d.current && clearTimeout(d.current);
    const g = setTimeout(() => {
      i || l(x), o == null || o(x);
    }, x ? a : s);
    x ? u.current = g : d.current = g;
  };
  return j(() => () => {
    u.current && clearTimeout(u.current), d.current && clearTimeout(d.current);
  }, []), /* @__PURE__ */ r(jt.Provider, { value: { open: h, setOpen: p, triggerRef: m }, children: /* @__PURE__ */ r("div", { className: Ye.root, children: e }) });
}, Jt = w(
  ({ children: e, asChild: t = !1, className: n }, o) => {
    const { setOpen: a, triggerRef: s } = Wt(), m = {
      ref: s,
      onMouseEnter: () => a(!0),
      onMouseLeave: () => a(!1),
      onFocus: () => a(!0),
      onBlur: () => a(!1),
      className: _(Ye.trigger, n)
    };
    return t && R.isValidElement(e) ? R.cloneElement(e, m) : /* @__PURE__ */ r("div", { ...m, children: e });
  }
);
Jt.displayName = "HoverCardTrigger";
const Vt = w(
  ({
    children: e,
    className: t,
    side: n = "bottom",
    align: o = "center",
    sideOffset: a = 8,
    alignOffset: s = 0,
    collisionBoundary: c = "viewport",
    hideWhenDetached: l = !0,
    // eslint-disable-line @typescript-eslint/no-unused-vars
    brutalistShadow: i = !0,
    ...h
  }, m) => {
    const { open: u, triggerRef: d, setOpen: p } = Wt(), x = K(null), f = m || x, [g, $] = q({ top: 0, left: 0 }), [C, L] = q(n), v = () => p(!0), y = () => p(!1);
    return j(() => {
      if (!u || !d.current || !f.current) return;
      const b = () => {
        const N = d.current, z = f.current;
        if (!N || !z) return;
        const S = N.getBoundingClientRect(), D = z.getBoundingClientRect(), E = window.innerWidth, F = window.innerHeight;
        let M = 0, I = 0, A = n;
        switch (n) {
          case "top":
            M = S.top - D.height - a, I = S.left + S.width / 2 - D.width / 2;
            break;
          case "right":
            M = S.top + S.height / 2 - D.height / 2, I = S.right + a;
            break;
          case "bottom":
            M = S.bottom + a, I = S.left + S.width / 2 - D.width / 2;
            break;
          case "left":
            M = S.top + S.height / 2 - D.height / 2, I = S.left - D.width - a;
            break;
        }
        n === "top" || n === "bottom" ? o === "start" ? I = S.left + s : o === "end" && (I = S.right - D.width - s) : o === "start" ? M = S.top + s : o === "end" && (M = S.bottom - D.height - s), c === "viewport" && (n === "bottom" && M + D.height > F ? (M = S.top - D.height - a, A = "top") : n === "top" && M < 0 ? (M = S.bottom + a, A = "bottom") : n === "right" && I + D.width > E ? (I = S.left - D.width - a, A = "left") : n === "left" && I < 0 && (I = S.right + a, A = "right"), I = Math.max(8, Math.min(I, E - D.width - 8)), M = Math.max(8, Math.min(M, F - D.height - 8))), $({ top: M, left: I }), L(A);
      };
      return b(), window.addEventListener("resize", b), window.addEventListener("scroll", b, !0), () => {
        window.removeEventListener("resize", b), window.removeEventListener("scroll", b, !0);
      };
    }, [u, n, o, a, s, c, d, f]), u ? /* @__PURE__ */ k(
      "div",
      {
        ref: f,
        className: _(
          Ye.content,
          Ye[C],
          {
            [Ye.withShadow]: i
          },
          t
        ),
        style: {
          position: "fixed",
          top: `${g.top}px`,
          left: `${g.left}px`,
          zIndex: 50
        },
        onMouseEnter: v,
        onMouseLeave: y,
        ...h,
        children: [
          /* @__PURE__ */ r("div", { className: Ye.contentInner, children: e }),
          /* @__PURE__ */ r("div", { className: Ye.arrow, "data-side": C })
        ]
      }
    ) : null;
  }
);
Vt.displayName = "HoverCardContent";
Gt.Trigger = Jt;
Gt.Content = Vt;
const Ol = "_typography_1yege_4", Yl = "_h1_1yege_12", Xl = "_h2_1yege_21", Ul = "_h3_1yege_30", Zl = "_h4_1yege_38", Ql = "_h5_1yege_46", ec = "_h6_1yege_54", tc = "_p_1yege_62", nc = "_lead_1yege_69", rc = "_large_1yege_76", oc = "_small_1yege_83", ac = "_muted_1yege_90", sc = "_blockquote_1yege_98", lc = "_code_1yege_108", cc = "_list_1yege_119", ic = "_truncate_1yege_272", ze = {
  typography: Ol,
  h1: Yl,
  h2: Xl,
  h3: Ul,
  h4: Zl,
  h5: Ql,
  h6: ec,
  p: tc,
  lead: nc,
  large: rc,
  small: oc,
  muted: ac,
  blockquote: sc,
  code: lc,
  list: cc,
  "size-xs": "_size-xs_1yege_138",
  "size-sm": "_size-sm_1yege_142",
  "size-base": "_size-base_1yege_146",
  "size-lg": "_size-lg_1yege_150",
  "size-xl": "_size-xl_1yege_154",
  "size-2xl": "_size-2xl_1yege_158",
  "size-3xl": "_size-3xl_1yege_162",
  "size-4xl": "_size-4xl_1yege_166",
  "size-5xl": "_size-5xl_1yege_170",
  "size-6xl": "_size-6xl_1yege_174",
  "weight-normal": "_weight-normal_1yege_179",
  "weight-medium": "_weight-medium_1yege_183",
  "weight-semibold": "_weight-semibold_1yege_187",
  "weight-bold": "_weight-bold_1yege_191",
  "weight-black": "_weight-black_1yege_195",
  "align-left": "_align-left_1yege_200",
  "align-center": "_align-center_1yege_204",
  "align-right": "_align-right_1yege_208",
  "align-justify": "_align-justify_1yege_212",
  "transform-none": "_transform-none_1yege_217",
  "transform-uppercase": "_transform-uppercase_1yege_221",
  "transform-lowercase": "_transform-lowercase_1yege_225",
  "transform-capitalize": "_transform-capitalize_1yege_229",
  "color-default": "_color-default_1yege_234",
  "color-muted": "_color-muted_1yege_238",
  "color-accent": "_color-accent_1yege_242",
  "color-destructive": "_color-destructive_1yege_246",
  "color-warning": "_color-warning_1yege_250",
  "color-success": "_color-success_1yege_254",
  "family-mono": "_family-mono_1yege_259",
  "family-sans": "_family-sans_1yege_263",
  "family-serif": "_family-serif_1yege_267",
  truncate: ic
}, dc = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  p: "p",
  lead: "p",
  large: "p",
  small: "p",
  muted: "p",
  blockquote: "blockquote",
  code: "code",
  list: "ul"
}, Ne = w(
  ({
    variant: e = "p",
    size: t,
    weight: n,
    align: o,
    transform: a,
    color: s = "default",
    family: c,
    truncate: l = !1,
    className: i,
    children: h,
    asChild: m = !1,
    ...u
  }, d) => {
    const p = m ? "span" : dc[e];
    return /* @__PURE__ */ r(
      p,
      {
        ref: d,
        className: _(
          ze.typography,
          ze[e],
          t && ze[`size-${t}`],
          n && ze[`weight-${n}`],
          o && ze[`align-${o}`],
          a && ze[`transform-${a}`],
          s && ze[`color-${s}`],
          c && ze[`family-${c}`],
          {
            [ze.truncate]: l
          },
          i
        ),
        ...u,
        children: h
      }
    );
  }
);
Ne.displayName = "Typography";
const uc = w(
  (e, t) => /* @__PURE__ */ r(Ne, { variant: "h1", ref: t, ...e })
);
uc.displayName = "TypographyH1";
const _c = w(
  (e, t) => /* @__PURE__ */ r(Ne, { variant: "h2", ref: t, ...e })
);
_c.displayName = "TypographyH2";
const mc = w(
  (e, t) => /* @__PURE__ */ r(Ne, { variant: "h3", ref: t, ...e })
);
mc.displayName = "TypographyH3";
const hc = w(
  (e, t) => /* @__PURE__ */ r(Ne, { variant: "h4", ref: t, ...e })
);
hc.displayName = "TypographyH4";
const pc = w(
  (e, t) => /* @__PURE__ */ r(Ne, { variant: "p", ref: t, ...e })
);
pc.displayName = "TypographyP";
const gc = w(
  (e, t) => /* @__PURE__ */ r(Ne, { variant: "lead", ref: t, ...e })
);
gc.displayName = "TypographyLead";
const bc = w(
  (e, t) => /* @__PURE__ */ r(Ne, { variant: "large", ref: t, ...e })
);
bc.displayName = "TypographyLarge";
const fc = w(
  (e, t) => /* @__PURE__ */ r(Ne, { variant: "small", ref: t, ...e })
);
fc.displayName = "TypographySmall";
const vc = w(
  (e, t) => /* @__PURE__ */ r(Ne, { variant: "muted", ref: t, ...e })
);
vc.displayName = "TypographyMuted";
const yc = w(
  (e, t) => /* @__PURE__ */ r(Ne, { variant: "blockquote", ref: t, ...e })
);
yc.displayName = "TypographyBlockquote";
const wc = w(
  (e, t) => /* @__PURE__ */ r(Ne, { variant: "code", ref: t, ...e })
);
wc.displayName = "TypographyCode";
const xc = w(
  (e, t) => /* @__PURE__ */ r(Ne, { variant: "list", ref: t, ...e })
);
xc.displayName = "TypographyList";
const $c = "_command_194m8_3", kc = "_inputWrapper_194m8_23", Nc = "_input_194m8_23", Cc = "_list_194m8_49", Lc = "_empty_194m8_73", Sc = "_group_194m8_82", Tc = "_groupHeading_194m8_94", Ic = "_groupItems_194m8_104", Ac = "_item_194m8_108", Ec = "_itemSelected_194m8_130", Dc = "_itemDisabled_194m8_142", Fc = "_separator_194m8_154", Ae = {
  command: $c,
  inputWrapper: kc,
  input: Nc,
  list: Cc,
  empty: Lc,
  group: Sc,
  groupHeading: Tc,
  groupItems: Ic,
  item: Ac,
  itemSelected: Ec,
  itemDisabled: Dc,
  separator: Fc
}, Kt = R.createContext(null), xt = () => {
  const e = R.useContext(Kt);
  if (!e)
    throw new Error("Command components must be used within a Command");
  return e;
}, Qe = ({
  children: e,
  className: t,
  onSelect: n,
  defaultValue: o = "",
  value: a,
  onValueChange: s,
  filter: c,
  shouldFilter: l = !0,
  // eslint-disable-line @typescript-eslint/no-unused-vars
  ...i
}) => {
  const [h, m] = q(o), [u, d] = q(0), [p, x] = q([]), [f, g] = q(0), $ = a !== void 0, C = $ ? a : h, L = (v) => {
    $ || m(v), s == null || s(v), d(0);
  };
  return /* @__PURE__ */ r(
    Kt.Provider,
    {
      value: {
        search: C,
        setSearch: L,
        selectedIndex: u,
        setSelectedIndex: d,
        items: p,
        setItems: x,
        onSelect: n,
        visibleCount: f,
        setVisibleCount: g
      },
      children: /* @__PURE__ */ r(
        "div",
        {
          className: _(Ae.command, t),
          ...i,
          children: e
        }
      )
    }
  );
}, Ot = w(
  ({ className: e, ...t }, n) => {
    const { search: o, setSearch: a, selectedIndex: s, setSelectedIndex: c, items: l, onSelect: i } = xt(), h = (m) => {
      var u;
      switch (m.key) {
        case "ArrowDown":
          m.preventDefault(), c(Math.min(s + 1, l.length - 1));
          break;
        case "ArrowUp":
          m.preventDefault(), c(Math.max(s - 1, 0));
          break;
        case "Enter":
          m.preventDefault(), l[s] && !l[s].disabled && (i == null || i(l[s].value));
          break;
        case "Escape":
          m.preventDefault(), a("");
          break;
      }
      (u = t.onKeyDown) == null || u.call(t, m);
    };
    return /* @__PURE__ */ r("div", { className: Ae.inputWrapper, children: /* @__PURE__ */ r(
      "input",
      {
        ref: n,
        className: _(Ae.input, e),
        value: o,
        onChange: (m) => a(m.target.value),
        onKeyDown: h,
        ...t
      }
    ) });
  }
);
Ot.displayName = "CommandInput";
const Yt = w(
  ({ children: e, className: t, ...n }, o) => /* @__PURE__ */ r(
    "div",
    {
      ref: o,
      className: _(Ae.list, t),
      ...n,
      children: e
    }
  )
);
Yt.displayName = "CommandList";
const Xt = w(
  ({ children: e, className: t, ...n }, o) => {
    const { visibleCount: a, search: s } = xt();
    return a > 0 || !s ? null : /* @__PURE__ */ r(
      "div",
      {
        ref: o,
        className: _(Ae.empty, t),
        ...n,
        children: e
      }
    );
  }
);
Xt.displayName = "CommandEmpty";
const Ut = w(
  ({ children: e, heading: t, className: n, ...o }, a) => /* @__PURE__ */ k(
    "div",
    {
      ref: a,
      className: _(Ae.group, n),
      ...o,
      children: [
        t && /* @__PURE__ */ r("div", { className: Ae.groupHeading, children: t }),
        /* @__PURE__ */ r("div", { className: Ae.groupItems, children: e })
      ]
    }
  )
);
Ut.displayName = "CommandGroup";
const Zt = w(
  ({ children: e, value: t, keywords: n = [], disabled: o = !1, className: a, onSelect: s, ...c }, l) => {
    const { search: i, selectedIndex: h, setItems: m, onSelect: u, setVisibleCount: d } = xt(), p = K(-1);
    j(() => {
      const C = { value: t, keywords: n, disabled: o };
      return m((L) => {
        const v = [...L, C];
        return p.current = v.length - 1, v;
      }), () => {
        m((L) => L.filter((v) => v.value !== t));
      };
    }, [t, n, o, m]);
    const x = p.current === h, f = () => {
      o || (s == null || s(t), u == null || u(t));
    }, g = () => {
      !o && p.current >= 0;
    }, $ = R.useMemo(() => {
      if (!i) return !0;
      const C = i.toLowerCase();
      return t.toLowerCase().includes(C) ? !0 : n.some(
        (v) => v.toLowerCase().includes(C)
      );
    }, [i, t, n]);
    return j(() => {
      if ($)
        return d((C) => C + 1), () => d((C) => C - 1);
    }, [$, d]), $ ? /* @__PURE__ */ r(
      "div",
      {
        ref: l,
        className: _(
          Ae.item,
          {
            [Ae.itemSelected]: x,
            [Ae.itemDisabled]: o
          },
          a
        ),
        onClick: f,
        onMouseEnter: g,
        role: "option",
        "aria-selected": x,
        "aria-disabled": o,
        "data-value": t,
        ...c,
        children: e
      }
    ) : null;
  }
);
Zt.displayName = "CommandItem";
const Qt = w(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: _(Ae.separator, e),
      role: "separator",
      ...t
    }
  )
);
Qt.displayName = "CommandSeparator";
Qe.Input = Ot;
Qe.List = Yt;
Qe.Empty = Xt;
Qe.Group = Ut;
Qe.Item = Zt;
Qe.Separator = Qt;
const Mc = "_container_1kso2_3", Bc = "_horizontal_1kso2_12", zc = "_vertical_1kso2_17", qc = "_track_1kso2_24", Rc = "_progress_1kso2_44", Pc = "_input_1kso2_65", Hc = "_thumb_1kso2_82", jc = "_disabled_1kso2_109", Wc = "_sm_1kso2_136", Gc = "_md_1kso2_142", Jc = "_lg_1kso2_148", Vc = "_value_1kso2_155", Kc = "_withValue_1kso2_165", Oc = "_marks_1kso2_170", Yc = "_mark_1kso2_170", Xc = "_markTick_1kso2_198", Uc = "_markActive_1kso2_213", Zc = "_markLabel_1kso2_217", _e = {
  container: Mc,
  horizontal: Bc,
  vertical: zc,
  track: qc,
  progress: Rc,
  input: Pc,
  thumb: Hc,
  disabled: jc,
  sm: Wc,
  md: Gc,
  lg: Jc,
  value: Vc,
  withValue: Kc,
  marks: Oc,
  mark: Yc,
  markTick: Xc,
  markActive: Uc,
  markLabel: Zc
}, Qc = w(
  ({
    size: e = "md",
    orientation: t = "horizontal",
    showValue: n = !1,
    marks: o,
    min: a = 0,
    max: s = 100,
    step: c = 1,
    disabled: l = !1,
    value: i,
    defaultValue: h = a,
    onChange: m,
    className: u,
    trackClassName: d,
    thumbClassName: p,
    valueClassName: x,
    ...f
  }, g) => {
    const [$, C] = q(
      Number(i !== void 0 ? i : h)
    ), L = K(null), v = g || L;
    j(() => {
      i !== void 0 && C(Number(i));
    }, [i]);
    const y = (S) => {
      const D = Number(S.target.value);
      C(D), m == null || m(S);
    }, b = ($ - a) / (s - a) * 100, N = () => {
      if (!o) return null;
      const S = o.map(
        (D) => typeof D == "number" ? { value: D } : D
      );
      return /* @__PURE__ */ r("div", { className: _e.marks, children: S.map((D) => {
        const E = (D.value - a) / (s - a) * 100, F = t === "horizontal" ? { left: `${E}%` } : { bottom: `${E}%` };
        return /* @__PURE__ */ k(
          "div",
          {
            className: _(_e.mark, {
              [_e.markActive]: $ >= D.value
            }),
            style: F,
            children: [
              /* @__PURE__ */ r("div", { className: _e.markTick }),
              D.label && /* @__PURE__ */ r("div", { className: _e.markLabel, children: D.label })
            ]
          },
          D.value
        );
      }) });
    }, z = t === "horizontal" ? {
      "--slider-percentage": `${b}%`
    } : {
      "--slider-percentage": `${b}%`,
      height: "200px"
    };
    return /* @__PURE__ */ k(
      "div",
      {
        className: _(
          _e.container,
          _e[e],
          _e[t],
          {
            [_e.disabled]: l,
            [_e.withValue]: n
          },
          u
        ),
        style: z,
        children: [
          /* @__PURE__ */ k("div", { className: _(_e.track, d), children: [
            /* @__PURE__ */ r("div", { className: _e.progress }),
            /* @__PURE__ */ r(
              "input",
              {
                ref: v,
                type: "range",
                min: a,
                max: s,
                step: c,
                value: $,
                disabled: l,
                onChange: y,
                className: _(_e.input),
                ...f
              }
            ),
            /* @__PURE__ */ r("div", { className: _(_e.thumb, p) }),
            N()
          ] }),
          n && /* @__PURE__ */ r("div", { className: _(_e.value, x), children: $ })
        ]
      }
    );
  }
);
Qc.displayName = "Slider";
const ei = "_container_adxoq_3", ti = "_avatar_adxoq_10", ni = "_xs_adxoq_26", ri = "_sm_adxoq_32", oi = "_md_adxoq_38", ai = "_lg_adxoq_44", si = "_xl_adxoq_50", li = "_image_adxoq_57", ci = "_loaded_adxoq_65", ii = "_initials_adxoq_70", di = "_iconWrapper_adxoq_84", ui = "_defaultIcon_adxoq_99", _i = "_status_adxoq_105", mi = "_online_adxoq_148", hi = "_offline_adxoq_152", pi = "_busy_adxoq_156", gi = "_away_adxoq_160", bi = "_clickable_adxoq_165", we = {
  container: ei,
  avatar: ti,
  xs: ni,
  sm: ri,
  md: oi,
  lg: ai,
  xl: si,
  image: li,
  loaded: ci,
  initials: ii,
  iconWrapper: di,
  defaultIcon: ui,
  status: _i,
  online: mi,
  offline: hi,
  busy: pi,
  away: gi,
  clickable: bi
}, fi = w(
  ({
    src: e,
    alt: t,
    initials: n,
    icon: o,
    size: a = "md",
    status: s,
    className: c,
    onClick: l,
    clickable: i = !1,
    ...h
  }, m) => {
    const [u, d] = q(!1), [p, x] = q(!1), f = () => {
      d(!0);
    }, g = () => {
      x(!0), d(!1);
    }, $ = e && !u, C = n && n.length > 0, L = o, v = $, y = !$ && C, b = !$ && !C && L, N = n ? n.slice(0, 2).toUpperCase() : "", z = /* @__PURE__ */ r(
      "svg",
      {
        viewBox: "0 0 24 24",
        fill: "currentColor",
        className: we.defaultIcon,
        children: /* @__PURE__ */ r("path", { d: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" })
      }
    ), S = i || !!l;
    return /* @__PURE__ */ k(
      "div",
      {
        ref: m,
        className: _(
          we.container,
          we[a],
          {
            [we.clickable]: S,
            [we.hasStatus]: !!s
          },
          c
        ),
        onClick: S ? l : void 0,
        role: S ? "button" : void 0,
        tabIndex: S ? 0 : void 0,
        onKeyDown: S ? (D) => {
          (D.key === "Enter" || D.key === " ") && (D.preventDefault(), l == null || l());
        } : void 0,
        "aria-label": t || `Avatar${n ? ` for ${n}` : ""}`,
        children: [
          /* @__PURE__ */ k("div", { className: we.avatar, children: [
            v && /* @__PURE__ */ r(
              "img",
              {
                src: e,
                alt: t,
                className: _(we.image, {
                  [we.loaded]: p
                }),
                onError: f,
                onLoad: g,
                ...h
              }
            ),
            y && /* @__PURE__ */ r("span", { className: we.initials, "aria-label": `Initials: ${N}`, children: N }),
            b && /* @__PURE__ */ r("span", { className: we.iconWrapper, "aria-label": "Avatar icon", children: o }),
            !v && !y && !b && /* @__PURE__ */ r("span", { className: we.iconWrapper, "aria-label": "Default avatar", children: z })
          ] }),
          s && /* @__PURE__ */ r(
            "div",
            {
              className: _(we.status, we[s]),
              "aria-label": `Status: ${s}`,
              role: "img"
            }
          )
        ]
      }
    );
  }
);
fi.displayName = "Avatar";
const vi = "_badge_1sgkc_3", yi = "_sm_1sgkc_21", wi = "_md_1sgkc_27", xi = "_lg_1sgkc_33", $i = "_solid_1sgkc_40", ki = "_accent_1sgkc_44", Ni = "_success_1sgkc_49", Ci = "_warning_1sgkc_54", Li = "_error_1sgkc_60", Si = "_info_1sgkc_65", Ti = "_neutral_1sgkc_70", Ii = "_outline_1sgkc_76", Ai = "_secondary_1sgkc_111", Ei = "_dot_1sgkc_154", Di = "_clickable_1sgkc_207", Fi = "_dismissible_1sgkc_227", Mi = "_dismissButton_1sgkc_231", Bi = "_dismissIcon_1sgkc_258", qe = {
  badge: vi,
  sm: yi,
  md: wi,
  lg: xi,
  solid: $i,
  accent: ki,
  success: Ni,
  warning: Ci,
  error: Li,
  info: Si,
  neutral: Ti,
  outline: Ii,
  secondary: Ai,
  dot: Ei,
  clickable: Di,
  dismissible: Fi,
  dismissButton: Mi,
  dismissIcon: Bi
}, zi = w(
  ({
    children: e,
    variant: t = "solid",
    color: n = "accent",
    size: o = "md",
    dismissible: a = !1,
    onDismiss: s,
    className: c,
    onClick: l,
    clickable: i = !1,
    ...h
  }, m) => {
    const u = t === "dot", d = i || !!l, p = a && !!s, x = (L) => {
      L.stopPropagation(), s == null || s();
    }, f = () => {
      d && (l == null || l());
    }, g = (L) => {
      d && (L.key === "Enter" || L.key === " ") && (L.preventDefault(), l == null || l());
    }, $ = u ? null : e, C = /* @__PURE__ */ r(
      "svg",
      {
        viewBox: "0 0 24 24",
        fill: "currentColor",
        className: qe.dismissIcon,
        "aria-hidden": "true",
        children: /* @__PURE__ */ r("path", { d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" })
      }
    );
    return /* @__PURE__ */ k(
      "span",
      {
        ref: m,
        className: _(
          qe.badge,
          qe[t],
          qe[n],
          qe[o],
          {
            [qe.clickable]: d,
            [qe.dismissible]: p,
            [qe.dot]: u
          },
          c
        ),
        onClick: d ? f : void 0,
        onKeyDown: d ? g : void 0,
        role: d ? "button" : u ? "status" : void 0,
        tabIndex: d ? 0 : void 0,
        "aria-label": u ? `${n} status indicator` : typeof e == "string" ? e : void 0,
        ...h,
        children: [
          $,
          p && /* @__PURE__ */ r(
            "button",
            {
              type: "button",
              className: qe.dismissButton,
              onClick: x,
              "aria-label": "Dismiss badge",
              tabIndex: -1,
              children: C
            }
          )
        ]
      }
    );
  }
);
zi.displayName = "Badge";
const qi = "_card_k50h9_3", Ri = "_elevated_k50h9_15", Pi = "_flat_k50h9_19", Hi = "_outline_k50h9_23", ji = "_clickable_k50h9_46", Wi = "_hover_k50h9_56", Gi = "_header_k50h9_96", Ji = "_body_k50h9_108", Vi = "_footer_k50h9_113", Je = {
  card: qi,
  elevated: Ri,
  flat: Pi,
  outline: Hi,
  "padding-none": "_padding-none_k50h9_29",
  "padding-sm": "_padding-sm_k50h9_33",
  "padding-md": "_padding-md_k50h9_37",
  "padding-lg": "_padding-lg_k50h9_41",
  clickable: ji,
  hover: Wi,
  header: Gi,
  body: Ji,
  footer: Vi
}, en = w(
  ({
    children: e,
    className: t,
    variant: n = "elevated",
    padding: o = "md",
    clickable: a = !1,
    hover: s = !0,
    ...c
  }, l) => /* @__PURE__ */ r(
    "div",
    {
      ref: l,
      className: _(
        Je.card,
        Je[n],
        Je[`padding-${o}`],
        {
          [Je.clickable]: a,
          [Je.hover]: s && !a
        },
        t
      ),
      role: a ? "button" : void 0,
      tabIndex: a ? 0 : void 0,
      ...c,
      children: e
    }
  )
), tn = w(
  ({ children: e, className: t, ...n }, o) => /* @__PURE__ */ r(
    "div",
    {
      ref: o,
      className: _(Je.header, t),
      ...n,
      children: e
    }
  )
), nn = w(
  ({ children: e, className: t, ...n }, o) => /* @__PURE__ */ r(
    "div",
    {
      ref: o,
      className: _(Je.body, t),
      ...n,
      children: e
    }
  )
), rn = w(
  ({ children: e, className: t, ...n }, o) => /* @__PURE__ */ r(
    "div",
    {
      ref: o,
      className: _(Je.footer, t),
      ...n,
      children: e
    }
  )
);
en.displayName = "Card";
tn.displayName = "Card.Header";
nn.displayName = "Card.Body";
rn.displayName = "Card.Footer";
const $t = en;
$t.Header = tn;
$t.Body = nn;
$t.Footer = rn;
const Ki = "_alert_cgw3v_38", Oi = "_alertEnter_cgw3v_1", Yi = "_sm_cgw3v_56", Xi = "_md_cgw3v_62", Ui = "_lg_cgw3v_68", Zi = "_info_cgw3v_75", Qi = "_filled_cgw3v_75", ed = "_success_cgw3v_81", td = "_warning_cgw3v_87", nd = "_error_cgw3v_93", rd = "_outline_cgw3v_100", od = "_icon_cgw3v_129", ad = "_content_cgw3v_145", sd = "_title_cgw3v_150", ld = "_description_cgw3v_160", cd = "_actions_cgw3v_170", id = "_dismissible_cgw3v_179", dd = "_dismissButton_cgw3v_183", ud = "_exiting_cgw3v_250", _d = "_alertExit_cgw3v_1", md = "_alertShake_cgw3v_1", Se = {
  alert: Ki,
  alertEnter: Oi,
  sm: Yi,
  md: Xi,
  lg: Ui,
  info: Zi,
  filled: Qi,
  success: ed,
  warning: td,
  error: nd,
  outline: rd,
  icon: od,
  content: ad,
  title: sd,
  description: ld,
  actions: cd,
  dismissible: id,
  dismissButton: dd,
  exiting: ud,
  alertExit: _d,
  alertShake: md
}, on = w(
  ({
    children: e,
    className: t,
    type: n = "info",
    variant: o = "filled",
    size: a = "md",
    dismissible: s = !1,
    onDismiss: c,
    ...l
  }, i) => {
    const [h, m] = q(!1), [u, d] = q(!1), p = () => {
      d(!0), setTimeout(() => {
        m(!0), c == null || c();
      }, 300);
    };
    return h ? null : /* @__PURE__ */ k(
      "div",
      {
        ref: i,
        className: _(
          Se.alert,
          Se[n],
          Se[o],
          Se[a],
          {
            [Se.dismissible]: s,
            [Se.exiting]: u
          },
          t
        ),
        role: "alert",
        "aria-live": "polite",
        ...l,
        children: [
          e,
          s && /* @__PURE__ */ r(
            "button",
            {
              className: Se.dismissButton,
              onClick: p,
              "aria-label": "Dismiss alert",
              type: "button",
              children: /* @__PURE__ */ r(
                "svg",
                {
                  width: "16",
                  height: "16",
                  viewBox: "0 0 16 16",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: /* @__PURE__ */ r(
                    "path",
                    {
                      d: "M12 4L4 12M4 4L12 12",
                      stroke: "currentColor",
                      strokeWidth: "2",
                      strokeLinecap: "square"
                    }
                  )
                }
              )
            }
          )
        ]
      }
    );
  }
), an = w(
  ({ children: e, className: t, ...n }, o) => /* @__PURE__ */ r(
    "div",
    {
      ref: o,
      className: _(Se.icon, t),
      ...n,
      children: e || /* @__PURE__ */ r(hd, {})
    }
  )
), sn = w(
  ({ children: e, className: t, ...n }, o) => /* @__PURE__ */ r(
    "div",
    {
      ref: o,
      className: _(Se.content, t),
      ...n,
      children: e
    }
  )
), ln = w(
  ({ children: e, className: t, ...n }, o) => /* @__PURE__ */ r(
    "h4",
    {
      ref: o,
      className: _(Se.title, t),
      ...n,
      children: e
    }
  )
), cn = w(
  ({ children: e, className: t, ...n }, o) => /* @__PURE__ */ r(
    "p",
    {
      ref: o,
      className: _(Se.description, t),
      ...n,
      children: e
    }
  )
), dn = w(
  ({ children: e, className: t, ...n }, o) => /* @__PURE__ */ r(
    "div",
    {
      ref: o,
      className: _(Se.actions, t),
      ...n,
      children: e
    }
  )
), hd = () => /* @__PURE__ */ k(
  "svg",
  {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ r(
        "circle",
        {
          cx: "10",
          cy: "10",
          r: "8",
          stroke: "currentColor",
          strokeWidth: "2",
          fill: "none"
        }
      ),
      /* @__PURE__ */ r(
        "path",
        {
          d: "M10 6V10",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "square"
        }
      ),
      /* @__PURE__ */ r(
        "circle",
        {
          cx: "10",
          cy: "14",
          r: "1",
          fill: "currentColor"
        }
      )
    ]
  }
);
on.displayName = "Alert";
an.displayName = "Alert.Icon";
sn.displayName = "Alert.Content";
ln.displayName = "Alert.Title";
cn.displayName = "Alert.Description";
dn.displayName = "Alert.Actions";
const ot = on;
ot.Icon = an;
ot.Content = sn;
ot.Title = ln;
ot.Description = cn;
ot.Actions = dn;
const pd = "_stack_1t860_3", gd = "_vertical_1t860_9", bd = "_horizontal_1t860_13", ft = {
  stack: pd,
  vertical: gd,
  horizontal: bd,
  "gap-sm": "_gap-sm_1t860_19",
  "gap-md": "_gap-md_1t860_23",
  "gap-lg": "_gap-lg_1t860_27"
}, fd = w(
  ({
    children: e,
    className: t,
    direction: n = "vertical",
    gap: o = "md",
    ...a
  }, s) => /* @__PURE__ */ r(
    "div",
    {
      ref: s,
      className: _(
        ft.stack,
        ft[n],
        ft[`gap-${o}`],
        t
      ),
      ...a,
      children: e
    }
  )
);
fd.displayName = "AlertStack";
const vd = "_progress_1ndnt_4", yd = "_linear_1ndnt_12", wd = "_track_1ndnt_16", xd = "_bar_1ndnt_23", $d = "_circular_1ndnt_32", kd = "_circularContainer_1ndnt_38", Nd = "_circularSvg_1ndnt_45", Cd = "_circularTrack_1ndnt_49", Ld = "_circularBar_1ndnt_55", Sd = "_circularLabel_1ndnt_62", Td = "_sm_1ndnt_72", Id = "_md_1ndnt_76", Ad = "_lg_1ndnt_80", Ed = "_striped_1ndnt_93", Dd = "_animated_1ndnt_103", Fd = "_progressSlide_1ndnt_1", Md = "_indeterminate_1ndnt_128", Bd = "_indeterminateLinear_1ndnt_1", zd = "_indeterminateCircular_1ndnt_1", qd = "_label_1ndnt_165", Rd = "_withLabel_1ndnt_173", Pd = "_accent_1ndnt_178", Hd = "_success_1ndnt_198", jd = "_successDash_1ndnt_1", Wd = "_warning_1ndnt_225", Gd = "_error_1ndnt_254", Jd = "_errorPulse_1ndnt_1", Vd = "_info_1ndnt_295", Kd = "_infoGradient_1ndnt_1", me = {
  progress: vd,
  linear: yd,
  track: wd,
  bar: xd,
  circular: $d,
  circularContainer: kd,
  circularSvg: Nd,
  circularTrack: Cd,
  circularBar: Ld,
  circularLabel: Sd,
  sm: Td,
  md: Id,
  lg: Ad,
  striped: Ed,
  animated: Dd,
  progressSlide: Fd,
  indeterminate: Md,
  indeterminateLinear: Bd,
  indeterminateCircular: zd,
  label: qd,
  withLabel: Rd,
  accent: Pd,
  success: Hd,
  successDash: jd,
  warning: Wd,
  error: Gd,
  errorPulse: Jd,
  info: Vd,
  infoGradient: Kd
}, Od = w(
  ({
    value: e,
    max: t = 100,
    type: n = "linear",
    variant: o = "default",
    size: a = "md",
    showLabel: s = !1,
    label: c,
    indeterminate: l = !1,
    color: i = "accent",
    className: h,
    ...m
  }, u) => {
    const d = l ? void 0 : Math.min(Math.max((e ?? 0) / t * 100, 0), 100), p = n === "circular", x = c || (d !== void 0 ? `${Math.round(d)}%` : ""), f = p ? a === "sm" ? 40 : a === "lg" ? 80 : 60 : 0, g = p ? f * 4 - 16 : 0, $ = p && d !== void 0 ? g - d / 100 * g : 0, C = {
      ...n === "linear" && d !== void 0 && {
        width: `${d}%`
      },
      ...p && d !== void 0 && {
        strokeDasharray: g,
        strokeDashoffset: $
      }
    }, L = _(
      me.progress,
      me[n],
      me[o],
      me[a],
      me[i],
      {
        [me.indeterminate]: l,
        [me.withLabel]: s
      },
      h
    ), v = "progressbar", y = l ? void 0 : e ?? 0, b = 0, N = t, z = c || (l ? "Loading" : `${Math.round(d ?? 0)} percent complete`);
    if (p) {
      const S = a === "sm" ? 3 : a === "lg" ? 6 : 4, D = S + 2, E = f + D * 2, F = 4;
      return /* @__PURE__ */ r(
        "div",
        {
          ref: u,
          className: L,
          role: v,
          "aria-valuenow": y,
          "aria-valuemin": b,
          "aria-valuemax": N,
          "aria-label": z,
          ...m,
          children: /* @__PURE__ */ k("div", { className: me.circularContainer, children: [
            /* @__PURE__ */ k(
              "svg",
              {
                className: me.circularSvg,
                width: E,
                height: E,
                viewBox: `0 0 ${E} ${E}`,
                children: [
                  /* @__PURE__ */ r(
                    "rect",
                    {
                      className: me.circularTrack,
                      x: D,
                      y: D,
                      width: f,
                      height: f,
                      rx: F,
                      ry: F,
                      fill: "none",
                      strokeWidth: S
                    }
                  ),
                  /* @__PURE__ */ r(
                    "rect",
                    {
                      className: me.circularBar,
                      x: D,
                      y: D,
                      width: f,
                      height: f,
                      rx: F,
                      ry: F,
                      fill: "none",
                      strokeWidth: S,
                      style: C,
                      strokeLinecap: "square",
                      transform: `rotate(-90 ${E / 2} ${E / 2})`
                    }
                  )
                ]
              }
            ),
            s && /* @__PURE__ */ r("div", { className: me.circularLabel, children: x })
          ] })
        }
      );
    }
    return /* @__PURE__ */ k(
      "div",
      {
        ref: u,
        className: L,
        role: v,
        "aria-valuenow": y,
        "aria-valuemin": b,
        "aria-valuemax": N,
        "aria-label": z,
        ...m,
        children: [
          /* @__PURE__ */ r("div", { className: me.track, children: /* @__PURE__ */ r(
            "div",
            {
              className: me.bar,
              style: C,
              "aria-hidden": "true"
            }
          ) }),
          s && /* @__PURE__ */ r("div", { className: me.label, children: x })
        ]
      }
    );
  }
);
Od.displayName = "Progress";
const Yd = "_skeleton_29v3k_4", Xd = "_text_29v3k_13", Ud = "_circular_29v3k_18", Zd = "_rectangular_29v3k_24", Qd = "_rounded_29v3k_34", eu = "_pulse_29v3k_44", tu = "_skeletonPulse_29v3k_1", nu = "_wave_29v3k_48", ru = "_skeletonWave_29v3k_1", ou = "_none_29v3k_59", au = "_textContainer_29v3k_64", Re = {
  skeleton: Yd,
  text: Xd,
  circular: Ud,
  rectangular: Zd,
  default: "_default_29v3k_30",
  rounded: Qd,
  pulse: eu,
  skeletonPulse: tu,
  wave: nu,
  skeletonWave: ru,
  none: ou,
  textContainer: au
}, su = w(
  ({
    shape: e = "text",
    animation: t = "pulse",
    width: n,
    height: o,
    lines: a = 1,
    variant: s = "default",
    className: c,
    style: l,
    ...i
  }, h) => {
    const m = e === "text", u = e === "circular", d = {
      ...l,
      ...n && { width: typeof n == "number" ? `${n}px` : n },
      ...o && { height: typeof o == "number" ? `${o}px` : o }
    };
    u && n && !o && (d.height = d.width);
    const p = _(
      Re.skeleton,
      Re[e],
      Re[t],
      Re[s],
      c
    );
    if (m && a > 1) {
      const x = Array.from({ length: a }, (f, g) => {
        const C = g === a - 1 ? "75%" : "100%";
        return /* @__PURE__ */ r(
          "div",
          {
            className: _(Re.skeleton, Re.text, Re[t], Re[s]),
            style: {
              width: C,
              marginBottom: g < a - 1 ? "var(--brutal-space-2)" : 0
            },
            "aria-hidden": "true"
          },
          g
        );
      });
      return /* @__PURE__ */ r(
        "div",
        {
          ref: h,
          className: Re.textContainer,
          role: "status",
          "aria-label": "Loading content",
          ...i,
          children: x
        }
      );
    }
    return /* @__PURE__ */ r(
      "div",
      {
        ref: h,
        className: p,
        style: d,
        role: "status",
        "aria-label": "Loading content",
        "aria-hidden": "true",
        ...i
      }
    );
  }
);
su.displayName = "Skeleton";
const lu = "_tooltip_efvxc_3", cu = "_content_efvxc_18", iu = "_withArrow_efvxc_25", du = "_arrow_efvxc_25", uu = "_top_efvxc_33", _u = "_bottom_efvxc_47", mu = "_left_efvxc_61", hu = "_right_efvxc_75", pu = "_auto_efvxc_89", gu = "_accent_efvxc_99", bu = "_light_efvxc_111", nt = {
  tooltip: lu,
  content: cu,
  withArrow: iu,
  arrow: du,
  top: uu,
  bottom: _u,
  left: mu,
  right: hu,
  auto: pu,
  accent: gu,
  light: bu
}, Ve = ({
  content: e,
  children: t,
  position: n = "top",
  trigger: o = "hover",
  showDelay: a = 0,
  hideDelay: s = 0,
  visible: c,
  onVisibilityChange: l,
  showArrow: i = !0,
  className: h,
  disabled: m = !1,
  maxWidth: u = 300
}) => {
  const [d, p] = q(!1), [x, f] = q(n), [g, $] = q({ x: 0, y: 0 }), C = K(null), L = K(null), v = K(), y = K(), b = c !== void 0 ? c : d, N = W(() => {
    if (!C.current || !L.current) return;
    const I = C.current.getBoundingClientRect(), A = L.current.getBoundingClientRect(), T = window.innerWidth, P = window.innerHeight, X = window.scrollX, B = window.scrollY;
    let H = n, ee = 0, ne = 0;
    if (n === "auto") {
      const Oe = I.top, bt = P - I.bottom, le = I.left, Me = T - I.right;
      Oe >= A.height + 10 ? H = "top" : bt >= A.height + 10 ? H = "bottom" : Me >= A.width + 10 ? H = "right" : le >= A.width + 10 ? H = "left" : H = "bottom";
    }
    switch (H) {
      case "top":
        ee = I.left + I.width / 2 - A.width / 2, ne = I.top - A.height - 8;
        break;
      case "bottom":
        ee = I.left + I.width / 2 - A.width / 2, ne = I.bottom + 8;
        break;
      case "left":
        ee = I.left - A.width - 8, ne = I.top + I.height / 2 - A.height / 2;
        break;
      case "right":
        ee = I.right + 8, ne = I.top + I.height / 2 - A.height / 2;
        break;
    }
    ee = Math.max(8, Math.min(ee, T - A.width - 8)), ne = Math.max(8, Math.min(ne, P - A.height - 8)), f(H), $({
      x: ee + X,
      y: ne + B
    });
  }, [n]), z = W(() => {
    m || (y.current && (clearTimeout(y.current), y.current = void 0), a > 0 ? v.current = setTimeout(() => {
      c === void 0 && p(!0), l == null || l(!0);
    }, a) : (c === void 0 && p(!0), l == null || l(!0)));
  }, [m, a, c, l]), S = W(() => {
    v.current && (clearTimeout(v.current), v.current = void 0), s > 0 ? y.current = setTimeout(() => {
      c === void 0 && p(!1), l == null || l(!1);
    }, s) : (c === void 0 && p(!1), l == null || l(!1));
  }, [s, c, l]), D = W((I) => {
    I.key === "Escape" && b && S();
  }, [b, S]);
  j(() => {
    if (b && C.current) {
      N();
      const I = () => N(), A = () => N();
      return window.addEventListener("resize", I), window.addEventListener("scroll", A), document.addEventListener("keydown", D), () => {
        window.removeEventListener("resize", I), window.removeEventListener("scroll", A), document.removeEventListener("keydown", D);
      };
    }
  }, [b, N, D]), j(() => () => {
    v.current && clearTimeout(v.current), y.current && clearTimeout(y.current);
  }, []);
  const E = {};
  o === "hover" ? (E.onMouseEnter = z, E.onMouseLeave = S) : o === "click" ? E.onClick = (I) => {
    I.preventDefault(), b ? S() : z();
  } : o === "focus" && (E.onFocus = z, E.onBlur = S);
  const F = R.cloneElement(t, {
    ...E,
    ref: (I) => {
      C && (C.current = I);
      const A = t.ref;
      typeof A == "function" ? A(I) : A && typeof A == "object" && (A.current = I);
    },
    "aria-describedby": b ? "tooltip" : void 0
  }), M = b ? je(
    /* @__PURE__ */ k(
      "div",
      {
        ref: L,
        className: _(
          nt.tooltip,
          nt[x],
          {
            [nt.withArrow]: i
          },
          h
        ),
        style: {
          position: "absolute",
          left: g.x,
          top: g.y,
          maxWidth: u,
          zIndex: "var(--brutal-z-tooltip)"
        },
        role: "tooltip",
        id: "tooltip",
        onMouseEnter: o === "hover" ? z : void 0,
        onMouseLeave: o === "hover" ? S : void 0,
        children: [
          i && /* @__PURE__ */ r("div", { className: nt.arrow }),
          /* @__PURE__ */ r("div", { className: nt.content, children: e })
        ]
      }
    ),
    document.body
  ) : null;
  return /* @__PURE__ */ k(be, { children: [
    F,
    M
  ] });
};
Ve.displayName = "Tooltip";
const fu = "_popover_16vmr_3", vu = "_content_16vmr_15", yu = "_contentWrapper_16vmr_20", wu = "_withArrow_16vmr_27", xu = "_arrow_16vmr_27", $u = "_top_16vmr_36", ku = "_bottom_16vmr_56", Nu = "_left_16vmr_76", Cu = "_right_16vmr_96", Lu = "_header_16vmr_116", Su = "_body_16vmr_126", Tu = "_footer_16vmr_134", Iu = "_popoverFadeIn_16vmr_1", Au = "_sm_16vmr_179", Eu = "_lg_16vmr_184", Du = "_xl_16vmr_189", Fu = "_accent_16vmr_195", Mu = "_dark_16vmr_206", He = {
  popover: fu,
  content: vu,
  contentWrapper: yu,
  withArrow: wu,
  arrow: xu,
  top: $u,
  bottom: ku,
  left: Nu,
  right: Cu,
  header: Lu,
  body: Su,
  footer: Tu,
  popoverFadeIn: Iu,
  sm: Au,
  lg: Eu,
  xl: Du,
  accent: Fu,
  dark: Mu
}, un = ue(null), at = ({
  children: e,
  content: t,
  position: n = "bottom",
  trigger: o = "click",
  open: a,
  onOpenChange: s,
  closeOnClickOutside: c = !0,
  closeOnEscape: l = !0,
  showArrow: i = !0,
  className: h,
  disabled: m = !1,
  maxWidth: u = 400,
  autoFocus: d = !0,
  initialFocus: p
}) => {
  const [x, f] = q(!1), [g, $] = q(n), [C, L] = q({ x: 0, y: 0 }), v = K(null), y = K(null), b = K(null), N = a !== void 0 ? a : x, z = W(() => {
    if (!v.current || !y.current) return;
    const B = v.current.getBoundingClientRect(), H = y.current.getBoundingClientRect(), ee = window.innerWidth, ne = window.innerHeight, Oe = window.scrollX, bt = window.scrollY;
    let le = n, Me = 0, We = 0;
    if (n === "auto") {
      const wo = B.top, xo = ne - B.bottom, $o = B.left, ko = ee - B.right;
      xo >= H.height + 10 ? le = "bottom" : wo >= H.height + 10 ? le = "top" : ko >= H.width + 10 ? le = "right" : $o >= H.width + 10 ? le = "left" : le = "bottom";
    }
    switch (le.split("-")[0]) {
      case "top":
        We = B.top - H.height - 8;
        break;
      case "bottom":
        We = B.bottom + 8;
        break;
      case "left":
        Me = B.left - H.width - 8;
        break;
      case "right":
        Me = B.right + 8;
        break;
    }
    le.includes("top") || le.includes("bottom") ? le.includes("start") ? Me = B.left : le.includes("end") ? Me = B.right - H.width : Me = B.left + B.width / 2 - H.width / 2 : (le.includes("left") || le.includes("right")) && (le.includes("start") ? We = B.top : le.includes("end") ? We = B.bottom - H.height : We = B.top + B.height / 2 - H.height / 2), Me = Math.max(8, Math.min(Me, ee - H.width - 8)), We = Math.max(8, Math.min(We, ne - H.height - 8)), $(le), L({
      x: Me + Oe,
      y: We + bt
    });
  }, [n]), S = W(() => {
    m || (b.current = document.activeElement, a === void 0 && f(!0), s == null || s(!0));
  }, [m, a, s]), D = W(() => {
    a === void 0 && f(!1), s == null || s(!1), b.current && b.current.focus({ preventScroll: !0 });
  }, [a, s]), E = W((B) => {
    if (!c || !N) return;
    const H = B.target;
    y.current && v.current && !y.current.contains(H) && !v.current.contains(H) && D();
  }, [c, N, D]), F = W((B) => {
    B.key === "Escape" && l && N && D();
  }, [l, N, D]), M = W(() => {
    if (!d || !N || !y.current) return;
    const B = y.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (p) {
      const H = y.current.querySelector(p);
      if (H) {
        H.focus({ preventScroll: !0 });
        return;
      }
    }
    B.length > 0 ? B[0].focus({ preventScroll: !0 }) : y.current.focus({ preventScroll: !0 });
  }, [d, N, p]), I = W((B) => {
    if (!N || !y.current || B.key !== "Tab") return;
    const H = y.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (H.length === 0) return;
    const ee = H[0], ne = H[H.length - 1];
    B.shiftKey ? document.activeElement === ee && (ne.focus({ preventScroll: !0 }), B.preventDefault()) : document.activeElement === ne && (ee.focus({ preventScroll: !0 }), B.preventDefault());
  }, [N]);
  j(() => {
    if (N) {
      z(), M();
      const B = () => z(), H = () => z();
      return window.addEventListener("resize", B), window.addEventListener("scroll", H), document.addEventListener("mousedown", E), document.addEventListener("keydown", F), document.addEventListener("keydown", I), () => {
        window.removeEventListener("resize", B), window.removeEventListener("scroll", H), document.removeEventListener("mousedown", E), document.removeEventListener("keydown", F), document.removeEventListener("keydown", I);
      };
    }
  }, [N, z, M, E, F, I]);
  const A = {};
  o === "click" ? A.onClick = (B) => {
    B.preventDefault(), B.stopPropagation(), N ? D() : S();
  } : o === "focus" && (A.onFocus = S, A.onBlur = (B) => {
    setTimeout(() => {
      y.current && y.current.contains(document.activeElement) || D();
    }, 0);
  });
  const T = R.cloneElement(e, {
    ...A,
    ref: (B) => {
      B && (v.current = B);
    },
    "aria-expanded": N,
    "aria-haspopup": "dialog"
  }), P = {
    close: D
  }, X = N ? je(
    /* @__PURE__ */ r(un.Provider, { value: P, children: /* @__PURE__ */ k(
      "div",
      {
        ref: y,
        className: _(
          He.popover,
          He[g.split("-")[0]],
          {
            [He.withArrow]: i
          },
          h
        ),
        style: {
          position: "absolute",
          left: C.x,
          top: C.y,
          maxWidth: u,
          zIndex: "var(--brutal-z-popover)"
        },
        role: "dialog",
        "aria-modal": "true",
        tabIndex: -1,
        children: [
          i && /* @__PURE__ */ r("div", { className: He.arrow }),
          /* @__PURE__ */ r("div", { className: He.content, children: t || e.props.children })
        ]
      }
    ) }),
    document.body
  ) : null;
  return /* @__PURE__ */ k(be, { children: [
    T,
    X
  ] });
}, _n = ({
  children: e,
  className: t
}) => /* @__PURE__ */ r("div", { className: _(He.contentWrapper, t), children: e }), mn = ({
  children: e,
  className: t
}) => /* @__PURE__ */ r("div", { className: _(He.header, t), children: e }), hn = ({
  children: e,
  className: t
}) => /* @__PURE__ */ r("div", { className: _(He.body, t), children: e }), pn = ({
  children: e,
  className: t
}) => /* @__PURE__ */ r("div", { className: _(He.footer, t), children: e }), l0 = () => {
  const e = Y(un);
  if (!e)
    throw new Error("usePopover must be used within a Popover component");
  return e;
};
at.Content = _n;
at.Header = mn;
at.Body = hn;
at.Footer = pn;
at.displayName = "Popover";
_n.displayName = "PopoverContent";
mn.displayName = "PopoverHeader";
hn.displayName = "PopoverBody";
pn.displayName = "PopoverFooter";
const Bu = "_separator_171ro_3", zu = "_horizontal_171ro_12", qu = "_vertical_171ro_18", Ru = "_withLabel_171ro_26", Pu = "_thin_171ro_37", Hu = "_medium_171ro_45", ju = "_thick_171ro_53", Wu = "_solid_171ro_62", Gu = "_dashed_171ro_67", Ju = "_dotted_171ro_72", Vu = "_double_171ro_77", Ku = "_line_171ro_90", Ou = "_label_171ro_136", Pe = {
  separator: Bu,
  horizontal: zu,
  vertical: qu,
  withLabel: Ru,
  thin: Pu,
  medium: Hu,
  thick: ju,
  solid: Wu,
  dashed: Gu,
  dotted: Ju,
  double: Vu,
  line: Ku,
  label: Ou,
  "label-start": "_label-start_171ro_147",
  "label-center": "_label-center_171ro_155",
  "label-end": "_label-end_171ro_159"
}, Yu = ({
  orientation: e = "horizontal",
  thickness: t = "medium",
  variant: n = "solid",
  className: o,
  style: a,
  label: s,
  labelPosition: c = "center",
  ariaLabel: l = "Separator"
}) => {
  const i = e === "horizontal";
  return /* @__PURE__ */ r(
    "div",
    {
      className: _(
        Pe.separator,
        Pe[e],
        Pe[t],
        Pe[n],
        {
          [Pe.withLabel]: s && i,
          [Pe[`label-${c}`]]: s && i
        },
        o
      ),
      style: a,
      role: "separator",
      "aria-orientation": e,
      "aria-label": l,
      children: s && i && /* @__PURE__ */ k(be, { children: [
        /* @__PURE__ */ r("div", { className: Pe.line }),
        /* @__PURE__ */ r("div", { className: Pe.label, children: typeof s == "string" ? /* @__PURE__ */ r("span", { children: s }) : s }),
        /* @__PURE__ */ r("div", { className: Pe.line })
      ] })
    }
  );
};
Yu.displayName = "Separator";
const gn = {
  id: "classic",
  name: "Classic Brutalist",
  description: "The original black, white, and red brutalist aesthetic",
  colors: {
    black: "#000000",
    white: "#FFFFFF",
    accent: "#FF0000",
    accentDark: "#CC0000",
    gray50: "#FAFAFA",
    gray100: "#F5F5F5",
    gray200: "#E5E5E5",
    gray300: "#D4D4D4",
    gray400: "#A3A3A3",
    gray500: "#737373",
    gray700: "#404040",
    gray900: "#171717",
    warning: "#FFC107",
    success: "#22C55E",
    error: "#FF0000",
    info: "#0000FF"
  }
}, Xu = {
  id: "neon",
  name: "Neon Cyber",
  description: "Electric cyberpunk brutalism with neon highlights",
  colors: {
    black: "#0A0A0A",
    white: "#F0F0F0",
    accent: "#00FF88",
    accentDark: "#00CC6A",
    gray50: "#F8F8F8",
    gray100: "#E8E8E8",
    gray200: "#D8D8D8",
    gray300: "#C8C8C8",
    gray400: "#888888",
    gray500: "#555555",
    gray700: "#333333",
    gray900: "#111111",
    warning: "#FFAA00",
    success: "#00FF88",
    error: "#FF0044",
    info: "#00AAFF"
  }
}, Uu = {
  id: "pastel",
  name: "Soft Brutalism",
  description: "Gentle pastel colors with brutalist structure",
  colors: {
    black: "#2D2D2D",
    white: "#FFFBF7",
    accent: "#FF6B9D",
    accentDark: "#E85A8A",
    gray50: "#FDF9F5",
    gray100: "#F7F0E8",
    gray200: "#F0E6DB",
    gray300: "#E8DCCE",
    gray400: "#C4B5A0",
    gray500: "#9A8B7A",
    gray700: "#5D4E42",
    gray900: "#2D2D2D",
    warning: "#FFB347",
    success: "#77DD77",
    error: "#FF6B9D",
    info: "#87CEEB"
  }
}, Zu = {
  id: "dark",
  name: "Dark Brutalism",
  description: "Dark mode brutalism with bright accents",
  colors: {
    black: "#FFFFFF",
    white: "#0F0F0F",
    accent: "#FF4444",
    accentDark: "#DD2222",
    gray50: "#1A1A1A",
    gray100: "#242424",
    gray200: "#2E2E2E",
    gray300: "#383838",
    gray400: "#666666",
    gray500: "#999999",
    gray700: "#CCCCCC",
    gray900: "#F0F0F0",
    warning: "#FFB000",
    success: "#00DD55",
    error: "#FF4444",
    info: "#4488FF"
  }
}, Qu = {
  id: "retro",
  name: "Retro Future",
  description: "80s-inspired brutalism with vintage computing vibes",
  colors: {
    black: "#1A0D1A",
    white: "#F5F5DC",
    accent: "#FF00FF",
    accentDark: "#CC00CC",
    gray50: "#F0F0E6",
    gray100: "#E6E6DC",
    gray200: "#DCDCD2",
    gray300: "#C8C8BE",
    gray400: "#A0A096",
    gray500: "#78786E",
    gray700: "#464640",
    gray900: "#2D2D27",
    warning: "#FFAA00",
    success: "#00FF00",
    error: "#FF00FF",
    info: "#00FFFF"
  }
}, e_ = {
  id: "nature",
  name: "Earth Brutalism",
  description: "Natural earth tones with brutalist structure",
  colors: {
    black: "#2F2F23",
    white: "#F7F5F0",
    accent: "#8B4513",
    accentDark: "#6B3410",
    gray50: "#F5F3EE",
    gray100: "#EBE7DD",
    gray200: "#E1DBCC",
    gray300: "#D7CFBB",
    gray400: "#B8A990",
    gray500: "#998365",
    gray700: "#5C5140",
    gray900: "#3A3328",
    warning: "#DAA520",
    success: "#228B22",
    error: "#A0522D",
    info: "#4682B4"
  }
}, t_ = {
  id: "ocean",
  name: "Ocean Brutalism",
  description: "Deep blue ocean-inspired color palette",
  colors: {
    black: "#0F1419",
    white: "#F0F8FF",
    accent: "#1E90FF",
    accentDark: "#1874CD",
    gray50: "#F8FBFF",
    gray100: "#E6F2FF",
    gray200: "#D4E9FF",
    gray300: "#C2E0FF",
    gray400: "#85C1F5",
    gray500: "#4A90E2",
    gray700: "#2E5984",
    gray900: "#1A3A5C",
    warning: "#FF8C00",
    success: "#00CED1",
    error: "#DC143C",
    info: "#1E90FF"
  }
}, n_ = {
  id: "monochrome",
  name: "Pure Monochrome",
  description: "Strict black and white with minimal color",
  colors: {
    black: "#000000",
    white: "#FFFFFF",
    accent: "#000000",
    accentDark: "#333333",
    gray50: "#FAFAFA",
    gray100: "#F0F0F0",
    gray200: "#E0E0E0",
    gray300: "#D0D0D0",
    gray400: "#A0A0A0",
    gray500: "#707070",
    gray700: "#404040",
    gray900: "#101010",
    warning: "#666666",
    success: "#444444",
    error: "#000000",
    info: "#888888"
  }
}, it = [
  gn,
  Xu,
  Uu,
  Zu,
  Qu,
  e_,
  t_,
  n_
], wt = gn, r_ = (e) => it.find((t) => t.id === e), dt = {
  black: "--brutal-black",
  white: "--brutal-white",
  accent: "--brutal-accent",
  accentDark: "--brutal-accent-dark",
  gray50: "--brutal-gray-50",
  gray100: "--brutal-gray-100",
  gray200: "--brutal-gray-200",
  gray300: "--brutal-gray-300",
  gray400: "--brutal-gray-400",
  gray500: "--brutal-gray-500",
  gray700: "--brutal-gray-700",
  gray900: "--brutal-gray-900",
  warning: "--brutal-warning",
  success: "--brutal-success",
  error: "--brutal-error",
  info: "--brutal-info"
}, bn = (e) => {
  const t = document.documentElement;
  Object.entries(e.colors).forEach(([n, o]) => {
    const a = dt[n];
    a && t.style.setProperty(a, o);
  });
}, o_ = () => {
  const e = `random-${Date.now()}`, t = {
    black: ie("black"),
    white: ie("white"),
    accent: ie("accent"),
    accentDark: ie("accentDark"),
    gray50: ie("gray50"),
    gray100: ie("gray100"),
    gray200: ie("gray200"),
    gray300: ie("gray300"),
    gray400: ie("gray400"),
    gray500: ie("gray500"),
    gray700: ie("gray700"),
    gray900: ie("gray900"),
    warning: ie("warning"),
    success: ie("success"),
    error: ie("error"),
    info: ie("info")
  };
  return {
    id: e,
    name: "Random Theme",
    description: "Randomly generated color combination",
    colors: t
  };
}, ie = (e) => it[Math.floor(Math.random() * it.length)].colors[e], a_ = (e) => `:root {
${Object.entries(e.colors).map(([n, o]) => `  ${dt[n]}: ${o};`).join(`
`)}
}`, c0 = (e) => `const theme = ${JSON.stringify(e.colors, null, 2)}`, s_ = (e) => `/* ${e.name} Theme */
${a_(e)}`, l_ = (e) => `import { ThemeProvider } from '@brutalist-ui/components'

const ${e.id}Theme = ${JSON.stringify(e, null, 2)}

function App() {
  return (
    <ThemeProvider theme={${e.id}Theme}>
      {/* Your components */}
    </ThemeProvider>
  )
}`, c_ = (e) => `import { BrutalistTheme } from '@brutalist-ui/components'

export const ${e.id}Theme: BrutalistTheme = ${JSON.stringify(e, null, 2)}

export default ${e.id}Theme`, i_ = (e, t) => {
  const n = t ? `import ${t} from './components/${t}'` : "import YourComponent from './components/YourComponent'", o = t ? `<${t} />` : "<YourComponent />";
  return `import React from 'react'
import { ThemeProvider } from '@brutalist-ui/components'
import { ${e.id}Theme } from './theme'
${n}

function App() {
  return (
    <ThemeProvider theme={${e.id}Theme}>
      <div className="app">
        ${o}
      </div>
    </ThemeProvider>
  )
}

export default App`;
}, i0 = (e, t, n) => ({
  "theme.ts": c_(e),
  "App.tsx": i_(e, n),
  "component.tsx": t || "// Your component code goes here"
}), d_ = (e) => {
  try {
    localStorage.setItem("brutalist-theme", JSON.stringify(e));
  } catch (t) {
    console.warn("Failed to save theme to localStorage:", t);
  }
}, u_ = () => {
  try {
    const e = localStorage.getItem("brutalist-theme");
    if (e)
      return JSON.parse(e);
  } catch (e) {
    console.warn("Failed to load theme from localStorage:", e);
  }
  return null;
}, vt = (e) => {
  if (!e || typeof e != "object") return !1;
  const t = e;
  return !["id", "name", "description", "colors"].every((c) => c in t) || !t.colors || typeof t.colors != "object" ? !1 : Object.keys(dt).every((c) => c in t.colors);
}, d0 = () => {
  const e = document.documentElement, t = getComputedStyle(e), n = {};
  return Object.entries(dt).forEach(([o, a]) => {
    const s = t.getPropertyValue(a).trim();
    s && (n[o] = s);
  }), n;
}, __ = () => {
  bn(wt), localStorage.removeItem("brutalist-theme");
}, fn = ue(void 0), u0 = ({
  children: e,
  initialTheme: t,
  enablePersistence: n = !0
}) => {
  const [o, a] = q(() => {
    if (t && vt(t))
      return t;
    if (n) {
      const h = u_();
      if (h && vt(h))
        return h;
    }
    return wt;
  });
  j(() => {
    bn(o), n && d_(o);
  }, [o, n]);
  const i = {
    currentTheme: o,
    setTheme: (h) => {
      vt(h) ? a(h) : console.warn("Invalid theme provided to setTheme:", h);
    },
    availableThemes: it,
    randomizeTheme: () => {
      const h = o_();
      a(h);
    },
    resetToDefault: () => {
      a(wt), n && __();
    }
  };
  return /* @__PURE__ */ r(fn.Provider, { value: i, children: e });
}, ut = () => {
  const e = Y(fn);
  if (e === void 0)
    throw new Error("useTheme must be used within a ThemeProvider");
  return e;
}, _0 = () => {
  const { currentTheme: e } = ut();
  return e.colors;
}, m0 = (e) => {
  const { currentTheme: t } = ut();
  return t.id === e;
}, h0 = () => {
  const { setTheme: e } = ut();
  return (t) => {
    const n = r_(t);
    n ? e(n) : console.warn(`Theme with ID "${t}" not found`);
  };
}, m_ = "_container_1r3v6_3", h_ = "_withShadow_1r3v6_13", p_ = "_header_1r3v6_17", g_ = "_title_1r3v6_24", b_ = "_actions_1r3v6_33", f_ = "_actionButton_1r3v6_38", v_ = "_themeGrid_1r3v6_62", y_ = "_themeCard_1r3v6_68", w_ = "_active_1r3v6_86", x_ = "_themeInfo_1r3v6_92", $_ = "_colorPreview_1r3v6_97", k_ = "_colorSwatch_1r3v6_103", N_ = "_themeName_1r3v6_114", C_ = "_themeDescription_1r3v6_122", L_ = "_currentTheme_1r3v6_134", S_ = "_currentThemeTitle_1r3v6_140", T_ = "_currentThemeInfo_1r3v6_148", I_ = "_currentThemeName_1r3v6_155", A_ = "_copyButton_1r3v6_162", E_ = "_colorPalette_1r3v6_186", D_ = "_paletteColor_1r3v6_192", F_ = "_codeSection_1r3v6_227", M_ = "_codeToggle_1r3v6_233", B_ = "_codeBlock_1r3v6_250", z_ = "_codeCopyButton_1r3v6_267", q_ = "_compact_1r3v6_289", J = {
  container: m_,
  withShadow: h_,
  header: p_,
  title: g_,
  actions: b_,
  actionButton: f_,
  themeGrid: v_,
  themeCard: y_,
  active: w_,
  themeInfo: x_,
  colorPreview: $_,
  colorSwatch: k_,
  themeName: N_,
  themeDescription: C_,
  currentTheme: L_,
  currentThemeTitle: S_,
  currentThemeInfo: T_,
  currentThemeName: I_,
  copyButton: A_,
  colorPalette: E_,
  paletteColor: D_,
  codeSection: F_,
  codeToggle: M_,
  codeBlock: B_,
  codeCopyButton: z_,
  compact: q_
}, p0 = ({
  variant: e = "default",
  brutalistShadow: t = !0,
  showCode: n = !0,
  className: o,
  onThemeChange: a
}) => {
  const { currentTheme: s, setTheme: c, availableThemes: l, randomizeTheme: i, resetToDefault: h } = ut(), [m, u] = q(!1), [d, p] = q("css"), [x, f] = q(""), g = (b) => {
    c(b), a == null || a(b);
  }, $ = () => {
    i(), a == null || a(s);
  }, C = () => {
    h(), a == null || a(s);
  }, L = async (b, N) => {
    try {
      await navigator.clipboard.writeText(b), f(`${N} copied!`), setTimeout(() => f(""), 2e3);
    } catch (z) {
      console.error("Failed to copy to clipboard:", z), f("Copy failed"), setTimeout(() => f(""), 2e3);
    }
  }, v = () => d === "css" ? s_(s) : l_(s), y = (b) => [
    b.colors.black,
    b.colors.white,
    b.colors.accent,
    b.colors.gray500
  ];
  return /* @__PURE__ */ k(
    "div",
    {
      className: _(
        J.container,
        {
          [J.compact]: e === "compact",
          [J.withShadow]: t
        },
        o
      ),
      children: [
        /* @__PURE__ */ k("div", { className: J.header, children: [
          /* @__PURE__ */ r("h3", { className: J.title, children: "Theme Picker" }),
          /* @__PURE__ */ k("div", { className: J.actions, children: [
            /* @__PURE__ */ r(
              "button",
              {
                className: J.actionButton,
                onClick: $,
                title: "Generate random theme",
                children: "🎲 Random"
              }
            ),
            /* @__PURE__ */ r(
              "button",
              {
                className: J.actionButton,
                onClick: C,
                title: "Reset to default theme",
                children: "🔄 Reset"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ k("div", { className: J.currentTheme, children: [
          /* @__PURE__ */ r("h4", { className: J.currentThemeTitle, children: "Current Theme" }),
          /* @__PURE__ */ k("div", { className: J.currentThemeInfo, children: [
            /* @__PURE__ */ r("span", { className: J.currentThemeName, children: s.name }),
            /* @__PURE__ */ r(
              "button",
              {
                className: J.copyButton,
                onClick: () => L(JSON.stringify(s, null, 2), "Theme"),
                children: x || "Copy Theme"
              }
            )
          ] }),
          /* @__PURE__ */ r("div", { className: J.colorPalette, children: Object.entries(s.colors).map(([b, N]) => /* @__PURE__ */ r(
            "div",
            {
              className: J.paletteColor,
              style: { backgroundColor: N },
              title: `${b}: ${N}`,
              onClick: () => L(N, b)
            },
            b
          )) })
        ] }),
        /* @__PURE__ */ r("div", { className: J.themeGrid, children: l.map((b) => /* @__PURE__ */ k(
          "div",
          {
            className: _(J.themeCard, {
              [J.active]: s.id === b.id
            }),
            onClick: () => g(b),
            children: [
              /* @__PURE__ */ r("div", { className: J.colorPreview, children: y(b).map((N, z) => /* @__PURE__ */ r(
                "div",
                {
                  className: J.colorSwatch,
                  style: { backgroundColor: N }
                },
                z
              )) }),
              /* @__PURE__ */ k("div", { className: J.themeInfo, children: [
                /* @__PURE__ */ r("h4", { className: J.themeName, children: b.name }),
                e !== "compact" && /* @__PURE__ */ r("p", { className: J.themeDescription, children: b.description })
              ] })
            ]
          },
          b.id
        )) }),
        n && /* @__PURE__ */ k("div", { className: J.codeSection, children: [
          /* @__PURE__ */ r(
            "button",
            {
              className: J.codeToggle,
              onClick: () => u(!m),
              children: m ? "🔻 Hide Code" : "🔺 Show Code"
            }
          ),
          m && /* @__PURE__ */ k(be, { children: [
            /* @__PURE__ */ k("div", { className: J.actions, style: { marginBottom: "var(--brutal-space-3)" }, children: [
              /* @__PURE__ */ r(
                "button",
                {
                  className: _(J.actionButton, {
                    [J.active]: d === "css"
                  }),
                  onClick: () => p("css"),
                  children: "CSS"
                }
              ),
              /* @__PURE__ */ r(
                "button",
                {
                  className: _(J.actionButton, {
                    [J.active]: d === "react"
                  }),
                  onClick: () => p("react"),
                  children: "React"
                }
              )
            ] }),
            /* @__PURE__ */ k("div", { className: J.codeBlock, children: [
              /* @__PURE__ */ r(
                "button",
                {
                  className: J.codeCopyButton,
                  onClick: () => L(v(), d.toUpperCase()),
                  children: x || "Copy"
                }
              ),
              /* @__PURE__ */ r("pre", { children: v() })
            ] })
          ] })
        ] })
      ]
    }
  );
}, R_ = "_tableWrapper_1umu7_1", P_ = "_fullWidth_1umu7_8", H_ = "_table_1umu7_1", j_ = "_striped_1umu7_24", W_ = "_tbody_1umu7_24", G_ = "_tr_1umu7_24", J_ = "_bordered_1umu7_28", V_ = "_th_1umu7_28", K_ = "_td_1umu7_29", O_ = "_sm_1umu7_34", Y_ = "_md_1umu7_40", X_ = "_lg_1umu7_46", U_ = "_hoverable_1umu7_53", Z_ = "_thead_1umu7_59", Q_ = "_sticky_1umu7_64", em = "_thContent_1umu7_94", tm = "_sortable_1umu7_100", nm = "_sortIcon_1umu7_114", rm = "_sorted_1umu7_120", om = "_numeric_1umu7_130", Q = {
  tableWrapper: R_,
  fullWidth: P_,
  table: H_,
  striped: j_,
  tbody: W_,
  tr: G_,
  bordered: J_,
  th: V_,
  td: K_,
  sm: O_,
  md: Y_,
  lg: X_,
  hoverable: U_,
  thead: Z_,
  sticky: Q_,
  thContent: em,
  sortable: tm,
  sortIcon: nm,
  sorted: rm,
  numeric: om,
  "align-left": "_align-left_1umu7_136",
  "align-center": "_align-center_1umu7_140",
  "align-right": "_align-right_1umu7_144"
}, vn = w(
  ({
    variant: e = "default",
    size: t = "md",
    hoverable: n = !1,
    fullWidth: o = !0,
    className: a,
    children: s,
    ...c
  }, l) => /* @__PURE__ */ r("div", { className: _(Q.tableWrapper, { [Q.fullWidth]: o }), children: /* @__PURE__ */ r(
    "table",
    {
      ref: l,
      className: _(
        Q.table,
        Q[e],
        Q[t],
        {
          [Q.hoverable]: n,
          [Q.fullWidth]: o
        },
        a
      ),
      ...c,
      children: s
    }
  ) })
), yn = w(
  ({ sticky: e = !1, className: t, children: n, ...o }, a) => /* @__PURE__ */ r(
    "thead",
    {
      ref: a,
      className: _(
        Q.thead,
        {
          [Q.sticky]: e
        },
        t
      ),
      ...o,
      children: n
    }
  )
), wn = w(
  ({ className: e, children: t, ...n }, o) => /* @__PURE__ */ r("tbody", { ref: o, className: _(Q.tbody, e), ...n, children: t })
), xn = w(
  ({ className: e, children: t, ...n }, o) => /* @__PURE__ */ r("tr", { ref: o, className: _(Q.tr, e), ...n, children: t })
), $n = w(
  ({
    align: e = "left",
    sortable: t = !1,
    sortDirection: n = "none",
    onSort: o,
    className: a,
    children: s,
    ...c
  }, l) => {
    const i = () => {
      t && o && o();
    };
    return /* @__PURE__ */ r(
      "th",
      {
        ref: l,
        className: _(
          Q.th,
          Q[`align-${e}`],
          {
            [Q.sortable]: t,
            [Q.sorted]: n !== "none"
          },
          a
        ),
        onClick: i,
        role: t ? "button" : void 0,
        tabIndex: t ? 0 : void 0,
        "aria-sort": n === "asc" ? "ascending" : n === "desc" ? "descending" : "none",
        ...c,
        children: /* @__PURE__ */ k("div", { className: Q.thContent, children: [
          s,
          t && /* @__PURE__ */ k("span", { className: _(Q.sortIcon, Q[`sort-${n}`]), children: [
            n === "asc" && "↑",
            n === "desc" && "↓",
            n === "none" && "↕"
          ] })
        ] })
      }
    );
  }
), kn = w(
  ({ align: e = "left", numeric: t = !1, className: n, children: o, ...a }, s) => /* @__PURE__ */ r(
    "td",
    {
      ref: s,
      className: _(
        Q.td,
        Q[`align-${e}`],
        {
          [Q.numeric]: t
        },
        n
      ),
      ...a,
      children: o
    }
  )
);
vn.displayName = "Table";
yn.displayName = "TableHead";
wn.displayName = "TableBody";
xn.displayName = "TableRow";
$n.displayName = "TableHeader";
kn.displayName = "TableCell";
const g0 = Object.assign(vn, {
  Head: yn,
  Body: wn,
  Row: xn,
  Header: $n,
  Cell: kn
}), am = "_spinner_10unr_1", sm = "_srOnly_10unr_9", lm = "_sm_10unr_22", cm = "_md_10unr_29", im = "_lg_10unr_36", dm = "_xl_10unr_43", um = "_accent_10unr_55", _m = "_success_10unr_59", mm = "_warning_10unr_63", hm = "_error_10unr_67", pm = "_info_10unr_71", gm = "_dots_10unr_89", bm = "_dot_10unr_89", fm = "_dotPulse_10unr_1", vm = "_bars_10unr_117", ym = "_bar_10unr_117", wm = "_barStretch_10unr_1", xm = "_square_10unr_151", $m = "_squareRotate_10unr_1", km = "_glitch_10unr_169", Nm = "_glitchSquare_10unr_175", Cm = "_glitch1_10unr_1", Lm = "_glitch2_10unr_1", Sm = "_glitch3_10unr_1", ce = {
  spinner: am,
  srOnly: sm,
  sm: lm,
  md: cm,
  lg: im,
  xl: dm,
  default: "_default_10unr_51",
  accent: um,
  success: _m,
  warning: mm,
  error: hm,
  info: pm,
  "speed-slow": "_speed-slow_10unr_76",
  "speed-normal": "_speed-normal_10unr_80",
  "speed-fast": "_speed-fast_10unr_84",
  dots: gm,
  dot: bm,
  dotPulse: fm,
  bars: vm,
  bar: ym,
  barStretch: wm,
  square: xm,
  squareRotate: $m,
  glitch: km,
  glitchSquare: Nm,
  glitch1: Cm,
  glitch2: Lm,
  glitch3: Sm
}, Tm = w(
  ({
    size: e = "md",
    color: t = "default",
    variant: n = "dots",
    speed: o = "normal",
    label: a = "Loading",
    className: s,
    ...c
  }, l) => {
    const i = () => {
      switch (n) {
        case "dots":
          return /* @__PURE__ */ k(be, { children: [
            /* @__PURE__ */ r("span", { className: ce.dot }),
            /* @__PURE__ */ r("span", { className: ce.dot }),
            /* @__PURE__ */ r("span", { className: ce.dot })
          ] });
        case "bars":
          return /* @__PURE__ */ k(be, { children: [
            /* @__PURE__ */ r("span", { className: ce.bar }),
            /* @__PURE__ */ r("span", { className: ce.bar }),
            /* @__PURE__ */ r("span", { className: ce.bar }),
            /* @__PURE__ */ r("span", { className: ce.bar })
          ] });
        case "square":
          return /* @__PURE__ */ r("span", { className: ce.square });
        case "glitch":
          return /* @__PURE__ */ k(be, { children: [
            /* @__PURE__ */ r("span", { className: ce.glitchSquare }),
            /* @__PURE__ */ r("span", { className: ce.glitchSquare }),
            /* @__PURE__ */ r("span", { className: ce.glitchSquare })
          ] });
        default:
          return null;
      }
    };
    return /* @__PURE__ */ k(
      "div",
      {
        ref: l,
        className: _(
          ce.spinner,
          ce[e],
          ce[t],
          ce[n],
          ce[`speed-${o}`],
          s
        ),
        role: "status",
        "aria-label": a,
        ...c,
        children: [
          i(),
          /* @__PURE__ */ r("span", { className: ce.srOnly, children: a })
        ]
      }
    );
  }
);
Tm.displayName = "Spinner";
const Im = "_container_1fzej_1", Am = "_toast_1fzej_45", Em = "_toastEnter_1fzej_1", Dm = "_exiting_1fzej_60", Fm = "_toastExit_1fzej_1", Mm = "_info_1fzej_65", Bm = "_icon_1fzej_69", zm = "_success_1fzej_73", qm = "_warning_1fzej_81", Rm = "_error_1fzej_89", Pm = "_content_1fzej_113", Hm = "_title_1fzej_118", jm = "_message_1fzej_125", Wm = "_action_1fzej_132", Gm = "_dismiss_1fzej_157", Jm = "_toastEnterTop_1fzej_1", Ee = {
  container: Im,
  "top-left": "_top-left_1fzej_12",
  "top-center": "_top-center_1fzej_17",
  "top-right": "_top-right_1fzej_23",
  "bottom-left": "_bottom-left_1fzej_28",
  "bottom-center": "_bottom-center_1fzej_33",
  "bottom-right": "_bottom-right_1fzej_39",
  toast: Am,
  toastEnter: Em,
  exiting: Dm,
  toastExit: Fm,
  info: Mm,
  icon: Bm,
  success: zm,
  warning: qm,
  error: Rm,
  content: Pm,
  title: Hm,
  message: jm,
  action: Wm,
  dismiss: Gm,
  toastEnterTop: Jm
}, _t = ue(null), b0 = ({
  children: e,
  position: t = "bottom-right",
  maxToasts: n = 5
}) => {
  const [o, a] = q([]), s = W((h) => {
    const m = `toast-${Date.now()}-${Math.random()}`, u = { ...h, id: m };
    return a((d) => [...d, u].slice(-n)), m;
  }, [n]), c = W((h) => {
    a((m) => m.filter((u) => u.id !== h));
  }, []), l = W(() => {
    a([]);
  }, []), i = { toasts: o, showToast: s, hideToast: c, hideAllToasts: l };
  return j(() => (Om(i), () => {
    Be = null;
  }), [i]), /* @__PURE__ */ k(_t.Provider, { value: i, children: [
    e,
    /* @__PURE__ */ r(Vm, { position: t })
  ] });
}, Vm = ({ position: e }) => {
  const t = Y(_t);
  if (!t) return null;
  const { toasts: n } = t;
  return n.length === 0 ? null : je(
    /* @__PURE__ */ r("div", { className: _(Ee.container, Ee[e]), children: n.map((o) => /* @__PURE__ */ r(Km, { ...o }, o.id)) }),
    document.body
  );
}, Km = ({
  id: e,
  type: t,
  title: n,
  message: o,
  duration: a = 5e3,
  dismissible: s = !0,
  action: c
}) => {
  const l = Y(_t), [i, h] = q(!1), m = W(() => {
    h(!0), setTimeout(() => {
      l == null || l.hideToast(e);
    }, 300);
  }, [l, e]);
  j(() => {
    if (a > 0) {
      const d = setTimeout(() => {
        m();
      }, a);
      return () => clearTimeout(d);
    }
  }, [a, m]);
  const u = () => {
    switch (t) {
      case "success":
        return "✓";
      case "error":
        return "✕";
      case "warning":
        return "!";
      case "info":
      default:
        return "i";
    }
  };
  return /* @__PURE__ */ k(
    "div",
    {
      className: _(
        Ee.toast,
        Ee[t],
        {
          [Ee.exiting]: i
        }
      ),
      role: "alert",
      "aria-live": "polite",
      children: [
        /* @__PURE__ */ r("div", { className: Ee.icon, children: /* @__PURE__ */ r("span", { children: u() }) }),
        /* @__PURE__ */ k("div", { className: Ee.content, children: [
          n && /* @__PURE__ */ r("div", { className: Ee.title, children: n }),
          /* @__PURE__ */ r("div", { className: Ee.message, children: o }),
          c && /* @__PURE__ */ r(
            "button",
            {
              className: Ee.action,
              onClick: () => {
                c.onClick(), m();
              },
              children: c.label
            }
          )
        ] }),
        s && /* @__PURE__ */ r(
          "button",
          {
            className: Ee.dismiss,
            onClick: m,
            "aria-label": "Dismiss",
            children: "✕"
          }
        )
      ]
    }
  );
}, f0 = () => {
  const e = Y(_t);
  if (!e)
    throw new Error("useToast must be used within a ToastProvider");
  return e;
};
let Be = null;
const Om = (e) => {
  Be = e;
}, v0 = {
  info: (e, t) => Be ? Be.showToast({ ...t, type: "info", message: e }) : (console.warn("ToastProvider not found. Make sure to wrap your app with ToastProvider."), ""),
  success: (e, t) => Be ? Be.showToast({ ...t, type: "success", message: e }) : (console.warn("ToastProvider not found. Make sure to wrap your app with ToastProvider."), ""),
  warning: (e, t) => Be ? Be.showToast({ ...t, type: "warning", message: e }) : (console.warn("ToastProvider not found. Make sure to wrap your app with ToastProvider."), ""),
  error: (e, t) => Be ? Be.showToast({ ...t, type: "error", message: e }) : (console.warn("ToastProvider not found. Make sure to wrap your app with ToastProvider."), "")
}, Ym = "_backdrop_rlkuf_1", Xm = "_visible_rlkuf_13", Um = "_exiting_rlkuf_17", Zm = "_dialog_rlkuf_22", Qm = "_animate_rlkuf_38", eh = "_dialogEnter_rlkuf_1", th = "_dialogExit_rlkuf_1", nh = "_sm_rlkuf_69", rh = "_md_rlkuf_74", oh = "_lg_rlkuf_79", ah = "_xl_rlkuf_84", sh = "_full_rlkuf_89", lh = "_top_rlkuf_98", ch = "_bottom_rlkuf_103", ih = "_header_rlkuf_109", dh = "_title_rlkuf_119", uh = "_body_rlkuf_127", _h = "_footer_rlkuf_136", mh = "_close_rlkuf_148", xe = {
  backdrop: Ym,
  visible: Xm,
  exiting: Um,
  dialog: Zm,
  animate: Qm,
  dialogEnter: eh,
  dialogExit: th,
  sm: nh,
  md: rh,
  lg: oh,
  xl: ah,
  full: sh,
  top: lh,
  bottom: ch,
  header: ih,
  title: dh,
  body: uh,
  footer: _h,
  close: mh
}, kt = ue(null), Nn = w(
  ({
    open: e = !1,
    onOpenChange: t,
    backdrop: n = !0,
    closeOnBackdropClick: o = !0,
    closeOnEscape: a = !0,
    size: s = "md",
    position: c = "center",
    animate: l = !0,
    autoFocus: i = !0,
    initialFocus: h,
    className: m,
    children: u,
    ...d
  }, p) => {
    const [x, f] = q(!1), g = K(null), $ = K(null), C = W(
      (S) => {
        g.current = S, p && (typeof p == "function" ? p(S) : p.current = S);
      },
      [p]
    ), L = W(() => {
      l ? (f(!0), setTimeout(() => {
        t == null || t(!1), f(!1);
      }, 300)) : t == null || t(!1);
    }, [l, t]), v = W(
      (S) => {
        o && S.target === S.currentTarget && L();
      },
      [o, L]
    ), y = W(
      (S) => {
        S.key === "Escape" && a && L();
      },
      [a, L]
    ), b = W(() => {
      if (!i || !g.current) return;
      const S = g.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (h) {
        const D = g.current.querySelector(h);
        if (D) {
          D.focus({ preventScroll: !0 });
          return;
        }
      }
      S.length > 0 ? S[0].focus({ preventScroll: !0 }) : g.current.focus({ preventScroll: !0 });
    }, [i, h]), N = W((S) => {
      if (!g.current || S.key !== "Tab") return;
      const D = g.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (D.length === 0) return;
      const E = D[0], F = D[D.length - 1];
      S.shiftKey ? document.activeElement === E && (F.focus({ preventScroll: !0 }), S.preventDefault()) : document.activeElement === F && (E.focus({ preventScroll: !0 }), S.preventDefault());
    }, []);
    j(() => {
      if (e)
        return $.current = document.activeElement, b(), document.addEventListener("keydown", y), document.addEventListener("keydown", N), document.body.style.overflow = "hidden", () => {
          document.removeEventListener("keydown", y), document.removeEventListener("keydown", N), document.body.style.overflow = "", $.current && $.current.focus({ preventScroll: !0 });
        };
    }, [e, y, N, b]);
    const z = {
      close: L
    };
    return !e && !x ? null : je(
      /* @__PURE__ */ r(kt.Provider, { value: z, children: /* @__PURE__ */ r(
        "div",
        {
          className: _(
            xe.backdrop,
            {
              [xe.visible]: n,
              [xe.exiting]: x
            }
          ),
          onClick: v,
          children: /* @__PURE__ */ r(
            "div",
            {
              ref: C,
              className: _(
                xe.dialog,
                xe[s],
                xe[c],
                {
                  [xe.animate]: l,
                  [xe.exiting]: x
                },
                m
              ),
              role: "dialog",
              "aria-modal": "true",
              tabIndex: -1,
              ...d,
              children: u
            }
          )
        }
      ) }),
      document.body
    );
  }
), Cn = w(
  ({ className: e, children: t, ...n }, o) => /* @__PURE__ */ r("div", { ref: o, className: _(xe.header, e), ...n, children: t })
), Ln = w(
  ({ className: e, children: t, ...n }, o) => /* @__PURE__ */ r("h2", { ref: o, className: _(xe.title, e), ...n, children: t })
), Sn = w(
  ({ className: e, children: t, ...n }, o) => /* @__PURE__ */ r("div", { ref: o, className: _(xe.body, e), ...n, children: t })
), Tn = w(
  ({ className: e, children: t, ...n }, o) => /* @__PURE__ */ r("div", { ref: o, className: _(xe.footer, e), ...n, children: t })
), In = w(
  ({ className: e, children: t, asChild: n, onClick: o, ...a }, s) => {
    const c = Y(kt), l = (i) => {
      o == null || o(i), c == null || c.close();
    };
    return n && R.isValidElement(t) ? R.cloneElement(t, {
      onClick: l
    }) : /* @__PURE__ */ r(
      "button",
      {
        ref: s,
        className: _(xe.close, e),
        onClick: l,
        "aria-label": "Close dialog",
        ...a,
        children: t || "✕"
      }
    );
  }
), y0 = () => {
  const e = Y(kt);
  if (!e)
    throw new Error("useDialog must be used within a Dialog component");
  return e;
};
Nn.displayName = "Dialog";
Cn.displayName = "DialogHeader";
Ln.displayName = "DialogTitle";
Sn.displayName = "DialogBody";
Tn.displayName = "DialogFooter";
In.displayName = "DialogClose";
const w0 = Object.assign(Nn, {
  Header: Cn,
  Title: Ln,
  Body: Sn,
  Footer: Tn,
  Close: In
}), hh = "_trigger_1m3l6_2", ph = "_overlay_1m3l6_7", gh = "_fadeIn_1m3l6_1", bh = "_content_1m3l6_25", fh = "_header_1m3l6_169", vh = "_title_1m3l6_178", yh = "_description_1m3l6_189", wh = "_body_1m3l6_199", xh = "_footer_1m3l6_226", $h = "_close_1m3l6_237", kh = "_slideInLeft_1m3l6_1", Nh = "_slideInRight_1m3l6_1", Ch = "_slideInTop_1m3l6_1", Lh = "_slideInBottom_1m3l6_1", Sh = "_brutalSlideLeft_1m3l6_1", Th = "_brutalSlideRight_1m3l6_1", Te = {
  trigger: hh,
  overlay: ph,
  fadeIn: gh,
  content: bh,
  "content--left": "_content--left_1m3l6_43",
  "content--right": "_content--right_1m3l6_54",
  "content--top": "_content--top_1m3l6_65",
  "content--bottom": "_content--bottom_1m3l6_76",
  "content--sm": "_content--sm_1m3l6_88",
  "content--md": "_content--md_1m3l6_94",
  "content--lg": "_content--lg_1m3l6_100",
  "content--xl": "_content--xl_1m3l6_106",
  "content--full": "_content--full_1m3l6_112",
  "content--default": "_content--default_1m3l6_148",
  "content--brutal": "_content--brutal_1m3l6_154",
  "content--outline": "_content--outline_1m3l6_161",
  header: fh,
  title: vh,
  description: yh,
  body: wh,
  footer: xh,
  close: $h,
  slideInLeft: kh,
  slideInRight: Nh,
  slideInTop: Ch,
  slideInBottom: Lh,
  brutalSlideLeft: Sh,
  brutalSlideRight: Th
}, An = ue(null), Nt = () => {
  const e = Y(An);
  if (!e)
    throw new Error("Drawer components must be used within a Drawer");
  return e;
}, En = R.forwardRef(
  ({
    open: e,
    defaultOpen: t = !1,
    onOpenChange: n,
    direction: o = "right",
    size: a = "md",
    variant: s = "default",
    className: c,
    children: l,
    ...i
  }, h) => {
    const [m, u] = q(e ?? t);
    j(() => {
      e !== void 0 && u(e);
    }, [e]);
    const d = W((x) => {
      u(x), n == null || n(x);
    }, [n]), p = {
      open: m,
      setOpen: d,
      direction: o,
      size: a,
      variant: s
    };
    return /* @__PURE__ */ r(An.Provider, { value: p, children: /* @__PURE__ */ r("div", { ref: h, className: c, ...i, children: l }) });
  }
), Dn = R.forwardRef(
  ({ children: e, className: t, asChild: n = !1, ...o }, a) => {
    const { setOpen: s } = Nt();
    return n ? R.cloneElement(e, {
      onClick: () => s(!0),
      ...o
    }) : /* @__PURE__ */ r(
      "button",
      {
        ref: a,
        className: _(Te.trigger, t),
        onClick: () => s(!0),
        ...o,
        children: e
      }
    );
  }
), Fn = R.forwardRef(
  ({
    children: e,
    className: t,
    showOverlay: n = !0,
    closeOnOverlayClick: o = !0,
    closeOnEscape: a = !0,
    ...s
  }, c) => {
    const { open: l, setOpen: i, direction: h, size: m, variant: u } = Nt();
    if (j(() => {
      if (!a || !l) return;
      const p = (x) => {
        x.key === "Escape" && i(!1);
      };
      return document.addEventListener("keydown", p), () => document.removeEventListener("keydown", p);
    }, [l, a, i]), j(() => {
      if (l) {
        const p = window.getComputedStyle(document.body).overflow;
        return document.body.style.overflow = "hidden", () => {
          document.body.style.overflow = p;
        };
      }
    }, [l]), j(() => {
      if (l) {
        const p = document.activeElement, x = document.querySelector("[data-drawer-content]");
        if (x) {
          const f = x.querySelector(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          f && f.focus();
        }
        return () => {
          p && p.focus();
        };
      }
    }, [l]), !l) return null;
    const d = /* @__PURE__ */ k(be, { children: [
      n && /* @__PURE__ */ r(
        "div",
        {
          className: Te.overlay,
          onClick: () => o && i(!1),
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ r(
        "div",
        {
          ref: c,
          className: _(
            Te.content,
            Te[`content--${h}`],
            Te[`content--${m}`],
            Te[`content--${u}`],
            t
          ),
          role: "dialog",
          "aria-modal": "true",
          "data-drawer-content": !0,
          "data-state": l ? "open" : "closed",
          ...s,
          children: e
        }
      )
    ] });
    return je(d, document.body);
  }
), Mn = R.forwardRef(
  ({ children: e, className: t, ...n }, o) => /* @__PURE__ */ r(
    "div",
    {
      ref: o,
      className: _(Te.header, t),
      ...n,
      children: e
    }
  )
), Bn = R.forwardRef(
  ({ children: e, className: t, ...n }, o) => /* @__PURE__ */ r(
    "h2",
    {
      ref: o,
      className: _(Te.title, t),
      ...n,
      children: e
    }
  )
), zn = R.forwardRef(
  ({ children: e, className: t, ...n }, o) => /* @__PURE__ */ r(
    "p",
    {
      ref: o,
      className: _(Te.description, t),
      ...n,
      children: e
    }
  )
), qn = R.forwardRef(
  ({ children: e, className: t, ...n }, o) => /* @__PURE__ */ r(
    "div",
    {
      ref: o,
      className: _(Te.body, t),
      ...n,
      children: e
    }
  )
), Rn = R.forwardRef(
  ({ children: e, className: t, ...n }, o) => /* @__PURE__ */ r(
    "div",
    {
      ref: o,
      className: _(Te.footer, t),
      ...n,
      children: e
    }
  )
), Pn = R.forwardRef(
  ({ children: e, className: t, asChild: n = !1, ...o }, a) => {
    const { setOpen: s } = Nt();
    return n ? R.cloneElement(e, {
      onClick: () => s(!1),
      ...o
    }) : /* @__PURE__ */ r(
      "button",
      {
        ref: a,
        className: _(Te.close, t),
        onClick: () => s(!1),
        "aria-label": "Close drawer",
        ...o,
        children: e || /* @__PURE__ */ r(
          "svg",
          {
            width: "16",
            height: "16",
            viewBox: "0 0 16 16",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: /* @__PURE__ */ r(
              "path",
              {
                d: "M12 4L4 12M4 4L12 12",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              }
            )
          }
        )
      }
    );
  }
);
En.displayName = "Drawer";
Dn.displayName = "DrawerTrigger";
Fn.displayName = "DrawerContent";
Mn.displayName = "DrawerHeader";
Bn.displayName = "DrawerTitle";
zn.displayName = "DrawerDescription";
qn.displayName = "DrawerBody";
Rn.displayName = "DrawerFooter";
Pn.displayName = "DrawerClose";
const Ke = En;
Ke.Trigger = Dn;
Ke.Content = Fn;
Ke.Header = Mn;
Ke.Title = Bn;
Ke.Description = zn;
Ke.Body = qn;
Ke.Footer = Rn;
Ke.Close = Pn;
const Ih = "_dropdown_p41v6_1", Ah = "_dropdownEnter_p41v6_1", Eh = "_menu_p41v6_22", Dh = "_item_p41v6_27", Fh = "_disabled_p41v6_42", Mh = "_destructive_p41v6_65", Bh = "_icon_p41v6_75", zh = "_text_p41v6_84", qh = "_shortcut_p41v6_89", Rh = "_separator_p41v6_100", Ph = "_label_p41v6_107", De = {
  dropdown: Ih,
  dropdownEnter: Ah,
  menu: Eh,
  item: Dh,
  disabled: Fh,
  destructive: Mh,
  icon: Bh,
  text: zh,
  shortcut: qh,
  separator: Rh,
  label: Ph
}, Ct = ue(null), mt = ({
  children: e,
  open: t,
  onOpenChange: n,
  position: o = "bottom",
  offset: a = 8,
  closeOnItemClick: s = !0,
  closeOnClickOutside: c = !0,
  closeOnEscape: l = !0,
  className: i
}) => {
  const [h, m] = q(!1), [u, d] = q(o), [p, x] = q({ x: 0, y: 0 }), f = K(null), g = K(null), $ = t !== void 0 ? t : h;
  let C = null, L = null;
  R.Children.forEach(e, (E) => {
    R.isValidElement(E) && (E.type === Lt ? L = E.props.children : C = E);
  });
  const v = W(() => {
    if (!f.current || !g.current) return;
    const E = f.current.getBoundingClientRect(), F = g.current.getBoundingClientRect(), M = window.innerWidth, I = window.innerHeight;
    let A = 0, T = 0;
    const [P, X] = o.split("-");
    switch (P) {
      case "bottom":
        T = E.bottom + a;
        break;
      case "top":
        T = E.top - F.height - a;
        break;
      case "left":
        A = E.left - F.width - a;
        break;
      case "right":
        A = E.right + a;
        break;
    }
    if (P === "bottom" || P === "top")
      switch (X) {
        case "start":
          A = E.left;
          break;
        case "end":
          A = E.right - F.width;
          break;
        default:
          A = E.left + E.width / 2 - F.width / 2;
      }
    else if (P === "left" || P === "right")
      switch (X) {
        case "start":
          T = E.top;
          break;
        case "end":
          T = E.bottom - F.height;
          break;
        default:
          T = E.top + E.height / 2 - F.height / 2;
      }
    A = Math.max(8, Math.min(A, M - F.width - 8)), T = Math.max(8, Math.min(T, I - F.height - 8)), d(o), x({
      x: A,
      y: T
    });
  }, [o, a]), y = W(() => {
    t === void 0 && m((E) => !E), n == null || n(!$);
  }, [t, $, n]), b = W(() => {
    t === void 0 && m(!1), n == null || n(!1);
  }, [t, n]), N = W((E) => {
    if (!c || !$) return;
    const F = E.target;
    g.current && f.current && !g.current.contains(F) && !f.current.contains(F) && b();
  }, [c, $, b]), z = W((E) => {
    E.key === "Escape" && l && $ && b();
  }, [l, $, b]);
  j(() => {
    if ($) {
      v();
      const E = () => v(), F = () => {
        if (v(), f.current) {
          const M = f.current.getBoundingClientRect();
          (M.bottom < 0 || M.top > window.innerHeight) && b();
        }
      };
      return window.addEventListener("resize", E), window.addEventListener("scroll", F, !0), document.addEventListener("mousedown", N), document.addEventListener("keydown", z), () => {
        window.removeEventListener("resize", E), window.removeEventListener("scroll", F, !0), document.removeEventListener("mousedown", N), document.removeEventListener("keydown", z);
      };
    }
  }, [$, v, N, z]);
  const S = C && R.isValidElement(C) ? R.cloneElement(C, {
    ref: (E) => {
      f.current = E;
    },
    onClick: (E) => {
      var F, M;
      (M = C == null ? void 0 : (F = C.props).onClick) == null || M.call(F, E), y();
    },
    "aria-expanded": $,
    "aria-haspopup": "menu"
  }) : null, D = {
    close: b,
    closeOnItemClick: s
  };
  return /* @__PURE__ */ k(be, { children: [
    S,
    $ && je(
      /* @__PURE__ */ r(Ct.Provider, { value: D, children: /* @__PURE__ */ r(
        "div",
        {
          ref: g,
          className: _(
            De.dropdown,
            De[u.split("-")[0]],
            i
          ),
          style: {
            position: "fixed",
            left: p.x,
            top: p.y,
            zIndex: "var(--brutal-z-dropdown)"
          },
          role: "menu",
          "aria-orientation": "vertical",
          children: L
        }
      ) }),
      document.body
    )
  ] });
}, Lt = w(
  ({ className: e, children: t, ...n }, o) => /* @__PURE__ */ r("div", { ref: o, className: _(De.menu, e), ...n, children: t })
), Hn = w(
  ({ className: e, disabled: t, destructive: n, icon: o, shortcut: a, children: s, onClick: c, ...l }, i) => {
    const h = Y(Ct), m = (u) => {
      t || (c == null || c(u), h != null && h.closeOnItemClick && h.close());
    };
    return /* @__PURE__ */ k(
      "div",
      {
        ref: i,
        className: _(
          De.item,
          {
            [De.disabled]: t,
            [De.destructive]: n
          },
          e
        ),
        role: "menuitem",
        tabIndex: t ? -1 : 0,
        onClick: m,
        ...l,
        children: [
          o && /* @__PURE__ */ r("span", { className: De.icon, children: o }),
          /* @__PURE__ */ r("span", { className: De.text, children: s }),
          a && /* @__PURE__ */ r("span", { className: De.shortcut, children: a })
        ]
      }
    );
  }
), jn = w(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: _(De.separator, e),
      role: "separator",
      ...t
    }
  )
), Wn = w(
  ({ className: e, children: t, ...n }, o) => /* @__PURE__ */ r(
    "div",
    {
      ref: o,
      className: _(De.label, e),
      ...n,
      children: t
    }
  )
), x0 = () => {
  const e = Y(Ct);
  if (!e)
    throw new Error("useDropdown must be used within a Dropdown component");
  return e;
};
Lt.displayName = "DropdownMenu";
Hn.displayName = "DropdownItem";
jn.displayName = "DropdownSeparator";
Wn.displayName = "DropdownLabel";
mt.Menu = Lt;
mt.Item = Hn;
mt.Separator = jn;
mt.Label = Wn;
const Hh = "_tabs_1bvv9_1", jh = "_fullWidth_1bvv9_7", Wh = "_vertical_1bvv9_12", Gh = "_list_1bvv9_17", Jh = "_horizontal_1bvv9_24", Vh = "_trigger_1bvv9_36", Kh = "_sm_1bvv9_51", Oh = "_md_1bvv9_56", Yh = "_lg_1bvv9_61", Xh = "_disabled_1bvv9_87", Uh = "_active_1bvv9_97", Zh = "_content_1bvv9_130", Qh = "_contentEnter_1bvv9_1", ep = "_inactive_1bvv9_142", ke = {
  tabs: Hh,
  fullWidth: jh,
  vertical: Wh,
  list: Gh,
  horizontal: Jh,
  trigger: Vh,
  sm: Kh,
  md: Oh,
  lg: Yh,
  disabled: Xh,
  active: Uh,
  content: Zh,
  contentEnter: Qh,
  inactive: ep
}, st = ue(null), Gn = w(
  ({
    defaultValue: e = "",
    value: t,
    onValueChange: n,
    orientation: o = "horizontal",
    size: a = "md",
    fullWidth: s = !1,
    className: c,
    children: l,
    ...i
  }, h) => {
    const [m, u] = q(e), d = t !== void 0 ? t : m, p = W((f) => {
      t === void 0 && u(f), n == null || n(f);
    }, [t, n]), x = {
      activeTab: d,
      setActiveTab: p,
      orientation: o,
      size: a
    };
    return /* @__PURE__ */ r(st.Provider, { value: x, children: /* @__PURE__ */ r(
      "div",
      {
        ref: h,
        className: _(
          ke.tabs,
          ke[o],
          ke[a],
          {
            [ke.fullWidth]: s
          },
          c
        ),
        ...i,
        children: l
      }
    ) });
  }
), Jn = w(
  ({ className: e, children: t, ...n }, o) => {
    const a = Y(st);
    if (!a)
      throw new Error("TabsList must be used within Tabs");
    return /* @__PURE__ */ r(
      "div",
      {
        ref: o,
        className: _(
          ke.list,
          ke[a.orientation],
          e
        ),
        role: "tablist",
        "aria-orientation": a.orientation,
        ...n,
        children: t
      }
    );
  }
), Vn = w(
  ({ value: e, disabled: t, className: n, children: o, onClick: a, ...s }, c) => {
    const l = Y(st);
    if (!l)
      throw new Error("TabsTrigger must be used within Tabs");
    const i = l.activeTab === e, h = (m) => {
      t || (l.setActiveTab(e), a == null || a(m));
    };
    return /* @__PURE__ */ r(
      "button",
      {
        ref: c,
        className: _(
          ke.trigger,
          ke[l.size],
          {
            [ke.active]: i,
            [ke.disabled]: t
          },
          n
        ),
        role: "tab",
        "aria-selected": i,
        "aria-controls": `tabpanel-${e}`,
        id: `tab-${e}`,
        tabIndex: i ? 0 : -1,
        disabled: t,
        onClick: h,
        ...s,
        children: o
      }
    );
  }
), Kn = w(
  ({ value: e, forceMount: t = !1, className: n, children: o, ...a }, s) => {
    const c = Y(st);
    if (!c)
      throw new Error("TabsContent must be used within Tabs");
    const l = c.activeTab === e;
    return !l && !t ? null : /* @__PURE__ */ r(
      "div",
      {
        ref: s,
        className: _(
          ke.content,
          {
            [ke.active]: l,
            [ke.inactive]: !l
          },
          n
        ),
        role: "tabpanel",
        "aria-labelledby": `tab-${e}`,
        id: `tabpanel-${e}`,
        tabIndex: 0,
        hidden: !l,
        ...a,
        children: o
      }
    );
  }
), $0 = () => {
  const e = Y(st);
  if (!e)
    throw new Error("useTabs must be used within Tabs");
  return e;
};
Gn.displayName = "Tabs";
Jn.displayName = "TabsList";
Vn.displayName = "TabsTrigger";
Kn.displayName = "TabsContent";
const k0 = Object.assign(Gn, {
  List: Jn,
  Trigger: Vn,
  Content: Kn
}), tp = "_container_1jthk_1", np = "_centered_1jthk_6", rp = "_sm_1jthk_12", op = "_md_1jthk_16", ap = "_lg_1jthk_20", sp = "_xl_1jthk_24", lp = "_full_1jthk_28", ct = {
  container: tp,
  centered: np,
  sm: rp,
  md: op,
  lg: ap,
  xl: sp,
  full: lp,
  "padding-none": "_padding-none_1jthk_33",
  "padding-sm": "_padding-sm_1jthk_37",
  "padding-md": "_padding-md_1jthk_41",
  "padding-lg": "_padding-lg_1jthk_45"
}, cp = w(
  ({
    size: e = "lg",
    centered: t = !0,
    padding: n = "md",
    className: o,
    children: a,
    ...s
  }, c) => /* @__PURE__ */ r(
    "div",
    {
      ref: c,
      className: _(
        ct.container,
        ct[e],
        ct[`padding-${n}`],
        {
          [ct.centered]: t
        },
        o
      ),
      ...s,
      children: a
    }
  )
);
cp.displayName = "Container";
const ip = "_stack_1a0do_1", dp = "_vertical_1a0do_7", up = "_horizontal_1a0do_11", _p = "_wrap_1a0do_83", Ze = {
  stack: ip,
  vertical: dp,
  horizontal: up,
  "gap-none": "_gap-none_1a0do_16",
  "gap-xs": "_gap-xs_1a0do_20",
  "gap-sm": "_gap-sm_1a0do_24",
  "gap-md": "_gap-md_1a0do_28",
  "gap-lg": "_gap-lg_1a0do_32",
  "gap-xl": "_gap-xl_1a0do_36",
  "align-start": "_align-start_1a0do_41",
  "align-center": "_align-center_1a0do_45",
  "align-end": "_align-end_1a0do_49",
  "align-stretch": "_align-stretch_1a0do_53",
  "justify-start": "_justify-start_1a0do_58",
  "justify-center": "_justify-center_1a0do_62",
  "justify-end": "_justify-end_1a0do_66",
  "justify-between": "_justify-between_1a0do_70",
  "justify-around": "_justify-around_1a0do_74",
  "justify-evenly": "_justify-evenly_1a0do_78",
  wrap: _p
}, mp = w(
  ({
    direction: e = "vertical",
    gap: t = "md",
    align: n = "stretch",
    justify: o = "start",
    wrap: a = !1,
    as: s = "div",
    className: c,
    children: l,
    ...i
  }, h) => /* @__PURE__ */ r(
    s,
    {
      ref: h,
      className: _(
        Ze.stack,
        Ze[e],
        Ze[`gap-${t}`],
        Ze[`align-${n}`],
        Ze[`justify-${o}`],
        {
          [Ze.wrap]: a
        },
        c
      ),
      ...i,
      children: l
    }
  )
);
mp.displayName = "Stack";
const hp = "_breadcrumb_13wou_1", pp = "_list_13wou_6", gp = "_item_13wou_16", bp = "_current_13wou_21", fp = "_link_13wou_26", vp = "_page_13wou_62", yp = "_separator_13wou_75", Xe = {
  breadcrumb: hp,
  list: pp,
  item: gp,
  current: bp,
  link: fp,
  page: vp,
  separator: yp
}, On = w(
  ({ separator: e = "/", className: t, children: n, ...o }, a) => /* @__PURE__ */ r(
    "nav",
    {
      ref: a,
      "aria-label": "Breadcrumb",
      className: _(Xe.breadcrumb, t),
      ...o,
      children: /* @__PURE__ */ r("ol", { className: Xe.list, children: R.Children.map(n, (s, c) => {
        if (!R.isValidElement(s)) return null;
        const l = c === R.Children.count(n) - 1;
        return /* @__PURE__ */ k(be, { children: [
          s,
          !l && /* @__PURE__ */ r("li", { className: Xe.separator, "aria-hidden": "true", children: e })
        ] });
      }) })
    }
  )
), Yn = w(
  ({ isCurrentPage: e = !1, className: t, children: n, ...o }, a) => /* @__PURE__ */ r(
    "li",
    {
      ref: a,
      className: _(
        Xe.item,
        {
          [Xe.current]: e
        },
        t
      ),
      "aria-current": e ? "page" : void 0,
      ...o,
      children: n
    }
  )
), Xn = w(
  ({ className: e, children: t, ...n }, o) => /* @__PURE__ */ r(
    "a",
    {
      ref: o,
      className: _(Xe.link, e),
      ...n,
      children: t
    }
  )
), Un = w(
  ({ className: e, children: t, ...n }, o) => /* @__PURE__ */ r(
    "span",
    {
      ref: o,
      className: _(Xe.page, e),
      ...n,
      children: t
    }
  )
);
On.displayName = "Breadcrumb";
Yn.displayName = "BreadcrumbItem";
Xn.displayName = "BreadcrumbLink";
Un.displayName = "BreadcrumbPage";
Object.assign(On, {
  Item: Yn,
  Link: Xn,
  Page: Un
});
const wp = "_sidebar_neq9y_1", xp = "_right_neq9y_12", $p = "_floating_neq9y_17", kp = "_inset_neq9y_25", Np = "_collapsed_neq9y_32", Cp = "_collapsible_neq9y_36", Lp = "_text_neq9y_36", Sp = "_header_neq9y_41", Tp = "_content_neq9y_48", Ip = "_footer_neq9y_56", Ap = "_group_neq9y_63", Ep = "_groupLabel_neq9y_73", Dp = "_groupContent_neq9y_83", Fp = "_menu_neq9y_88", Mp = "_menuItem_neq9y_94", Bp = "_menuButton_neq9y_98", zp = "_active_neq9y_128", qp = "_icon_neq9y_139", Rp = "_withIcon_neq9y_155", ae = {
  sidebar: wp,
  right: xp,
  floating: $p,
  inset: kp,
  collapsed: Np,
  collapsible: Cp,
  text: Lp,
  header: Sp,
  content: Tp,
  footer: Ip,
  group: Ap,
  groupLabel: Ep,
  groupContent: Dp,
  menu: Fp,
  menuItem: Mp,
  menuButton: Bp,
  active: zp,
  icon: qp,
  withIcon: Rp
}, St = ue(null), Zn = w(
  ({
    collapsible: e = !1,
    collapsed: t = !1,
    onCollapsedChange: n,
    side: o = "left",
    variant: a = "default",
    className: s,
    children: c,
    ...l
  }, i) => {
    const h = {
      collapsed: t,
      collapsible: e
    };
    return /* @__PURE__ */ r(St.Provider, { value: h, children: /* @__PURE__ */ r(
      "div",
      {
        ref: i,
        className: _(
          ae.sidebar,
          ae[o],
          ae[a],
          {
            [ae.collapsed]: t,
            [ae.collapsible]: e
          },
          s
        ),
        "data-sidebar": "sidebar",
        "data-collapsed": t,
        ...l,
        children: c
      }
    ) });
  }
), Qn = w(
  ({ className: e, children: t, ...n }, o) => /* @__PURE__ */ r(
    "div",
    {
      ref: o,
      className: _(ae.header, e),
      "data-sidebar": "header",
      ...n,
      children: t
    }
  )
), er = w(
  ({ className: e, children: t, ...n }, o) => /* @__PURE__ */ r(
    "div",
    {
      ref: o,
      className: _(ae.content, e),
      "data-sidebar": "content",
      ...n,
      children: t
    }
  )
), tr = w(
  ({ className: e, children: t, ...n }, o) => /* @__PURE__ */ r(
    "div",
    {
      ref: o,
      className: _(ae.footer, e),
      "data-sidebar": "footer",
      ...n,
      children: t
    }
  )
), nr = w(
  ({ className: e, children: t, ...n }, o) => /* @__PURE__ */ r(
    "div",
    {
      ref: o,
      className: _(ae.group, e),
      "data-sidebar": "group",
      ...n,
      children: t
    }
  )
), rr = w(
  ({ className: e, children: t, ...n }, o) => /* @__PURE__ */ r(
    "div",
    {
      ref: o,
      className: _(ae.groupLabel, e),
      "data-sidebar": "group-label",
      ...n,
      children: t
    }
  )
), or = w(
  ({ className: e, children: t, ...n }, o) => /* @__PURE__ */ r(
    "div",
    {
      ref: o,
      className: _(ae.groupContent, e),
      "data-sidebar": "group-content",
      ...n,
      children: t
    }
  )
), ar = w(
  ({ className: e, children: t, ...n }, o) => /* @__PURE__ */ r(
    "ul",
    {
      ref: o,
      className: _(ae.menu, e),
      "data-sidebar": "menu",
      ...n,
      children: t
    }
  )
), sr = w(
  ({ className: e, children: t, ...n }, o) => /* @__PURE__ */ r(
    "li",
    {
      ref: o,
      className: _(ae.menuItem, e),
      "data-sidebar": "menu-item",
      ...n,
      children: t
    }
  )
), lr = w(
  ({ isActive: e = !1, icon: t, className: n, children: o, ...a }, s) => {
    const c = Y(St);
    return /* @__PURE__ */ k(
      "button",
      {
        ref: s,
        className: _(
          ae.menuButton,
          {
            [ae.active]: e,
            [ae.withIcon]: !!t
          },
          n
        ),
        "data-sidebar": "menu-button",
        "data-active": e,
        ...a,
        children: [
          t && /* @__PURE__ */ r("span", { className: ae.icon, "data-sidebar": "icon", children: t }),
          (!(c != null && c.collapsed) || !(c != null && c.collapsible)) && /* @__PURE__ */ r("span", { className: ae.text, "data-sidebar": "text", children: o })
        ]
      }
    );
  }
), N0 = () => {
  const e = Y(St);
  if (!e)
    throw new Error("useSidebar must be used within a Sidebar component");
  return e;
};
Zn.displayName = "Sidebar";
Qn.displayName = "SidebarHeader";
er.displayName = "SidebarContent";
tr.displayName = "SidebarFooter";
nr.displayName = "SidebarGroup";
rr.displayName = "SidebarGroupLabel";
or.displayName = "SidebarGroupContent";
ar.displayName = "SidebarMenu";
sr.displayName = "SidebarMenuItem";
lr.displayName = "SidebarMenuButton";
Object.assign(Zn, {
  Header: Qn,
  Content: er,
  Footer: tr,
  Group: nr,
  GroupLabel: rr,
  GroupContent: or,
  Menu: ar,
  MenuItem: sr,
  MenuButton: lr
});
const Pp = "_navigation_1mn6v_1", Hp = "_vertical_1mn6v_7", jp = "_sm_1mn6v_12", Wp = "_lg_1mn6v_16", Gp = "_list_1mn6v_20", Jp = "_item_1mn6v_35", Vp = "_disabled_1mn6v_39", Kp = "_link_1mn6v_44", Op = "_active_1mn6v_75", Yp = "_icon_1mn6v_99", Xp = "_text_1mn6v_108", Up = "_separator_1mn6v_112", $e = {
  navigation: Pp,
  vertical: Hp,
  sm: jp,
  lg: Wp,
  list: Gp,
  item: Jp,
  disabled: Vp,
  link: Kp,
  active: Op,
  icon: Yp,
  text: Xp,
  separator: Up
}, lt = w(
  ({ vertical: e = !1, size: t = "md", className: n, children: o, ...a }, s) => /* @__PURE__ */ r(
    "nav",
    {
      ref: s,
      className: _(
        $e.navigation,
        {
          [$e.vertical]: e,
          [$e[t]]: t
        },
        n
      ),
      ...a,
      children: o
    }
  )
), cr = w(
  ({ className: e, children: t, ...n }, o) => /* @__PURE__ */ r(
    "ul",
    {
      ref: o,
      className: _($e.list, e),
      ...n,
      children: t
    }
  )
), ir = w(
  ({ isActive: e, disabled: t, className: n, children: o, ...a }, s) => /* @__PURE__ */ r(
    "li",
    {
      ref: s,
      className: _(
        $e.item,
        {
          [$e.active]: e,
          [$e.disabled]: t
        },
        n
      ),
      ...a,
      children: o
    }
  )
), dr = w(
  ({ href: e, isActive: t, disabled: n, icon: o, className: a, children: s, ...c }, l) => /* @__PURE__ */ k(
    "a",
    {
      ref: l,
      href: n ? void 0 : e,
      className: _(
        $e.link,
        {
          [$e.active]: t,
          [$e.disabled]: n
        },
        a
      ),
      "aria-current": t ? "page" : void 0,
      tabIndex: n ? -1 : void 0,
      ...c,
      children: [
        o && /* @__PURE__ */ r("span", { className: $e.icon, children: o }),
        /* @__PURE__ */ r("span", { className: $e.text, children: s })
      ]
    }
  )
), ur = w(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
    "hr",
    {
      ref: n,
      className: _($e.separator, e),
      ...t
    }
  )
);
lt.displayName = "Navigation";
cr.displayName = "NavigationList";
ir.displayName = "NavigationItem";
dr.displayName = "NavigationLink";
ur.displayName = "NavigationSeparator";
lt.List = cr;
lt.Item = ir;
lt.Link = dr;
lt.Separator = ur;
const Zp = "_tableOfContents_1bnnu_1", Qp = "_sticky_1bnnu_8", e1 = "_floating_1bnnu_13", t1 = "_title_1bnnu_24", n1 = "_list_1bnnu_36", r1 = "_item_1bnnu_43", o1 = "_level1_1bnnu_49", a1 = "_level2_1bnnu_62", s1 = "_level3_1bnnu_75", l1 = "_level4_1bnnu_89", c1 = "_level5_1bnnu_102", i1 = "_level6_1bnnu_115", d1 = "_active_1bnnu_127", u1 = "_link_1bnnu_161", _1 = "_activeLink_1bnnu_186", m1 = "_linkText_1bnnu_197", h1 = "_linkLevel1_1bnnu_203", p1 = "_linkLevel2_1bnnu_208", g1 = "_linkLevel3_1bnnu_213", b1 = "_linkLevel4_1bnnu_218", f1 = "_linkLevel5_1bnnu_219", v1 = "_linkLevel6_1bnnu_220", y1 = "_sm_1bnnu_226", w1 = "_lg_1bnnu_240", Ie = {
  tableOfContents: Zp,
  sticky: Qp,
  floating: e1,
  title: t1,
  list: n1,
  item: r1,
  level1: o1,
  level2: a1,
  level3: s1,
  level4: l1,
  level5: c1,
  level6: i1,
  active: d1,
  link: u1,
  activeLink: _1,
  linkText: m1,
  linkLevel1: h1,
  linkLevel2: p1,
  linkLevel3: g1,
  linkLevel4: b1,
  linkLevel5: f1,
  linkLevel6: v1,
  sm: y1,
  lg: w1
}, ht = w(
  ({
    title: e = "Table of Contents",
    showTitle: t = !0,
    size: n = "md",
    position: o = "default",
    className: a,
    children: s,
    ...c
  }, l) => /* @__PURE__ */ k(
    "nav",
    {
      ref: l,
      className: _(
        Ie.tableOfContents,
        Ie[n],
        Ie[o],
        a
      ),
      "aria-label": "Table of contents",
      ...c,
      children: [
        t && /* @__PURE__ */ r("h2", { className: Ie.title, children: e }),
        s
      ]
    }
  )
), _r = w(
  ({ className: e, children: t, ...n }, o) => /* @__PURE__ */ r(
    "ol",
    {
      ref: o,
      className: _(Ie.list, e),
      ...n,
      children: t
    }
  )
), mr = w(
  ({ level: e = 1, isActive: t, className: n, children: o, ...a }, s) => /* @__PURE__ */ r(
    "li",
    {
      ref: s,
      className: _(
        Ie.item,
        Ie[`level${e}`],
        {
          [Ie.active]: t
        },
        n
      ),
      ...a,
      children: o
    }
  )
), hr = w(
  ({ href: e, isActive: t, level: n = 1, className: o, children: a, ...s }, c) => /* @__PURE__ */ r(
    "a",
    {
      ref: c,
      href: e,
      className: _(
        Ie.link,
        Ie[`linkLevel${n}`],
        {
          [Ie.activeLink]: t
        },
        o
      ),
      "aria-current": t ? "location" : void 0,
      ...s,
      children: /* @__PURE__ */ r("span", { className: Ie.linkText, children: a })
    }
  )
);
ht.displayName = "TableOfContents";
_r.displayName = "TableOfContentsList";
mr.displayName = "TableOfContentsItem";
hr.displayName = "TableOfContentsLink";
ht.List = _r;
ht.Item = mr;
ht.Link = hr;
const x1 = "_accordion_ub4ad_4", $1 = "_sm_ub4ad_10", k1 = "_md_ub4ad_15", N1 = "_lg_ub4ad_20", C1 = "_item_ub4ad_26", L1 = "_brutal_ub4ad_51", S1 = "_outline_ub4ad_58", T1 = "_open_ub4ad_65", I1 = "_trigger_ub4ad_86", A1 = "_disabled_ub4ad_115", E1 = "_triggerText_ub4ad_138", D1 = "_triggerIcon_ub4ad_146", F1 = "_rotated_ub4ad_155", M1 = "_content_ub4ad_164", B1 = "_contentInner_ub4ad_192", de = {
  accordion: x1,
  sm: $1,
  md: k1,
  lg: N1,
  item: C1,
  default: "_default_ub4ad_46",
  brutal: L1,
  outline: S1,
  open: T1,
  trigger: I1,
  disabled: A1,
  triggerText: E1,
  triggerIcon: D1,
  rotated: F1,
  content: M1,
  contentInner: B1
}, Tt = ue(null), It = ue(null), pr = w(
  ({
    children: e,
    className: t,
    type: n = "single",
    collapsible: o = !1,
    defaultValue: a,
    value: s,
    onValueChange: c,
    size: l = "md",
    variant: i = "default",
    disabled: h = !1,
    ...m
  }, u) => {
    const [d, p] = q(() => s !== void 0 ? s : a !== void 0 ? a : n === "multiple" ? [] : ""), x = s !== void 0 ? s : d, f = (g) => {
      s === void 0 && p(g), c == null || c(g);
    };
    return /* @__PURE__ */ r(
      Tt.Provider,
      {
        value: {
          type: n,
          value: x,
          onValueChange: f,
          size: l,
          variant: i,
          disabled: h,
          collapsible: o
        },
        children: /* @__PURE__ */ r(
          "div",
          {
            ref: u,
            className: _(
              de.accordion,
              de[l],
              de[i],
              {
                [de.disabled]: h
              },
              t
            ),
            ...m,
            children: e
          }
        )
      }
    );
  }
), gr = w(
  ({ children: e, className: t, value: n, disabled: o = !1, ...a }, s) => {
    const c = Y(Tt);
    if (!c)
      throw new Error("AccordionItem must be used within an Accordion");
    const { type: l, value: i, onValueChange: h, disabled: m } = c, u = m || o, d = Co(), p = `${d}-trigger`, x = `${d}-content`, f = l === "multiple" ? Array.isArray(i) && i.includes(n) : i === n, g = () => {
      if (!u)
        if (l === "multiple") {
          const $ = Array.isArray(i) ? i : [], C = f ? $.filter((L) => L !== n) : [...$, n];
          h(C);
        } else {
          const $ = f && c.collapsible ? "" : n;
          h($);
        }
    };
    return /* @__PURE__ */ r(
      It.Provider,
      {
        value: {
          value: n,
          isOpen: f,
          disabled: u,
          toggle: g,
          triggerId: p,
          contentId: x
        },
        children: /* @__PURE__ */ r(
          "div",
          {
            ref: s,
            className: _(
              de.item,
              {
                [de.open]: f,
                [de.disabled]: u
              },
              t
            ),
            ...a,
            children: e
          }
        )
      }
    );
  }
), br = w(
  ({ children: e, className: t, icon: n, hideIcon: o = !1, onClick: a, ...s }, c) => {
    const l = Y(It), i = Y(Tt);
    if (!l || !i)
      throw new Error("AccordionTrigger must be used within an AccordionItem");
    const { isOpen: h, disabled: m, toggle: u, triggerId: d, contentId: p } = l, x = (f) => {
      u(), a == null || a(f);
    };
    return /* @__PURE__ */ k(
      "button",
      {
        ref: c,
        id: d,
        type: "button",
        className: _(
          de.trigger,
          {
            [de.open]: h,
            [de.disabled]: m
          },
          t
        ),
        onClick: x,
        disabled: m,
        "aria-expanded": h,
        "aria-controls": p,
        ...s,
        children: [
          /* @__PURE__ */ r("span", { className: de.triggerText, children: e }),
          !o && /* @__PURE__ */ r(
            "span",
            {
              className: _(de.triggerIcon, {
                [de.rotated]: h
              }),
              children: n || /* @__PURE__ */ r(z1, {})
            }
          )
        ]
      }
    );
  }
), fr = w(
  ({ children: e, className: t, ...n }, o) => {
    const a = Y(It);
    if (!a)
      throw new Error("AccordionContent must be used within an AccordionItem");
    const { isOpen: s, contentId: c, triggerId: l } = a;
    return /* @__PURE__ */ r(
      "div",
      {
        ref: o,
        id: c,
        role: "region",
        "aria-labelledby": l,
        className: _(
          de.content,
          {
            [de.open]: s
          },
          t
        ),
        ...n,
        children: /* @__PURE__ */ r("div", { className: de.contentInner, children: e })
      }
    );
  }
), z1 = () => /* @__PURE__ */ r(
  "svg",
  {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ r(
      "path",
      {
        d: "M4 6L8 10L12 6",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "square",
        strokeLinejoin: "miter"
      }
    )
  }
);
pr.displayName = "Accordion";
gr.displayName = "Accordion.Item";
br.displayName = "Accordion.Trigger";
fr.displayName = "Accordion.Content";
const At = pr;
At.Item = gr;
At.Trigger = br;
At.Content = fr;
const q1 = "_combobox_1lqr4_2", R1 = "_trigger_1lqr4_128", P1 = "_subtlePulse_1lqr4_1", H1 = "_subtleGlow_1lqr4_1", j1 = "_destructivePulse_1lqr4_1", W1 = "_successGlow_1lqr4_1", G1 = "_warningShake_1lqr4_1", J1 = "_neonPulse_1lqr4_1", V1 = "_retroGlow_1lqr4_1", K1 = "_triggerText_1lqr4_255", O1 = "_triggerIcon_1lqr4_263", Y1 = "_triggerArrow_1lqr4_271", X1 = "_triggerArrowOpen_1lqr4_277", U1 = "_content_1lqr4_282", Z1 = "_comboboxSlideDown_1lqr4_1", Q1 = "_searchContainer_1lqr4_306", eg = "_searchInput_1lqr4_324", tg = "_optionsList_1lqr4_356", ng = "_option_1lqr4_356", rg = "_optionHighlighted_1lqr4_404", og = "_optionSelected_1lqr4_411", ag = "_optionDisabled_1lqr4_438", sg = "_checkIcon_1lqr4_444", lg = "_emptyMessage_1lqr4_451", se = {
  combobox: q1,
  "combobox--sm": "_combobox--sm_1lqr4_34",
  "combobox--md": "_combobox--md_1lqr4_40",
  "combobox--lg": "_combobox--lg_1lqr4_46",
  "combobox--default": "_combobox--default_1lqr4_53",
  "combobox--brutal": "_combobox--brutal_1lqr4_58",
  "combobox--outline": "_combobox--outline_1lqr4_65",
  "combobox--info": "_combobox--info_1lqr4_71",
  "combobox--system": "_combobox--system_1lqr4_78",
  "combobox--destructive": "_combobox--destructive_1lqr4_85",
  "combobox--success": "_combobox--success_1lqr4_92",
  "combobox--warning": "_combobox--warning_1lqr4_99",
  "combobox--ghost": "_combobox--ghost_1lqr4_106",
  "combobox--neon": "_combobox--neon_1lqr4_113",
  "combobox--retro": "_combobox--retro_1lqr4_120",
  trigger: R1,
  subtlePulse: P1,
  subtleGlow: H1,
  destructivePulse: j1,
  successGlow: W1,
  warningShake: G1,
  neonPulse: J1,
  retroGlow: V1,
  triggerText: K1,
  triggerIcon: O1,
  triggerArrow: Y1,
  triggerArrowOpen: X1,
  content: U1,
  comboboxSlideDown: Z1,
  searchContainer: Q1,
  searchInput: eg,
  optionsList: tg,
  option: ng,
  optionHighlighted: rg,
  optionSelected: og,
  optionDisabled: ag,
  checkIcon: sg,
  emptyMessage: lg
}, vr = ue(null), Et = () => {
  const e = Y(vr);
  if (!e)
    throw new Error("Combobox components must be used within a Combobox");
  return e;
}, yr = R.forwardRef(
  ({
    options: e = [],
    value: t,
    defaultValue: n = "",
    onValueChange: o,
    placeholder: a,
    emptyMessage: s,
    searchPlaceholder: c,
    className: l,
    children: i,
    size: h = "md",
    variant: m = "default",
    ...u
  }, d) => {
    const [p, x] = q(!1), [f, g] = q(t ?? n), [$, C] = q(""), [L, v] = q(-1), y = K(null), b = K(null), N = R.useMemo(() => $ ? e.filter(
      (E) => E.label.toLowerCase().includes($.toLowerCase())
    ) : e, [e, $]);
    j(() => {
      t !== void 0 && g(t);
    }, [t]);
    const z = W((E) => {
      g(E), x(!1), C(""), v(-1), o == null || o(E);
    }, [o]), S = W((E) => {
      var F;
      if (!p) {
        (E.key === "Enter" || E.key === " " || E.key === "ArrowDown") && (E.preventDefault(), x(!0), v(0));
        return;
      }
      switch (E.key) {
        case "Escape":
          E.preventDefault(), x(!1), v(-1), (F = y.current) == null || F.focus();
          break;
        case "ArrowDown":
          E.preventDefault(), v(
            (M) => M < N.length - 1 ? M + 1 : 0
          );
          break;
        case "ArrowUp":
          E.preventDefault(), v(
            (M) => M > 0 ? M - 1 : N.length - 1
          );
          break;
        case "Enter":
          E.preventDefault(), L >= 0 && N[L] && z(N[L].value);
          break;
      }
    }, [p, N, L, z]);
    j(() => {
      const E = (F) => {
        b.current && !b.current.contains(F.target) && y.current && !y.current.contains(F.target) && (x(!1), v(-1));
      };
      if (p)
        return document.addEventListener("mousedown", E), () => document.removeEventListener("mousedown", E);
    }, [p]);
    const D = {
      isOpen: p,
      setIsOpen: x,
      selectedValue: f,
      setSelectedValue: g,
      searchValue: $,
      setSearchValue: C,
      options: e,
      filteredOptions: N,
      triggerRef: y,
      contentRef: b,
      highlightedIndex: L,
      setHighlightedIndex: v,
      onSelect: z,
      placeholder: a,
      emptyMessage: s,
      searchPlaceholder: c
    };
    return /* @__PURE__ */ r(vr.Provider, { value: D, children: /* @__PURE__ */ r(
      "div",
      {
        ref: d,
        className: _(
          se.combobox,
          se[`combobox--${h}`],
          se[`combobox--${m}`],
          l
        ),
        onKeyDown: S,
        ...u,
        children: i
      }
    ) });
  }
), wr = R.forwardRef(
  ({ className: e, placeholder: t, icon: n, ...o }, a) => {
    const { isOpen: s, setIsOpen: c, selectedValue: l, options: i, triggerRef: h, placeholder: m } = Et(), u = i.find((p) => p.value === l), d = t || m || "Select option...";
    return /* @__PURE__ */ k(
      "button",
      {
        ref: h,
        type: "button",
        role: "combobox",
        "aria-expanded": s,
        "aria-haspopup": "listbox",
        className: _(se.trigger, e),
        onClick: () => c(!s),
        ...o,
        children: [
          n && /* @__PURE__ */ r("span", { className: se.triggerIcon, children: n }),
          /* @__PURE__ */ r("span", { className: se.triggerText, children: u ? u.label : d }),
          /* @__PURE__ */ r(
            "svg",
            {
              className: _(se.triggerArrow, { [se.triggerArrowOpen]: s }),
              width: "12",
              height: "12",
              viewBox: "0 0 12 12",
              fill: "none",
              children: /* @__PURE__ */ r("path", { d: "M3 4.5L6 7.5L9 4.5", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
            }
          )
        ]
      }
    );
  }
), xr = R.forwardRef(
  ({
    children: e,
    className: t,
    searchPlaceholder: n,
    emptyMessage: o,
    ...a
  }, s) => {
    const {
      isOpen: c,
      searchValue: l,
      setSearchValue: i,
      filteredOptions: h,
      contentRef: m,
      triggerRef: u,
      searchPlaceholder: d,
      emptyMessage: p
    } = Et(), x = n || d || "Search options...", f = o || p || "No options found.", [g, $] = q({ top: 0, left: 0, width: 0 }), C = W(() => {
      if (c && u.current) {
        const v = u.current.getBoundingClientRect();
        $({
          top: v.bottom + 4,
          left: v.left,
          width: v.width
        });
      }
    }, [c, u]);
    if (j(() => {
      C();
    }, [C]), j(() => {
      if (c) {
        const v = () => C();
        return window.addEventListener("scroll", v, !0), window.addEventListener("resize", v), () => {
          window.removeEventListener("scroll", v, !0), window.removeEventListener("resize", v);
        };
      }
    }, [c, C]), !c) return null;
    const L = /* @__PURE__ */ k(
      "div",
      {
        ref: m,
        className: _(se.content, t),
        style: {
          top: g.top,
          left: g.left,
          minWidth: g.width
        },
        role: "listbox",
        ...a,
        children: [
          /* @__PURE__ */ r("div", { className: se.searchContainer, children: /* @__PURE__ */ r(
            "input",
            {
              type: "text",
              className: se.searchInput,
              placeholder: x,
              value: l,
              onChange: (v) => i(v.target.value),
              autoFocus: !0
            }
          ) }),
          /* @__PURE__ */ r("div", { className: se.optionsList, children: h.length === 0 ? /* @__PURE__ */ r("div", { className: se.emptyMessage, children: f }) : e || h.map((v) => /* @__PURE__ */ r(
            Dt,
            {
              value: v.value,
              disabled: v.disabled,
              children: v.label
            },
            v.value
          )) })
        ]
      }
    );
    return je(L, document.body);
  }
), Dt = R.forwardRef(
  ({ value: e, children: t, disabled: n = !1, className: o, ...a }, s) => {
    const {
      selectedValue: c,
      onSelect: l,
      highlightedIndex: i,
      setHighlightedIndex: h,
      filteredOptions: m
    } = Et(), u = m.findIndex((x) => x.value === e), d = c === e, p = i === u;
    return /* @__PURE__ */ k(
      "div",
      {
        ref: s,
        role: "option",
        "aria-selected": d,
        className: _(
          se.option,
          {
            [se.optionSelected]: d,
            [se.optionHighlighted]: p,
            [se.optionDisabled]: n
          },
          o
        ),
        onClick: () => !n && l(e),
        onMouseEnter: () => !n && h(u),
        ...a,
        children: [
          t,
          d && /* @__PURE__ */ r(
            "svg",
            {
              className: se.checkIcon,
              width: "16",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              children: /* @__PURE__ */ r(
                "path",
                {
                  d: "M13.5 4.5L6 12L2.5 8.5",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                }
              )
            }
          )
        ]
      }
    );
  }
);
yr.displayName = "Combobox";
wr.displayName = "ComboboxTrigger";
xr.displayName = "ComboboxContent";
Dt.displayName = "ComboboxOption";
const Ft = yr;
Ft.Trigger = wr;
Ft.Content = xr;
Ft.Option = Dt;
const cg = "_barChart_1ka6k_2", ig = "_title_1ka6k_31", dg = "_subtitle_1ka6k_36", ug = "_barsContainer_1ka6k_40", _g = "_yAxis_1ka6k_47", mg = "_yAxisLabels_1ka6k_51", hg = "_gridLines_1ka6k_55", pg = "_barWrapper_1ka6k_59", gg = "_header_1ka6k_96", bg = "_chartContainer_1ka6k_121", fg = "_yAxisLabel_1ka6k_51", vg = "_gridLine_1ka6k_55", yg = "_xAxisLabels_1ka6k_207", wg = "_barValue_1ka6k_232", xg = "_bar_1ka6k_2", $g = "_xAxisLabel_1ka6k_207", kg = "_footer_1ka6k_318", Ng = "_dataCount_1ka6k_325", Cg = "_empty_1ka6k_334", Lg = "_emptyState_1ka6k_341", Sg = "_emptyText_1ka6k_345", O = {
  barChart: cg,
  title: ig,
  subtitle: dg,
  barsContainer: ug,
  yAxis: _g,
  yAxisLabels: mg,
  gridLines: hg,
  barWrapper: pg,
  header: gg,
  chartContainer: bg,
  yAxisLabel: fg,
  gridLine: vg,
  xAxisLabels: yg,
  barValue: wg,
  bar: xg,
  xAxisLabel: $g,
  footer: kg,
  dataCount: Ng,
  empty: Cg,
  emptyState: Lg,
  emptyText: Sg
}, Tg = R.forwardRef(
  ({
    data: e,
    title: t,
    subtitle: n,
    height: o = 300,
    showValues: a = !0,
    showGrid: s = !0,
    animated: c = !0,
    size: l = "md",
    variant: i = "default",
    showContainer: h = !1,
    borderStyle: m = "solid",
    className: u,
    style: d,
    ...p
  }, x) => {
    if (!e || e.length === 0)
      return /* @__PURE__ */ r(
        "div",
        {
          ref: x,
          className: `${O.barChart} ${O.empty} ${u || ""}`,
          "data-size": l,
          "data-variant": i,
          style: d,
          ...p,
          children: /* @__PURE__ */ r("div", { className: O.emptyState, children: /* @__PURE__ */ r("span", { className: O.emptyText, children: "NO DATA AVAILABLE" }) })
        }
      );
    const f = Math.max(...e.map((y) => y.value)), $ = {
      sm: { headerHeight: 50, footerHeight: 40, padding: 12 },
      md: { headerHeight: 70, footerHeight: 50, padding: 16 },
      lg: { headerHeight: 90, footerHeight: 60, padding: 24 }
    }[l], C = t || n ? $.headerHeight : 0, L = o - C - $.footerHeight, v = [
      "var(--brutal-accent)",
      "var(--brutal-blue)",
      "var(--brutal-green)",
      "var(--brutal-yellow)",
      "var(--brutal-red)",
      "var(--brutal-orange)",
      "var(--brutal-purple)"
    ];
    return /* @__PURE__ */ k(
      "div",
      {
        ref: x,
        className: `${O.barChart} ${u || ""}`,
        "data-size": l,
        "data-variant": i,
        "data-animated": c,
        "data-show-grid": s,
        "data-show-container": h,
        style: d,
        ...p,
        children: [
          (t || n) && /* @__PURE__ */ k("div", { className: O.header, children: [
            t && /* @__PURE__ */ r("h2", { className: O.title, children: t }),
            n && /* @__PURE__ */ r("p", { className: O.subtitle, children: n })
          ] }),
          /* @__PURE__ */ k(
            "div",
            {
              className: O.chartContainer,
              style: {
                height: `${L}px`,
                minHeight: `${L}px`,
                maxHeight: `${L}px`,
                ...h ? { "--brutal-border-style": m } : {}
              },
              children: [
                s && /* @__PURE__ */ k("div", { className: O.yAxis, children: [
                  /* @__PURE__ */ k("div", { className: O.yAxisLabels, children: [
                    /* @__PURE__ */ r("span", { className: O.yAxisLabel, children: Math.round(f) }),
                    /* @__PURE__ */ r("span", { className: O.yAxisLabel, children: Math.round(f * 0.75) }),
                    /* @__PURE__ */ r("span", { className: O.yAxisLabel, children: Math.round(f * 0.5) }),
                    /* @__PURE__ */ r("span", { className: O.yAxisLabel, children: Math.round(f * 0.25) }),
                    /* @__PURE__ */ r("span", { className: O.yAxisLabel, children: "0" })
                  ] }),
                  /* @__PURE__ */ k("div", { className: O.gridLines, children: [
                    /* @__PURE__ */ r("div", { className: O.gridLine }),
                    /* @__PURE__ */ r("div", { className: O.gridLine }),
                    /* @__PURE__ */ r("div", { className: O.gridLine }),
                    /* @__PURE__ */ r("div", { className: O.gridLine }),
                    /* @__PURE__ */ r("div", { className: O.gridLine })
                  ] })
                ] }),
                /* @__PURE__ */ r("div", { className: O.barsContainer, children: e.map((y, b) => {
                  const N = Math.max(8, y.value / f * L), z = y.color || v[b % v.length];
                  return /* @__PURE__ */ k(
                    "div",
                    {
                      className: O.barWrapper,
                      style: {
                        animationDelay: c ? `${b * 100}ms` : void 0
                      },
                      children: [
                        a && /* @__PURE__ */ r(
                          "div",
                          {
                            className: O.barValue,
                            style: {
                              position: "absolute",
                              bottom: `${N + 5}px`,
                              left: "50%",
                              transform: "translateX(-50%)",
                              zIndex: 3
                            },
                            children: y.value
                          }
                        ),
                        /* @__PURE__ */ r("div", { style: { flex: 1 } }),
                        /* @__PURE__ */ r("div", { style: { width: "100%", display: "flex", justifyContent: "center" }, children: /* @__PURE__ */ r(Ve, { content: `${y.label}: ${y.value}`, children: /* @__PURE__ */ r(
                          "div",
                          {
                            className: O.bar,
                            style: {
                              height: `${N}px`,
                              backgroundColor: z,
                              animationDelay: c ? `${b * 150}ms` : void 0
                            }
                          }
                        ) }) })
                      ]
                    },
                    `${y.label}-${b}`
                  );
                }) })
              ]
            }
          ),
          /* @__PURE__ */ k("div", { className: O.footer, children: [
            /* @__PURE__ */ r("div", { className: O.xAxisLabels, children: e.map((y, b) => /* @__PURE__ */ r(Ve, { content: y.label, children: /* @__PURE__ */ r("div", { className: O.xAxisLabel, children: y.label }) }, `label-${b}`)) }),
            /* @__PURE__ */ k("div", { className: O.dataCount, children: [
              e.length,
              " DATA POINTS"
            ] })
          ] })
        ]
      }
    );
  }
);
Tg.displayName = "BarChart";
const Ig = "_lineChart_opvel_2", Ag = "_title_opvel_35", Eg = "_subtitle_opvel_40", Dg = "_lineContainer_opvel_44", Fg = "_yAxis_opvel_50", Mg = "_yAxisLabels_opvel_54", Bg = "_gridLines_opvel_58", zg = "_xAxisLabels_opvel_62", qg = "_yAxisLabel_opvel_54", Rg = "_xAxisLabel_opvel_62", Pg = "_valueLabel_opvel_69", Hg = "_dataCount_opvel_73", jg = "_gridLine_opvel_58", Wg = "_footer_opvel_179", Gg = "_header_opvel_189", Jg = "_chartContainer_opvel_214", Vg = "_lineSvg_opvel_302", Kg = "_dataPointHover_opvel_310", Og = "_empty_opvel_390", Yg = "_emptyState_opvel_397", Xg = "_emptyText_opvel_401", Ug = "_animatedLine_opvel_439", Zg = "_animatedDot_opvel_445", V = {
  lineChart: Ig,
  title: Ag,
  subtitle: Eg,
  lineContainer: Dg,
  yAxis: Fg,
  yAxisLabels: Mg,
  gridLines: Bg,
  xAxisLabels: zg,
  yAxisLabel: qg,
  xAxisLabel: Rg,
  valueLabel: Pg,
  dataCount: Hg,
  gridLine: jg,
  footer: Wg,
  header: Gg,
  chartContainer: Jg,
  lineSvg: Vg,
  dataPointHover: Kg,
  empty: Og,
  emptyState: Yg,
  emptyText: Xg,
  animatedLine: Ug,
  animatedDot: Zg
}, Qg = R.forwardRef(
  ({
    data: e,
    title: t,
    subtitle: n,
    height: o = 300,
    showValues: a = !0,
    showGrid: s = !0,
    animated: c = !0,
    size: l = "md",
    variant: i = "default",
    showContainer: h = !1,
    borderStyle: m = "solid",
    lineColor: u = "var(--brutal-accent)",
    lineWidth: d = 3,
    showDots: p = !0,
    smooth: x = !1,
    className: f,
    style: g,
    ...$
  }, C) => {
    if (!e || e.length === 0)
      return /* @__PURE__ */ r(
        "div",
        {
          ref: C,
          className: `${V.lineChart} ${V.empty} ${f || ""}`,
          "data-size": l,
          "data-variant": i,
          style: g,
          ...$,
          children: /* @__PURE__ */ r("div", { className: V.emptyState, children: /* @__PURE__ */ r("span", { className: V.emptyText, children: "NO DATA AVAILABLE" }) })
        }
      );
    const L = Math.max(...e.map((F) => F.value)), v = Math.min(...e.map((F) => F.value)), y = L - v, N = {
      sm: { headerHeight: 50, footerHeight: 40, padding: 12 },
      md: { headerHeight: 70, footerHeight: 50, padding: 16 },
      lg: { headerHeight: 90, footerHeight: 60, padding: 24 }
    }[l], z = t || n ? N.headerHeight : 0, S = o - z - N.footerHeight, E = ((F) => {
      if (e.length === 0) return "";
      const M = e.map((I, A) => {
        const T = A / (e.length - 1) * 100, P = 100 - (I.value - v) / y * 100;
        return { x: T, y: P };
      });
      if (F && e.length > 2) {
        let I = `M ${M[0].x} ${M[0].y}`;
        for (let A = 1; A < M.length; A++) {
          const T = M[A - 1].x + (M[A].x - M[A - 1].x) / 3, P = M[A - 1].y, X = M[A].x - (M[A].x - M[A - 1].x) / 3, B = M[A].y;
          I += ` C ${T} ${P}, ${X} ${B}, ${M[A].x} ${M[A].y}`;
        }
        return I;
      } else
        return M.map(
          (I, A) => A === 0 ? `M ${I.x} ${I.y}` : `L ${I.x} ${I.y}`
        ).join(" ");
    })(x);
    return /* @__PURE__ */ k(
      "div",
      {
        ref: C,
        className: `${V.lineChart} ${f || ""}`,
        "data-size": l,
        "data-variant": i,
        "data-animated": c,
        "data-show-grid": s,
        "data-show-container": h,
        style: g,
        ...$,
        children: [
          (t || n) && /* @__PURE__ */ k("div", { className: V.header, children: [
            t && /* @__PURE__ */ r("h2", { className: V.title, children: t }),
            n && /* @__PURE__ */ r("p", { className: V.subtitle, children: n })
          ] }),
          /* @__PURE__ */ k(
            "div",
            {
              className: V.chartContainer,
              style: {
                height: `${S}px`,
                minHeight: `${S}px`,
                maxHeight: `${S}px`,
                ...h ? { "--brutal-border-style": m } : {}
              },
              children: [
                s && /* @__PURE__ */ k("div", { className: V.yAxis, children: [
                  /* @__PURE__ */ k("div", { className: V.yAxisLabels, children: [
                    /* @__PURE__ */ r("span", { className: V.yAxisLabel, children: Math.round(L) }),
                    /* @__PURE__ */ r("span", { className: V.yAxisLabel, children: Math.round(L * 0.75 + v * 0.25) }),
                    /* @__PURE__ */ r("span", { className: V.yAxisLabel, children: Math.round(L * 0.5 + v * 0.5) }),
                    /* @__PURE__ */ r("span", { className: V.yAxisLabel, children: Math.round(L * 0.25 + v * 0.75) }),
                    /* @__PURE__ */ r("span", { className: V.yAxisLabel, children: Math.round(v) })
                  ] }),
                  /* @__PURE__ */ k("div", { className: V.gridLines, children: [
                    /* @__PURE__ */ r("div", { className: V.gridLine }),
                    /* @__PURE__ */ r("div", { className: V.gridLine }),
                    /* @__PURE__ */ r("div", { className: V.gridLine }),
                    /* @__PURE__ */ r("div", { className: V.gridLine }),
                    /* @__PURE__ */ r("div", { className: V.gridLine })
                  ] })
                ] }),
                /* @__PURE__ */ k("div", { className: V.lineContainer, children: [
                  /* @__PURE__ */ k(
                    "svg",
                    {
                      className: V.lineSvg,
                      viewBox: "0 0 100 100",
                      preserveAspectRatio: "none",
                      children: [
                        /* @__PURE__ */ r(
                          "path",
                          {
                            d: E,
                            fill: "none",
                            stroke: u,
                            strokeWidth: d / 10,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            className: c ? V.animatedLine : ""
                          }
                        ),
                        p && e.map((F, M) => {
                          const I = M / (e.length - 1) * 100, A = 100 - (F.value - v) / y * 100, T = 4;
                          return /* @__PURE__ */ r(
                            "rect",
                            {
                              x: I - T / 2,
                              y: A - T / 2,
                              width: T,
                              height: T,
                              fill: F.color || u,
                              stroke: "none",
                              className: c ? V.animatedDot : "",
                              style: { animationDelay: c ? `${M * 100}ms` : void 0 }
                            },
                            `dot-${M}`
                          );
                        })
                      ]
                    }
                  ),
                  e.map((F, M) => {
                    const I = M / (e.length - 1) * 100, A = 100 - (F.value - v) / y * 100;
                    return /* @__PURE__ */ r(Ve, { content: `${F.label}: ${F.value}`, children: /* @__PURE__ */ r(
                      "div",
                      {
                        className: V.dataPointHover,
                        style: {
                          left: `${I}%`,
                          top: `${A}%`,
                          transform: "translate(-50%, -50%)"
                        }
                      }
                    ) }, `tooltip-${M}`);
                  }),
                  a && e.map((F, M) => {
                    const I = M / (e.length - 1) * 100, A = 100 - (F.value - v) / y * 100;
                    return /* @__PURE__ */ r(
                      "div",
                      {
                        className: V.valueLabel,
                        style: {
                          left: `${I}%`,
                          top: `${A}%`,
                          transform: "translate(-50%, -150%)",
                          animationDelay: c ? `${M * 150}ms` : void 0
                        },
                        children: F.value
                      },
                      `value-${M}`
                    );
                  })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ k("div", { className: V.footer, children: [
            /* @__PURE__ */ r("div", { className: V.xAxisLabels, children: e.map((F, M) => /* @__PURE__ */ r(Ve, { content: F.label, children: /* @__PURE__ */ r("div", { className: V.xAxisLabel, children: F.label }) }, `label-${M}`)) }),
            /* @__PURE__ */ k("div", { className: V.dataCount, children: [
              e.length,
              " DATA POINTS"
            ] })
          ] })
        ]
      }
    );
  }
);
Qg.displayName = "LineChart";
const eb = "_pieChart_115kp_3", tb = "_title_115kp_20", nb = "_legendItem_115kp_25", rb = "_legendColor_115kp_31", ob = "_legendLabel_115kp_74", ab = "_legendValue_115kp_75", sb = "_header_115kp_82", lb = "_subtitle_115kp_100", cb = "_chartContainer_115kp_112", ib = "_pieSvg_115kp_129", db = "_animatedSlice_115kp_134", ub = "_valueLabel_115kp_152", _b = "_sliceHover_115kp_184", mb = "_legend_115kp_25", hb = "_dataCount_115kp_239", pb = "_empty_115kp_252", gb = "_emptyState_115kp_261", bb = "_emptyText_115kp_265", oe = {
  pieChart: eb,
  title: tb,
  legendItem: nb,
  legendColor: rb,
  legendLabel: ob,
  legendValue: ab,
  header: sb,
  subtitle: lb,
  chartContainer: cb,
  pieSvg: ib,
  animatedSlice: db,
  valueLabel: ub,
  sliceHover: _b,
  legend: mb,
  dataCount: hb,
  empty: pb,
  emptyState: gb,
  emptyText: bb
}, fb = R.forwardRef(
  ({
    data: e,
    title: t,
    subtitle: n,
    size: o = 300,
    showValues: a = !0,
    showLabels: s = !0,
    animated: c = !0,
    variant: l = "default",
    showContainer: i = !1,
    borderStyle: h = "solid",
    strokeWidth: m = 2,
    className: u,
    style: d,
    ...p
  }, x) => {
    if (!e || e.length === 0)
      return /* @__PURE__ */ r(
        "div",
        {
          ref: x,
          className: `${oe.pieChart} ${oe.empty} ${u || ""}`,
          "data-variant": l,
          style: d,
          ...p,
          children: /* @__PURE__ */ r("div", { className: oe.emptyState, children: /* @__PURE__ */ r("span", { className: oe.emptyText, children: "NO DATA AVAILABLE" }) })
        }
      );
    const f = e.reduce((b, N) => b + N.value, 0), g = (o - 40) / 2, $ = o / 2, C = o / 2;
    let L = 0;
    const v = e.map((b, N) => {
      const z = b.value / f * 100, S = b.value / f * 360, D = L, E = L + S, F = (D - 90) * (Math.PI / 180), M = (E - 90) * (Math.PI / 180), I = $ + g * Math.cos(F), A = C + g * Math.sin(F), T = $ + g * Math.cos(M), P = C + g * Math.sin(M), X = S > 180 ? 1 : 0, B = [
        `M ${$} ${C}`,
        `L ${I} ${A}`,
        `A ${g} ${g} 0 ${X} 1 ${T} ${P}`,
        "Z"
      ].join(" "), H = (D + S / 2 - 90) * (Math.PI / 180), ee = g * 0.7, ne = $ + ee * Math.cos(H), Oe = C + ee * Math.sin(H);
      return L += S, {
        path: B,
        color: b.color || `hsl(${N * 360 / e.length}, 70%, 50%)`,
        percentage: z,
        labelX: ne,
        labelY: Oe,
        item: b,
        angle: S
      };
    }), y = [
      "#FF0000",
      "#0066FF",
      "#00FF41",
      "#FFFF00",
      "#FF6600",
      "#9900FF",
      "#00FFFF",
      "#FF0099"
    ];
    return /* @__PURE__ */ k(
      "div",
      {
        ref: x,
        className: `${oe.pieChart} ${u || ""}`,
        "data-variant": l,
        "data-animated": c,
        "data-show-container": i,
        style: d,
        ...p,
        children: [
          (t || n) && /* @__PURE__ */ k("div", { className: oe.header, children: [
            t && /* @__PURE__ */ r("h2", { className: oe.title, children: t }),
            n && /* @__PURE__ */ r("p", { className: oe.subtitle, children: n })
          ] }),
          /* @__PURE__ */ k(
            "div",
            {
              className: oe.chartContainer,
              style: {
                ...i ? { "--brutal-border-style": h } : {},
                width: `${o}px`,
                height: `${o}px`
              },
              children: [
                /* @__PURE__ */ r(
                  "svg",
                  {
                    className: oe.pieSvg,
                    width: o,
                    height: o,
                    viewBox: `0 0 ${o} ${o}`,
                    children: v.map((b, N) => /* @__PURE__ */ k("g", { children: [
                      /* @__PURE__ */ r(
                        "path",
                        {
                          d: b.path,
                          fill: b.item.color || y[N % y.length],
                          stroke: "var(--brutal-white)",
                          strokeWidth: m,
                          className: c ? oe.animatedSlice : "",
                          style: { animationDelay: c ? `${N * 150}ms` : void 0 }
                        }
                      ),
                      a && b.percentage > 5 && /* @__PURE__ */ k(
                        "text",
                        {
                          x: b.labelX,
                          y: b.labelY,
                          textAnchor: "middle",
                          dominantBaseline: "middle",
                          className: oe.valueLabel,
                          style: { animationDelay: c ? `${N * 200}ms` : void 0 },
                          children: [
                            Math.round(b.percentage),
                            "%"
                          ]
                        }
                      )
                    ] }, `slice-${N}`))
                  }
                ),
                v.map((b, N) => /* @__PURE__ */ r(
                  Ve,
                  {
                    content: `${b.item.label}: ${b.item.value} (${Math.round(b.percentage)}%)`,
                    children: /* @__PURE__ */ r(
                      "div",
                      {
                        className: oe.sliceHover,
                        style: {
                          position: "absolute",
                          left: `${b.labelX - 20}px`,
                          top: `${b.labelY - 20}px`,
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%"
                        }
                      }
                    )
                  },
                  `tooltip-${N}`
                ))
              ]
            }
          ),
          s && /* @__PURE__ */ r("div", { className: oe.legend, children: e.map((b, N) => /* @__PURE__ */ k("div", { className: oe.legendItem, children: [
            /* @__PURE__ */ r(
              "div",
              {
                className: oe.legendColor,
                style: {
                  backgroundColor: b.color || y[N % y.length]
                }
              }
            ),
            /* @__PURE__ */ r("span", { className: oe.legendLabel, children: b.label }),
            /* @__PURE__ */ r("span", { className: oe.legendValue, children: b.value })
          ] }, `legend-${N}`)) }),
          /* @__PURE__ */ k("div", { className: oe.dataCount, children: [
            e.length,
            " DATA SEGMENTS • TOTAL: ",
            f
          ] })
        ]
      }
    );
  }
);
fb.displayName = "PieChart";
const vb = "_areaChart_zuq85_3", yb = "_header_zuq85_59", wb = "_title_zuq85_67", xb = "_subtitle_zuq85_83", $b = "_chartContainer_zuq85_95", kb = "_yAxis_zuq85_111", Nb = "_yAxisLabels_zuq85_123", Cb = "_yAxisLabel_zuq85_123", Lb = "_gridLines_zuq85_142", Sb = "_gridLine_zuq85_142", Tb = "_areaContainer_zuq85_163", Ib = "_areaSvg_zuq85_170", Ab = "_animatedArea_zuq85_182", Eb = "_animatedLine_zuq85_198", Db = "_animatedDot_zuq85_210", Fb = "_dataPointHover_zuq85_228", Mb = "_valueLabel_zuq85_243", Bb = "_footer_zuq85_290", zb = "_xAxisLabels_zuq85_297", qb = "_xAxisLabel_zuq85_297", Rb = "_dataCount_zuq85_323", Pb = "_empty_zuq85_335", Hb = "_emptyState_zuq85_344", jb = "_emptyText_zuq85_348", G = {
  areaChart: vb,
  header: yb,
  title: wb,
  subtitle: xb,
  chartContainer: $b,
  yAxis: kb,
  yAxisLabels: Nb,
  yAxisLabel: Cb,
  gridLines: Lb,
  gridLine: Sb,
  areaContainer: Tb,
  areaSvg: Ib,
  animatedArea: Ab,
  animatedLine: Eb,
  animatedDot: Db,
  dataPointHover: Fb,
  valueLabel: Mb,
  footer: Bb,
  xAxisLabels: zb,
  xAxisLabel: qb,
  dataCount: Rb,
  empty: Pb,
  emptyState: Hb,
  emptyText: jb
}, Wb = R.forwardRef(
  ({
    data: e,
    title: t,
    subtitle: n,
    height: o = 300,
    showValues: a = !0,
    showGrid: s = !0,
    animated: c = !0,
    size: l = "md",
    variant: i = "default",
    showContainer: h = !1,
    borderStyle: m = "solid",
    fillColor: u = "var(--brutal-accent)",
    lineColor: d = "var(--brutal-accent)",
    lineWidth: p = 3,
    showDots: x = !0,
    smooth: f = !1,
    fillOpacity: g = 0.3,
    className: $,
    style: C,
    ...L
  }, v) => {
    if (!e || e.length === 0)
      return /* @__PURE__ */ r(
        "div",
        {
          ref: v,
          className: `${G.areaChart} ${G.empty} ${$ || ""}`,
          "data-size": l,
          "data-variant": i,
          style: C,
          ...L,
          children: /* @__PURE__ */ r("div", { className: G.emptyState, children: /* @__PURE__ */ r("span", { className: G.emptyText, children: "NO DATA AVAILABLE" }) })
        }
      );
    const y = Math.max(...e.map((A) => A.value)), b = Math.min(...e.map((A) => A.value)), N = y - b, S = {
      sm: { headerHeight: 50, footerHeight: 40, padding: 12 },
      md: { headerHeight: 70, footerHeight: 50, padding: 16 },
      lg: { headerHeight: 90, footerHeight: 60, padding: 24 }
    }[l], D = t || n ? S.headerHeight : 0, E = o - D - S.footerHeight, F = (A) => {
      if (e.length === 0) return { linePath: "", areaPath: "" };
      const T = e.map((B, H) => {
        const ee = H / (e.length - 1) * 100, ne = 100 - (B.value - b) / N * 100;
        return { x: ee, y: ne };
      });
      let P = "";
      if (A && e.length > 2) {
        P = `M ${T[0].x} ${T[0].y}`;
        for (let B = 1; B < T.length; B++) {
          const H = T[B - 1].x + (T[B].x - T[B - 1].x) / 3, ee = T[B - 1].y, ne = T[B].x - (T[B].x - T[B - 1].x) / 3, Oe = T[B].y;
          P += ` C ${H} ${ee}, ${ne} ${Oe}, ${T[B].x} ${T[B].y}`;
        }
      } else
        P = T.map(
          (B, H) => H === 0 ? `M ${B.x} ${B.y}` : `L ${B.x} ${B.y}`
        ).join(" ");
      const X = P + ` L ${T[T.length - 1].x} 100 L ${T[0].x} 100 Z`;
      return { linePath: P, areaPath: X };
    }, { linePath: M, areaPath: I } = F(f);
    return /* @__PURE__ */ k(
      "div",
      {
        ref: v,
        className: `${G.areaChart} ${$ || ""}`,
        "data-size": l,
        "data-variant": i,
        "data-animated": c,
        "data-show-grid": s,
        "data-show-container": h,
        style: C,
        ...L,
        children: [
          (t || n) && /* @__PURE__ */ k("div", { className: G.header, children: [
            t && /* @__PURE__ */ r("h2", { className: G.title, children: t }),
            n && /* @__PURE__ */ r("p", { className: G.subtitle, children: n })
          ] }),
          /* @__PURE__ */ k(
            "div",
            {
              className: G.chartContainer,
              style: {
                height: `${E}px`,
                minHeight: `${E}px`,
                maxHeight: `${E}px`,
                ...h ? { "--brutal-border-style": m } : {}
              },
              children: [
                s && /* @__PURE__ */ k("div", { className: G.yAxis, children: [
                  /* @__PURE__ */ k("div", { className: G.yAxisLabels, children: [
                    /* @__PURE__ */ r("span", { className: G.yAxisLabel, children: Math.round(y) }),
                    /* @__PURE__ */ r("span", { className: G.yAxisLabel, children: Math.round(y * 0.75 + b * 0.25) }),
                    /* @__PURE__ */ r("span", { className: G.yAxisLabel, children: Math.round(y * 0.5 + b * 0.5) }),
                    /* @__PURE__ */ r("span", { className: G.yAxisLabel, children: Math.round(y * 0.25 + b * 0.75) }),
                    /* @__PURE__ */ r("span", { className: G.yAxisLabel, children: Math.round(b) })
                  ] }),
                  /* @__PURE__ */ k("div", { className: G.gridLines, children: [
                    /* @__PURE__ */ r("div", { className: G.gridLine }),
                    /* @__PURE__ */ r("div", { className: G.gridLine }),
                    /* @__PURE__ */ r("div", { className: G.gridLine }),
                    /* @__PURE__ */ r("div", { className: G.gridLine }),
                    /* @__PURE__ */ r("div", { className: G.gridLine })
                  ] })
                ] }),
                /* @__PURE__ */ k("div", { className: G.areaContainer, children: [
                  /* @__PURE__ */ k(
                    "svg",
                    {
                      className: G.areaSvg,
                      viewBox: "0 0 100 100",
                      preserveAspectRatio: "none",
                      children: [
                        /* @__PURE__ */ r(
                          "path",
                          {
                            d: I,
                            fill: u,
                            fillOpacity: g,
                            className: c ? G.animatedArea : ""
                          }
                        ),
                        /* @__PURE__ */ r(
                          "path",
                          {
                            d: M,
                            fill: "none",
                            stroke: d,
                            strokeWidth: p / 10,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            className: c ? G.animatedLine : ""
                          }
                        ),
                        x && e.map((A, T) => {
                          const P = T / (e.length - 1) * 100, X = 100 - (A.value - b) / N * 100, B = 4;
                          return /* @__PURE__ */ r(
                            "rect",
                            {
                              x: P - B / 2,
                              y: X - B / 2,
                              width: B,
                              height: B,
                              fill: A.color || d,
                              stroke: "none",
                              className: c ? G.animatedDot : "",
                              style: { animationDelay: c ? `${T * 100}ms` : void 0 }
                            },
                            `dot-${T}`
                          );
                        })
                      ]
                    }
                  ),
                  e.map((A, T) => {
                    const P = T / (e.length - 1) * 100, X = 100 - (A.value - b) / N * 100;
                    return /* @__PURE__ */ r(Ve, { content: `${A.label}: ${A.value}`, children: /* @__PURE__ */ r(
                      "div",
                      {
                        className: G.dataPointHover,
                        style: {
                          left: `${P}%`,
                          top: `${X}%`,
                          transform: "translate(-50%, -50%)"
                        }
                      }
                    ) }, `tooltip-${T}`);
                  }),
                  a && e.map((A, T) => {
                    const P = T / (e.length - 1) * 100, X = 100 - (A.value - b) / N * 100;
                    return /* @__PURE__ */ r(
                      "div",
                      {
                        className: G.valueLabel,
                        style: {
                          left: `${P}%`,
                          top: `${X}%`,
                          transform: "translate(-50%, -150%)",
                          animationDelay: c ? `${T * 150}ms` : void 0
                        },
                        children: A.value
                      },
                      `value-${T}`
                    );
                  })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ k("div", { className: G.footer, children: [
            /* @__PURE__ */ r("div", { className: G.xAxisLabels, children: e.map((A, T) => /* @__PURE__ */ r(Ve, { content: A.label, children: /* @__PURE__ */ r("div", { className: G.xAxisLabel, children: A.label }) }, `label-${T}`)) }),
            /* @__PURE__ */ k("div", { className: G.dataCount, children: [
              e.length,
              " DATA POINTS"
            ] })
          ] })
        ]
      }
    );
  }
);
Wb.displayName = "AreaChart";
const Gb = "_container_metbw_3", Jb = "_sizer_metbw_17", Vb = "_content_metbw_22", yt = {
  container: Gb,
  sizer: Jb,
  content: Vb
}, Kb = w(
  ({
    ratio: e = 16 / 9,
    children: t,
    className: n,
    objectFit: o = "cover",
    backgroundColor: a,
    style: s,
    ...c
  }, l) => {
    const i = `${1 / e * 100}%`;
    return /* @__PURE__ */ k(
      "div",
      {
        ref: l,
        className: _(yt.container, n),
        style: {
          ...s,
          backgroundColor: a
        },
        "data-object-fit": o,
        ...c,
        children: [
          /* @__PURE__ */ r(
            "div",
            {
              className: yt.sizer,
              style: { paddingBottom: i }
            }
          ),
          /* @__PURE__ */ r("div", { className: yt.content, children: t })
        ]
      }
    );
  }
);
Kb.displayName = "AspectRatio";
const Ob = "_pagination_2clry_3", Yb = "_list_2clry_20", Xb = "_item_2clry_30", Ub = "_dots_2clry_60", Zb = "_active_2clry_73", Qb = "_nav_2clry_92", ef = "_navIcon_2clry_97", tf = "_navText_2clry_102", nf = "_disabled_2clry_115", rf = "_sm_2clry_131", of = "_lg_2clry_143", U = {
  pagination: Ob,
  list: Yb,
  item: Xb,
  dots: Ub,
  active: Zb,
  nav: Qb,
  navIcon: ef,
  navText: tf,
  disabled: nf,
  sm: rf,
  lg: of
}, rt = "...";
function af(e, t, n, o) {
  return Lo(() => {
    if (n * 2 + 5 + o * 2 >= t)
      return Array.from({ length: t }, (u, d) => d + 1);
    const s = Math.max(e - n, 1), c = Math.min(e + n, t), l = s > o + 2, i = c < t - o - 1, h = Array.from({ length: o }, (u, d) => d + 1), m = Array.from({ length: o }, (u, d) => t - o + d + 1);
    if (!l && i) {
      const u = 3 + 2 * n;
      return [...Array.from({ length: u }, (p, x) => x + 1), rt, ...m];
    }
    if (l && !i) {
      const u = 3 + 2 * n, d = Array.from(
        { length: u },
        (p, x) => t - u + x + 1
      );
      return [...h, rt, ...d];
    }
    if (l && i) {
      const u = Array.from(
        { length: c - s + 1 },
        (d, p) => s + p
      );
      return [...h, rt, ...u, rt, ...m];
    }
    return [];
  }, [e, t, n, o]);
}
const sf = w(
  ({
    currentPage: e,
    totalPages: t,
    siblingCount: n = 1,
    boundaryCount: o = 1,
    onChange: a,
    showPrevNext: s = !0,
    showFirstLast: c = !1,
    labels: l = {
      previous: "Previous",
      next: "Next",
      first: "First",
      last: "Last"
    },
    size: i = "md",
    className: h,
    disabled: m = !1,
    ...u
  }, d) => {
    const p = af(e, t, n, o), x = (f) => {
      !m && a && f !== e && f >= 1 && f <= t && a(f);
    };
    return t <= 1 ? null : /* @__PURE__ */ r(
      "nav",
      {
        ref: d,
        className: _(
          U.pagination,
          U[i],
          m && U.disabled,
          h
        ),
        "aria-label": "Pagination Navigation",
        ...u,
        children: /* @__PURE__ */ k("ul", { className: U.list, children: [
          c && /* @__PURE__ */ r("li", { children: /* @__PURE__ */ k(
            "button",
            {
              className: _(U.item, U.nav),
              onClick: () => x(1),
              disabled: m || e === 1,
              "aria-label": l.first,
              type: "button",
              children: [
                /* @__PURE__ */ r("span", { className: U.navIcon, children: "«" }),
                /* @__PURE__ */ r("span", { className: U.navText, children: l.first })
              ]
            }
          ) }),
          s && /* @__PURE__ */ r("li", { children: /* @__PURE__ */ k(
            "button",
            {
              className: _(U.item, U.nav),
              onClick: () => x(e - 1),
              disabled: m || e === 1,
              "aria-label": l.previous,
              type: "button",
              children: [
                /* @__PURE__ */ r("span", { className: U.navIcon, children: "‹" }),
                /* @__PURE__ */ r("span", { className: U.navText, children: l.previous })
              ]
            }
          ) }),
          p.map((f, g) => f === rt ? /* @__PURE__ */ r("li", { children: /* @__PURE__ */ r("span", { className: _(U.item, U.dots), children: "..." }) }, `dots-${g}`) : /* @__PURE__ */ r("li", { children: /* @__PURE__ */ r(
            "button",
            {
              className: _(
                U.item,
                U.page,
                f === e && U.active
              ),
              onClick: () => x(f),
              disabled: m,
              "aria-label": `Go to page ${f}`,
              "aria-current": f === e ? "page" : void 0,
              type: "button",
              children: f
            }
          ) }, f)),
          s && /* @__PURE__ */ r("li", { children: /* @__PURE__ */ k(
            "button",
            {
              className: _(U.item, U.nav),
              onClick: () => x(e + 1),
              disabled: m || e === t,
              "aria-label": l.next,
              type: "button",
              children: [
                /* @__PURE__ */ r("span", { className: U.navText, children: l.next }),
                /* @__PURE__ */ r("span", { className: U.navIcon, children: "›" })
              ]
            }
          ) }),
          c && /* @__PURE__ */ r("li", { children: /* @__PURE__ */ k(
            "button",
            {
              className: _(U.item, U.nav),
              onClick: () => x(t),
              disabled: m || e === t,
              "aria-label": l.last,
              type: "button",
              children: [
                /* @__PURE__ */ r("span", { className: U.navText, children: l.last }),
                /* @__PURE__ */ r("span", { className: U.navIcon, children: "»" })
              ]
            }
          ) })
        ] })
      }
    );
  }
);
sf.displayName = "Pagination";
const lf = "_backdrop_omatw_8", cf = "_trigger_omatw_15", df = "_content_omatw_23", uf = "_item_omatw_66", _f = "_separator_omatw_75", mf = "_subTrigger_omatw_79", hf = "_label_omatw_88", pf = "_shortcut_omatw_92", gf = "_indicator_omatw_96", bf = "_subTriggerIcon_omatw_238", ff = "_subContent_omatw_278", vf = "_icon_omatw_314", yf = "_itemText_omatw_337", te = {
  backdrop: lf,
  trigger: cf,
  content: df,
  item: uf,
  separator: _f,
  subTrigger: mf,
  label: hf,
  shortcut: pf,
  indicator: gf,
  subTriggerIcon: bf,
  subContent: ff,
  icon: vf,
  itemText: yf
}, Mt = ue(void 0);
function et() {
  const e = Y(Mt);
  if (!e)
    throw new Error("ContextMenu components must be used within ContextMenu");
  return e;
}
const $r = w(
  ({ children: e, className: t, size: n = "md", variant: o = "default", onOpenChange: a }, s) => {
    const [c, l] = q(!1), [i, h] = q(null), m = W((p) => {
      p.preventDefault(), p.stopPropagation(), h({ x: p.clientX, y: p.clientY }), l(!0), a == null || a(!0), document.body.style.overflow = "hidden", document.body.style.userSelect = "none";
    }, [a]), u = W(() => {
      l(!1), h(null), a == null || a(!1), document.body.style.overflow = "", document.body.style.userSelect = "";
    }, [a]);
    j(() => {
      const p = (x) => {
        x.key === "Escape" && c && u();
      };
      if (c)
        return document.addEventListener("keydown", p), () => document.removeEventListener("keydown", p);
    }, [c, u]), j(() => () => {
      c && (document.body.style.overflow = "", document.body.style.userSelect = "");
    }, [c]);
    const d = {
      isOpen: c,
      position: i,
      onOpen: m,
      onClose: u,
      size: n,
      variant: o
    };
    return /* @__PURE__ */ r(Mt.Provider, { value: d, children: /* @__PURE__ */ r("div", { ref: s, className: _(te.root, t), children: e }) });
  }
), kr = w(
  ({ children: e, className: t, asChild: n = !1 }, o) => {
    const { onOpen: a } = et();
    return n && R.isValidElement(e) ? R.cloneElement(e, {
      onContextMenu: a,
      ref: o
    }) : /* @__PURE__ */ r(
      "div",
      {
        ref: o,
        className: _(te.trigger, t),
        onContextMenu: a,
        children: e
      }
    );
  }
), Bt = w(
  ({
    children: e,
    className: t,
    align: n = "start",
    sideOffset: o = 5,
    alignOffset: a = 0,
    collisionPadding: s = 8,
    avoidCollisions: c = !0,
    container: l,
    size: i,
    variant: h,
    ...m
  }, u) => {
    const { isOpen: d, position: p, onClose: x, size: f, variant: g } = et(), $ = i || f, C = h || g, L = K(null), [v, y] = q(p);
    if (j(() => {
      if (!p || !L.current || !c) {
        y(p);
        return;
      }
      const N = L.current.getBoundingClientRect(), z = window.innerWidth, S = window.innerHeight;
      let D = p.x + o, E = p.y + o;
      switch (D + N.width > z - s && (D = p.x - N.width - o), D < s && (D = s), E + N.height > S - s && (E = p.y - N.height - o), E < s && (E = s), n) {
        case "center":
          D = p.x - N.width / 2;
          break;
        case "end":
          D = p.x - N.width;
          break;
      }
      D += a, y({ x: D, y: E });
    }, [p, n, a, o, s, c]), !d || !v) return null;
    const b = /* @__PURE__ */ k(be, { children: [
      /* @__PURE__ */ r(
        "div",
        {
          className: te.backdrop,
          onClick: x,
          onContextMenu: (N) => N.preventDefault(),
          style: {
            position: "fixed",
            inset: 0,
            zIndex: 9998,
            cursor: "default",
            pointerEvents: "auto"
          }
        }
      ),
      /* @__PURE__ */ r(
        "div",
        {
          ref: (N) => {
            L.current = N, typeof u == "function" ? u(N) : u && (u.current = N);
          },
          className: _(
            te.content,
            t
          ),
          "data-size": $,
          "data-variant": C,
          style: {
            position: "fixed",
            left: `${v.x}px`,
            top: `${v.y}px`,
            zIndex: 9999,
            ...m.style
          },
          role: "menu",
          "aria-orientation": "vertical",
          onMouseEnter: m.onMouseEnter,
          onMouseLeave: m.onMouseLeave,
          children: e
        }
      )
    ] });
    return je(b, l || document.body);
  }
), Nr = w(
  ({ children: e, className: t, disabled: n = !1, destructive: o = !1, onSelect: a, closeOnSelect: s = !0, icon: c, shortcut: l, checked: i, dotted: h }, m) => {
    const { onClose: u } = et(), [d, p] = q(!1), x = (g) => {
      if (console.log("Context menu item clicked", { disabled: n, children: e }), n) {
        g.preventDefault();
        return;
      }
      g.stopPropagation(), a == null || a(g), s && !g.defaultPrevented && u();
    }, f = (g) => {
      n || (g.key === "Enter" || g.key === " ") && (g.preventDefault(), x(g));
    };
    return /* @__PURE__ */ k(
      "div",
      {
        ref: m,
        className: _(
          te.item,
          n && te.itemDisabled,
          o && te.itemDestructive,
          t
        ),
        role: "menuitem",
        tabIndex: n ? -1 : 0,
        "aria-disabled": n,
        "aria-checked": i,
        "data-highlighted": d,
        "data-disabled": n,
        "data-destructive": o,
        onClick: x,
        onKeyDown: f,
        onMouseEnter: () => p(!0),
        onMouseLeave: () => p(!1),
        children: [
          (i || h) && /* @__PURE__ */ r("span", { className: te.indicator, children: i ? "✓" : "•" }),
          c && /* @__PURE__ */ r("span", { className: te.icon, children: c }),
          /* @__PURE__ */ r("span", { className: te.itemText, children: e }),
          l && /* @__PURE__ */ r("span", { className: te.shortcut, children: l })
        ]
      }
    );
  }
), Cr = w(
  ({ className: e }, t) => /* @__PURE__ */ r(
    "div",
    {
      ref: t,
      className: _(te.separator, e),
      role: "separator",
      "aria-orientation": "horizontal"
    }
  )
), Lr = w(
  ({ children: e, className: t }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: _(te.label, t),
      role: "presentation",
      children: e
    }
  )
), Sr = w(
  ({ children: e, className: t, open: n, onOpenChange: o }, a) => {
    const s = et(), [c, l] = q(!1), [i, h] = q(null), m = n !== void 0 ? n : c, u = K(), d = K(), p = ($) => {
      n === void 0 && l($), o == null || o($);
    }, x = ($) => {
      clearTimeout(d.current);
      const C = $.currentTarget;
      u.current = setTimeout(() => {
        const L = C.getBoundingClientRect();
        h({ x: L.right - 4, y: L.top - 4 }), p(!0);
      }, 100);
    }, f = () => {
      clearTimeout(d.current);
    }, g = () => {
      clearTimeout(u.current), d.current = setTimeout(() => {
        p(!1);
      }, 300);
    };
    return j(() => () => {
      clearTimeout(u.current), clearTimeout(d.current);
    }, []), /* @__PURE__ */ r(Mt.Provider, { value: {
      isOpen: m,
      position: i,
      onOpen: x,
      onClose: g,
      onKeepOpen: f,
      size: s.size,
      variant: s.variant
    }, children: /* @__PURE__ */ r(
      "div",
      {
        ref: a,
        className: t,
        onMouseEnter: () => {
          clearTimeout(d.current), clearTimeout(u.current);
        },
        onMouseLeave: () => g(),
        children: e
      }
    ) });
  }
), Tr = w(
  ({ children: e, className: t, disabled: n = !1, icon: o }, a) => {
    const { onOpen: s, onClose: c, isOpen: l } = et(), [i, h] = q(!1), m = (d) => {
      h(!0), n || s(d);
    }, u = () => {
      h(!1), c();
    };
    return /* @__PURE__ */ k(
      "div",
      {
        ref: a,
        className: _(
          te.subTrigger,
          n && te.itemDisabled,
          l && te.subTriggerOpen,
          t
        ),
        role: "menuitem",
        "aria-haspopup": "menu",
        "aria-expanded": l,
        "aria-disabled": n,
        "data-highlighted": i,
        "data-disabled": n,
        "data-state": l ? "open" : "closed",
        onMouseEnter: m,
        onMouseLeave: u,
        children: [
          o && /* @__PURE__ */ r("span", { className: te.icon, children: o }),
          /* @__PURE__ */ r("span", { className: te.itemText, children: e }),
          /* @__PURE__ */ r("span", { className: te.subTriggerIcon, "aria-hidden": "true", children: "▶" })
        ]
      }
    );
  }
), Ir = w(
  ({ className: e, onMouseEnter: t, onMouseLeave: n, ...o }, a) => {
    const s = et(), c = K(null), l = () => {
      var h;
      (h = s.onKeepOpen) == null || h.call(s), t == null || t();
    }, i = () => {
      n == null || n(), s.onClose();
    };
    return /* @__PURE__ */ r(
      Bt,
      {
        ...o,
        ref: (h) => {
          c.current = h, typeof a == "function" ? a(h) : a && (a.current = h);
        },
        className: _(te.subContent, e),
        onMouseEnter: l,
        onMouseLeave: i
      }
    );
  }
);
$r.displayName = "ContextMenu";
kr.displayName = "ContextMenu.Trigger";
Bt.displayName = "ContextMenu.Content";
Nr.displayName = "ContextMenu.Item";
Cr.displayName = "ContextMenu.Separator";
Lr.displayName = "ContextMenu.Label";
Sr.displayName = "ContextMenu.Sub";
Tr.displayName = "ContextMenu.SubTrigger";
Ir.displayName = "ContextMenu.SubContent";
const C0 = Object.assign($r, {
  Trigger: kr,
  Content: Bt,
  Item: Nr,
  Separator: Cr,
  Label: Lr,
  Sub: Sr,
  SubTrigger: Tr,
  SubContent: Ir
}), wf = "_trigger_1lh36_2", xf = "_overlay_1lh36_31", $f = "_fadeIn_1lh36_1", kf = "_content_1lh36_57", Nf = "_header_1lh36_187", Cf = "_title_1lh36_204", Lf = "_description_1lh36_215", Sf = "_footer_1lh36_225", Tf = "_close_1lh36_245", Fe = {
  trigger: wf,
  overlay: xf,
  fadeIn: $f,
  content: kf,
  "side-left": "_side-left_1lh36_77",
  "side-right": "_side-right_1lh36_90",
  "side-top": "_side-top_1lh36_103",
  "side-bottom": "_side-bottom_1lh36_116",
  "size-sm": "_size-sm_1lh36_130",
  "size-md": "_size-md_1lh36_134",
  "size-lg": "_size-lg_1lh36_138",
  "size-xl": "_size-xl_1lh36_142",
  "size-full": "_size-full_1lh36_146",
  "variant-default": "_variant-default_1lh36_164",
  "variant-brutal": "_variant-brutal_1lh36_171",
  "variant-outline": "_variant-outline_1lh36_178",
  header: Nf,
  title: Cf,
  description: Lf,
  footer: Sf,
  close: Tf
}, Ar = ue(null), zt = () => {
  const e = Y(Ar);
  if (!e)
    throw new Error("Sheet components must be used within a Sheet");
  return e;
}, Er = R.forwardRef(
  ({
    open: e,
    defaultOpen: t = !1,
    onOpenChange: n,
    className: o,
    children: a,
    ...s
  }, c) => {
    const [l, i] = q(e ?? t);
    j(() => {
      e !== void 0 && i(e);
    }, [e]);
    const h = W((u) => {
      i(u), n == null || n(u);
    }, [n]), m = {
      open: l,
      setOpen: h
    };
    return /* @__PURE__ */ r(Ar.Provider, { value: m, children: /* @__PURE__ */ r("div", { ref: c, className: o, ...s, children: a }) });
  }
), Dr = R.forwardRef(
  ({ children: e, className: t, asChild: n = !1, ...o }, a) => {
    const { setOpen: s } = zt();
    return n ? R.cloneElement(e, {
      onClick: () => s(!0),
      ...o
    }) : /* @__PURE__ */ r(
      "button",
      {
        ref: a,
        className: _(Fe.trigger, t),
        onClick: () => s(!0),
        ...o,
        children: e
      }
    );
  }
), Fr = R.forwardRef(
  ({
    children: e,
    className: t,
    side: n = "right",
    size: o = "md",
    variant: a = "default",
    showOverlay: s = !0,
    closeOnOverlayClick: c = !0,
    closeOnEscape: l = !0,
    container: i,
    onEscapeKeyDown: h,
    onPointerDownOutside: m,
    onInteractOutside: u,
    onOpenAutoFocus: d,
    onCloseAutoFocus: p,
    ...x
  }, f) => {
    const { open: g, setOpen: $ } = zt(), C = K(null), L = K(null);
    if (j(() => {
      if (!g || !l) return;
      const y = (b) => {
        b.key === "Escape" && (h == null || h(b), b.defaultPrevented || $(!1));
      };
      return document.addEventListener("keydown", y), () => document.removeEventListener("keydown", y);
    }, [g, l, h, $]), j(() => {
      if (!g) return;
      const y = window.getComputedStyle(document.body).overflow;
      return document.body.style.overflow = "hidden", document.body.style.userSelect = "none", () => {
        document.body.style.overflow = y, document.body.style.userSelect = "";
      };
    }, [g]), j(() => {
      if (!g) return;
      const y = document.activeElement, b = C.current;
      if (b) {
        const z = b.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )[0];
        z ? z.focus() : b.focus();
        const S = new Event("focus");
        d == null || d(S);
      }
      return () => {
        if (y) {
          y.focus();
          const N = new Event("focus");
          p == null || p(N);
        }
      };
    }, [g, d, p]), j(() => {
      if (!g || !c) return;
      const y = (b) => {
        const N = b.target, z = L.current, S = C.current;
        z && S && N && z.contains(N) && !S.contains(N) && (m == null || m(b), u == null || u(b), b.defaultPrevented || $(!1));
      };
      return document.addEventListener("pointerdown", y), () => document.removeEventListener("pointerdown", y);
    }, [g, c, m, u, $]), !g) return null;
    const v = /* @__PURE__ */ k(be, { children: [
      s && /* @__PURE__ */ r(
        "div",
        {
          ref: L,
          className: Fe.overlay,
          "data-side": n,
          "data-variant": a
        }
      ),
      /* @__PURE__ */ r(
        "div",
        {
          ref: (y) => {
            C && (C.current = y), typeof f == "function" ? f(y) : f && "current" in f && f.current !== y && (f.current = y);
          },
          className: _(
            Fe.content,
            Fe[`side-${n}`],
            Fe[`size-${o}`],
            Fe[`variant-${a}`],
            t
          ),
          role: "dialog",
          "aria-modal": "true",
          tabIndex: -1,
          "data-side": n,
          "data-size": o,
          "data-variant": a,
          "data-state": g ? "open" : "closed",
          ...x,
          children: e
        }
      )
    ] });
    return je(v, i || document.body);
  }
), Mr = R.forwardRef(
  ({ children: e, className: t, ...n }, o) => /* @__PURE__ */ r(
    "div",
    {
      ref: o,
      className: _(Fe.header, t),
      ...n,
      children: e
    }
  )
), Br = R.forwardRef(
  ({ children: e, className: t, ...n }, o) => /* @__PURE__ */ r(
    "h2",
    {
      ref: o,
      className: _(Fe.title, t),
      ...n,
      children: e
    }
  )
), zr = R.forwardRef(
  ({ children: e, className: t, ...n }, o) => /* @__PURE__ */ r(
    "p",
    {
      ref: o,
      className: _(Fe.description, t),
      ...n,
      children: e
    }
  )
), qr = R.forwardRef(
  ({ children: e, className: t, ...n }, o) => /* @__PURE__ */ r(
    "div",
    {
      ref: o,
      className: _(Fe.footer, t),
      ...n,
      children: e
    }
  )
), Rr = R.forwardRef(
  ({ children: e, className: t, asChild: n = !1, ...o }, a) => {
    const { setOpen: s } = zt();
    return n ? R.cloneElement(e, {
      onClick: () => s(!1),
      ...o
    }) : /* @__PURE__ */ r(
      "button",
      {
        ref: a,
        className: _(Fe.close, t),
        onClick: () => s(!1),
        "aria-label": "Close sheet",
        ...o,
        children: e
      }
    );
  }
);
Er.displayName = "Sheet";
Dr.displayName = "Sheet.Trigger";
Fr.displayName = "Sheet.Content";
Mr.displayName = "Sheet.Header";
Br.displayName = "Sheet.Title";
zr.displayName = "Sheet.Description";
qr.displayName = "Sheet.Footer";
Rr.displayName = "Sheet.Close";
const L0 = Object.assign(Er, {
  Trigger: Dr,
  Content: Fr,
  Header: Mr,
  Title: Br,
  Description: zr,
  Footer: qr,
  Close: Rr
}), If = "_carousel_brsnb_1", Af = "_carouselButton_brsnb_44", Ef = "_carouselContent_brsnb_62", Df = "_carouselTrack_brsnb_69", Ff = "_carouselItem_brsnb_80", Mf = "_carouselControls_brsnb_90", Bf = "_carouselPrevious_brsnb_158", zf = "_carouselNext_brsnb_159", qf = "_carouselIndicators_brsnb_164", Rf = "_carouselIndicator_brsnb_164", Pf = "_carouselIndicatorActive_brsnb_205", ge = {
  carousel: If,
  "carousel-sm": "_carousel-sm_brsnb_24",
  "carousel-lg": "_carousel-lg_brsnb_29",
  "carousel-brutal": "_carousel-brutal_brsnb_35",
  carouselButton: Af,
  "carousel-outline": "_carousel-outline_brsnb_52",
  carouselContent: Ef,
  carouselTrack: Df,
  carouselItem: Ff,
  carouselControls: Mf,
  carouselPrevious: Bf,
  carouselNext: zf,
  carouselIndicators: qf,
  carouselIndicator: Rf,
  carouselIndicatorActive: Pf
}, Pr = ue(null), pt = () => {
  const e = Y(Pr);
  if (!e)
    throw new Error("Carousel components must be used within a Carousel");
  return e;
}, Hr = w(
  ({
    orientation: e = "horizontal",
    autoPlay: t = !1,
    autoPlayInterval: n = 3e3,
    loop: o = !1,
    value: a,
    defaultValue: s = 0,
    onValueChange: c,
    size: l = "md",
    variant: i = "default",
    children: h,
    className: m,
    style: u,
    ...d
  }, p) => {
    const [x, f] = q(a ?? s), [g, $] = q(0), C = W((L) => {
      if (o) {
        const v = (L + g) % g;
        f(v), c == null || c(v);
      } else {
        const v = Math.max(0, Math.min(L, g - 1));
        f(v), c == null || c(v);
      }
    }, [o, g, c]);
    return j(() => {
      a !== void 0 && f(a);
    }, [a]), j(() => {
      if (t && g > 0) {
        const L = setInterval(() => {
          C(x + 1);
        }, n);
        return () => clearInterval(L);
      }
    }, [t, n, x, C, g]), /* @__PURE__ */ r(
      Pr.Provider,
      {
        value: {
          currentIndex: x,
          setCurrentIndex: C,
          orientation: e,
          totalItems: g,
          setTotalItems: $,
          loop: o,
          autoPlay: t,
          autoPlayInterval: n,
          size: l,
          variant: i
        },
        children: /* @__PURE__ */ r(
          "div",
          {
            ref: p,
            className: _(
              ge.carousel,
              ge[`carousel-${l}`],
              ge[`carousel-${i}`],
              m
            ),
            style: u,
            "data-orientation": e,
            "data-size": l,
            "data-variant": i,
            ...d,
            children: h
          }
        )
      }
    );
  }
), jr = w(
  ({ children: e, className: t }, n) => {
    const { currentIndex: o, orientation: a, setTotalItems: s } = pt(), c = K(null);
    j(() => {
      const i = R.Children.count(e);
      s(i);
    }, [e, s]);
    const l = a === "horizontal" ? `translateX(-${o * 100}%)` : `translateY(-${o * 100}%)`;
    return /* @__PURE__ */ r(
      "div",
      {
        ref: n,
        className: _(ge.carouselContent, t),
        children: /* @__PURE__ */ r(
          "div",
          {
            ref: c,
            className: ge.carouselTrack,
            style: { transform: l },
            children: R.Children.map(e, (i, h) => /* @__PURE__ */ r(
              "div",
              {
                className: ge.carouselItem,
                "data-active": h === o,
                children: i
              },
              h
            ))
          }
        )
      }
    );
  }
), Wr = w(
  ({ children: e, className: t }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: _(ge.carouselControls, t),
      children: e
    }
  )
), Gr = w(
  ({ children: e, className: t, onClick: n, ...o }, a) => {
    const { currentIndex: s, setCurrentIndex: c, loop: l } = pt(), i = !l && s === 0, h = (m) => {
      n == null || n(m), m.defaultPrevented || c(s - 1);
    };
    return /* @__PURE__ */ r(
      "button",
      {
        ref: a,
        type: "button",
        className: _(ge.carouselButton, ge.carouselPrevious, t),
        onClick: h,
        disabled: i,
        "aria-label": "Previous slide",
        ...o,
        children: e || /* @__PURE__ */ r("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: /* @__PURE__ */ r("polyline", { points: "15 18 9 12 15 6" }) })
      }
    );
  }
), Jr = w(
  ({ children: e, className: t, onClick: n, ...o }, a) => {
    const { currentIndex: s, setCurrentIndex: c, totalItems: l, loop: i } = pt(), h = !i && s === l - 1, m = (u) => {
      n == null || n(u), u.defaultPrevented || c(s + 1);
    };
    return /* @__PURE__ */ r(
      "button",
      {
        ref: a,
        type: "button",
        className: _(ge.carouselButton, ge.carouselNext, t),
        onClick: m,
        disabled: h,
        "aria-label": "Next slide",
        ...o,
        children: e || /* @__PURE__ */ r("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: /* @__PURE__ */ r("polyline", { points: "9 18 15 12 9 6" }) })
      }
    );
  }
), Vr = w(
  ({ children: e, className: t }, n) => {
    const { currentIndex: o, setCurrentIndex: a, totalItems: s } = pt();
    return e ? /* @__PURE__ */ r(
      "div",
      {
        ref: n,
        className: _(ge.carouselIndicators, t),
        children: e
      }
    ) : /* @__PURE__ */ r(
      "div",
      {
        ref: n,
        className: _(ge.carouselIndicators, t),
        children: Array.from({ length: s }).map((c, l) => /* @__PURE__ */ r(
          "button",
          {
            type: "button",
            className: _(
              ge.carouselIndicator,
              l === o && ge.carouselIndicatorActive
            ),
            onClick: () => a(l),
            "aria-label": `Go to slide ${l + 1}`
          },
          l
        ))
      }
    );
  }
);
Hr.displayName = "Carousel";
jr.displayName = "CarouselContent";
Wr.displayName = "CarouselControls";
Gr.displayName = "CarouselPrevious";
Jr.displayName = "CarouselNext";
Vr.displayName = "CarouselIndicators";
const S0 = Object.assign(Hr, {
  Content: jr,
  Controls: Wr,
  Previous: Gr,
  Next: Jr,
  Indicators: Vr
}), Hf = "_chart_1jvhi_1", jf = "_chartTitle_1jvhi_50", Wf = "_chartSubtitle_1jvhi_51", Gf = "_noBorder_1jvhi_65", Jf = "_noShadow_1jvhi_69", Vf = "_chartHeader_1jvhi_74", Kf = "_chartContent_1jvhi_105", Of = "_chartWrapper_1jvhi_114", Yf = "_chartGrid_1jvhi_120", Xf = "_chartContainer_1jvhi_130", Uf = "_chartLegend_1jvhi_144", Zf = "_chartFooter_1jvhi_197", Qf = "_pulse_1jvhi_1", pe = {
  chart: Hf,
  "chart-sm": "_chart-sm_1jvhi_25",
  "chart-lg": "_chart-lg_1jvhi_33",
  "chart-brutal": "_chart-brutal_1jvhi_42",
  chartTitle: jf,
  chartSubtitle: Wf,
  "chart-outline": "_chart-outline_1jvhi_55",
  noBorder: Gf,
  noShadow: Jf,
  chartHeader: Vf,
  chartContent: Kf,
  chartWrapper: Of,
  chartGrid: Yf,
  chartContainer: Xf,
  chartLegend: Uf,
  "legend-top": "_legend-top_1jvhi_162",
  "legend-left": "_legend-left_1jvhi_168",
  "legend-right": "_legend-right_1jvhi_182",
  chartFooter: Zf,
  pulse: Qf
}, Kr = ue(null), e0 = () => {
  const e = Y(Kr);
  if (!e)
    throw new Error("Chart components must be used within a Chart");
  return e;
}, Or = w(
  ({
    variant: e = "default",
    size: t = "md",
    showBorder: n = !0,
    showShadow: o = !0,
    showGrid: a = !0,
    aspectRatio: s = "16/9",
    height: c,
    children: l,
    className: i,
    style: h,
    ...m
  }, u) => {
    const d = {
      ...h,
      height: c,
      aspectRatio: c ? void 0 : s
    };
    return /* @__PURE__ */ r(Kr.Provider, { value: { variant: e, size: t, showGrid: a }, children: /* @__PURE__ */ r(
      "div",
      {
        ref: u,
        className: _(
          pe.chart,
          pe[`chart-${t}`],
          pe[`chart-${e}`],
          !n && pe.noBorder,
          !o && pe.noShadow,
          i
        ),
        style: d,
        "data-variant": e,
        "data-size": t,
        role: "img",
        "aria-label": "Chart container",
        ...m,
        children: l
      }
    ) });
  }
), Yr = w(
  ({ children: e, className: t, ...n }, o) => /* @__PURE__ */ r(
    "div",
    {
      ref: o,
      className: _(pe.chartHeader, t),
      ...n,
      children: e
    }
  )
), Xr = w(
  ({ children: e, className: t, ...n }, o) => /* @__PURE__ */ r(
    "h3",
    {
      ref: o,
      className: _(pe.chartTitle, t),
      ...n,
      children: e
    }
  )
), Ur = w(
  ({ children: e, className: t, ...n }, o) => /* @__PURE__ */ r(
    "p",
    {
      ref: o,
      className: _(pe.chartSubtitle, t),
      ...n,
      children: e
    }
  )
), Zr = w(
  ({ children: e, className: t, ...n }, o) => {
    const { showGrid: a } = e0();
    return /* @__PURE__ */ r(
      "div",
      {
        ref: o,
        className: _(pe.chartContent, t),
        ...n,
        children: /* @__PURE__ */ k("div", { className: pe.chartWrapper, children: [
          a && /* @__PURE__ */ r("div", { className: pe.chartGrid, "aria-hidden": "true" }),
          /* @__PURE__ */ r("div", { className: pe.chartContainer, children: e })
        ] })
      }
    );
  }
), Qr = w(
  ({ position: e = "bottom", children: t, className: n, ...o }, a) => /* @__PURE__ */ r(
    "div",
    {
      ref: a,
      className: _(
        pe.chartLegend,
        pe[`legend-${e}`],
        n
      ),
      role: "group",
      "aria-label": "Chart legend",
      ...o,
      children: t
    }
  )
), eo = w(
  ({ children: e, className: t, ...n }, o) => /* @__PURE__ */ r(
    "div",
    {
      ref: o,
      className: _(pe.chartFooter, t),
      ...n,
      children: e
    }
  )
);
Or.displayName = "Chart";
Yr.displayName = "ChartHeader";
Xr.displayName = "ChartTitle";
Ur.displayName = "ChartSubtitle";
Zr.displayName = "ChartContent";
Qr.displayName = "ChartLegend";
eo.displayName = "ChartFooter";
const T0 = Object.assign(Or, {
  Header: Yr,
  Title: Xr,
  Subtitle: Ur,
  Content: Zr,
  Legend: Qr,
  Footer: eo
}), I0 = {
  square: "/shapes/BrutalSquare.svg",
  triangle: "/shapes/BrutalTriangle.svg",
  circle: "/shapes/BrutalCircle.svg",
  diamond: "/shapes/BrutalDiamond.svg",
  hexagon: "/shapes/BrutalHexagon.svg",
  arrow: "/shapes/BrutalArrow.svg",
  cross: "/shapes/BrutalCross.svg",
  star: "/shapes/BrutalStar.svg",
  lightning: "/shapes/BrutalLightning.svg",
  octagon: "/shapes/BrutalOctagon.svg"
}, A0 = [
  {
    name: "Square",
    id: "square",
    file: "BrutalSquare.svg",
    description: "Classic brutalist square with thick borders"
  },
  {
    name: "Triangle",
    id: "triangle",
    file: "BrutalTriangle.svg",
    description: "Sharp angular triangle with bold edges"
  },
  {
    name: "Circle",
    id: "circle",
    file: "BrutalCircle.svg",
    description: "Solid circle with contrasting inner border"
  },
  {
    name: "Diamond",
    id: "diamond",
    file: "BrutalDiamond.svg",
    description: "Rotated square creating diamond shape"
  },
  {
    name: "Hexagon",
    id: "hexagon",
    file: "BrutalHexagon.svg",
    description: "Six-sided polygon with clean geometry"
  },
  {
    name: "Arrow",
    id: "arrow",
    file: "BrutalArrow.svg",
    description: "Directional arrow for navigation and flow"
  },
  {
    name: "Cross",
    id: "cross",
    file: "BrutalCross.svg",
    description: "Plus/cross shape for icons and UI elements"
  },
  {
    name: "Star",
    id: "star",
    file: "BrutalStar.svg",
    description: "Five-pointed star with sharp angles"
  },
  {
    name: "Lightning",
    id: "lightning",
    file: "BrutalLightning.svg",
    description: "Jagged lightning bolt for energy and power"
  },
  {
    name: "Octagon",
    id: "octagon",
    file: "BrutalOctagon.svg",
    description: "Eight-sided stop sign inspired shape"
  }
], t0 = ({
  variant: e = "default",
  size: t = "md",
  fullWidth: n = !1,
  loading: o = !1,
  brutalistShadow: a = !0,
  glitch: s = !1,
  leftIcon: c,
  rightIcon: l,
  disabled: i,
  children: h,
  className: m = "",
  ...u
}) => {
  const d = `
    relative inline-flex items-center justify-center gap-[0.5rem]
    font-bold uppercase tracking-wider
    border-[3px] border-solid border-black
    cursor-pointer transition-all duration-[150ms] ease-in-out
    select-none whitespace-nowrap outline-none
    focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-red-500 focus-visible:outline-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    rounded-none
  `, p = {
    sm: "py-[0.5rem] px-[1rem] text-xs",
    // --brutal-space-2 (0.5rem) --brutal-space-4 (1rem)
    md: "py-[0.75rem] px-[1.5rem] text-sm",
    // --brutal-space-3 (0.75rem) --brutal-space-6 (1.5rem) 
    lg: "py-[1rem] px-[2rem] text-base",
    // --brutal-space-4 (1rem) --brutal-space-8 (2rem)
    xl: "py-[1.5rem] px-[2.5rem] text-lg"
    // --brutal-space-6 (1.5rem) --brutal-space-10 (2.5rem)
  }, x = {
    default: `
      bg-white text-black
      hover:bg-[#f5f5f5]
      disabled:hover:bg-white
    `,
    brutal: `
      bg-black text-white
      hover:bg-[#171717]
      disabled:hover:bg-black
    `,
    destructive: `
      bg-[#ff0000] text-white border-[#cc0000]
      hover:bg-[#cc0000]
      disabled:hover:bg-[#ff0000]
    `,
    outline: `
      bg-transparent text-black
      hover:bg-black hover:text-white
      disabled:hover:bg-transparent disabled:hover:text-black
    `,
    ghost: `
      bg-transparent text-black border-transparent
      hover:bg-[#f5f5f5] hover:border-black
      disabled:hover:bg-transparent disabled:hover:border-transparent
    `
  }, f = a && !i ? `
    shadow-[8px_8px_0px_black]
    hover:shadow-[12px_12px_0px_black] hover:-translate-x-[4px] hover:-translate-y-[4px]
    active:shadow-[4px_4px_0px_black] active:translate-x-0 active:translate-y-0
  ` : a && i ? "shadow-[8px_8px_0px_black]" : "", g = s ? "before:content-[attr(data-text)] after:content-[attr(data-text)] before:absolute after:absolute before:top-0 after:top-0 before:left-0 after:left-0 before:w-full after:w-full before:h-full after:h-full before:flex after:flex before:items-center after:items-center before:justify-center after:justify-center before:px-inherit after:px-inherit before:py-inherit after:py-inherit before:animate-[glitch-1_0.5s_infinite] after:animate-[glitch-2_0.5s_infinite] before:text-red-500 after:text-blue-600 before:-z-10 after:-z-20 before:opacity-80 after:opacity-80 hover:before:animate-[glitch-1_0.2s_infinite] hover:after:animate-[glitch-2_0.2s_infinite]" : "", $ = n ? "w-full" : "", C = o ? "text-transparent" : "", L = `
    ${d}
    ${p[t]}
    ${x[e]}
    ${f}
    ${g}
    ${$}
    ${C}
    ${m}
  `.replace(/\s+/g, " ").trim();
  return /* @__PURE__ */ k(
    "button",
    {
      className: L,
      style: {
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        letterSpacing: "0.05em",
        ...u.style
      },
      disabled: i || o,
      "data-text": s ? h : void 0,
      ...u,
      children: [
        o && /* @__PURE__ */ r("span", { className: "absolute w-4 h-4 border-2 border-current border-r-transparent animate-spin rounded-full" }),
        c && /* @__PURE__ */ r("span", { className: "inline-flex items-center justify-center", children: c }),
        /* @__PURE__ */ r("span", { className: "inline-flex items-center", children: h }),
        l && /* @__PURE__ */ r("span", { className: "inline-flex items-center justify-center", children: l })
      ]
    }
  );
}, to = w(
  ({
    ratio: e = 16 / 9,
    children: t,
    className: n = "",
    objectFit: o = "cover",
    backgroundColor: a,
    style: s,
    ...c
  }, l) => {
    const i = `${1 / e * 100}%`, u = `
      
      relative w-full overflow-hidden
      border-[3px] border-solid border-black
      bg-gray-100
      shadow-[4px_4px_0px_black]
      rounded-none
      transition-none
      dark:bg-gray-800 dark:border-white
      contrast-more:border-[4px] contrast-more:shadow-[5px_5px_0px_black]
      print:shadow-none print:border print:border-black
    
      ${{
      contain: "[&>div>img]:object-contain [&>div>video]:object-contain",
      cover: "[&>div>img]:object-cover [&>div>video]:object-cover",
      fill: "[&>div>img]:object-fill [&>div>video]:object-fill",
      none: "[&>div>img]:object-none [&>div>video]:object-none",
      "scale-down": "[&>div>img]:object-scale-down [&>div>video]:object-scale-down"
    }[o]}
      ${n}
    `.replace(/\s+/g, " ").trim();
    return /* @__PURE__ */ k(
      "div",
      {
        ref: l,
        className: u,
        style: {
          ...s,
          backgroundColor: a || void 0
        },
        ...c,
        children: [
          /* @__PURE__ */ r("div", { style: { paddingBottom: i } }),
          /* @__PURE__ */ r("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ r("div", { className: "w-full h-full [&>img]:w-full [&>img]:h-full [&>img]:block [&>video]:w-full [&>video]:h-full [&>video]:block [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:block [&>svg]:w-full [&>svg]:h-full [&>svg]:block", children: t }) })
        ]
      }
    );
  }
);
to.displayName = "AspectRatio";
const no = w(
  ({
    children: e,
    className: t = "",
    variant: n = "elevated",
    padding: o = "md",
    clickable: a = !1,
    hover: s = !0,
    ...c
  }, l) => {
    const i = `
      bg-white border-[3px] border-solid border-black
      transition-all duration-150 ease-in-out
      rounded-none
    `, h = {
      elevated: "shadow-[8px_8px_0px_black]",
      flat: "",
      outline: "bg-transparent"
    }, m = {
      none: "",
      sm: "p-3",
      md: "p-6",
      lg: "p-8"
    }, u = a ? "cursor-pointer hover:shadow-[12px_12px_0px_black] hover:-translate-x-1 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2" : s ? "hover:shadow-[12px_12px_0px_black] hover:-translate-x-1 hover:-translate-y-1" : "", d = `
      ${i}
      ${h[n]}
      ${m[o]}
      ${u}
      ${t}
    `.replace(/\s+/g, " ").trim();
    return /* @__PURE__ */ r(
      "div",
      {
        ref: l,
        className: d,
        role: a ? "button" : void 0,
        tabIndex: a ? 0 : void 0,
        ...c,
        children: e
      }
    );
  }
), ro = w(
  ({ children: e, className: t = "", ...n }, o) => {
    const a = `
      pb-4 border-b-[2px] border-black mb-4
      ${t}
    `.replace(/\s+/g, " ").trim();
    return /* @__PURE__ */ r(
      "div",
      {
        ref: o,
        className: a,
        ...n,
        children: e
      }
    );
  }
), oo = w(
  ({ children: e, className: t = "", ...n }, o) => {
    const a = `
      ${t}
    `.replace(/\s+/g, " ").trim();
    return /* @__PURE__ */ r(
      "div",
      {
        ref: o,
        className: a,
        ...n,
        children: e
      }
    );
  }
), ao = w(
  ({ children: e, className: t = "", ...n }, o) => {
    const a = `
      pt-4 border-t-[2px] border-black mt-4
      ${t}
    `.replace(/\s+/g, " ").trim();
    return /* @__PURE__ */ r(
      "div",
      {
        ref: o,
        className: a,
        ...n,
        children: e
      }
    );
  }
);
no.displayName = "Card";
ro.displayName = "Card.Header";
oo.displayName = "Card.Body";
ao.displayName = "Card.Footer";
const gt = no;
gt.Header = ro;
gt.Body = oo;
gt.Footer = ao;
const so = w(
  ({
    className: e = "",
    variant: t = "default",
    size: n = "md",
    leftIcon: o,
    rightIcon: a,
    fullWidth: s = !1,
    brutalistShadow: c = !0,
    disabled: l,
    readOnly: i,
    type: h = "text",
    ...m
  }, u) => {
    const d = `
      border-[3px] border-solid border-black
      bg-white text-black placeholder-gray-500
      transition-all duration-150 ease-in-out
      focus:outline-none focus:border-black
      hover:border-gray-700
      disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-gray-100
      read-only:cursor-default read-only:bg-gray-100
      w-full block
      rounded-none
    `, p = {
      sm: "px-3 py-2 text-sm leading-tight",
      md: "px-4 py-3 text-base leading-normal",
      lg: "px-5 py-4 text-lg leading-normal"
    }, x = {
      default: "border-black focus:border-black",
      error: "border-red-500 focus:border-red-500 bg-red-50",
      success: "border-green-500 focus:border-green-500 bg-green-50"
    }, f = c && !l && !i ? "shadow-[4px_4px_0px_black] focus:shadow-[6px_6px_0px_black] focus:-translate-x-0.5 focus:-translate-y-0.5" : "", g = s ? "w-full" : "", $ = {
      left: o ? "pl-12" : "",
      right: a ? "pr-12" : ""
    };
    return o || a ? /* @__PURE__ */ k("div", { className: `relative ${s ? "w-full" : "inline-block"}`, children: [
      o && /* @__PURE__ */ r("div", { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none", children: o }),
      /* @__PURE__ */ r(
        "input",
        {
          ref: u,
          type: h,
          className: `
              ${d}
              ${p[n]}
              ${x[t]}
              ${f}
              ${g}
              ${$.left}
              ${$.right}
              ${e}
            `.replace(/\s+/g, " ").trim(),
          style: {
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            fontWeight: 500,
            ...m.style
          },
          disabled: l,
          readOnly: i,
          ...m
        }
      ),
      a && /* @__PURE__ */ r("div", { className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none", children: a })
    ] }) : /* @__PURE__ */ r(
      "input",
      {
        ref: u,
        type: h,
        className: `
          ${d}
          ${p[n]}
          ${x[t]}
          ${f}
          ${g}
          ${e}
        `.replace(/\s+/g, " ").trim(),
        style: {
          fontFamily: "'JetBrains Mono', 'Courier New', monospace",
          fontWeight: 500,
          ...m.style
        },
        disabled: l,
        readOnly: i,
        ...m
      }
    );
  }
);
so.displayName = "Input";
const lo = w(
  ({
    children: e,
    variant: t = "solid",
    color: n = "accent",
    size: o = "md",
    dismissible: a = !1,
    onDismiss: s,
    className: c = "",
    onClick: l,
    clickable: i = !1,
    ...h
  }, m) => {
    const u = t === "dot", d = i || !!l, p = a && !!s, x = (S) => {
      S.stopPropagation(), s == null || s();
    }, f = () => {
      d && (l == null || l());
    }, g = (S) => {
      d && (S.key === "Enter" || S.key === " ") && (S.preventDefault(), l == null || l());
    }, $ = u ? null : e, C = `
      inline-flex items-center justify-center
      font-mono font-bold uppercase tracking-wider
      border-[3px] border-solid border-black
      rounded-none whitespace-nowrap
      transition-all duration-150 ease-in-out
      shadow-[4px_4px_0px_black]
    `, L = {
      sm: u ? "w-2 h-2" : "px-2 py-1 text-xs min-h-[20px]",
      md: u ? "w-3 h-3" : "px-3 py-2 text-sm min-h-[24px]",
      lg: u ? "w-4 h-4" : "px-4 py-3 text-base min-h-[32px]"
    }, v = {
      solid: "bg-black text-white border-black",
      outline: "bg-transparent text-black border-black",
      dot: "rounded-full",
      secondary: "bg-gray-100 text-gray-900 border-gray-600"
    }, y = {
      accent: t === "outline" ? "text-red-500 border-red-500" : "bg-red-500 text-white border-red-700",
      success: t === "outline" ? "text-green-500 border-green-500" : "bg-green-500 text-white border-green-700",
      warning: t === "outline" ? "text-yellow-500 border-yellow-500" : "bg-yellow-400 text-black border-yellow-600",
      error: t === "outline" ? "text-red-500 border-red-500" : "bg-red-500 text-white border-red-700",
      info: t === "outline" ? "text-blue-500 border-blue-500" : "bg-blue-500 text-white border-blue-700",
      neutral: t === "outline" ? "text-gray-500 border-gray-500" : "bg-gray-500 text-white border-gray-700"
    }, b = d ? "cursor-pointer hover:shadow-[6px_6px_0px_black] hover:-translate-x-0.5 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2" : "", N = `
      ${C}
      ${L[o]}
      ${v[t]}
      ${t !== "solid" && t !== "secondary" ? y[n] : ""}
      ${b}
      ${c}
    `.replace(/\s+/g, " ").trim(), z = /* @__PURE__ */ r(
      "svg",
      {
        viewBox: "0 0 24 24",
        fill: "currentColor",
        className: "w-3 h-3 ml-1",
        "aria-hidden": "true",
        children: /* @__PURE__ */ r("path", { d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" })
      }
    );
    return /* @__PURE__ */ k(
      "span",
      {
        ref: m,
        className: N,
        style: {
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          fontWeight: 700,
          letterSpacing: "0.02em",
          lineHeight: 1,
          ...h.style
        },
        onClick: d ? f : void 0,
        onKeyDown: d ? g : void 0,
        role: d ? "button" : u ? "status" : void 0,
        tabIndex: d ? 0 : void 0,
        "aria-label": u ? `${n} status indicator` : typeof e == "string" ? e : void 0,
        ...h,
        children: [
          $,
          p && /* @__PURE__ */ r(
            "button",
            {
              type: "button",
              className: "ml-1 text-current hover:text-gray-700 focus:outline-none",
              onClick: x,
              "aria-label": "Dismiss badge",
              tabIndex: -1,
              children: z
            }
          )
        ]
      }
    );
  }
);
lo.displayName = "Badge";
const co = w(
  ({
    children: e,
    className: t = "",
    type: n = "info",
    variant: o = "filled",
    size: a = "md",
    dismissible: s = !1,
    onDismiss: c,
    ...l
  }, i) => {
    const [h, m] = q(!1), [u, d] = q(!1), p = () => {
      d(!0), setTimeout(() => {
        m(!0), c == null || c();
      }, 300);
    };
    if (h)
      return null;
    const x = `
      relative flex items-start gap-3
      border-[3px] border-solid rounded-none
      font-medium transition-all duration-150 ease-in-out
      shadow-[4px_4px_0px_black]
      hover:shadow-[6px_6px_0px_black] hover:-translate-x-0.5 hover:-translate-y-0.5
      motion-reduce:transition-none motion-reduce:animate-none
      contrast-more:border-[4px]
    `, f = {
      sm: "p-3 text-sm leading-tight",
      md: "p-4 text-base leading-normal",
      lg: "p-6 text-lg leading-normal"
    }, g = {
      info: {
        filled: "bg-blue-500 border-black text-white",
        outline: "bg-white border-blue-500 text-blue-500 border-[5px]"
      },
      success: {
        filled: "bg-green-500 border-black text-white",
        outline: "bg-white border-green-500 text-green-500 border-[5px]"
      },
      warning: {
        filled: "bg-yellow-400 border-black text-black",
        outline: "bg-white border-yellow-400 text-yellow-600 border-[5px]"
      },
      error: {
        filled: "bg-red-500 border-black text-white hover:animate-[alertShake_0.15s_ease-in-out]",
        outline: "bg-white border-red-500 text-red-500 border-[5px] hover:animate-[alertShake_0.15s_ease-in-out]"
      }
    }, $ = s ? "pr-12" : "", C = `
      ${x}
      ${f[a]}
      ${g[n][o]}
      ${$}
      ${t}
    `.replace(/\s+/g, " ").trim();
    return /* @__PURE__ */ k(
      "div",
      {
        ref: i,
        className: C,
        style: {
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          animation: u ? "alertExit 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19) forwards" : "alertEnter 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
          ...l.style
        },
        role: "alert",
        "aria-live": "polite",
        ...l,
        children: [
          /* @__PURE__ */ r("style", { children: `
            @keyframes alertEnter {
              from {
                opacity: 0;
                transform: translateY(-20px) scale(0.95);
              }
              to {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
            @keyframes alertExit {
              from {
                opacity: 1;
                transform: translateX(0) scale(1);
              }
              to {
                opacity: 0;
                transform: translateX(100px) scale(0.9);
              }
            }
            @keyframes alertShake {
              0%, 100% {
                transform: translateX(0);
              }
              25% {
                transform: translateX(-4px);
              }
              75% {
                transform: translateX(4px);
              }
            }
          ` }),
          e,
          s && /* @__PURE__ */ r(
            "button",
            {
              className: `
              absolute top-3 right-3 bg-transparent border-none text-current cursor-pointer
              p-1 flex items-center justify-center rounded-none opacity-70 transition-all duration-100 ease-in-out
              hover:opacity-100 hover:scale-110 active:scale-95
              focus:outline focus:outline-2 focus:outline-current focus:outline-offset-1
              motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100
              ${a === "sm" ? "top-2 right-2 p-0.5" : a === "lg" ? "top-4 right-4" : ""}
            `,
              onClick: p,
              "aria-label": "Dismiss alert",
              type: "button",
              children: /* @__PURE__ */ r(
                "svg",
                {
                  width: a === "sm" ? 14 : a === "lg" ? 18 : 16,
                  height: a === "sm" ? 14 : a === "lg" ? 18 : 16,
                  viewBox: "0 0 16 16",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: /* @__PURE__ */ r(
                    "path",
                    {
                      d: "M12 4L4 12M4 4L12 12",
                      stroke: "currentColor",
                      strokeWidth: "2",
                      strokeLinecap: "square"
                    }
                  )
                }
              )
            }
          )
        ]
      }
    );
  }
), io = w(
  ({ children: e, className: t = "", ...n }, o) => /* @__PURE__ */ r(
    "div",
    {
      ref: o,
      className: `
          flex-shrink-0 flex items-center justify-center mt-1
          ${t}
        `.replace(/\s+/g, " ").trim(),
      ...n,
      children: e || /* @__PURE__ */ r(n0, {})
    }
  )
), uo = w(
  ({ children: e, className: t = "", ...n }, o) => /* @__PURE__ */ r(
    "div",
    {
      ref: o,
      className: `
          flex-1 min-w-0
          ${t}
        `.replace(/\s+/g, " ").trim(),
      ...n,
      children: e
    }
  )
), _o = w(
  ({ children: e, className: t = "", ...n }, o) => /* @__PURE__ */ r(
    "h4",
    {
      ref: o,
      className: `
          font-bold text-inherit leading-tight uppercase tracking-wider
          m-0 mb-1
          ${t}
        `.replace(/\s+/g, " ").trim(),
      style: {
        fontFamily: "'Space Grotesk', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        letterSpacing: "0.05em",
        ...n.style
      },
      ...n,
      children: e
    }
  )
), mo = w(
  ({ children: e, className: t = "", ...n }, o) => /* @__PURE__ */ r(
    "p",
    {
      ref: o,
      className: `
          m-0 leading-normal opacity-90
          ${t}
        `.replace(/\s+/g, " ").trim(),
      ...n,
      children: e
    }
  )
), ho = w(
  ({ children: e, className: t = "", ...n }, o) => /* @__PURE__ */ r(
    "div",
    {
      ref: o,
      className: `
          flex items-center gap-2 mt-3 flex-wrap
          max-md:flex-col max-md:items-stretch max-md:[&>button]:w-full
          ${t}
        `.replace(/\s+/g, " ").trim(),
      ...n,
      children: e
    }
  )
), n0 = () => /* @__PURE__ */ k(
  "svg",
  {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ r(
        "circle",
        {
          cx: "10",
          cy: "10",
          r: "8",
          stroke: "currentColor",
          strokeWidth: "2",
          fill: "none"
        }
      ),
      /* @__PURE__ */ r(
        "path",
        {
          d: "M10 6V10",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "square"
        }
      ),
      /* @__PURE__ */ r(
        "circle",
        {
          cx: "10",
          cy: "14",
          r: "1",
          fill: "currentColor"
        }
      )
    ]
  }
);
co.displayName = "Alert";
io.displayName = "Alert.Icon";
uo.displayName = "Alert.Content";
_o.displayName = "Alert.Title";
mo.displayName = "Alert.Description";
ho.displayName = "Alert.Actions";
const tt = co;
tt.Icon = io;
tt.Content = uo;
tt.Title = _o;
tt.Description = mo;
tt.Actions = ho;
const po = w(
  ({
    className: e = "",
    size: t = "md",
    label: n,
    indeterminate: o = !1,
    error: a = !1,
    brutalistShadow: s = !0,
    disabled: c,
    id: l,
    ...i
  }, h) => {
    const m = K(null), u = h || m;
    j(() => {
      const y = typeof u == "function" ? null : u.current;
      y && (y.indeterminate = o);
    }, [o, u]);
    const d = l || `checkbox-${Math.random().toString(36).substr(2, 9)}`, p = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6"
    }, x = {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg"
    }, f = `
      inline-flex items-center gap-3 relative select-none
      ${c ? "cursor-not-allowed opacity-50" : ""}
      ${e}
    `, g = `
      flex items-center justify-center
      bg-white border-[3px] border-solid rounded-none
      cursor-pointer transition-all duration-150 ease-in-out
      relative overflow-hidden
      ${p[t]}
      ${s ? "shadow-[4px_4px_0px_black]" : ""}
      ${a ? "border-red-500" : "border-black"}
      ${c ? "cursor-not-allowed bg-gray-300" : ""}
      hover:bg-gray-100 hover:-translate-x-0.5 hover:-translate-y-0.5
      ${s ? "hover:shadow-[6px_6px_0px_black]" : ""}
      ${a && s ? "hover:shadow-[6px_6px_0px_red-500]" : ""}
      active:translate-x-0.5 active:translate-y-0.5
      ${s ? "active:shadow-[2px_2px_0px_black]" : ""}
      ${a && s ? "active:shadow-[2px_2px_0px_red-500]" : ""}
      focus-within:outline focus-within:outline-2 focus-within:outline-red-500 focus-within:outline-offset-2
      ${c ? "hover:bg-gray-300 hover:translate-x-0 hover:translate-y-0 hover:shadow-[4px_4px_0px_black]" : ""}
    `, $ = `
      absolute opacity-0 w-full h-full cursor-pointer z-10
      ${c ? "cursor-not-allowed" : ""}
    `, C = `
      w-full h-full opacity-0 transform scale-75 transition-all duration-150 ease-in-out
      ${a ? "text-red-500" : "text-black"}
      ${o ? "opacity-0" : ""}
    `, L = `
      absolute h-[3px] w-[60%] transition-opacity duration-150 ease-in-out
      ${o ? "opacity-100" : "opacity-0"}
      ${a ? "bg-red-500" : "bg-black"}
    `, v = `
      font-medium text-black cursor-pointer transition-colors duration-150 ease-in-out
      ${x[t]}
      ${c ? "cursor-not-allowed text-gray-500" : "hover:text-gray-700"}
    `;
    return /* @__PURE__ */ k("div", { className: f, children: [
      /* @__PURE__ */ k("div", { className: "relative inline-block leading-[0]", children: [
        /* @__PURE__ */ r(
          "input",
          {
            ref: u,
            type: "checkbox",
            id: d,
            className: `${$} checked:~[&+div>svg]:opacity-100 checked:~[&+div>svg]:scale-100`,
            disabled: c,
            "aria-invalid": a,
            ...i
          }
        ),
        /* @__PURE__ */ k("div", { className: g, children: [
          /* @__PURE__ */ r(
            "svg",
            {
              className: C,
              viewBox: "0 0 24 24",
              fill: "none",
              "aria-hidden": "true",
              children: /* @__PURE__ */ r(
                "path",
                {
                  d: "M5 13L9 17L19 7",
                  stroke: "currentColor",
                  strokeWidth: "4",
                  strokeLinecap: "square",
                  strokeLinejoin: "miter"
                }
              )
            }
          ),
          /* @__PURE__ */ r("div", { className: L })
        ] })
      ] }),
      n && /* @__PURE__ */ r(
        "label",
        {
          htmlFor: d,
          className: v,
          style: {
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
          },
          children: n
        }
      ),
      /* @__PURE__ */ r("style", { children: `
            input:checked + div svg {
              opacity: 1;
              transform: scale(1);
            }
          ` })
    ] });
  }
);
po.displayName = "Checkbox";
const go = w(
  ({
    src: e,
    alt: t,
    initials: n,
    icon: o,
    size: a = "md",
    status: s,
    className: c = "",
    onClick: l,
    clickable: i = !1,
    ...h
  }, m) => {
    const [u, d] = q(!1), [p, x] = q(!1), f = () => {
      d(!0);
    }, g = () => {
      x(!0), d(!1);
    }, $ = e && !u, C = n && n.length > 0, L = o, v = $, y = !$ && C, b = !$ && !C && L, N = n ? n.slice(0, 2).toUpperCase() : "", z = /* @__PURE__ */ r(
      "svg",
      {
        viewBox: "0 0 24 24",
        fill: "currentColor",
        className: "w-full h-full",
        children: /* @__PURE__ */ r("path", { d: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" })
      }
    ), S = i || !!l, D = {
      xs: "w-6 h-6",
      sm: "w-8 h-8",
      md: "w-10 h-10",
      lg: "w-12 h-12",
      xl: "w-16 h-16"
    }, E = {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl"
    }, F = {
      xs: "w-1.5 h-1.5",
      sm: "w-2 h-2",
      md: "w-2.5 h-2.5",
      lg: "w-3 h-3",
      xl: "w-4 h-4"
    }, M = {
      online: "bg-green-500",
      offline: "bg-gray-400",
      busy: "bg-red-500",
      away: "bg-yellow-500"
    }, I = `
      relative inline-block
      ${S ? "cursor-pointer" : ""}
      ${c}
    `, A = `
      ${D[a]}
      bg-gray-100 border-[3px] border-solid border-black
      rounded-none shadow-[4px_4px_0px_black]
      flex items-center justify-center
      overflow-hidden text-black font-bold
      transition-all duration-150 ease-in-out
      ${S ? "hover:shadow-[6px_6px_0px_black] hover:-translate-x-0.5 hover:-translate-y-0.5" : ""}
      ${S ? "active:shadow-[2px_2px_0px_black] active:translate-x-0.5 active:translate-y-0.5" : ""}
      ${S ? "focus:outline focus:outline-2 focus:outline-red-500 focus:outline-offset-2" : ""}
    `, T = `
      absolute -bottom-0.5 -right-0.5 
      ${F[a]}
      ${M[s]}
      border-2 border-white rounded-full
      shadow-[2px_2px_0px_black]
    `;
    return /* @__PURE__ */ k(
      "div",
      {
        ref: m,
        className: I,
        onClick: S ? l : void 0,
        role: S ? "button" : void 0,
        tabIndex: S ? 0 : void 0,
        onKeyDown: S ? (P) => {
          (P.key === "Enter" || P.key === " ") && (P.preventDefault(), l == null || l());
        } : void 0,
        "aria-label": t || `Avatar${n ? ` for ${n}` : ""}`,
        children: [
          /* @__PURE__ */ k("div", { className: A, children: [
            v && /* @__PURE__ */ r(
              "img",
              {
                src: e,
                alt: t,
                className: `w-full h-full object-cover ${p ? "opacity-100" : "opacity-0"} transition-opacity duration-200`,
                onError: f,
                onLoad: g,
                ...h
              }
            ),
            y && /* @__PURE__ */ r(
              "span",
              {
                className: `${E[a]} font-bold uppercase`,
                style: {
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                },
                "aria-label": `Initials: ${N}`,
                children: N
              }
            ),
            b && /* @__PURE__ */ r(
              "span",
              {
                className: "w-3/5 h-3/5 flex items-center justify-center text-gray-600",
                "aria-label": "Avatar icon",
                children: o
              }
            ),
            !v && !y && !b && /* @__PURE__ */ r(
              "span",
              {
                className: "w-3/5 h-3/5 flex items-center justify-center text-gray-600",
                "aria-label": "Default avatar",
                children: z
              }
            )
          ] }),
          s && /* @__PURE__ */ r(
            "div",
            {
              className: T,
              "aria-label": `Status: ${s}`,
              role: "img"
            }
          )
        ]
      }
    );
  }
);
go.displayName = "Avatar";
const bo = w(
  ({
    value: e,
    max: t = 100,
    type: n = "linear",
    variant: o = "default",
    // eslint-disable-line @typescript-eslint/no-unused-vars
    size: a = "md",
    showLabel: s = !1,
    label: c,
    indeterminate: l = !1,
    color: i = "accent",
    className: h,
    ...m
  }, u) => {
    const d = l ? void 0 : Math.min(Math.max((e ?? 0) / t * 100, 0), 100), p = n === "circular", x = c || (d !== void 0 ? `${Math.round(d)}%` : ""), f = p ? a === "sm" ? 40 : a === "lg" ? 80 : 60 : 0, g = p ? f * 4 - 16 : 0, $ = p && d !== void 0 ? g - d / 100 * g : 0, C = "progressbar", L = l ? void 0 : e ?? 0, v = 0, y = t, b = c || (l ? "Loading" : `${Math.round(d ?? 0)} percent complete`), N = _(
      "relative",
      "font-mono font-bold text-black",
      h
    ), z = {
      accent: "bg-yellow-400 border-yellow-400",
      success: "bg-green-400 border-green-400",
      warning: "bg-orange-400 border-orange-400",
      error: "bg-red-400 border-red-400",
      info: "bg-blue-400 border-blue-400"
    }, S = {
      accent: "bg-yellow-100 border-yellow-400",
      success: "bg-green-100 border-green-400",
      warning: "bg-orange-100 border-orange-400",
      error: "bg-red-100 border-red-400",
      info: "bg-blue-100 border-blue-400"
    };
    if (p) {
      const I = a === "sm" ? 3 : a === "lg" ? 6 : 4, A = I + 2, T = f + A * 2, P = 4, X = _(
        N,
        "inline-flex items-center justify-center"
      ), B = {
        accent: "stroke-yellow-400",
        success: "stroke-green-400",
        warning: "stroke-orange-400",
        error: "stroke-red-400",
        info: "stroke-blue-400"
      }, H = {
        accent: "stroke-yellow-200",
        success: "stroke-green-200",
        warning: "stroke-orange-200",
        error: "stroke-red-200",
        info: "stroke-blue-200"
      };
      return /* @__PURE__ */ r(
        "div",
        {
          ref: u,
          className: X,
          role: C,
          "aria-valuenow": L,
          "aria-valuemin": v,
          "aria-valuemax": y,
          "aria-label": b,
          ...m,
          children: /* @__PURE__ */ k("div", { className: "relative flex items-center justify-center", children: [
            /* @__PURE__ */ k(
              "svg",
              {
                className: "transform rotate-0",
                width: T,
                height: T,
                viewBox: `0 0 ${T} ${T}`,
                style: {
                  fontFamily: "JetBrains Mono, monospace",
                  fontWeight: "bold"
                },
                children: [
                  /* @__PURE__ */ r(
                    "rect",
                    {
                      className: _("fill-white", H[i]),
                      x: A,
                      y: A,
                      width: f,
                      height: f,
                      rx: P,
                      ry: P,
                      fill: "none",
                      strokeWidth: I
                    }
                  ),
                  /* @__PURE__ */ r(
                    "rect",
                    {
                      className: _("fill-none transition-all duration-300", B[i]),
                      x: A,
                      y: A,
                      width: f,
                      height: f,
                      rx: P,
                      ry: P,
                      fill: "none",
                      strokeWidth: I,
                      style: {
                        strokeDasharray: g,
                        strokeDashoffset: $
                      },
                      strokeLinecap: "square",
                      transform: `rotate(-90 ${T / 2} ${T / 2})`
                    }
                  )
                ]
              }
            ),
            s && /* @__PURE__ */ r(
              "div",
              {
                className: _(
                  "absolute text-center font-bold text-black leading-none",
                  a === "sm" ? "text-xs" : a === "lg" ? "text-base" : "text-sm"
                ),
                style: {
                  fontFamily: "JetBrains Mono, monospace"
                },
                children: x
              }
            )
          ] })
        }
      );
    }
    const D = _(
      N,
      "w-full",
      s && "mb-6"
    ), F = _(
      "relative overflow-hidden border-2 border-black",
      "shadow-[inset_2px_2px_0px_rgba(0,0,0,0.2),3px_3px_0px_black]",
      "transform -translate-y-px",
      {
        sm: "h-2",
        md: "h-3",
        lg: "h-4"
      }[a],
      S[i]
    ), M = _(
      "h-full relative transition-all duration-300",
      "shadow-[inset_-2px_-2px_0px_rgba(0,0,0,0.2)]",
      "after:absolute after:top-0 after:right-0 after:w-1 after:h-full after:bg-black",
      z[i],
      l && "animate-pulse"
    );
    return /* @__PURE__ */ k(
      "div",
      {
        ref: u,
        className: D,
        role: C,
        "aria-valuenow": L,
        "aria-valuemin": v,
        "aria-valuemax": y,
        "aria-label": b,
        ...m,
        children: [
          /* @__PURE__ */ r("div", { className: F, children: /* @__PURE__ */ r(
            "div",
            {
              className: M,
              style: {
                width: l ? "30%" : `${d}%`,
                fontFamily: "JetBrains Mono, monospace"
              },
              "aria-hidden": "true"
            }
          ) }),
          s && /* @__PURE__ */ r(
            "div",
            {
              className: "mt-2 text-sm font-bold text-center text-black",
              style: {
                fontFamily: "JetBrains Mono, monospace"
              },
              children: x
            }
          )
        ]
      }
    );
  }
);
bo.displayName = "Progress";
const fo = w(
  ({
    size: e = "md",
    color: t = "default",
    variant: n = "dots",
    speed: o = "normal",
    label: a = "Loading",
    className: s,
    ...c
  }, l) => {
    const i = {
      sm: {
        container: "w-4 h-4",
        dot: "w-1 h-1",
        bar: "w-0.5 h-2",
        square: "w-4 h-4",
        glitch: "w-4 h-4"
      },
      md: {
        container: "w-6 h-6",
        dot: "w-1.5 h-1.5",
        bar: "w-0.5 h-3",
        square: "w-6 h-6",
        glitch: "w-6 h-6"
      },
      lg: {
        container: "w-8 h-8",
        dot: "w-2 h-2",
        bar: "w-1 h-4",
        square: "w-8 h-8",
        glitch: "w-8 h-8"
      },
      xl: {
        container: "w-12 h-12",
        dot: "w-3 h-3",
        bar: "w-1.5 h-6",
        square: "w-12 h-12",
        glitch: "w-12 h-12"
      }
    }, h = {
      default: "bg-black border-black",
      accent: "bg-yellow-400 border-yellow-400",
      success: "bg-green-400 border-green-400",
      warning: "bg-orange-400 border-orange-400",
      error: "bg-red-400 border-red-400",
      info: "bg-blue-400 border-blue-400"
    }, m = {
      slow: "duration-2000",
      normal: "duration-1000",
      fast: "duration-500"
    }, u = () => {
      const p = _(
        "border-2 border-black",
        h[t],
        m[o]
      );
      switch (n) {
        case "dots":
          return /* @__PURE__ */ k(be, { children: [
            /* @__PURE__ */ r(
              "span",
              {
                className: _(
                  p,
                  i[e].dot,
                  "animate-pulse"
                ),
                style: {
                  animationDelay: "0ms",
                  fontFamily: "JetBrains Mono, monospace"
                }
              }
            ),
            /* @__PURE__ */ r(
              "span",
              {
                className: _(
                  p,
                  i[e].dot,
                  "animate-pulse"
                ),
                style: {
                  animationDelay: "200ms",
                  fontFamily: "JetBrains Mono, monospace"
                }
              }
            ),
            /* @__PURE__ */ r(
              "span",
              {
                className: _(
                  p,
                  i[e].dot,
                  "animate-pulse"
                ),
                style: {
                  animationDelay: "400ms",
                  fontFamily: "JetBrains Mono, monospace"
                }
              }
            )
          ] });
        case "bars":
          return /* @__PURE__ */ k(be, { children: [
            /* @__PURE__ */ r(
              "span",
              {
                className: _(
                  p,
                  i[e].bar,
                  "animate-bounce"
                ),
                style: {
                  animationDelay: "0ms",
                  fontFamily: "JetBrains Mono, monospace"
                }
              }
            ),
            /* @__PURE__ */ r(
              "span",
              {
                className: _(
                  p,
                  i[e].bar,
                  "animate-bounce"
                ),
                style: {
                  animationDelay: "100ms",
                  fontFamily: "JetBrains Mono, monospace"
                }
              }
            ),
            /* @__PURE__ */ r(
              "span",
              {
                className: _(
                  p,
                  i[e].bar,
                  "animate-bounce"
                ),
                style: {
                  animationDelay: "200ms",
                  fontFamily: "JetBrains Mono, monospace"
                }
              }
            ),
            /* @__PURE__ */ r(
              "span",
              {
                className: _(
                  p,
                  i[e].bar,
                  "animate-bounce"
                ),
                style: {
                  animationDelay: "300ms",
                  fontFamily: "JetBrains Mono, monospace"
                }
              }
            )
          ] });
        case "square":
          return /* @__PURE__ */ r(
            "span",
            {
              className: _(
                p,
                i[e].square,
                "animate-spin border-4"
              ),
              style: {
                fontFamily: "JetBrains Mono, monospace"
              }
            }
          );
        case "glitch":
          return /* @__PURE__ */ k(be, { children: [
            /* @__PURE__ */ r(
              "span",
              {
                className: _(
                  p,
                  i[e].glitch,
                  "absolute animate-ping border-4"
                ),
                style: {
                  animationDelay: "0ms",
                  fontFamily: "JetBrains Mono, monospace"
                }
              }
            ),
            /* @__PURE__ */ r(
              "span",
              {
                className: _(
                  "absolute border-2 bg-transparent",
                  h[t].replace("bg-", "border-"),
                  i[e].glitch,
                  "animate-pulse"
                ),
                style: {
                  animationDelay: "100ms",
                  fontFamily: "JetBrains Mono, monospace"
                }
              }
            ),
            /* @__PURE__ */ r(
              "span",
              {
                className: _(
                  "absolute bg-black border-none scale-75",
                  i[e].glitch,
                  "animate-ping"
                ),
                style: {
                  animationDelay: "200ms",
                  fontFamily: "JetBrains Mono, monospace"
                }
              }
            )
          ] });
        default:
          return null;
      }
    }, d = _(
      "inline-flex items-center justify-center gap-2",
      n === "glitch" && "relative",
      n === "bars" && i[e].container,
      s
    );
    return /* @__PURE__ */ k(
      "div",
      {
        ref: l,
        className: d,
        role: "status",
        "aria-label": a,
        style: {
          fontFamily: "JetBrains Mono, monospace",
          fontWeight: "bold"
        },
        ...c,
        children: [
          u(),
          /* @__PURE__ */ r("span", { className: "sr-only", children: a })
        ]
      }
    );
  }
);
fo.displayName = "Spinner";
const vo = ({
  orientation: e = "horizontal",
  thickness: t = "medium",
  variant: n = "solid",
  className: o,
  style: a,
  label: s,
  labelPosition: c = "center",
  ariaLabel: l = "Separator"
}) => {
  const i = e === "horizontal", h = _(
    "flex items-center relative text-black",
    i ? "w-full my-6" : "h-full mx-6 flex-col",
    o
  ), m = {
    thin: i ? "border-t" : "border-l",
    medium: i ? "border-t-2" : "border-l-2",
    thick: i ? "border-t-4" : "border-l-4"
  }, u = {
    solid: "border-black",
    dashed: "border-black border-dashed",
    dotted: "border-black border-dotted",
    double: "border-black border-double"
  };
  if (s && i) {
    const d = _(
      "flex-1 bg-black",
      t === "thin" ? "h-px" : t === "thick" ? "h-1" : "h-0.5"
    ), p = () => {
      switch (n) {
        case "dashed":
          return {
            background: "repeating-linear-gradient(to right, black 0, black 8px, transparent 8px, transparent 16px)",
            backgroundSize: "16px 100%",
            backgroundColor: "transparent"
          };
        case "dotted":
          return {
            background: "repeating-linear-gradient(to right, black 0, black 4px, transparent 4px, transparent 8px)",
            backgroundSize: "8px 100%",
            backgroundColor: "transparent"
          };
        case "double":
          return {
            backgroundColor: "transparent",
            borderTop: "2px solid black",
            borderBottom: "2px solid black",
            height: "6px"
          };
        default:
          return {};
      }
    }, x = _(
      "flex-shrink-0 px-2 font-mono text-sm font-bold uppercase tracking-wide",
      "text-black"
    );
    return /* @__PURE__ */ k(
      "div",
      {
        className: _(h, "gap-4 border-none"),
        style: {
          ...a,
          fontFamily: "JetBrains Mono, monospace",
          fontWeight: "bold"
        },
        role: "separator",
        "aria-orientation": e,
        "aria-label": l,
        children: [
          c !== "start" && /* @__PURE__ */ r("div", { className: d, style: p() }),
          /* @__PURE__ */ r("div", { className: x, children: typeof s == "string" ? /* @__PURE__ */ r("span", { children: s }) : s }),
          c !== "end" && /* @__PURE__ */ r("div", { className: d, style: p() })
        ]
      }
    );
  }
  return /* @__PURE__ */ r(
    "div",
    {
      className: _(
        h,
        m[t],
        u[n]
      ),
      style: {
        ...a,
        fontFamily: "JetBrains Mono, monospace",
        fontWeight: "bold"
      },
      role: "separator",
      "aria-orientation": e,
      "aria-label": l
    }
  );
};
vo.displayName = "Separator";
const yo = w(
  ({
    shape: e = "text",
    animation: t = "pulse",
    width: n,
    height: o,
    lines: a = 1,
    variant: s = "default",
    className: c,
    style: l,
    ...i
  }, h) => {
    const m = e === "text", u = e === "circular", d = {
      ...l,
      ...n && { width: typeof n == "number" ? `${n}px` : n },
      ...o && { height: typeof o == "number" ? `${o}px` : o },
      fontFamily: "JetBrains Mono, monospace",
      fontWeight: "bold"
    };
    u && n && !o && (d.height = d.width);
    const p = _(
      "bg-gray-200 border border-black block relative overflow-hidden",
      // Shape classes
      m && "h-5 leading-normal",
      u && "rounded-full min-w-10 min-h-10",
      e === "rectangular" && "min-w-50 min-h-30",
      // Variant classes
      s === "rounded" && !u && "rounded",
      // Animation classes
      t === "pulse" && "animate-pulse",
      t === "wave" && "bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[wave_1.6s_linear_infinite]",
      c
    );
    if (m && a > 1) {
      const x = Array.from({ length: a }, (f, g) => {
        const C = g === a - 1 ? "75%" : "100%";
        return /* @__PURE__ */ r(
          "div",
          {
            className: _(
              "bg-gray-200 border border-black block relative overflow-hidden h-5 leading-normal",
              t === "pulse" && "animate-pulse",
              t === "wave" && "bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[wave_1.6s_linear_infinite]",
              s === "rounded" && "rounded"
            ),
            style: {
              width: C,
              marginBottom: g < a - 1 ? "8px" : 0,
              fontFamily: "JetBrains Mono, monospace",
              fontWeight: "bold"
            },
            "aria-hidden": "true"
          },
          g
        );
      });
      return /* @__PURE__ */ r(
        "div",
        {
          ref: h,
          className: "flex flex-col w-full",
          role: "status",
          "aria-label": "Loading content",
          style: {
            fontFamily: "JetBrains Mono, monospace",
            fontWeight: "bold"
          },
          ...i,
          children: x
        }
      );
    }
    return /* @__PURE__ */ r(
      "div",
      {
        ref: h,
        className: p,
        style: d,
        role: "status",
        "aria-label": "Loading content",
        "aria-hidden": "true",
        ...i
      }
    );
  }
);
yo.displayName = "Skeleton";
const E0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Alert: tt,
  AspectRatio: to,
  Avatar: go,
  Badge: lo,
  Button: t0,
  Card: gt,
  Checkbox: po,
  Input: so,
  Progress: bo,
  Separator: vo,
  Skeleton: yo,
  Spinner: fo
}, Symbol.toStringTag, { value: "Module" }));
export {
  it as AVAILABLE_THEMES,
  At as Accordion,
  ot as Alert,
  fd as AlertStack,
  Wb as AreaChart,
  Kb as AspectRatio,
  fi as Avatar,
  zi as Badge,
  Tg as BarChart,
  On as Breadcrumb,
  Yn as BreadcrumbItem,
  Xn as BreadcrumbLink,
  Un as BreadcrumbPage,
  Yo as Button,
  gn as CLASSIC_THEME,
  $t as Card,
  S0 as Carousel,
  T0 as Chart,
  Ms as Checkbox,
  Ft as Combobox,
  Qe as Command,
  Xt as CommandEmpty,
  Ut as CommandGroup,
  Ot as CommandInput,
  Zt as CommandItem,
  Yt as CommandList,
  Qt as CommandSeparator,
  cp as Container,
  C0 as ContextMenu,
  Pt as CustomSelect,
  Zu as DARK_THEME,
  wt as DEFAULT_THEME,
  w0 as Dialog,
  Sn as DialogBody,
  In as DialogClose,
  Tn as DialogFooter,
  Cn as DialogHeader,
  Ln as DialogTitle,
  Ke as Drawer,
  mt as Dropdown,
  Gt as HoverCard,
  Vt as HoverCardContent,
  Jt as HoverCardTrigger,
  _a as Input,
  $a as InputOTP,
  Qg as LineChart,
  n_ as MONOCHROME_THEME,
  e_ as NATURE_THEME,
  Xu as NEON_THEME,
  lt as Navigation,
  ir as NavigationItem,
  dr as NavigationLink,
  cr as NavigationList,
  ur as NavigationSeparator,
  t_ as OCEAN_THEME,
  Uu as PASTEL_THEME,
  sf as Pagination,
  fb as PieChart,
  at as Popover,
  hn as PopoverBody,
  _n as PopoverContent,
  pn as PopoverFooter,
  mn as PopoverHeader,
  Od as Progress,
  Qu as RETRO_THEME,
  Qs as Radio,
  s0 as RadioGroup,
  vs as Select,
  Yu as Separator,
  L0 as Sheet,
  Zn as Sidebar,
  er as SidebarContent,
  tr as SidebarFooter,
  nr as SidebarGroup,
  or as SidebarGroupContent,
  rr as SidebarGroupLabel,
  Qn as SidebarHeader,
  ar as SidebarMenu,
  lr as SidebarMenuButton,
  sr as SidebarMenuItem,
  su as Skeleton,
  Qc as Slider,
  Tm as Spinner,
  mp as Stack,
  gl as Switch,
  g0 as Table,
  ht as TableOfContents,
  mr as TableOfContentsItem,
  hr as TableOfContentsLink,
  _r as TableOfContentsList,
  k0 as Tabs,
  E0 as Tailwind,
  qa as Textarea,
  p0 as ThemePicker,
  u0 as ThemeProvider,
  b0 as ToastProvider,
  Ll as Toggle,
  Ve as Tooltip,
  Ne as Typography,
  yc as TypographyBlockquote,
  wc as TypographyCode,
  uc as TypographyH1,
  _c as TypographyH2,
  mc as TypographyH3,
  hc as TypographyH4,
  bc as TypographyLarge,
  gc as TypographyLead,
  xc as TypographyList,
  vc as TypographyMuted,
  pc as TypographyP,
  fc as TypographySmall,
  bn as applyTheme,
  i_ as generateAppFile,
  s_ as generateCSSVariablesCode,
  i0 as generateMultiFileCode,
  o_ as generateRandomTheme,
  l_ as generateReactThemeCode,
  a_ as generateThemeCSS,
  c_ as generateThemeFile,
  c0 as generateThemeJS,
  d0 as getCurrentThemeFromDOM,
  r_ as getThemeById,
  vt as isValidTheme,
  u_ as loadThemeFromStorage,
  __ as resetToDefaultTheme,
  d_ as saveThemeToStorage,
  I0 as shapes,
  A0 as shapesList,
  v0 as toast,
  y0 as useDialog,
  x0 as useDropdown,
  m0 as useIsThemeActive,
  l0 as usePopover,
  N0 as useSidebar,
  $0 as useTabs,
  ut as useTheme,
  _0 as useThemeColors,
  h0 as useThemeSwitcher,
  f0 as useToast
};
//# sourceMappingURL=index.js.map
