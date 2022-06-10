(self["webpackChunkwizzi_editor"] = self["webpackChunkwizzi_editor"] || []).push([["Editor/MonacoEditor"],{

/***/ "./src/components/Editor/MonacoEditor.tsx":
/*!************************************************!*\
  !*** ./src/components/Editor/MonacoEditor.tsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MonacoEditor": () => (/* binding */ MonacoEditor),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var aphrodite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aphrodite */ "./node_modules/aphrodite/no-important.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var monaco_editor_esm_vs_editor_editor_main__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! monaco-editor/esm/vs/editor/editor.main */ "./node_modules/monaco-editor/esm/vs/editor/editor.main.js");
/* harmony import */ var monaco_editor_esm_vs_editor_standalone_browser_simpleServices__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! monaco-editor/esm/vs/editor/standalone/browser/simpleServices */ "./node_modules/monaco-editor/esm/vs/editor/standalone/browser/simpleServices.js");
/* harmony import */ var monaco_editor_esm_vs_editor_standalone_browser_standaloneServices__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! monaco-editor/esm/vs/editor/standalone/browser/standaloneServices */ "./node_modules/monaco-editor/esm/vs/editor/standalone/browser/standaloneServices.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _features_prettier_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../features/prettier/index */ "./src/features/prettier/index.tsx");
/* harmony import */ var _features_preferences_index__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../features/preferences/index */ "./src/features/preferences/index.tsx");
/* harmony import */ var _widgets_ResizeDetector__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../widgets/ResizeDetector */ "./src/components/widgets/ResizeDetector.tsx");
/* harmony import */ var _themes_monaco__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./themes/monaco */ "./src/components/Editor/themes/monaco.tsx");
/* harmony import */ var _themes_monaco_overrides__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./themes/monaco-overrides */ "./src/components/Editor/themes/monaco-overrides.tsx");
const _excluded = ["files", "selectedFile", "autoFocus", "updateFiles", "onSelectFile"],
      _excluded2 = ["selectedFile", "files", "autoFocus", "theme", "updateFiles", "onSelectFile"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\Editor\MonacoEditor.tsx.ittf
    utc time: Fri, 18 Jun 2021 07:59:01 GMT
*/












/**
    * 
    * Monkeypatch to make 'Find All References' work across multiple files
    * https://github.com/Microsoft/monaco-editor/issues/779#issuecomment-374258435
    * 
*/
// @ts-ignore

monaco_editor_esm_vs_editor_standalone_browser_simpleServices__WEBPACK_IMPORTED_MODULE_4__.SimpleEditorModelResolverService.prototype.findModel = function (_, resource) {
  return monaco_editor_esm_vs_editor_editor_main__WEBPACK_IMPORTED_MODULE_3__.editor.getModels().find(model => model.uri.toString() === resource.toString());
}; // @ts-ignore


__webpack_require__.g.MonacoEnvironment = {
  getWorker(_, label) {
    switch (label) {
      case 'json':
        {// @ts-ignore return new Worker('monaco-editor/esm/vs/language/json/json.worker', { type: 'module'  }); 
        }

      case 'typescript':
      case 'javascript':
        {
          // @ts-ignore
          return new Worker('monaco-editor/esm/vs/language/typescript/ts.worker', {
            type: 'module'
          });
        }

      default:
        {
          // @ts-ignore
          return new Worker('monaco-editor/esm/vs/editor/editor.worker', {
            type: 'module'
          });
        }
    }
  }

};
monaco_editor_esm_vs_editor_editor_main__WEBPACK_IMPORTED_MODULE_3__.editor.defineTheme('light', _themes_monaco__WEBPACK_IMPORTED_MODULE_10__.light);
monaco_editor_esm_vs_editor_editor_main__WEBPACK_IMPORTED_MODULE_3__.editor.defineTheme('dark', _themes_monaco__WEBPACK_IMPORTED_MODULE_10__.dark);
/**
    // 
    // Disable typescript's diagnostics for JavaScript files.
    // This suppresses errors when using Flow syntax.
    // It's also unnecessary since we use ESLint for error checking.
    // 
*/
// 

monaco_editor_esm_vs_editor_editor_main__WEBPACK_IMPORTED_MODULE_3__.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
  noSemanticValidation: true,
  noSyntaxValidation: true
});
/**
    * 
    * Use prettier to format code.
    * This will replace the default formatter.
    * 
*/

const documentFormattingProvider = {
  async provideDocumentFormattingEdits(model) {
    const text = await (0,_features_prettier_index__WEBPACK_IMPORTED_MODULE_7__.prettierCode)(model.uri.path, model.getValue());
    return [{
      range: model.getFullModelRange(),
      text
    }];
  }

};
monaco_editor_esm_vs_editor_editor_main__WEBPACK_IMPORTED_MODULE_3__.languages.registerDocumentFormattingEditProvider('javascript', documentFormattingProvider);
monaco_editor_esm_vs_editor_editor_main__WEBPACK_IMPORTED_MODULE_3__.languages.registerDocumentFormattingEditProvider('typescript', documentFormattingProvider);
/**
    // 
    // Sync all the models to the worker eagerly.
    // This enables intelliSense for all files without needing an `addExtraLib` call.
    // 
*/

