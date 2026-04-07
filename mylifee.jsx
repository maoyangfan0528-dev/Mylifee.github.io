import React, { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Upload,
  User,
  Wand2,
  Check,
  Plus,
  MapPin,
  CalendarDays,
  Sparkles,
  Briefcase,
  Heart,
  Venus,
  Trash2,
  Hash,
  Bug,
  Image as ImageIcon,
} from "lucide-react";

const defaultAvatarOptions = [
  { key: "neutral", label: "默认头像", emoji: "🧑", gradient: "linear-gradient(135deg,#e2e8f0,#cbd5e1)" },
  { key: "girl", label: "元气女孩", emoji: "👧", gradient: "linear-gradient(135deg,#fbcfe8,#fda4af)" },
  { key: "boy", label: "阳光男孩", emoji: "👦", gradient: "linear-gradient(135deg,#bae6fd,#93c5fd)" },
  { key: "woman", label: "温柔女生", emoji: "👩", gradient: "linear-gradient(135deg,#f5d0fe,#fbcfe8)" },
  { key: "man", label: "简约男生", emoji: "👨", gradient: "linear-gradient(135deg,#c7d2fe,#e2e8f0)" },
  { key: "cat", label: "猫咪头像", emoji: "🐱", gradient: "linear-gradient(135deg,#fde68a,#fdba74)" },
  { key: "dog", label: "小狗头像", emoji: "🐶", gradient: "linear-gradient(135deg,#d9f99d,#86efac)" },
  { key: "star", label: "梦幻星光", emoji: "✨", gradient: "linear-gradient(135deg,#ddd6fe,#c4b5fd)" },
];

const iconGroups = {
  gender: {
    title: "性别",
    type: "single",
    options: [
      { key: "female", label: "女", emoji: "♀️", bg: "#fce7f3", text: "#be185d" },
      { key: "male", label: "男", emoji: "♂️", bg: "#e0f2fe", text: "#0369a1" },
    ],
  },
  career: {
    title: "职业 / 状态",
    type: "multi",
    options: [
      { key: "work", label: "工作", emoji: "💼", bg: "#f1f5f9", text: "#334155" },
      { key: "study", label: "读书", emoji: "🎓", bg: "#cffafe", text: "#0f766e" },
      { key: "entrepreneur", label: "创业", emoji: "🚀", bg: "#ede9fe", text: "#6d28d9" },
      { key: "freelance", label: "自由职业", emoji: "🧩", bg: "#e0e7ff", text: "#4338ca" },
    ],
  },
  relationship: {
    title: "情感情况",
    type: "multi",
    options: [
      { key: "love-mf", label: "男女", emoji: "👩‍❤️‍👨", bg: "#ffe4e6", text: "#be123c" },
      { key: "love-mm", label: "男男", emoji: "💑", bg: "#dbeafe", text: "#1d4ed8" },
      { key: "love-ff", label: "女女", emoji: "👩‍❤️‍👩", bg: "#fae8ff", text: "#a21caf" },
      { key: "single", label: "单身", emoji: "✨", bg: "#fef3c7", text: "#b45309" },
    ],
  },
  pets: {
    title: "宠物",
    type: "multi",
    quantityEnabled: true,
    options: [
      { key: "cat", label: "猫", emoji: "🐱", bg: "#ffedd5", text: "#c2410c" },
      { key: "dog", label: "狗", emoji: "🐶", bg: "#ecfccb", text: "#4d7c0f" },
      { key: "hamster", label: "仓鼠", emoji: "🐹", bg: "#fef9c3", text: "#a16207" },
      { key: "rabbit", label: "兔子", emoji: "🐰", bg: "#fce7f3", text: "#be185d" },
      { key: "bird", label: "小鸟", emoji: "🐦", bg: "#e0f2fe", text: "#0369a1" },
      { key: "fish", label: "鱼", emoji: "🐠", bg: "#cffafe", text: "#0f766e" },
      { key: "turtle", label: "乌龟", emoji: "🐢", bg: "#d1fae5", text: "#047857" },
      { key: "snake", label: "蛇", emoji: "🐍", bg: "#dcfce7", text: "#15803d" },
      { key: "horse", label: "马", emoji: "🐴", bg: "#f5f5f4", text: "#57534e" },
      { key: "alpaca", label: "羊驼", emoji: "🦙", bg: "#fafaf9", text: "#57534e" },
      { key: "pig", label: "小猪", emoji: "🐷", bg: "#ffe4e6", text: "#be123c" },
      { key: "duck", label: "鸭子", emoji: "🦆", bg: "#fef3c7", text: "#b45309" },
      { key: "chicken", label: "小鸡", emoji: "🐥", bg: "#fef9c3", text: "#a16207" },
      { key: "panda", label: "熊猫", emoji: "🐼", bg: "#f1f5f9", text: "#334155" },
      { key: "koala", label: "考拉", emoji: "🐨", bg: "#f4f4f5", text: "#52525b" },
      { key: "monkey", label: "猴子", emoji: "🐵", bg: "#ffedd5", text: "#9a3412" },
      { key: "other-pet", label: "其他", emoji: "➕", bg: "#eef2ff", text: "#4338ca" },
    ],
  },
  life: {
    title: "生活事件",
    type: "multi",
    quantityEnabled: true,
    quantityKeys: ["house", "car", "motorcycle", "scooter"],
    options: [
      { key: "house", label: "房子", emoji: "🏠", bg: "#ede9fe", text: "#6d28d9" },
      { key: "car", label: "汽车", emoji: "🚗", bg: "#d1fae5", text: "#047857" },
      { key: "motorcycle", label: "摩托车", emoji: "🏍️", bg: "#fee2e2", text: "#b91c1c" },
      { key: "scooter", label: "电瓶车", emoji: "🛵", bg: "#dbeafe", text: "#1d4ed8" },
      { key: "travel", label: "旅行", emoji: "🧳", bg: "#ccfbf1", text: "#0f766e" },
      { key: "move", label: "搬家", emoji: "📦", bg: "#f1f5f9", text: "#334155" },
      { key: "other-life", label: "其他", emoji: "➕", bg: "#eef2ff", text: "#4338ca" },
    ],
  },
  hobby: {
    title: "爱好",
    type: "multi",
    options: [
      { key: "guitar", label: "吉他", emoji: "🎸", bg: "#ffedd5", text: "#c2410c" },
      { key: "piano", label: "钢琴", emoji: "🎹", bg: "#f1f5f9", text: "#334155" },
      { key: "violin", label: "小提琴", emoji: "🎻", bg: "#ffe4e6", text: "#be123c" },
      { key: "trumpet", label: "小号", emoji: "🎺", bg: "#fef3c7", text: "#b45309" },
      { key: "drum", label: "鼓", emoji: "🥁", bg: "#fee2e2", text: "#b91c1c" },
      { key: "sax", label: "萨克斯", emoji: "🎷", bg: "#fef3c7", text: "#a16207" },
      { key: "accordion", label: "手风琴", emoji: "🪗", bg: "#ede9fe", text: "#6d28d9" },
      { key: "flute", label: "笛子", emoji: "🪈", bg: "#cffafe", text: "#0f766e" },
      { key: "camera", label: "摄影", emoji: "📷", bg: "#e0f2fe", text: "#0369a1" },
      { key: "dance", label: "跳舞", emoji: "💃", bg: "#fce7f3", text: "#be185d" },
      { key: "hiking", label: "徒步", emoji: "🥾", bg: "#ecfccb", text: "#4d7c0f" },
      { key: "climbing", label: "登山", emoji: "🧗", bg: "#e0e7ff", text: "#4338ca" },
      { key: "food", label: "美食", emoji: "🍜", bg: "#ffedd5", text: "#c2410c" },
      { key: "music", label: "音乐", emoji: "🎵", bg: "#ede9fe", text: "#6d28d9" },
      { key: "movie", label: "电影", emoji: "🎬", bg: "#e5e7eb", text: "#374151" },
      { key: "book", label: "阅读", emoji: "📚", bg: "#dbeafe", text: "#1d4ed8" },
      { key: "game", label: "游戏", emoji: "🎮", bg: "#ddd6fe", text: "#5b21b6" },
      { key: "art", label: "绘画", emoji: "🎨", bg: "#fae8ff", text: "#a21caf" },
      { key: "other-hobby", label: "其他", emoji: "➕", bg: "#eef2ff", text: "#4338ca" },
    ],
  },
};

