////////////////////////////////////////////////////////////////////////////////
/**	@file			Reversi.ts
 *	@brief			リバーシクラス実装ファイル
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
/// <reference path="ReversiAnz.ts" />
/// <reference path="ReversiPoint.ts" />
/// <reference path="ReversiHistory.ts" />
/// <reference path="types/jquery/index.d.ts" />
var REVERSI_STS_NONE = 0; //!< コマ無し
var REVERSI_STS_BLACK = 1; //!< 黒
var REVERSI_STS_WHITE = 2; //!< 白
var REVERSI_STS_BLUE = 3; //!< 青
var REVERSI_STS_RED = 4; //!< 赤
var REVERSI_STS_MIN = 0; //!< ステータス最小値
var REVERSI_STS_MAX = 4; //!< ステータス最大値
var REVERSI_MASU_CNT = 8; //!< 縦横マス数
////////////////////////////////////////////////////////////////////////////////
/**	@class		Reversi
 *	@brief		リバーシクラス
 */
////////////////////////////////////////////////////////////////////////////////
var Reversi = (function () {
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			コンストラクタ
     *	@fn				public constructor(masuCnt:number,masuMax:number)
     *	@param[in]		masuCnt:number		縦横マス数
     *	@param[in]		masuMax:number		縦横マス最大数
     *	@return			ありません
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    function Reversi(masuCnt, masuMax) {
        this.mMasuCnt = masuCnt;
        this.mMasuCntMax = masuMax;
        this.mMasuSts = new Array();
        this.mMasuStsEnaB = new Array();
        this.mMasuStsCntB = new Array();
        this.mMasuStsPassB = new Array();
        this.mMasuStsAnzB = new Array();
        this.mMasuStsEnaW = new Array();
        this.mMasuStsCntW = new Array();
        this.mMasuStsPassW = new Array();
        this.mMasuStsAnzW = new Array();
        this.mMasuStsEnaL = new Array();
        this.mMasuStsCntL = new Array();
        this.mMasuStsPassL = new Array();
        this.mMasuStsAnzL = new Array();
        this.mMasuStsEnaR = new Array();
        this.mMasuStsCntR = new Array();
        this.mMasuStsPassR = new Array();
        this.mMasuStsAnzR = new Array();
        for (var i = 0; i < this.mMasuCntMax; i++) {
            this.mMasuSts[i] = new Array();
            this.mMasuStsEnaB[i] = new Array();
            this.mMasuStsCntB[i] = new Array();
            this.mMasuStsPassB[i] = new Array();
            this.mMasuStsAnzB[i] = new Array();
            this.mMasuStsEnaW[i] = new Array();
            this.mMasuStsCntW[i] = new Array();
            this.mMasuStsPassW[i] = new Array();
            this.mMasuStsAnzW[i] = new Array();
            this.mMasuStsEnaL[i] = new Array();
            this.mMasuStsCntL[i] = new Array();
            this.mMasuStsPassL[i] = new Array();
            this.mMasuStsAnzL[i] = new Array();
            this.mMasuStsEnaR[i] = new Array();
            this.mMasuStsCntR[i] = new Array();
            this.mMasuStsPassR[i] = new Array();
            this.mMasuStsAnzR[i] = new Array();
            for (var j = 0; j < this.mMasuCntMax; j++) {
                this.mMasuSts[i][j] = REVERSI_STS_NONE;
                this.mMasuStsEnaB[i][j] = REVERSI_STS_NONE;
                this.mMasuStsCntB[i][j] = REVERSI_STS_NONE;
                this.mMasuStsPassB[i][j] = REVERSI_STS_NONE;
                this.mMasuStsAnzB[i][j] = new ReversiAnz();
                this.mMasuStsEnaW[i][j] = REVERSI_STS_NONE;
                this.mMasuStsCntW[i][j] = REVERSI_STS_NONE;
                this.mMasuStsPassW[i][j] = REVERSI_STS_NONE;
                this.mMasuStsAnzW[i][j] = new ReversiAnz();
                this.mMasuStsEnaL[i][j] = REVERSI_STS_NONE;
                this.mMasuStsCntL[i][j] = REVERSI_STS_NONE;
                this.mMasuStsPassL[i][j] = REVERSI_STS_NONE;
                this.mMasuStsAnzL[i][j] = new ReversiAnz();
                this.mMasuStsEnaR[i][j] = REVERSI_STS_NONE;
                this.mMasuStsCntR[i][j] = REVERSI_STS_NONE;
                this.mMasuStsPassR[i][j] = REVERSI_STS_NONE;
                this.mMasuStsAnzR[i][j] = new ReversiAnz();
            }
        }
        this.mMasuPointB = new Array();
        this.mMasuPointW = new Array();
        this.mMasuPointL = new Array();
        this.mMasuPointR = new Array();
        for (var i = 0; i < (this.mMasuCntMax * this.mMasuCntMax); i++) {
            this.mMasuPointB[i] = new ReversiPoint();
            this.mMasuPointW[i] = new ReversiPoint();
            this.mMasuPointL[i] = new ReversiPoint();
            this.mMasuPointR[i] = new ReversiPoint();
        }
        this.mMasuPointCntB = 0;
        this.mMasuPointCntW = 0;
        this.mMasuPointCntL = 0;
        this.mMasuPointCntR = 0;
        this.mMasuBetCntB = 0;
        this.mMasuBetCntW = 0;
        this.mMasuBetCntL = 0;
        this.mMasuBetCntR = 0;
        this.mMasuHist = new Array();
        for (var i = 0; i < (this.mMasuCntMax * this.mMasuCntMax); i++) {
            this.mMasuHist[i] = new ReversiHistory();
        }
        this.mMasuHistCur = 0;
        this.mMasuStsOld = $.extend(true, [], this.mMasuSts);
        this.reset();
    }
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			リセット
     *	@fn				public reset() : void
     *	@return			ありません
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    Reversi.prototype.reset = function () {
        for (var i = 0; i < this.mMasuCnt; i++) {
            for (var j = 0; j < this.mMasuCnt; j++) {
                this.mMasuSts[i][j] = REVERSI_STS_NONE;
                this.mMasuStsPassB[i][j] = 0;
                this.mMasuStsAnzB[i][j].reset();
                this.mMasuStsPassW[i][j] = 0;
                this.mMasuStsAnzW[i][j].reset();
                this.mMasuStsPassL[i][j] = 0;
                this.mMasuStsAnzL[i][j].reset();
                this.mMasuStsPassR[i][j] = 0;
                this.mMasuStsAnzR[i][j].reset();
            }
        }
        this.mMasuSts[(this.mMasuCnt >> 2)][(this.mMasuCnt >> 2)] = REVERSI_STS_BLACK;
        this.mMasuSts[(this.mMasuCnt >> 2) + 1][(this.mMasuCnt >> 2) + 1] = REVERSI_STS_BLACK;
        this.mMasuSts[(this.mMasuCnt - ((this.mMasuCnt >> 2) + 2))][(this.mMasuCnt >> 2)] = REVERSI_STS_BLACK;
        this.mMasuSts[(this.mMasuCnt - ((this.mMasuCnt >> 2) + 1))][(this.mMasuCnt >> 2) + 1] = REVERSI_STS_BLACK;
        this.mMasuSts[(this.mMasuCnt >> 2)][(this.mMasuCnt >> 2) + 1] = REVERSI_STS_WHITE;
        this.mMasuSts[(this.mMasuCnt >> 2) + 1][(this.mMasuCnt >> 2)] = REVERSI_STS_WHITE;
        this.mMasuSts[(this.mMasuCnt - ((this.mMasuCnt >> 2) + 2))][(this.mMasuCnt - ((this.mMasuCnt >> 2) + 2))] = REVERSI_STS_WHITE;
        this.mMasuSts[(this.mMasuCnt - ((this.mMasuCnt >> 2) + 1))][(this.mMasuCnt - ((this.mMasuCnt >> 2) + 1))] = REVERSI_STS_WHITE;
        this.mMasuSts[(this.mMasuCnt >> 2)][(this.mMasuCnt - ((this.mMasuCnt >> 2) + 1))] = REVERSI_STS_BLUE;
        this.mMasuSts[(this.mMasuCnt >> 2) + 1][(this.mMasuCnt - ((this.mMasuCnt >> 2) + 2))] = REVERSI_STS_BLUE;
        this.mMasuSts[(this.mMasuCnt - ((this.mMasuCnt >> 2) + 2))][(this.mMasuCnt >> 2) + 1] = REVERSI_STS_BLUE;
        this.mMasuSts[(this.mMasuCnt - ((this.mMasuCnt >> 2) + 1))][(this.mMasuCnt >> 2)] = REVERSI_STS_BLUE;
        this.mMasuSts[(this.mMasuCnt >> 2)][(this.mMasuCnt - ((this.mMasuCnt >> 2) + 2))] = REVERSI_STS_RED;
        this.mMasuSts[(this.mMasuCnt >> 2) + 1][(this.mMasuCnt - ((this.mMasuCnt >> 2) + 1))] = REVERSI_STS_RED;
        this.mMasuSts[(this.mMasuCnt - ((this.mMasuCnt >> 2) + 2))][(this.mMasuCnt - ((this.mMasuCnt >> 2) + 1))] = REVERSI_STS_RED;
        this.mMasuSts[(this.mMasuCnt - ((this.mMasuCnt >> 2) + 1))][(this.mMasuCnt - ((this.mMasuCnt >> 2) + 2))] = REVERSI_STS_RED;
        this.makeMasuSts(REVERSI_STS_BLACK);
        this.makeMasuSts(REVERSI_STS_WHITE);
        this.makeMasuSts(REVERSI_STS_BLUE);
        this.makeMasuSts(REVERSI_STS_RED);
        this.mMasuHistCur = 0;
        this.mMasuStsOld = $.extend(true, [], this.mMasuSts);
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			各コマの置ける場所等のステータス作成
     *	@fn				private makeMasuSts(color : number) : number
     *	@param[in]		color : number		ステータスを作成するコマ
     *	@return			ありません
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    Reversi.prototype.makeMasuSts = function (color) {
        var flg;
        var okflg = 0;
        var cnt1;
        var cnt2;
        var count1;
        var count2 = 0;
        var ret = -1;
        var countMax = 0;
        var loop;
        for (var i = 0; i < this.mMasuCnt; i++) {
            for (var j = 0; j < this.mMasuCnt; j++) {
                if (color == REVERSI_STS_BLACK) {
                    this.mMasuStsEnaB[i][j] = 0;
                    this.mMasuStsCntB[i][j] = 0;
                }
                else if (color == REVERSI_STS_WHITE) {
                    this.mMasuStsEnaW[i][j] = 0;
                    this.mMasuStsCntW[i][j] = 0;
                }
                else if (color == REVERSI_STS_BLUE) {
                    this.mMasuStsEnaL[i][j] = 0;
                    this.mMasuStsCntL[i][j] = 0;
                }
                else {
                    this.mMasuStsEnaR[i][j] = 0;
                    this.mMasuStsCntR[i][j] = 0;
                }
            }
        }
        loop = this.mMasuCnt * this.mMasuCnt;
        for (var i = 0; i < loop; i++) {
            if (color == REVERSI_STS_BLACK) {
                this.mMasuPointB[i].x = 0;
                this.mMasuPointB[i].y = 0;
            }
            else if (color == REVERSI_STS_WHITE) {
                this.mMasuPointW[i].x = 0;
                this.mMasuPointW[i].y = 0;
            }
            else if (color == REVERSI_STS_BLUE) {
                this.mMasuPointL[i].x = 0;
                this.mMasuPointL[i].y = 0;
            }
            else {
                this.mMasuPointR[i].x = 0;
                this.mMasuPointR[i].y = 0;
            }
        }
        if (color == REVERSI_STS_BLACK) {
            this.mMasuPointCntB = 0;
        }
        else if (color == REVERSI_STS_WHITE) {
            this.mMasuPointCntW = 0;
        }
        else if (color == REVERSI_STS_BLUE) {
            this.mMasuPointCntL = 0;
        }
        else {
            this.mMasuPointCntR = 0;
        }
        this.mMasuBetCntB = 0;
        this.mMasuBetCntW = 0;
        this.mMasuBetCntL = 0;
        this.mMasuBetCntR = 0;
        for (var i = 0; i < this.mMasuCnt; i++) {
            for (var j = 0; j < this.mMasuCnt; j++) {
                okflg = 0;
                count2 = 0;
                if (this.mMasuSts[i][j] == REVERSI_STS_NONE) {
                    cnt1 = i;
                    count1 = flg = 0;
                    // *** 上方向を調べる *** //
                    while ((cnt1 > 0) && (this.mMasuSts[cnt1 - 1][j] != REVERSI_STS_NONE && this.mMasuSts[cnt1 - 1][j] != color)) {
                        flg = 1;
                        cnt1--;
                        count1++;
                    }
                    if ((cnt1 > 0) && (flg == 1) && (this.mMasuSts[cnt1 - 1][j] == color)) {
                        okflg = 1;
                        count2 += count1;
                    }
                    cnt1 = i;
                    count1 = flg = 0;
                    // *** 下方向を調べる *** //
                    while ((cnt1 < (this.mMasuCnt - 1)) && (this.mMasuSts[cnt1 + 1][j] != REVERSI_STS_NONE && this.mMasuSts[cnt1 + 1][j] != color)) {
                        flg = 1;
                        cnt1++;
                        count1++;
                    }
                    if ((cnt1 < (this.mMasuCnt - 1)) && (flg == 1) && (this.mMasuSts[cnt1 + 1][j] == color)) {
                        okflg = 1;
                        count2 += count1;
                    }
                    cnt2 = j;
                    count1 = flg = 0;
                    // *** 右方向を調べる *** //
                    while ((cnt2 < (this.mMasuCnt - 1)) && (this.mMasuSts[i][cnt2 + 1] != REVERSI_STS_NONE && this.mMasuSts[i][cnt2 + 1] != color)) {
                        flg = 1;
                        cnt2++;
                        count1++;
                    }
                    if ((cnt2 < (this.mMasuCnt - 1)) && (flg == 1) && (this.mMasuSts[i][cnt2 + 1] == color)) {
                        okflg = 1;
                        count2 += count1;
                    }
                    cnt2 = j;
                    count1 = flg = 0;
                    // *** 左方向を調べる *** //
                    while ((cnt2 > 0) && (this.mMasuSts[i][cnt2 - 1] != REVERSI_STS_NONE && this.mMasuSts[i][cnt2 - 1] != color)) {
                        flg = 1;
                        cnt2--;
                        count1++;
                    }
                    if ((cnt2 > 0) && (flg == 1) && (this.mMasuSts[i][cnt2 - 1] == color)) {
                        okflg = 1;
                        count2 += count1;
                    }
                    cnt2 = j;
                    cnt1 = i;
                    count1 = flg = 0;
                    // *** 右上方向を調べる *** //
                    while (((cnt2 < (this.mMasuCnt - 1)) && (cnt1 > 0)) && (this.mMasuSts[cnt1 - 1][cnt2 + 1] != REVERSI_STS_NONE && this.mMasuSts[cnt1 - 1][cnt2 + 1] != color)) {
                        flg = 1;
                        cnt1--;
                        cnt2++;
                        count1++;
                    }
                    if (((cnt2 < (this.mMasuCnt - 1)) && (cnt1 > 0)) && (flg == 1) && (this.mMasuSts[cnt1 - 1][cnt2 + 1] == color)) {
                        okflg = 1;
                        count2 += count1;
                    }
                    cnt2 = j;
                    cnt1 = i;
                    count1 = flg = 0;
                    // *** 左上方向を調べる *** //
                    while (((cnt2 > 0) && (cnt1 > 0)) && (this.mMasuSts[cnt1 - 1][cnt2 - 1] != REVERSI_STS_NONE && this.mMasuSts[cnt1 - 1][cnt2 - 1] != color)) {
                        flg = 1;
                        cnt1--;
                        cnt2--;
                        count1++;
                    }
                    if (((cnt2 > 0) && (cnt1 > 0)) && (flg == 1) && (this.mMasuSts[cnt1 - 1][cnt2 - 1] == color)) {
                        okflg = 1;
                        count2 += count1;
                    }
                    cnt2 = j;
                    cnt1 = i;
                    count1 = flg = 0;
                    // *** 右下方向を調べる *** //
                    while (((cnt2 < (this.mMasuCnt - 1)) && (cnt1 < (this.mMasuCnt - 1))) && (this.mMasuSts[cnt1 + 1][cnt2 + 1] != REVERSI_STS_NONE && this.mMasuSts[cnt1 + 1][cnt2 + 1] != color)) {
                        flg = 1;
                        cnt1++;
                        cnt2++;
                        count1++;
                    }
                    if (((cnt2 < (this.mMasuCnt - 1)) && (cnt1 < (this.mMasuCnt - 1))) && (flg == 1) && (this.mMasuSts[cnt1 + 1][cnt2 + 1] == color)) {
                        okflg = 1;
                        count2 += count1;
                    }
                    cnt2 = j;
                    cnt1 = i;
                    count1 = flg = 0;
                    // *** 左下方向を調べる *** //
                    while (((cnt2 > 0) && (cnt1 < (this.mMasuCnt - 1))) && (this.mMasuSts[cnt1 + 1][cnt2 - 1] != REVERSI_STS_NONE && this.mMasuSts[cnt1 + 1][cnt2 - 1] != color)) {
                        flg = 1;
                        cnt1++;
                        cnt2--;
                        count1++;
                    }
                    if (((cnt2 > 0) && (cnt1 < (this.mMasuCnt - 1))) && (flg == 1) && (this.mMasuSts[cnt1 + 1][cnt2 - 1] == color)) {
                        okflg = 1;
                        count2 += count1;
                    }
                    if (okflg == 1) {
                        if (color == REVERSI_STS_BLACK) {
                            this.mMasuStsEnaB[i][j] = 1;
                            this.mMasuStsCntB[i][j] = count2;
                            // *** 置ける場所をリニアに保存、置けるポイント数も保存 *** //
                            this.mMasuPointB[this.mMasuPointCntB].y = i;
                            this.mMasuPointB[this.mMasuPointCntB].x = j;
                            this.mMasuPointCntB++;
                        }
                        else if (color == REVERSI_STS_WHITE) {
                            this.mMasuStsEnaW[i][j] = 1;
                            this.mMasuStsCntW[i][j] = count2;
                            // *** 置ける場所をリニアに保存、置けるポイント数も保存 *** //
                            this.mMasuPointW[this.mMasuPointCntW].y = i;
                            this.mMasuPointW[this.mMasuPointCntW].x = j;
                            this.mMasuPointCntW++;
                        }
                        else if (color == REVERSI_STS_BLUE) {
                            this.mMasuStsEnaL[i][j] = 1;
                            this.mMasuStsCntL[i][j] = count2;
                            // *** 置ける場所をリニアに保存、置けるポイント数も保存 *** //
                            this.mMasuPointL[this.mMasuPointCntL].y = i;
                            this.mMasuPointL[this.mMasuPointCntL].x = j;
                            this.mMasuPointCntL++;
                        }
                        else {
                            this.mMasuStsEnaR[i][j] = 1;
                            this.mMasuStsCntR[i][j] = count2;
                            // *** 置ける場所をリニアに保存、置けるポイント数も保存 *** //
                            this.mMasuPointR[this.mMasuPointCntR].y = i;
                            this.mMasuPointR[this.mMasuPointCntR].x = j;
                            this.mMasuPointCntR++;
                        }
                        ret = 0;
                        if (countMax < count2)
                            countMax = count2;
                    }
                }
                else if (this.mMasuSts[i][j] == REVERSI_STS_BLACK) {
                    this.mMasuBetCntB++;
                }
                else if (this.mMasuSts[i][j] == REVERSI_STS_WHITE) {
                    this.mMasuBetCntW++;
                }
                else if (this.mMasuSts[i][j] == REVERSI_STS_BLUE) {
                    this.mMasuBetCntL++;
                }
                else if (this.mMasuSts[i][j] == REVERSI_STS_RED) {
                    this.mMasuBetCntR++;
                }
            }
        }
        // *** 一番枚数を獲得できるマスを設定 *** //
        for (var i = 0; i < this.mMasuCnt; i++) {
            for (var j = 0; j < this.mMasuCnt; j++) {
                if (color == REVERSI_STS_BLACK) {
                    if (this.mMasuStsEnaB[i][j] != 0 && this.mMasuStsCntB[i][j] == countMax) {
                        this.mMasuStsEnaB[i][j] = 2;
                    }
                }
                else if (color == REVERSI_STS_WHITE) {
                    if (this.mMasuStsEnaW[i][j] != 0 && this.mMasuStsCntW[i][j] == countMax) {
                        this.mMasuStsEnaW[i][j] = 2;
                    }
                }
                else if (color == REVERSI_STS_BLUE) {
                    if (this.mMasuStsEnaL[i][j] != 0 && this.mMasuStsCntL[i][j] == countMax) {
                        this.mMasuStsEnaL[i][j] = 2;
                    }
                }
                else {
                    if (this.mMasuStsEnaR[i][j] != 0 && this.mMasuStsCntR[i][j] == countMax) {
                        this.mMasuStsEnaR[i][j] = 2;
                    }
                }
            }
        }
        return ret;
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			コマをひっくり返す
     *	@fn				private revMasuSts(color : number,y : number,x : number) : void
     *	@param[in]		color : number		ひっくり返す元コマ
     *	@param[in]		y : number			ひっくり返す元コマのY座標
     *	@param[in]		x : number			ひっくり返す元コマのX座標
     *	@return			ありません
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    Reversi.prototype.revMasuSts = function (color, y, x) {
        var cnt1;
        var cnt2;
        var rcnt1;
        var rcnt2;
        var flg = 0;
        // *** 左方向にある駒を調べる *** //
        for (flg = 0, cnt1 = x, cnt2 = y; cnt1 > 0;) {
            if (this.mMasuSts[cnt2][cnt1 - 1] != REVERSI_STS_NONE && this.mMasuSts[cnt2][cnt1 - 1] != color) {
                // *** プレイヤー以外の色の駒があるなら *** //
                cnt1--;
            }
            else if (this.mMasuSts[cnt2][cnt1 - 1] == color) {
                flg = 1;
                break;
            }
            else if (this.mMasuSts[cnt2][cnt1 - 1] == REVERSI_STS_NONE) {
                break;
            }
        }
        if (flg == 1) {
            // *** 駒をひっくり返す *** //
            for (rcnt1 = cnt1; rcnt1 < x; rcnt1++) {
                this.mMasuSts[cnt2][rcnt1] = color;
            }
        }
        // *** 右方向にある駒を調べる *** //
        for (flg = 0, cnt1 = x, cnt2 = y; cnt1 < (this.mMasuCnt - 1);) {
            if (this.mMasuSts[cnt2][cnt1 + 1] != REVERSI_STS_NONE && this.mMasuSts[cnt2][cnt1 + 1] != color) {
                // *** プレイヤー以外の色の駒があるなら *** //
                cnt1++;
            }
            else if (this.mMasuSts[cnt2][cnt1 + 1] == color) {
                flg = 1;
                break;
            }
            else if (this.mMasuSts[cnt2][cnt1 + 1] == REVERSI_STS_NONE) {
                break;
            }
        }
        if (flg == 1) {
            // *** 駒をひっくり返す *** //
            for (rcnt1 = cnt1; rcnt1 > x; rcnt1--) {
                this.mMasuSts[cnt2][rcnt1] = color;
            }
        }
        // *** 上方向にある駒を調べる *** //
        for (flg = 0, cnt1 = x, cnt2 = y; cnt2 > 0;) {
            if (this.mMasuSts[cnt2 - 1][cnt1] != REVERSI_STS_NONE && this.mMasuSts[cnt2 - 1][cnt1] != color) {
                // *** プレイヤー以外の色の駒があるなら *** //
                cnt2--;
            }
            else if (this.mMasuSts[cnt2 - 1][cnt1] == color) {
                flg = 1;
                break;
            }
            else if (this.mMasuSts[cnt2 - 1][cnt1] == REVERSI_STS_NONE) {
                break;
            }
        }
        if (flg == 1) {
            // *** 駒をひっくり返す *** //
            for (rcnt1 = cnt2; rcnt1 < y; rcnt1++) {
                this.mMasuSts[rcnt1][cnt1] = color;
            }
        }
        // *** 下方向にある駒を調べる *** //
        for (flg = 0, cnt1 = x, cnt2 = y; cnt2 < (this.mMasuCnt - 1);) {
            if (this.mMasuSts[cnt2 + 1][cnt1] != REVERSI_STS_NONE && this.mMasuSts[cnt2 + 1][cnt1] != color) {
                // *** プレイヤー以外の色の駒があるなら *** //
                cnt2++;
            }
            else if (this.mMasuSts[cnt2 + 1][cnt1] == color) {
                flg = 1;
                break;
            }
            else if (this.mMasuSts[cnt2 + 1][cnt1] == REVERSI_STS_NONE) {
                break;
            }
        }
        if (flg == 1) {
            // *** 駒をひっくり返す *** //
            for (rcnt1 = cnt2; rcnt1 > y; rcnt1--) {
                this.mMasuSts[rcnt1][cnt1] = color;
            }
        }
        // *** 左上方向にある駒を調べる *** //
        for (flg = 0, cnt1 = x, cnt2 = y; cnt2 > 0 && cnt1 > 0;) {
            if (this.mMasuSts[cnt2 - 1][cnt1 - 1] != REVERSI_STS_NONE && this.mMasuSts[cnt2 - 1][cnt1 - 1] != color) {
                // *** プレイヤー以外の色の駒があるなら *** //
                cnt2--;
                cnt1--;
            }
            else if (this.mMasuSts[cnt2 - 1][cnt1 - 1] == color) {
                flg = 1;
                break;
            }
            else if (this.mMasuSts[cnt2 - 1][cnt1 - 1] == REVERSI_STS_NONE) {
                break;
            }
        }
        if (flg == 1) {
            // *** 駒をひっくり返す *** //
            for (rcnt1 = cnt2, rcnt2 = cnt1; (rcnt1 < y) && (rcnt2 < x); rcnt1++, rcnt2++) {
                this.mMasuSts[rcnt1][rcnt2] = color;
            }
        }
        // *** 左下方向にある駒を調べる *** //
        for (flg = 0, cnt1 = x, cnt2 = y; cnt2 < (this.mMasuCnt - 1) && cnt1 > 0;) {
            if (this.mMasuSts[cnt2 + 1][cnt1 - 1] != REVERSI_STS_NONE && this.mMasuSts[cnt2 + 1][cnt1 - 1] != color) {
                // *** プレイヤー以外の色の駒があるなら *** //
                cnt2++;
                cnt1--;
            }
            else if (this.mMasuSts[cnt2 + 1][cnt1 - 1] == color) {
                flg = 1;
                break;
            }
            else if (this.mMasuSts[cnt2 + 1][cnt1 - 1] == REVERSI_STS_NONE) {
                break;
            }
        }
        if (flg == 1) {
            // *** 駒をひっくり返す *** //
            for (rcnt1 = cnt2, rcnt2 = cnt1; (rcnt1 > y) && (rcnt2 < x); rcnt1--, rcnt2++) {
                this.mMasuSts[rcnt1][rcnt2] = color;
            }
        }
        // *** 右上方向にある駒を調べる *** //
        for (flg = 0, cnt1 = x, cnt2 = y; cnt2 > 0 && cnt1 < (this.mMasuCnt - 1);) {
            if (this.mMasuSts[cnt2 - 1][cnt1 + 1] != REVERSI_STS_NONE && this.mMasuSts[cnt2 - 1][cnt1 + 1] != color) {
                // *** プレイヤー以外の色の駒があるなら *** //
                cnt2--;
                cnt1++;
            }
            else if (this.mMasuSts[cnt2 - 1][cnt1 + 1] == color) {
                flg = 1;
                break;
            }
            else if (this.mMasuSts[cnt2 - 1][cnt1 + 1] == REVERSI_STS_NONE) {
                break;
            }
        }
        if (flg == 1) {
            // *** 駒をひっくり返す *** //
            for (rcnt1 = cnt2, rcnt2 = cnt1; (rcnt1 < y) && (rcnt2 > x); rcnt1++, rcnt2--) {
                this.mMasuSts[rcnt1][rcnt2] = color;
            }
        }
        // *** 右下方向にある駒を調べる *** //
        for (flg = 0, cnt1 = x, cnt2 = y; cnt2 < (this.mMasuCnt - 1) && cnt1 < (this.mMasuCnt - 1);) {
            if (this.mMasuSts[cnt2 + 1][cnt1 + 1] != REVERSI_STS_NONE && this.mMasuSts[cnt2 + 1][cnt1 + 1] != color) {
                // *** プレイヤー以外の色の駒があるなら *** //
                cnt2++;
                cnt1++;
            }
            else if (this.mMasuSts[cnt2 + 1][cnt1 + 1] == color) {
                flg = 1;
                break;
            }
            else if (this.mMasuSts[cnt2 + 1][cnt1 + 1] == REVERSI_STS_NONE) {
                break;
            }
        }
        if (flg == 1) {
            // *** 駒をひっくり返す *** //
            for (rcnt1 = cnt2, rcnt2 = cnt1; (rcnt1 > y) && (rcnt2 > x); rcnt1--, rcnt2--) {
                this.mMasuSts[rcnt1][rcnt2] = color;
            }
        }
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			パラメーター範囲チェック
     *	@fn				private checkPara(para : number,min : number,max : number) : number
     *	@param[in]		para : number		チェックパラメーター
     *	@param[in]		min : number		パラメーター最小値
     *	@param[in]		max : number		パラメーター最大値
     *	@return			0 : 成功 それ以外 : 失敗
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    Reversi.prototype.checkPara = function (para, min, max) {
        var ret = -1;
        if (min <= para && para <= max)
            ret = 0;
        return ret;
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			解析を行う(黒)
     *	@fn				private AnalysisReversiBlack() : void
     *	@return			ありません
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    Reversi.prototype.AnalysisReversiBlack = function () {
        var tmpX;
        var tmpY;
        var sum;
        var sumOwn;
        var tmpGoodPoint;
        var tmpBadPoint;
        var tmpD1;
        var tmpD2;
        for (var cnt = 0; cnt < this.mMasuPointCntB; cnt++) {
            // *** 現在ステータスを一旦コピー *** //
            var tmpMasu = $.extend(true, [], this.mMasuSts);
            var tmpMasuEnaB = $.extend(true, [], this.mMasuStsEnaB);
            var tmpMasuEnaW = $.extend(true, [], this.mMasuStsEnaW);
            var tmpMasuEnaL = $.extend(true, [], this.mMasuStsEnaL);
            var tmpMasuEnaR = $.extend(true, [], this.mMasuStsEnaR);
            tmpY = this.mMasuPointB[cnt].y;
            tmpX = this.mMasuPointB[cnt].x;
            this.mMasuSts[tmpY][tmpX] = REVERSI_STS_BLACK; // 仮に置く
            this.revMasuSts(REVERSI_STS_BLACK, tmpY, tmpX); // 仮にひっくり返す
            this.makeMasuSts(REVERSI_STS_BLACK);
            this.makeMasuSts(REVERSI_STS_WHITE);
            this.makeMasuSts(REVERSI_STS_BLUE);
            this.makeMasuSts(REVERSI_STS_RED);
            // *** このマスに置いた場合の解析を行う *** //
            if (this.getColorEna(REVERSI_STS_WHITE) != 0 && this.getColorEna(REVERSI_STS_BLUE) != 0 && this.getColorEna(REVERSI_STS_RED) != 0) {
                this.mMasuStsPassB[tmpY][tmpX] = 1;
            }
            if (this.getEdgeSideZero(tmpY, tmpX) == 0) {
                this.mMasuStsAnzB[tmpY][tmpX].ownEdgeCnt++;
                this.mMasuStsAnzB[tmpY][tmpX].goodPoint += 10000 * this.mMasuStsCntB[tmpY][tmpX];
            }
            else if (this.getEdgeSideOne(tmpY, tmpX) == 0) {
                this.mMasuStsAnzB[tmpY][tmpX].ownEdgeSideOneCnt++;
                if (this.checkEdge(REVERSI_STS_BLACK, tmpY, tmpX) != 0) {
                    this.mMasuStsAnzB[tmpY][tmpX].goodPoint += 10 * this.mMasuStsCntB[tmpY][tmpX];
                }
                else {
                    this.mMasuStsAnzB[tmpY][tmpX].badPoint += 100000;
                }
            }
            else if (this.getEdgeSideTwo(tmpY, tmpX) == 0) {
                this.mMasuStsAnzB[tmpY][tmpX].ownEdgeSideTwoCnt++;
                this.mMasuStsAnzB[tmpY][tmpX].goodPoint += 1000 * this.mMasuStsCntB[tmpY][tmpX];
            }
            else if (this.getEdgeSideThree(tmpY, tmpX) == 0) {
                this.mMasuStsAnzB[tmpY][tmpX].ownEdgeSideThreeCnt++;
                this.mMasuStsAnzB[tmpY][tmpX].goodPoint += 100 * this.mMasuStsCntB[tmpY][tmpX];
            }
            else {
                this.mMasuStsAnzB[tmpY][tmpX].ownEdgeSideOtherCnt++;
                this.mMasuStsAnzB[tmpY][tmpX].goodPoint += 10 * this.mMasuStsCntB[tmpY][tmpX];
            }
            sum = 0;
            sumOwn = 0;
            for (var i = 0; i < this.mMasuCnt; i++) {
                for (var j = 0; j < this.mMasuCnt; j++) {
                    tmpBadPoint = 0;
                    tmpGoodPoint = 0;
                    if (this.getMasuStsEna(REVERSI_STS_WHITE, i, j) != 0) {
                        sum += this.mMasuStsCntW[i][j]; // 相手の獲得予定枚数
                        // *** 相手の獲得予定の最大数保持 *** //
                        if (this.mMasuStsAnzB[tmpY][tmpX].max < this.mMasuStsCntW[i][j])
                            this.mMasuStsAnzB[tmpY][tmpX].max = this.mMasuStsCntW[i][j];
                        // *** 相手の獲得予定の最小数保持 *** //
                        if (this.mMasuStsCntW[i][j] < this.mMasuStsAnzB[tmpY][tmpX].min)
                            this.mMasuStsAnzB[tmpY][tmpX].min = this.mMasuStsCntW[i][j];
                        this.mMasuStsAnzB[tmpY][tmpX].pointCnt++; // 相手の置ける場所の数
                        if (this.getEdgeSideZero(i, j) == 0) {
                            this.mMasuStsAnzB[tmpY][tmpX].edgeCnt++;
                            tmpBadPoint = 100000 * this.mMasuStsCntW[i][j];
                        }
                        else if (this.getEdgeSideOne(i, j) == 0) {
                            this.mMasuStsAnzB[tmpY][tmpX].edgeSideOneCnt++;
                            tmpBadPoint = 0;
                        }
                        else if (this.getEdgeSideTwo(i, j) == 0) {
                            this.mMasuStsAnzB[tmpY][tmpX].edgeSideTwoCnt++;
                            tmpBadPoint = 1 * this.mMasuStsCntW[i][j];
                        }
                        else if (this.getEdgeSideThree(i, j) == 0) {
                            this.mMasuStsAnzB[tmpY][tmpX].edgeSideThreeCnt++;
                            tmpBadPoint = 1 * this.mMasuStsCntW[i][j];
                        }
                        else {
                            this.mMasuStsAnzB[tmpY][tmpX].edgeSideOtherCnt++;
                            tmpBadPoint = 1 * this.mMasuStsCntW[i][j];
                        }
                        if (tmpMasuEnaW[i][j] != 0)
                            tmpBadPoint = 0; // ステータス変化していないなら
                    }
                    if (this.getMasuStsEna(REVERSI_STS_BLUE, i, j) != 0) {
                        sum += this.mMasuStsCntL[i][j]; // 相手の獲得予定枚数
                        // *** 相手の獲得予定の最大数保持 *** //
                        if (this.mMasuStsAnzB[tmpY][tmpX].max < this.mMasuStsCntL[i][j])
                            this.mMasuStsAnzB[tmpY][tmpX].max = this.mMasuStsCntL[i][j];
                        // *** 相手の獲得予定の最小数保持 *** //
                        if (this.mMasuStsCntL[i][j] < this.mMasuStsAnzB[tmpY][tmpX].min)
                            this.mMasuStsAnzB[tmpY][tmpX].min = this.mMasuStsCntL[i][j];
                        this.mMasuStsAnzB[tmpY][tmpX].pointCnt++; // 相手の置ける場所の数
                        if (this.getEdgeSideZero(i, j) == 0) {
                            this.mMasuStsAnzB[tmpY][tmpX].edgeCnt++;
                            tmpBadPoint = 100000 * this.mMasuStsCntL[i][j];
                        }
                        else if (this.getEdgeSideOne(i, j) == 0) {
                            this.mMasuStsAnzB[tmpY][tmpX].edgeSideOneCnt++;
                            tmpBadPoint = 0;
                        }
                        else if (this.getEdgeSideTwo(i, j) == 0) {
                            this.mMasuStsAnzB[tmpY][tmpX].edgeSideTwoCnt++;
                            tmpBadPoint = 1 * this.mMasuStsCntL[i][j];
                        }
                        else if (this.getEdgeSideThree(i, j) == 0) {
                            this.mMasuStsAnzB[tmpY][tmpX].edgeSideThreeCnt++;
                            tmpBadPoint = 1 * this.mMasuStsCntL[i][j];
                        }
                        else {
                            this.mMasuStsAnzB[tmpY][tmpX].edgeSideOtherCnt++;
                            tmpBadPoint = 1 * this.mMasuStsCntL[i][j];
                        }
                        if (tmpMasuEnaL[i][j] != 0)
                            tmpBadPoint = 0; // ステータス変化していないなら
                    }
                    if (this.getMasuStsEna(REVERSI_STS_RED, i, j) != 0) {
                        sum += this.mMasuStsCntR[i][j]; // 相手の獲得予定枚数
                        // *** 相手の獲得予定の最大数保持 *** //
                        if (this.mMasuStsAnzB[tmpY][tmpX].max < this.mMasuStsCntR[i][j])
                            this.mMasuStsAnzB[tmpY][tmpX].max = this.mMasuStsCntR[i][j];
                        // *** 相手の獲得予定の最小数保持 *** //
                        if (this.mMasuStsCntR[i][j] < this.mMasuStsAnzB[tmpY][tmpX].min)
                            this.mMasuStsAnzB[tmpY][tmpX].min = this.mMasuStsCntR[i][j];
                        this.mMasuStsAnzB[tmpY][tmpX].pointCnt++; // 相手の置ける場所の数
                        if (this.getEdgeSideZero(i, j) == 0) {
                            this.mMasuStsAnzB[tmpY][tmpX].edgeCnt++;
                            tmpBadPoint = 100000 * this.mMasuStsCntR[i][j];
                        }
                        else if (this.getEdgeSideOne(i, j) == 0) {
                            this.mMasuStsAnzB[tmpY][tmpX].edgeSideOneCnt++;
                            tmpBadPoint = 0;
                        }
                        else if (this.getEdgeSideTwo(i, j) == 0) {
                            this.mMasuStsAnzB[tmpY][tmpX].edgeSideTwoCnt++;
                            tmpBadPoint = 1 * this.mMasuStsCntR[i][j];
                        }
                        else if (this.getEdgeSideThree(i, j) == 0) {
                            this.mMasuStsAnzB[tmpY][tmpX].edgeSideThreeCnt++;
                            tmpBadPoint = 1 * this.mMasuStsCntR[i][j];
                        }
                        else {
                            this.mMasuStsAnzB[tmpY][tmpX].edgeSideOtherCnt++;
                            tmpBadPoint = 1 * this.mMasuStsCntR[i][j];
                        }
                        if (tmpMasuEnaR[i][j] != 0)
                            tmpBadPoint = 0; // ステータス変化していないなら
                    }
                    if (this.getMasuStsEna(REVERSI_STS_BLACK, i, j) != 0) {
                        sumOwn += this.mMasuStsCntB[i][j]; // 自分の獲得予定枚数
                        // *** 自分の獲得予定の最大数保持 *** //
                        if (this.mMasuStsAnzB[tmpY][tmpX].ownMax < this.mMasuStsCntB[i][j])
                            this.mMasuStsAnzB[tmpY][tmpX].ownMax = this.mMasuStsCntB[i][j];
                        // *** 自分の獲得予定の最小数保持 *** //
                        if (this.mMasuStsCntB[i][j] < this.mMasuStsAnzB[tmpY][tmpX].ownMin)
                            this.mMasuStsAnzB[tmpY][tmpX].ownMin = this.mMasuStsCntB[i][j];
                        this.mMasuStsAnzB[tmpY][tmpX].ownPointCnt++; // 自分の置ける場所の数
                        if (this.getEdgeSideZero(i, j) == 0) {
                            this.mMasuStsAnzB[tmpY][tmpX].ownEdgeCnt++;
                            tmpGoodPoint = 100 * this.mMasuStsCntB[i][j];
                        }
                        else if (this.getEdgeSideOne(i, j) == 0) {
                            this.mMasuStsAnzB[tmpY][tmpX].ownEdgeSideOneCnt++;
                            tmpGoodPoint = 0;
                        }
                        else if (this.getEdgeSideTwo(i, j) == 0) {
                            this.mMasuStsAnzB[tmpY][tmpX].ownEdgeSideTwoCnt++;
                            tmpGoodPoint = 3 * this.mMasuStsCntB[i][j];
                        }
                        else if (this.getEdgeSideThree(i, j) == 0) {
                            this.mMasuStsAnzB[tmpY][tmpX].ownEdgeSideThreeCnt++;
                            tmpGoodPoint = 2 * this.mMasuStsCntB[i][j];
                        }
                        else {
                            this.mMasuStsAnzB[tmpY][tmpX].ownEdgeSideOtherCnt++;
                            tmpGoodPoint = 1 * this.mMasuStsCntB[i][j];
                        }
                        if (tmpMasuEnaB[i][j] != 0)
                            tmpGoodPoint = 0; // ステータス変化していないなら
                    }
                    if (tmpBadPoint != 0)
                        this.mMasuStsAnzB[tmpY][tmpX].badPoint += tmpBadPoint;
                    if (tmpGoodPoint != 0)
                        this.mMasuStsAnzB[tmpY][tmpX].goodPoint += tmpGoodPoint;
                }
            }
            // *** 相手に取られる平均コマ数 *** //
            if (this.getPointCnt(REVERSI_STS_WHITE) != 0 || this.getPointCnt(REVERSI_STS_BLUE) != 0 || this.getPointCnt(REVERSI_STS_RED) != 0) {
                tmpD1 = sum;
                tmpD2 = this.getPointCnt(REVERSI_STS_WHITE);
                tmpD2 += this.getPointCnt(REVERSI_STS_BLUE);
                tmpD2 += this.getPointCnt(REVERSI_STS_RED);
                this.mMasuStsAnzB[tmpY][tmpX].avg = tmpD1 / tmpD2;
            }
            // *** 自分が取れる平均コマ数 *** //
            if (this.getPointCnt(REVERSI_STS_BLACK) != 0) {
                tmpD1 = sumOwn;
                tmpD2 = this.getPointCnt(REVERSI_STS_BLACK);
                this.mMasuStsAnzB[tmpY][tmpX].ownAvg = tmpD1 / tmpD2;
            }
            // *** 元に戻す *** //
            this.mMasuSts = $.extend(true, [], tmpMasu);
            this.makeMasuSts(REVERSI_STS_BLACK);
            this.makeMasuSts(REVERSI_STS_WHITE);
            this.makeMasuSts(REVERSI_STS_BLUE);
            this.makeMasuSts(REVERSI_STS_RED);
        }
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			解析を行う(白)
     *	@fn				private AnalysisReversiWhite() : void
     *	@return			ありません
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    Reversi.prototype.AnalysisReversiWhite = function () {
        var tmpX;
        var tmpY;
        var sum;
        var sumOwn;
        var tmpGoodPoint;
        var tmpBadPoint;
        var tmpD1;
        var tmpD2;
        for (var cnt = 0; cnt < this.mMasuPointCntW; cnt++) {
            // *** 現在ステータスを一旦コピー *** //
            var tmpMasu = $.extend(true, [], this.mMasuSts);
            var tmpMasuEnaB = $.extend(true, [], this.mMasuStsEnaB);
            var tmpMasuEnaW = $.extend(true, [], this.mMasuStsEnaW);
            var tmpMasuEnaL = $.extend(true, [], this.mMasuStsEnaL);
            var tmpMasuEnaR = $.extend(true, [], this.mMasuStsEnaR);
            tmpY = this.mMasuPointW[cnt].y;
            tmpX = this.mMasuPointW[cnt].x;
            this.mMasuSts[tmpY][tmpX] = REVERSI_STS_WHITE; // 仮に置く
            this.revMasuSts(REVERSI_STS_WHITE, tmpY, tmpX); // 仮にひっくり返す
            this.makeMasuSts(REVERSI_STS_BLACK);
            this.makeMasuSts(REVERSI_STS_WHITE);
            this.makeMasuSts(REVERSI_STS_BLUE);
            this.makeMasuSts(REVERSI_STS_RED);
            // *** このマスに置いた場合の解析を行う *** //
            if (this.getColorEna(REVERSI_STS_BLACK) != 0 && this.getColorEna(REVERSI_STS_BLUE) != 0 && this.getColorEna(REVERSI_STS_RED) != 0) {
                this.mMasuStsPassW[tmpY][tmpX] = 1;
            }
            if (this.getEdgeSideZero(tmpY, tmpX) == 0) {
                this.mMasuStsAnzW[tmpY][tmpX].ownEdgeCnt++;
                this.mMasuStsAnzW[tmpY][tmpX].goodPoint += 10000 * this.mMasuStsCntW[tmpY][tmpX];
            }
            else if (this.getEdgeSideOne(tmpY, tmpX) == 0) {
                this.mMasuStsAnzW[tmpY][tmpX].ownEdgeSideOneCnt++;
                if (this.checkEdge(REVERSI_STS_WHITE, tmpY, tmpX) != 0) {
                    this.mMasuStsAnzW[tmpY][tmpX].goodPoint += 10 * this.mMasuStsCntW[tmpY][tmpX];
                }
                else {
                    this.mMasuStsAnzW[tmpY][tmpX].badPoint += 100000;
                }
            }
            else if (this.getEdgeSideTwo(tmpY, tmpX) == 0) {
                this.mMasuStsAnzW[tmpY][tmpX].ownEdgeSideTwoCnt++;
                this.mMasuStsAnzW[tmpY][tmpX].goodPoint += 1000 * this.mMasuStsCntW[tmpY][tmpX];
            }
            else if (this.getEdgeSideThree(tmpY, tmpX) == 0) {
                this.mMasuStsAnzW[tmpY][tmpX].ownEdgeSideThreeCnt++;
                this.mMasuStsAnzW[tmpY][tmpX].goodPoint += 100 * this.mMasuStsCntW[tmpY][tmpX];
            }
            else {
                this.mMasuStsAnzW[tmpY][tmpX].ownEdgeSideOtherCnt++;
                this.mMasuStsAnzW[tmpY][tmpX].goodPoint += 10 * this.mMasuStsCntW[tmpY][tmpX];
            }
            sum = 0;
            sumOwn = 0;
            for (var i = 0; i < this.mMasuCnt; i++) {
                for (var j = 0; j < this.mMasuCnt; j++) {
                    tmpBadPoint = 0;
                    tmpGoodPoint = 0;
                    if (this.getMasuStsEna(REVERSI_STS_BLACK, i, j) != 0) {
                        sum += this.mMasuStsCntB[i][j]; // 相手の獲得予定枚数
                        // *** 相手の獲得予定の最大数保持 *** //
                        if (this.mMasuStsAnzW[tmpY][tmpX].max < this.mMasuStsCntB[i][j])
                            this.mMasuStsAnzW[tmpY][tmpX].max = this.mMasuStsCntB[i][j];
                        // *** 相手の獲得予定の最小数保持 *** //
                        if (this.mMasuStsCntB[i][j] < this.mMasuStsAnzW[tmpY][tmpX].min)
                            this.mMasuStsAnzW[tmpY][tmpX].min = this.mMasuStsCntB[i][j];
                        this.mMasuStsAnzW[tmpY][tmpX].pointCnt++; // 相手の置ける場所の数
                        if (this.getEdgeSideZero(i, j) == 0) {
                            this.mMasuStsAnzW[tmpY][tmpX].edgeCnt++;
                            tmpBadPoint = 100000 * this.mMasuStsCntB[i][j];
                        }
                        else if (this.getEdgeSideOne(i, j) == 0) {
                            this.mMasuStsAnzW[tmpY][tmpX].edgeSideOneCnt++;
                            tmpBadPoint = 0;
                        }
                        else if (this.getEdgeSideTwo(i, j) == 0) {
                            this.mMasuStsAnzW[tmpY][tmpX].edgeSideTwoCnt++;
                            tmpBadPoint = 1 * this.mMasuStsCntB[i][j];
                        }
                        else if (this.getEdgeSideThree(i, j) == 0) {
                            this.mMasuStsAnzW[tmpY][tmpX].edgeSideThreeCnt++;
                            tmpBadPoint = 1 * this.mMasuStsCntB[i][j];
                        }
                        else {
                            this.mMasuStsAnzW[tmpY][tmpX].edgeSideOtherCnt++;
                            tmpBadPoint = 1 * this.mMasuStsCntB[i][j];
                        }
                        if (tmpMasuEnaB[i][j] != 0)
                            tmpBadPoint = 0; // ステータス変化していないなら
                    }
                    if (this.getMasuStsEna(REVERSI_STS_BLUE, i, j) != 0) {
                        sum += this.mMasuStsCntL[i][j]; // 相手の獲得予定枚数
                        // *** 相手の獲得予定の最大数保持 *** //
                        if (this.mMasuStsAnzW[tmpY][tmpX].max < this.mMasuStsCntL[i][j])
                            this.mMasuStsAnzW[tmpY][tmpX].max = this.mMasuStsCntL[i][j];
                        // *** 相手の獲得予定の最小数保持 *** //
                        if (this.mMasuStsCntL[i][j] < this.mMasuStsAnzW[tmpY][tmpX].min)
                            this.mMasuStsAnzW[tmpY][tmpX].min = this.mMasuStsCntL[i][j];
                        this.mMasuStsAnzW[tmpY][tmpX].pointCnt++; // 相手の置ける場所の数
                        if (this.getEdgeSideZero(i, j) == 0) {
                            this.mMasuStsAnzW[tmpY][tmpX].edgeCnt++;
                            tmpBadPoint = 100000 * this.mMasuStsCntL[i][j];
                        }
                        else if (this.getEdgeSideOne(i, j) == 0) {
                            this.mMasuStsAnzW[tmpY][tmpX].edgeSideOneCnt++;
                            tmpBadPoint = 0;
                        }
                        else if (this.getEdgeSideTwo(i, j) == 0) {
                            this.mMasuStsAnzW[tmpY][tmpX].edgeSideTwoCnt++;
                            tmpBadPoint = 1 * this.mMasuStsCntL[i][j];
                        }
                        else if (this.getEdgeSideThree(i, j) == 0) {
                            this.mMasuStsAnzW[tmpY][tmpX].edgeSideThreeCnt++;
                            tmpBadPoint = 1 * this.mMasuStsCntL[i][j];
                        }
                        else {
                            this.mMasuStsAnzW[tmpY][tmpX].edgeSideOtherCnt++;
                            tmpBadPoint = 1 * this.mMasuStsCntL[i][j];
                        }
                        if (tmpMasuEnaL[i][j] != 0)
                            tmpBadPoint = 0; // ステータス変化していないなら
                    }
                    if (this.getMasuStsEna(REVERSI_STS_RED, i, j) != 0) {
                        sum += this.mMasuStsCntR[i][j]; // 相手の獲得予定枚数
                        // *** 相手の獲得予定の最大数保持 *** //
                        if (this.mMasuStsAnzW[tmpY][tmpX].max < this.mMasuStsCntR[i][j])
                            this.mMasuStsAnzW[tmpY][tmpX].max = this.mMasuStsCntR[i][j];
                        // *** 相手の獲得予定の最小数保持 *** //
                        if (this.mMasuStsCntR[i][j] < this.mMasuStsAnzW[tmpY][tmpX].min)
                            this.mMasuStsAnzW[tmpY][tmpX].min = this.mMasuStsCntR[i][j];
                        this.mMasuStsAnzW[tmpY][tmpX].pointCnt++; // 相手の置ける場所の数
                        if (this.getEdgeSideZero(i, j) == 0) {
                            this.mMasuStsAnzW[tmpY][tmpX].edgeCnt++;
                            tmpBadPoint = 100000 * this.mMasuStsCntR[i][j];
                        }
                        else if (this.getEdgeSideOne(i, j) == 0) {
                            this.mMasuStsAnzW[tmpY][tmpX].edgeSideOneCnt++;
                            tmpBadPoint = 0;
                        }
                        else if (this.getEdgeSideTwo(i, j) == 0) {
                            this.mMasuStsAnzW[tmpY][tmpX].edgeSideTwoCnt++;
                            tmpBadPoint = 1 * this.mMasuStsCntR[i][j];
                        }
                        else if (this.getEdgeSideThree(i, j) == 0) {
                            this.mMasuStsAnzW[tmpY][tmpX].edgeSideThreeCnt++;
                            tmpBadPoint = 1 * this.mMasuStsCntR[i][j];
                        }
                        else {
                            this.mMasuStsAnzW[tmpY][tmpX].edgeSideOtherCnt++;
                            tmpBadPoint = 1 * this.mMasuStsCntR[i][j];
                        }
                        if (tmpMasuEnaR[i][j] != 0)
                            tmpBadPoint = 0; // ステータス変化していないなら
                    }
                    if (this.getMasuStsEna(REVERSI_STS_WHITE, i, j) != 0) {
                        sumOwn += this.mMasuStsCntW[i][j]; // 自分の獲得予定枚数
                        // *** 自分の獲得予定の最大数保持 *** //
                        if (this.mMasuStsAnzW[tmpY][tmpX].ownMax < this.mMasuStsCntW[i][j])
                            this.mMasuStsAnzW[tmpY][tmpX].ownMax = this.mMasuStsCntW[i][j];
                        // *** 自分の獲得予定の最小数保持 *** //
                        if (this.mMasuStsCntW[i][j] < this.mMasuStsAnzW[tmpY][tmpX].ownMin)
                            this.mMasuStsAnzW[tmpY][tmpX].ownMin = this.mMasuStsCntW[i][j];
                        this.mMasuStsAnzW[tmpY][tmpX].ownPointCnt++; // 自分の置ける場所の数
                        if (this.getEdgeSideZero(i, j) == 0) {
                            this.mMasuStsAnzW[tmpY][tmpX].ownEdgeCnt++;
                            tmpGoodPoint = 100 * this.mMasuStsCntW[i][j];
                        }
                        else if (this.getEdgeSideOne(i, j) == 0) {
                            this.mMasuStsAnzW[tmpY][tmpX].ownEdgeSideOneCnt++;
                            tmpGoodPoint = 0;
                        }
                        else if (this.getEdgeSideTwo(i, j) == 0) {
                            this.mMasuStsAnzW[tmpY][tmpX].ownEdgeSideTwoCnt++;
                            tmpGoodPoint = 3 * this.mMasuStsCntW[i][j];
                        }
                        else if (this.getEdgeSideThree(i, j) == 0) {
                            this.mMasuStsAnzW[tmpY][tmpX].ownEdgeSideThreeCnt++;
                            tmpGoodPoint = 2 * this.mMasuStsCntW[i][j];
                        }
                        else {
                            this.mMasuStsAnzW[tmpY][tmpX].ownEdgeSideOtherCnt++;
                            tmpGoodPoint = 1 * this.mMasuStsCntW[i][j];
                        }
                        if (tmpMasuEnaW[i][j] != 0)
                            tmpGoodPoint = 0; // ステータス変化していないなら
                    }
                    if (tmpBadPoint != 0)
                        this.mMasuStsAnzW[tmpY][tmpX].badPoint += tmpBadPoint;
                    if (tmpGoodPoint != 0)
                        this.mMasuStsAnzW[tmpY][tmpX].goodPoint += tmpGoodPoint;
                }
            }
            // *** 相手に取られる平均コマ数 *** //
            if (this.getPointCnt(REVERSI_STS_BLACK) != 0 || this.getPointCnt(REVERSI_STS_BLUE) != 0 || this.getPointCnt(REVERSI_STS_RED) != 0) {
                tmpD1 = sum;
                tmpD2 = this.getPointCnt(REVERSI_STS_BLACK);
                tmpD2 += this.getPointCnt(REVERSI_STS_BLUE);
                tmpD2 += this.getPointCnt(REVERSI_STS_RED);
                this.mMasuStsAnzW[tmpY][tmpX].avg = tmpD1 / tmpD2;
            }
            // *** 自分が取れる平均コマ数 *** //
            if (this.getPointCnt(REVERSI_STS_WHITE) != 0) {
                tmpD1 = sumOwn;
                tmpD2 = this.getPointCnt(REVERSI_STS_WHITE);
                this.mMasuStsAnzW[tmpY][tmpX].ownAvg = tmpD1 / tmpD2;
            }
            // *** 元に戻す *** //
            this.mMasuSts = $.extend(true, [], tmpMasu);
            this.makeMasuSts(REVERSI_STS_BLACK);
            this.makeMasuSts(REVERSI_STS_WHITE);
            this.makeMasuSts(REVERSI_STS_BLUE);
            this.makeMasuSts(REVERSI_STS_RED);
        }
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			解析を行う(青)
     *	@fn				private AnalysisReversiBlue(): void
     *	@return			ありません
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    Reversi.prototype.AnalysisReversiBlue = function () {
        var tmpX;
        var tmpY;
        var sum;
        var sumOwn;
        var tmpGoodPoint;
        var tmpBadPoint;
        var tmpD1;
        var tmpD2;
        for (var cnt = 0; cnt < this.mMasuPointCntL; cnt++) {
            // *** 現在ステータスを一旦コピー *** //
            var tmpMasu = $.extend(true, [], this.mMasuSts);
            var tmpMasuEnaB = $.extend(true, [], this.mMasuStsEnaB);
            var tmpMasuEnaW = $.extend(true, [], this.mMasuStsEnaW);
            var tmpMasuEnaL = $.extend(true, [], this.mMasuStsEnaL);
            var tmpMasuEnaR = $.extend(true, [], this.mMasuStsEnaR);
            tmpY = this.mMasuPointL[cnt].y;
            tmpX = this.mMasuPointL[cnt].x;
            this.mMasuSts[tmpY][tmpX] = REVERSI_STS_BLUE; // 仮に置く
            this.revMasuSts(REVERSI_STS_BLUE, tmpY, tmpX); // 仮にひっくり返す
            this.makeMasuSts(REVERSI_STS_BLACK);
            this.makeMasuSts(REVERSI_STS_WHITE);
            this.makeMasuSts(REVERSI_STS_BLUE);
            this.makeMasuSts(REVERSI_STS_RED);
            // *** このマスに置いた場合の解析を行う *** //
            if (this.getColorEna(REVERSI_STS_BLACK) != 0 && this.getColorEna(REVERSI_STS_WHITE) != 0 && this.getColorEna(REVERSI_STS_RED) != 0) {
                // *** 相手がパス *** //
                this.mMasuStsPassL[tmpY][tmpX] = 1;
            }
            if (this.getEdgeSideZero(tmpY, tmpX) == 0) {
                this.mMasuStsAnzL[tmpY][tmpX].ownEdgeCnt++;
                this.mMasuStsAnzL[tmpY][tmpX].goodPoint += 10000 * this.mMasuStsCntB[tmpY][tmpX];
            }
            else if (this.getEdgeSideOne(tmpY, tmpX) == 0) {
                this.mMasuStsAnzL[tmpY][tmpX].ownEdgeSideOneCnt++;
                if (this.checkEdge(REVERSI_STS_BLUE, tmpY, tmpX) != 0) {
                    this.mMasuStsAnzL[tmpY][tmpX].goodPoint += 10 * this.mMasuStsCntB[tmpY][tmpX];
                }
                else {
                    this.mMasuStsAnzL[tmpY][tmpX].badPoint += 100000;
                }
            }
            else if (this.getEdgeSideTwo(tmpY, tmpX) == 0) {
                this.mMasuStsAnzL[tmpY][tmpX].ownEdgeSideTwoCnt++;
                this.mMasuStsAnzL[tmpY][tmpX].goodPoint += 1000 * this.mMasuStsCntB[tmpY][tmpX];
            }
            else if (this.getEdgeSideThree(tmpY, tmpX) == 0) {
                this.mMasuStsAnzL[tmpY][tmpX].ownEdgeSideThreeCnt++;
                this.mMasuStsAnzL[tmpY][tmpX].goodPoint += 100 * this.mMasuStsCntB[tmpY][tmpX];
            }
            else {
                this.mMasuStsAnzL[tmpY][tmpX].ownEdgeSideOtherCnt++;
                this.mMasuStsAnzL[tmpY][tmpX].goodPoint += 10 * this.mMasuStsCntB[tmpY][tmpX];
            }
            sum = 0;
            sumOwn = 0;
            for (var i = 0; i < this.mMasuCnt; i++) {
                for (var j = 0; j < this.mMasuCnt; j++) {
                    tmpBadPoint = 0;
                    tmpGoodPoint = 0;
                    if (this.getMasuStsEna(REVERSI_STS_BLACK, i, j) != 0) {
                        sum += this.mMasuStsCntB[i][j]; // 相手の獲得予定枚数
                        // *** 相手の獲得予定の最大数保持 *** //
                        if (this.mMasuStsAnzL[tmpY][tmpX].max < this.mMasuStsCntB[i][j])
                            this.mMasuStsAnzL[tmpY][tmpX].max = this.mMasuStsCntB[i][j];
                        // *** 相手の獲得予定の最小数保持 *** //
                        if (this.mMasuStsCntB[i][j] < this.mMasuStsAnzL[tmpY][tmpX].min)
                            this.mMasuStsAnzL[tmpY][tmpX].min = this.mMasuStsCntB[i][j];
                        this.mMasuStsAnzL[tmpY][tmpX].pointCnt++; // 相手の置ける場所の数
                        if (this.getEdgeSideZero(i, j) == 0) {
                            this.mMasuStsAnzL[tmpY][tmpX].edgeCnt++;
                            tmpBadPoint = 100000 * this.mMasuStsCntB[i][j];
                        }
                        else if (this.getEdgeSideOne(i, j) == 0) {
                            this.mMasuStsAnzL[tmpY][tmpX].edgeSideOneCnt++;
                            tmpBadPoint = 0;
                        }
                        else if (this.getEdgeSideTwo(i, j) == 0) {
                            this.mMasuStsAnzL[tmpY][tmpX].edgeSideTwoCnt++;
                            tmpBadPoint = 1 * this.mMasuStsCntB[i][j];
                        }
                        else if (this.getEdgeSideThree(i, j) == 0) {
                            this.mMasuStsAnzL[tmpY][tmpX].edgeSideThreeCnt++;
                            tmpBadPoint = 1 * this.mMasuStsCntB[i][j];
                        }
                        else {
                            this.mMasuStsAnzL[tmpY][tmpX].edgeSideOtherCnt++;
                            tmpBadPoint = 1 * this.mMasuStsCntB[i][j];
                        }
                        if (tmpMasuEnaB[i][j] != 0)
                            tmpBadPoint = 0; // ステータス変化していないなら
                    }
                    if (this.getMasuStsEna(REVERSI_STS_WHITE, i, j) != 0) {
                        sum += this.mMasuStsCntW[i][j]; // 相手の獲得予定枚数
                        // *** 相手の獲得予定の最大数保持 *** //
                        if (this.mMasuStsAnzL[tmpY][tmpX].max < this.mMasuStsCntW[i][j])
                            this.mMasuStsAnzL[tmpY][tmpX].max = this.mMasuStsCntW[i][j];
                        // *** 相手の獲得予定の最小数保持 *** //
                        if (this.mMasuStsCntW[i][j] < this.mMasuStsAnzL[tmpY][tmpX].min)
                            this.mMasuStsAnzL[tmpY][tmpX].min = this.mMasuStsCntW[i][j];
                        this.mMasuStsAnzL[tmpY][tmpX].pointCnt++; // 相手の置ける場所の数
                        if (this.getEdgeSideZero(i, j) == 0) {
                            this.mMasuStsAnzL[tmpY][tmpX].edgeCnt++;
                            tmpBadPoint = 100000 * this.mMasuStsCntW[i][j];
                        }
                        else if (this.getEdgeSideOne(i, j) == 0) {
                            this.mMasuStsAnzL[tmpY][tmpX].edgeSideOneCnt++;
                            tmpBadPoint = 0;
                        }
                        else if (this.getEdgeSideTwo(i, j) == 0) {
                            this.mMasuStsAnzL[tmpY][tmpX].edgeSideTwoCnt++;
                            tmpBadPoint = 1 * this.mMasuStsCntW[i][j];
                        }
                        else if (this.getEdgeSideThree(i, j) == 0) {
                            this.mMasuStsAnzL[tmpY][tmpX].edgeSideThreeCnt++;
                            tmpBadPoint = 1 * this.mMasuStsCntW[i][j];
                        }
                        else {
                            this.mMasuStsAnzL[tmpY][tmpX].edgeSideOtherCnt++;
                            tmpBadPoint = 1 * this.mMasuStsCntW[i][j];
                        }
                        if (tmpMasuEnaW[i][j] != 0)
                            tmpBadPoint = 0; // ステータス変化していないなら
                    }
                    if (this.getMasuStsEna(REVERSI_STS_RED, i, j) != 0) {
                        sum += this.mMasuStsCntR[i][j]; // 相手の獲得予定枚数
                        // *** 相手の獲得予定の最大数保持 *** //
                        if (this.mMasuStsAnzL[tmpY][tmpX].max < this.mMasuStsCntR[i][j])
                            this.mMasuStsAnzL[tmpY][tmpX].max = this.mMasuStsCntR[i][j];
                        // *** 相手の獲得予定の最小数保持 *** //
                        if (this.mMasuStsCntR[i][j] < this.mMasuStsAnzL[tmpY][tmpX].min)
                            this.mMasuStsAnzL[tmpY][tmpX].min = this.mMasuStsCntR[i][j];
                        this.mMasuStsAnzL[tmpY][tmpX].pointCnt++; // 相手の置ける場所の数
                        if (this.getEdgeSideZero(i, j) == 0) {
                            this.mMasuStsAnzL[tmpY][tmpX].edgeCnt++;
                            tmpBadPoint = 100000 * this.mMasuStsCntR[i][j];
                        }
                        else if (this.getEdgeSideOne(i, j) == 0) {
                            this.mMasuStsAnzL[tmpY][tmpX].edgeSideOneCnt++;
                            tmpBadPoint = 0;
                        }
                        else if (this.getEdgeSideTwo(i, j) == 0) {
                            this.mMasuStsAnzL[tmpY][tmpX].edgeSideTwoCnt++;
                            tmpBadPoint = 1 * this.mMasuStsCntR[i][j];
                        }
                        else if (this.getEdgeSideThree(i, j) == 0) {
                            this.mMasuStsAnzL[tmpY][tmpX].edgeSideThreeCnt++;
                            tmpBadPoint = 1 * this.mMasuStsCntR[i][j];
                        }
                        else {
                            this.mMasuStsAnzL[tmpY][tmpX].edgeSideOtherCnt++;
                            tmpBadPoint = 1 * this.mMasuStsCntR[i][j];
                        }
                        if (tmpMasuEnaR[i][j] != 0)
                            tmpBadPoint = 0; // ステータス変化していないなら
                    }
                    if (this.getMasuStsEna(REVERSI_STS_BLUE, i, j) != 0) {
                        sumOwn += this.mMasuStsCntL[i][j]; // 自分の獲得予定枚数
                        // *** 自分の獲得予定の最大数保持 *** //
                        if (this.mMasuStsAnzL[tmpY][tmpX].ownMax < this.mMasuStsCntL[i][j])
                            this.mMasuStsAnzL[tmpY][tmpX].ownMax = this.mMasuStsCntL[i][j];
                        // *** 自分の獲得予定の最小数保持 *** //
                        if (this.mMasuStsCntL[i][j] < this.mMasuStsAnzL[tmpY][tmpX].ownMin)
                            this.mMasuStsAnzL[tmpY][tmpX].ownMin = this.mMasuStsCntL[i][j];
                        this.mMasuStsAnzL[tmpY][tmpX].ownPointCnt++; // 自分の置ける場所の数
                        if (this.getEdgeSideZero(i, j) == 0) {
                            this.mMasuStsAnzL[tmpY][tmpX].ownEdgeCnt++;
                            tmpGoodPoint = 100 * this.mMasuStsCntL[i][j];
                        }
                        else if (this.getEdgeSideOne(i, j) == 0) {
                            this.mMasuStsAnzL[tmpY][tmpX].ownEdgeSideOneCnt++;
                            tmpGoodPoint = 0;
                        }
                        else if (this.getEdgeSideTwo(i, j) == 0) {
                            this.mMasuStsAnzL[tmpY][tmpX].ownEdgeSideTwoCnt++;
                            tmpGoodPoint = 3 * this.mMasuStsCntL[i][j];
                        }
                        else if (this.getEdgeSideThree(i, j) == 0) {
                            this.mMasuStsAnzL[tmpY][tmpX].ownEdgeSideThreeCnt++;
                            tmpGoodPoint = 2 * this.mMasuStsCntL[i][j];
                        }
                        else {
                            this.mMasuStsAnzL[tmpY][tmpX].ownEdgeSideOtherCnt++;
                            tmpGoodPoint = 1 * this.mMasuStsCntL[i][j];
                        }
                        if (tmpMasuEnaL[i][j] != 0)
                            tmpGoodPoint = 0; // ステータス変化していないなら
                    }
                    if (tmpBadPoint != 0)
                        this.mMasuStsAnzL[tmpY][tmpX].badPoint += tmpBadPoint;
                    if (tmpGoodPoint != 0)
                        this.mMasuStsAnzL[tmpY][tmpX].goodPoint += tmpGoodPoint;
                }
            }
            // *** 相手に取られる平均コマ数 *** //
            if (this.getPointCnt(REVERSI_STS_BLACK) != 0 || this.getPointCnt(REVERSI_STS_WHITE) != 0 || this.getPointCnt(REVERSI_STS_RED) != 0) {
                tmpD1 = sum;
                tmpD2 = this.getPointCnt(REVERSI_STS_BLACK);
                tmpD2 += this.getPointCnt(REVERSI_STS_WHITE);
                tmpD2 += this.getPointCnt(REVERSI_STS_RED);
                this.mMasuStsAnzL[tmpY][tmpX].avg = tmpD1 / tmpD2;
            }
            // *** 自分が取れる平均コマ数 *** //
            if (this.getPointCnt(REVERSI_STS_BLUE) != 0) {
                tmpD1 = sumOwn;
                tmpD2 = this.getPointCnt(REVERSI_STS_BLUE);
                this.mMasuStsAnzL[tmpY][tmpX].ownAvg = tmpD1 / tmpD2;
            }
            // *** 元に戻す *** //
            this.mMasuSts = $.extend(true, [], tmpMasu);
            this.makeMasuSts(REVERSI_STS_BLACK);
            this.makeMasuSts(REVERSI_STS_WHITE);
            this.makeMasuSts(REVERSI_STS_BLUE);
            this.makeMasuSts(REVERSI_STS_RED);
        }
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			解析を行う(赤)
     *	@fn				private AnalysisReversiRed(): void
     *	@return			ありません
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    Reversi.prototype.AnalysisReversiRed = function () {
        var tmpX;
        var tmpY;
        var sum;
        var sumOwn;
        var tmpGoodPoint;
        var tmpBadPoint;
        var tmpD1;
        var tmpD2;
        for (var cnt = 0; cnt < this.mMasuPointCntR; cnt++) {
            // *** 現在ステータスを一旦コピー *** //
            var tmpMasu = $.extend(true, [], this.mMasuSts);
            var tmpMasuEnaB = $.extend(true, [], this.mMasuStsEnaB);
            var tmpMasuEnaW = $.extend(true, [], this.mMasuStsEnaW);
            var tmpMasuEnaL = $.extend(true, [], this.mMasuStsEnaL);
            var tmpMasuEnaR = $.extend(true, [], this.mMasuStsEnaR);
            tmpY = this.mMasuPointR[cnt].y;
            tmpX = this.mMasuPointR[cnt].x;
            this.mMasuSts[tmpY][tmpX] = REVERSI_STS_RED; // 仮に置く
            this.revMasuSts(REVERSI_STS_RED, tmpY, tmpX); // 仮にひっくり返す
            this.makeMasuSts(REVERSI_STS_BLACK);
            this.makeMasuSts(REVERSI_STS_WHITE);
            this.makeMasuSts(REVERSI_STS_BLUE);
            this.makeMasuSts(REVERSI_STS_RED);
            // *** このマスに置いた場合の解析を行う *** //
            if (this.getColorEna(REVERSI_STS_BLACK) != 0 && this.getColorEna(REVERSI_STS_WHITE) != 0 && this.getColorEna(REVERSI_STS_BLUE) != 0) {
                // *** 相手がパス *** //
                this.mMasuStsPassR[tmpY][tmpX] = 1;
            }
            if (this.getEdgeSideZero(tmpY, tmpX) == 0) {
                this.mMasuStsAnzR[tmpY][tmpX].ownEdgeCnt++;
                this.mMasuStsAnzR[tmpY][tmpX].goodPoint += 10000 * this.mMasuStsCntB[tmpY][tmpX];
            }
            else if (this.getEdgeSideOne(tmpY, tmpX) == 0) {
                this.mMasuStsAnzR[tmpY][tmpX].ownEdgeSideOneCnt++;
                if (this.checkEdge(REVERSI_STS_RED, tmpY, tmpX) != 0) {
                    this.mMasuStsAnzR[tmpY][tmpX].goodPoint += 10 * this.mMasuStsCntB[tmpY][tmpX];
                }
                else {
                    this.mMasuStsAnzR[tmpY][tmpX].badPoint += 100000;
                }
            }
            else if (this.getEdgeSideTwo(tmpY, tmpX) == 0) {
                this.mMasuStsAnzR[tmpY][tmpX].ownEdgeSideTwoCnt++;
                this.mMasuStsAnzR[tmpY][tmpX].goodPoint += 1000 * this.mMasuStsCntB[tmpY][tmpX];
            }
            else if (this.getEdgeSideThree(tmpY, tmpX) == 0) {
                this.mMasuStsAnzR[tmpY][tmpX].ownEdgeSideThreeCnt++;
                this.mMasuStsAnzR[tmpY][tmpX].goodPoint += 100 * this.mMasuStsCntB[tmpY][tmpX];
            }
            else {
                this.mMasuStsAnzR[tmpY][tmpX].ownEdgeSideOtherCnt++;
                this.mMasuStsAnzR[tmpY][tmpX].goodPoint += 10 * this.mMasuStsCntB[tmpY][tmpX];
            }
            sum = 0;
            sumOwn = 0;
            for (var i = 0; i < this.mMasuCnt; i++) {
                for (var j = 0; j < this.mMasuCnt; j++) {
                    tmpBadPoint = 0;
                    tmpGoodPoint = 0;
                    if (this.getMasuStsEna(REVERSI_STS_BLACK, i, j) != 0) {
                        sum += this.mMasuStsCntB[i][j]; // 相手の獲得予定枚数
                        // *** 相手の獲得予定の最大数保持 *** //
                        if (this.mMasuStsAnzR[tmpY][tmpX].max < this.mMasuStsCntB[i][j])
                            this.mMasuStsAnzR[tmpY][tmpX].max = this.mMasuStsCntB[i][j];
                        // *** 相手の獲得予定の最小数保持 *** //
                        if (this.mMasuStsCntB[i][j] < this.mMasuStsAnzR[tmpY][tmpX].min)
                            this.mMasuStsAnzR[tmpY][tmpX].min = this.mMasuStsCntB[i][j];
                        this.mMasuStsAnzR[tmpY][tmpX].pointCnt++; // 相手の置ける場所の数
                        if (this.getEdgeSideZero(i, j) == 0) {
                            this.mMasuStsAnzR[tmpY][tmpX].edgeCnt++;
                            tmpBadPoint = 100000 * this.mMasuStsCntB[i][j];
                        }
                        else if (this.getEdgeSideOne(i, j) == 0) {
                            this.mMasuStsAnzR[tmpY][tmpX].edgeSideOneCnt++;
                            tmpBadPoint = 0;
                        }
                        else if (this.getEdgeSideTwo(i, j) == 0) {
                            this.mMasuStsAnzR[tmpY][tmpX].edgeSideTwoCnt++;
                            tmpBadPoint = 1 * this.mMasuStsCntB[i][j];
                        }
                        else if (this.getEdgeSideThree(i, j) == 0) {
                            this.mMasuStsAnzR[tmpY][tmpX].edgeSideThreeCnt++;
                            tmpBadPoint = 1 * this.mMasuStsCntB[i][j];
                        }
                        else {
                            this.mMasuStsAnzR[tmpY][tmpX].edgeSideOtherCnt++;
                            tmpBadPoint = 1 * this.mMasuStsCntB[i][j];
                        }
                        if (tmpMasuEnaR[i][j] != 0)
                            tmpBadPoint = 0; // ステータス変化していないなら
                    }
                    if (this.getMasuStsEna(REVERSI_STS_WHITE, i, j) != 0) {
                        sum += this.mMasuStsCntW[i][j]; // 相手の獲得予定枚数
                        // *** 相手の獲得予定の最大数保持 *** //
                        if (this.mMasuStsAnzR[tmpY][tmpX].max < this.mMasuStsCntW[i][j])
                            this.mMasuStsAnzR[tmpY][tmpX].max = this.mMasuStsCntW[i][j];
                        // *** 相手の獲得予定の最小数保持 *** //
                        if (this.mMasuStsCntW[i][j] < this.mMasuStsAnzR[tmpY][tmpX].min)
                            this.mMasuStsAnzR[tmpY][tmpX].min = this.mMasuStsCntW[i][j];
                        this.mMasuStsAnzR[tmpY][tmpX].pointCnt++; // 相手の置ける場所の数
                        if (this.getEdgeSideZero(i, j) == 0) {
                            this.mMasuStsAnzR[tmpY][tmpX].edgeCnt++;
                            tmpBadPoint = 100000 * this.mMasuStsCntW[i][j];
                        }
                        else if (this.getEdgeSideOne(i, j) == 0) {
                            this.mMasuStsAnzR[tmpY][tmpX].edgeSideOneCnt++;
                            tmpBadPoint = 0;
                        }
                        else if (this.getEdgeSideTwo(i, j) == 0) {
                            this.mMasuStsAnzR[tmpY][tmpX].edgeSideTwoCnt++;
                            tmpBadPoint = 1 * this.mMasuStsCntW[i][j];
                        }
                        else if (this.getEdgeSideThree(i, j) == 0) {
                            this.mMasuStsAnzR[tmpY][tmpX].edgeSideThreeCnt++;
                            tmpBadPoint = 1 * this.mMasuStsCntW[i][j];
                        }
                        else {
                            this.mMasuStsAnzR[tmpY][tmpX].edgeSideOtherCnt++;
                            tmpBadPoint = 1 * this.mMasuStsCntW[i][j];
                        }
                        if (tmpMasuEnaW[i][j] != 0)
                            tmpBadPoint = 0; // ステータス変化していないなら
                    }
                    if (this.getMasuStsEna(REVERSI_STS_BLUE, i, j) != 0) {
                        sum += this.mMasuStsCntL[i][j]; // 相手の獲得予定枚数
                        // *** 相手の獲得予定の最大数保持 *** //
                        if (this.mMasuStsAnzR[tmpY][tmpX].max < this.mMasuStsCntL[i][j])
                            this.mMasuStsAnzR[tmpY][tmpX].max = this.mMasuStsCntL[i][j];
                        // *** 相手の獲得予定の最小数保持 *** //
                        if (this.mMasuStsCntL[i][j] < this.mMasuStsAnzR[tmpY][tmpX].min)
                            this.mMasuStsAnzR[tmpY][tmpX].min = this.mMasuStsCntL[i][j];
                        this.mMasuStsAnzR[tmpY][tmpX].pointCnt++; // 相手の置ける場所の数
                        if (this.getEdgeSideZero(i, j) == 0) {
                            this.mMasuStsAnzR[tmpY][tmpX].edgeCnt++;
                            tmpBadPoint = 100000 * this.mMasuStsCntL[i][j];
                        }
                        else if (this.getEdgeSideOne(i, j) == 0) {
                            this.mMasuStsAnzR[tmpY][tmpX].edgeSideOneCnt++;
                            tmpBadPoint = 0;
                        }
                        else if (this.getEdgeSideTwo(i, j) == 0) {
                            this.mMasuStsAnzR[tmpY][tmpX].edgeSideTwoCnt++;
                            tmpBadPoint = 1 * this.mMasuStsCntL[i][j];
                        }
                        else if (this.getEdgeSideThree(i, j) == 0) {
                            this.mMasuStsAnzR[tmpY][tmpX].edgeSideThreeCnt++;
                            tmpBadPoint = 1 * this.mMasuStsCntL[i][j];
                        }
                        else {
                            this.mMasuStsAnzR[tmpY][tmpX].edgeSideOtherCnt++;
                            tmpBadPoint = 1 * this.mMasuStsCntL[i][j];
                        }
                        if (tmpMasuEnaL[i][j] != 0)
                            tmpBadPoint = 0; // ステータス変化していないなら
                    }
                    if (this.getMasuStsEna(REVERSI_STS_RED, i, j) != 0) {
                        sumOwn += this.mMasuStsCntR[i][j]; // 自分の獲得予定枚数
                        // *** 自分の獲得予定の最大数保持 *** //
                        if (this.mMasuStsAnzR[tmpY][tmpX].ownMax < this.mMasuStsCntR[i][j])
                            this.mMasuStsAnzR[tmpY][tmpX].ownMax = this.mMasuStsCntR[i][j];
                        // *** 自分の獲得予定の最小数保持 *** //
                        if (this.mMasuStsCntR[i][j] < this.mMasuStsAnzR[tmpY][tmpX].ownMin)
                            this.mMasuStsAnzR[tmpY][tmpX].ownMin = this.mMasuStsCntR[i][j];
                        this.mMasuStsAnzR[tmpY][tmpX].ownPointCnt++; // 自分の置ける場所の数
                        if (this.getEdgeSideZero(i, j) == 0) {
                            this.mMasuStsAnzR[tmpY][tmpX].ownEdgeCnt++;
                            tmpGoodPoint = 100 * this.mMasuStsCntR[i][j];
                        }
                        else if (this.getEdgeSideOne(i, j) == 0) {
                            this.mMasuStsAnzR[tmpY][tmpX].ownEdgeSideOneCnt++;
                            tmpGoodPoint = 0;
                        }
                        else if (this.getEdgeSideTwo(i, j) == 0) {
                            this.mMasuStsAnzR[tmpY][tmpX].ownEdgeSideTwoCnt++;
                            tmpGoodPoint = 3 * this.mMasuStsCntR[i][j];
                        }
                        else if (this.getEdgeSideThree(i, j) == 0) {
                            this.mMasuStsAnzR[tmpY][tmpX].ownEdgeSideThreeCnt++;
                            tmpGoodPoint = 2 * this.mMasuStsCntR[i][j];
                        }
                        else {
                            this.mMasuStsAnzR[tmpY][tmpX].ownEdgeSideOtherCnt++;
                            tmpGoodPoint = 1 * this.mMasuStsCntR[i][j];
                        }
                        if (tmpMasuEnaR[i][j] != 0)
                            tmpGoodPoint = 0; // ステータス変化していないなら
                    }
                    if (tmpBadPoint != 0)
                        this.mMasuStsAnzR[tmpY][tmpX].badPoint += tmpBadPoint;
                    if (tmpGoodPoint != 0)
                        this.mMasuStsAnzR[tmpY][tmpX].goodPoint += tmpGoodPoint;
                }
            }
            // *** 相手に取られる平均コマ数 *** //
            if (this.getPointCnt(REVERSI_STS_BLACK) != 0 || this.getPointCnt(REVERSI_STS_WHITE) != 0 || this.getPointCnt(REVERSI_STS_BLUE) != 0) {
                tmpD1 = sum;
                tmpD2 = this.getPointCnt(REVERSI_STS_BLACK);
                tmpD2 += this.getPointCnt(REVERSI_STS_WHITE);
                tmpD2 += this.getPointCnt(REVERSI_STS_BLUE);
                this.mMasuStsAnzR[tmpY][tmpX].avg = tmpD1 / tmpD2;
            }
            // *** 自分が取れる平均コマ数 *** //
            if (this.getPointCnt(REVERSI_STS_RED) != 0) {
                tmpD1 = sumOwn;
                tmpD2 = this.getPointCnt(REVERSI_STS_RED);
                this.mMasuStsAnzR[tmpY][tmpX].ownAvg = tmpD1 / tmpD2;
            }
            // *** 元に戻す *** //
            this.mMasuSts = $.extend(true, [], tmpMasu);
            this.makeMasuSts(REVERSI_STS_BLACK);
            this.makeMasuSts(REVERSI_STS_WHITE);
            this.makeMasuSts(REVERSI_STS_BLUE);
            this.makeMasuSts(REVERSI_STS_RED);
        }
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			解析を行う
     *	@fn				public AnalysisReversi(bPassEna: number, wPassEna: number, lPassEna: number, rPassEna: number) : void
     *	@param[in]		bPassEna : number		1=黒パス有効
     *	@param[in]		wPassEna : number		1=白パス有効
     *	@param[in]		bPassEna : number		1=青パス有効
     *	@param[in]		wPassEna : number		1=赤パス有効
     *	@return			ありません
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    Reversi.prototype.AnalysisReversi = function (bPassEna, wPassEna, lPassEna, rPassEna) {
        var tmpX;
        var tmpY;
        var sum;
        var sumOwn;
        var tmpGoodPoint;
        var tmpBadPoint;
        var tmpD1;
        var tmpD2;
        // *** 相手をパスさせることができるマス検索 *** //
        for (var i = 0; i < this.mMasuCnt; i++) {
            for (var j = 0; j < this.mMasuCnt; j++) {
                this.mMasuStsPassB[i][j] = 0;
                this.mMasuStsAnzB[i][j].reset();
                this.mMasuStsPassW[i][j] = 0;
                this.mMasuStsAnzW[i][j].reset();
                this.mMasuStsPassL[i][j] = 0;
                this.mMasuStsAnzL[i][j].reset();
                this.mMasuStsPassR[i][j] = 0;
                this.mMasuStsAnzR[i][j].reset();
            }
        }
        this.AnalysisReversiBlack(); // 黒解析
        this.AnalysisReversiWhite(); // 白解析
        this.AnalysisReversiBlue(); // 青解析
        this.AnalysisReversiRed(); // 赤解析
        this.makeMasuSts(REVERSI_STS_BLACK);
        this.makeMasuSts(REVERSI_STS_WHITE);
        this.makeMasuSts(REVERSI_STS_BLUE);
        this.makeMasuSts(REVERSI_STS_RED);
        // *** パスマスを取得 *** //
        for (var i = 0; i < this.mMasuCnt; i++) {
            for (var j = 0; j < this.mMasuCnt; j++) {
                if (this.mMasuStsPassB[i][j] != 0) {
                    if (bPassEna != 0)
                        this.mMasuStsEnaB[i][j] = 3;
                }
                if (this.mMasuStsPassW[i][j] != 0) {
                    if (wPassEna != 0)
                        this.mMasuStsEnaW[i][j] = 3;
                }
                if (this.mMasuStsPassL[i][j] != 0) {
                    if (lPassEna != 0)
                        this.mMasuStsEnaL[i][j] = 3;
                }
                if (this.mMasuStsPassR[i][j] != 0) {
                    if (rPassEna != 0)
                        this.mMasuStsEnaR[i][j] = 3;
                }
            }
        }
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			マスステータスを取得
     *	@fn				public getMasuSts(y : number,x : number) : number
     *	@param[in]		y : number			取得するマスのY座標
     *	@param[in]		x : number			取得するマスのX座標
     *	@return			-1 : 失敗 それ以外 : マスステータス
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    Reversi.prototype.getMasuSts = function (y, x) {
        var ret = -1;
        if (this.checkPara(y, 0, this.mMasuCnt) == 0 && this.checkPara(x, 0, this.mMasuCnt) == 0)
            ret = this.mMasuSts[y][x];
        return ret;
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			以前のマスステータスを取得
     *	@fn				public getMasuStsOld(y : number,x : number) : number
     *	@param[in]		y : number			取得するマスのY座標
     *	@param[in]		x : number			取得するマスのX座標
     *	@return			-1 : 失敗 それ以外 : マスステータス
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    Reversi.prototype.getMasuStsOld = function (y, x) {
        var ret = -1;
        if (this.checkPara(y, 0, this.mMasuCnt) == 0 && this.checkPara(x, 0, this.mMasuCnt) == 0)
            ret = this.mMasuStsOld[y][x];
        return ret;
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			指定座標に指定色を置けるかチェック
     *	@fn				public getMasuStsEna(color : number,y : number,x : number) : number
     *	@param[in]		color : number		コマ色
     *	@param[in]		y : number			マスのY座標
     *	@param[in]		x : number			マスのX座標
     *	@return			1 : 成功 それ以外 : 失敗
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    Reversi.prototype.getMasuStsEna = function (color, y, x) {
        var ret = 0;
        if (this.checkPara(y, 0, this.mMasuCnt) == 0 && this.checkPara(x, 0, this.mMasuCnt) == 0) {
            if (color == REVERSI_STS_BLACK)
                ret = this.mMasuStsEnaB[y][x];
            else if (color == REVERSI_STS_WHITE)
                ret = this.mMasuStsEnaW[y][x];
            else if (color == REVERSI_STS_BLUE)
                ret = this.mMasuStsEnaL[y][x];
            else
                ret = this.mMasuStsEnaR[y][x];
        }
        return ret;
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			指定座標の獲得コマ数取得
     *	@fn				public getMasuStsCnt(color : number,y : number,x : number) : number
     *	@param[in]		color : number		コマ色
     *	@param[in]		y : number			マスのY座標
     *	@param[in]		x : number			マスのX座標
     *	@return			-1 : 失敗 それ以外 : 獲得コマ数
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    Reversi.prototype.getMasuStsCnt = function (color, y, x) {
        var ret = -1;
        if (this.checkPara(y, 0, this.mMasuCnt) == 0 && this.checkPara(x, 0, this.mMasuCnt) == 0) {
            if (color == REVERSI_STS_BLACK)
                ret = this.mMasuStsCntB[y][x];
            else if (color == REVERSI_STS_WHITE)
                ret = this.mMasuStsCntW[y][x];
            else if (color == REVERSI_STS_BLUE)
                ret = this.mMasuStsCntL[y][x];
            else
                ret = this.mMasuStsCntR[y][x];
        }
        return ret;
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			指定色が現在置ける場所があるかチェック
     *	@fn				public getColorEna(color : number) : number
     *	@param[in]		color : number		コマ色
     *	@return			0 : 成功 それ以外 : 失敗
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    Reversi.prototype.getColorEna = function (color) {
        var ret = -1;
        for (var i = 0; i < this.mMasuCnt; i++) {
            for (var j = 0; j < this.mMasuCnt; j++) {
                if (this.getMasuStsEna(color, i, j) != 0) {
                    ret = 0;
                    break;
                }
            }
        }
        return ret;
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			ゲーム終了かチェック
     *	@fn				public getGameEndSts() : number
     *	@return			0 : 続行 それ以外 : ゲーム終了
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    Reversi.prototype.getGameEndSts = function () {
        var ret = 1;
        if (this.getColorEna(REVERSI_STS_BLACK) == 0)
            ret = 0;
        if (this.getColorEna(REVERSI_STS_WHITE) == 0)
            ret = 0;
        if (this.getColorEna(REVERSI_STS_BLUE) == 0)
            ret = 0;
        if (this.getColorEna(REVERSI_STS_RED) == 0)
            ret = 0;
        return ret;
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			指定座標にコマを置く
     *	@fn				public setMasuSts(color : number,y : number,x : number) : number
     *	@param[in]		color : number		コマ色
     *	@param[in]		y : number			マスのY座標
     *	@param[in]		x : number			マスのX座標
     *	@return			0 : 成功 それ以外 : 失敗
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    Reversi.prototype.setMasuSts = function (color, y, x) {
        var ret = -1;
        if (this.getMasuStsEna(color, y, x) != 0) {
            ret = 0;
            this.mMasuStsOld = $.extend(true, [], this.mMasuSts);
            this.mMasuSts[y][x] = color;
            this.revMasuSts(color, y, x);
            this.makeMasuSts(REVERSI_STS_BLACK);
            this.makeMasuSts(REVERSI_STS_WHITE);
            this.makeMasuSts(REVERSI_STS_BLUE);
            this.makeMasuSts(REVERSI_STS_RED);
            // *** 履歴保存 *** //
            if (this.mMasuHistCur < (this.mMasuCntMax * this.mMasuCntMax)) {
                this.mMasuHist[this.mMasuHistCur].color = color;
                this.mMasuHist[this.mMasuHistCur].point.y = y;
                this.mMasuHist[this.mMasuHistCur].point.x = x;
                this.mMasuHistCur++;
            }
        }
        return ret;
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			指定座標にコマを強制的に置く
     *	@fn				public setMasuStsForcibly(color : number,y : number,x : number) : number
     *	@param[in]		color : number		コマ色
     *	@param[in]		y : number			マスのY座標
     *	@param[in]		x : number			マスのX座標
     *	@return			0 : 成功 それ以外 : 失敗
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    Reversi.prototype.setMasuStsForcibly = function (color, y, x) {
        var ret = -1;
        ret = 0;
        this.mMasuStsOld = $.extend(true, [], this.mMasuSts);
        this.mMasuSts[y][x] = color;
        return ret;
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			マスの数変更
     *	@fn				public setMasuCnt(cnt : number) : number
     *	@param[in]		cnt : number		マスの数
     *	@return			0 : 成功 それ以外 : 失敗
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    Reversi.prototype.setMasuCnt = function (cnt) {
        var ret = -1;
        var chg = 0;
        if (this.checkPara(cnt, 0, this.mMasuCntMax) == 0) {
            if (this.mMasuCnt != cnt)
                chg = 1;
            this.mMasuCnt = cnt;
            ret = 0;
            if (chg == 1)
                this.reset();
        }
        return ret;
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			ポイント座標取得
     *	@fn				public getPoint(color : number,num : number) : ReversiPoint
     *	@param[in]		color : number		コマ色
     *	@param[in]		num : number		ポイント
     *	@return			ポイント座標 null : 失敗
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    Reversi.prototype.getPoint = function (color, num) {
        var ret = null;
        if (this.checkPara(num, 0, (this.mMasuCnt * this.mMasuCnt)) == 0) {
            if (color == REVERSI_STS_BLACK)
                ret = this.mMasuPointB[num];
            else if (color == REVERSI_STS_WHITE)
                ret = this.mMasuPointW[num];
            else if (color == REVERSI_STS_BLUE)
                ret = this.mMasuPointL[num];
            else
                ret = this.mMasuPointR[num];
        }
        return ret;
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			ポイント座標数取得
     *	@fn				public getPointCnt(color : number) : number
     *	@param[in]		color : number		コマ色
     *	@return			ポイント座標数取得
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    Reversi.prototype.getPointCnt = function (color) {
        var ret = 0;
        if (color == REVERSI_STS_BLACK)
            ret = this.mMasuPointCntB;
        else if (color == REVERSI_STS_WHITE)
            ret = this.mMasuPointCntW;
        else if (color == REVERSI_STS_BLUE)
            ret = this.mMasuPointCntL;
        else
            ret = this.mMasuPointCntR;
        return ret;
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			コマ数取得
     *	@fn				public getBetCnt(color : number) : number
     *	@param[in]		color : number		コマ色
     *	@return			コマ数取得
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    Reversi.prototype.getBetCnt = function (color) {
        var ret = 0;
        if (color == REVERSI_STS_BLACK)
            ret = this.mMasuBetCntB;
        else if (color == REVERSI_STS_WHITE)
            ret = this.mMasuBetCntW;
        else if (color == REVERSI_STS_BLUE)
            ret = this.mMasuBetCntL;
        else
            ret = this.mMasuBetCntR;
        return ret;
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			パス判定
     *	@fn				public getPassEna(color : number,y : number,x : number) : number
     *	@param[in]		color : number		コマ色
     *	@param[in]		y : number			マスのY座標
     *	@param[in]		x : number			マスのX座標
     *	@return			パス判定
     *					- 0 : NOT PASS
     *					- 1 : PASS
     *
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    Reversi.prototype.getPassEna = function (color, y, x) {
        var ret = 0;
        if (this.checkPara(y, 0, this.mMasuCnt) == 0 && this.checkPara(x, 0, this.mMasuCnt) == 0) {
            if (color == REVERSI_STS_BLACK)
                ret = this.mMasuStsPassB[y][x];
            else if (color == REVERSI_STS_WHITE)
                ret = this.mMasuStsPassW[y][x];
            else if (color == REVERSI_STS_BLUE)
                ret = this.mMasuStsPassL[y][x];
            else
                ret = this.mMasuStsPassR[y][x];
        }
        return ret;
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			履歴取得
     *	@fn				public getHistory(num : number) : ReversiHistory
     *	@param[in]		num : number	ポイント
     *	@return			履歴 null : 失敗
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    Reversi.prototype.getHistory = function (num) {
        var ret = null;
        if (this.checkPara(num, 0, (this.mMasuCnt * this.mMasuCnt)) == 0) {
            ret = this.mMasuHist[num];
        }
        return ret;
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			履歴数取得
     *	@fn				public getHistoryCnt() : number
     *	@return			履歴数
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    Reversi.prototype.getHistoryCnt = function () {
        var ret = 0;
        ret = this.mMasuHistCur;
        return ret;
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			ポイント座標解析取得
     *	@fn				public getPointAnz(color : number,y : number,x : number) : ReversiAnz
     *	@param[in]		color : number		コマ色
     *	@param[in]		y : number			マスのY座標
     *	@param[in]		x : number			マスのX座標
     *	@return			ポイント座標解析 null : 失敗
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    Reversi.prototype.getPointAnz = function (color, y, x) {
        var ret = null;
        if (this.checkPara(y, 0, this.mMasuCnt) == 0 && this.checkPara(x, 0, this.mMasuCnt) == 0) {
            if (color == REVERSI_STS_BLACK)
                ret = this.mMasuStsAnzB[y][x];
            else if (color == REVERSI_STS_WHITE)
                ret = this.mMasuStsAnzW[y][x];
            else if (color == REVERSI_STS_BLUE)
                ret = this.mMasuStsAnzL[y][x];
            else
                ret = this.mMasuStsAnzR[y][x];
        }
        return ret;
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			角の隣に置いても角を取られないマス検索
     *	@fn				public checkEdge(color : number,y : number,x : number) : number
     *	@param[in]		color : number		色
     *	@param[in]		y : number			Y座標
     *	@param[in]		x : number			X座標
     *	@return			0 : 取られる それ以外 : 取られない
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    Reversi.prototype.checkEdge = function (color, y, x) {
        var style = 0;
        var flg1 = 0;
        var flg2 = 0;
        var loop;
        var loop2;
        if (y == 0 && x == 1) {
            for (loop = x, flg1 = 0, flg2 = 0; loop < this.mMasuCnt; loop++) {
                if (this.getMasuSts(y, loop) == color)
                    flg1 = 1;
                if (flg1 == 1 && this.getMasuSts(y, loop) == REVERSI_STS_NONE)
                    break;
                if ((flg1 == 1) && (this.getMasuSts(y, loop) != color) && (this.getMasuSts(y, loop) != REVERSI_STS_NONE))
                    flg2 = 1;
            }
            if ((flg1 == 1) && (flg2 == 0))
                style = 1;
        }
        if (y == 1 && x == 0) {
            for (loop = y, flg1 = 0, flg2 = 0; loop < this.mMasuCnt; loop++) {
                if (this.getMasuSts(loop, x) == color)
                    flg1 = 1;
                if (flg1 == 1 && this.getMasuSts(loop, x) == REVERSI_STS_NONE)
                    break;
                if ((flg1 == 1) && (this.getMasuSts(loop, x) != color) && (this.getMasuSts(loop, x) != REVERSI_STS_NONE))
                    flg2 = 1;
            }
            if ((flg1 == 1) && (flg2 == 0))
                style = 1;
        }
        if (y == 1 && x == 1) {
            for (loop = y, flg1 = 0, flg2 = 0; loop < this.mMasuCnt; loop++) {
                if (this.getMasuSts(loop, loop) == color)
                    flg1 = 1;
                if (flg1 == 1 && this.getMasuSts(loop, loop) == REVERSI_STS_NONE)
                    break;
                if ((flg1 == 1) && (this.getMasuSts(loop, loop) != color) && (this.getMasuSts(loop, loop) != REVERSI_STS_NONE))
                    flg2 = 1;
            }
            if ((flg1 == 1) && (flg2 == 0))
                style = 1;
        }
        if (y == 0 && x == (this.mMasuCnt - 2)) {
            for (loop = x, flg1 = 0, flg2 = 0; loop > 0; loop--) {
                if (this.getMasuSts(y, loop) == color)
                    flg1 = 1;
                if (flg1 == 1 && this.getMasuSts(y, loop) == REVERSI_STS_NONE)
                    break;
                if ((flg1 == 1) && (this.getMasuSts(y, loop) != color) && (this.getMasuSts(y, loop) != REVERSI_STS_NONE))
                    flg2 = 1;
            }
            if ((flg1 == 1) && (flg2 == 0))
                style = 1;
        }
        if (y == 1 && x == (this.mMasuCnt - 1)) {
            for (loop = y, flg1 = 0, flg2 = 0; loop < this.mMasuCnt; loop++) {
                if (this.getMasuSts(loop, x) == color)
                    flg1 = 1;
                if (flg1 == 1 && this.getMasuSts(loop, x) == REVERSI_STS_NONE)
                    break;
                if ((flg1 == 1) && (this.getMasuSts(loop, x) != color) && (this.getMasuSts(loop, x) != REVERSI_STS_NONE))
                    flg2 = 1;
            }
            if ((flg1 == 1) && (flg2 == 0))
                style = 1;
        }
        if (y == 1 && x == (this.mMasuCnt - 2)) {
            for (loop = y, loop2 = x, flg1 = 0, flg2 = 0; loop < this.mMasuCnt; loop++, loop2--) {
                if (this.getMasuSts(loop, loop2) == color)
                    flg1 = 1;
                if (flg1 == 1 && this.getMasuSts(loop, loop2) == REVERSI_STS_NONE)
                    break;
                if ((flg1 == 1) && (this.getMasuSts(loop, loop2) != color) && (this.getMasuSts(loop, loop2) != REVERSI_STS_NONE))
                    flg2 = 1;
            }
            if ((flg1 == 1) && (flg2 == 0))
                style = 1;
        }
        if (y == (this.mMasuCnt - 2) && x == 0) {
            for (loop = y, flg1 = 0, flg2 = 0; loop > 0; loop--) {
                if (this.getMasuSts(loop, x) == color)
                    flg1 = 1;
                if (flg1 == 1 && this.getMasuSts(loop, x) == REVERSI_STS_NONE)
                    break;
                if ((flg1 == 1) && (this.getMasuSts(loop, x) != color) && (this.getMasuSts(loop, x) != REVERSI_STS_NONE))
                    flg2 = 1;
            }
            if ((flg1 == 1) && (flg2 == 0))
                style = 1;
        }
        if (y == (this.mMasuCnt - 1) && x == 1) {
            for (loop = x, flg1 = 0, flg2 = 0; loop < this.mMasuCnt; loop++) {
                if (this.getMasuSts(y, loop) == color)
                    flg1 = 1;
                if (flg1 == 1 && this.getMasuSts(y, loop) == REVERSI_STS_NONE)
                    break;
                if ((flg1 == 1) && (this.getMasuSts(y, loop) != color) && (this.getMasuSts(y, loop) != REVERSI_STS_NONE))
                    flg2 = 1;
            }
            if ((flg1 == 1) && (flg2 == 0))
                style = 1;
        }
        if (y == (this.mMasuCnt - 2) && x == 1) {
            for (loop = y, loop2 = x, flg1 = 0, flg2 = 0; loop > 0; loop--, loop2++) {
                if (this.getMasuSts(loop, loop2) == color)
                    flg1 = 1;
                if (flg1 == 1 && this.getMasuSts(loop, loop2) == REVERSI_STS_NONE)
                    break;
                if ((flg1 == 1) && (this.getMasuSts(loop, loop2) != color) && (this.getMasuSts(loop, loop2) != REVERSI_STS_NONE))
                    flg2 = 1;
            }
            if ((flg1 == 1) && (flg2 == 0))
                style = 1;
        }
        if (y == (this.mMasuCnt - 2) && x == (this.mMasuCnt - 1)) {
            for (loop = y, flg1 = 0, flg2 = 0; loop > 0; loop--) {
                if (this.getMasuSts(loop, x) == color)
                    flg1 = 1;
                if (flg1 == 1 && this.getMasuSts(loop, x) == REVERSI_STS_NONE)
                    break;
                if ((flg1 == 1) && (this.getMasuSts(loop, x) != color) && (this.getMasuSts(loop, x) != REVERSI_STS_NONE))
                    flg2 = 1;
            }
            if ((flg1 == 1) && (flg2 == 0))
                style = 1;
        }
        if (y == (this.mMasuCnt - 1) && x == (this.mMasuCnt - 2)) {
            for (loop = x, flg1 = 0, flg2 = 0; loop > 0; loop--) {
                if (this.getMasuSts(y, loop) == color)
                    flg1 = 1;
                if (flg1 == 1 && this.getMasuSts(y, loop) == REVERSI_STS_NONE)
                    break;
                if ((flg1 == 1) && (this.getMasuSts(y, loop) != color) && (this.getMasuSts(y, loop) != REVERSI_STS_NONE))
                    flg2 = 1;
            }
            if ((flg1 == 1) && (flg2 == 0))
                style = 1;
        }
        if (y == (this.mMasuCnt - 2) && x == (this.mMasuCnt - 2)) {
            for (loop = y, loop2 = x, flg1 = 0, flg2 = 0; loop > 0; loop--, loop2--) {
                if (this.getMasuSts(loop, loop2) == color)
                    flg1 = 1;
                if (flg1 == 1 && this.getMasuSts(loop, loop2) == REVERSI_STS_NONE)
                    break;
                if ((flg1 == 1) && (this.getMasuSts(loop, loop2) != color) && (this.getMasuSts(loop, loop2) != REVERSI_STS_NONE))
                    flg2 = 1;
            }
            if ((flg1 == 1) && (flg2 == 0))
                style = 1;
        }
        return style;
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			指定座標が角か取得
     *	@fn				public getEdgeSideZero(y : number,x : number) : number
     *	@param[in]		y : number			Y座標
     *	@param[in]		x : number			X座標
     *	@return			0 : 成功 それ以外 : 失敗
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    Reversi.prototype.getEdgeSideZero = function (y, x) {
        var ret = -1;
        if ((y == 0 && x == 0)
            || (y == 0 && x == (this.mMasuCnt - 1))
            || (y == (this.mMasuCnt - 1) && x == 0)
            || (y == (this.mMasuCnt - 1) && x == (this.mMasuCnt - 1))) {
            ret = 0;
        }
        return ret;
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			指定座標が角の一つ手前か取得
     *	@fn				public getEdgeSideOne(y : number,x : number) : number
     *	@param[in]		y : number			Y座標
     *	@param[in]		x : number			X座標
     *	@return			0 : 成功 それ以外 : 失敗
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    Reversi.prototype.getEdgeSideOne = function (y, x) {
        var ret = -1;
        if ((y == 0 && x == 1)
            || (y == 0 && x == (this.mMasuCnt - 2))
            || (y == 1 && x == 0)
            || (y == 1 && x == 1)
            || (y == 1 && x == (this.mMasuCnt - 2))
            || (y == 1 && x == (this.mMasuCnt - 1))
            || (y == (this.mMasuCnt - 2) && x == 0)
            || (y == (this.mMasuCnt - 2) && x == 1)
            || (y == (this.mMasuCnt - 2) && x == (this.mMasuCnt - 2))
            || (y == (this.mMasuCnt - 2) && x == (this.mMasuCnt - 1))
            || (y == (this.mMasuCnt - 1) && x == 1)
            || (y == (this.mMasuCnt - 1) && x == (this.mMasuCnt - 2))) {
            ret = 0;
        }
        return ret;
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			指定座標が角の二つ手前か取得
     *	@fn				public getEdgeSideTwo(y : number,x : number) : number
     *	@param[in]		y : number			Y座標
     *	@param[in]		x : number			X座標
     *	@return			0 : 成功 それ以外 : 失敗
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    Reversi.prototype.getEdgeSideTwo = function (y, x) {
        var ret = -1;
        if ((y == 0 && x == 2)
            || (y == 0 && x == (this.mMasuCnt - 3))
            || (y == 2 && x == 0)
            || (y == 2 && x == 2)
            || (y == 2 && x == (this.mMasuCnt - 3))
            || (y == 2 && x == (this.mMasuCnt - 1))
            || (y == (this.mMasuCnt - 3) && x == 0)
            || (y == (this.mMasuCnt - 3) && x == 2)
            || (y == (this.mMasuCnt - 3) && x == (this.mMasuCnt - 3))
            || (y == (this.mMasuCnt - 3) && x == (this.mMasuCnt - 1))
            || (y == (this.mMasuCnt - 1) && x == 2)
            || (y == (this.mMasuCnt - 1) && x == (this.mMasuCnt - 3))) {
            ret = 0;
        }
        return ret;
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			指定座標が角の三つ以上手前か取得
     *	@fn				public getEdgeSideThree(y : number,x : number) : number
     *	@param[in]		y : number			Y座標
     *	@param[in]		x : number			X座標
     *	@return			0 : 成功 それ以外 : 失敗
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    Reversi.prototype.getEdgeSideThree = function (y, x) {
        var ret = -1;
        if ((y == 0 && (3 <= x && x <= (this.mMasuCnt - 4)))
            || ((3 <= y && y <= (this.mMasuCnt - 4)) && x == 0)
            || (y == (this.mMasuCnt - 1) && (3 <= x && x <= (this.mMasuCnt - 4)))
            || ((3 <= y && y <= (this.mMasuCnt - 4)) && x == (this.mMasuCnt - 1))) {
            ret = 0;
        }
        return ret;
    };
    return Reversi;
}());
//# sourceMappingURL=Reversi.js.map