monaco_editor_esm_vs_editor_editor_main__WEBPACK_IMPORTED_MODULE_3__.languages.registerDocumentFormattingEditProvider('markdown', documentFormattingProvider);
/**
    // 
    // Sync all the models to the worker eagerly.
    // This enables intelliSense for all files without needing an `addExtraLib` call.
    // 
*/

monaco_editor_esm_vs_editor_editor_main__WEBPACK_IMPORTED_MODULE_3__.languages.typescript.typescriptDefaults.setEagerModelSync(true);
monaco_editor_esm_vs_editor_editor_main__WEBPACK_IMPORTED_MODULE_3__.languages.typescript.javascriptDefaults.setEagerModelSync(true);
/**
    * 
    * Configure the typescript compiler to detect JSX and load type definitions
    * 
*/

const compilerOptions = {
  allowJs: true,
  allowSyntheticDefaultImports: true,
  alwaysStrict: true,
  esModuleInterop: true,
  forceConsistentCasingInFileNames: true,
  isolatedModules: true,
  jsx: monaco_editor_esm_vs_editor_editor_main__WEBPACK_IMPORTED_MODULE_3__.languages.typescript.JsxEmit.React,
  module: monaco_editor_esm_vs_editor_editor_main__WEBPACK_IMPORTED_MODULE_3__.languages.typescript.ModuleKind.ESNext,
  moduleResolution: monaco_editor_esm_vs_editor_editor_main__WEBPACK_IMPORTED_MODULE_3__.languages.typescript.ModuleResolutionKind.NodeJs,
  noEmit: true,
  resolveJsonModule: true,
  strict: true,
  target: monaco_editor_esm_vs_editor_editor_main__WEBPACK_IMPORTED_MODULE_3__.languages.typescript.ScriptTarget.ESNext,
  paths: {
    '*': ['*', '*.native', '*.ios', '*.android']
  }
};
monaco_editor_esm_vs_editor_editor_main__WEBPACK_IMPORTED_MODULE_3__.languages.typescript.typescriptDefaults.setCompilerOptions(compilerOptions);
monaco_editor_esm_vs_editor_editor_main__WEBPACK_IMPORTED_MODULE_3__.languages.typescript.javascriptDefaults.setCompilerOptions(compilerOptions);
// Store editor states such as cursor position, selection and scroll position for each model
const editorStates = new Map(); // Store details about typings we have requested and loaded

const requestedTypings = new Map();
const extraLibs = new Map();
const codeEditorService = monaco_editor_esm_vs_editor_standalone_browser_standaloneServices__WEBPACK_IMPORTED_MODULE_5__.StaticServices.codeEditorService.get();

const findModel = path => monaco_editor_esm_vs_editor_editor_main__WEBPACK_IMPORTED_MODULE_3__.editor.getModels().find(model => model.uri.path === `/${path}`);