const iconLookup = Object.values(iconGroups)
  .flatMap((group) => group.options)
  .reduce((acc, item) => {
    acc[item.key] = item;
    return acc;
  }, {} as Record<string, any>);

const initialEvents = [
  {
    id: 1,
    title: "在杭州开始我的故事",
    startDate: "2006-09-01",
    endDate: "2013-09-01",
    province: "浙江",
    city: "杭州",
    note: "童年阶段，拥有最初的家庭与生活记忆。",
    selections: { gender: "female", career: [], relationship: [], pets: ["cat"], life: ["house"], hobby: ["music"] },
    counts: { cat: 2, house: 1 },
    customEntries: {},
  },
  {
    id: 2,
    title: "进入读书成长阶段",
    startDate: "2014-09-01",
    endDate: "2021-06-30",
    province: "浙江",
    city: "宁波",
    note: "这一阶段以学习为主，也开始有更多独立成长的体验。",
    selections: { gender: "female", career: ["study"], relationship: [], pets: ["dog", "fish"], life: [], hobby: ["camera", "dance"] },
    counts: { dog: 1, fish: 3 },
    customEntries: {},
  },
  {
    id: 3,
    title: "来到新的城市继续前进",
    startDate: "2023-04-01",
    endDate: "2025-04-01",
    province: "上海",
    city: "上海",
    note: "开始新的学习与生活，也逐渐形成更清晰的自己。",
    selections: { gender: "female", career: ["study", "work"], relationship: ["single"], pets: [], life: ["travel", "move", "car"], hobby: ["guitar", "food", "music"] },
    counts: { car: 1 },
    customEntries: {},
  },
];

const provincePins = [
  { name: "新疆", x: 18, y: 28 },
  { name: "西藏", x: 25, y: 48 },
  { name: "青海", x: 35, y: 34 },
  { name: "甘肃", x: 43, y: 31 },
  { name: "内蒙古", x: 56, y: 18 },
  { name: "宁夏", x: 49, y: 31 },
  { name: "陕西", x: 49, y: 39 },
  { name: "山西", x: 57, y: 35 },
  { name: "河北", x: 66, y: 33 },
  { name: "北京", x: 68.5, y: 27.5 },
  { name: "天津", x: 71, y: 30 },
  { name: "辽宁", x: 77, y: 27 },
  { name: "吉林", x: 84, y: 23 },
  { name: "黑龙江", x: 90, y: 17 },
  { name: "山东", x: 71, y: 41 },
  { name: "河南", x: 60, y: 45 },
  { name: "江苏", x: 77, y: 49 },
  { name: "上海", x: 81.5, y: 53 },
  { name: "安徽", x: 69, y: 49 },
  { name: "湖北", x: 57, y: 55 },
  { name: "重庆", x: 47, y: 54 },
  { name: "四川", x: 40, y: 53 },
  { name: "浙江", x: 78, y: 58 },
  { name: "江西", x: 68, y: 60 },
  { name: "湖南", x: 58, y: 65 },
  { name: "福建", x: 78, y: 69 },
  { name: "贵州", x: 47, y: 64 },
  { name: "云南", x: 36, y: 66 },
  { name: "广西", x: 52, y: 76 },
  { name: "广东", x: 66, y: 76 },
  { name: "海南", x: 65, y: 90 },
  { name: "台湾", x: 87, y: 75 },
  { name: "香港", x: 69.5, y: 80.5 },
  { name: "澳门", x: 67.2, y: 80.8 },
];

function getCountValue(counts: Record<string, number> | undefined, key: string) {
  const value = counts?.[key];
  return Number.isFinite(value) && value > 0 ? value : 1;
}

function getMultiSelections(selections: any, groupKey: string): string[] {
  const value = selections?.[groupKey];
  return Array.isArray(value) ? value : [];
}

function getSingleSelection(selections: any, groupKey: string): string {
  const value = selections?.[groupKey];
  return typeof value === "string" ? value : "";
}

function shouldShowCount(groupKey: string, optionKey: string) {
  const group = (iconGroups as any)[groupKey];
  if (!group?.quantityEnabled) return false;
  if (!group.quantityKeys) return true;
  return group.quantityKeys.includes(optionKey);
}

function shouldRenderCountForKey(selections: any, key: string) {
  return getMultiSelections(selections, "pets").includes(key) || (getMultiSelections(selections, "life").includes(key) && shouldShowCount("life", key));
}

function getCustomEntryKey(groupKey: string, optionKey: string) {
  return `${groupKey}:${optionKey}`;
}

function getCustomEntry(customEntries: Record<string, any> | undefined, groupKey: string, optionKey: string) {
  return customEntries?.[getCustomEntryKey(groupKey, optionKey)] || null;
}

function getAllSelectedIcons(selections: any, counts: Record<string, number> = {}, customEntries: Record<string, any> = {}) {
  const grouped: [string, string[]][] = [
    ["gender", [getSingleSelection(selections, "gender")]],
    ["career", getMultiSelections(selections, "career")],
    ["relationship", getMultiSelections(selections, "relationship")],
    ["pets", getMultiSelections(selections, "pets")],
    ["life", getMultiSelections(selections, "life")],
    ["hobby", getMultiSelections(selections, "hobby")],
  ];

  return grouped.flatMap(([groupKey, keys]) =>
    keys
      .filter(Boolean)
      .map((key) => {
        const icon = (iconLookup as any)[key];
        if (!icon) return null;
        const custom = getCustomEntry(customEntries, groupKey, key);
        return {
          ...icon,
          count: getCountValue(counts, key),
          label: custom?.name?.trim() || icon.label,
          emoji: custom?.emoji?.trim() || icon.emoji,
          groupKey,
        };
      })
      .filter(Boolean)
  );
}

