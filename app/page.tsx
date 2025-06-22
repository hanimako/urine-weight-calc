"use client";

import { useState } from "react";

// 構成品の定義（要件定義書に基づく）
const diaperItems = [
  // オムツ用パット
  { id: "blue-pad", name: "青", weight: 65, category: "pad" },
  { id: "pink-pad", name: "ピンク", weight: 102, category: "pad" },
  { id: "purple-pad", name: "紫", weight: 114, category: "pad" },

  // オムツ
  {
    id: "purple-diaper-sm",
    name: "紫（S-M）",
    weight: 144,
    category: "diaper",
  },
  {
    id: "blue-diaper-m",
    name: "青（M）",
    weight: 153,
    category: "diaper",
  },
  {
    id: "orange-diaper-ml",
    name: "オレンジ（M-L）",
    weight: 158,
    category: "diaper",
  },
  {
    id: "green-diaper-l",
    name: "緑（L）",
    weight: 175,
    category: "diaper",
  },

  // リハパン
  {
    id: "rehab-pan-m",
    name: "M",
    weight: 46,
    category: "rehab-pan",
  },
  {
    id: "rehab-pan-l",
    name: "L",
    weight: 53,
    category: "rehab-pan",
  },
  {
    id: "rehab-pan-ll",
    name: "LL",
    weight: 53,
    category: "rehab-pan",
  },

  // リハパン用パット
  {
    id: "rehab-orange-pad",
    name: "オレンジ",
    weight: 50,
    category: "rehab-pad",
  },
  { id: "rehab-purple-pad", name: "紫", weight: 60, category: "rehab-pad" },
];

interface SelectedItem {
  id: string;
  name: string;
  weight: number;
  count: number;
  category: string;
}