let MonacoEditorComp = /*#__PURE__*/function (_React$Component) {
  _inherits(MonacoEditorComp, _React$Component);

  var _super = _createSuper(MonacoEditorComp);

  function MonacoEditorComp(...args) {
    var _this;

    _classCallCheck(this, MonacoEditorComp);

    _this = _super.call(this, ...args);

    _defineProperty(_assertThisInitialized(_this), "state", {});

    _defineProperty(_assertThisInitialized(_this), "_initializeFile", (path, value) => {
      let model = findModel(path);

      if (model && !model.isDisposed()) {
        // If a model exists, we need to update it's value
        // This is needed because the content for the file might have been modified externally
        // Use `pushEditOperations` instead of `setValue` or `applyEdits` to preserve undo stack
        // @ts-ignore
        model.pushEditOperations([], [{
          range: model.getFullModelRange(),
          text: value
        }]);
      } else {
        model = monaco_editor_esm_vs_editor_editor_main__WEBPACK_IMPORTED_MODULE_3__.editor.createModel(value, undefined, monaco_editor_esm_vs_editor_editor_main__WEBPACK_IMPORTED_MODULE_3__.Uri.from({
          scheme: 'file',
          path
        }));
        model.updateOptions({
          tabSize: 2,
          insertSpaces: true
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_openFile", (path, value, focus) => {
      _this._initializeFile(path, value);

      const model = findModel(path);

      if (_this._editor && model) {
        _this._editor.setModel(model); // Restore the editor state for the file


        const editorState = editorStates.get(path);

        if (editorState) {
          _this._editor.restoreViewState(editorState);
        }

        if (focus) {
          _this._editor.focus();
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_handleEditFile", _event => {
      var _this$_editor, _this$_editor$getMode;

      const model = (_this$_editor = _this._editor) === null || _this$_editor === void 0 ? void 0 : (_this$_editor$getMode = _this$_editor.getModel) === null || _this$_editor$getMode === void 0 ? void 0 : _this$_editor$getMode.call(_this$_editor);

      if (model) {
        var _this$props$files$_th;

        const value = model.getValue();
        console.log('MonacoEditor', '_handleEditFile', value);

        if (value !== ((_this$props$files$_th = _this.props.files[_this.props.selectedFile]) === null || _this$props$files$_th === void 0 ? void 0 : _this$props$files$_th.contents)) {
          _this.props.updateFiles(() => ({
            [_this.props.selectedFile]: {
              type: 'CODE',
              contents: value
            }
          }));
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_handleResize", lodash_debounce__WEBPACK_IMPORTED_MODULE_2___default()(() => {
      var _this$_editor2, _this$_editor2$layout;

      return (_this$_editor2 = _this._editor) === null || _this$_editor2 === void 0 ? void 0 : (_this$_editor2$layout = _this$_editor2.layout) === null || _this$_editor2$layout === void 0 ? void 0 : _this$_editor2$layout.call(_this$_editor2);
    }, 50, {
      leading: true,
      trailing: true
    }));

    _defineProperty(_assertThisInitialized(_this), "_disposables", []);

    _defineProperty(_assertThisInitialized(_this), "_editor", null);

    _defineProperty(_assertThisInitialized(_this), "_node", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6__.createRef());

    _defineProperty(_assertThisInitialized(_this), "_statusbar", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6__.createRef());

    return _this;
  }

  _createClass(MonacoEditorComp, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _files$selectedFile;

      const _this$props = this.props,
            {
        files,
        selectedFile,
        autoFocus,
        updateFiles,
        onSelectFile
      } = _this$props,
            rest = _objectWithoutProperties(_this$props, _excluded); // The methods provided by the service are on it's prototype
      // So spreading this object doesn't work, we must mutate it


      codeEditorService.openCodeEditor = async ({
        resource,
        options
      }, editor) => {
        // Remove the leading slash added by the Uri
        this.props.onSelectFile(resource.path.replace(/^\//, ''));
        editor.setSelection(options.selection);
        editor.revealLine(options.selection.startLineNumber);
        return {
          getControl: () => editor
        };
      };

      const editor = monaco_editor_esm_vs_editor_editor_main__WEBPACK_IMPORTED_MODULE_3__.editor.create(this._node.current, rest, codeEditorService);
      this._editor = editor;
      this._disposables = [editor];

      this._disposables.push(editor.onDidChangeModelContent(this._handleEditFile));

      this._openFile(selectedFile, (_files$selectedFile = files[selectedFile]) === null || _files$selectedFile === void 0 ? void 0 : _files$selectedFile.contents, autoFocus);

      for (const path in files) {
        const file = files[path];

        if (file.type === 'CODE') {
          this._initializeFile(path, file.contents);
        } // Load all the files so the editor can provide proper intellisense

      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      const _this$props2 = this.props,
            {
        selectedFile,
        files,
        autoFocus,
        theme,
        updateFiles,
        onSelectFile
      } = _this$props2,
            rest = _objectWithoutProperties(_this$props2, _excluded2);

      if (this._editor) {
        var _files$selectedFile2;

        this._editor.updateOptions(rest);

        const model = this._editor.getModel();

        const value = (_files$selectedFile2 = files[selectedFile]) === null || _files$selectedFile2 === void 0 ? void 0 : _files$selectedFile2.contents;

        if (selectedFile !== prevProps.selectedFile) {
          // Save the editor state for the previous file so we can restore it when it's re-opened
          editorStates.set(prevProps.selectedFile, this._editor.saveViewState());

          this._openFile(selectedFile, value, autoFocus);
        } else {
          if (model && value !== model.getValue()) {
            // @ts-ignore
            this._editor.executeEdits(null, [{
              range: model.getFullModelRange(),
              text: value
            }]);
          }
        }
      }

      if (theme !== prevProps.theme) {
        monaco_editor_esm_vs_editor_editor_main__WEBPACK_IMPORTED_MODULE_3__.editor.setTheme(theme);
      }

      if (prevProps.files !== this.props.files) {
        for (const path in this.props.files) {
          var _prevProps$files$path;

          const file = this.props.files[path];

          if (file.type === 'CODE' && file.contents !== ((_prevProps$files$path = prevProps.files[path]) === null || _prevProps$files$path === void 0 ? void 0 : _prevProps$files$path.contents) && path !== selectedFile) {
            this._initializeFile(path, file.contents);
          }
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._disposables.forEach(dis => dis.dispose());
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6__.createElement("div", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.container)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6__.createElement("style", {
        type: "text/css",
        dangerouslySetInnerHTML: {
          __html: _themes_monaco_overrides__WEBPACK_IMPORTED_MODULE_11__.default
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6__.createElement(_widgets_ResizeDetector__WEBPACK_IMPORTED_MODULE_9__.default, {
        onResize: this._handleResize
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6__.createElement("div", {
        ref: this._node,
        className: classnames__WEBPACK_IMPORTED_MODULE_1___default()((0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.editor), 'packi-monaco-editor', `theme-${this.props.theme}`)
      })));
    }
  }], [{
    key: "removePath",
    value: function removePath(path) {
      var _model$dispose;

      // Remove editor states
      editorStates.delete(path); // Remove associated models

      const model = findModel(path);
      model === null || model === void 0 ? void 0 : (_model$dispose = model.dispose) === null || _model$dispose === void 0 ? void 0 : _model$dispose.call(model);
    }
  }, {
    key: "renamePath",
    value: function renamePath(oldPath, newPath) {
      const selection = editorStates.get(oldPath);
      editorStates.delete(oldPath);
      editorStates.set(newPath, selection);
      this.removePath(oldPath);
    }
  }]);

  return MonacoEditorComp;
}(react__WEBPACK_IMPORTED_MODULE_6__.Component);

_defineProperty(MonacoEditorComp, "defaultProps", {
  lineNumbers: 'on',
  wordWrap: 'on',
  scrollBeyondLastLine: false,
  minimap: {
    enabled: false
  },
  fontFamily: 'var(--font-monospace)',
  fontLigatures: true
});

const MonacoEditor = (0,_features_preferences_index__WEBPACK_IMPORTED_MODULE_8__.withThemeName)(MonacoEditorComp);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_features_preferences_index__WEBPACK_IMPORTED_MODULE_8__.withThemeName)(MonacoEditorComp));
const styles = aphrodite__WEBPACK_IMPORTED_MODULE_0__.StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    minWidth: 0,
    minHeight: 0
  },
  editor: {
    height: '100%',
    width: '100%'
  }
});

/***/ }),

/***/ "./src/components/Editor/themes/colors-dark.tsx":
/*!******************************************************!*\
  !*** ./src/components/Editor/themes/colors-dark.tsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "syntax": () => (/* binding */ syntax),
/* harmony export */   "ui": () => (/* binding */ ui)
/* harmony export */ });
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../ThemeProvider */ "./src/components/ThemeProvider.tsx");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\Editor\themes\colors-dark.tsx.ittf
    utc time: Fri, 18 Jun 2021 07:59:01 GMT