function expandIconsForOverview(selections: any, counts: Record<string, number> = {}, customEntries: Record<string, any> = {}) {
  return getAllSelectedIcons(selections, counts, customEntries).flatMap((icon: any) => {
    const repeat = shouldRenderCountForKey(selections, icon.key) ? icon.count : 1;
    return Array.from({ length: repeat }, (_, index) => ({ ...icon, instanceKey: `${icon.groupKey}-${icon.key}-${index}` }));
  });
}

function toggleMultiOption(list: string[] | undefined, key: string) {
  const safeList = Array.isArray(list) ? list : [];
  return safeList.includes(key) ? safeList.filter((item) => item !== key) : [...safeList, key];
}

function isValidDateRange(startDate: string, endDate: string) {
  if (!startDate || !endDate) return false;
  return new Date(startDate).getTime() <= new Date(endDate).getTime();
}

async function exportElementAsImage(element: HTMLElement | null, filename: string) {
  if (!element) return;
  const html2canvas = (await import("html2canvas")).default;
  const canvas = await html2canvas(element, {
    backgroundColor: "#ffffff",
    scale: 2,
    useCORS: true,
  });
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

function runHelperTests() {
  const tests = [
    {
      name: "getAllSelectedIcons exists and returns array",
      pass: Array.isArray(getAllSelectedIcons({ gender: "female", career: [], relationship: [], pets: [], life: [], hobby: [] }, {}, {})),
    },
    {
      name: "custom entry overrides icon label and emoji",
      pass: (() => {
        const result = getAllSelectedIcons(
          { gender: "female", career: [], relationship: [], pets: ["other-pet"], life: [], hobby: [] },
          { "other-pet": 2 },
          { "pets:other-pet": { name: "守宫", emoji: "🦎" } }
        );
        return result[1]?.label === "守宫" && result[1]?.emoji === "🦎";
      })(),
    },
    {
      name: "CountInputs tolerates non-array multi value",
      pass: JSON.stringify(getMultiSelections({ pets: "cat" }, "pets")) === JSON.stringify([]),
    },
    {
      name: "Single selection returns string only",
      pass: getSingleSelection({ gender: "female" }, "gender") === "female" && getSingleSelection({ gender: ["female"] }, "gender") === "",
    },
    {
      name: "toggleMultiOption adds and removes",
      pass: JSON.stringify(toggleMultiOption([], "cat")) === JSON.stringify(["cat"]) && JSON.stringify(toggleMultiOption(["cat", "dog"], "cat")) === JSON.stringify(["dog"]),
    },
    {
      name: "shouldShowCount works for pets and life",
      pass: shouldShowCount("pets", "cat") === true && shouldShowCount("life", "travel") === false && shouldShowCount("life", "car") === true,
    },
    {
      name: "expandIconsForOverview repeats by count",
      pass: expandIconsForOverview({ pets: ["cat"], life: ["house"], gender: "female", hobby: [], career: [], relationship: [] }, { cat: 2, house: 2 }, {}).length === 5,
    },
  ];
  return { total: tests.length, passed: tests.filter((test) => test.pass).length, tests };
}

const styles = {
  pageBg: { minHeight: "100vh", background: "linear-gradient(180deg,#f8fafc 0%,#ffffff 100%)", color: "#0f172a" },
  card: { background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 24, boxShadow: "0 10px 30px rgba(15,23,42,0.06)" },
  buttonPrimary: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, borderRadius: 9999, border: "none", background: "#0f172a", color: "#ffffff", padding: "12px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" },
  buttonSecondary: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, borderRadius: 9999, border: "1px solid #cbd5e1", background: "#ffffff", color: "#0f172a", padding: "12px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" },
  input: { width: "100%", height: 44, borderRadius: 16, border: "1px solid #cbd5e1", padding: "0 14px", background: "#ffffff", color: "#0f172a", outline: "none", boxSizing: "border-box" as const },
  textarea: { width: "100%", minHeight: 120, borderRadius: 16, border: "1px solid #cbd5e1", padding: 14, background: "#ffffff", color: "#0f172a", outline: "none", boxSizing: "border-box" as const, resize: "vertical" as const },
  badge: { display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 9999, border: "1px solid #e2e8f0", background: "#ffffff", fontSize: 12, fontWeight: 600, color: "#475569" },
};

function BadgePill({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <span style={{ ...styles.badge, ...style }}>{children}</span>;
}

function Panel({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ ...styles.card, ...style }}>{children}</div>;
}

function PrimaryButton({ children, style, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { style?: React.CSSProperties }) {
  return <button style={{ ...styles.buttonPrimary, ...style }} {...props}>{children}</button>;
}

function SecondaryButton({ children, style, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { style?: React.CSSProperties }) {
  return <button style={{ ...styles.buttonSecondary, ...style }} {...props}>{children}</button>;
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} style={{ ...styles.input, ...(props.style || {}) }} />;
}

function TextAreaInput(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} style={{ ...styles.textarea, ...(props.style || {}) }} />;
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div style={{ height: 10, borderRadius: 9999, background: "#e2e8f0", overflow: "hidden" }}>
      <div style={{ width: `${value}%`, height: "100%", background: "linear-gradient(90deg,#60a5fa,#2563eb)" }} />
    </div>
  );
}

function CustomEntryFields({
  groupKey,
  optionKey,
  customEntries,
  setCustomEntries,
}: {
  groupKey: string;
  optionKey: string;
  customEntries: Record<string, any>;
  setCustomEntries: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}) {
  const custom = getCustomEntry(customEntries, groupKey, optionKey) || { name: "", emoji: "" };
  return (
    <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "1fr 88px", gap: 8 }}>
      <TextInput
        value={custom.name}
        onChange={(e) => setCustomEntries((prev) => ({
          ...prev,
          [getCustomEntryKey(groupKey, optionKey)]: { ...custom, name: e.target.value },
        }))}
        placeholder="输入名字"
        style={{ height: 38, borderRadius: 12, fontSize: 13 }}
      />
      <TextInput
        value={custom.emoji}
        onChange={(e) => setCustomEntries((prev) => ({
          ...prev,
          [getCustomEntryKey(groupKey, optionKey)]: { ...custom, emoji: e.target.value },
        }))}
        placeholder="图标"
        style={{ height: 38, borderRadius: 12, fontSize: 13, textAlign: "center" }}
      />
    </div>
  );
}

