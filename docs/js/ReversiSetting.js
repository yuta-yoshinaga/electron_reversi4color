////////////////////////////////////////////////////////////////////////////////
/**	@file			ReversiSetting.ts
 *	@brief			リバーシ設定クラス実装ファイル
 *	@author			Yuta Yoshinaga
 *	@date			2017.06.01
 *	$Version:		$
 *	$Revision:		$
 *
 * (c) 2017 Yuta Yoshinaga.
 *
 * - 本ソフトウェアの一部又は全てを無断で複写複製（コピー）することは、
 *   著作権侵害にあたりますので、これを禁止します。
 * - 本製品の使用に起因する侵害または特許権その他権利の侵害に関しては
 *   当方は一切その責任を負いません。
 */
////////////////////////////////////////////////////////////////////////////////
var DEF_MODE_ONE = 0; //!< 一人対戦
var DEF_MODE_TWO = 1; //!< 二人対戦
var DEF_TYPE_EASY = 0; //!< CPU 弱い
var DEF_TYPE_NOR = 1; //!< CPU 普通
var DEF_TYPE_HARD = 2; //!< CPU 強い
var DEF_COLOR_BLACK = 0; //!< コマ色 黒
var DEF_COLOR_WHITE = 1; //!< コマ色 白
var DEF_ASSIST_OFF = 0; //!< アシスト OFF
var DEF_ASSIST_ON = 1; //!< アシスト ON
var DEF_GAME_SPD_FAST = 0; //!< ゲームスピード 早い
var DEF_GAME_SPD_MID = 1; //!< ゲームスピード 普通
var DEF_GAME_SPD_SLOW = 2; //!< ゲームスピード 遅い
var DEF_GAME_SPD_FAST_VAL = 0; //!< ゲームスピード 早い
var DEF_GAME_SPD_MID_VAL = 50; //!< ゲームスピード 普通
var DEF_GAME_SPD_SLOW_VAL = 100; //!< ゲームスピード 遅い
var DEF_GAME_SPD_FAST_VAL2 = 0; //!< ゲームスピード 早い
var DEF_GAME_SPD_MID_VAL2 = 500; //!< ゲームスピード 普通
var DEF_GAME_SPD_SLOW_VAL2 = 1000; //!< ゲームスピード 遅い
var DEF_END_ANIM_OFF = 0; //!< 終了アニメーション OFF
var DEF_END_ANIM_ON = 1; //!< 終了アニメーション ON
var DEF_MASU_CNT_6 = 0; //!< マス縦横6
var DEF_MASU_CNT_8 = 1; //!< マス縦横8
var DEF_MASU_CNT_10 = 2; //!< マス縦横10
var DEF_MASU_CNT_12 = 3; //!< マス縦横12
var DEF_MASU_CNT_14 = 4; //!< マス縦横14
var DEF_MASU_CNT_16 = 5; //!< マス縦横16
var DEF_MASU_CNT_6_VAL = 6; //!< マス縦横6
var DEF_MASU_CNT_8_VAL = 8; //!< マス縦横8
var DEF_MASU_CNT_10_VAL = 10; //!< マス縦横10
var DEF_MASU_CNT_12_VAL = 12; //!< マス縦横12
var DEF_MASU_CNT_14_VAL = 14; //!< マス縦横14
var DEF_MASU_CNT_16_VAL = 16; //!< マス縦横16
var DEF_MASU_CNT_MAX_VAL = DEF_MASU_CNT_16_VAL; //!< マス縦横最大
////////////////////////////////////////////////////////////////////////////////
/**	@class		ReversiSetting
 *	@brief		リバーシ設定クラス
 */
////////////////////////////////////////////////////////////////////////////////
var ReversiSetting = (function () {
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			コンストラクタ
     *	@fn				public constructor()
     *	@return			ありません
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    function ReversiSetting() {
        this.mMode = DEF_MODE_ONE; //!< 現在のモード
        this.mType = DEF_TYPE_NOR; //!< 現在のタイプ
        this.mPlayer = REVERSI_STS_BLACK; //!< プレイヤーの色
        this.mAssist = DEF_ASSIST_ON; //!< アシスト
        this.mGameSpd = DEF_GAME_SPD_MID; //!< ゲームスピード
        this.mEndAnim = DEF_END_ANIM_ON; //!< ゲーム終了アニメーション
        this.mMasuCntMenu = DEF_MASU_CNT_8; //!< マスの数
        this.mMasuCnt = DEF_MASU_CNT_8_VAL; //!< マスの数
        this.mPlayCpuInterVal = DEF_GAME_SPD_MID_VAL2; //!< CPU対戦時のインターバル(msec)
        this.mPlayDrawInterVal = DEF_GAME_SPD_MID_VAL; //!< 描画のインターバル(msec)
        this.mEndDrawInterVal = 100; //!< 終了アニメーション描画のインターバル(msec)
        this.mEndInterVal = 500; //!< 終了アニメーションのインターバル(msec)
        this.mTheme = 'Cerulean'; //!< テーマ名
        this.mPlayerColor1 = '#000000'; //!< プレイヤー1の色
        this.mPlayerColor2 = '#FFFFFF'; //!< プレイヤー2の色
        this.mPlayerColor3 = '#0000FF'; //!< プレイヤー3の色
        this.mPlayerColor4 = '#FF0000'; //!< プレイヤー4の色
        this.mBackGroundColor = '#00FF00'; //!< 背景の色
        this.mBorderColor = '#000000'; //!< 枠線の色
    }
    return ReversiSetting;
}());
//# sourceMappingURL=ReversiSetting.js.map