*/

const syntax = {
  text: '#d9d7ce',
  variable: '#d9d7ce',
  invalid: '#ff3333',
  constant: '#ff9d45',
  comment: '#5c6773',
  regexp: '#95e6cb',
  annotation: '#5ccfe6',
  tag: '#80d4ff',
  number: '#ff9d45',
  string: '#bae67e',
  property: '#5ccfe6',
  value: '#bae67e',
  keyword: '#ffae57',
  operator: '#778899',
  predefined: '#ff00ff'
};
const ui = {
  background: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_0__.c)('background', 'dark'),
  text: '#d9d7ce',
  selection: '#aaaaaa',
  indent: {
    active: '#393b41',
    inactive: '#494b51'
  }
};

/***/ }),

/***/ "./src/components/Editor/themes/colors-light.tsx":
/*!*******************************************************!*\
  !*** ./src/components/Editor/themes/colors-light.tsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "syntax": () => (/* binding */ syntax),
/* harmony export */   "ui": () => (/* binding */ ui)
/* harmony export */ });
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../ThemeProvider */ "./src/components/ThemeProvider.tsx");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\Editor\themes\colors-light.tsx.ittf
    utc time: Fri, 18 Jun 2021 07:59:01 GMT
*/

const syntax = {
  text: '#5c6773',
  variable: '#5c6773',
  invalid: '#ff3333',
  constant: '#f08c36',
  comment: '#abb0b6',
  regexp: '#4dbf99',
  annotation: '#41a6d9',
  tag: '#e7c547',
  number: '#f08c36',
  string: '#86b300',
  property: '#41a6d9',
  value: '#0451a5',
  keyword: '#f2590c',
  operator: '#778899',
  predefined: '#FF00FF'
};
const ui = {
  background: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_0__.c)('background', 'light'),
  text: '#5c6773',
  selection: '#cccccc',
  indent: {
    active: '#e0e0e0',
    inactive: '#ecebec'
  }
};

/***/ }),

/***/ "./src/components/Editor/themes/monaco-overrides.tsx":
/*!***********************************************************!*\
  !*** ./src/components/Editor/themes/monaco-overrides.tsx ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../ThemeProvider */ "./src/components/ThemeProvider.tsx");