function RegistrationPage({
  authMode,
  setAuthMode,
  authForm,
  setAuthForm,
  onEnter,
}: {
  authMode: string;
  setAuthMode: React.Dispatch<React.SetStateAction<string>>;
  authForm: { nickname: string; email: string; password: string };
  setAuthForm: React.Dispatch<React.SetStateAction<{ nickname: string; email: string; password: string }>>;
  onEnter: () => void;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={{ minHeight: "100vh", background: "linear-gradient(135deg,#eff6ff,#ffffff 35%,#fdf2f8)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <Panel style={{ width: "100%", maxWidth: 980, padding: 28, display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 24 }}>
        <div style={{ display: "grid", gap: 18, alignContent: "center" }}>
          <BadgePill style={{ width: "fit-content" }}>人生轨迹网页 · 注册 / 登录</BadgePill>
          <div style={{ fontSize: 46, lineHeight: 1.08, fontWeight: 800, color: "#0f172a" }}>先进入你的专属空间</div>
          <div style={{ fontSize: 16, lineHeight: 1.8, color: "#475569", maxWidth: 460 }}>
            在这里注册或登录后，你可以继续制作自己的人生轨迹，并在“个人”里查看过往制作历史。
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <BadgePill>注册</BadgePill>
            <BadgePill>登录</BadgePill>
            <BadgePill>个人历史</BadgePill>
            <BadgePill>继续编辑</BadgePill>
          </div>
        </div>
        <Panel style={{ padding: 24, background: "linear-gradient(180deg,#ffffff,#f8fafc)" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <button type="button" onClick={() => setAuthMode("login")} style={{ flex: 1, borderRadius: 16, border: authMode === "login" ? "1px solid #0f172a" : "1px solid #e2e8f0", background: authMode === "login" ? "#0f172a" : "#ffffff", color: authMode === "login" ? "#ffffff" : "#334155", padding: 12, fontWeight: 700, cursor: "pointer" }}>登录</button>
            <button type="button" onClick={() => setAuthMode("register")} style={{ flex: 1, borderRadius: 16, border: authMode === "register" ? "1px solid #0f172a" : "1px solid #e2e8f0", background: authMode === "register" ? "#0f172a" : "#ffffff", color: authMode === "register" ? "#ffffff" : "#334155", padding: 12, fontWeight: 700, cursor: "pointer" }}>注册</button>
          </div>
          <div style={{ display: "grid", gap: 14 }}>
            {authMode === "register" && (
              <div>
                <label style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: 600, color: "#334155" }}>昵称</label>
                <TextInput value={authForm.nickname} onChange={(e) => setAuthForm((prev) => ({ ...prev, nickname: e.target.value }))} placeholder="输入昵称" />
              </div>
            )}
            <div>
              <label style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: 600, color: "#334155" }}>邮箱</label>
              <TextInput value={authForm.email} onChange={(e) => setAuthForm((prev) => ({ ...prev, email: e.target.value }))} placeholder="输入邮箱" />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: 600, color: "#334155" }}>密码</label>
              <TextInput type="password" value={authForm.password} onChange={(e) => setAuthForm((prev) => ({ ...prev, password: e.target.value }))} placeholder="输入密码" />
            </div>
            <PrimaryButton onClick={onEnter} style={{ width: "100%", height: 48, borderRadius: 18 }}>{authMode === "login" ? "登录并进入" : "注册并进入"}</PrimaryButton>
          </div>
        </Panel>
      </Panel>
    </motion.div>
  );
}

