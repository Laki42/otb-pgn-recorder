# AkiPracticeDiary (Beat Saber 1.39.1 / BSIPA)

Beat Saber PC版向け、**最小構成**の練習日記MODです。

- BSIPA利用
- UI追加なし
- 3Dオブジェクト生成なし
- AssetBundleなし
- 曲終了後に `Beat Saber/UserData/AkiPracticeDiary/diary.txt` へ追記

## 対応バージョン

この版は **Beat Saber 1.39.1** を前提にしています。

## 記録される内容

- 日時
- 曲名
- 難易度
- スコア
- ランク
- フルコンボ判定
- Miss数
- Bad Cut数

> 取得が難しい項目は `Unknown` を書き込み、MODが落ちないようにしています。

## セットアップ手順（最小）

1. このリポジトリを作業フォルダへ配置
2. `Libs/` を作成し、以下DLLを配置
   - `IPA.dll`
   - `BS_Utils.dll`
   - `Main.dll`
   - `HMUI.dll`
   - `UnityEngine.CoreModule.dll`
3. `dotnet build -c Release` でビルド
4. 生成された `AkiPracticeDiary.dll` を `Beat Saber/Plugins/` へ配置

## 出力例

```txt
🌸 2026-05-01 20:15:12 ✨
♞ Song: $100 Bills
♞ Difficulty: Hard
♞ Score: 123456
♞ Rank: A
♞ Full Combo: No
♞ Miss: 3
♞ Bad Cut: 1
----------------------------------------
```

## 文面を変えたいとき

`src/Plugin.cs` の以下を編集してください。

- `Flower`, `Knight`, `Sparkle` 定数
- `AppendDiary` 内の `entry` テンプレート文字列