/* harmony import */ var _colors_dark__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./colors-dark */ "./src/components/Editor/themes/colors-dark.tsx");
/* harmony import */ var _colors_light__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./colors-light */ "./src/components/Editor/themes/colors-light.tsx");
/* harmony import */ var _monaco__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./monaco */ "./src/components/Editor/themes/monaco.tsx");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\Editor\themes\monaco-overrides.tsx.ittf
    utc time: Fri, 18 Jun 2021 07:59:01 GMT
*/




const css = String.raw;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (css`
  /* Common overrides */
  .packi-monaco-editor .monaco-editor .line-numbers {
    color: currentColor;
    opacity: 0.5;
  }

  /* Context menu overrides */
  .packi-monaco-editor .context-view.monaco-menu-container {
    font-family: 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    background-color: transparent;
    box-shadow: none;
    border: none;
  }

  .packi-monaco-editor .monaco-menu .monaco-action-bar {
    padding: 4px;
    border-radius: 3px;
    border-style: solid;
    box-shadow: ${(0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_0__.s)('popover')} !important;
    background-color: ${(0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_0__.c)('content')} !important;
    color: ${(0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_0__.c)('text')} !important;
    border-color: transparent !important;
  }

  .packi-monaco-editor.theme-light .monaco-menu .monaco-action-bar {
    border-width: 0;
  }

  .packi-monaco-editor.theme-dark .monaco-menu .monaco-action-bar {
    border-width: 1px;
  }

  .packi-monaco-editor .monaco-menu .monaco-action-bar .action-item .action-label,
  .packi-monaco-editor .monaco-menu .monaco-action-bar .action-item .action-label:focus {
    font-size: 14px;
    line-height: 1;
    color: inherit;
    border: 0;
  }

  .packi-monaco-editor .monaco-menu .monaco-action-bar .action-item .action-menu-item,
  .packi-monaco-editor .monaco-menu .monaco-action-bar .action-item .action-menu-item:focus {
    color: inherit !important;
    text-shadow: none !important;
  }

  .packi-monaco-editor .monaco-menu .monaco-action-bar .action-item.disabled .action-menu-item {
    pointer-events: none;
  }

  .packi-monaco-editor .monaco-menu .monaco-action-bar .action-item.focused:not(.disabled),
  .packi-monaco-editor .monaco-menu .monaco-action-bar .action-item:hover:not(.disabled) {
    border-radius: 2px;
    background-color: ${(0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_0__.c)('primary')} !important;
    color: white !important;
  }

  .packi-monaco-editor .monaco-menu .monaco-action-bar .action-item .action-menu-item {
    background-color: transparent !important;
    color: inherit !important;
  }

  .packi-monaco-editor
    .monaco-menu
    .monaco-action-bar
    .action-item
    .action-menu-item:focus:not(.disabled)
    .action-label,
  .packi-monaco-editor
    .monaco-menu
    .monaco-action-bar
    .action-item:hover:not(.disabled)
    .action-label {
    color: inherit;
  }

  .packi-monaco-editor .monaco-menu .monaco-action-bar .keybinding {
    color: inherit;
    font-size: 85%;
    font-family: 'SF Mono', Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
    line-height: 18px;
    opacity: 0.5;
    margin-left: 8px;
  }

  .packi-monaco-editor .monaco-menu .monaco-action-bar .keybinding,
  .packi-monaco-editor .monaco-menu .monaco-action-bar .action-label:not(.separator) {
    padding: 8px 12px;
  }

  .packi-monaco-editor .monaco-action-bar .action-label.separator {
    border-bottom-color: currentColor;
    opacity: 0.1;
  }

  /* Light theme overrides */
  .packi-monaco-editor.theme-light .JsxText {
    color: ${_monaco__WEBPACK_IMPORTED_MODULE_3__.light.colors["editor.foreground"]};
  }

  .packi-monaco-editor.theme-light .JsxSelfClosingElement,
  .packi-monaco-editor.theme-light .JsxOpeningElement,
  .packi-monaco-editor.theme-light .JsxClosingElement,
  .packi-monaco-editor.theme-light .tagName-of-JsxOpeningElement,
  .packi-monaco-editor.theme-light .tagName-of-JsxClosingElement,
  .packi-monaco-editor.theme-light .tagName-of-JsxSelfClosingElement {
    color: ${_colors_light__WEBPACK_IMPORTED_MODULE_2__.syntax.property};
  }

  .packi-monaco-editor.theme-light .name-of-JsxAttribute {
    color: ${_colors_light__WEBPACK_IMPORTED_MODULE_2__.syntax.number};
  }

  .packi-monaco-editor.theme-light .name-of-PropertyAssignment {
    color: ${_colors_light__WEBPACK_IMPORTED_MODULE_2__.syntax.string};
  }

  .packi-monaco-editor.theme-light .name-of-PropertyAccessExpression {
    color: ${_colors_light__WEBPACK_IMPORTED_MODULE_2__.syntax.constant};
  }

  /* Dark theme overrides */
  .packi-monaco-editor.theme-dark .JsxText {
    color: ${_monaco__WEBPACK_IMPORTED_MODULE_3__.dark.colors["editor.foreground"]};
  }

  .packi-monaco-editor.theme-dark .JsxSelfClosingElement,
  .packi-monaco-editor.theme-dark .JsxOpeningElement,
  .packi-monaco-editor.theme-dark .JsxClosingElement,
  .packi-monaco-editor.theme-dark .tagName-of-JsxOpeningElement,
  .packi-monaco-editor.theme-dark .tagName-of-JsxClosingElement,
  .packi-monaco-editor.theme-dark .tagName-of-JsxSelfClosingElement {
    color: ${_colors_dark__WEBPACK_IMPORTED_MODULE_1__.syntax.property};
  }

  .packi-monaco-editor.theme-dark .name-of-JsxAttribute {
    color: ${_colors_dark__WEBPACK_IMPORTED_MODULE_1__.syntax.number};
  }

  .packi-monaco-editor.theme-dark .name-of-PropertyAssignment {
    color: ${_colors_dark__WEBPACK_IMPORTED_MODULE_1__.syntax.string};
  }

  .packi-monaco-editor.theme-dark .name-of-PropertyAccessExpression {
    color: ${_colors_dark__WEBPACK_IMPORTED_MODULE_1__.syntax.constant};
  }

  .packi-monaco-vim-statusbar {
    font-family: ${'var(--font-monospace)'};
    font-size: 12px;
    padding: 0 16px;
    height: 24px;
    line-height: 24px;
    border-top: 1px solid ${(0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_0__.c)('border')};
  }

  .packi-monaco-vim-statusbar input {
    font-family: ${'var(--font-monospace)'};
    height: 100%;
    outline: 0;
    border: 0;
    background: transparent;
  }
`);