function ProfilePage({ histories, onBack, onOpenHistory }: { histories: { id: number; title: string; updatedAt: string }[]; onBack: () => void; onOpenHistory: (id: number) => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={styles.pageBg}>
      <div style={{ margin: "0 auto", maxWidth: 1120, padding: 24 }}>
        <div style={{ marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <SecondaryButton onClick={onBack}><ArrowLeft size={16} /> 返回</SecondaryButton>
          <BadgePill>个人</BadgePill>
        </div>
        <Panel style={{ padding: 24 }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>之前的制作历史</div>
          <div style={{ fontSize: 14, lineHeight: 1.7, color: "#64748b", marginBottom: 20 }}>这里展示你之前保存过的人生轨迹草稿或版本，可以随时重新打开继续编辑。</div>
          <div style={{ display: "grid", gap: 14 }}>
            {histories.map((history) => (
              <div key={history.id} style={{ border: "1px solid #e2e8f0", borderRadius: 18, padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>{history.title}</div>
                  <div style={{ marginTop: 6, fontSize: 13, color: "#64748b" }}>{history.updatedAt}</div>
                </div>
                <PrimaryButton onClick={() => onOpenHistory(history.id)} style={{ padding: "10px 16px" }}>打开</PrimaryButton>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </motion.div>
  );
}

function AvatarUploader({
  avatar,
  setAvatar,
  animeMode,
  setAnimeMode,
  defaultAvatar,
  setDefaultAvatar,
}: {
  avatar: string;
  setAvatar: React.Dispatch<React.SetStateAction<string>>;
  animeMode: boolean;
  setAnimeMode: React.Dispatch<React.SetStateAction<boolean>>;
  defaultAvatar: string;
  setDefaultAvatar: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setAvatar(typeof reader.result === "string" ? reader.result : "");
      setDefaultAvatar("");
    };
    reader.readAsDataURL(file);
  };

  const activeDefault = defaultAvatarOptions.find((item) => item.key === defaultAvatar) || defaultAvatarOptions[0];
  const showUploadedImage = Boolean(avatar);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: "999px", background: "rgba(251,207,232,0.6)", filter: "blur(48px)" }} />
        <div style={{ position: "relative", width: 320, height: 320, borderRadius: "999px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.8)", background: "rgba(255,255,255,0.8)", boxShadow: "0 20px 50px rgba(15,23,42,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {showUploadedImage ? (
            <img src={avatar} alt="用户头像" style={{ width: "100%", height: "100%", objectFit: "cover", filter: animeMode ? "contrast(1.1) saturate(1.25)" : "none" }} />
          ) : (
            <div style={{ width: 220, height: 220, borderRadius: "999px", background: activeDefault.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 84, boxShadow: "inset 0 4px 20px rgba(255,255,255,0.5)" }}>{activeDefault.emoji}</div>
          )}
          {animeMode && <div style={{ pointerEvents: "none", position: "absolute", inset: 0, background: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.55), transparent 35%), linear-gradient(135deg, rgba(255,182,193,0.16), rgba(147,197,253,0.16))" }} />}
        </div>
      </div>

      <div style={{ width: "100%", maxWidth: 420, display: "grid", gap: 12 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <label style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, borderRadius: 18, border: "1px dashed #cbd5e1", background: "#ffffff", padding: "14px 16px", cursor: "pointer", fontSize: 14, fontWeight: 600, color: "#334155" }}>
            <Upload size={16} />上传照片
            <input type="file" accept="image/*" onChange={handleUpload} style={{ display: "none" }} />
          </label>
          <SecondaryButton type="button" onClick={() => setAvatar("")}><User size={16} /> 使用默认头像</SecondaryButton>
        </div>

        <Panel style={{ padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>默认头像选择</div>
              <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>不上传照片时，也可以直接选择一个默认风格头像</div>
            </div>
            <BadgePill>{showUploadedImage ? "照片模式" : "默认模式"}</BadgePill>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {defaultAvatarOptions.map((item) => {
              const active = !showUploadedImage && defaultAvatar === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => {
                    setAvatar("");
                    setDefaultAvatar(item.key);
                  }}
                  title={item.label}
                  style={{ position: "relative", height: 64, borderRadius: 18, border: active ? "2px solid #0f172a" : "1px solid transparent", background: item.gradient, fontSize: 28, cursor: "pointer" }}
                >
                  {item.emoji}
                  {active && <Check size={14} style={{ position: "absolute", right: 6, top: 6, background: "#fff", borderRadius: 999, padding: 1, color: "#0f172a" }} />}
                </button>
              );
            })}
          </div>
        </Panel>

        <Panel style={{ padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 12, background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center" }}><Wand2 size={16} /></div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>动漫人物效果</div>
              <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>当前先做成展示版，后续可继续接 AI 生成功能</div>
            </div>
          </div>
          <button type="button" onClick={() => setAnimeMode((prev) => !prev)} style={{ position: "relative", width: 48, height: 28, borderRadius: 999, border: "none", background: animeMode ? "#0f172a" : "#cbd5e1", cursor: "pointer" }}>
            <span style={{ position: "absolute", top: 4, left: animeMode ? 24 : 4, width: 20, height: 20, borderRadius: 999, background: "#ffffff", transition: "all .2s" }} />
          </button>
        </Panel>
      </div>
    </div>
  );
}

function WelcomePage({
  nickname,
  setNickname,
  avatar,
  setAvatar,
  animeMode,
  setAnimeMode,
  defaultAvatar,
  setDefaultAvatar,
  onNext,
}: {
  nickname: string;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
  avatar: string;
  setAvatar: React.Dispatch<React.SetStateAction<string>>;
  animeMode: boolean;
  setAnimeMode: React.Dispatch<React.SetStateAction<boolean>>;
  defaultAvatar: string;
  setDefaultAvatar: React.Dispatch<React.SetStateAction<string>>;
  onNext: () => void;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={{ minHeight: "100vh", background: "radial-gradient(circle at top, #fef3c7, #ffffff 35%, #e9d5ff 70%, #e0f2fe 100%)", position: "relative", overflow: "hidden" }}>
      <div style={{ margin: "0 auto", minHeight: "100vh", maxWidth: 1200, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "center", padding: 24 }}>
        <div style={{ display: "grid", gap: 24 }}>
          <BadgePill style={{ width: "fit-content" }}>人生轨迹网页 · 首页</BadgePill>
          <div>
            <h1 style={{ fontSize: 64, lineHeight: 1.05, margin: 0, fontWeight: 800, color: "#0f172a" }}>Hello，{nickname || "xxx"}</h1>
            <p style={{ maxWidth: 620, fontSize: 18, lineHeight: 1.8, color: "#475569", marginTop: 16 }}>你可以上传自己的照片生成动漫感头像，也可以直接选择默认图标头像，然后带着它一起走进你的人生轨迹。这个网页会把时间、地点、身份、情感和陪伴都整理成可视化的成长故事。</p>
          </div>
          <div style={{ maxWidth: 360 }}>
            <label style={{ fontSize: 14, fontWeight: 600, color: "#334155", display: "block", marginBottom: 8 }}>模拟用户昵称</label>
            <TextInput value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="输入注册时的昵称" />
          </div>
        </div>
        <AvatarUploader avatar={avatar} setAvatar={setAvatar} animeMode={animeMode} setAnimeMode={setAnimeMode} defaultAvatar={defaultAvatar} setDefaultAvatar={setDefaultAvatar} />
      </div>
      <div style={{ position: "absolute", bottom: 32, right: 32 }}><PrimaryButton onClick={onNext}>继续 <ArrowRight size={18} /></PrimaryButton></div>
    </motion.div>
  );
}

function IntroPage({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f8fafc, #eef2ff 45%, #fdf2f8)", position: "relative" }}>
      <div style={{ margin: "0 auto", maxWidth: 1100, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 80, height: 80, borderRadius: 999, background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", boxShadow: "0 10px 30px rgba(15,23,42,0.08)" }}><Sparkles size={40} /></div>
          <h2 style={{ fontSize: 60, margin: 0, fontWeight: 800, color: "#0f172a" }}>我的人生轨迹...</h2>
          <p style={{ maxWidth: 760, margin: "20px auto 0", fontSize: 18, lineHeight: 1.8, color: "#475569" }}>你可以按时间段记录不同阶段，用中国地图点亮自己的位置，并用分类图标描述身份、职业、情感与宠物，让每一段人生都变得更清晰。</p>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 32, left: 32 }}><SecondaryButton onClick={onBack}>返回</SecondaryButton></div>
      <div style={{ position: "absolute", bottom: 32, right: 32 }}><PrimaryButton onClick={onNext}>进入 <ArrowRight size={18} /></PrimaryButton></div>
    </motion.div>
  );
}

function RealChinaMap({ activeProvince, onSelect }: { activeProvince: string; onSelect: (province: string) => void }) {
  return (
    <Panel
      style={{
        padding: 20,
        borderRadius: 32,
        background: "linear-gradient(135deg, rgba(255,255,255,0.88), rgba(255,255,255,0.68))",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.78)",
        boxShadow: "0 26px 60px rgba(99,102,241,0.10)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#64748b" }}>地图定位</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", marginTop: 4 }}>地点标签地图</div>
        </div>
        <BadgePill style={{ background: "rgba(255,255,255,0.76)", border: "1px solid rgba(191,219,254,0.9)", color: "#2563eb" }}>
          当前位置：{activeProvince || "未选择"}
        </BadgePill>
      </div>

      <div
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: 620,
          borderRadius: 28,
          border: "1px solid rgba(226,232,240,0.85)",
          background: "radial-gradient(circle at top, #e0f2fe 0%, #eef2ff 36%, #ffffff 76%)",
          padding: 24,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 18% 30%, rgba(125,211,252,0.18), transparent 18%), radial-gradient(circle at 80% 24%, rgba(196,181,253,0.18), transparent 20%), radial-gradient(circle at 56% 72%, rgba(251,191,36,0.10), transparent 18%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", height: 580, borderRadius: 22 }}>
          {provincePins.map((province) => {
            const active = province.name === activeProvince;
            return (
              <button
                key={province.name}
                type="button"
                onClick={() => onSelect(province.name)}
                style={{
                  position: "absolute",
                  left: `${province.x}%`,
                  top: `${province.y}%`,
                  transform: active ? "translate(-50%, -50%) scale(1.12)" : "translate(-50%, -50%) scale(1)",
                  border: "none",
                  background: "transparent",
                  padding: 0,
                  cursor: "pointer",
                  color: active ? "#4f46e5" : "#64748b",
                  fontSize: active ? 22 : 18,
                  fontWeight: active ? 800 : 600,
                  lineHeight: 1,
                  textShadow: active ? "0 8px 24px rgba(79,70,229,0.28)" : "0 2px 8px rgba(148,163,184,0.12)",
                  transition: "all 0.25s ease",
                  whiteSpace: "nowrap",
                }}
              >
                <span style={{ marginRight: 4 }}>📍</span>
                {province.name}
              </button>
            );
          })}
        </div>
      </div>

      <p style={{ marginTop: 12, fontSize: 12, lineHeight: 1.7, color: "#64748b" }}>
        现在改成了更简化的中心点样式。每个地点用 📍 + 省份名称表示，点击后会变色并放大，更清爽，也更适合你现在这个页面风格。
      </p>
    </Panel>
  );
}

function CountInputs({
  groupKey,
  selections,
  counts,
  setCounts,
}: {
  groupKey: string;
  selections: any;
  counts: Record<string, number>;
  setCounts: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}) {
  const visibleKeys = getMultiSelections(selections, groupKey).filter((key) => shouldShowCount(groupKey, key));
  if (!visibleKeys.length) return null;

  return (
    <div style={{ borderRadius: 18, background: "#f8fafc", padding: 16 }}>
      <div style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, color: "#1e293b" }}><Hash size={16} /> {(iconGroups as any)[groupKey].title}数量</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
        {visibleKeys.map((key) => {
          const icon = (iconLookup as any)[key];
          return (
            <div key={key} style={{ borderRadius: 16, border: "1px solid #e2e8f0", background: "#ffffff", padding: 12 }}>
              <div style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, color: "#334155" }}><span style={{ fontSize: 20 }}>{icon?.emoji}</span><span>{icon?.label}</span></div>
              <TextInput type="number" min="1" value={counts?.[key] ?? 1} onChange={(e) => setCounts((prev) => ({ ...prev, [key]: Math.max(1, Number(e.target.value) || 1) }))} style={{ height: 40, borderRadius: 12 }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CategorySelector({
  groupKey,
  group,
  selections,
  setSelections,
  counts,
  setCounts,
  customEntries,
  setCustomEntries,
}: {
  groupKey: string;
  group: any;
  selections: any;
  setSelections: React.Dispatch<React.SetStateAction<any>>;
  counts: Record<string, number>;
  setCounts: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  customEntries: Record<string, any>;
  setCustomEntries: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}) {
  const currentSingle = getSingleSelection(selections, groupKey);
  const currentMulti = getMultiSelections(selections, groupKey);

  const handleClick = (optionKey: string) => {
    if (group.type === "single") {
      setSelections((prev: any) => ({ ...prev, [groupKey]: optionKey }));
      return;
    }
    const selectedBefore = currentMulti.includes(optionKey);
    setSelections((prev: any) => ({ ...prev, [groupKey]: toggleMultiOption(getMultiSelections(prev, groupKey), optionKey) }));
    if (shouldShowCount(groupKey, optionKey) && !selectedBefore) {
      setCounts((prev) => ({ ...prev, [optionKey]: prev?.[optionKey] ?? 1 }));
    }
  };

  const isActive = (optionKey: string) => (group.type === "single" ? currentSingle === optionKey : currentMulti.includes(optionKey));

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>{group.title}</div>
        <BadgePill>{group.type === "single" ? "单选" : "多选"}</BadgePill>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }}>
        {group.options.map((item: any) => {
          const active = isActive(item.key);
          const count = shouldShowCount(groupKey, item.key) && active ? getCountValue(counts, item.key) : null;
          const isOther = item.key.startsWith("other-");
          return (
            <div key={item.key}>
              <button type="button" onClick={() => handleClick(item.key)} style={{ width: "100%", position: "relative", borderRadius: 18, border: active ? "1px solid #0f172a" : "1px solid transparent", background: active ? "#0f172a" : item.bg, color: active ? "#ffffff" : item.text, padding: 12, textAlign: "left", cursor: "pointer", boxShadow: active ? "0 10px 24px rgba(15,23,42,0.16)" : "none" }}>
                <div style={{ fontSize: 24 }}>{item.emoji}</div>
                <div style={{ marginTop: 6, fontSize: 14, fontWeight: 600 }}>{item.label}</div>
                {count && <div style={{ marginTop: 8, display: "inline-flex", borderRadius: 9999, padding: "2px 8px", fontSize: 12, background: active ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.7)", color: active ? "#ffffff" : "#334155" }}>x{count}</div>}
              </button>
              {active && isOther && <CustomEntryFields groupKey={groupKey} optionKey={item.key} customEntries={customEntries} setCustomEntries={setCustomEntries} />}
            </div>
          );
        })}
      </div>
      {group.type === "multi" && <CountInputs groupKey={groupKey} selections={selections} counts={counts} setCounts={setCounts} />}
    </div>
  );
}

function EventCard({ item, onDelete }: { item: any; onDelete: (id: number) => void }) {
  const selectedIcons = getAllSelectedIcons(item.selections, item.counts, item.customEntries || {});
  return (
    <motion.div layout style={{ position: "relative", borderRadius: 24, border: "1px solid #e2e8f0", background: "#ffffff", padding: 20, boxShadow: "0 8px 24px rgba(15,23,42,0.05)" }}>
      <div style={{ position: "absolute", left: -2, top: 32, width: 20, height: 20, transform: "translateX(-50%)", borderRadius: 999, background: "#0f172a", boxShadow: "0 0 0 4px #f8fafc" }} />
      <div style={{ display: "flex", gap: 16, justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: 8, display: "flex", flexWrap: "wrap", gap: 12, fontSize: 14, color: "#64748b" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><CalendarDays size={16} />{item.startDate} - {item.endDate}</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><MapPin size={16} />{item.province}{item.city ? ` · ${item.city}` : ""}</span>
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#0f172a" }}>{item.title}</div>
          <p style={{ marginTop: 8, maxWidth: 700, fontSize: 14, lineHeight: 1.7, color: "#475569" }}>{item.note}</p>
          <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
            {selectedIcons.map((icon: any) => (
              <BadgePill key={`${icon.groupKey}-${icon.key}`}><span>{icon.emoji}</span><span>{icon.label}{shouldRenderCountForKey(item.selections, icon.key) ? ` ×${icon.count}` : ""}</span></BadgePill>
            ))}
            <BadgePill>{item.province}</BadgePill>
          </div>
        </div>
        <SecondaryButton onClick={() => onDelete(item.id)}><Trash2 size={16} /> 删除</SecondaryButton>
      </div>
    </motion.div>
  );
}

function DebugPanel() {
  const results = useMemo(() => runHelperTests(), []);
  return (
    <Panel style={{ padding: 20 }}>
      <div style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 36, height: 36, borderRadius: 12, background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center" }}><Bug size={16} /></div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>运行自检</div>
          <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>用于检查数量、选择和辅助逻辑是否正常</div>
        </div>
      </div>
      <div style={{ marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "space-between", borderRadius: 16, background: "#f8fafc", padding: "12px 16px", fontSize: 14 }}><span>通过情况</span><span style={{ fontWeight: 700, color: "#0f172a" }}>{results.passed} / {results.total}</span></div>
      <div style={{ display: "grid", gap: 8 }}>
        {results.tests.map((test) => (
          <div key={test.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderRadius: 16, border: "1px solid #e2e8f0", padding: "10px 12px", fontSize: 14 }}>
            <span style={{ color: "#475569" }}>{test.name}</span>
            <BadgePill style={{ background: test.pass ? "#0f172a" : "#ef4444", color: "#ffffff", border: "none" }}>{test.pass ? "PASS" : "FAIL"}</BadgePill>
          </div>
        ))}
      </div>
    </Panel>
  );
}

type DraftState = {
  title: string;
  startDate: string;
  endDate: string;
  province: string;
  city: string;
  note: string;
  selections: any;
  counts: Record<string, number>;
  customEntries: Record<string, any>;
};

function BuilderPage({
  nickname,
  events,
  setEvents,
  onBack,
  onOverview,
  onOpenProfile,
}: {
  nickname: string;
  events: any[];
  setEvents: React.Dispatch<React.SetStateAction<any[]>>;
  onBack: () => void;
  onOverview: () => void;
  onOpenProfile: () => void;
}) {
  const [draft, setDraft] = useState<DraftState>({
    title: "",
    startDate: "",
    endDate: "",
    province: "浙江",
    city: "",
    note: "",
    selections: { gender: "female", career: [], relationship: [], pets: [], life: [], hobby: [] },
    counts: {},
    customEntries: {},
  });
  const [errorMessage, setErrorMessage] = useState("");

  const sortedEvents = useMemo(() => [...events].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()), [events]);
  const progress = Math.min(100, Math.max(18, events.length * 18));

  const addEvent = () => {
    if (!draft.startDate || !draft.endDate || !draft.title.trim()) {
      setErrorMessage("请先填写完整的时间段和阶段标题。");
      return;
    }
    if (!isValidDateRange(draft.startDate, draft.endDate)) {
      setErrorMessage("结束日期不能早于开始日期。");
      return;
    }
    setEvents((prev) => [...prev, { ...draft, title: draft.title.trim(), id: Date.now() }]);
    setErrorMessage("");
    setDraft((prev) => ({
      title: "",
      startDate: "",
      endDate: "",
      province: prev.province || "浙江",
      city: "",
      note: "",
      selections: { gender: getSingleSelection(prev.selections, "gender") || "female", career: [], relationship: [], pets: [], life: [], hobby: [] },
      counts: {},
      customEntries: {},
    }));
  };

  const activeProvince = draft.province || sortedEvents[sortedEvents.length - 1]?.province || "浙江";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      style={{
        minHeight: "100vh",
        padding: 32,
        background:
          "radial-gradient(circle at top left, rgba(253,230,138,0.45), transparent 20%), radial-gradient(circle at top right, rgba(244,114,182,0.25), transparent 22%), radial-gradient(circle at bottom left, rgba(196,181,253,0.28), transparent 24%), linear-gradient(180deg,#fff7ed 0%, #ffffff 22%, #fdf4ff 58%, #eff6ff 100%)",
      }}
    >
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, marginBottom: 26, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <SecondaryButton onClick={onBack}><ArrowLeft size={16} /> 返回上一页</SecondaryButton>
            <SecondaryButton onClick={onOpenProfile}><User size={16} /> 个人</SecondaryButton>
          </div>
          <PrimaryButton onClick={onOverview} style={{ background: "linear-gradient(135deg,#0f172a,#4338ca)" }}>总览 <ArrowRight size={16} /></PrimaryButton>
        </div>

        <Panel style={{ padding: 30, marginBottom: 24, background: "linear-gradient(135deg, rgba(255,255,255,0.92), rgba(255,255,255,0.72))", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.7)", boxShadow: "0 24px 60px rgba(99,102,241,0.10)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ minWidth: 280, flex: 1 }}>
              <BadgePill style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(196,181,253,0.5)", color: "#6d28d9", marginBottom: 12 }}>人生轨迹网页 · 编辑页</BadgePill>
              <div style={{ fontSize: 42, fontWeight: 800, color: "#0f172a", lineHeight: 1.1 }}>{nickname || "你的名字"} 的人生轨迹</div>
              <div style={{ marginTop: 12, maxWidth: 760, fontSize: 16, lineHeight: 1.9, color: "#64748b" }}>你喜欢的梦幻风、轻盈感和留白感我已经放回来了。这里可以慢慢整理你的阶段、地点、情感、宠物、爱好和生活物件，让整段经历更像一张温柔展开的记忆地图。</div>
            </div>
            <div style={{ width: 260, minWidth: 220 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 14, color: "#64748b" }}>
                <span>完成度</span>
                <span>{progress}%</span>
              </div>
              <ProgressBar value={progress} />
            </div>
          </div>
        </Panel>

        <div style={{ marginBottom: 24 }}>
          <RealChinaMap activeProvince={activeProvince} onSelect={(province) => setDraft((prev) => ({ ...prev, province }))} />
        </div>

        <div style={{ display: "grid", gap: 24 }}>
          <Panel style={{ padding: 32, background: "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0.82))", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.8)", boxShadow: "0 22px 55px rgba(236,72,153,0.08)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
              <div>
                <div style={{ fontSize: 28, fontWeight: 800, color: "#0f172a" }}>添加新阶段</div>
                <div style={{ marginTop: 8, fontSize: 14, color: "#64748b" }}>像写日记一样，把这一段人生慢慢填进去。</div>
              </div>
              <BadgePill style={{ background: "rgba(255,255,255,0.78)", border: "1px solid rgba(251,191,36,0.35)", color: "#b45309" }}>当前省份：{activeProvince}</BadgePill>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
              <div>
                <label style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: 600, color: "#334155" }}>开始日期</label>
                <TextInput type="date" value={draft.startDate} onChange={(e) => setDraft((p) => ({ ...p, startDate: e.target.value }))} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: 600, color: "#334155" }}>结束日期</label>
                <TextInput type="date" value={draft.endDate} onChange={(e) => setDraft((p) => ({ ...p, endDate: e.target.value }))} />
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: 600, color: "#334155" }}>阶段标题</label>
              <TextInput value={draft.title} onChange={(e) => setDraft((p) => ({ ...p, title: e.target.value }))} placeholder="例如：2023.4.1 - 2025.4.1 在杭州读书与生活" />
            </div>

            <div style={{ display: "grid", gap: 22 }}>
              {Object.entries(iconGroups).map(([groupKey, group]) => (
                <CategorySelector
                  key={groupKey}
                  groupKey={groupKey}
                  group={group}
                  selections={draft.selections}
                  counts={draft.counts}
                  customEntries={draft.customEntries}
                  setCustomEntries={(u) => setDraft((p) => ({ ...p, customEntries: typeof u === "function" ? u(p.customEntries) : u }))}
                  setCounts={(u) => setDraft((p) => ({ ...p, counts: typeof u === "function" ? u(p.counts) : u }))}
                  setSelections={(u) => setDraft((p) => ({ ...p, selections: typeof u === "function" ? u(p.selections) : u }))}
                />
              ))}
            </div>

            <div style={{ borderRadius: 24, background: "linear-gradient(135deg, rgba(254,249,195,0.35), rgba(224,231,255,0.35))", border: "1px solid rgba(226,232,240,0.9)", padding: 18, marginTop: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1e293b" }}>当前已选图标</div>
                <BadgePill>{getAllSelectedIcons(draft.selections, draft.counts, draft.customEntries).length} 个</BadgePill>
              </div>
              <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8 }}>
                {getAllSelectedIcons(draft.selections, draft.counts, draft.customEntries).map((icon: any) => (
                  <BadgePill key={`${icon.groupKey}-${icon.key}`} style={{ background: "rgba(255,255,255,0.8)" }}><span>{icon.emoji}</span><span>{icon.label}{shouldRenderCountForKey(draft.selections, icon.key) ? ` ×${icon.count}` : ""}</span></BadgePill>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 22 }}>
              <div>
                <label style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: 600, color: "#334155" }}>所在省份</label>
                <TextInput value={draft.province} onChange={(e) => setDraft((p) => ({ ...p, province: e.target.value }))} placeholder="例如：浙江" />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: 600, color: "#334155" }}>城市</label>
                <TextInput value={draft.city} onChange={(e) => setDraft((p) => ({ ...p, city: e.target.value }))} placeholder="例如：杭州" />
              </div>
            </div>

            <div style={{ marginTop: 20 }}>
              <label style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: 600, color: "#334155" }}>这一阶段的故事</label>
              <TextAreaInput value={draft.note} onChange={(e) => setDraft((p) => ({ ...p, note: e.target.value }))} placeholder="写下这个时间段最重要的记忆、关系、地点和变化……" style={{ minHeight: 140 }} />
            </div>

            {errorMessage && <div style={{ marginTop: 16, borderRadius: 16, border: "1px solid #fecaca", background: "#fef2f2", padding: "12px 16px", fontSize: 14, color: "#dc2626" }}>{errorMessage}</div>}

            <PrimaryButton onClick={addEvent} style={{ marginTop: 22, width: "100%", height: 52, borderRadius: 18, background: "linear-gradient(135deg,#0f172a,#7c3aed)" }}><Plus size={18} /> 添加到时间线</PrimaryButton>
          </Panel>

          <Panel style={{ padding: 30, background: "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0.84))", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.8)", boxShadow: "0 20px 48px rgba(59,130,246,0.08)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
              <div>
                <div style={{ fontSize: 28, fontWeight: 800, color: "#0f172a" }}>我的时间线</div>
                <div style={{ marginTop: 8, fontSize: 14, color: "#64748b" }}>所有记录会按时间慢慢排开。</div>
              </div>
              <BadgePill style={{ background: "rgba(255,255,255,0.78)", border: "1px solid rgba(147,197,253,0.45)", color: "#1d4ed8" }}>共 {sortedEvents.length} 段</BadgePill>
            </div>
            <div style={{ position: "relative", paddingLeft: 16 }}>
              <div style={{ position: "absolute", left: 18, top: 4, bottom: 4, width: 2, background: "linear-gradient(180deg,#ddd6fe,#bfdbfe)" }} />
              <div style={{ display: "grid", gap: 22 }}>
                {sortedEvents.map((item) => (
                  <EventCard key={item.id} item={item} onDelete={(id) => setEvents((prev) => prev.filter((event) => event.id !== id))} />
                ))}
              </div>
            </div>
          </Panel>

          <DebugPanel />
        </div>
      </div>
    </motion.div>
  );
}

