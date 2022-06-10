/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\dist\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\dist\examples\tau\.wizzi\src\site\webpacks\common\forms.js.ittf
    utc time: Mon, 22 Feb 2021 12:45:40 GMT
*/
'use strict';
var stylesInjected = false;
export function createForm(pageData, elementId) {
    const jq2 = jQuery.noConflict();
    jq2(function($) {
        if (!stylesInjected) {
            injectPageStyles();
            injectFormStyles();
            stylesInjected = true;
        }
        document.getElementById(elementId).innerHTML = getFormContainer(pageData);
        startForm($, pageData.form)
        startFormValidation($, pageData.form)
    })
}
function getFormContainer(ctx) {
    var __html = [];
    var temp = [];
    formHtml(temp, ctx.form)
    __html.push('<div class="' + "page-wrapper bg-red p-t-30 p-b-100 font-robo" + '" id="' + "container" + '">');
    __html.push('<div id="' + "content" + '">');
    __html.push( temp.join('') );
    __html.push('</div>');
    __html.push('<div id="' + "footer" + '">');
    __html.push('</div>');
    __html.push('</div>');
    return __html.join('');
}
function startForm($, form) {
    var i, i_items=form.controls, i_len=form.controls.length, item;
    for (i=0; i<i_len; i++) {
        item = form.controls[i];
        startControl($, item)
    }
}
function startControl($, item) {
    if (item.type == 'group') {
        var i, i_items=item.controls, i_len=item.controls.length, child;
        for (i=0; i<i_len; i++) {
            child = item.controls[i];
            startControl($, child)
        }
        return ;
    }
    else if (item.type == 'select') {
        try {
            var selectBox = $('select[name="' + item.id + '"]');
            var selectDropdown = $('#' + item.id + '-dropdown');
            selectBox.select2({
                dropdownParent: selectDropdown
            })
            console.log('select', item.id, 'activated');
        } 
        catch (err) {
            console.log(err);
        } 
    }
    else if (item.type == 'date') {
        try {
            $('input[name="' + item.id + '"]').daterangepicker({
                "singleDatePicker": true, 
                "showDropdowns": true, 
                "autoUpdateInput": true, 
                "autoApply": true, 
                locale: {
                    format: 'DD/MM/YYYY'
                }
            })
            $('input[name="' + item.id + '"]').on('apply.daterangepicker', function(ev, picker) {
                $(this).val(picker.startDate.format('DD/MM/YYYY'));
            })
            console.log('datepicker', item.id, 'activated');
        } 
        catch (err) {
            console.log(err);
        } 
    }
    else if (item.type == 'checkbox' || item.type == 'radio') {
        const skin = item.skin || 'square';
        const colorScheme = item.color || 'blue';
        const increaseArea = item.increase || '20';
        try {
            $('input[name="' + item.id + '"]').iCheck({
                checkboxClass: 'icheckbox_' + skin + '-' + colorScheme, 
                radioClass: 'iradio_' + skin + '-' + colorScheme, 
                increaseArea: increaseArea + '%'
            })
        } 
        catch (err) {
            console.log(err);
        } 
    }
    else if (item.type == 'slider') {
        try {
            noUiSlider.create($('#' + item.id)[0], {
                start: [
                    item.start
                ], 
                step: item.step, 
                connect: [
                    true, 
                    false
                ], 
                tooltips: [
                    true
                ], 
                range: {
                    'min': item.range.min, 
                    'max': item.range.max
                }, 
                format: wNumb({
                    decimals: 0, 
                    thousand: ',', 
                    prefix: '$ '
                })
            })
        } 
        catch (err) {
            console.log(err);
        } 
    }
    else if (item.type == 'code') {
        try {
            var editor = CodeMirror($('#' + item.id)[0], {
                mode: "text/html", 
                theme: "dracula", 
                lineWrapping: false, 
                lineNumbers: true, 
                styleActiveLine: true, 
                matchBrackets: true, 
                viewportMargin: Infinity, 
                extraKeys: {
                    "Ctrl-Space": "autocomplete"
                }, 
                value: "<!doctype html>\n<html>\n  " + $('#' + item.id)[0].innerHTML + "\n</html>"
            });
        } 
        catch (err) {
            console.log(err);
        } 
    }
}
function startFormValidation($, form) {
    var rules = {};
    var i, i_items=form.controls, i_len=form.controls.length, item;
    for (i=0; i<i_len; i++) {
        item = form.controls[i];
        setControlRule($, item, rules)
    }
    $('#' + form.id).validate({
        rules: rules, 
        errorElement: 'div', 
        onfocusout: function(element) {
            console.log('onfocusout', element);
            $(element).valid();
            console.log($(element).valid());
        }
    })
}
function setControlRule($, item, rules) {
    if (item.type == 'group') {
        var i, i_items=item.controls, i_len=item.controls.length, child;
        for (i=0; i<i_len; i++) {
            child = item.controls[i];
            setControlRule($, child, rules)
        }
        return ;
    }
    if (item.required) {
        rules[item.id] = "required";
    }
}
function formHtml(__html, form) {
    var temp = [];
    var i, i_items=form.controls, i_len=form.controls.length, item;
    for (i=0; i<i_len; i++) {
        item = form.controls[i];
        formControlHtml(temp, item)
    }
    __html.push('<div class="' + "card card-2" + '">');
    __html.push('<div class="' + "card-heading" + '">');
    __html.push('</div>');
    __html.push('<div class="' + "card-body" + '">');
    __html.push('<h2 class="' + "title" + '">');
    __html.push( form.title );
    __html.push('</h2>');
    __html.push('<div>');
    __html.push('<form method="' + "post" + '" id="' + form.id + '">');
    __html.push('<div>');
    __html.push( temp.join('') );
    __html.push('</div>');
    __html.push('<div class="' + "form-submit" + '">');
    __html.push('<input class="' + "submit" + '" type="' + "submit" + '" value="' + "Submit" + '" id="' + "submit" + '" name="' + "submit" + '">');
    __html.push('</input>');
    __html.push('<input class="' + "submit" + '" type="' + "submit" + '" value="' + "Reset" + '" id="' + "reset" + '" name="' + "reset" + '">');
    __html.push('</input>');
    __html.push('</div>');
    __html.push('</form>');
    __html.push('</div>');
    __html.push('</div>');
    __html.push('</div>');
}
function formControlHtml(__html, ctrl) {
    let options = [];
    if (ctrl.type == 'group') {
        var direction = ctrl.direction || 'row';
        var i, i_items=ctrl.controls, i_len=ctrl.controls.length, item;
        for (i=0; i<i_len; i++) {
            item = ctrl.controls[i];
            var aOptions = [];
            formControlHtml(aOptions, item)
            options.push(aOptions.join('\n'))
        }
        __html.push('<div class="' + "control-group grid-" +  direction  + "-" +  ctrl.controls.length  + '">');
        __html.push( options.join('\n') );
        __html.push('</div>');
        return ;
    }
    else if (ctrl.type == 'select') {
        var i, i_items=ctrl.options, i_len=ctrl.options.length, item;
        for (i=0; i<i_len; i++) {
            item = ctrl.options[i];
            var aOptions = [];
            selectOptionHtml(aOptions, item)
            options.push(aOptions.join(''))
        }
    }
    if (ctrl.type == 'radio') {
        var i, i_items=ctrl.options, i_len=ctrl.options.length, item;
        for (i=0; i<i_len; i++) {
            item = ctrl.options[i];
            var aOptions = [];
            radioOptionHtml(aOptions, ctrl, item)
            options.push(aOptions.join(''))
        }
    }
    __html.push('<div class="' + "single-control row row-space" + '">');
    __html.push('<label class="' +  (ctrl.required ? 'required' : '')  + '" for="' + ctrl.id + '">');
    __html.push( ctrl.label );
    __html.push('</label>');
    __html.push('<div class="' + "input-group" + '">');
    if (ctrl.type == 'text') {
        __html.push('<input class="' + "input--style-2" + '" type="' + "text" + '" placeholder="' + ctrl.label + '" name="' + ctrl.id + '">');
        __html.push('</input>');
    }
    else if (ctrl.type == 'select') {
        __html.push('<div class="' + "rs-select2 js-select-simple select--no-search" + '">');
        __html.push('<select name="' + ctrl.id + '">');
        __html.push( options.join('\n') );
        __html.push('</select>');
        __html.push('<div class="' + "select-dropdown" + '" id="' + ctrl.id  + "-dropdown" + '">');
        __html.push('</div>');
        __html.push('</div>');
    }
    else if (ctrl.type == 'date') {
        __html.push('<input class="' + "input--style-2 js-datepicker" + '" type="' + "text" + '" placeholder="' + ctrl.label + '" name="' + ctrl.id + '">');
        __html.push('</input>');
        __html.push('<i class="' + "zmdi zmdi-calendar-note input-icon js-btn-calendar" + '">');
        __html.push('</i>');
    }
    else if (ctrl.type == 'checkbox') {
        __html.push('<div class="' + "checkbox-item" + '">');
        __html.push('<input class="' + "input--style-2" + '" type="' + "checkbox" + '" placeholder="' + ctrl.label + '" name="' + ctrl.id + '">');
        __html.push('</input>');
        __html.push('</div>');
    }
    else if (ctrl.type == 'radio') {
        __html.push('<div class="' + "radio-group" + '">');
        __html.push( options.join('\n') );
        __html.push('</div>');
    }
    else if (ctrl.type == 'slider') {
        __html.push('<div class="' + "slider-group ui-slider ui-slider-horizontal" + '">');
        __html.push('<div class="' + "slider-item" + '" id="' + ctrl.id + '">');
        __html.push('</div>');
        __html.push('<span class="' + "donate-value" + '" id="' + "value-lower" + '">');
        __html.push('</span>');
        __html.push('</div>');
    }
    else if (ctrl.type == 'code') {
        __html.push('<div id="' + ctrl.id + '">');
        __html.push('</div>');
    }
    __html.push('</div>');
    __html.push('</div>');
}
function selectOptionHtml(__html, ctrl) {
    __html.push('<option');
    __html.push(' value="' + ctrl.value + '"');
    if (ctrl.selected) {
        __html.push(' selected="selected"');
    }
    __html.push('>');
    __html.push(ctrl.label);
    __html.push('</option>');
}
function radioOptionHtml(__html, radio, ctrl) {
    __html.push('<div class="' + "radio-item" + '">');
    __html.push('<input type="' + "radio" + '" name="' + radio.id + '" id="' + ctrl.id + '" checked>');
    __html.push('</input>');
    __html.push('<label for="' + ctrl.id + '">');
    __html.push( ctrl.label );
    __html.push('</label>');
    __html.push('<span class="' + "check" + '">');
    __html.push('</span>');
    __html.push('</div>');
}
function injectPageStyles() {
    injectCssLink("https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i")
    injectCssText({
        body: {
            margin: 0, 
            "font-family": '"Roboto", "Arial", "Helvetica Neue", sans-serif', 
            "font-weight": 400, 
            "font-size": "14px"
        }, 
        "#container": {
            width: "75%", 
            border: "none", 
            margin: "auto"
        }, 
        "#content": {
            padding: "2rem"
        }, 
        ".row": {
            display: "-webkit-box", 
            display: "-webkit-flex", 
            display: "-moz-box", 
            display: "-ms-flexbox", 
            display: "flex", 
            "-webkit-flex-wrap": "wrap", 
            "-ms-flex-wrap": "wrap", 
            "flex-wrap": "wrap"
        }, 
        ".row-space": {
            "-webkit-box-pack": "justify", 
            "-webkit-justify-content": "space-between", 
            "-moz-box-pack": "justify", 
            "-ms-flex-pack": "justify", 
            "justify-content": "space-between"
        }, 
        ".col-2": {
            width: "-webkit-calc((100% - 60px) / 2)", 
            width: "-moz-calc((100% - 60px) / 2)", 
            width: "calc((100% - 60px) / 2)"
        }, 
        "@media (max-width: 767px)": {
            ".col-2": {
                width: "100%"
            }
        }, 
        // ==========================================================================
        // BACKGROUND
        // ==========================================================================
        ".bg-blue": {
            background: "#2c6ed5"
        }, 
        ".bg-red": {
            background: "#fa4251"
        }, 
        // ==========================================================================
        // SPACING
        // ==========================================================================
        ".m-t-20": {
            "margin-top": "20px"
        }, 
        ".m-t-30": {
            "margin-top": "30px"
        }, 
        ".m-t-100": {
            "margin-top": "100px"
        }, 
        ".m-t-180": {
            "margin-top": "180px"
        }, 
        ".m-b-20": {
            "margin-bottom": "20px"
        }, 
        ".m-b-30": {
            "margin-bottom": "30px"
        }, 
        ".m-b-100": {
            "margin-bottom": "100px"
        }, 
        ".m-b-180": {
            "margin-bottom": "180px"
        }, 
        ".p-t-20": {
            "padding-top": "20px"
        }, 
        ".p-t-30": {
            "padding-top": "30px"
        }, 
        ".p-t-100": {
            "padding-top": "100px"
        }, 
        ".p-t-180": {
            "padding-top": "180px"
        }, 
        ".p-b-180": {
            "padding-bottom": "180px"
        }, 
        ".p-b-180": {
            "padding-bottom": "180px"
        }, 
        ".p-b-180": {
            "padding-bottom": "180px"
        }, 
        ".p-b-180": {
            "padding-bottom": "180px"
        }
    })
}
function injectFormStyles() {
    injectCssText({
        // ==========================================================================
        // GRID
        // ==========================================================================
        ".control-group": {
            "width": "100%"
        }, 
        ".single-control": {
            "width": "100%"
        }, 
        ".grid-row-2": {
            display: "grid", 
            "grid-template-columns": "1fr 1fr"
        }, 
        ".grid-row-3": {
            display: "grid", 
            "grid-template-columns": "1fr 1fr 1fr"
        }, 
        ".input-group": {
            position: "relative", 
            "width": "100%", 
            "margin-bottom": "2px", 
            "padding-bottom": "12px"
        }, 
        // ==========================================================================
        // BUTTON
        // ==========================================================================
        ".btn": {
            "line-height": "40px", 
            display: "inline-block", 
            padding: "0 25px", 
            cursor: "pointer", 
            color: "#fff", 
            "font-family": '"Roboto", "Arial", "Helvetica Neue", sans-serif', 
            "-webkit-transition": "all 0.4s ease", 
            "-o-transition": "all 0.4s ease", 
            "-moz-transition": "all 0.4s ease", 
            "transition": "all 0.4s ease", 
            "font-size": "14px", 
            "font-weight": "700"
        }, 
        ".btn--radius": {
            "-webkit-border-radius": "3px", 
            "-moz-border-radius": "3px", 
            "border-radius": "3px"
        }, 
        ".btn--green": {
            background: "#57b846"
        }, 
        ".btn--green:hover": {
            background: "#4dae3c"
        }, 
        // ==========================================================================
        // Label
        // ==========================================================================
        label: {
            "font-weight": "bold", 
            "margin-bottom": "7px"
        }, 
        "label.required": {
            "position": "relative"
        }, 
        "label.required:after": {
            "content": "'*'", 
            "margin-left": "2px", 
            color: "#b90000"
        }, 
        "div.error": {
            color: "#c70000"
        }, 
        // ==========================================================================
        // Input
        // ==========================================================================
        input: {
            "box-sizing": "border-box", 
            border: "1px solid #ebebeb", 
            padding: "14px 20px", 
            "border-radius": "5px", 
            "-moz-border-radius": "5px", 
            "-webkit-border-radius": "5px", 
            "-o-border-radius": "5px", 
            "-ms-border-radius": "5px", 
            "font-size": "14px", 
            "font-family": "inherit"
        }, 
        "input:focus": {
            border: "1px solid #009e00"
        }, 
        "input.error": {
            border: "1px solid #c70000"
        }, 
        ".input-icon": {
            position: "absolute", 
            "font-size": "18px", 
            "color": "#ccc", 
            "right": "8px", 
            "top": "50%", 
            "-webkit-transform": "translateY(-50%)", 
            "-moz-transform": "translateY(-50%)", 
            "-ms-transform": "translateY(-50%)", 
            "-o-transform": "translateY(-50%)", 
            "transform": "translateY(-50%)", 
            "cursor": "pointer"
        }, 
        ".input--style-2": {
            color: "#666", 
            "font-size": "16px", 
            "font-weight": "500"
        }, 
        ".input--style-2::-webkit-input-placeholder": {
            color: "#808080", 
            opacity: .4
        }, 
        ".input--style-2:-moz-placeholder": {
            color: "#808080", 
            opacity: .4
        }, 
        ".input--style-2::-moz-placeholder": {
            color: "#808080", 
            opacity: .4
        }, 
        ".input--style-2:-ms-input-placeholder": {
            color: "#808080", 
            opacity: .4
        }, 
        ".input--style-2:-ms-input-placeholder": {
            color: "#808080", 
            opacity: .4
        }, 
        // ==========================================================================
        // DATE PICKER
        // ==========================================================================
        "td.active": {
            "background-color": "#2c6ed5"
        }, 
        'input[type="date" i]': {
            padding: "14px"
        }, 
        ".table-condensed td, .table-condensed th": {
            "font-size": "14px", 
            "font-family": '"Roboto", "Arial", "Helvetica Neue", sans-serif', 
            "font-weight": "400"
        }, 
        ".daterangepicker td": {
            width: "40px", 
            height: "30px"
        }, 
        ".daterangepicker": {
            border: "none", 
            "-webkit-box-shadow": "0px 8px 20px 0px rgba(0, 0, 0, 0.15)", 
            "-moz-box-shadow": "0px 8px 20px 0px rgba(0, 0, 0, 0.15)", 
            "box-shadow": "0px 8px 20px 0px rgba(0, 0, 0, 0.15)", 
            display: "none", 
            border: "1px solid #e0e0e0", 
            "margin-top": "5px"
        }, 
        ".daterangepicker::after, .daterangepicker::before": {
            display: "none"
        }, 
        ".daterangepicker thead tr th": {
            padding: "10px 0"
        }, 
        ".daterangepicker .table-condensed th select": {
            border: "1px solid #ccc", 
            "-webkit-border-radius": "3px", 
            "-moz-border-radius": "3px", 
            "border-radius": "3px", 
            "font-size": "14px", 
            "padding": "5px", 
            "outline": "none"
        }, 
        // =========================================================================
        // SELECT2
        // =========================================================================
        ".select--no-search .select2-search": {
            display: "none !important"
        }, 
        ".rs-select2 .select2-container": {
            width: "100% !important", 
            border: "1px solid #ebebeb"
        }, 
        ".rs-select2 .select2-container .select2-selection--single": {
            outline: "none", 
            border: "none", 
            height: "36px"
        }, 
        ".rs-select2 .select2-container .select2-selection--single .select2-selection__rendered": {
            "line-height": "36px", 
            "padding-left": 0, 
            color: "#808080", 
            "font-size": "16px", 
            "font-family": "inherit", 
            "font-weight": 500
        }, 
        ".rs-select2 .select2-container .select2-selection--single .select2-selection__arrow": {
            height: "34px", 
            right: "4px", 
            display: "-webkit-box", 
            display: "-webkit-flex", 
            display: "-moz-box", 
            display: "-ms-flexbox", 
            display: "flex", 
            "-webkit-box-pack": "center", 
            "-webkit-justify-content": "center", 
            "-moz-box-pack": "center", 
            "-ms-flex-pack": "center", 
            "justify-content": "center", 
            "-webkit-box-align": "center", 
            "-webkit-align-items": "center", 
            "-moz-box-align": "center", 
            "-ms-flex-align": "center", 
            "align-items": "center"
        }, 
        ".rs-select2 .select2-container .select2-selection--single .select2-selection__arrow b": {
            "display": "none"
        }, 
        ".rs-select2 .select2-container .select2-selection--single .select2-selection__arrow:after": {
            "font-family": "Material-Design-Iconic-Font", 
            content: "'\f2f9'", 
            "font-size": "18px", 
            color: "#ccc", 
            "-webkit-transition": "all 0.4s ease", 
            "-o-transition": "all 0.4s ease", 
            "-moz-transition": "all 0.4s ease", 
            transition: "all 0.4s ease"
        }, 
        ".rs-select2 .select2-container.select2-container--open .select2-selection--single .select2-selection__arrow::after": {
            "-webkit-transform": "rotate(-180deg)", 
            "-moz-transform": "rotate(-180deg)", 
            "-ms-transform": "rotate(-180deg)", 
            "-o-transform": "rotate(-180deg)", 
            transform: "rotate(-180deg)"
        }, 
        ".select2-container--open .select2-dropdown--below": {
            border: "none", 
            "-webkit-border-radius": "3px", 
            "-moz-border-radius": "3px", 
            "border-radius": "3px", 
            "-webkit-box-shadow": "0px 8px 20px 0px rgba(0, 0, 0, 0.15)", 
            "-moz-box-shadow": "0px 8px 20px 0px rgba(0, 0, 0, 0.15)", 
            "box-shadow": "0px 8px 20px 0px rgba(0, 0, 0, 0.15)", 
            border: "1px solid #e0e0e0", 
            "margin-top": "5px", 
            overflow: "hidden"
        }, 
        // ==========================================================================
        // CHECKBOX
        // ==========================================================================
        ".checkbox-item": {
            "padding-left": "30px", 
            "padding-bottom": "10px", 
            "padding-top": "12px"
        }, 
        // ==========================================================================
        // RADIO
        // ==========================================================================
        ".radio-group": {
            display: "flex", 
            "padding-bottom": "10px", 
            "padding-top": "12px"
        }, 
        ".radio-item": {
            position: "relative", 
            display: "grid", 
            "grid-template-columns": "1fr 3fr", 
            "margin-right": "30px"
        }, 
        ".radio-item label": {
            "font-weight": 500, 
            "padding-left": "10px", 
            position: "relative", 
            "z-index": 9, 
            display: "block", 
            cursor: "pointer", 
            "text-transform": "none"
        }, 
        ".form-radio input": {
            width: "auto", 
            display: "inline-block"
        }, 
        // ==========================================================================
        // SLIDER
        // ==========================================================================
        ".slider-group": {
            position: "relative", 
            "margin-top": "22px"
        }, 
        ".slider-item": {
            height: "5px", 
            border: "none", 
            "box-shadow": "none", 
            "-moz-box-shadow": "none", 
            "-webkit-box-shadow": "none", 
            "-o-box-shadow": "none", 
            "-ms-box-shadow": "none", 
            background: "#f8f8f8", 
            "border-radius": "2.5px", 
            "-moz-border-radius": "2.5px", 
            "-webkit-border-radius": "2.5px", 
            "-o-border-radius": "2.5px", 
            "-ms-border-radius": "2.5px"
        }, 
        ".slider-item .noUi-connect": {
            background: "#329e5e"
        }, 
        ".slider-item .noUi-handle": {
            width: "100px", 
            height: "30px", 
            top: "-12px", 
            background: "#329e5e", 
            "box-shadow": "0px 3px 2.85px 0.15px rgba(0, 0, 0, 0.1)", 
            "-moz-box-shadow": "0px 3px 2.85px 0.15px rgba(0, 0, 0, 0.1)", 
            "-webkit-box-shadow": "0px 3px 2.85px 0.15px rgba(0, 0, 0, 0.1)", 
            "-o-box-shadow": "0px 3px 2.85px 0.15px rgba(0, 0, 0, 0.1)", 
            "-ms-box-shadow": "0px 3px 2.85px 0.15px rgba(0, 0, 0, 0.1)", 
            "border-radius": "5px", 
            "-moz-border-radius": "5px", 
            "-webkit-border-radius": "5px", 
            "-o-border-radius": "5px", 
            "-ms-border-radius": "5px", 
            outline: "none", 
            border: "none", 
            right: "-50px"
        }, 
        ".slider-item .noUi-handle:after, .slider-item .noUi-handle:before": {
            background: "transparent", 
            height: "0px", 
            width: "20px", 
            top: "-2px", 
            "font-size": "18px", 
            outline: "none"
        }, 
        ".slider-item .noUi-handle:before": {
            "font-family": "Material-Design-Iconic-Font", 
            color: "#fff", 
            content: "'\f2fa'", 
            left: "10px"
        }, 
        ".slider-item .noUi-handle:after": {
            "font-family": "'Material-Design-Iconic-Font'", 
            color: "#fff", 
            content: "'\f2fb'", 
            left: "auto", 
            right: "-5px"
        }, 
        ".slider-item .noUi-handle .noUi-tooltip": {
            bottom: "2px", 
            border: "none", 
            background: "transparent", 
            "font-weight": "bold", 
            color: "#fff", 
            padding: "0px"
        }, 
        ".donate-us": {
            "margin-bottom": "93px", 
            "margin-top": "30px"
        }, 
        ".donate-us label": {
            "margin-bottom": "32px"
        }, 
        ".price_slider": {
            position: "relative"
        }, 
        ".donate-value": {
            position: "absolute", 
            top: "-9px", 
            left: "50%", 
            "z-index": "99", 
            transform: "translateX(-50%)", 
            "-moz-transform": "translateX(-50%)", 
            "-webkit-transform": "translateX(-50%)", 
            "-o-transform": "translateX(-50%)", 
            "-ms-transform": "translateX(-50%)"
        }, 
        // ==========================================================================
        // CODEMIRROR
        // ==========================================================================
        ".CodeMirror": {
            "font-size": "15px", 
            border: "1px solid #eee", 
            height: "20rem"
        }, 
        // ==========================================================================
        // SUBMIT
        // ==========================================================================
        ".form-submit": {
            "text-align": "right"
        }, 
        ".submit": {
            width: "150px", 
            height: "50px", 
            display: "inline-block", 
            "font-family": "'Poppins'", 
            "font-weight": "bold", 
            "font-size": "14px", 
            padding: "10px", 
            border: "none", 
            cursor: "pointer", 
            "text-transform": "uppercase", 
            "border-radius": "5px", 
            "-moz-border-radius": "5px", 
            "-webkit-border-radius": "5px", 
            "-o-border-radius": "5px", 
            "-ms-border-radius": "5px"
        }, 
        "#reset": {
            background: "#fff", 
            color: "#999", 
            border: "2px solid #ebebeb"
        }, 
        "#reset:hover": {
            border: "2px solid #329e5e", 
            background: "#329e5e", 
            color: "#fff"
        }, 
        "#submit": {
            background: "#329e5e", 
            color: "#fff", 
            "margin-right": "25px"
        }, 
        "#submit:hover": {
            "background-color": "#267747"
        }, 
        // ==========================================================================
        // TITLE
        // ==========================================================================
        ".title": {
            "text-transform": "uppercase", 
            "font-weight": 700, 
            "margin-bottom": "37px"
        }, 
        // ==========================================================================
        // CARD
        // ==========================================================================
        ".card": {
            overflow: "hidden", 
            "-webkit-border-radius": "3px", 
            "-moz-border-radius": "3px", 
            "border-radius": "3px", 
            background: "#fff"
        }, 
        ".card-2": {
            "-webkit-box-shadow": "0px 8px 20px 0px rgba(0, 0, 0, 0.15)", 
            "-moz-box-shadow": "0px 8px 20px 0px rgba(0, 0, 0, 0.15)", 
            "box-shadow": "0px 8px 20px 0px rgba(0, 0, 0, 0.15)", 
            "-webkit-border-radius": "10px", 
            "-moz-border-radius": "10px", 
            "border-radius": "10px", 
            "width": "100%", 
            display: "table"
        }, 
        ".card-2 .card-heading": {
            background: 'url("./images/stefano_stop.jpg") top left/cover no-repeat', 
            width: "24.1%", 
            display: "table-cell"
        }, 
        ".card-2 .card-body": {
            display: "table-cell", 
            padding: "80px 90px", 
            "padding-bottom": "88px"
        }
    })
}
function injectCssLink(href) {
    var head = document.head || document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.rel = "stylesheet";
    link.href = href;
    link.type = "text/css";
    head.appendChild(link);
}
function injectCssText(cssObj) {
    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';
    var aCss = [];
    for (var krule in cssObj) {
        var ruleObj = cssObj[krule];
        var aRule = [];
        for (var kstyle in ruleObj) {
            if (typeof ruleObj[kstyle] === 'object') {
                var aRule2 = [];
                for (var kstyle2 in ruleObj[kstyle]) {
                    aRule2.push(kstyle2 + ': ' + ruleObj[kstyle][kstyle2])
                }
                aRule.push(kstyle + ' { ' + aRule2.join(';\n') + ' } ')
            }
            else {
                aRule.push(kstyle + ': ' + ruleObj[kstyle])
            }
        }
        aCss.push(krule + ' { ' + aRule.join(';\n') + ' } ')
    }
    var css = aCss.join('\n');
    // IE8 and below.
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    }
    else {
        style.appendChild(document.createTextNode(css));
    }
    head.appendChild(style);
}