/***/ }),

/***/ "./src/components/Editor/themes/monaco.tsx":
/*!*************************************************!*\
  !*** ./src/components/Editor/themes/monaco.tsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "light": () => (/* binding */ light),
/* harmony export */   "dark": () => (/* binding */ dark)
/* harmony export */ });
/* harmony import */ var _colors_dark__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./colors-dark */ "./src/components/Editor/themes/colors-dark.tsx");
/* harmony import */ var _colors_light__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./colors-light */ "./src/components/Editor/themes/colors-light.tsx");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\Editor\themes\monaco.tsx.ittf
    utc time: Fri, 18 Jun 2021 07:59:01 GMT
*/



const c = color => color.substr(1);

const theme = ({
  ui,
  syntax
}, base) => ({
  base,
  inherit: true,
  rules: [{
    token: '',
    foreground: c(syntax.text)
  }, {
    token: 'invalid',
    foreground: c(syntax.invalid)
  }, {
    token: 'emphasis',
    fontStyle: 'italic'
  }, {
    token: 'strong',
    fontStyle: 'bold'
  }, {
    token: 'variable',
    foreground: c(syntax.variable)
  }, {
    token: 'variable.predefined',
    foreground: c(syntax.variable)
  }, {
    token: 'constant',
    foreground: c(syntax.constant)
  }, {
    token: 'comment',
    foreground: c(syntax.comment),
    fontStyle: 'italic'
  }, {
    token: 'number',
    foreground: c(syntax.number)
  }, {
    token: 'number.hex',
    foreground: c(syntax.number)
  }, {
    token: 'regexp',
    foreground: c(syntax.regexp)
  }, {
    token: 'annotation',
    foreground: c(syntax.annotation)
  }, {
    token: 'type',
    foreground: c(syntax.annotation)
  }, {
    token: 'delimiter',
    foreground: c(syntax.text)
  }, {
    token: 'delimiter.html',
    foreground: c(syntax.text)
  }, {
    token: 'delimiter.xml',
    foreground: c(syntax.text)
  }, {
    token: 'tag',
    foreground: c(syntax.tag)
  }, {
    token: 'tag.id.jade',
    foreground: c(syntax.tag)
  }, {
    token: 'tag.class.jade',
    foreground: c(syntax.tag)
  }, {
    token: 'meta.scss',
    foreground: c(syntax.tag)
  }, {
    token: 'metatag',
    foreground: c(syntax.tag)
  }, {
    token: 'metatag.content.html',
    foreground: c(syntax.string)
  }, {
    token: 'metatag.html',
    foreground: c(syntax.tag)
  }, {
    token: 'metatag.xml',
    foreground: c(syntax.tag)
  }, {
    token: 'metatag.php',
    fontStyle: 'bold'
  }, {
    token: 'key',
    foreground: c(syntax.property)
  }, {
    token: 'string.key.json',
    foreground: c(syntax.property)
  }, {
    token: 'string.value.json',
    foreground: c(syntax.string)
  }, {
    token: 'attribute.name',
    foreground: c(syntax.constant)
  }, {
    token: 'attribute.value',
    foreground: c(syntax.property)
  }, {
    token: 'attribute.value.number',
    foreground: c(syntax.number)
  }, {
    token: 'attribute.value.unit',
    foreground: c(syntax.string)
  }, {
    token: 'attribute.value.html',
    foreground: c(syntax.string)
  }, {
    token: 'attribute.value.xml',
    foreground: c(syntax.string)
  }, {
    token: 'string',
    foreground: c(syntax.string)
  }, {
    token: 'string.html',
    foreground: c(syntax.string)
  }, {
    token: 'string.sql',
    foreground: c(syntax.string)
  }, {
    token: 'string.yaml',
    foreground: c(syntax.string)
  }, {
    token: 'keyword',
    foreground: c(syntax.keyword)
  }, {
    token: 'keyword.json',
    foreground: c(syntax.keyword)
  }, {
    token: 'keyword.flow',
    foreground: c(syntax.keyword)
  }, {
    token: 'keyword.flow.scss',
    foreground: c(syntax.keyword)
  }, {
    token: 'operator.scss',
    foreground: c(syntax.operator)
  }, {
    token: 'operator.sql',
    foreground: c(syntax.operator)
  }, {
    token: 'operator.swift',
    foreground: c(syntax.operator)
  }, {
    token: 'predefined.sql',
    foreground: c(syntax.predefined)
  }],
  colors: {
    'editor.background': ui.background,
    'editor.foreground': ui.text,
    'editorIndentGuide.background': ui.indent.inactive,
    'editorIndentGuide.activeBackground': ui.indent.active,
    'editorOverviewRuler.border': ui.background
  }
});