function OverviewPage({ events, onBack }: { events: any[]; onBack: () => void }) {
  const captureRef = useRef<HTMLDivElement | null>(null);
  const sortedEvents = useMemo(() => [...events].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()), [events]);

  const handleSaveImage = async () => {
    try {
      await exportElementAsImage(captureRef.current, "人生轨迹纵览.png");
    } catch (error) {
      console.error(error);
      window.alert("保存图片失败，请稍后再试。");
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={styles.pageBg}>
      <div style={{ margin: "0 auto", maxWidth: 1100, padding: 24 }}>
        <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <SecondaryButton onClick={onBack}><ArrowLeft size={16} /> 返回编辑页</SecondaryButton>
          <PrimaryButton onClick={handleSaveImage}><ImageIcon size={16} /> 保存为图片</PrimaryButton>
        </div>

        <Panel style={{ padding: 32 }}>
          <div ref={captureRef} style={{ background: "#ffffff", color: "#0f172a" }}>
            <div style={{ marginBottom: 32, textAlign: "center" }}>
              <div style={{ fontSize: 30, fontWeight: 800, color: "#0f172a" }}>人生轨迹纵览</div>
              <div style={{ marginTop: 8, fontSize: 14, color: "#64748b" }}>按时间纵向排列，数量会展开成重复图标显示。</div>
            </div>
            <div style={{ position: "relative", paddingLeft: 24 }}>
              <div style={{ position: "absolute", left: 11, top: 0, bottom: 0, width: 2, background: "#e2e8f0" }} />
              <div style={{ display: "grid", gap: 24 }}>
                {sortedEvents.map((item) => {
                  const expandedIcons = expandIconsForOverview(item.selections, item.counts, item.customEntries || {});
                  return (
                    <div key={item.id} style={{ position: "relative", borderRadius: 24, border: "1px solid #e2e8f0", background: "rgba(248,250,252,0.75)", padding: 20 }}>
                      <div style={{ position: "absolute", left: -21, top: 24, width: 20, height: 20, borderRadius: 999, border: "4px solid #ffffff", background: "#0f172a" }} />
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#64748b" }}>{item.startDate} 到 {item.endDate}</div>
                      <div style={{ marginTop: 8, fontSize: 20, fontWeight: 700, color: "#0f172a" }}>{item.title}</div>
                      <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 8, fontSize: 28 }}>
                        {expandedIcons.map((icon: any) => <span key={icon.instanceKey} title={icon.label}>{icon.emoji}</span>)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Panel>
      </div>
    </motion.div>
  );
}

export default function LifeTimelinePrototype() {
  const [page, setPage] = useState(0);
  const [authMode, setAuthMode] = useState("login");
  const [authForm, setAuthForm] = useState({ nickname: "Yifan", email: "", password: "" });
  const [nickname, setNickname] = useState("Yifan");
  const [avatar, setAvatar] = useState("");
  const [defaultAvatar, setDefaultAvatar] = useState("girl");
  const [animeMode, setAnimeMode] = useState(true);
  const [events, setEvents] = useState<any[]>(initialEvents);
  const [histories] = useState([
    { id: 1, title: "我的人生轨迹 · 默认版本", updatedAt: "刚刚更新" },
    { id: 2, title: "2025 春季版本", updatedAt: "2026-04-07" },
  ]);

  const handleEnterApp = () => {
    if (authForm.nickname?.trim()) setNickname(authForm.nickname.trim());
    setPage(1);
  };

  return (
    <div style={{ minHeight: "100vh", color: "#0f172a", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <AnimatePresence mode="wait">
        {page === 0 && (
          <RegistrationPage
            key="page-0"
            authMode={authMode}
            setAuthMode={setAuthMode}
            authForm={authForm}
            setAuthForm={setAuthForm}
            onEnter={handleEnterApp}
          />
        )}

        {page === 1 && (
          <WelcomePage
            key="page-1"
            nickname={nickname}
            setNickname={setNickname}
            avatar={avatar}
            setAvatar={setAvatar}
            animeMode={animeMode}
            setAnimeMode={setAnimeMode}
            defaultAvatar={defaultAvatar}
            setDefaultAvatar={setDefaultAvatar}
            onNext={() => setPage(2)}
          />
        )}

        {page === 2 && (
          <IntroPage
            key="page-2"
            onBack={() => setPage(1)}
            onNext={() => setPage(3)}
          />
        )}

        {page === 3 && (
          <BuilderPage
            key="page-3"
            nickname={nickname}
            events={events}
            setEvents={setEvents}
            onBack={() => setPage(2)}
            onOverview={() => setPage(4)}
            onOpenProfile={() => setPage(5)}
          />
        )}

        {page === 4 && (
          <OverviewPage
            key="page-4"
            events={events}
            onBack={() => setPage(3)}
          />
        )}

        {page === 5 && (
          <ProfilePage
            key="page-5"
            histories={histories}
            onBack={() => setPage(3)}
            onOpenHistory={() => setPage(3)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
