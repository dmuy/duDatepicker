import { hf } from './helpers'

/**
 * Dictionary defaults
 */
export const DICT_DEFAULTS = {
    btnOk: 'OK',
    btnCancel: 'CANCEL',
    btnClear: 'CLEAR'
}

class Locale {
    /**
     * Creates i18n locale
     * @param {string[]} months List of month names
     * @param {string[]} shortMonths List of shortened month names
     * @param {string[]} days List of day names
     * @param {string[]} shortDays List of 3-letter day names
     * @param {string[]} shorterDays List of 2-letter day names
     * @param {number} firstDay First day of the week (1 - 7; Monday - Sunday)
     * @param {Object} dict Dictionary of words to be used on the UI
     * @param {string} dict.btnOk OK button text
     * @param {string} dict.btnCancel Cancel button text
     * @param {string} dict.btnClear Clear button text
     */
    constructor(months, shortMonths, days, shortDays, shorterDays, firstDay, dict) {
        this.months = months
        this.shortMonths = shortMonths || this.months.map(x => x.substr(0, 3))
        this.days = days
        this.shortDays = shortDays || this.days.map(x => x.substr(0, 3))
        this.shorterDays = shorterDays || this.days.map(x => x.substr(0, 2))
        this.firstDay = firstDay
        this.dict = hf.extend(DICT_DEFAULTS, dict)
    }
}

/**
 * Internationalization
 */
export const i18n = {
    // expose Locale class
    Locale: Locale,
    /**
     * English
     */
    en: new Locale('January_February_March_April_May_June_July_August_September_October_November_December'.split('_'), null,
        'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'), null, null, 7),
    /**
     * Russian
     */
    ru: new Locale('январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_'), 
        'янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.'.split('_'), 
        'воскресенье_понедельник_вторник_среда_четверг_пятница_суббота'.split('_'), 
        'вс_пн_вт_ср_чт_пт_сб'.split('_'), 
        'вс_пн_вт_ср_чт_пт_сб'.split('_'), 1, {
            btnCancel: 'Отменить', btnClear: 'очищать'
        }),
    /**
     * Spanish
     */
    es: new Locale('enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'), null, 
        'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'), 
        'dom._lun._mar._mié._jue._vie._sáb.'.split('_'), null, 1, {
            btnCancel: 'Cancelar', btnClear: 'Despejar'
        }),
    /**
     * Turkish
     */
    tr: new Locale('Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık'.split('_'), null, 
        'Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi'.split('_'), 
        'Paz_Pts_Sal_Çar_Per_Cum_Cts'.split('_'), 
        'Pz_Pt_Sa_Ça_Pe_Cu_Ct'.split('_'), 1),
    /**
     * Persian
     */
    fa: new Locale('ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'), 
        'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'), 
        'یک\u200cشنبه_دوشنبه_سه\u200cشنبه_چهارشنبه_پنج\u200cشنبه_جمعه_شنبه'.split('_'), 
        'یک\u200cشنبه_دوشنبه_سه\u200cشنبه_چهارشنبه_پنج\u200cشنبه_جمعه_شنبه'.split('_'), 
        'ی_د_س_چ_پ_ج_ش'.split('_'), 1),
    /**
     * French
     */
    fr: new Locale('janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'), 
        'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
        'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'), 
        'dim._lun._mar._mer._jeu._ven._sam.'.split('_'), 
        'di_lu_ma_me_je_ve_sa'.split('_'), 1, {
            btnCancel: 'Abandonner', btnClear: 'Effacer'
        }),
    /**
     * German
     */
    de: new Locale('Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'), 
        'Jan._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.'.split('_'),
        'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'), 
        'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'), 
        'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'), 1, {
            btnCancel: 'Stornieren', btnClear: 'Löschen'
        }),
    /**
     * Japanese
     */
    ja: new Locale('一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'), 
        '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
        '日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日'.split('_'), 
        '日曜_月曜_火曜_水曜_木曜_金曜_土曜'.split('_'), 
        '日_月_火_水_木_金_土'.split('_'), 7),
    /**
     * Portuguese
     */
    pt: new Locale('janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro'.split('_'), null,
        'Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado'.split('_'), 
        'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'), 
        'Do_2ª_3ª_4ª_5ª_6ª_Sá'.split('_'), 1, {
            btnCancel: 'Cancelar', btnClear: 'Clarear'
        }),
    /**
     * Vietnamese
     */
    vi: new Locale('tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12'.split('_'), 
        'Thg 01_Thg 02_Thg 03_Thg 04_Thg 05_Thg 06_Thg 07_Thg 08_Thg 09_Thg 10_Thg 11_Thg 12'.split('_'), 
        'chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy'.split('_'), 
        'CN_T2_T3_T4_T5_T6_T7'.split('_'), 
        'CN_T2_T3_T4_T5_T6_T7'.split('_'), 1),
    /**
     * Chinese
     */
    zh: new Locale('一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
        '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
        '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
        '周日_周一_周二_周三_周四_周五_周六'.split('_'),
        '日_一_二_三_四_五_六'.split('_'), 1)
}