const light = theme(_colors_light__WEBPACK_IMPORTED_MODULE_1__, 'vs');
const dark = theme(_colors_dark__WEBPACK_IMPORTED_MODULE_0__, 'vs-dark');

/***/ }),

/***/ "./src/components/widgets/ResizeDetector.tsx":
/*!***************************************************!*\
  !*** ./src/components/widgets/ResizeDetector.tsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResizeDetector)
/* harmony export */ });
/* harmony import */ var aphrodite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aphrodite */ "./node_modules/aphrodite/no-important.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\widgets\ResizeDetector.tsx.ittf
    utc time: Fri, 18 Jun 2021 07:59:01 GMT
*/



let ResizeDetector = /*#__PURE__*/function (_React$Component) {
  _inherits(ResizeDetector, _React$Component);

  var _super = _createSuper(ResizeDetector);

  function ResizeDetector(...args) {
    var _this;

    _classCallCheck(this, ResizeDetector);

    _this = _super.call(this, ...args);

    _defineProperty(_assertThisInitialized(_this), "_handleResize", () => _this.props.onResize());

    _defineProperty(_assertThisInitialized(_this), "_horizontal", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createRef());

    _defineProperty(_assertThisInitialized(_this), "_vertical", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createRef());

    return _this;
  }

  _createClass(ResizeDetector, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _horiz$contentWindow, _horiz$contentWindow$, _verti$contentWindow, _verti$contentWindow$;

      const horiz = this._horizontal.current;
      const verti = this._vertical.current;
      horiz === null || horiz === void 0 ? void 0 : (_horiz$contentWindow = horiz.contentWindow) === null || _horiz$contentWindow === void 0 ? void 0 : (_horiz$contentWindow$ = _horiz$contentWindow.addEventListener) === null || _horiz$contentWindow$ === void 0 ? void 0 : _horiz$contentWindow$.call(_horiz$contentWindow, 'resize', this._handleResize);
      verti === null || verti === void 0 ? void 0 : (_verti$contentWindow = verti.contentWindow) === null || _verti$contentWindow === void 0 ? void 0 : (_verti$contentWindow$ = _verti$contentWindow.addEventListener) === null || _verti$contentWindow$ === void 0 ? void 0 : _verti$contentWindow$.call(_verti$contentWindow, 'resize', this._handleResize);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _horiz$contentWindow2, _horiz$contentWindow3, _verti$contentWindow2, _verti$contentWindow3;

      const horiz = this._horizontal.current;
      const verti = this._vertical.current;
      horiz === null || horiz === void 0 ? void 0 : (_horiz$contentWindow2 = horiz.contentWindow) === null || _horiz$contentWindow2 === void 0 ? void 0 : (_horiz$contentWindow3 = _horiz$contentWindow2.removeEventListener) === null || _horiz$contentWindow3 === void 0 ? void 0 : _horiz$contentWindow3.call(_horiz$contentWindow2, 'resize', this._handleResize);
      verti === null || verti === void 0 ? void 0 : (_verti$contentWindow2 = verti.contentWindow) === null || _verti$contentWindow2 === void 0 ? void 0 : (_verti$contentWindow3 = _verti$contentWindow2.removeEventListener) === null || _verti$contentWindow3 === void 0 ? void 0 : _verti$contentWindow3.call(_verti$contentWindow2, 'resize', this._handleResize);
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.container)
      }, "/** * pointer-events: none is not working properly on EDGE, so we render 2 iframes to detect resize instead of one iframe covering the entire editor */", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("iframe", {
        ref: this._horizontal,
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.phantom, styles.horizontal)
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("iframe", {
        ref: this._vertical,
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.phantom, styles.vertical)
      }), this.props.children);
    }
  }]);

  return ResizeDetector;
}(react__WEBPACK_IMPORTED_MODULE_1__.Component);