export default function Home() {
  const [usedWeight, setUsedWeight] = useState<number | "">("");
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [isInputting, setIsInputting] = useState(false);

  // 構成品を追加
  const addItem = (item: (typeof diaperItems)[0]) => {
    setSelectedItems((prev) => {
      const existing = prev.find((selected) => selected.id === item.id);
      if (existing) {
        return prev.map((selected) =>
          selected.id === item.id
            ? { ...selected, count: selected.count + 1 }
            : selected
        );
      } else {
        return [...prev, { ...item, count: 1 }];
      }
    });
  };

  // 構成品合計重量を計算
  const totalItemWeight = selectedItems.reduce(
    (sum, item) => sum + item.weight * item.count,
    0
  );

  // 計算結果（尿量または構成品合計重量）
  const calculatedValue =
    usedWeight === "" ? -totalItemWeight : Number(usedWeight) - totalItemWeight;

  // ボタンが選択されているかチェック
  const isSelected = (itemId: string) => {
    return selectedItems.some((item) => item.id === itemId);
  };

  // ボタンの選択回数を取得
  const getSelectedCount = (itemId: string) => {
    const item = selectedItems.find((item) => item.id === itemId);
    return item ? item.count : 0;
  };

  // ボタンの色を段階的に設定
  const getButtonStyle = (itemId: string, baseColor: string) => {
    const count = getSelectedCount(itemId);
    const baseClasses =
      "rounded-xl py-3 px-4 text-lg font-medium shadow-md border-2 transition-colors m-1 flex-1";

    if (count === 0) {
      // 未選択
      if (baseColor === "blue") {
        return `${baseClasses} bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200`;
      } else if (baseColor === "green") {
        return `${baseClasses} bg-green-50 hover:bg-green-100 text-green-700 border-green-200`;
      } else if (baseColor === "purple") {
        return `${baseClasses} bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200`;
      } else if (baseColor === "orange") {
        return `${baseClasses} bg-orange-50 hover:bg-orange-100 text-orange-700 border-orange-200`;
      }
    } else if (count === 1) {
      // 1回選択（元の2回目の色）
      if (baseColor === "blue") {
        return `${baseClasses} bg-blue-300 text-blue-900 border-blue-500`;
      } else if (baseColor === "green") {
        return `${baseClasses} bg-green-300 text-green-900 border-green-500`;
      } else if (baseColor === "purple") {
        return `${baseClasses} bg-purple-300 text-purple-900 border-purple-500`;
      } else if (baseColor === "orange") {
        return `${baseClasses} bg-orange-300 text-orange-900 border-orange-500`;
      }
    } else if (count === 2) {
      // 2回選択（元の3回目の色）
      if (baseColor === "blue") {
        return `${baseClasses} bg-blue-400 text-white border-blue-600`;
      } else if (baseColor === "green") {
        return `${baseClasses} bg-green-400 text-white border-green-600`;
      } else if (baseColor === "purple") {
        return `${baseClasses} bg-purple-400 text-white border-purple-600`;
      } else if (baseColor === "orange") {
        return `${baseClasses} bg-orange-400 text-white border-orange-600`;
      }
    } else {
      // 3回以上選択（ダーク系の色）
      if (baseColor === "blue") {
        return `${baseClasses} bg-blue-700 text-white border-blue-800`;
      } else if (baseColor === "green") {
        return `${baseClasses} bg-green-700 text-white border-green-800`;
      } else if (baseColor === "purple") {
        return `${baseClasses} bg-purple-700 text-white border-purple-800`;
      } else if (baseColor === "orange") {
        return `${baseClasses} bg-orange-700 text-white border-orange-800`;
      }
    }

    // フォールバック
    return `${baseClasses} bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200`;
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-4 h-screen flex flex-col">
        {/* タイトル */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          尿測Calc
        </h1>

        {/* 使用済み重量入力欄 */}
        <div className="space-y-2">
          <input
            id="usedWeight"
            type="number"
            value={isInputting ? usedWeight : calculatedValue}
            onChange={(e) => {
              setUsedWeight(
                e.target.value === "" ? "" : Number(e.target.value)
              );
              setIsInputting(true);
            }}
            onFocus={() => {
              setIsInputting(true);
              setUsedWeight("");
              setSelectedItems([]);
            }}
            onBlur={() => {
              setIsInputting(false);
            }}
            placeholder="重量を入力"
            className="w-full text-center text-xl font-normal tracking-wide p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* 構成品ボタン群（スクロール可能） */}
        <div className="flex-1 min-h-0 overflow-y-auto space-y-3">
          {/* オムツ用パット */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-600">
              オムツ用パット
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {diaperItems
                .filter((item) => item.category === "pad")
                .map((item) => (
                  <button
                    key={item.id}
                    onClick={() => addItem(item)}
                    className={getButtonStyle(item.id, "blue")}
                  >
                    {item.name}
                    <div
                      className={`text-sm mt-1 ${
                        getSelectedCount(item.id) >= 2
                          ? "text-white"
                          : isSelected(item.id)
                          ? "text-blue-700"
                          : "text-blue-600"
                      }`}
                    >
                      {item.weight}g
                    </div>
                  </button>
                ))}
            </div>
          </div>

          {/* オムツ */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-600">オムツ</h3>
            <div className="grid grid-cols-2 gap-2">
              {diaperItems
                .filter((item) => item.category === "diaper")
                .map((item) => (
                  <button
                    key={item.id}
                    onClick={() => addItem(item)}
                    className={getButtonStyle(item.id, "green")}
                  >
                    {item.name}
                    <div
                      className={`text-sm mt-1 ${
                        getSelectedCount(item.id) >= 2
                          ? "text-white"
                          : isSelected(item.id)
                          ? "text-green-700"
                          : "text-green-600"
                      }`}
                    >
                      {item.weight}g
                    </div>
                  </button>
                ))}
            </div>
          </div>

          {/* リハパン */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-600">リハパン</h3>
            <div className="grid grid-cols-3 gap-2">
              {diaperItems
                .filter((item) => item.category === "rehab-pan")
                .map((item) => (
                  <button
                    key={item.id}
                    onClick={() => addItem(item)}
                    className={getButtonStyle(item.id, "purple")}
                  >
                    {item.name}
                    <div
                      className={`text-sm mt-1 ${
                        getSelectedCount(item.id) >= 2
                          ? "text-white"
                          : isSelected(item.id)
                          ? "text-purple-700"
                          : "text-purple-600"
                      }`}
                    >
                      {item.weight}g
                    </div>
                  </button>
                ))}
            </div>
          </div>

          {/* リハパン用パット */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-600">
              リハパン用パット
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {diaperItems
                .filter((item) => item.category === "rehab-pad")
                .map((item) => (
                  <button
                    key={item.id}
                    onClick={() => addItem(item)}
                    className={getButtonStyle(item.id, "orange")}
                  >
                    {item.name}
                    <div
                      className={`text-sm mt-1 ${
                        getSelectedCount(item.id) >= 2
                          ? "text-white"
                          : isSelected(item.id)
                          ? "text-orange-700"
                          : "text-orange-600"
                      }`}
                    >
                      {item.weight}g
                    </div>
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
