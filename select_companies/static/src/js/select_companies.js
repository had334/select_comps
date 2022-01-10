console.log("FIRST")
odoo.define('select_companies.SelectAllCompanies', function(require) {
    "use strict";
    console.log("SECOND")


    var config = require('web.config');
    var core = require('web.core');
    var session = require('web.session');
    var SystrayMenu = require('web.SystrayMenu');
    var Widget = require('web.Widget');


    var SelectAllCompanies = Widget.extend({
        template: 'SelectAllCompanies',
        events: {
            'click .select_companies': '_onSelectAllCompanies',
            'keydown .select_companies': '_onSelectAllCompanies',
            
        },


    /**
     * @override
     */
    init: function () {
        this._super.apply(this, arguments);
        this.isMobile = config.device.isMobile;
        // this._onSelectAllCompanies = _.debounce(this._onSelectAllCompanies, 1500, true);
        this._onSwitchCompanyClick = _.debounce(this._onSwitchCompanyClick, 1500, true);
    },

    /**
     * @override
     */
    willStart: function () {
        var self = this;
        this.allowed_company_ids = String(session.user_context.allowed_company_ids)
                                    .split(',')
                                    .map(function (id) {return parseInt(id);});
        this.user_companies = session.user_companies.allowed_companies;
        this.current_company = this.allowed_company_ids[0];
        this.current_company_name = _.find(session.user_companies.allowed_companies, function (company) {
            return company[0] === self.current_company;
        })[1];
        return this._super.apply(this, arguments);
    },

    /**
     * @private
     * @param {MouseEvent|KeyEvent} ev
     */
    _onSelectAllCompanies: function (ev) {
        if (ev.type == 'keydown' && ev.which != $.ui.keyCode.ENTER && ev.which != $.ui.keyCode.SPACE) {
            return;
        }
        ev.preventDefault();
        ev.stopPropagation();
        var dropdownItem = $(ev.currentTarget).parent();
        var dropdownMenu = dropdownItem.parent();


        console.log("In Onselectall function begin")
        if (this.allowed_company_ids.length == this.user_companies.length) {
            for (var i = 1; i < this.user_companies.length; i++) {
                if (this.allowed_company_ids.includes(this.user_companies[i][0])) {
                    this.allowed_company_ids.pop();
                    session.setCompanies(this.allowed_company_ids[0] , this.allowed_company_ids);

                }
            }
            
        }
        else {

            for (var i = 0; i < this.user_companies.length; i++) {
                if (!this.allowed_company_ids.includes(this.user_companies[i][0])) {
                    this.allowed_company_ids.push(this.user_companies[i][0]);
                    session.setCompanies(this.user_companies[i][0], this.allowed_company_ids);
                    
                }

            }

    }   
    console.log("In Onselectall function last")



    },

});
if (session.display_switch_company_menu) {
    SystrayMenu.Items.push(SelectAllCompanies);
}
console.log(SelectAllCompanies)

return SelectAllCompanies;
});