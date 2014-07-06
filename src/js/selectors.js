/**
 * selectors
 * Date: 31.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');

module.exports = {

    'ButtonPanel': function () {
        var panelSelectors = [
            '.b-editor-toolbar>tbody>tr>td',
            '.pump-title-panel>tbody>tr>td'
        ];

        var $result = [];

        for (var sl_index = 0; sl_index < panelSelectors.length; sl_index++) {
            $result = $(panelSelectors[sl_index]);
            if ($result.length > 0) return $result;
        }

        return $result;
    },

    'Apps': function () {
        return $('.b-application-panel .b-apps');
    },

    /**
     * Возвращает ссылки на документы указанного типа из таблицы документов
     * @param entityType Тип документа
     * @returns {*|jQuery|HTMLElement}
     */
    'DocumentTableLinks': function (entityType) {
        return $('.lognex-ScreenWrapper>table .b-document-table .cellTableCell a[href^=#'
            + entityType.toLowerCase() + ']');
    }

};