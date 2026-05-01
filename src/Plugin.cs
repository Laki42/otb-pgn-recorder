using System;
using System.IO;
using IPA;
using IPA.Logging;

namespace AkiPracticeDiary;

[Plugin(RuntimeOptions.SingleStartInit)]
public class Plugin
{
    internal static Logger? Log;

    // かわいい記号: 後で文面を差し替えやすいよう定数化
    private const string Flower = "🌸";
    private const string Knight = "♞";
    private const string Sparkle = "✨";

    [Init]
    public void Init(Logger logger)
    {
        Log = logger;
        Log.Info("AkiPracticeDiary initialized (target: Beat Saber 1.39.1)");
    }

    [OnEnable]
    public void OnEnable()
    {
        // Beat Saber 1.39.1 でも使いやすい最小構成として BS_Utils の levelFinished を利用
        BS_Utils.Utilities.BSEvents.levelFinished += OnLevelFinished;
    }

    [OnDisable]
    public void OnDisable()
    {
        BS_Utils.Utilities.BSEvents.levelFinished -= OnLevelFinished;
    }

    private void OnLevelFinished(object _, GlobalNamespace.LevelCompletionResults results)
    {
        try
        {
            AppendDiary(results);
        }
        catch (Exception ex)
        {
            // どこかの値が取れなくてもMOD自体は壊さない
            Log?.Error($"AkiPracticeDiary failed to write diary: {ex}");
        }
    }

    private void AppendDiary(GlobalNamespace.LevelCompletionResults results)
    {
        var baseDir = Path.Combine(Environment.CurrentDirectory, "UserData", "AkiPracticeDiary");
        Directory.CreateDirectory(baseDir);
        var diaryPath = Path.Combine(baseDir, "diary.txt");

        // 安全取得: 失敗時は Unknown
        var now = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
        var songName = Try(() => results.level?.songName) ?? "Unknown";
        var difficulty = Try(() => results.beatmapDifficulty.ToString()) ?? "Unknown";
        var score = Try(() => results.multipliedScore.ToString()) ?? "Unknown";
        var rank = Try(() => results.rank.ToString()) ?? "Unknown";
        var fullCombo = Try(() => results.fullCombo ? "Yes" : "No") ?? "Unknown";
        var missCount = Try(() => results.missedCount.ToString()) ?? "Unknown";
        var badCutCount = Try(() => results.badCutsCount.ToString()) ?? "Unknown";

        // 日記テンプレ: ここを編集すれば簡単に文面変更できる
        var entry =
            $"{Flower} {now} {Sparkle}\n" +
            $"{Knight} Song: {songName}\n" +
            $"{Knight} Difficulty: {difficulty}\n" +
            $"{Knight} Score: {score}\n" +
            $"{Knight} Rank: {rank}\n" +
            $"{Knight} Full Combo: {fullCombo}\n" +
            $"{Knight} Miss: {missCount}\n" +
            $"{Knight} Bad Cut: {badCutCount}\n" +
            "----------------------------------------\n";

        File.AppendAllText(diaryPath, entry);
        Log?.Info($"AkiPracticeDiary wrote diary entry: {diaryPath}");
    }

    private static string? Try(Func<string?> getter)
    {
        try
        {
            return getter();
        }
        catch
        {
            return null;
        }
    }
}