const styles = aphrodite__WEBPACK_IMPORTED_MODULE_0__.StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    minWidth: 0,
    minHeight: 0,
    position: 'relative'
  },
  phantom: {
    display: 'block',
    position: 'absolute',
    left: 0,
    top: 0,
    pointerEvents: 'none',
    opacity: 0
  },
  horizontal: {
    height: 1,
    width: '100%'
  },
  vertical: {
    height: '100%',
    width: 1
  }
});

/***/ }),

/***/ "./src/features/prettier/index.tsx":
/*!*****************************************!*\
  !*** ./src/features/prettier/index.tsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "prettierCode": () => (/* reexport safe */ _prettierCode__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _prettierCode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./prettierCode */ "./src/features/prettier/prettierCode.tsx");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\features\prettier\index.tsx.ittf
    utc time: Fri, 18 Jun 2021 07:59:01 GMT
*/



/***/ }),

/***/ "./src/features/prettier/prettierCode.tsx":
/*!************************************************!*\
  !*** ./src/features/prettier/prettierCode.tsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ prettierCode)
/* harmony export */ });
/* harmony import */ var _file_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../file/index */ "./src/features/file/index.tsx");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\features\prettier\prettierCode.tsx.ittf
    utc time: Fri, 18 Jun 2021 07:59:01 GMT
*/

async function prettierCode(path, code) {
  const language = (0,_file_index__WEBPACK_IMPORTED_MODULE_0__.getFileLanguage)(path);
  let parser;
  let plugins;

  switch (language) {
    case 'javascript':
      {
        parser = 'babel';
        plugins = [await __webpack_require__.e(/*! import() | prettier/parser-babel */ "prettier/parser-babel").then(__webpack_require__.t.bind(__webpack_require__, /*! prettier/parser-babel */ "./node_modules/prettier/parser-babel.js", 23))];
        break;
      }

    case 'typescript':
      {
        parser = 'typescript';
        plugins = [await Promise.all(/*! import() | prettier/parser-typescript */[__webpack_require__.e("vendors-node_modules_prettier_parser-typescript_js"), __webpack_require__.e("prettier/parser-typescript")]).then(__webpack_require__.t.bind(__webpack_require__, /*! prettier/parser-typescript */ "./node_modules/prettier/parser-typescript.js", 23))];
        break;
      }

    case 'markdown':
      {
        parser = 'markdown';
        plugins = await Promise.all([__webpack_require__.e(/*! import() | prettier/parser-babel */ "prettier/parser-babel").then(__webpack_require__.t.bind(__webpack_require__, /*! prettier/parser-babel */ "./node_modules/prettier/parser-babel.js", 23)), Promise.all(/*! import() | prettier/parser-typescript */[__webpack_require__.e("vendors-node_modules_prettier_parser-typescript_js"), __webpack_require__.e("prettier/parser-typescript")]).then(__webpack_require__.t.bind(__webpack_require__, /*! prettier/parser-typescript */ "./node_modules/prettier/parser-typescript.js", 23)), __webpack_require__.e(/*! import() | prettier/parser-markdown */ "prettier/parser-markdown").then(__webpack_require__.t.bind(__webpack_require__, /*! prettier/parser-markdown */ "./node_modules/prettier/parser-markdown.js", 23))]);
        ;
        break;
      }
  }

  if (parser && plugins) {
    const prettier = await Promise.all(/*! import() | prettier/standalone */[__webpack_require__.e("vendors-node_modules_prettier_parser-typescript_js"), __webpack_require__.e("prettier/parser-babel"), __webpack_require__.e("prettier/parser-markdown"), __webpack_require__.e("vendors-node_modules_prettier_standalone_js"), __webpack_require__.e("prettier/standalone")]).then(__webpack_require__.t.bind(__webpack_require__, /*! prettier/standalone */ "./node_modules/prettier/standalone.js", 23));
    const {
      default: config
    } = await __webpack_require__.e(/*! import() | prettier.json */ "prettier.json").then(__webpack_require__.t.bind(__webpack_require__, /*! ./prettier.json */ "./src/features/prettier/prettier.json", 19));
    return prettier.format(code, _objectSpread({
      parser,
      plugins
    }, config));
  }

  return code;
}

/***/ })

}]);
//# sourceMappingURL=MonacoEditor.58b21b3bedcff255b40d.chunk.js.map