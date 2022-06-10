(self["webpackChunkwizzi_editor"] = self["webpackChunkwizzi_editor"] || []).push([["EditorView/EditorView"],{

/***/ "./src/components/EditorView/EditorFooter.tsx":
/*!****************************************************!*\
  !*** ./src/components/EditorView/EditorFooter.tsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditorFooter": () => (/* binding */ EditorFooter),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var aphrodite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aphrodite */ "./node_modules/aphrodite/no-important.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _KeyboardShortcuts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./KeyboardShortcuts */ "./src/components/EditorView/KeyboardShortcuts.tsx");
/* harmony import */ var _features_preferences__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../features/preferences */ "./src/features/preferences/index.tsx");
/* harmony import */ var _shell_FooterShell__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shell/FooterShell */ "./src/components/shell/FooterShell.tsx");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../ThemeProvider */ "./src/components/ThemeProvider.tsx");
/* harmony import */ var _widgets_IconButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../widgets/IconButton */ "./src/components/widgets/IconButton.tsx");
/* harmony import */ var _widgets_LoadingText__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../widgets/LoadingText */ "./src/components/widgets/LoadingText.tsx");
/* harmony import */ var _widgets_MenuButton__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../widgets/MenuButton */ "./src/components/widgets/MenuButton.tsx");
/* harmony import */ var _widgets_ShortcutLabel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../widgets/ShortcutLabel */ "./src/components/widgets/ShortcutLabel.tsx");
/* harmony import */ var _widgets_ToggleSwitch__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../widgets/ToggleSwitch */ "./src/components/widgets/ToggleSwitch.tsx");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\EditorView\EditorFooter.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/












function EditorFooterComp(props) {
  const {
    annotations,
    fileTreeShown,
    previewShown,
    panelsShown,
    sendCodeOnChangeEnabled,
    sdkVersion,
    isLocalWebPreview,
    onSendCode,
    onToggleTheme,
    onTogglePanels,
    onToggleFileTree,
    onTogglePreview,
    onToggleSendCode,
    onShowShortcuts,
    theme,
    loggedUid,
    autoGenSingleDoc,
    autoExecJob,
    trustLocalStorage
  } = props;

  const _toggleAutoGenSingleDoc = () => props.setPreferences({
    autoGenSingleDoc: !props.preferences.autoGenSingleDoc
  });

  const _toggleAutoExecJob = () => props.setPreferences({
    autoExecJob: !props.preferences.autoExecJob
  });

  const _toggleTrustLocalStorage = () => props.setPreferences({
    trustLocalStorage: !props.preferences.trustLocalStorage
  });

  const loadingItems = annotations.filter(a => a.severity < 0);
  const isLoading = loadingItems.length >= 1;
  const isErrorFatal = !isLoading && annotations.some(a => a.severity > 3);
  const warningCount = annotations.filter(a => a.severity === 2).length;
  let text;

  if (isLoading) {
    text = isLoading ? `${loadingItems[0].message}${loadingItems.length > 1 ? ` (+${loadingItems.length - 1} more)` : ''}
            ` : '';
  } else {
    const errors = annotations.filter(a => a.severity >= 3);

    if (errors.length) {
      const {
        message,
        location,
        action
      } = errors[0];
      const prefix = location ? `${location.fileName} (${location.startLineNumber}:${location.startColumn}) ` : '';
      const suffix = action ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.action),
        onClick: event => {
          event.stopPropagation();
          action.run();
        }
      }, action.title) : errors.length > 1 ? `(+${errors.length - 1} more)` : '';
      text = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, prefix, message.split('\n')[0] + ' ', suffix);
    }
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_shell_FooterShell__WEBPACK_IMPORTED_MODULE_4__.FooterShell, {
    type: isLoading ? 'loading' : isErrorFatal ? 'error' : null
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.left)
  }, isLoading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_LoadingText__WEBPACK_IMPORTED_MODULE_7__.default, {
    className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.loadingText),
    onClick: () => onTogglePanels('errors')
  }, text) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", {
    onClick: () => onTogglePanels(text ? 'errors' : undefined),
    className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.statusText, text ? isErrorFatal ? styles.errorTextFatal : styles.errorText : styles.successText)
  }, text ?? `No errors${warningCount ? `, ${warningCount} warning${warningCount > 1 ? 's' : ''}
                                    ` : ''}
                                `)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_MenuButton__WEBPACK_IMPORTED_MODULE_8__.default, {
    icon: __webpack_require__(/*! ../../assets/settings-icon.png */ "./src/assets/settings-icon.png"),
    label: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", {
      className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.buttonLabel)
    }, "Auth"),
    content: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
      style: {
        paddingLeft: '15px'
      }
    }, "Logged uid:", loggedUid), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_ToggleSwitch__WEBPACK_IMPORTED_MODULE_10__.default, {
      checked: trustLocalStorage,
      onChange: _toggleTrustLocalStorage,
      label: "Trust local storage"
    }))
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_MenuButton__WEBPACK_IMPORTED_MODULE_8__.default, {
    icon: __webpack_require__(/*! ../../assets/settings-icon.png */ "./src/assets/settings-icon.png"),
    label: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", {
      className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.buttonLabel)
    }, "Wizzi"),
    content: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_ToggleSwitch__WEBPACK_IMPORTED_MODULE_10__.default, {
      checked: autoGenSingleDoc,
      onChange: _toggleAutoGenSingleDoc,
      label: "Auto gen single doc"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_ToggleSwitch__WEBPACK_IMPORTED_MODULE_10__.default, {
      checked: autoExecJob,
      onChange: _toggleAutoExecJob,
      label: "Auto exec job"
    }))
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_MenuButton__WEBPACK_IMPORTED_MODULE_8__.default, {
    icon: __webpack_require__(/*! ../../assets/settings-icon.png */ "./src/assets/settings-icon.png"),
    label: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", {
      className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.buttonLabel)
    }, "Editor"),
    content: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
      className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.buttonItem, styles.buttonItemEditorPane),
      onClick: onShowShortcuts
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_IconButton__WEBPACK_IMPORTED_MODULE_6__.default, {
      small: true,
      title: "Show keyboard shortcuts",
      label: "Shortcuts"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_ShortcutLabel__WEBPACK_IMPORTED_MODULE_9__.default, {
      combo: _KeyboardShortcuts__WEBPACK_IMPORTED_MODULE_2__.Shortcuts.shortcuts.combo,
      className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.buttonItemShortcut)
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
      className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.menuSeparator)
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_ToggleSwitch__WEBPACK_IMPORTED_MODULE_10__.default, {
      checked: fileTreeShown,
      onChange: onToggleFileTree,
      label: "Files"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_ToggleSwitch__WEBPACK_IMPORTED_MODULE_10__.default, {
      checked: panelsShown,
      onChange: () => onTogglePanels(),
      label: "Panel"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_ToggleSwitch__WEBPACK_IMPORTED_MODULE_10__.default, {
      checked: theme !== 'light',
      onChange: onToggleTheme,
      label: "Dark theme"
    }))
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.devicePreviewSwitch)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_ToggleSwitch__WEBPACK_IMPORTED_MODULE_10__.default, {
    checked: previewShown,
    onChange: onTogglePreview,
    label: "Preview"
  })));
}

const EditorFooter = (0,_features_preferences__WEBPACK_IMPORTED_MODULE_3__.withPreferences)(EditorFooterComp);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EditorFooter);
const styles = aphrodite__WEBPACK_IMPORTED_MODULE_0__.StyleSheet.create({
  left: {
    display: 'flex',
    alignItems: 'stretch',
    flex: 1,
    minWidth: 0,
    overflow: 'hidden'
  },
  loadingText: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    padding: '.5em',
    width: '100%',
    cursor: 'pointer'
  },
  statusText: {
    border: 0,
    outline: 0,
    margin: 0,
    appearance: 'none',
    backgroundColor: 'transparent',
    backgroundSize: 16,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '1em center',
    display: 'inline-block',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    padding: '.25em .5em .25em 3em',
    minWidth: 200,
    width: '100%',
    textAlign: 'left'
  },
  successText: {
    backgroundImage: `url(${__webpack_require__(/*! ../../assets/checkmark.png */ "./src/assets/checkmark.png")})`
  },
  errorText: {
    backgroundImage: `url(${__webpack_require__(/*! ../../assets/cross-red.png */ "./src/assets/cross-red.png")})`,
    color: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__.c)('error')
  },
  errorTextFatal: {
    backgroundImage: `url(${__webpack_require__(/*! ../../assets/cross-light.png */ "./src/assets/cross-light.png")})`
  },
  errorBorder: {
    borderColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__.c)('error-text')
  },
  devicesCount: {
    position: 'absolute',
    top: 4,
    right: 6,
    height: 20,
    minWidth: 20,
    borderRadius: '50%',
    backgroundColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__.c)('text'),
    color: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__.c)('background'),
    opacity: 0.5
  },
  devicePane: {
    padding: '0 16px'
  },
  devicePaneItem: {
    margin: '0 -16px'
  },
  deviceLabel: {
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    padding: '8px 0'
  },
  deviceIcon: {
    height: 16,
    width: 16,
    marginRight: 8,
    fill: 'currentColor'
  },
  noDevicesMessage: {
    whiteSpace: 'nowrap',
    margin: 8
  },
  buttonLabel: {
    display: 'none',
    [`@media (min-width: ${700 + 20}px)`]: {
      display: 'inline'
    }
  },
  buttonItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  buttonItemShortcut: {
    userSelect: 'none',
    cursor: 'pointer',
    marginLeft: 12
  },
  buttonItemEditorPane: {
    margin: '0 12px'
  },
  title: {
    margin: '16px 0 8px'
  },
  action: {
    textDecoration: 'underline',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  devicePreviewSwitch: {
    display: 'none',
    [`@media (min-width: ${700}px)`]: {
      display: 'block'
    }
  },
  menuSeparator: {
    margin: '6px 0',
    borderBottom: `1px solid ${(0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__.c)('border')}`
  }
});

/***/ }),

/***/ "./src/components/EditorView/EditorPanels.tsx":
/*!****************************************************!*\
  !*** ./src/components/EditorView/EditorPanels.tsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EditorPanels)
/* harmony export */ });
/* harmony import */ var aphrodite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aphrodite */ "./node_modules/aphrodite/no-important.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _ProblemsPanel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ProblemsPanel */ "./src/components/EditorView/ProblemsPanel.tsx");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ThemeProvider */ "./src/components/ThemeProvider.tsx");
/* harmony import */ var _widgets_ResizablePane__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../widgets/ResizablePane */ "./src/components/widgets/ResizablePane.tsx");
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
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\EditorView\EditorPanels.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/






let EditorPanels = /*#__PURE__*/function (_React$Component) {
  _inherits(EditorPanels, _React$Component);

  var _super = _createSuper(EditorPanels);

  function EditorPanels(...args) {
    var _this;

    _classCallCheck(this, EditorPanels);

    _this = _super.call(this, ...args);

    _defineProperty(_assertThisInitialized(_this), "_isScrolled", false);

    _defineProperty(_assertThisInitialized(_this), "_panel", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createRef());

    return _this;
  }

  _createClass(EditorPanels, [{
    key: "getSnapshotBeforeUpdate",
    value: function getSnapshotBeforeUpdate(prevProps) {
      return null;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {}
  }, {
    key: "render",
    value: function render() {
      const {
        annotations,
        onSelectFile,
        onShowErrorPanel,
        onTogglePanels,
        panelType
      } = this.props;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_ResizablePane__WEBPACK_IMPORTED_MODULE_4__.default, {
        direction: "vertical",
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.container)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.panels)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.header)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", {
        onClick: onShowErrorPanel,
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.tab, panelType !== 'errors' && styles.inactive)
      }, "Problems"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.buttons)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", {
        onClick: () => onTogglePanels(),
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.button, styles.close)
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
        ref: this._panel,
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.panel)
      }, panelType === 'errors' ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_ProblemsPanel__WEBPACK_IMPORTED_MODULE_2__.default, {
        annotations: annotations,
        onSelectFile: onSelectFile
      }) : null)));
    }
  }]);

  return EditorPanels;
}(react__WEBPACK_IMPORTED_MODULE_1__.Component);


const styles = aphrodite__WEBPACK_IMPORTED_MODULE_0__.StyleSheet.create({
  container: {
    height: '14em'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: '.75em'
  },
  tab: {
    display: 'inline-block',
    appearance: 'none',
    background: 'none',
    border: 'none',
    margin: 0,
    padding: '.35em 1.5em',
    fontSize: '.9em',
    textTransform: 'uppercase',
    outline: 'none',
    opacity: 1
  },
  inactive: {
    opacity: 0.5
  },
  buttons: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: '0 1em'
  },
  button: {
    height: 24,
    width: 24,
    border: 0,
    outline: 0,
    margin: '0 .5em',
    appearance: 'none',
    backgroundColor: 'transparent',
    backgroundSize: 16,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  close: {
    backgroundImage: `url(${__webpack_require__(/*! ../../assets/cross.png */ "./src/assets/cross.png")})`
  },
  clear: {
    backgroundImage: `url(${__webpack_require__(/*! ../../assets/clear.png */ "./src/assets/clear.png")})`
  },
  panels: {
    backgroundColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('content'),
    borderColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('border'),
    borderWidth: '1px 0 0 0',
    borderStyle: 'solid',
    height: '100%',
    minHeight: 0
  },
  panel: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
    padding: '.5em 0 .75em 0',
    overflow: 'auto',
    height: 'calc(100% - 2.5em)'
  }
});

/***/ }),

/***/ "./src/components/EditorView/EditorTitle.tsx":
/*!***************************************************!*\
  !*** ./src/components/EditorView/EditorTitle.tsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditorTitle": () => (/* binding */ EditorTitle),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var aphrodite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aphrodite */ "./node_modules/aphrodite/no-important.js");
/* harmony import */ var date_fns_formatDistance__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! date-fns/formatDistance */ "./node_modules/date-fns/esm/formatDistance/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ThemeProvider */ "./src/components/ThemeProvider.tsx");
/* harmony import */ var _EditorTitleName__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EditorTitleName */ "./src/components/EditorView/EditorTitleName.tsx");
/* harmony import */ var _ModalEditTitleAndDescription__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ModalEditTitleAndDescription */ "./src/components/EditorView/ModalEditTitleAndDescription.tsx");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\EditorView\EditorTitle.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/






function EditorTitle(props) {
  const [date, setDate] = react__WEBPACK_IMPORTED_MODULE_1__.useState(new Date());
  react__WEBPACK_IMPORTED_MODULE_1__.useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 10000);
    return () => clearInterval(timer);
  }, []);
  const {
    description,
    name,
    createdAt,
    saveHistory,
    saveStatus,
    viewer,
    isEditModalVisible,
    onShowEditModal,
    onSubmitMetadata,
    onDismissEditModal
  } = props;
  const lastSave = saveHistory.length ? saveHistory[0] : null;
  const savedAt = lastSave ? lastSave.savedAt : createdAt;
  const hasPermanentHistory = saveHistory ? saveHistory.some(item => !item.isDraft) : false;
  let statusText;

  if (viewer) {
    if (saveStatus === 'saving-draft' || saveStatus === 'publishing') {
      statusText = 'Saving changes…';
    } else {
      if (savedAt) {
        const dtSavedAt = new Date(savedAt);
        const timestamp = date > dtSavedAt ? `${(0,date_fns_formatDistance__WEBPACK_IMPORTED_MODULE_5__.default)(date, dtSavedAt, {
          includeSeconds: true,
          addSuffix: true
        })}` : '';

        if (saveStatus === 'unsaved' || saveStatus === 'edited') {
          statusText = `Last saved ${timestamp}`;
        } else {
          statusText = `All changes saved ${timestamp}`;
        }
      } else {
        statusText = 'Not saved yet';
      }
    }

    statusText = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", {
      className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.statusText)
    }, statusText, "."), ' ');
  } else {
    // User is a guest
    statusText = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("a", {
      href: "#",
      className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.textButton)
    }, "Log in"), ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", {
      className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.statusText)
    }, "to save your changes as you work"));
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.container)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.header)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_EditorTitleName__WEBPACK_IMPORTED_MODULE_3__.default, {
    name: name,
    description: description,
    onSubmitMetadata: onSubmitMetadata,
    onShowEditModal: onShowEditModal
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.metadata)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", {
    className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.status)
  }, statusText), viewer && saveStatus === 'saving-draft' ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.spinner)
  }) : null, viewer && saveStatus === 'saved-draft' || saveStatus === 'published' ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("svg", {
    className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.check),
    width: "11px",
    height: "8px",
    viewBox: "0 0 11 8"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("polygon", {
    fill: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__.c)('success'),
    points: "3.34328358 6.32835821 0.835820896 3.82089552 0 4.65671642 3.34328358 8 10.5074627 0.835820896 9.67164179 0"
  })) : null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_ModalEditTitleAndDescription__WEBPACK_IMPORTED_MODULE_4__.default, {
    title: "Edit Packi Details",
    action: "Done",
    visible: isEditModalVisible,
    onDismiss: onDismissEditModal,
    onSubmit: details => {
      onSubmitMetadata(details);
      onDismissEditModal();
    },
    description: description,
    name: name
  }));
}
const spin = {
  from: {
    transform: 'rotate(0deg)'
  },
  to: {
    transform: 'rotate(360deg)'
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EditorTitle);
const styles = aphrodite__WEBPACK_IMPORTED_MODULE_0__.StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    minWidth: 0,
    height: '100%'
  },
  header: {
    minWidth: 0,
    marginRight: 16
  },
  metadata: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  status: {
    fontSize: 14,
    margin: '-2px 4px 0 6px',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },
  textButton: {
    appearance: 'none',
    background: 'none',
    border: 0,
    color: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__.c)('text'),
    margin: 0,
    padding: 0,
    textDecoration: 'underline'
  },
  statusText: {
    opacity: 0.5
  },
  spinner: {
    borderStyle: 'solid',
    borderTopColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__.c)('selected'),
    borderLeftColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__.c)('selected'),
    borderBottomColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__.c)('selected'),
    borderRightColor: 'rgba(0, 0, 0, .16)',
    borderWidth: 1,
    height: 12,
    width: 12,
    borderRadius: '50%',
    margin: '0 4px',
    animationDuration: '1s',
    animationName: [spin],
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear'
  },
  check: {
    marginBottom: -4
  }
});

/***/ }),

/***/ "./src/components/EditorView/EditorTitleName.tsx":
/*!*******************************************************!*\
  !*** ./src/components/EditorView/EditorTitleName.tsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var aphrodite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aphrodite */ "./node_modules/aphrodite/no-important.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _features_preferences__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../features/preferences */ "./src/features/preferences/index.tsx");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ThemeProvider */ "./src/components/ThemeProvider.tsx");
/* harmony import */ var _widgets_Popover__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../widgets/Popover */ "./src/components/widgets/Popover.tsx");
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
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\EditorView\EditorTitleName.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/





const RETURN_KEYCODE = 13;
const ESCAPE_KEYCODE = 27;

function validateName(name) {
  return name ? /^[a-z_\-\d\s]+$/i.test(name) ? null : new Error('Name can only contain letters, numbers, space, hyphen (-) and underscore (_).') : new Error('Name cannot be empty.');
}

let EditorTitleName = /*#__PURE__*/function (_React$Component) {
  _inherits(EditorTitleName, _React$Component);

  var _super = _createSuper(EditorTitleName);

  function EditorTitleName(...args) {
    var _this;

    _classCallCheck(this, EditorTitleName);

    _this = _super.call(this, ...args);

    _defineProperty(_assertThisInitialized(_this), "state", {
      name: _this.props.name || '',
      focused: false
    });

    _defineProperty(_assertThisInitialized(_this), "_handleChangeText", e => _this.setState({
      name: e.target.value
    }));

    _defineProperty(_assertThisInitialized(_this), "_handleFocus", e => {
      e.target.select();

      _this.setState({
        focused: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_handleBlur", async () => {
      if (!validateName(_this.state.name)) {
        await _this.props.onSubmitMetadata({
          name: _this.state.name,
          description: _this.props.description ?? ''
        });
      }

      _this.setState({
        focused: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_handleKeyDown", e => {
      if ((e.keyCode === RETURN_KEYCODE || e.keyCode === ESCAPE_KEYCODE) && !validateName(_this.state.name)) {
        e.target.blur();
      }
    });

    return _this;
  }

  _createClass(EditorTitleName, [{
    key: "render",
    value: function render() {
      const {
        name
      } = this.state;
      const {
        description,
        onShowEditModal,
        theme
      } = this.props;
      const error = validateName(name);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.container)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.titleContainer)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("h1", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.title)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.content)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.field, styles.phantom)
      }, name.replace(/\n/g, '')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", {
        onFocus: this._handleFocus,
        onBlur: this._handleBlur,
        onKeyDown: this._handleKeyDown,
        value: name,
        onChange: this._handleChangeText,
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.field, styles.editable)
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_Popover__WEBPACK_IMPORTED_MODULE_4__.default, {
        content: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", {
          className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.description)
        }, description ?? DEFAULT_PACKI_DESCRIPTION), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", {
          onClick: onShowEditModal,
          className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.editButton)
        }, "Edit details"))
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.icon, theme === 'light' ? styles.infoLight : styles.infoDark)
      }))), this.state.focused && error ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.validation)
      }, error.message) : null);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (state.name !== props.name && !state.focused) {
        return {
          name: props.name || ''
        };
      }

      return null;
    }
  }]);

  return EditorTitleName;
}(react__WEBPACK_IMPORTED_MODULE_1__.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_features_preferences__WEBPACK_IMPORTED_MODULE_2__.withThemeName)(EditorTitleName));
const styles = aphrodite__WEBPACK_IMPORTED_MODULE_0__.StyleSheet.create({
  container: {},
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  title: {
    fontSize: '1.3em',
    lineHeight: '1.3em',
    fontWeight: 600,
    margin: 0,
    position: 'relative',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '100%'
  },
  field: {
    display: 'inline-block',
    margin: 0,
    padding: '1px 6px'
  },
  editable: {
    position: 'absolute',
    appearance: 'none',
    background: 'none',
    outline: 0,
    border: 0,
    left: 0,
    width: '100%',
    borderRadius: 3,
    ':hover': {
      boxShadow: `inset 0 0 0 1px ${(0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('border')}`
    },
    ':focus': {
      boxShadow: `inset 0 0 0 1px ${(0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('selected')}`
    },
    ':hover:focus': {
      boxShadow: `inset 0 0 0 1px ${(0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('selected')}`
    }
  },
  phantom: {
    display: 'inline-block',
    maxWidth: '100%',
    pointerEvents: 'none',
    whiteSpace: 'pre',
    overflow: 'hidden',
    opacity: 0
  },
  validation: {
    position: 'absolute',
    backgroundColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('error'),
    color: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('error-text'),
    fontSize: 13,
    fontWeight: 'normal',
    padding: '6px 12px',
    borderRadius: 3,
    marginTop: 8,
    textAlign: 'left',
    zIndex: 1000,
    minWidth: 100,
    ':before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      bottom: '100%',
      width: 0,
      height: 0,
      borderLeft: '6px solid transparent',
      borderRight: '6px solid transparent',
      borderBottom: `6px solid ${(0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('error')}`
    }
  },
  icon: {
    display: 'block',
    position: 'relative',
    appearance: 'none',
    backgroundColor: 'transparent',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 16,
    backgroundPosition: 'center',
    border: 0,
    outline: 0,
    margin: 0,
    padding: 0,
    height: 24,
    width: 24,
    opacity: 0.3,
    transition: '.2s',
    ':hover': {
      opacity: 0.8
    }
  },
  description: {
    margin: 16
  },
  infoLight: {
    backgroundImage: `url(${__webpack_require__(/*! ../../assets/info-icon.png */ "./src/assets/info-icon.png")})`
  },
  infoDark: {
    backgroundImage: `url(${__webpack_require__(/*! ../../assets/info-icon-light.png */ "./src/assets/info-icon-light.png")})`
  },
  editButton: {
    width: '100%',
    background: 'none',
    outline: 0,
    border: 'none',
    borderTop: `1px solid ${(0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('border')}`,
    color: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('primary'),
    padding: '8px 16px',
    fontWeight: 'bold',
    ':hover': {
      backgroundColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('hover')
    }
  }
});

/***/ }),

/***/ "./src/components/EditorView/EditorToolbar.tsx":
/*!*****************************************************!*\
  !*** ./src/components/EditorView/EditorToolbar.tsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditorToolbar": () => (/* binding */ EditorToolbar),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var aphrodite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aphrodite */ "./node_modules/aphrodite/no-important.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _EditorTitle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EditorTitle */ "./src/components/EditorView/EditorTitle.tsx");
/* harmony import */ var _features_preferences__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../features/preferences */ "./src/features/preferences/index.tsx");
/* harmony import */ var _shell_ToolbarShell__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shell/ToolbarShell */ "./src/components/shell/ToolbarShell.tsx");
/* harmony import */ var _shell_ToolbarTitleShell__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shell/ToolbarTitleShell */ "./src/components/shell/ToolbarTitleShell.tsx");
/* harmony import */ var _UserMenu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./UserMenu */ "./src/components/EditorView/UserMenu.tsx");
/* harmony import */ var _widgets_Button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../widgets/Button */ "./src/components/widgets/Button.tsx");
/* harmony import */ var _widgets_IconButton__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../widgets/IconButton */ "./src/components/widgets/IconButton.tsx");
/* harmony import */ var _assets_packi_icon_dark_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../assets/packi-icon-dark.svg */ "./src/assets/packi-icon-dark.svg");
/* harmony import */ var _assets_packi_icon_svg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../assets/packi-icon.svg */ "./src/assets/packi-icon.svg");
/* harmony import */ var _material_ui_core_Select__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/Select */ "./node_modules/@material-ui/core/esm/Select/Select.js");
/* harmony import */ var _material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/core/MenuItem */ "./node_modules/@material-ui/core/esm/MenuItem/MenuItem.js");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\EditorView\EditorToolbar.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/













function EditorToolbar(props) {
  const [preferences] = (0,_features_preferences__WEBPACK_IMPORTED_MODULE_3__.usePreferences)();
  const {
    name,
    description,
    createdAt,
    saveHistory,
    saveStatus,
    viewer,
    isDownloading,
    isEditModalVisible,
    onSubmitMetadata,
    onShowEditModal,
    onDismissEditModal,
    onDownloadCode,
    onPublishAsync,
    splitViewKind,
    onChangeSplitViewKind,
    onLoggedOn,
    onLoggedOff,
    loggedUser,
    isAuthModalVisible,
    isWizziJobWaiting,
    onExecuteWizziJob,
    onShowPackiManager
  } = props;
  const {
    theme
  } = preferences;
  const isPublishing = saveStatus === 'publishing';
  const isPublished = saveStatus === 'published';
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_shell_ToolbarShell__WEBPACK_IMPORTED_MODULE_4__.ToolbarShell, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_shell_ToolbarTitleShell__WEBPACK_IMPORTED_MODULE_5__.ToolbarTitleShell, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("img", {
    src: theme === 'dark' ? _assets_packi_icon_dark_svg__WEBPACK_IMPORTED_MODULE_9__.default : _assets_packi_icon_svg__WEBPACK_IMPORTED_MODULE_10__.default,
    alt: "Packi",
    className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.logo)
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_EditorTitle__WEBPACK_IMPORTED_MODULE_2__.default, {
    name: name,
    description: description,
    createdAt: createdAt,
    saveHistory: saveHistory,
    saveStatus: saveStatus,
    viewer: viewer,
    isEditModalVisible: isEditModalVisible,
    onSubmitMetadata: onSubmitMetadata,
    onShowEditModal: onShowEditModal,
    onDismissEditModal: onDismissEditModal
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.buttons)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_Button__WEBPACK_IMPORTED_MODULE_7__.Button, {
    variant: "secondary",
    onClick: () => onPublishAsync(),
    disabled: isPublishing || isPublished,
    loading: isPublishing,
    className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.saveButton)
  }, isPublishing ? 'Saving…' : isPublished ? 'Saved' : 'Save'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_11__.default, {
    value: splitViewKind,
    onChange: onChangeSplitViewKind
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_12__.default, {
    value: 'left'
  }, "Left"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_12__.default, {
    value: 'right'
  }, "Right"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_12__.default, {
    value: 'both'
  }, "Both")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_IconButton__WEBPACK_IMPORTED_MODULE_8__.default, {
    responsive: true,
    title: "Download as zip",
    onClick: onDownloadCode,
    disabled: isDownloading || isPublishing
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("svg", {
    width: "20",
    height: "20"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("path", {
    d: "M14.167 10H5.833L10 16.667 14.167 10z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("path", {
    d: "M2.5 18.333h15M10 10V1.667",
    strokeWidth: "2",
    strokeLinecap: "round"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_UserMenu__WEBPACK_IMPORTED_MODULE_6__.default, null)));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EditorToolbar);
const styles = aphrodite__WEBPACK_IMPORTED_MODULE_0__.StyleSheet.create({
  logo: {
    width: 24,
    height: 24,
    marginLeft: 16,
    marginRight: 16
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    zIndex: 5
  },
  saveButton: {
    height: 40,
    fontWeight: 600,
    minWidth: 80,
    fontSize: '16px',
    marginRight: 16
  }
});

/***/ }),

/***/ "./src/components/EditorView/EditorView.tsx":
/*!**************************************************!*\
  !*** ./src/components/EditorView/EditorView.tsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditorView": () => (/* binding */ EditorView),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var aphrodite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aphrodite */ "./node_modules/aphrodite/no-important.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _EditorFooter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EditorFooter */ "./src/components/EditorView/EditorFooter.tsx");
/* harmony import */ var _EditorPanels__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./EditorPanels */ "./src/components/EditorView/EditorPanels.tsx");
/* harmony import */ var _EditorToolbar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./EditorToolbar */ "./src/components/EditorView/EditorToolbar.tsx");
/* harmony import */ var _FileList_FileList__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../FileList/FileList */ "./src/components/FileList/FileList.tsx");
/* harmony import */ var _KeyboardShortcuts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./KeyboardShortcuts */ "./src/components/EditorView/KeyboardShortcuts.tsx");
/* harmony import */ var _NoFileSelected__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./NoFileSelected */ "./src/components/EditorView/NoFileSelected.tsx");
/* harmony import */ var _PageMetadata__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../PageMetadata */ "./src/components/PageMetadata.tsx");
/* harmony import */ var _features_preferences_index__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../features/preferences/index */ "./src/features/preferences/index.tsx");
/* harmony import */ var _Publish_PublishManager__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../Publish/PublishManager */ "./src/components/Publish/PublishManager.tsx");
/* harmony import */ var _shell_ContentShell__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../shell/ContentShell */ "./src/components/shell/ContentShell.tsx");
/* harmony import */ var _shell_EditorShell__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../shell/EditorShell */ "./src/components/shell/EditorShell.tsx");
/* harmony import */ var _shell_LayoutShell__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../shell/LayoutShell */ "./src/components/shell/LayoutShell.tsx");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../ThemeProvider */ "./src/components/ThemeProvider.tsx");
/* harmony import */ var _widgets_Banner__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../widgets/Banner */ "./src/components/widgets/Banner.tsx");
/* harmony import */ var _widgets_KeybindingsManager__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../widgets/KeybindingsManager */ "./src/components/widgets/KeybindingsManager.tsx");
/* harmony import */ var _widgets_LazyLoad__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../widgets/LazyLoad */ "./src/components/widgets/LazyLoad.tsx");
/* harmony import */ var _widgets_ModalDialog__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../widgets/ModalDialog */ "./src/components/widgets/ModalDialog.tsx");
/* harmony import */ var _widgets_ProgressIndicator__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../widgets/ProgressIndicator */ "./src/components/widgets/ProgressIndicator.tsx");
/* harmony import */ var _Packi_PackiManagerContainer__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../Packi/PackiManagerContainer */ "./src/components/Packi/PackiManagerContainer.tsx");
/* harmony import */ var _GeneratedView__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./GeneratedView */ "./src/components/EditorView/GeneratedView.tsx");
/* harmony import */ var _GenerationErrors__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./GenerationErrors */ "./src/components/EditorView/GenerationErrors.tsx");
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
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\EditorView\EditorView.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/











 // from shell




 // from widgets









const EDITOR_LOAD_FALLBACK_TIMEOUT = 3000;
const BANNER_TIMEOUT_SHORT = 1500;
const BANNER_TIMEOUT_LONG = 5000;

let EditorViewComp = /*#__PURE__*/function (_React$Component) {
  _inherits(EditorViewComp, _React$Component);

  var _super = _createSuper(EditorViewComp);

  function EditorViewComp(...args) {
    var _this;

    _classCallCheck(this, EditorViewComp);

    _this = _super.call(this, ...args);

    _defineProperty(_assertThisInitialized(_this), "state", {
      currentModal: null,
      currentBanner: null,
      loadedEditor: null,
      isMarkdownPreview: true,
      shouldPreventRedirectWarning: false,
      isDownloading: false,
      splitViewKind: 'both'
    });

    _defineProperty(_assertThisInitialized(_this), "_handleUnload", e => {
      const isUnsaved = _this.props.saveStatus === 'edited' || _this.props.saveStatus === 'publishing' || _this.props.saveStatus === 'saving-draft';

      if (!isUnsaved || _this.state.shouldPreventRedirectWarning) {
        _this._allowRedirectWarning();

        return;
      }

      const message = 'You have unsaved changes. Are you sure you want to leave this page?';
      e.returnValue = message;
      return message;
    });

    _defineProperty(_assertThisInitialized(_this), "_showBanner", (name, duration) => {
      _this.setState({
        currentBanner: name
      });

      setTimeout(() => // @ts-ignore
      _this.setState(state => state.currentBanner === name ? {
        currentBanner: null
      } : state), duration);
    });

    _defineProperty(_assertThisInitialized(_this), "_handleChangeSplitViewKind", e => _this.setState({
      splitViewKind: e.target.value
    }));

    _defineProperty(_assertThisInitialized(_this), "_handleDismissEditModal", () => _this.setState({
      currentModal: null
    }));

    _defineProperty(_assertThisInitialized(_this), "_handleShowTitleDescriptionModal", () => _this.setState({
      currentModal: 'edit-info'
    }));

    _defineProperty(_assertThisInitialized(_this), "_handleShowPackiManager", () => _this.setState({
      currentModal: 'packi-manager'
    }));

    _defineProperty(_assertThisInitialized(_this), "_handleShowAuthModal", () => _this.setState({
      currentModal: 'auth'
    }));

    _defineProperty(_assertThisInitialized(_this), "_handleShowShortcuts", () => _this.setState({
      currentModal: 'shortcuts'
    }));

    _defineProperty(_assertThisInitialized(_this), "_handleShowImportRepoModal", () => _this.setState({
      currentModal: 'import-repo'
    }));

    _defineProperty(_assertThisInitialized(_this), "_handleShowImportProductionModal", () => _this.setState({
      currentModal: 'import-production'
    }));

    _defineProperty(_assertThisInitialized(_this), "_handleHideModal", () => _this.setState({
      currentModal: null
    }));

    _defineProperty(_assertThisInitialized(_this), "_handleShowModal", name => _this.setState({
      currentModal: name
    }));

    _defineProperty(_assertThisInitialized(_this), "_handleRemoveFile", path => {
      var _this$_EditorComponen, _this$_EditorComponen2;

      return (_this$_EditorComponen = _this._EditorComponent) === null || _this$_EditorComponen === void 0 ? void 0 : (_this$_EditorComponen2 = _this$_EditorComponen.removePath) === null || _this$_EditorComponen2 === void 0 ? void 0 : _this$_EditorComponen2.call(_this$_EditorComponen, path);
    });

    _defineProperty(_assertThisInitialized(_this), "_handleRenameFile", (oldPath, newPath) => {
      var _this$_EditorComponen3, _this$_EditorComponen4;

      return (_this$_EditorComponen3 = _this._EditorComponent) === null || _this$_EditorComponen3 === void 0 ? void 0 : (_this$_EditorComponen4 = _this$_EditorComponen3.renamePath) === null || _this$_EditorComponen4 === void 0 ? void 0 : _this$_EditorComponen4.call(_this$_EditorComponen3, oldPath, newPath);
    });

    _defineProperty(_assertThisInitialized(_this), "_EditorComponent", void 0);

    _defineProperty(_assertThisInitialized(_this), "_showErrorPanel", () => _this.props.setPreferences({
      panelType: 'errors'
    }));

    _defineProperty(_assertThisInitialized(_this), "_togglePanels", panelType => _this.props.setPreferences({
      panelsShown: !_this.props.preferences.panelsShown,
      panelType: panelType && !_this.props.preferences.panelsShown ? panelType : _this.props.preferences.panelType
    }));

    _defineProperty(_assertThisInitialized(_this), "_toggleFileTree", () => _this.props.setPreferences({
      fileTreeShown: !_this.props.preferences.fileTreeShown
    }));

    _defineProperty(_assertThisInitialized(_this), "_toggleTheme", () => _this.props.setPreferences({
      theme: _this.props.preferences.theme === 'light' ? 'dark' : 'light'
    }));

    _defineProperty(_assertThisInitialized(_this), "_toggleMarkdownPreview", () => _this.setState(state => ({
      isMarkdownPreview: !state.isMarkdownPreview
    })));

    _defineProperty(_assertThisInitialized(_this), "_preventRedirectWarning", () => _this.setState({
      shouldPreventRedirectWarning: true
    }));

    _defineProperty(_assertThisInitialized(_this), "_allowRedirectWarning", () => _this.setState({
      shouldPreventRedirectWarning: false
    }));

    return _this;
  }

  _createClass(EditorViewComp, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener('beforeunload', this._handleUnload);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.autosaveEnabled !== this.props.autosaveEnabled && !this.props.autosaveEnabled) {
        this._showBanner('autosave-disabled', BANNER_TIMEOUT_LONG);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('beforeunload', this._handleUnload);
    }
  }, {
    key: "render",
    value: function render() {
      const {
        currentModal,
        currentBanner,
        isDownloading
      } = this.state;
      const {
        id,
        createdAt,
        saveHistory,
        saveStatus,
        viewer,
        packierURL,
        files,
        selectedFile,
        sendCodeOnChangeEnabled,
        userAgent,
        onSendCode,
        onToggleSendCode,
        onTogglePreview,
        uploadFileAsync,
        preferences,
        name,
        description,
        previewRef,
        previewURL,
        previewShown,
        loggedUser,
        onLoggedOn,
        onLoggedOff,
        currentPacki,
        onExecuteWizziJob,
        generatedArtifact,
        jobError,
        isWizziJobWaiting,
        onSaveCode
      } = this.props;
      const annotations = this.props.annotations;
      const testPreviewURL = `${"http://localhost:5000"}/api/v1/packi/render/${encodeURIComponent('guest/test')}/${encodeURIComponent(selectedFile)}`;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_shell_ContentShell__WEBPACK_IMPORTED_MODULE_12__.ContentShell, null, this.state.loadedEditor ? null : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_ProgressIndicator__WEBPACK_IMPORTED_MODULE_20__.ProgressIndicator, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_PageMetadata__WEBPACK_IMPORTED_MODULE_9__.default, {
        name: name,
        description: description,
        id: id
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_Publish_PublishManager__WEBPACK_IMPORTED_MODULE_11__.default, {
        id: id,
        sdkVersion: sdkVersion,
        name: name,
        description: description,
        onSubmitMetadata: this.props.onSubmitMetadata,
        onPublishAsync: this.props.onPublishAsync,
        onShowModal: this._handleShowModal,
        onHideModal: this._handleHideModal,
        currentModal: currentModal
      }, ({
        onPublishAsync
      }) => {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_KeybindingsManager__WEBPACK_IMPORTED_MODULE_17__.default, {
          bindings: _KeyboardShortcuts__WEBPACK_IMPORTED_MODULE_7__.Shortcuts,
          onTrigger: type => {
            const commands = {
              save: saveStatus === 'published' ? null : onPublishAsync,
              tree: this._toggleFileTree,
              panels: this._togglePanels,
              shortcuts: this._handleShowShortcuts,
              update: onSendCode
            };
            const fn = commands[type];

            if (fn) {
              fn();
            }
          }
        }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_EditorToolbar__WEBPACK_IMPORTED_MODULE_5__.default, {
          name: name,
          description: description,
          createdAt: createdAt,
          saveHistory: saveHistory,
          saveStatus: saveStatus,
          viewer: viewer,
          isEditModalVisible: currentModal === 'edit-info',
          loggedUser: loggedUser,
          isWizziJobWaiting: isWizziJobWaiting,
          onChangeSplitViewKind: this._handleChangeSplitViewKind // name={name}
          // description={description}
          ,
          creatorUsername: this.props.creatorUsername,
          currentPacki: currentPacki,
          splitViewKind: this.state.splitViewKind,
          isDownloading: isDownloading,
          isAuthModalVisible: currentModal === 'auth',
          onLoggedOn: onLoggedOn,
          onLoggedOff: onLoggedOff,
          onShowEditModal: this._handleShowTitleDescriptionModal,
          onDismissEditModal: this._handleDismissEditModal,
          onExecuteWizziJob: onExecuteWizziJob,
          onShowPackiManager: this._handleShowPackiManager,
          onSaveCode: onSaveCode,
          onSubmitMetadata: this.props.onSubmitMetadata,
          onDownloadCode: this.props.onDownloadAsync,
          onPublishAsync: onPublishAsync
        }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
          className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.editorAreaOuterWrapper)
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
          className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.editorAreaOuter)
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_shell_LayoutShell__WEBPACK_IMPORTED_MODULE_14__.LayoutShell, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_FileList_FileList__WEBPACK_IMPORTED_MODULE_6__.default, {
          annotations: annotations,
          visible: preferences.fileTreeShown,
          files: files,
          selectedFile: selectedFile,
          updateFiles: this.props.updateFiles,
          onSelectFile: this.props.onSelectFile,
          onRemoveFile: this._handleRemoveFile,
          onRenameFile: this._handleRenameFile,
          uploadFileAsync: uploadFileAsync,
          onDownloadCode: this.props.onDownloadAsync,
          onImportRepo: this._handleShowImportRepoModal,
          onImportProduction: this._handleShowImportProductionModal,
          saveStatus: saveStatus,
          sdkVersion: sdkVersion
        }), (this.state.splitViewKind == 'both' || this.state.splitViewKind == 'left') && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_LazyLoad__WEBPACK_IMPORTED_MODULE_18__.default, {
          load: async () => {
            let timeout; // Fallback to simple editor if monaco editor takes too long to load

            const MonacoEditorPromise = Promise.all(/*! import() | Editor/MonacoEditor */[__webpack_require__.e("vendors-node_modules_monaco-editor_esm_vs_editor_editor_main_js"), __webpack_require__.e("Editor/MonacoEditor")]).then(__webpack_require__.bind(__webpack_require__, /*! ../Editor/MonacoEditor */ "./src/components/Editor/MonacoEditor.tsx")).then(editor => ({
              editor,
              type: 'monaco'
            })); // Fallback to simple editor if monaco editor takes too long to load

            const SimpleEditorPromise = new Promise((resolve, reject) => timeout = setTimeout(() => {
              this._showBanner('slow-connection', BANNER_TIMEOUT_LONG);

              Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ../Editor/SimpleEditor */ "./src/components/Editor/SimpleEditor.tsx")).then(resolve, reject);
            }, EDITOR_LOAD_FALLBACK_TIMEOUT)).then(editor => ({
              editor,
              type: 'simple'
            }));
            return Promise.race([MonacoEditorPromise.catch(() => SimpleEditorPromise), SimpleEditorPromise]).then(({
              editor,
              type
            }) => {
              this.setState({
                loadedEditor: type
              });
              clearTimeout(timeout);
              return editor;
            });
          }
        }, ({
          loaded,
          data: Comp
        }) => {
          this._EditorComponent = Comp;
          const file = files[selectedFile];

          if (file) {
            const {
              contents
            } = file;
            const isMarkdown = selectedFile.endsWith('.md');

            if (isMarkdown && this.state.isMarkdownPreview) {
              return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_LazyLoad__WEBPACK_IMPORTED_MODULE_18__.default, {
                load: () => Promise.all(/*! import() | Markdown/MarkdownPreview */[__webpack_require__.e("vendors-node_modules_escape-html_index_js-node_modules_marked_lib_marked_js-node_modules_pris-17ca71"), __webpack_require__.e("Markdown/MarkdownPreview")]).then(__webpack_require__.bind(__webpack_require__, /*! ../Markdown/MarkdownPreview */ "./src/components/Markdown/MarkdownPreview.tsx"))
              }, ({
                loaded: mdLoaded,
                data: MarkdownPreview
              }) => {
                if (mdLoaded && MarkdownPreview) {
                  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(MarkdownPreview, {
                    source: contents
                  });
                }

                return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_shell_EditorShell__WEBPACK_IMPORTED_MODULE_13__.EditorShell, null);
              }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", {
                className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.previewToggle),
                onClick: this._toggleMarkdownPreview
              }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("svg", {
                width: "12px",
                height: "12px",
                viewBox: "0 0 18 18",
                className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.previewToggleIcon)
              }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("g", {
                transform: "translate(-147.000000, -99.000000)"
              }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("g", {
                transform: "translate(144.000000, 96.000000)"
              }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("path", {
                d: "M3,17.25 L3,21 L6.75,21 L17.81,9.94 L14.06,6.19 L3,17.25 L3,17.25 Z M20.71,7.04 C21.1,6.65 21.1,6.02 20.71,5.63 L18.37,3.29 C17.98,2.9 17.35,2.9 16.96,3.29 L15.13,5.12 L18.88,8.87 L20.71,7.04 L20.71,7.04 Z"
              }))))));
            }

            if (loaded && Comp) {
              return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(Comp, {
                selectedFile: selectedFile,
                files: files,
                autoFocus: !/Untitled file.*\.(js|tsx?)$/.test(selectedFile),
                annotations: annotations,
                updateFiles: this.props.updateFiles,
                onSelectFile: this.props.onSelectFile,
                lineNumbers: "undefined"
              }), isMarkdown ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", {
                className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.previewToggle),
                onClick: this._toggleMarkdownPreview
              }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("svg", {
                width: "16px",
                height: "12px",
                viewBox: "0 0 22 16",
                className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.previewToggleIcon)
              }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("g", {
                transform: "translate(-145.000000, -1156.000000)"
              }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("g", {
                transform: "translate(144.000000, 1152.000000)"
              }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("path", {
                d: "M12,4.5 C7,4.5 2.73,7.61 1,12 C2.73,16.39 7,19.5 12,19.5 C17,19.5 21.27,16.39 23,12 C21.27,7.61 17,4.5 12,4.5 L12,4.5 Z M12,17 C9.24,17 7,14.76 7,12 C7,9.24 9.24,7 12,7 C14.76,7 17,9.24 17,12 C17,14.76 14.76,17 12,17 L12,17 Z M12,9 C10.34,9 9,10.34 9,12 C9,13.66 10.34,15 12,15 C13.66,15 15,13.66 15,12 C15,10.34 13.66,9 12,9 L12,9 Z"
              }))))) : null);
            }
          } else {
            return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_NoFileSelected__WEBPACK_IMPORTED_MODULE_8__.default, null);
          }

          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_shell_EditorShell__WEBPACK_IMPORTED_MODULE_13__.EditorShell, null);
        }), (this.state.splitViewKind == 'both' || this.state.splitViewKind == 'right') && generatedArtifact && generatedArtifact.artifactContent ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_GeneratedView__WEBPACK_IMPORTED_MODULE_22__.default, {
          generatedContent: generatedArtifact.artifactContent,
          generatedSourcePath: generatedArtifact.sourcePath,
          generatedPreviewURL: testPreviewURL,
          splitViewKind: this.state.splitViewKind
        }) : generatedArtifact && generatedArtifact.errorLines ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_GenerationErrors__WEBPACK_IMPORTED_MODULE_23__.default, {
          errorName: generatedArtifact.errorName,
          errorLines: generatedArtifact.errorLines,
          errorMessage: generatedArtifact.errorMessage,
          errorStack: generatedArtifact.errorStack
        }) : null, jobError ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_GenerationErrors__WEBPACK_IMPORTED_MODULE_23__.default, {
          errorName: jobError.errorName,
          errorLines: [],
          errorMessage: jobError.errorMessage,
          errorStack: jobError.errorStack
        }) : null), preferences.panelsShown ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_EditorPanels__WEBPACK_IMPORTED_MODULE_4__.default, {
          annotations: annotations,
          onShowErrorPanel: this._showErrorPanel,
          onTogglePanels: this._togglePanels,
          onSelectFile: this.props.onSelectFile,
          panelType: preferences.panelType
        }) : null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_EditorFooter__WEBPACK_IMPORTED_MODULE_3__.default, {
          annotations: annotations,
          fileTreeShown: preferences.fileTreeShown,
          previewShown: previewShown,
          panelsShown: preferences.panelsShown,
          sendCodeOnChangeEnabled: sendCodeOnChangeEnabled,
          sdkVersion: sdkVersion,
          onSendCode: onSendCode,
          onToggleTheme: this._toggleTheme,
          onTogglePanels: this._togglePanels,
          onToggleFileTree: this._toggleFileTree,
          onTogglePreview: onTogglePreview,
          onToggleSendCode: onToggleSendCode,
          onChangeSDKVersion: this.props.onChangeSDKVersion,
          onShowShortcuts: this._handleShowShortcuts,
          theme: this.props.preferences.theme,
          loggedUid: preferences.loggedUid,
          autoGenSingleDoc: preferences.autoGenSingleDoc,
          autoExecJob: preferences.autoExecJob,
          trustLocalStorage: preferences.trustLocalStorage
        }), loggedUser && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_ModalDialog__WEBPACK_IMPORTED_MODULE_19__.ModalDialog, {
          title: "Manage your packies",
          visible: currentModal === 'packi-manager',
          onDismiss: this._handleHideModal
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_Packi_PackiManagerContainer__WEBPACK_IMPORTED_MODULE_21__.default, {
          onClose: this._handleHideModal
        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_ModalDialog__WEBPACK_IMPORTED_MODULE_19__.ModalDialog, {
          visible: currentModal === 'shortcuts',
          onDismiss: this._handleHideModal
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_KeyboardShortcuts__WEBPACK_IMPORTED_MODULE_7__.default, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_Banner__WEBPACK_IMPORTED_MODULE_16__.default, {
          type: "success",
          visible: currentBanner === 'connected'
        }, "Device connected!"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_Banner__WEBPACK_IMPORTED_MODULE_16__.default, {
          type: "error",
          visible: currentBanner === 'disconnected'
        }, "Device disconnected!"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_Banner__WEBPACK_IMPORTED_MODULE_16__.default, {
          type: "info",
          visible: currentBanner === 'autosave-disabled'
        }, "Automatic saving has been disabled in this Packi because you have it open in another tab."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_Banner__WEBPACK_IMPORTED_MODULE_16__.default, {
          type: "info",
          visible: currentBanner === 'sdk-upgraded'
        }, "This Packi was written in an older Wizzi version that is not longer supported. We have upgraded the Wizzi version to", sdkVersion, ".", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("br", null), "You might need to do some manual changes to make the Packi work correctly."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_Banner__WEBPACK_IMPORTED_MODULE_16__.default, {
          type: "info",
          visible: currentBanner === 'slow-connection'
        }, "Slow network detected. Trying to load a basic version of the editor. Some features such as linting and autocomplete may not work."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_Banner__WEBPACK_IMPORTED_MODULE_16__.default, {
          type: "info",
          visible: currentBanner === 'export-unavailable'
        }, "You need to save the Packi first to export the code!"));
      }));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var _files$selectedFile;

      const {
        selectedFile,
        files
      } = props; // When an empty markdown file is opened, switch to edit mode

      let newState = null;

      if (state.isMarkdownPreview && selectedFile.endsWith('.md') && !((_files$selectedFile = files[selectedFile]) !== null && _files$selectedFile !== void 0 && _files$selectedFile.contents)) {
        newState = newState || {};
        newState.isMarkdownPreview = false;
      }

      return newState;
    }
  }]);

  return EditorViewComp;
}(react__WEBPACK_IMPORTED_MODULE_1__.Component);

const EditorView = (0,_features_preferences_index__WEBPACK_IMPORTED_MODULE_10__.withPreferences)((0,react_redux__WEBPACK_IMPORTED_MODULE_2__.connect)(state => ({
  viewer: state.viewer,
  loggedUser: state.loggedUser
}))(EditorViewComp));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EditorView);
const styles = aphrodite__WEBPACK_IMPORTED_MODULE_0__.StyleSheet.create({
  editorAreaOuter: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    minWidth: 0,
    minHeight: 0
  },
  editorAreaOuterWrapper: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    minHeight: 0,
    minWidth: 0
  },
  embedModal: {
    minWidth: 0,
    minHeight: 0,
    maxWidth: 'calc(100% - 48px)',
    maxHeight: 'calc(100% - 48px)'
  },
  preview: {
    backgroundColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_15__.c)('content'),
    borderLeft: `1px solid ${(0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_15__.c)('border')}`
  },
  previewToggle: {
    appearance: 'none',
    position: 'absolute',
    right: 0,
    bottom: 0,
    margin: 32,
    padding: 12,
    height: 48,
    width: 48,
    border: 0,
    borderRadius: '50%',
    backgroundColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_15__.c)('secondary'),
    color: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_15__.c)('secondary-text'),
    outline: 0,
    transitionDuration: '170ms',
    transitionProperty: 'box-shadow',
    transitionTimingFunction: 'linear',
    ':focus-visible': {
      outline: 'auto'
    },
    ':hover': {
      boxShadow: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_15__.s)('small')
    }
  },
  previewToggleIcon: {
    fill: 'currentColor',
    verticalAlign: -1
  }
});

/***/ }),

/***/ "./src/components/EditorView/GeneratedView.tsx":
/*!*****************************************************!*\
  !*** ./src/components/EditorView/GeneratedView.tsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/createStyles.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/withStyles.js");
/* harmony import */ var _material_ui_core_List__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/List */ "./node_modules/@material-ui/core/esm/List/List.js");
/* harmony import */ var _material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/ListItem */ "./node_modules/@material-ui/core/esm/ListItem/ListItem.js");
/* harmony import */ var _material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Tooltip */ "./node_modules/@material-ui/core/esm/Tooltip/Tooltip.js");
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/IconButton */ "./node_modules/@material-ui/core/esm/IconButton/IconButton.js");
/* harmony import */ var _material_ui_icons_ViewList__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/icons/ViewList */ "./node_modules/@material-ui/icons/ViewList.js");
/* harmony import */ var _material_ui_icons_Help__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/icons/Help */ "./node_modules/@material-ui/icons/Help.js");
/* harmony import */ var _material_ui_icons_Info__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/icons/Info */ "./node_modules/@material-ui/icons/Info.js");
/* harmony import */ var _Editor_SimpleEditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Editor/SimpleEditor */ "./src/components/Editor/SimpleEditor.tsx");
/* harmony import */ var _widgets_WebFrame__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../widgets/WebFrame */ "./src/components/widgets/WebFrame.tsx");
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
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\EditorView\GeneratedView.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/












let GeneratedView = /*#__PURE__*/function (_React$Component) {
  _inherits(GeneratedView, _React$Component);

  var _super = _createSuper(GeneratedView);

  function GeneratedView(...args) {
    var _this;

    _classCallCheck(this, GeneratedView);

    _this = _super.call(this, ...args);

    _defineProperty(_assertThisInitialized(_this), "state", {
      view: 'generated'
    });

    _defineProperty(_assertThisInitialized(_this), "_handleGenerated", () => _this.setState({
      view: 'generated'
    }));

    _defineProperty(_assertThisInitialized(_this), "_handleMTree", () => _this.setState({
      view: 'mtree'
    }));

    _defineProperty(_assertThisInitialized(_this), "_handleDebug", () => _this.setState({
      view: 'debug'
    }));

    _defineProperty(_assertThisInitialized(_this), "_handleBrowser", () => _this.setState({
      view: 'browser'
    }));

    return _this;
  }

  _createClass(GeneratedView, [{
    key: "render",
    value: function render() {
      const {
        classes,
        splitViewKind
      } = this.props;
      const {
        view
      } = this.state;
      const selectedFile = 'gen.txt';
      const files = {
        [selectedFile]: {
          contents: this.props.generatedContent,
          type: "CODE"
        }
      };
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: splitViewKind === 'right' ? classes.containerFull : classes.container
      }, view === 'generated' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: classes.editor
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Editor_SimpleEditor__WEBPACK_IMPORTED_MODULE_1__.default, {
        path: "",
        value: this.props.generatedContent,
        selectedFile: selectedFile,
        files: files,
        onValueChange: () => null,
        lineNumbers: "on"
      })), view === 'browser' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: classes.editor
      }, this.props.generatedSourcePath.endsWith('.html.ittf') || this.props.generatedSourcePath.endsWith('.svg.ittf') ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_widgets_WebFrame__WEBPACK_IMPORTED_MODULE_2__.default, {
        previewURL: this.props.generatedPreviewURL
      }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1", null, "No viewer for document", this.props.generatedSourcePath)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: classes.sidebar
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_List__WEBPACK_IMPORTED_MODULE_3__.default, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_4__.default, {
        disableGutters: true
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_5__.default, {
        title: "View generated content"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_6__.default, {
        onClick: this._handleGenerated,
        classes: {
          root: classes.iconButton
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_icons_ViewList__WEBPACK_IMPORTED_MODULE_7__.default, null)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_4__.default, {
        disableGutters: true
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_5__.default, {
        title: "View mTree"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_6__.default, {
        onClick: this._handleMTree,
        classes: {
          root: classes.iconButton
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_icons_Help__WEBPACK_IMPORTED_MODULE_8__.default, null)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_4__.default, {
        disableGutters: true
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_5__.default, {
        title: "View mTree build script"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_6__.default, {
        onClick: this._handleDebug,
        classes: {
          root: classes.iconButton
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_icons_Info__WEBPACK_IMPORTED_MODULE_9__.default, null)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_4__.default, {
        disableGutters: true
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_5__.default, {
        title: "Browse artifact"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_6__.default, {
        onClick: this._handleBrowser,
        classes: {
          root: classes.iconButton
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_icons_Info__WEBPACK_IMPORTED_MODULE_9__.default, null)))))));
    }
  }]);

  return GeneratedView;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);

const muiStyles = theme => (0,_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_10__.default)({
  container: {
    display: 'flex',
    flexDirection: 'row',
    borderLeft: '1px solid #cccccc',
    width: '44vw',
    height: '100%'
  },
  containerFull: {
    display: 'flex',
    flexDirection: 'row',
    borderLeft: '1px solid #cccccc',
    width: '100%',
    height: '100%'
  },
  editor: {
    padding: '5px',
    flex: 'auto'
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    padding: '15px',
    background: theme.palette.primary.light
  },
  iconButton: {
    padding: '10px'
  }
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_11__.default)(muiStyles)(GeneratedView));

/***/ }),

/***/ "./src/components/EditorView/GenerationErrors.tsx":
/*!********************************************************!*\
  !*** ./src/components/EditorView/GenerationErrors.tsx ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GenerationErrors": () => (/* binding */ GenerationErrors),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/createStyles.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/withStyles.js");
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

/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\EditorView\GenerationErrors.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/


let GenerationErrors = /*#__PURE__*/function (_React$Component) {
  _inherits(GenerationErrors, _React$Component);

  var _super = _createSuper(GenerationErrors);

  function GenerationErrors() {
    _classCallCheck(this, GenerationErrors);

    return _super.apply(this, arguments);
  }

  _createClass(GenerationErrors, [{
    key: "render",
    value: function render() {
      const {
        classes,
        errorName,
        errorMessage,
        errorLines,
        errorStack
      } = this.props;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: classes.container
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: classes.errorName
      }, errorName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: classes.message
      }, errorMessage && errorMessage.split(',').map((line, i) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        key: i
      }, line))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("pre", {
        className: classes.lines
      }, errorLines && errorLines.join('\n')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("ul", null, errorStack && errorStack.split('\n').map((line, i) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", {
        key: i
      }, line))));
    }
  }]);

  return GenerationErrors;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);

const muiStyles = theme => (0,_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__.default)({
  container: {
    display: 'flex',
    flexDirection: 'column',
    borderLeft: '1px solid #cccccc',
    width: '44vw',
    height: '100%',
    overflow: 'scroll'
  },
  errorName: {
    padding: '15px 30px',
    fontSize: '28px'
  },
  message: {
    padding: '15px 30px',
    fontSize: '20px'
  },
  lines: {
    padding: '15px 30px',
    fontSize: '18px',
    fontFamily: 'Courier, mono'
  }
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__.default)(muiStyles)(GenerationErrors));

/***/ }),

/***/ "./src/components/EditorView/KeyboardShortcuts.tsx":
/*!*********************************************************!*\
  !*** ./src/components/EditorView/KeyboardShortcuts.tsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Shortcuts": () => (/* binding */ Shortcuts),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var aphrodite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aphrodite */ "./node_modules/aphrodite/no-important.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _widgets_KeybindingsManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../widgets/KeybindingsManager */ "./src/components/widgets/KeybindingsManager.tsx");
/* harmony import */ var _widgets_ShortcutLabel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../widgets/ShortcutLabel */ "./src/components/widgets/ShortcutLabel.tsx");
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

/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\EditorView\KeyboardShortcuts.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/




const Shortcuts = {
  save: {
    description: 'Save changes',
    combo: [_widgets_KeybindingsManager__WEBPACK_IMPORTED_MODULE_2__.KeyMap.Meta, _widgets_KeybindingsManager__WEBPACK_IMPORTED_MODULE_2__.KeyMap.S]
  },
  update: {
    type: 'update',
    description: 'Update code on device',
    combo: [_widgets_KeybindingsManager__WEBPACK_IMPORTED_MODULE_2__.KeyMap.Meta, _widgets_KeybindingsManager__WEBPACK_IMPORTED_MODULE_2__.KeyMap.U]
  },
  tree: {
    description: 'Toggle sidebar',
    combo: [_widgets_KeybindingsManager__WEBPACK_IMPORTED_MODULE_2__.KeyMap.Meta, _widgets_KeybindingsManager__WEBPACK_IMPORTED_MODULE_2__.KeyMap.Backslash]
  },
  panels: {
    description: 'Toggle error and log panels',
    combo: [_widgets_KeybindingsManager__WEBPACK_IMPORTED_MODULE_2__.KeyMap.Ctrl, _widgets_KeybindingsManager__WEBPACK_IMPORTED_MODULE_2__.KeyMap.Tilde]
  },
  format: {
    description: 'Format code with prettier',
    combo: [_widgets_KeybindingsManager__WEBPACK_IMPORTED_MODULE_2__.KeyMap.Ctrl, _widgets_KeybindingsManager__WEBPACK_IMPORTED_MODULE_2__.KeyMap.Alt, _widgets_KeybindingsManager__WEBPACK_IMPORTED_MODULE_2__.KeyMap.F]
  },
  shortcuts: {
    description: 'Show keyboard shortcuts',
    combo: [_widgets_KeybindingsManager__WEBPACK_IMPORTED_MODULE_2__.KeyMap.Meta, _widgets_KeybindingsManager__WEBPACK_IMPORTED_MODULE_2__.KeyMap.Alt, _widgets_KeybindingsManager__WEBPACK_IMPORTED_MODULE_2__.KeyMap.Shift]
  }
};

let KeyboardShortcuts = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(KeyboardShortcuts, _React$PureComponent);

  var _super = _createSuper(KeyboardShortcuts);

  function KeyboardShortcuts() {
    _classCallCheck(this, KeyboardShortcuts);

    return _super.apply(this, arguments);
  }

  _createClass(KeyboardShortcuts, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("table", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.shortcutList)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("tbody", null, Object.entries(Shortcuts).map(([type, binding]) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("tr", {
        key: type
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("td", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.shortcutCell, styles.shortcutLabelCell)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_ShortcutLabel__WEBPACK_IMPORTED_MODULE_3__.default, {
        boxed: true,
        combo: binding.combo
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("td", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.shortcutCell, styles.shortcutDescriptionCell)
      }, binding.description)))));
    }
  }]);

  return KeyboardShortcuts;
}(react__WEBPACK_IMPORTED_MODULE_1__.PureComponent);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (KeyboardShortcuts);
const styles = aphrodite__WEBPACK_IMPORTED_MODULE_0__.StyleSheet.create({
  shortcutList: {
    fontSize: '1.2em',
    tableLayout: 'fixed'
  },
  shortcutCell: {
    padding: '6px 8px'
  },
  shortcutLabelCell: {
    textAlign: 'right',
    marginRight: 8
  },
  shortcutDescriptionCell: {
    textAlign: 'left'
  }
});

/***/ }),

/***/ "./src/components/EditorView/ModalEditTitleAndDescription.tsx":
/*!********************************************************************!*\
  !*** ./src/components/EditorView/ModalEditTitleAndDescription.tsx ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ModalEditTitleAndDescription)
/* harmony export */ });
/* harmony import */ var aphrodite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aphrodite */ "./node_modules/aphrodite/no-important.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _features_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../features/config */ "./src/features/config/index.tsx");
/* harmony import */ var _Form_Form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Form/Form */ "./src/components/Form/Form.tsx");
/* harmony import */ var _Form_withStatus__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Form/withStatus */ "./src/components/Form/withStatus.tsx");
/* harmony import */ var _Form_withValidation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Form/withValidation */ "./src/components/Form/withValidation.tsx");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../ThemeProvider */ "./src/components/ThemeProvider.tsx");
/* harmony import */ var _widgets_Button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../widgets/Button */ "./src/components/widgets/Button.tsx");
/* harmony import */ var _widgets_LargeInput__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../widgets/LargeInput */ "./src/components/widgets/LargeInput.tsx");
/* harmony import */ var _widgets_LargeTextArea__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../widgets/LargeTextArea */ "./src/components/widgets/LargeTextArea.tsx");
/* harmony import */ var _widgets_ModalDialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../widgets/ModalDialog */ "./src/components/widgets/ModalDialog.tsx");
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
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\EditorView\ModalEditTitleAndDescription.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/











// @ts-ignore
const FormButton = (0,_Form_withStatus__WEBPACK_IMPORTED_MODULE_4__.default)(_widgets_Button__WEBPACK_IMPORTED_MODULE_7__.Button); // @ts-ignore

const ValidatedInput = (0,_Form_withValidation__WEBPACK_IMPORTED_MODULE_5__.default)(_widgets_LargeInput__WEBPACK_IMPORTED_MODULE_8__.default);

let ModalEditTitleAndDescription = /*#__PURE__*/function (_React$Component) {
  _inherits(ModalEditTitleAndDescription, _React$Component);

  var _super = _createSuper(ModalEditTitleAndDescription);

  function ModalEditTitleAndDescription(...args) {
    var _this;

    _classCallCheck(this, ModalEditTitleAndDescription);

    _this = _super.call(this, ...args);

    _defineProperty(_assertThisInitialized(_this), "state", {
      name: _this.props.name || '',
      description: _this.props.description ?? '',
      visible: _this.props.visible
    });

    _defineProperty(_assertThisInitialized(_this), "_handleSubmit", () => _this.props.onSubmit({
      name: _this.state.name,
      description: _this.state.description
    }));

    _defineProperty(_assertThisInitialized(_this), "_validateName", name => name ? /^[a-z_\-\d\s]+$/i.test(name) ? null : new Error('Name can only contain letters, numbers, space, hyphen (-) and underscore (_).') : new Error('Name cannot be empty.'));

    return _this;
  }

  _createClass(ModalEditTitleAndDescription, [{
    key: "render",
    value: function render() {
      const {
        visible,
        title,
        onDismiss,
        isWorking,
        action
      } = this.props;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_ModalDialog__WEBPACK_IMPORTED_MODULE_10__.ModalDialog, {
        visible: visible,
        title: title,
        onDismiss: onDismiss
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_Form_Form__WEBPACK_IMPORTED_MODULE_3__.default, {
        onSubmit: this._handleSubmit
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("h4", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.subtitle)
      }, "Project name"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(ValidatedInput // @ts-ignore
      , {
        autoFocus: true,
        value: this.state.name,
        onChange: e => this.setState({
          name: e.target.value
        }),
        placeholder: "Unnamed Packi",
        validate: this._validateName
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("h4", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.subtitle)
      }, "Description"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_LargeTextArea__WEBPACK_IMPORTED_MODULE_9__.default, {
        value: this.state.description,
        onChange: e => this.setState({
          description: e.target.value
        }),
        minRows: 4,
        placeholder: _features_config__WEBPACK_IMPORTED_MODULE_2__.DEFAULT_PACKI_DESCRIPTION
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.buttons)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(FormButton // @ts-ignore
      , {
        type: "submit",
        large: true,
        variant: "primary",
        loading: isWorking
      }, action))));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (state.visible !== props.visible) {
        if (props.visible) {
          return {
            name: props.name || '',
            description: props.description ?? '',
            visible: props.visible
          };
        } else {
          return {
            visible: props.visible
          };
        }
      }

      return null;
    }
  }]);

  return ModalEditTitleAndDescription;
}(react__WEBPACK_IMPORTED_MODULE_1__.Component);


const styles = aphrodite__WEBPACK_IMPORTED_MODULE_0__.StyleSheet.create({
  subtitle: {
    fontSize: 16,
    fontWeight: 500,
    padding: 0,
    lineHeight: '22px',
    margin: '16px 0 6px 0'
  },
  buttons: {
    margin: '20px 0 0 0'
  },
  caption: {
    marginTop: 24,
    fontSize: '16px',
    lineHeight: '22px',
    textAlign: 'center'
  },
  link: {
    cursor: 'pointer',
    color: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_6__.c)('primary'),
    textDecoration: 'underline'
  }
});

/***/ }),

/***/ "./src/components/EditorView/NoFileSelected.tsx":
/*!******************************************************!*\
  !*** ./src/components/EditorView/NoFileSelected.tsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NoFileSelected)
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

/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\EditorView\NoFileSelected.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/



let NoFileSelected = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(NoFileSelected, _React$PureComponent);

  var _super = _createSuper(NoFileSelected);

  function NoFileSelected() {
    _classCallCheck(this, NoFileSelected);

    return _super.apply(this, arguments);
  }

  _createClass(NoFileSelected, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.container)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("h4", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.text)
      }, "Select a file to view and edit"));
    }
  }]);

  return NoFileSelected;
}(react__WEBPACK_IMPORTED_MODULE_1__.PureComponent);


const styles = aphrodite__WEBPACK_IMPORTED_MODULE_0__.StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: '1.5em',
    fontWeight: 500,
    opacity: 0.5
  }
});

/***/ }),

/***/ "./src/components/EditorView/ProblemsPanel.tsx":
/*!*****************************************************!*\
  !*** ./src/components/EditorView/ProblemsPanel.tsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProblemsPanel": () => (/* binding */ ProblemsPanel),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var aphrodite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aphrodite */ "./node_modules/aphrodite/no-important.js");
/* harmony import */ var lodash_trim__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/trim */ "./node_modules/lodash/trim.js");
/* harmony import */ var lodash_trim__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_trim__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ThemeProvider */ "./src/components/ThemeProvider.tsx");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\EditorView\ProblemsPanel.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/




function ProblemsPanel({
  annotations,
  onSelectFile
}) {
  const [selected, setSelected] = react__WEBPACK_IMPORTED_MODULE_2__.useState(undefined);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(react__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, annotations.map(({
    message,
    location,
    source,
    severity,
    action
  }, index) => {
    let iconStyle = styles.infoIcon;
    let locationStyle = styles.infoColor;

    if (severity >= 3) {
      iconStyle = styles.errorIcon;
      locationStyle = styles.errorColor;
    } else {
      if (severity >= 2) {
        iconStyle = styles.warningIcon;
        locationStyle = styles.warningColor;
      } else {
        if (severity < 0) {
          iconStyle = styles.loadingIcon;
        }
      }
    }

    const file = location !== null && location !== void 0 && location.fileName ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("span", {
      className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.location, locationStyle),
      onClick: () => onSelectFile(location.fileName)
    }, `${location.fileName} (${location.startLineNumber}:${location.startColumn})`) : '';
    const icon = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", {
      className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.icon, iconStyle)
    });
    const lines = message.split('\n');
    const title = lines[0];
    let suffix;

    if (action) {
      suffix = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("button", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.action),
        onClick: action.run
      }, action.icon ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("span", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.actionIcon)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(action.icon, null)) : undefined, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("span", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.actionText)
      }, action.title));
    } else {
      if (source) {
        suffix = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("span", {
          className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.source)
        }, ` (${source})`);
      }
    }

    const key = `${(location === null || location === void 0 ? void 0 : location.fileName) ?? ''}.${title}.${source ?? ''}`;
    const expanded = annotations.length === 1 || selected === key;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", {
      key: index,
      className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.item),
      onClick: () => setSelected(key)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", {
      className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.line)
    }, icon, file, title, suffix), expanded && lines.length > 1 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("pre", {
      className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.callstack)
    }, lodash_trim__WEBPACK_IMPORTED_MODULE_1___default()(message.substring(title.length), '\r\n')) : undefined);
  }));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProblemsPanel);
const styles = aphrodite__WEBPACK_IMPORTED_MODULE_0__.StyleSheet.create({
  item: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 1.5em'
  },
  line: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    border: 0,
    margin: 0,
    padding: '1px 0',
    color: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('text'),
    minHeight: 30
  },
  icon: {
    backgroundSize: 16,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    width: 16,
    height: 16,
    marginRight: '0.5em'
  },
  loadingIcon: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderTopColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('text'),
    borderLeftColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('text'),
    borderBottomColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('text'),
    borderRightColor: 'rgba(0, 0, 0, .16)',
    opacity: 0.5,
    borderRadius: '50%',
    verticalAlign: -3,
    animationName: [{
      from: {
        transform: 'rotate(0deg)'
      },
      to: {
        transform: 'rotate(360deg)'
      }
    }],
    animationDuration: '1s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear'
  },
  infoIcon: {
    backgroundImage: `url(${__webpack_require__(/*! ../../assets/info-icon.png */ "./src/assets/info-icon.png")})`
  },
  errorIcon: {
    backgroundImage: `url(${__webpack_require__(/*! ../../assets/cross-red.png */ "./src/assets/cross-red.png")})`
  },
  warningIcon: {
    backgroundImage: `url(${__webpack_require__(/*! ../../assets/cross.png */ "./src/assets/cross.png")})`
  },
  location: {
    textDecoration: 'underline',
    cursor: 'pointer',
    marginRight: '0.5em'
  },
  infoColor: {
    opacity: 0.5
  },
  errorColor: {
    color: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('error')
  },
  warningColor: {
    color: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('warning')
  },
  source: {
    color: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('text'),
    opacity: 0.5,
    marginLeft: '0.5em'
  },
  action: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    appearance: 'none',
    outline: 0,
    margin: '0 0 0 0.5em',
    backgroundColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('content'),
    color: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('selected'),
    borderRadius: 3,
    border: `1px solid ${(0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('selected')}`,
    lineHeight: 1,
    padding: '0 12px',
    minWidth: 50,
    minHeight: 30,
    ':hover': {
      backgroundColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('selected'),
      color: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('content'),
      boxShadow: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.s)('small')
    }
  },
  actionIcon: {
    marginRight: 4
  },
  actionText: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  callstack: {
    color: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('error'),
    fontFamily: 'var(--font-monospace)',
    margin: '0.5em 0px'
  }
});

/***/ }),

/***/ "./src/components/EditorView/UserMenu.tsx":
/*!************************************************!*\
  !*** ./src/components/EditorView/UserMenu.tsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserMenuComp": () => (/* binding */ UserMenuComp),
/* harmony export */   "UserMenu": () => (/* binding */ UserMenu),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var aphrodite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aphrodite */ "./node_modules/aphrodite/no-important.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _features_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../features/auth */ "./src/features/auth/index.tsx");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ThemeProvider */ "./src/components/ThemeProvider.tsx");
/* harmony import */ var _widgets_Avatar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../widgets/Avatar */ "./src/components/widgets/Avatar.tsx");
/* harmony import */ var _widgets_ContextMenu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../widgets/ContextMenu */ "./src/components/widgets/ContextMenu.tsx");
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
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\EditorView\UserMenu.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/






let UserMenuComp = /*#__PURE__*/function (_React$Component) {
  _inherits(UserMenuComp, _React$Component);

  var _super = _createSuper(UserMenuComp);

  function UserMenuComp(...args) {
    var _this;

    _classCallCheck(this, UserMenuComp);

    _this = _super.call(this, ...args);

    _defineProperty(_assertThisInitialized(_this), "state", {
      visible: false
    });

    _defineProperty(_assertThisInitialized(_this), "_handleDocumentClick", e => {
      if (_this.state.visible) {
        if (_this._menu.current && e.target !== _this._menu.current && !_this._menu.current.contains(e.target)) {
          _this._hideMenu();
        }
      } else {
        if (_this._avatar.current && (e.target === _this._avatar.current || _this._avatar.current.contains(e.target))) {
          _this.setState(state => ({
            visible: !state.visible
          }));
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_handleDocumentContextMenu", () => {
      if (_this.state.visible) {
        _this._hideMenu();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_hideMenu", () => _this.setState({
      visible: false
    }));

    _defineProperty(_assertThisInitialized(_this), "_menu", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createRef());

    _defineProperty(_assertThisInitialized(_this), "_avatar", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createRef());

    return _this;
  }

  _createClass(UserMenuComp, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener('click', this._handleDocumentClick);
      document.addEventListener('contextmenu', this._handleDocumentContextMenu);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('click', this._handleDocumentClick);
      document.removeEventListener('contextmenu', this._handleDocumentContextMenu);
    }
  }, {
    key: "render",
    value: function render() {
      const {
        viewer
      } = this.props;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.container)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", {
        ref: this._avatar,
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.button)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_Avatar__WEBPACK_IMPORTED_MODULE_4__.Avatar, {
        source: viewer !== null && viewer !== void 0 && viewer.picture ? viewer.picture : null,
        size: 26
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_ContextMenu__WEBPACK_IMPORTED_MODULE_5__.default, {
        ref: this._menu,
        visible: this.state.visible,
        actions: viewer ? [{
          label: 'My Packies',
          handler: () => window.open(`${"http://localhost:5000"}/@${viewer.username}/packies`)
        }, {
          label: 'Account Settings',
          handler: () => window.open(`${"http://localhost:5000"}/settings`)
        }] : [{
          label: 'Log in to Wizzi',
          handler: () => window.location.href = '#'
        }],
        onHide: this._hideMenu,
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.menu)
      }));
    }
  }]);

  return UserMenuComp;
}(react__WEBPACK_IMPORTED_MODULE_1__.Component);
const UserMenu = (0,_features_auth__WEBPACK_IMPORTED_MODULE_2__.withAuth)(UserMenuComp);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_features_auth__WEBPACK_IMPORTED_MODULE_2__.withAuth)(UserMenuComp));
const styles = aphrodite__WEBPACK_IMPORTED_MODULE_0__.StyleSheet.create({
  container: {
    marginRight: 16
  },
  menu: {
    position: 'absolute',
    margin: '4px 0',
    right: 16,
    top: '100%'
  },
  button: {
    appearance: 'none',
    background: 'transparent',
    padding: 0,
    margin: 0,
    border: 0,
    outline: 0,
    height: 40,
    width: 40,
    borderRadius: 2,
    textDecoration: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ':hover': {
      backgroundColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('hover')
    }
  }
});

/***/ }),

/***/ "./src/components/Editor/SimpleEditor.tsx":
/*!************************************************!*\
  !*** ./src/components/Editor/SimpleEditor.tsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SimpleEditor": () => (/* binding */ SimpleEditor),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var prismjs_components_prism_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prismjs/components/prism-core */ "./node_modules/prismjs/components/prism-core.js");
/* harmony import */ var prismjs_components_prism_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prismjs_components_prism_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prismjs_plugins_line_numbers_prism_line_numbers_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prismjs/plugins/line-numbers/prism-line-numbers.css */ "./node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css");
/* harmony import */ var prismjs_plugins_line_numbers_prism_line_numbers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prismjs/plugins/line-numbers/prism-line-numbers */ "./node_modules/prismjs/plugins/line-numbers/prism-line-numbers.js");
/* harmony import */ var prismjs_plugins_line_numbers_prism_line_numbers__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prismjs_plugins_line_numbers_prism_line_numbers__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var prismjs_themes_prism_twilight_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prismjs/themes/prism-twilight.css */ "./node_modules/prismjs/themes/prism-twilight.css");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\Editor\SimpleEditor.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/
 // see https://mxstbr.blog/2016/11/styled-components-magic-explained/






const SimpleEditor = ({
  content,
  language
}) => {
  const [contentValue, setContentValue] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(content);

  const handleKeyDown = evt => {
    let value = contentValue,
        selStartPos = evt.currentTarget.selectionStart; // handle 4-space indent on

    console.log(evt.currentTarget);

    if (evt.key === "Tab") {
      value = value.substring(0, selStartPos) + "    " + value.substring(selStartPos, value.length);
      evt.currentTarget.selectionStart = selStartPos + 3;
      evt.currentTarget.selectionEnd = selStartPos + 4;
      evt.preventDefault();
      setContentValue(value);
    }
  };

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => prismjs_components_prism_core__WEBPACK_IMPORTED_MODULE_1___default().highlightAll(), [language, contentValue]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "code-edit-container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("textarea", {
    className: "code-input",
    value: contentValue,
    onChange: evt => setContentValue(evt.target.value),
    onKeyDown: handleKeyDown
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("pre", {
    className: "code-output"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("code", {
    className: `language-${language}`
  }, contentValue)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SimpleEditor);

/***/ }),

/***/ "./src/components/FileList/FileList.tsx":
/*!**********************************************!*\
  !*** ./src/components/FileList/FileList.tsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FileList": () => (/* binding */ FileList),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var aphrodite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aphrodite */ "./node_modules/aphrodite/no-important.js");
/* harmony import */ var lodash_pickBy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/pickBy */ "./node_modules/lodash/pickBy.js");
/* harmony import */ var lodash_pickBy__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_pickBy__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _features_lint_eslint_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../features/lint/eslint.json */ "./src/features/lint/eslint.json");
/* harmony import */ var _features_file__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../features/file */ "./src/features/file/index.tsx");
/* harmony import */ var _Import_ImportFilesManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Import/ImportFilesManager */ "./src/components/Import/ImportFilesManager.tsx");
/* harmony import */ var _features_preferences__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../features/preferences */ "./src/features/preferences/index.tsx");
/* harmony import */ var _shell_SidebarShell__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shell/SidebarShell */ "./src/components/shell/SidebarShell.tsx");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../ThemeProvider */ "./src/components/ThemeProvider.tsx");
/* harmony import */ var _widgets_ResizablePane__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../widgets/ResizablePane */ "./src/components/widgets/ResizablePane.tsx");
/* harmony import */ var _widgets_Toast__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../widgets/Toast */ "./src/components/widgets/Toast.tsx");
/* harmony import */ var _FileListChildren__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./FileListChildren */ "./src/components/FileList/FileListChildren.tsx");
/* harmony import */ var _FileListEntryDropTarget__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./FileListEntryDropTarget */ "./src/components/FileList/FileListEntryDropTarget.tsx");
/* harmony import */ var _FileListOpenEntry__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./FileListOpenEntry */ "./src/components/FileList/FileListOpenEntry.tsx");
/* harmony import */ var _FileListPane__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./FileListPane */ "./src/components/FileList/FileListPane.tsx");
/* harmony import */ var _FileListPaneButton__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./FileListPaneButton */ "./src/components/FileList/FileListPaneButton.tsx");
/* harmony import */ var _actions_closeEntry__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./actions/closeEntry */ "./src/components/FileList/actions/closeEntry.tsx");
/* harmony import */ var _actions_createNewEntry__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./actions/createNewEntry */ "./src/components/FileList/actions/createNewEntry.tsx");
/* harmony import */ var _actions_expandEntry__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./actions/expandEntry */ "./src/components/FileList/actions/expandEntry.tsx");
/* harmony import */ var _actions_openEntry__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./actions/openEntry */ "./src/components/FileList/actions/openEntry.tsx");
/* harmony import */ var _actions_pasteEntry__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./actions/pasteEntry */ "./src/components/FileList/actions/pasteEntry.tsx");
/* harmony import */ var _actions_recursivelyCreateParents__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./actions/recursivelyCreateParents */ "./src/components/FileList/actions/recursivelyCreateParents.tsx");
/* harmony import */ var _actions_renameEntry__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./actions/renameEntry */ "./src/components/FileList/actions/renameEntry.tsx");
/* harmony import */ var _actions_selectEntry__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./actions/selectEntry */ "./src/components/FileList/actions/selectEntry.tsx");
/* harmony import */ var _actions_updateEntry__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./actions/updateEntry */ "./src/components/FileList/actions/updateEntry.tsx");
/* harmony import */ var _utils_convertFileStructure__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./utils/convertFileStructure */ "./src/components/FileList/utils/convertFileStructure.tsx");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\FileList\FileList.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/



























const AddIcon = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("g", {
  transform: "translate(7.000000, 7.000000)"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("circle", {
  fill: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_8__.c)('success'),
  cx: "4.5",
  cy: "4.5",
  r: "4.5"
}), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("rect", {
  fill: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_8__.c)('success-text'),
  x: "4",
  y: "2",
  width: "1",
  height: "5"
}), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("rect", {
  fill: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_8__.c)('success-text'),
  x: "2",
  y: "4",
  width: "5",
  height: "1"
}));

let FileListComp = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(FileListComp, _React$PureComponent);

  var _super = _createSuper(FileListComp);

  function FileListComp(...args) {
    var _this;

    _classCallCheck(this, FileListComp);

    _this = _super.call(this, ...args);

    _defineProperty(_assertThisInitialized(_this), "state", {
      clipboard: [],
      deleted: [],
      openFilesPane: true,
      projectPane: true,
      entries: [],
      selectedFile: ''
    });

    _defineProperty(_assertThisInitialized(_this), "_handleEntrySelect", path => _this.updateEntries((0,_actions_selectEntry__WEBPACK_IMPORTED_MODULE_23__.default)(_this.state.entries, path)));

    _defineProperty(_assertThisInitialized(_this), "_handleEntryOpen", path => _this.updateEntries((0,_actions_openEntry__WEBPACK_IMPORTED_MODULE_19__.default)(_this.state.entries, path)));

    _defineProperty(_assertThisInitialized(_this), "_handleEntryFocus", path => _this.updateEntries((0,_actions_openEntry__WEBPACK_IMPORTED_MODULE_19__.default)(_this.state.entries, path, true)));

    _defineProperty(_assertThisInitialized(_this), "_handleEntryExpand", (path, expand) => _this.updateEntries((0,_actions_expandEntry__WEBPACK_IMPORTED_MODULE_18__.default)(_this.state.entries, path, expand)));

    _defineProperty(_assertThisInitialized(_this), "_handleEntryRename", (oldPath, newPath) => {
      if (oldPath === newPath) {
        return;
      }

      const entry = _this.state.entries.find(e => e.item.path === oldPath);

      if (entry) {
        if (entry.item.type === 'folder') {
          _this.state.entries.filter(e => e.item.type === 'file' && e.item.path.startsWith(oldPath)).forEach(renamedFile => _this.props.onRenameFile(renamedFile.item.path, `${newPath}${renamedFile.item.path.substring(oldPath.length)}`));
        } else {
          _this.props.onRenameFile(oldPath, newPath);
        }
      }

      _this.updateEntries((0,_actions_renameEntry__WEBPACK_IMPORTED_MODULE_22__.default)(_this.state.entries, oldPath, newPath));
    });

    _defineProperty(_assertThisInitialized(_this), "_restoreEntries", entries => _this.updateEntries([..._this.state.entries, ...entries.map(e => (0,_actions_updateEntry__WEBPACK_IMPORTED_MODULE_24__.default)(e, {
      item: {
        path: (0,_features_file__WEBPACK_IMPORTED_MODULE_4__.getUniquePath)(_this.state.entries.map(it => it.item.path), e.item.path)
      }
    }))]));

    _defineProperty(_assertThisInitialized(_this), "_handleDismissDelete", id => _this.setState(state => ({
      deleted: state.deleted.filter(g => g.id !== id)
    })));

    _defineProperty(_assertThisInitialized(_this), "_handleEntryClose", path => _this.updateEntries(_this.state.entries.map(e => e.item.path === path ? (0,_actions_closeEntry__WEBPACK_IMPORTED_MODULE_16__.default)(e) : e)));

    _defineProperty(_assertThisInitialized(_this), "_handleEntryCloseOthers", path => _this.updateEntries(_this.state.entries.map(e => e.item.path !== path ? (0,_actions_closeEntry__WEBPACK_IMPORTED_MODULE_16__.default)(e) : e)));

    _defineProperty(_assertThisInitialized(_this), "_handleEntryCloseAll", () => _this.updateEntries(_this.state.entries.map(e => (0,_actions_closeEntry__WEBPACK_IMPORTED_MODULE_16__.default)(e))));

    _defineProperty(_assertThisInitialized(_this), "_handleEntryDelete", path => {
      const entry = _this.state.entries.find(e => e.item.path === path);

      const deletedEntries = [];

      _this.updateEntries(_this.state.entries.filter(e => {
        const remove = e.item.path === path || (0,_features_file__WEBPACK_IMPORTED_MODULE_4__.isInsideFolder)(e.item.path, path);

        if (remove) {
          deletedEntries.push(e);

          if (e.item.type === 'file') {
            _this.props.onRemoveFile(e.item.path);
          }
        }

        return !remove;
      }));

      _this.setState(state => ({
        deleted: [...state.deleted, {
          id: _this._currentDeleteID++,
          path: entry ? entry.item.path : 'Item',
          entries: deletedEntries
        }]
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "_currentDeleteID", 0);

    _defineProperty(_assertThisInitialized(_this), "_handleEntryImport", entry => {
      let entries;

      if ((0,_features_file__WEBPACK_IMPORTED_MODULE_4__.isPackageJson)(entry.item.path)) {
        // Merge dependencies from package.json file
        entries = _this.state.entries.map(e => {
          if ((0,_features_file__WEBPACK_IMPORTED_MODULE_4__.isPackageJson)(e.item.path)) {
            try {
              // @ts-ignore
              // @ts-ignore
              const previous = JSON.parse(e.item.content); // @ts-ignore

              const next = JSON.parse(entry.item.content);
              return _objectSpread(_objectSpread({}, e), {}, {
                item: _objectSpread(_objectSpread({}, e.item), {}, {
                  content: JSON.stringify(_objectSpread(_objectSpread({}, previous), {}, {
                    dependencies: _objectSpread(_objectSpread({}, previous.dependencies), Object.keys(next.dependencies).reduce((acc, name) => {
                      return acc;
                    }, {}))
                  }), null, 2)
                })
              });
            } catch (err) {}
          }

          return e;
        });
      } else {
        if ((0,_features_file__WEBPACK_IMPORTED_MODULE_4__.isESLintConfig)(entry.item.path)) {
          try {
            // Cleanup the config file to remove unsupported plugins and rules
            const content = JSON.parse(entry.item.content);

            if (content.plugins) {
              content.plugins = content.plugins.filter(name => _features_lint_eslint_json__WEBPACK_IMPORTED_MODULE_3__.plugins.includes(name));

              if (!content.plugins.length) {
                delete content.plugins;
              }
            }

            if (content.rules) {
              content.rules = lodash_pickBy__WEBPACK_IMPORTED_MODULE_1___default()(content.rules, (_, key) => {
                if (key.includes('/')) {
                  return _features_lint_eslint_json__WEBPACK_IMPORTED_MODULE_3__.plugins.some(name => key.startsWith(`${name}/`));
                }

                return key;
              });
            }

            if (content.extends) {
              if (typeof content.extends === 'string' && !content.extends.startsWith('eslint:')) {
                delete content.extends;
              } else {
                content.extends = content.extends.filter(name => name.startsWith('eslint:'));

                if (!content.extends.length) {
                  delete content.extends;
                }
              }
            } // Remove existing eslintrc if any


            entries = _this.state.entries.filter(e => !(0,_features_file__WEBPACK_IMPORTED_MODULE_4__.isESLintConfig)(e.item.path));
            entries.push((0,_actions_updateEntry__WEBPACK_IMPORTED_MODULE_24__.default)(entry, {
              item: {
                content: JSON.stringify(content, null, 2)
              }
            }));
          } catch (e) {
            // Ignore errors
            entries = _this.state.entries;
          }
        } else {
          const parents = (0,_actions_recursivelyCreateParents__WEBPACK_IMPORTED_MODULE_21__.default)(_this.state.entries, entry.item.path);
          entries = [..._this.state.entries, ...parents];
          entries.push((0,_actions_updateEntry__WEBPACK_IMPORTED_MODULE_24__.default)(entry, {
            item: {
              path: (0,_features_file__WEBPACK_IMPORTED_MODULE_4__.getUniquePath)(entries.map(e => e.item.path), entry.item.path)
            }
          }));
        }
      }

      _this.updateEntries(entries);
    });

    _defineProperty(_assertThisInitialized(_this), "_handleEntryPaste", (path, e) => _this.updateEntries((0,_actions_pasteEntry__WEBPACK_IMPORTED_MODULE_20__.default)(_this.state.entries, path, e)));

    _defineProperty(_assertThisInitialized(_this), "_handleCopy", path => _this.setState(state => ({
      clipboard: state.entries.filter(e => e.item.path === path)
    })));

    _defineProperty(_assertThisInitialized(_this), "_handleClearClipboard", () => _this.setState({
      clipboard: []
    }));

    _defineProperty(_assertThisInitialized(_this), "_toggleOpenFilesPane", () => _this.setState(state => ({
      openFilesPane: !state.openFilesPane
    })));

    _defineProperty(_assertThisInitialized(_this), "_toggleProjectPane", () => _this.setState(state => ({
      projectPane: !state.projectPane
    })));

    _defineProperty(_assertThisInitialized(_this), "_handleCreateFile", path => {
      let entries = (0,_actions_createNewEntry__WEBPACK_IMPORTED_MODULE_17__.default)(_this.state.entries, 'file', path);
      const newEntry = entries.find(e => !_this.state.entries.find(e2 => e2.item.path === e.item.path));
      entries = newEntry ? (0,_actions_openEntry__WEBPACK_IMPORTED_MODULE_19__.default)(entries, newEntry.item.path, true) : entries;

      _this.updateEntries(entries);
    });

    _defineProperty(_assertThisInitialized(_this), "_handleCreateFolder", path => _this.updateEntries((0,_actions_createNewEntry__WEBPACK_IMPORTED_MODULE_17__.default)(_this.state.entries, 'folder', path)));

    return _this;
  }

  _createClass(FileListComp, [{
    key: "updateEntries",
    value: function updateEntries(entries) {
      var _focusedEntry$item, _prevFocusedEntry$ite;

      const prevEntries = this.state.entries; // Sync changes

      this.setState({
        entries
      }); // Sync changes
      // Update focus

      this.props.updateFiles(files => {
        // Handle file removal (and rename)
        const updates = {};

        for (const path in files) {
          const entry = entries.find(entry => entry.item.path === path);

          if (!entry) {
            updates[path] = null;
          } // Handle file removal (and rename)
          // Handle added/renamed files

        } // Handle added/renamed files


        entries.forEach(entry => {
          if (entry.item.type === 'file' && !files[entry.item.path] && !(0,_features_file__WEBPACK_IMPORTED_MODULE_4__.isPackageJson)(entry.item.path)) {
            updates[entry.item.path] = {
              type: entry.item.asset ? 'ASSET' : 'CODE',
              contents: entry.item.asset ? entry.item.uri : entry.item.content
            };
          }
        });
        return updates;
      }); // Update focus

      const prevFocusedEntry = (0,_utils_convertFileStructure__WEBPACK_IMPORTED_MODULE_25__.findFocusedEntry)(prevEntries);
      const focusedEntry = (0,_utils_convertFileStructure__WEBPACK_IMPORTED_MODULE_25__.findFocusedEntry)(entries);

      if ((focusedEntry === null || focusedEntry === void 0 ? void 0 : (_focusedEntry$item = focusedEntry.item) === null || _focusedEntry$item === void 0 ? void 0 : _focusedEntry$item.path) !== (prevFocusedEntry === null || prevFocusedEntry === void 0 ? void 0 : (_prevFocusedEntry$ite = prevFocusedEntry.item) === null || _prevFocusedEntry$ite === void 0 ? void 0 : _prevFocusedEntry$ite.path)) {
        var _focusedEntry$item2;

        this.props.onSelectFile((focusedEntry === null || focusedEntry === void 0 ? void 0 : (_focusedEntry$item2 = focusedEntry.item) === null || _focusedEntry$item2 === void 0 ? void 0 : _focusedEntry$item2.path) ?? '');
      }
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(_Import_ImportFilesManager__WEBPACK_IMPORTED_MODULE_5__.default, {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.container),
        entries: this.state.entries,
        onImportFile: this._handleEntryImport,
        uploadFileAsync: this.props.uploadFileAsync,
        render: ({
          onImportStart: any
        }) => this.props.visible ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(_widgets_ResizablePane__WEBPACK_IMPORTED_MODULE_9__.default, {
          direction: "horizontal",
          className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.pane)
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(_shell_SidebarShell__WEBPACK_IMPORTED_MODULE_7__.SidebarShell, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(_FileListPane__WEBPACK_IMPORTED_MODULE_14__.default, {
          className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(this.state.projectPane ? styles.openFilesSmall : styles.openFilesLarge),
          title: "Open files",
          expanded: this.state.openFilesPane,
          onClick: this._toggleOpenFilesPane
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("ul", {
          className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.tabs),
          "data-test-id": "file-list-open-files-content"
        }, this.state.entries.filter(e => e.item.type === 'file' && e.state.isOpen).map(e => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(_FileListOpenEntry__WEBPACK_IMPORTED_MODULE_13__.default, {
          key: e.item.path,
          entry: e,
          onOpen: () => this._handleEntryOpen(e.item.path),
          onClose: () => this._handleEntryClose(e.item.path),
          onCloseOthers: () => this._handleEntryCloseOthers(e.item.path),
          onCloseAll: this._handleEntryCloseAll
        })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(_FileListPane__WEBPACK_IMPORTED_MODULE_14__.default, {
          className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.project),
          title: "Project",
          expanded: this.state.projectPane,
          onClick: this._toggleProjectPane,
          buttons: [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(_FileListPaneButton__WEBPACK_IMPORTED_MODULE_15__.default, {
            key: "create-file",
            onClick: () => this._handleCreateFile()
          }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("path", {
            fillOpacity: "0.7",
            d: "M3,2 L13,2 L13,14 L3,14 L3,2 Z M9,2 L13,6 L13,2 L9,2 Z M9,6 L9,2 L8,2 L8,7 L13,7 L13,6 L9,6 Z"
          }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(AddIcon, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(_FileListPaneButton__WEBPACK_IMPORTED_MODULE_15__.default, {
            key: "create-folder",
            onClick: () => this._handleCreateFolder()
          }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("path", {
            fillOpacity: "0.7",
            d: "M7.25,4 L7.5,4 L7.5,3 L7,3.5 L7,2 L15,2 L15,4 L7.25,4 Z M6.75,4 L5,4 L7,2 L7,3.5 L6.5,4 L6.75,4 Z M1,4 L15,4 L15,14 L1,14 L1,4 Z M7.5,3 L7.5,4 L14,4 L14,3 L7.5,3 Z"
          }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(AddIcon, null))]
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(_FileListEntryDropTarget__WEBPACK_IMPORTED_MODULE_12__.default, {
          className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.files),
          rest: this.state.entries,
          onRename: this._handleEntryRename
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", {
          className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.children),
          "data-test-id": "file-list-project-content"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(_FileListChildren__WEBPACK_IMPORTED_MODULE_11__.default, {
          parent: "",
          entries: this.state.entries,
          clipboard: this.state.clipboard,
          onCreateFile: this._handleCreateFile,
          onCreateFolder: this._handleCreateFolder,
          onOpen: this._handleEntryOpen,
          onSelect: this._handleEntrySelect,
          onFocus: this._handleEntryFocus,
          onPaste: this._handleEntryPaste,
          onRename: this._handleEntryRename,
          onExpand: this._handleEntryExpand,
          onDelete: this._handleEntryDelete,
          onCopy: this._handleCopy,
          onClearClipboard: this._handleClearClipboard,
          theme: this.props.theme,
          className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.list)
        })))), this.state.deleted.map(group => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(_widgets_Toast__WEBPACK_IMPORTED_MODULE_10__.default, {
          key: group.id,
          label: `Deleted ${group.path.split('/').pop()}`,
          actions: [{
            label: 'Undo',
            action: () => {
              this._restoreEntries(group.entries);

              this._handleDismissDelete(group.id);
            }
          }, {
            label: 'Dismiss'
          }],
          onDismiss: () => this._handleDismissDelete(group.id)
        })).reverse())) : null
      });
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      let entries = (0,_utils_convertFileStructure__WEBPACK_IMPORTED_MODULE_25__.filesToEntries)(props.files, props.annotations, state.entries);
      entries = state.selectedFile !== props.selectedFile ? (0,_actions_openEntry__WEBPACK_IMPORTED_MODULE_19__.default)(entries, props.selectedFile) : entries;
      return {
        entries,
        selectedFile: props.selectedFile
      };
    }
  }]);

  return FileListComp;
}(react__WEBPACK_IMPORTED_MODULE_2__.PureComponent);

const FileList = (0,_features_preferences__WEBPACK_IMPORTED_MODULE_6__.withThemeName)(FileListComp);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_features_preferences__WEBPACK_IMPORTED_MODULE_6__.withThemeName)(FileListComp));
const styles = aphrodite__WEBPACK_IMPORTED_MODULE_0__.StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  list: {
    padding: '0 12px',
    height: '100%'
  },
  pane: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    width: 240,
    minWidth: 240,
    height: '100%',
    zIndex: 10
  },
  project: {
    flex: 1
  },
  openFilesSmall: {
    maxHeight: '50%'
  },
  openFilesLarge: {
    maxHeight: 'calc(100% - 30px)'
  },
  files: {
    flex: '1 0 0',
    overflow: 'auto',
    paddingBottom: 16
  },
  children: {
    position: 'relative'
  },
  tabs: {
    margin: 0,
    listStyle: 'none',
    padding: '2px 0',
    overflow: 'auto',
    ':empty': {
      display: 'none'
    }
  },
  toolbar: {
    padding: 8
  },
  toasts: {
    position: 'fixed',
    bottom: '3em',
    left: '1em',
    zIndex: 10
  }
});

/***/ }),

/***/ "./src/components/FileList/FileListChildren.tsx":
/*!******************************************************!*\
  !*** ./src/components/FileList/FileListChildren.tsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FileListChildren)
/* harmony export */ });
/* harmony import */ var aphrodite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aphrodite */ "./node_modules/aphrodite/no-important.js");
/* harmony import */ var escape_string_regexp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! escape-string-regexp */ "./node_modules/escape-string-regexp/index.js");
/* harmony import */ var escape_string_regexp__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(escape_string_regexp__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _features_file__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../features/file */ "./src/features/file/index.tsx");
/* harmony import */ var _FileListEntry__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./FileListEntry */ "./src/components/FileList/FileListEntry.tsx");
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
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\FileList\FileListChildren.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/






let FileListChildren = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(FileListChildren, _React$PureComponent);

  var _super = _createSuper(FileListChildren);

  function FileListChildren(...args) {
    var _this;

    _classCallCheck(this, FileListChildren);

    _this = _super.call(this, ...args);

    _defineProperty(_assertThisInitialized(_this), "_getImmediateChildren", () => _this.props.entries.filter(e => !e.item.path.replace(new RegExp(`^${escape_string_regexp__WEBPACK_IMPORTED_MODULE_1___default()(_this.props.parent)}/`), '').includes('/') // Filter-out non-immediate children
    ));

    return _this;
  }

  _createClass(FileListChildren, [{
    key: "render",
    value: function render() {
      const {
        entries,
        clipboard,
        onCreateFile,
        onCreateFolder,
        onFocus,
        onOpen,
        onSelect,
        onPaste,
        onRename,
        onExpand,
        onDelete,
        onCopy,
        onClearClipboard,
        className,
        theme
      } = this.props;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", {
        className: `${(0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.container)} ${className ?? ''}`
      }, this._getImmediateChildren().sort((a, b) => {
        if (a.item.type === b.item.type) {
          if (a.item.path.startsWith('.') && !b.item.path.startsWith('.')) {
            return 1;
          }

          if (b.item.path.startsWith('.') && !a.item.path.startsWith('.')) {
            return -1;
          }

          return a.item.path.localeCompare(b.item.path);
        } else {
          if (a.item.type === 'folder') {
            return -1;
          } else {
            return 1;
          }
        }
      }).map(e => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(_FileListEntry__WEBPACK_IMPORTED_MODULE_4__.default, {
        key: e.item.path,
        entry: e,
        rest: entries.filter(en => (0,_features_file__WEBPACK_IMPORTED_MODULE_3__.isInsideFolder)(en.item.path, e.item.path)),
        clipboard: clipboard,
        onCreateFile: onCreateFile,
        onCreateFolder: onCreateFolder,
        onOpen: onOpen,
        onSelect: onSelect,
        onFocus: onFocus,
        onCopy: onCopy,
        onPaste: onPaste,
        onDelete: onDelete,
        onRename: onRename,
        onExpand: onExpand,
        onClearClipboard: onClearClipboard,
        getAdjacentEntries: this._getImmediateChildren,
        theme: theme
      })));
    }
  }]);

  return FileListChildren;
}(react__WEBPACK_IMPORTED_MODULE_2__.PureComponent);


const styles = aphrodite__WEBPACK_IMPORTED_MODULE_0__.StyleSheet.create({
  container: {
    display: 'inline-block',
    width: '100%'
  }
});

/***/ }),

/***/ "./src/components/FileList/FileListEntry.tsx":
/*!***************************************************!*\
  !*** ./src/components/FileList/FileListEntry.tsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FileListEntry": () => (/* binding */ FileListEntry),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var aphrodite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aphrodite */ "./node_modules/aphrodite/no-important.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _features_file__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../features/file */ "./src/features/file/index.tsx");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ThemeProvider */ "./src/components/ThemeProvider.tsx");
/* harmony import */ var _widgets_KeybindingsManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../widgets/KeybindingsManager */ "./src/components/widgets/KeybindingsManager.tsx");
/* harmony import */ var _FileListChildren__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./FileListChildren */ "./src/components/FileList/FileListChildren.tsx");
/* harmony import */ var _FileListEntryBase__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./FileListEntryBase */ "./src/components/FileList/FileListEntryBase.tsx");
/* harmony import */ var _FileListEntryIcon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./FileListEntryIcon */ "./src/components/FileList/FileListEntryIcon.tsx");
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
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\FileList\FileListEntry.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/









const toggleTSExt = name => name.replace(/(\.[^.]+$)/, (_, $1) => $1 === '.js' ? '.tsx' : '.js');

let FileListEntry = /*#__PURE__*/function (_React$Component) {
  _inherits(FileListEntry, _React$Component);

  var _super = _createSuper(FileListEntry);

  function FileListEntry(_props) {
    var _this;

    _classCallCheck(this, FileListEntry);

    _this = _super.call(this, _props);

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    _defineProperty(_assertThisInitialized(_this), "_handleToggleExpand", () => _this.props.onExpand(_this.props.entry.item.path, !_this.props.entry.state.isExpanded));

    _defineProperty(_assertThisInitialized(_this), "_handleToggleRename", () => {
      if (_this.state.isRenaming && !_this.state.error) {
        _this._handleNameChange(_this.state.name);
      }

      _this.setState((state, props) => state.isRenaming ? {
        isRenaming: false,
        name: '',
        error: null
      } : {
        isRenaming: true,
        name: props.entry.item.path.split('/').pop() ?? '',
        error: null
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_handleDelete", () => _this.props.onDelete(_this.props.entry.item.path));

    _defineProperty(_assertThisInitialized(_this), "_handleNameChange", name => {
      const {
        entry
      } = _this.props;

      if (name && (name !== entry.item.path.split('/').pop() || entry.state.isCreating)) {
        const newPath = entry.item.path.replace(/[^/]+$/, name);

        _this.props.onRename(entry.item.path, newPath);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_handleInputChange", e => {
      const name = e.target.value;

      _this.setState({
        name,
        error: _this._validateName(name)
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_validateName", name => {
      if (name === _this.props.entry.item.path.split('/').pop()) {
        return null;
      }

      const invalidCharacters = ['\0', '\\', ':', '*', '?', '"', '<', '>', '|'];
      const usedCharacters = invalidCharacters.filter(c => name.includes(c));

      if (usedCharacters.length) {
        return new Error(`${usedCharacters.length === 1 ? `${usedCharacters[0]} is` : `${usedCharacters.join(', ')} are`}
                 not allowed`);
      }

      const adjacentEntries = _this.props.getAdjacentEntries();

      if (adjacentEntries.some(e => (e.item.path.split('/').pop() ?? '').toLowerCase() === name.toLowerCase())) {
        return new Error(`Another entry already exists with same name`);
      }

      if ((0,_features_file__WEBPACK_IMPORTED_MODULE_2__.isEntryPoint)(name)) {
        return new Error(`Cannot name a new file as ${name}`);
      }

      return null;
    });

    _defineProperty(_assertThisInitialized(_this), "_handleInputFocus", e => {
      const input = e.target;

      if (input instanceof HTMLInputElement) {
        input.select();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_handleInputBlur", () => {
      if (!_this.state.error) {
        _this._handleNameChange(_this.state.name);
      }

      _this.setState({
        isRenaming: false,
        name: '',
        error: null
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_handleInputKeyUp", e => {
      switch (e.keyCode) {
        case _widgets_KeybindingsManager__WEBPACK_IMPORTED_MODULE_4__.KeyMap.Enter:
          {
            _this._handleToggleRename();

            break;
          }

        case _widgets_KeybindingsManager__WEBPACK_IMPORTED_MODULE_4__.KeyMap.Escape:
          {
            _this._handleInputBlur();

            break;
          }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_handleCreateFile", () => _this.props.onCreateFile(_this.props.entry.item.path));

    _defineProperty(_assertThisInitialized(_this), "_handleCreateFolder", () => _this.props.onCreateFolder(_this.props.entry.item.path));

    _defineProperty(_assertThisInitialized(_this), "_handleCopy", () => _this.props.onCopy(_this.props.entry.item.path));

    _defineProperty(_assertThisInitialized(_this), "_handlePaste", () => {
      const {
        entry,
        clipboard,
        onPaste,
        onClearClipboard
      } = _this.props;
      clipboard.forEach(e => onPaste(entry.item.path, e));
      onClearClipboard();
    });

    _defineProperty(_assertThisInitialized(_this), "_handleDuplicate", () => {
      const {
        entry,
        onPaste
      } = _this.props;
      const path = entry.item.path.includes('/') ? entry.item.type === 'folder' ? (0,_features_file__WEBPACK_IMPORTED_MODULE_2__.getParentPath)(entry.item.path) : entry.item.path : undefined;
      onPaste(path, entry);
    });

    _defineProperty(_assertThisInitialized(_this), "_handleToggleTSExt", () => {
      const filepath = _this.props.entry.item.path;

      _this.props.onRename(filepath, toggleTSExt(filepath));
    });

    _defineProperty(_assertThisInitialized(_this), "_getActions", () => [{
      label: 'New file',
      handler: _this._handleCreateFile
    }, {
      label: 'New folder',
      handler: _this._handleCreateFolder
    }, _this.props.entry.item.type === 'folder' ? {
      label: _this.props.entry.item.type === 'folder' && _this.props.entry.state.isExpanded ? 'Collapse' : 'Expand',
      handler: _this._handleToggleExpand,
      combo: [_widgets_KeybindingsManager__WEBPACK_IMPORTED_MODULE_4__.KeyMap.Enter]
    } : undefined, _this.props.clipboard.length ? {
      label: 'Paste',
      handler: _this._handlePaste,
      combo: [_widgets_KeybindingsManager__WEBPACK_IMPORTED_MODULE_4__.KeyMap.Meta, _widgets_KeybindingsManager__WEBPACK_IMPORTED_MODULE_4__.KeyMap.V]
    } : !_this.props.entry.item.virtual ? {
      label: 'Copy',
      handler: _this._handleCopy,
      combo: [_widgets_KeybindingsManager__WEBPACK_IMPORTED_MODULE_4__.KeyMap.Meta, _widgets_KeybindingsManager__WEBPACK_IMPORTED_MODULE_4__.KeyMap.C]
    } : undefined, !_this.props.entry.item.virtual ? {
      label: 'Duplicate',
      handler: _this._handleDuplicate,
      combo: [_widgets_KeybindingsManager__WEBPACK_IMPORTED_MODULE_4__.KeyMap.Meta, _widgets_KeybindingsManager__WEBPACK_IMPORTED_MODULE_4__.KeyMap.D]
    } : undefined, (0,_features_file__WEBPACK_IMPORTED_MODULE_2__.isEntryPoint)(_this.props.entry.item.path) ? {
      label: `Rename to ${toggleTSExt(_this.props.entry.item.path)}`,
      handler: _this._handleToggleTSExt
    } : undefined, ...(!(0,_features_file__WEBPACK_IMPORTED_MODULE_2__.isEntryPoint)(_this.props.entry.item.path) && !_this.props.entry.item.virtual ? [{
      label: 'Rename',
      handler: _this._handleToggleRename,
      combo: [_widgets_KeybindingsManager__WEBPACK_IMPORTED_MODULE_4__.KeyMap.F2]
    }, {
      label: 'Delete',
      handler: _this._handleDelete,
      combo: [_widgets_KeybindingsManager__WEBPACK_IMPORTED_MODULE_4__.KeyMap.Delete]
    }] : [])]);

    _defineProperty(_assertThisInitialized(_this), "_renderItem", () => {
      const {
        entry
      } = _this.props;
      const {
        isRenaming,
        name
      } = _this.state;
      const displayName = isRenaming ? '\u00A0' : entry.item.path.split('/').pop();
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null, _this.state.error ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.error)
      }, _this.state.error.message) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_FileListEntryIcon__WEBPACK_IMPORTED_MODULE_7__.default, {
        entry: entry
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.label, (0,_features_file__WEBPACK_IMPORTED_MODULE_2__.isTest)(entry.item.path) ? styles.labelTest : undefined, entry.state.isError ? styles.labelError : undefined)
      }, displayName), isRenaming ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", {
        autoFocus: true,
        type: "text",
        value: name,
        onChange: _this._handleInputChange,
        onFocus: _this._handleInputFocus,
        onBlur: _this._handleInputBlur,
        onKeyUp: _this._handleInputKeyUp,
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.input)
      }) : null);
    });

    _defineProperty(_assertThisInitialized(_this), "_renderTree", () => {
      const {
        entry,
        rest,
        clipboard,
        onCreateFile,
        onCreateFolder,
        onOpen,
        onSelect,
        onFocus,
        onPaste,
        onRename,
        onExpand,
        onDelete,
        onCopy,
        onClearClipboard,
        theme
      } = _this.props;
      return entry.item.type === 'folder' && rest.length && entry.state.isExpanded ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.child)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_FileListChildren__WEBPACK_IMPORTED_MODULE_5__.default, {
        parent: entry.item.path,
        entries: rest,
        clipboard: clipboard,
        onCreateFile: onCreateFile,
        onCreateFolder: onCreateFolder,
        onOpen: onOpen,
        onSelect: onSelect,
        onFocus: onFocus,
        onCopy: onCopy,
        onPaste: onPaste,
        onRename: onRename,
        onExpand: onExpand,
        onDelete: onDelete,
        onClearClipboard: onClearClipboard,
        theme: theme
      })) : null;
    });

    _defineProperty(_assertThisInitialized(_this), "_renderMenuIcon", () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("svg", {
      className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.icon),
      viewBox: "0 0 16 16"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("circle", {
      cy: "3",
      cx: "8",
      r: "1.5"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("circle", {
      cy: "8",
      cx: "8",
      r: "1.5"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("circle", {
      cy: "13",
      cx: "8",
      r: "1.5"
    })));

    const {
      entry: _entry
    } = _props;
    _this.state = {
      name: _entry.state.isCreating ? _entry.item.path.split('/').pop() ?? '' : '',
      error: null,
      isRenaming: !_entry.item.asset && !!_entry.state.isCreating
    };
    return _this;
  }

  _createClass(FileListEntry, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.entry.state.isCreating) {
        this.props.onOpen(this.props.entry.item.path);
      }
    }
  }, {
    key: "render",
    value: function render() {
      // Disable drag n drop for the entry file and virtual files
      // Also disable for files being created because they will have a nested input
      // Otherwise it'll be impossible to move the cursor in the input by dragging
      const {
        entry,
        rest,
        onOpen,
        onFocus,
        onRename,
        onExpand,
        theme
      } = this.props; // Disable drag n drop for the entry file and virtual files
      // Also disable for files being created because they will have a nested input
      // Otherwise it'll be impossible to move the cursor in the input by dragging

      const draggable = !(((0,_features_file__WEBPACK_IMPORTED_MODULE_2__.isEntryPoint)(this.props.entry.item.path) || this.props.entry.item.virtual) ?? this.props.entry.state.isCreating);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_FileListEntryBase__WEBPACK_IMPORTED_MODULE_6__.default, {
        entry: entry,
        rest: rest,
        onOpen: onOpen,
        onFocus: onFocus,
        onRename: onRename,
        onExpand: onExpand,
        renderItem: this._renderItem,
        renderTree: this._renderTree,
        renderMenuIcon: this._renderMenuIcon,
        actions: this._getActions(),
        draggable: draggable,
        theme: theme
      });
    }
  }]);

  return FileListEntry;
}(react__WEBPACK_IMPORTED_MODULE_1__.Component);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FileListEntry);
const styles = aphrodite__WEBPACK_IMPORTED_MODULE_0__.StyleSheet.create({
  child: {
    marginLeft: 16
  },
  label: {
    verticalAlign: -1,
    margin: '0 6px',
    userSelect: 'none'
  },
  labelError: {
    color: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('error')
  },
  labelTest: {
    color: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('soft')
  },
  input: {
    position: 'absolute',
    top: 0,
    left: 35,
    height: 28,
    margin: 1,
    border: `1px solid ${(0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('selected')}`,
    borderRadius: 3,
    backgroundColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('content'),
    outline: 0,
    paddingLeft: 2
  },
  error: {
    backgroundColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('error'),
    color: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('error-text'),
    padding: '4px 8px',
    position: 'fixed',
    marginTop: -32,
    marginLeft: 20,
    borderRadius: 3
  },
  icon: {
    height: 16,
    width: 16,
    opacity: 0.7,
    fill: 'currentColor'
  }
});

/***/ }),

/***/ "./src/components/FileList/FileListEntryBase.tsx":
/*!*******************************************************!*\
  !*** ./src/components/FileList/FileListEntryBase.tsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lastDraggedEntry": () => (/* binding */ lastDraggedEntry),
/* harmony export */   "default": () => (/* binding */ FileListEntry)
/* harmony export */ });
/* harmony import */ var aphrodite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aphrodite */ "./node_modules/aphrodite/no-important.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _widgets_ContextMenu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../widgets/ContextMenu */ "./src/components/widgets/ContextMenu.tsx");
/* harmony import */ var _widgets_KeybindingsManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../widgets/KeybindingsManager */ "./src/components/widgets/KeybindingsManager.tsx");
/* harmony import */ var _FileListEntryDropTarget__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./FileListEntryDropTarget */ "./src/components/FileList/FileListEntryDropTarget.tsx");
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
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\FileList\FileListEntryBase.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/





let lastDraggedEntry;

let FileListEntry = /*#__PURE__*/function (_React$Component) {
  _inherits(FileListEntry, _React$Component);

  var _super = _createSuper(FileListEntry);

  function FileListEntry(...args) {
    var _this;

    _classCallCheck(this, FileListEntry);

    _this = _super.call(this, ...args);

    _defineProperty(_assertThisInitialized(_this), "state", {
      menu: null,
      isHovered: false
    });

    _defineProperty(_assertThisInitialized(_this), "_handleClick", event => {
      if (event.target.tagName === 'INPUT') {
        return;
      }

      _this.props.onOpen(_this.props.entry.item.path);
    });

    _defineProperty(_assertThisInitialized(_this), "_handleMouseEnter", () => _this.setState({
      isHovered: true
    }));

    _defineProperty(_assertThisInitialized(_this), "_handleMouseLeave", () => _this.setState({
      isHovered: false
    }));

    _defineProperty(_assertThisInitialized(_this), "_handleMouseDown", () => _this._click = true);

    _defineProperty(_assertThisInitialized(_this), "_handleFocus", () => {
      if (_this._click) {
        // The focus was triggered by a click event
        // Ignore it to avoid double handling
        _this._click = false;
        return;
      }

      _this.props.onFocus(_this.props.entry.item.path);
    });

    _defineProperty(_assertThisInitialized(_this), "_handleKeyDown", event => {
      if (event.target.tagName === 'INPUT') {
        return;
      }

      const bindings = _this.props.actions.filter(action => action !== null && action !== void 0 && action.combo ? (0,_widgets_KeybindingsManager__WEBPACK_IMPORTED_MODULE_3__.isKeyCombo)(event, action.combo) : false);

      if (bindings.length) {
        event.preventDefault();
        bindings.forEach(binding => {
          var _binding$handler;

          return binding === null || binding === void 0 ? void 0 : (_binding$handler = binding.handler) === null || _binding$handler === void 0 ? void 0 : _binding$handler.call(binding);
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_hideContextMenu", () => _this.setState({
      menu: null
    }));

    _defineProperty(_assertThisInitialized(_this), "_showContextMenu", e => _this.setState({
      menu: {
        pageX: e.pageX,
        pageY: e.pageY
      }
    }));

    _defineProperty(_assertThisInitialized(_this), "_handleDocumentClick", e => {
      if (_this.state.menu) {
        if (_this._menu.current && e.target !== _this._menu.current && !_this._menu.current.contains(e.target)) {
          _this._hideContextMenu();
        }
      } else {
        if (_this._more.current && (e.target === _this._more.current || _this._more.current.contains(e.target))) {
          if (_this.state.menu) {
            _this._hideContextMenu();
          } else {
            _this._showContextMenu(e);
          }
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_handleDocumentContextMenu", e => {
      var _this$_item$current, _this$_item$current$c;

      if (e.target === _this._item.current || (_this$_item$current = _this._item.current) !== null && _this$_item$current !== void 0 && (_this$_item$current$c = _this$_item$current.contains) !== null && _this$_item$current$c !== void 0 && _this$_item$current$c.call(_this$_item$current, e.target)) {
        e.preventDefault();

        _this._showContextMenu(e);
      } else {
        if (_this.state.menu) {
          _this._hideContextMenu();
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_handleDragStart", e => {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('application/json', JSON.stringify(_this.props.entry));
      lastDraggedEntry = _this.props.entry;
    });

    _defineProperty(_assertThisInitialized(_this), "_handleDragEnd", () => lastDraggedEntry = null);

    _defineProperty(_assertThisInitialized(_this), "_click", false);

    _defineProperty(_assertThisInitialized(_this), "_item", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createRef());

    _defineProperty(_assertThisInitialized(_this), "_more", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createRef());

    _defineProperty(_assertThisInitialized(_this), "_menu", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createRef());

    return _this;
  }

  _createClass(FileListEntry, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener('click', this._handleDocumentClick);
      document.addEventListener('contextmenu', this._handleDocumentContextMenu);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('click', this._handleDocumentClick);
      document.removeEventListener('contextmenu', this._handleDocumentContextMenu);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props$renderTre, _this$props;

      const {
        entry,
        rest,
        draggable,
        onRename,
        onExpand,
        theme,
        actions
      } = this.props;
      const {
        menu,
        isHovered
      } = this.state;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_FileListEntryDropTarget__WEBPACK_IMPORTED_MODULE_4__.default, {
        entry: entry,
        rest: rest,
        onRename: onRename,
        onExpand: onExpand
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
        ref: this._item,
        draggable: draggable,
        onDragStart: this._handleDragStart,
        onDragEnd: this._handleDragEnd,
        tabIndex: 0,
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.entry),
        onClick: this._handleClick,
        onMouseEnter: this._handleMouseEnter,
        onMouseLeave: this._handleMouseLeave,
        onMouseDown: this._handleMouseDown,
        onFocus: this._handleFocus,
        onKeyDown: this._handleKeyDown
      }, this.props.renderItem()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.highlight, theme === 'dark' ? styles.highlightDark : styles.highlightLight, entry.state.isSelected ? styles.highlightActive : null)
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_ContextMenu__WEBPACK_IMPORTED_MODULE_2__.default, {
        ref: this._menu,
        visible: Boolean(menu),
        position: menu,
        actions: actions,
        onHide: this._hideContextMenu
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", {
        ref: this._more,
        tabIndex: -1,
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.more, isHovered || menu ? styles.moreVisible : styles.moreInvisible)
      }, this.props.renderMenuIcon()), (_this$props$renderTre = (_this$props = this.props).renderTree) === null || _this$props$renderTre === void 0 ? void 0 : _this$props$renderTre.call(_this$props));
    }
  }]);

  return FileListEntry;
}(react__WEBPACK_IMPORTED_MODULE_1__.Component);

_defineProperty(FileListEntry, "defaultProps", {
  draggable: true
});


const styles = aphrodite__WEBPACK_IMPORTED_MODULE_0__.StyleSheet.create({
  entry: {
    position: 'relative',
    display: 'inline-block',
    outline: 0,
    padding: '1px 16px',
    width: '100%',
    cursor: 'pointer',
    zIndex: 1,
    whiteSpace: 'nowrap'
  },
  highlight: {
    content: '""',
    display: 'inline-block',
    height: 30,
    position: 'absolute',
    left: 0,
    right: 0,
    opacity: 0,
    zIndex: 1,
    pointerEvents: 'none'
  },
  highlightLight: {
    backgroundColor: 'rgba(0, 0, 0, .04)'
  },
  highlightDark: {
    backgroundColor: 'rgba(255, 255, 255, .04)'
  },
  highlightActive: {
    opacity: 1
  },
  more: {
    position: 'absolute',
    left: -8,
    border: 0,
    outline: 0,
    background: 'none',
    height: 30,
    zIndex: 2,
    padding: '7px 12px',
    textAlign: 'right',
    ':hover': {
      opacity: 1
    }
  },
  moreInvisible: {
    opacity: 0
  },
  moreVisible: {
    opacity: 1
  },
  icon: {
    fill: 'currentColor',
    height: 16,
    width: 16
  }
});

/***/ }),

/***/ "./src/components/FileList/FileListEntryDropTarget.tsx":
/*!*************************************************************!*\
  !*** ./src/components/FileList/FileListEntryDropTarget.tsx ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _features_file__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../features/file */ "./src/features/file/index.tsx");
/* harmony import */ var _features_preferences__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../features/preferences */ "./src/features/preferences/index.tsx");
/* harmony import */ var _FileListEntryBase__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FileListEntryBase */ "./src/components/FileList/FileListEntryBase.tsx");
const _excluded = ["entry", "rest", "onExpand", "onRename", "theme"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\FileList\FileListEntryDropTarget.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/





let FileListEntryDropTarget = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(FileListEntryDropTarget, _React$PureComponent);

  var _super = _createSuper(FileListEntryDropTarget);

  function FileListEntryDropTarget(...args) {
    var _this;

    _classCallCheck(this, FileListEntryDropTarget);

    _this = _super.call(this, ...args);

    _defineProperty(_assertThisInitialized(_this), "_getParentPath", path => path.includes('/') ? path.replace(/\/[^/]+$/, '') : null);

    _defineProperty(_assertThisInitialized(_this), "_isDirectChild", path => {
      if (_this.props.entry && _this.props.entry.item.path === path) {
        return true;
      }

      const parent = _this._getParentPath(path);

      if (_this.props.entry && parent) {
        return _this.props.entry.item.path === parent;
      }

      return _this.props.entry == null && parent == null;
    });

    _defineProperty(_assertThisInitialized(_this), "_handleDragLeave", e => {
      e.currentTarget.style.backgroundColor = null;
      clearTimeout(_this._dragTimer);
      _this._dragTimer = null;
    });

    _defineProperty(_assertThisInitialized(_this), "_handleDragOver", e => {
      const entry = _FileListEntryBase__WEBPACK_IMPORTED_MODULE_3__.lastDraggedEntry;

      if (!(0,_features_file__WEBPACK_IMPORTED_MODULE_1__.dragEventIncludes)(e, 'application/json') || _this.props.entry && _this.props.entry.item.type !== 'folder' || !entry) {
        return;
      }

      if (entry.item.type !== 'file' && entry.item.type !== 'folder') {
        return;
      }

      e.stopPropagation();

      if (_this._isDirectChild(entry.item.path)) {
        return;
      }

      e.preventDefault();
      e.currentTarget.style.backgroundColor = _this.props.theme === 'dark' ? 'rgba(255, 255, 255, .1)' : 'rgba(0, 0, 0, .1)';

      if (_this._dragTimer) {
        return;
      }

      _this._dragTimer = setTimeout(() => {
        if (_this.props.entry && !_this.props.entry.state.isExpanded && _this.props.onExpand) {
          _this.props.onExpand(_this.props.entry.item.path);
        }
      }, 500);
    });

    _defineProperty(_assertThisInitialized(_this), "_dragTimer", void 0);

    _defineProperty(_assertThisInitialized(_this), "_handleDrop", e => {
      e.currentTarget.style.backgroundColor = null;

      if (!(0,_features_file__WEBPACK_IMPORTED_MODULE_1__.dragEventIncludes)(e, 'application/json') || _this.props.entry && _this.props.entry.item.type !== 'folder') {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      try {
        const data = e.dataTransfer.getData('application/json');
        const entry = JSON.parse(data);

        if (entry.item.type !== 'file' && entry.item.type !== 'folder' || _this._isDirectChild(entry.item.path)) {
          return;
        }

        const name = entry.item.path.split('/').pop();

        _this.props.onRename(entry.item.path, (0,_features_file__WEBPACK_IMPORTED_MODULE_1__.getUniquePath)(_this.props.rest.map(e => e.item.path), _this.props.entry ? _this.props.entry.item.path + '/' + name : name));
      } catch (e) {}
    });

    _defineProperty(_assertThisInitialized(_this), "_container", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createRef());

    return _this;
  }

  _createClass(FileListEntryDropTarget, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      const container = this._container.current;

      if (container) {
        // We don't use react's event system since we need to stop the events from bubbling up
        container.addEventListener('dragover', this._handleDragOver);
        container.addEventListener('dragleave', this._handleDragLeave);
        container.addEventListener('dragend', this._handleDragLeave);
        container.addEventListener('drop', this._handleDrop);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      const container = this._container.current;

      if (container) {
        container.removeEventListener('dragover', this._handleDragOver);
        container.removeEventListener('dragleave', this._handleDragLeave);
        container.removeEventListener('dragend', this._handleDragLeave);
        container.removeEventListener('drop', this._handleDrop);
      }
    }
  }, {
    key: "render",
    value: function render() {
      // eslint-disable-next-line no-unused-vars
      const _this$props = this.props,
            {
        entry,
        rest,
        onExpand,
        onRename,
        theme
      } = _this$props,
            restProps = _objectWithoutProperties(_this$props, _excluded);

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", _extends({}, restProps, {
        ref: this._container
      }));
    }
  }]);

  return FileListEntryDropTarget;
}(react__WEBPACK_IMPORTED_MODULE_0__.PureComponent);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_features_preferences__WEBPACK_IMPORTED_MODULE_2__.withThemeName)(FileListEntryDropTarget));

/***/ }),

/***/ "./src/components/FileList/FileListEntryIcon.tsx":
/*!*******************************************************!*\
  !*** ./src/components/FileList/FileListEntryIcon.tsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FileListEntryIcon)
/* harmony export */ });
/* harmony import */ var aphrodite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aphrodite */ "./node_modules/aphrodite/no-important.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _features_file__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../features/file */ "./src/features/file/index.tsx");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ThemeProvider */ "./src/components/ThemeProvider.tsx");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\FileList\FileListEntryIcon.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/




function FileListEntryIcon({
  entry
}) {
  let icon;

  if (entry.state.isLoading) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
      className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.spinner)
    });
  } else {
    if ((0,_features_file__WEBPACK_IMPORTED_MODULE_2__.isEntryPoint)(entry.item.path)) {
      icon = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("g", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("path", {
        d: "M7.46487122,14 C7.80521143,13.4116533 8,12.7285743 8,12 C8,9.790861 6.209139,8 4,8 C3.65470043,8 3.31961992,8.043753 3,8.12601749 L3,2 L13,2 L13,14 L7.46487122,14 Z M9,2 L13,6 L13,2 L9,2 Z M9,6 L9,2 L8,2 L8,7 L13,7 L13,6 L9,6 Z"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("circle", {
        cx: "4",
        cy: "12",
        r: "3"
      }));
    } else {
      if ((0,_features_file__WEBPACK_IMPORTED_MODULE_2__.isPackageJson)(entry.item.path)) {
        icon = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("path", {
          d: "M2,5.09257608 L7.47329684,8.31213064 L7.47329684,14.7092088 L2,11.5325867 L2,5.09257608 Z M2.49245524,4.22207437 L7.97432798,1 L13.506361,4.2238509 L7.92838937,7.41965108 L2.49245524,4.22207437 Z M14,5.09352708 L14,11.5325867 L8.47329684,14.7128733 L8.47329684,8.25995389 L14,5.09352708 Z"
        });
      } else {
        if (entry.item.type === 'folder') {
          if (entry.state.isExpanded) {
            icon = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("g", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("path", {
              d: "M7.5,5 L2,5 L2,13 L7.75,13 L14,13 L14,4 L15,4 L15,14 L1,14 L1,4 L6.5,4 L5.5,5 L7.5,5 L7.5,4.5 L7.5,5 Z M14,4 L14,3 L7.5,3 L7.5,3.5 L7.5,3 L7,3.5 L7,2 L15,2 L15,4 L14,4 Z M6.5,4 L5,4 L7,2 L7,3.5 L6.5,4 Z"
            }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("polygon", {
              points: "0 7 13 7 14 14 1 14"
            }));
          } else {
            icon = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("path", {
              d: "M7.25,4 L7.5,4 L7.5,3 L7,3.5 L7,2 L15,2 L15,4 L7.25,4 Z M6.75,4 L5,4 L7,2 L7,3.5 L6.5,4 L6.75,4 Z M1,4 L15,4 L15,14 L1,14 L1,4 Z M7.5,3 L7.5,4 L14,4 L14,3 L7.5,3 Z"
            });
          }
        } else {
          if ((0,_features_file__WEBPACK_IMPORTED_MODULE_2__.isImage)(entry.item.path)) {
            icon = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("g", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("circle", {
              cx: "5",
              cy: "5",
              r: "1"
            }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("polygon", {
              points: "5.71428571 8.41176471 8 11.2352941 10.8571429 7 14 13 2 13"
            }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("path", {
              d: "M3,3 L3,13 L13,13 L13,3 L3,3 Z M3,2 L13,2 C13.5522847,2 14,2.44771525 14,3 L14,13 C14,13.5522847 13.5522847,14 13,14 L3,14 C2.44771525,14 2,13.5522847 2,13 L2,3 C2,2.44771525 2.44771525,2 3,2 Z"
            }));
          } else {
            icon = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("path", {
              d: "M3,2 L13,2 L13,14 L3,14 L3,2 Z M9,2 L13,6 L13,2 L9,2 Z M9,6 L9,2 L8,2 L8,7 L13,7 L13,6 L9,6 Z"
            });
          }
        }
      }
    }
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("svg", {
    className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.icon, (0,_features_file__WEBPACK_IMPORTED_MODULE_2__.isTest)(entry.item.path) ? styles.test : undefined, entry.state.isError ? styles.error : undefined),
    viewBox: "0 0 16 16"
  }, icon);
}
const spin = {
  from: {
    transform: 'rotate(0deg)'
  },
  to: {
    transform: 'rotate(360deg)'
  }
};
const styles = aphrodite__WEBPACK_IMPORTED_MODULE_0__.StyleSheet.create({
  icon: {
    height: 16,
    width: 16,
    fill: 'currentColor',
    verticalAlign: 'middle',
    opacity: 0.7
  },
  error: {
    fill: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('error')
  },
  test: {
    color: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('soft')
  },
  spinner: {
    display: 'inline-block',
    verticalAlign: 'middle',
    borderStyle: 'solid',
    borderTopColor: 'currentColor',
    borderLeftColor: 'currentColor',
    borderBottomColor: 'currentColor',
    borderRightColor: 'rgba(0, 0, 0, .16)',
    borderWidth: 1,
    height: 12,
    width: 12,
    borderRadius: '50%',
    margin: '2px 2px',
    animationDuration: '1s',
    animationName: [spin],
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear'
  }
});

/***/ }),

/***/ "./src/components/FileList/FileListOpenEntry.tsx":
/*!*******************************************************!*\
  !*** ./src/components/FileList/FileListOpenEntry.tsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var aphrodite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aphrodite */ "./node_modules/aphrodite/no-important.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _features_preferences__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../features/preferences */ "./src/features/preferences/index.tsx");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ThemeProvider */ "./src/components/ThemeProvider.tsx");
/* harmony import */ var _widgets_ContextMenu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../widgets/ContextMenu */ "./src/components/widgets/ContextMenu.tsx");
/* harmony import */ var _FileListEntryIcon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./FileListEntryIcon */ "./src/components/FileList/FileListEntryIcon.tsx");
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
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\FileList\FileListOpenEntry.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/







let FileListOpenEntry = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(FileListOpenEntry, _React$PureComponent);

  var _super = _createSuper(FileListOpenEntry);

  function FileListOpenEntry(...args) {
    var _this;

    _classCallCheck(this, FileListOpenEntry);

    _this = _super.call(this, ...args);

    _defineProperty(_assertThisInitialized(_this), "state", {
      isHovered: false,
      menu: null
    });

    _defineProperty(_assertThisInitialized(_this), "_hideContextMenu", () => _this.setState({
      menu: null
    }));

    _defineProperty(_assertThisInitialized(_this), "_showContextMenu", e => _this.setState({
      menu: {
        pageX: e.pageX,
        pageY: e.pageY
      }
    }));

    _defineProperty(_assertThisInitialized(_this), "_handleDocumentClick", e => {
      if (_this.state.menu) {
        if (_this._menu.current && e.target !== _this._menu.current && !_this._menu.current.contains(e.target)) {
          _this._hideContextMenu();
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_handleDocumentContextMenu", e => {
      var _this$_item$current, _this$_item$current$c;

      if (e.target === _this._item.current || (_this$_item$current = _this._item.current) !== null && _this$_item$current !== void 0 && (_this$_item$current$c = _this$_item$current.contains) !== null && _this$_item$current$c !== void 0 && _this$_item$current$c.call(_this$_item$current, e.target)) {
        e.preventDefault();

        _this._showContextMenu(e);
      } else {
        if (_this.state.menu) {
          _this._hideContextMenu();
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_handleMouseEnter", () => _this.setState({
      isHovered: true
    }));

    _defineProperty(_assertThisInitialized(_this), "_handleMouseLeave", () => _this.setState({
      isHovered: false
    }));

    _defineProperty(_assertThisInitialized(_this), "_menu", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createRef());

    _defineProperty(_assertThisInitialized(_this), "_item", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createRef());

    return _this;
  }

  _createClass(FileListOpenEntry, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener('click', this._handleDocumentClick);
      document.addEventListener('contextmenu', this._handleDocumentContextMenu);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('click', this._handleDocumentClick);
      document.removeEventListener('contextmenu', this._handleDocumentContextMenu);
    }
  }, {
    key: "render",
    value: function render() {
      const {
        entry,
        theme
      } = this.props;
      const displayName = entry.item.path.split('/').pop();
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("li", {
        ref: this._item,
        tabIndex: -1,
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.item, entry.state.isFocused && (theme === 'dark' ? styles.focusedDark : styles.focusedLight)),
        onMouseEnter: this._handleMouseEnter,
        onMouseLeave: this._handleMouseLeave
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", {
        onClick: this.props.onClose,
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.close, this.state.isHovered ? styles.closeFocused : styles.closeBlurred)
      }, "\xD7"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
        onClick: this.props.onOpen
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_FileListEntryIcon__WEBPACK_IMPORTED_MODULE_5__.default, {
        entry: entry
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.label, entry.state.isError ? styles.labelError : undefined)
      }, displayName)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_ContextMenu__WEBPACK_IMPORTED_MODULE_4__.default, {
        ref: this._menu,
        visible: Boolean(this.state.menu),
        position: this.state.menu,
        actions: [{
          label: 'Close',
          handler: this.props.onClose
        }, {
          label: 'Close Others',
          handler: this.props.onCloseOthers
        }, {
          label: 'Close All',
          handler: this.props.onCloseAll
        }],
        onHide: this._hideContextMenu
      }));
    }
  }]);

  return FileListOpenEntry;
}(react__WEBPACK_IMPORTED_MODULE_1__.PureComponent);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_features_preferences__WEBPACK_IMPORTED_MODULE_2__.withThemeName)(FileListOpenEntry));
const styles = aphrodite__WEBPACK_IMPORTED_MODULE_0__.StyleSheet.create({
  item: {
    paddingLeft: 24,
    cursor: 'pointer',
    outline: 0,
    whiteSpace: 'nowrap'
  },
  label: {
    display: 'inline-block',
    verticalAlign: -1,
    margin: 6,
    userSelect: 'none',
    whiteSpace: 'nowrap'
  },
  labelError: {
    color: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('error')
  },
  focusedLight: {
    backgroundColor: 'rgba(0, 0, 0, .04)'
  },
  focusedDark: {
    backgroundColor: 'rgba(255, 255, 255, .04)'
  },
  close: {
    padding: '7px 8px',
    fontSize: '18px',
    border: 'none',
    appearance: 'none',
    position: 'absolute',
    left: 0,
    margin: '-3px 0 0 0',
    background: 'none',
    outline: 0
  },
  closeFocused: {
    opacity: 1
  },
  closeBlurred: {
    opacity: 0
  }
});

/***/ }),

/***/ "./src/components/FileList/FileListPane.tsx":
/*!**************************************************!*\
  !*** ./src/components/FileList/FileListPane.tsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FileListPane)
/* harmony export */ });
/* harmony import */ var aphrodite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aphrodite */ "./node_modules/aphrodite/no-important.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\FileList\FileListPane.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/


function FileListPane({
  title,
  expanded,
  buttons,
  children,
  onClick,
  className
}) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: `${className ?? ''} ${(0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.container)}`
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.header)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.left),
    onClick: onClick,
    "data-test-id": `file-list-pane-${title.toLowerCase().replace(/[^a-z]/g, '-')}`
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("svg", {
    className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.collapse, expanded ? styles.collapseExpanded : styles.collapseCollapsed),
    width: "12px",
    height: "12px",
    viewBox: "0 0 12 12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("g", {
    stroke: "none",
    strokeWidth: "2",
    fill: "none",
    fillRule: "evenodd",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("polyline", {
    stroke: "currentColor",
    transform: "translate(6.000000, 6.000000) scale(-1, 1) rotate(180.000000) translate(-6.000000, -6.000000) ",
    points: "2 4 6 8 10 4"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("h4", {
    className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.label)
  }, title)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.right)
  }, buttons)), expanded ? children : null);
}
const styles = aphrodite__WEBPACK_IMPORTED_MODULE_0__.StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '0 4px'
  },
  label: {
    fontSize: '1em',
    fontWeight: 500,
    lineHeight: 1,
    margin: 0
  },
  collapse: {
    margin: '1px 6px 1px 2px',
    opacity: 0.7
  },
  collapseCollapsed: {
    transform: 'rotate(180deg)'
  },
  collapseExpanded: {
    transform: 'rotate(0deg)'
  },
  left: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    padding: '2px 4px',
    cursor: 'pointer'
  },
  right: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
});

/***/ }),

/***/ "./src/components/FileList/FileListPaneButton.tsx":
/*!********************************************************!*\
  !*** ./src/components/FileList/FileListPaneButton.tsx ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var aphrodite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aphrodite */ "./node_modules/aphrodite/no-important.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const _excluded = ["innerRef"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\FileList\FileListPaneButton.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/



let FileListPaneButton = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(FileListPaneButton, _React$PureComponent);

  var _super = _createSuper(FileListPaneButton);

  function FileListPaneButton() {
    _classCallCheck(this, FileListPaneButton);

    return _super.apply(this, arguments);
  }

  _createClass(FileListPaneButton, [{
    key: "render",
    value: function render() {
      const _this$props = this.props,
            {
        innerRef
      } = _this$props,
            rest = _objectWithoutProperties(_this$props, _excluded);

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", _extends({}, rest, {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.button),
        ref: innerRef
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("svg", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.icon),
        viewBox: "0 0 16 16"
      }, this.props.children));
    }
  }]);

  return FileListPaneButton;
}(react__WEBPACK_IMPORTED_MODULE_1__.PureComponent);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((props, ref) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(FileListPaneButton, _extends({}, props, {
  innerRef: ref
}))));
const styles = aphrodite__WEBPACK_IMPORTED_MODULE_0__.StyleSheet.create({
  button: {
    appearance: 'none',
    background: 'transparent',
    border: 0,
    margin: 0,
    outline: 0
  },
  icon: {
    fill: 'currentColor',
    height: 16,
    width: 16,
    verticalAlign: -3
  }
});

/***/ }),

/***/ "./src/components/FileList/actions/closeEntry.tsx":
/*!********************************************************!*\
  !*** ./src/components/FileList/actions/closeEntry.tsx ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ closeEntry)
/* harmony export */ });
/* harmony import */ var _updateEntry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateEntry */ "./src/components/FileList/actions/updateEntry.tsx");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\FileList\actions\closeEntry.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/

function closeEntry(entry) {
  if (entry.item.type === 'file') {
    if (entry.state.isSelected || entry.state.isFocused || entry.state.isOpen) {
      // Unselect and unfocus the file
      return (0,_updateEntry__WEBPACK_IMPORTED_MODULE_0__.default)(entry, {
        state: {
          isOpen: false,
          isSelected: false,
          isFocused: false
        }
      });
    }
  } else {
    if (entry.state.isSelected) {
      // Unselect the folder
      return (0,_updateEntry__WEBPACK_IMPORTED_MODULE_0__.default)(entry, {
        state: {
          isSelected: false
        }
      });
    }
  }

  return entry;
}

/***/ }),

/***/ "./src/components/FileList/actions/createEntryAtPath.tsx":
/*!***************************************************************!*\
  !*** ./src/components/FileList/actions/createEntryAtPath.tsx ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createEntryAtPath)
/* harmony export */ });
/* harmony import */ var _features_file__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../features/file */ "./src/features/file/index.tsx");
/* harmony import */ var _updateEntry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./updateEntry */ "./src/components/FileList/actions/updateEntry.tsx");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\FileList\actions\createEntryAtPath.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/


function createEntryAtPath(entries, path, e, suffix) {
  // Check if an entry exists for the path we want to create the entry at
  // If the entry is a folder, we create the new entry inside
  // Otherwise we create it inside the parent
  const entry = path ? entries.find(e => e.item.path === path) : null; // If the entry is a folder, we create the new entry inside
  // Otherwise we create it inside the parent
  // @ts-ignore

  const parent = entry ? entry.item.type === 'folder' ? entry.item.path : (0,_features_file__WEBPACK_IMPORTED_MODULE_0__.getParentPath)(entry.item.path) : null; // @ts-ignore

  const name = e.item.path.split('/').pop(); // @ts-ignore

  const item = (0,_updateEntry__WEBPACK_IMPORTED_MODULE_1__.default)(e, {
    item: {
      path: (0,_features_file__WEBPACK_IMPORTED_MODULE_0__.getUniquePath)(entries.map(e => e.item.path), parent ? `${parent}/${name}` : name, suffix)
    }
  }); // @ts-ignore

  item.state = {
    isCreating: true
  };
  return item;
}

/***/ }),

/***/ "./src/components/FileList/actions/createNewEntry.tsx":
/*!************************************************************!*\
  !*** ./src/components/FileList/actions/createNewEntry.tsx ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createNewEntry)
/* harmony export */ });
/* harmony import */ var _features_file__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../features/file */ "./src/features/file/index.tsx");
/* harmony import */ var _createEntryAtPath__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createEntryAtPath */ "./src/components/FileList/actions/createEntryAtPath.tsx");
/* harmony import */ var _updateEntry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./updateEntry */ "./src/components/FileList/actions/updateEntry.tsx");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\FileList\actions\createNewEntry.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/



function createNewEntry(entries, type, at) {
  const e = type === 'file' ? {
    item: {
      path: 'Untitled file.js',
      type: 'file',
      content: ''
    },
    state: {
      isCreating: true
    }
  } : {
    item: {
      path: 'Untitled folder',
      type: 'folder'
    },
    state: {
      isCreating: true
    }
  };
  let path = at;

  if (typeof path !== 'string') {
    // Get the current folder if no path is specified
    const entry = entries.find(e => e.state.isSelected === true);
    path = entry ? entry.item.path : undefined;
  }

  const entry = (0,_createEntryAtPath__WEBPACK_IMPORTED_MODULE_1__.default)(entries, path, e);
  const next = entries.map(e => {
    if (e.item.type === 'folder' && (0,_features_file__WEBPACK_IMPORTED_MODULE_0__.isInsideFolder)(entry.item.path, e.item.path) && !e.state.isExpanded) {
      return (0,_updateEntry__WEBPACK_IMPORTED_MODULE_2__.default)(e, {
        state: {
          isExpanded: true
        }
      });
    }

    return e;
  });
  return [...next, entry];
}

/***/ }),

/***/ "./src/components/FileList/actions/expandEntry.tsx":
/*!*********************************************************!*\
  !*** ./src/components/FileList/actions/expandEntry.tsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ expandEntry)
/* harmony export */ });
/* harmony import */ var _updateEntry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateEntry */ "./src/components/FileList/actions/updateEntry.tsx");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\FileList\actions\expandEntry.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/

function expandEntry(entries, path, expand = true) {
  return entries.map(entry => {
    if (entry.item.path === path && entry.item.type === 'folder') {
      return (0,_updateEntry__WEBPACK_IMPORTED_MODULE_0__.default)(entry, {
        state: {
          isExpanded: expand
        }
      });
    }

    return entry;
  });
}

/***/ }),

/***/ "./src/components/FileList/actions/openEntry.tsx":
/*!*******************************************************!*\
  !*** ./src/components/FileList/actions/openEntry.tsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ openEntry)
/* harmony export */ });
/* harmony import */ var _updateEntry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateEntry */ "./src/components/FileList/actions/updateEntry.tsx");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\FileList\actions\openEntry.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/

function openEntry(entries, path, focus = false) {
  const entry = entries.find(e => e.item.path === path);
  const isFolder = entry ? entry.item.type === 'folder' : false;
  return entries.map(e => {
    if (e.item.path === path) {
      if (e.item.type === 'file') {
        if (e.state.isSelected && e.state.isFocused && e.state.isOpen) {
          return e;
        } // Select, open and focus the file


        return (0,_updateEntry__WEBPACK_IMPORTED_MODULE_0__.default)(e, {
          state: {
            isSelected: true,
            isFocused: true,
            isOpen: true
          }
        });
      } else {
        // Select and toggle the expand for the directory
        return (0,_updateEntry__WEBPACK_IMPORTED_MODULE_0__.default)(e, {
          state: {
            isSelected: true,
            isExpanded: focus ? e.state.isExpanded : !e.state.isExpanded
          }
        });
      }
    }

    if (e.item.type === 'file') {
      if (e.state.isSelected || e.state.isFocused) {
        // Unselect and unfocus the file
        return (0,_updateEntry__WEBPACK_IMPORTED_MODULE_0__.default)(e, {
          state: {
            isSelected: false,
            isFocused: isFolder ? e.state.isFocused : false
          }
        });
      }
    } else {
      if (e.state.isSelected) {
        // Unselect the folder
        return (0,_updateEntry__WEBPACK_IMPORTED_MODULE_0__.default)(e, {
          state: {
            isSelected: false
          }
        });
      }
    }

    return e;
  });
}

/***/ }),

/***/ "./src/components/FileList/actions/pasteEntry.tsx":
/*!********************************************************!*\
  !*** ./src/components/FileList/actions/pasteEntry.tsx ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handleEntryPaste)
/* harmony export */ });
/* harmony import */ var _features_file__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../features/file */ "./src/features/file/index.tsx");
/* harmony import */ var _createEntryAtPath__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createEntryAtPath */ "./src/components/FileList/actions/createEntryAtPath.tsx");
/* harmony import */ var _updateEntry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./updateEntry */ "./src/components/FileList/actions/updateEntry.tsx");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\FileList\actions\pasteEntry.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/



function handleEntryPaste(entries, path, e) {
  const entry = (0,_createEntryAtPath__WEBPACK_IMPORTED_MODULE_1__.default)(entries, path, e, '- Copy');

  if (e.item.type === 'folder') {
    const children = entries.filter(it => // Get children of the old folder
    (0,_features_file__WEBPACK_IMPORTED_MODULE_0__.isInsideFolder)(it.item.path, e.item.path)).map(it => // Update the parent folder name to the new one
    (0,_updateEntry__WEBPACK_IMPORTED_MODULE_2__.default)(it, {
      item: {
        path: (0,_features_file__WEBPACK_IMPORTED_MODULE_0__.changeParentPath)(it.item.path, e.item.path, entry.item.path)
      }
    }));
    return [...entries, ...children, entry];
  } else {
    return [...entries, entry];
  }
}

/***/ }),

/***/ "./src/components/FileList/actions/recursivelyCreateParents.tsx":
/*!**********************************************************************!*\
  !*** ./src/components/FileList/actions/recursivelyCreateParents.tsx ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ recursivelyCreateParents)
/* harmony export */ });
/* harmony import */ var _features_file__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../features/file */ "./src/features/file/index.tsx");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\FileList\actions\recursivelyCreateParents.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/

function recursivelyCreateParents(entries, path, expand) {
  const next = [];
  let parent = (0,_features_file__WEBPACK_IMPORTED_MODULE_0__.getParentPath)(path);

  while (parent) {
    const parentEntry = entries.find(e => e.item.path === parent);

    if (parentEntry) {
      if (parentEntry.item.type !== 'folder') {
        throw new Error('File path must be inside a folder');
      }

      break;
    } else {
      next.push({
        item: {
          type: 'folder',
          path: parent
        },
        state: {
          isExpanded: !!expand
        }
      });
      parent = (0,_features_file__WEBPACK_IMPORTED_MODULE_0__.getParentPath)(parent);
    }
  }

  return next;
}

/***/ }),

/***/ "./src/components/FileList/actions/renameEntry.tsx":
/*!*********************************************************!*\
  !*** ./src/components/FileList/actions/renameEntry.tsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ renameEntry)
/* harmony export */ });
/* harmony import */ var _features_file__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../features/file */ "./src/features/file/index.tsx");
/* harmony import */ var _recursivelyCreateParents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./recursivelyCreateParents */ "./src/components/FileList/actions/recursivelyCreateParents.tsx");
/* harmony import */ var _updateEntry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./updateEntry */ "./src/components/FileList/actions/updateEntry.tsx");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\FileList\actions\renameEntry.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/



function renameEntry(entries, oldPath, newPath) {
  const entry = entries.find(e => e.item.path === oldPath);

  if (!entry) {
    return entries;
  }

  const renamed = (0,_updateEntry__WEBPACK_IMPORTED_MODULE_2__.default)(entry, {
    item: {
      path: newPath
    }
  });
  delete renamed.state.isCreating;
  const next = entries.map(e => {
    if (e.item.path === entry.item.path) {
      return renamed;
    }

    if (renamed.item.type === 'folder' && (0,_features_file__WEBPACK_IMPORTED_MODULE_0__.isInsideFolder)(e.item.path, entry.item.path)) {
      return (0,_updateEntry__WEBPACK_IMPORTED_MODULE_2__.default)(e, {
        item: {
          path: (0,_features_file__WEBPACK_IMPORTED_MODULE_0__.changeParentPath)(e.item.path, entry.item.path, renamed.item.path)
        }
      });
    }

    return e;
  });
  const parents = (0,_recursivelyCreateParents__WEBPACK_IMPORTED_MODULE_1__.default)(next, renamed.item.path, true);
  return [...next, ...parents];
}

/***/ }),

/***/ "./src/components/FileList/actions/selectEntry.tsx":
/*!*********************************************************!*\
  !*** ./src/components/FileList/actions/selectEntry.tsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ selectEntry)
/* harmony export */ });
/* harmony import */ var _updateEntry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateEntry */ "./src/components/FileList/actions/updateEntry.tsx");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\FileList\actions\selectEntry.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/

function selectEntry(entries, path) {
  return entries.map(e => e.item.path === path ? (0,_updateEntry__WEBPACK_IMPORTED_MODULE_0__.default)(e, {
    state: {
      isSelected: !e.state.isSelected
    }
  }) : e);
}

/***/ }),

/***/ "./src/components/FileList/actions/updateEntry.tsx":
/*!*********************************************************!*\
  !*** ./src/components/FileList/actions/updateEntry.tsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ updateEntry)
/* harmony export */ });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\FileList\actions\updateEntry.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/
function updateEntry(entry, updates) {
  return _objectSpread(_objectSpread({}, entry), {}, {
    item: updates.item ? _objectSpread(_objectSpread({}, entry.item), updates.item) : entry.item,
    state: updates.state ? _objectSpread(_objectSpread({}, entry.state), updates.state) : entry.state
  });
}

/***/ }),

/***/ "./src/components/FileList/utils/convertFileStructure.tsx":
/*!****************************************************************!*\
  !*** ./src/components/FileList/utils/convertFileStructure.tsx ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "filesToEntries": () => (/* binding */ filesToEntries),
/* harmony export */   "findFocusedEntry": () => (/* binding */ findFocusedEntry)
/* harmony export */ });
/* harmony import */ var _features_file_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../features/file/index */ "./src/features/file/index.tsx");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\FileList\utils\convertFileStructure.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/


const getFolders = path => {
  // TODO: change this to slice and join
  const pathSegments = path.split('/');

  if (pathSegments.length === 0) {
    return [];
  }

  const result = [];

  for (let pathIdx = 0; pathIdx < pathSegments.length - 1; pathIdx++) {
    result.push(pathSegments.slice(0, pathIdx + 1).join('/'));
  }

  return result;
};

function fileToEntry(path, file, annotations, prevEntry) {
  const isLoading = !!annotations.find(({
    location,
    severity
  }) => (location === null || location === void 0 ? void 0 : location.fileName) === path && severity < 0);
  const isError = !isLoading && !!annotations.find(({
    location,
    severity
  }) => (location === null || location === void 0 ? void 0 : location.fileName) === path && severity >= 3);

  if (file.type === 'ASSET') {
    if (prevEntry && prevEntry.item.type === 'file' && prevEntry.item.asset) {
      return prevEntry.item.uri === file.contents && prevEntry.state.isError === isError && prevEntry.state.isLoading === isLoading ? prevEntry : {
        item: _objectSpread(_objectSpread({}, prevEntry.item), {}, {
          uri: file.contents
        }),
        state: _objectSpread(_objectSpread({}, prevEntry.state), {}, {
          isError,
          isLoading
        })
      };
    } else {
      return {
        item: {
          path,
          type: 'file',
          uri: file.contents,
          asset: true
        },
        state: {
          isError,
          isLoading
        }
      };
    }
  } else {
    const isEntry = (0,_features_file_index__WEBPACK_IMPORTED_MODULE_0__.isEntryPoint)(path);

    if (prevEntry && prevEntry.item.type === 'file' && !prevEntry.item.asset) {
      return prevEntry.item.content === file.contents && prevEntry.state.isError === isError && prevEntry.state.isLoading === isLoading ? prevEntry : {
        item: _objectSpread(_objectSpread({}, prevEntry.item), {}, {
          content: file.contents
        }),
        state: _objectSpread(_objectSpread({}, prevEntry.state), {}, {
          isError,
          isLoading
        })
      };
    } else {
      return {
        item: {
          path,
          type: 'file',
          content: file.contents,
          virtual: path === 'package.json'
        },
        state: {
          isOpen: isEntry,
          isSelected: isEntry,
          isFocused: isEntry,
          isError,
          isLoading
        }
      };
    }
  }
}

function filesToEntries(files, annotations, prevEntries) {
  const fileSystem = []; // Add entries from files

  const foldersInFileSystem = new Set();

  for (const filename of Object.keys(files).sort()) {
    for (const folder of getFolders(filename)) {
      if (!foldersInFileSystem.has(folder)) {
        fileSystem.push(prevEntries.find(entry => entry.item.path === folder) ?? {
          item: {
            path: folder,
            type: 'folder'
          },
          state: {}
        });
        foldersInFileSystem.add(folder);
      }
    }

    const file = files[filename];
    const prevEntry = prevEntries.find(entry => entry.item.path === filename);
    fileSystem.push(fileToEntry(filename, file, annotations, prevEntry)); // Add entries from files
    // Restore empty folders that cannot be derived from files
  } // Restore empty folders that cannot be derived from files


  prevEntries.forEach(entry => {
    if (entry.item.type === 'folder' && !foldersInFileSystem.has(entry.item.path)) {
      fileSystem.push(entry);
    }
  });
  return fileSystem;
}
function findFocusedEntry(entries) {
  return entries.find(entry => entry.item.type === 'file' && entry.state.isFocused);
}

/***/ }),

/***/ "./src/components/Form/Form.tsx":
/*!**************************************!*\
  !*** ./src/components/Form/Form.tsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormValidationContext": () => (/* binding */ FormValidationContext),
/* harmony export */   "default": () => (/* binding */ Form)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
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
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\Form\Form.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/

const FormValidationContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(undefined);

let Form = /*#__PURE__*/function (_React$Component) {
  _inherits(Form, _React$Component);

  var _super = _createSuper(Form);

  function Form(...args) {
    var _this;

    _classCallCheck(this, Form);

    _this = _super.call(this, ...args);

    _defineProperty(_assertThisInitialized(_this), "state", {
      isValid: false
    });

    _defineProperty(_assertThisInitialized(_this), "_key", 0);

    _defineProperty(_assertThisInitialized(_this), "_inputs", []);

    _defineProperty(_assertThisInitialized(_this), "_register", ({
      validate,
      focus
    }) => {
      const key = _this._key++;

      _this._inputs.push({
        key,
        validate,
        focus
      });

      return key;
    });

    _defineProperty(_assertThisInitialized(_this), "_unregister", key => _this._inputs = _this._inputs.filter(it => it.key !== key));

    _defineProperty(_assertThisInitialized(_this), "_update", () => _this.setState({
      isValid: _this._inputs.every(it => !it.validate())
    }));

    _defineProperty(_assertThisInitialized(_this), "_handleSubmit", e => {
      e.preventDefault();

      for (const input of _this._inputs) {
        if (input.validate()) {
          input.focus();
          return;
        }
      }

      _this.props.onSubmit();
    });

    return _this;
  }

  _createClass(Form, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._update();
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(FormValidationContext.Provider, {
        value: {
          register: this._register,
          unregister: this._unregister,
          update: this._update,
          valid: this.state.isValid
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", {
        onSubmit: this._handleSubmit
      }, this.props.children));
    }
  }]);

  return Form;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);



/***/ }),

/***/ "./src/components/Form/withStatus.tsx":
/*!********************************************!*\
  !*** ./src/components/Form/withStatus.tsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ withStatus)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _Form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Form */ "./src/components/Form/Form.tsx");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\Form\withStatus.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/


function withStatus(Comp) {
  function withStatusFn(props) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Form__WEBPACK_IMPORTED_MODULE_1__.FormValidationContext.Consumer, null, (value = {
      valid: true
    }) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Comp, _extends({
      disabled: !value.valid
    }, props)));
  }

  withStatusFn.displayName = `withStatus(${Comp.displayName ?? Comp.name})`;
  return withStatusFn;
}

/***/ }),

/***/ "./src/components/Form/withValidation.tsx":
/*!************************************************!*\
  !*** ./src/components/Form/withValidation.tsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ withValidation)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _Form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Form */ "./src/components/Form/Form.tsx");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\Form\withValidation.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/


function withValidation(Comp) {
  let EnhancedComponent = /*#__PURE__*/function (_React$Component) {
    _inherits(EnhancedComponent, _React$Component);

    var _super = _createSuper(EnhancedComponent);

    function EnhancedComponent(...args) {
      var _this;

      _classCallCheck(this, EnhancedComponent);

      _this = _super.call(this, ...args);

      _defineProperty(_assertThisInitialized(_this), "state", {
        initial: true,
        error: null,
        value: _this.props.value
      });

      _defineProperty(_assertThisInitialized(_this), "_key", 0);

      _defineProperty(_assertThisInitialized(_this), "_root", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createRef());

      _defineProperty(_assertThisInitialized(_this), "_validate", () => _this.props.validate(_this.props.value));

      _defineProperty(_assertThisInitialized(_this), "_focus", () => {
        var _this$_root$current, _this$_root$current$f;

        (_this$_root$current = _this._root.current) === null || _this$_root$current === void 0 ? void 0 : (_this$_root$current$f = _this$_root$current.focus) === null || _this$_root$current$f === void 0 ? void 0 : _this$_root$current$f.call(_this$_root$current);

        if (_this.state.initial) {
          _this.setState({
            initial: false,
            error: _this.props.validate(_this.props.value)
          });
        }
      });

      return _this;
    }

    _createClass(EnhancedComponent, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this._key = this.props.validation.register({
          validate: this._validate,
          focus: this._focus
        });
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
          this.props.validation.update();
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.props.validation.unregister(this._key);
      }
    }, {
      key: "render",
      value: function render() {
        // @ts-ignore
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Comp, _extends({
          ref: this._root,
          error: this.state.error
        }, this.props));
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function getDerivedStateFromProps(nextProps, prevState) {
        const initial = prevState.value !== nextProps.value ? false : prevState.initial;
        return {
          initial,
          error: initial ? null : nextProps.validate ? nextProps.validate(nextProps.value) : null,
          value: nextProps.value
        };
      }
    }]);

    return EnhancedComponent;
  }(react__WEBPACK_IMPORTED_MODULE_0__.Component);

  _defineProperty(EnhancedComponent, "displayName", `withValidation(${Comp.displayName ?? Comp.name})`);

  return props => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Form__WEBPACK_IMPORTED_MODULE_1__.FormValidationContext.Consumer, null, value => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(EnhancedComponent, _extends({
      validation: value
    }, props));
  });
}

/***/ }),

/***/ "./src/components/Import/ImportFilesManager.tsx":
/*!******************************************************!*\
  !*** ./src/components/Import/ImportFilesManager.tsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ImportFilesManager)
/* harmony export */ });
/* harmony import */ var aphrodite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aphrodite */ "./node_modules/aphrodite/no-important.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _utils_convertDataTransferItemsToFiles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/convertDataTransferItemsToFiles */ "./src/utils/convertDataTransferItemsToFiles.tsx");
/* harmony import */ var _utils_dragEventIncludes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/dragEventIncludes */ "./src/utils/dragEventIncludes.tsx");
/* harmony import */ var _features_file_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../features/file/index */ "./src/features/file/index.tsx");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../ThemeProvider */ "./src/components/ThemeProvider.tsx");
/* harmony import */ var _widgets_Button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../widgets/Button */ "./src/components/widgets/Button.tsx");
/* harmony import */ var _widgets_Modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../widgets/Modal */ "./src/components/widgets/Modal.tsx");
/* harmony import */ var _widgets_ModalDialog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../widgets/ModalDialog */ "./src/components/widgets/ModalDialog.tsx");
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
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\Import\ImportFilesManager.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/










let ImportFilesManager = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(ImportFilesManager, _React$PureComponent);

  var _super = _createSuper(ImportFilesManager);

  function ImportFilesManager(...args) {
    var _this;

    _classCallCheck(this, ImportFilesManager);

    _this = _super.call(this, ...args);

    _defineProperty(_assertThisInitialized(_this), "state", {
      isImportModalShown: false,
      isDragging: false,
      isImporting: false,
      itemsToImport: [],
      itemsErrored: [],
      importProgress: 0,
      importTotal: 0
    });

    _defineProperty(_assertThisInitialized(_this), "_handleDragOver", e => {
      if ((0,_utils_dragEventIncludes__WEBPACK_IMPORTED_MODULE_3__.default)(e, 'Files')) {
        e.preventDefault();

        if (_this.state.isImportModalShown) {
          return true;
        }

        if (!_this.state.isDragging) {
          _this.setState({
            isDragging: true
          });
        }

        clearTimeout(_this._dragTimer);
        _this._dragTimer = setTimeout(_this._handleDragEnd, 300);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_handleDragEnd", () => {
      if (_this.state.isDragging) {
        _this.setState({
          isDragging: false
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_handleDrop", e => {
      if ((0,_utils_dragEventIncludes__WEBPACK_IMPORTED_MODULE_3__.default)(e, 'Files') && e.dataTransfer && (e.dataTransfer.items || e.dataTransfer.files)) {
        const dataTransfer = e.dataTransfer;
        e.preventDefault();
        const entries = dataTransfer.items ? Array.from(dataTransfer.items).map(it => it.webkitGetAsEntry()) : Array.from(dataTransfer.files);

        _this._handleSelectFilesForImport(entries);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_dragTimer", void 0);

    _defineProperty(_assertThisInitialized(_this), "_showImportModal", () => _this.setState({
      isImportModalShown: true
    }));

    _defineProperty(_assertThisInitialized(_this), "_hideImportModal", () => _this.setState({
      isImportModalShown: false,
      itemsToImport: []
    }));

    _defineProperty(_assertThisInitialized(_this), "_handleSelectFilesForImport", items => _this.setState(state => ({
      isImportModalShown: true,
      itemsToImport: [...state.itemsToImport, ...items],
      itemsErrored: []
    })));

    _defineProperty(_assertThisInitialized(_this), "_handleImportClick", async () => {
      _this.setState({
        isImporting: true,
        isImportModalShown: false,
        importProgress: 0
      });

      const allPaths = _this.props.entries.map(e => e.item.path);

      const folderMappings = {};
      const {
        itemsToImport
      } = _this.state;
      itemsToImport.forEach(item => {
        // @ts-ignore
        if (item.isDirectory) {
          folderMappings[item.name] = (0,_features_file_index__WEBPACK_IMPORTED_MODULE_4__.getUniquePath)(allPaths, item.name);
        }
      });
      const files = await (0,_utils_convertDataTransferItemsToFiles__WEBPACK_IMPORTED_MODULE_2__.default)(itemsToImport, folderMappings);

      _this.setState({
        importTotal: files.length
      });

      await Promise.all(files.map(async ({
        file,
        path
      }) => {
        try {
          const entry = /\.(md|json|js|tsx?)$/.test(path) || (0,_features_file_index__WEBPACK_IMPORTED_MODULE_4__.isESLintConfig)(path) ? await new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = e => resolve({
              item: {
                path,
                type: 'file',
                // @ts-ignore
                content: e.target ? e.target.result : ''
              },
              state: {}
            });

            reader.onerror = error => reject(error);

            reader.readAsText(file);
          }) : await _this.props.uploadFileAsync(file).then(uri => ({
            item: {
              path,
              type: 'file',
              uri,
              asset: true
            },
            state: {}
          }));
          ;

          if (!_this.state.itemsToImport.length) {
            // Import was cancelled
            return;
          } // @ts-ignore


          _this.props.onImportFile(entry);
        } catch (error) {
          console.error(error);

          _this.setState(state => ({
            itemsErrored: [...state.itemsErrored, {
              item: file,
              error
            }]
          }));
        } finally {
          _this.setState(state => ({
            importProgress: state.importProgress + 1
          }));
        }
      }));

      _this.setState({
        itemsToImport: []
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_handleFilesChange", e => // @ts-ignore
    _this._handleSelectFilesForImport(e.target.files));

    _defineProperty(_assertThisInitialized(_this), "_handleRemoveFileImport", file => _this.setState(state => ({
      itemsToImport: state.itemsToImport.filter(f => f !== file)
    })));

    _defineProperty(_assertThisInitialized(_this), "_handleProgressDismiss", () => _this.setState({
      itemsToImport: [],
      itemsErrored: [],
      importProgress: 0,
      isImporting: false
    }));

    return _this;
  }

  _createClass(ImportFilesManager, [{
    key: "componentDidMount",
    value: // @ts-ignore
    function componentDidMount() {
      document.addEventListener('dragover', this._handleDragOver);
      document.addEventListener('drop', this._handleDrop);
    } // @ts-ignore

  }, {
    key: "render",
    value: function render() {
      const {
        isImporting,
        importProgress,
        itemsToImport,
        itemsErrored,
        isDragging,
        isImportModalShown,
        importTotal
      } = this.state;
      const importedFiles = importProgress - itemsErrored.length;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
        className: this.props.className
      }, this.props.render({
        onImportStart: this._showImportModal
      }), isImporting ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.importProgress)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.importProgressHeader)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("h4", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.importProgressLabel)
      }, importTotal === 0 ? 'Reading files…' : importProgress === importTotal ? `${importedFiles} file${importedFiles === 1 ? '' : 's'}
                                                     imported${itemsErrored.length ? `, ${itemsErrored.length} failed to import` : ` successfully`}
                                                    ` : `Importing files (${importProgress + 1}/${importTotal})`), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", {
        onClick: this._handleProgressDismiss,
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.importProgressButton)
      }, importProgress === importTotal ? 'Dismiss' : 'Cancel')), importTotal ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("progress", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.importProgressBar),
        value: importProgress / importTotal * 100,
        max: 100
      }) : null) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_Modal__WEBPACK_IMPORTED_MODULE_7__.default, {
        visible: isDragging
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.dropzoneLarge)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("h2", null, "Drop anywhere to import"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", null, "You'll be able to adjust your selection before importing them into your project"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_ModalDialog__WEBPACK_IMPORTED_MODULE_8__.default, {
        visible: isImportModalShown,
        onDismiss: this._hideImportModal,
        title: "Import files"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.paragraph)
      }, "Import JavaScript files from your computer or a GitHub repository to use in your expo project."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.dropzoneSmall)
      }, itemsToImport.length ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("ul", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.fileList)
      }, itemsToImport.map((f, i) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("li", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.fileEntry),
        key: i
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.fileEntryName)
      }, f( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
        className: "isDirectory"
      })) ? `${f.name}/` : f.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.fileEntrySize)
      }, typeof f( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
        className: "size"
      })) === 'number' ? `${(f( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
        className: "size"
      })), 1024 .toFixed(2))}kb` : ''), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", {
        onClick: () => this._handleRemoveFileImport(f),
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.fileEntryClose)
      }, "\xD7")))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.dropzonePlaceholder)
      }, "Drop your files or", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.fileInputLabel)
      }, "browse", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", {
        multiple: true,
        type: "file",
        accept: ".js",
        onChange: this._handleFilesChange,
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.fileInput)
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_Button__WEBPACK_IMPORTED_MODULE_6__.default, {
        large: true,
        variant: "primary",
        onClick: this._handleImportClick,
        disabled: !itemsToImport.length
      }, "Import")));
    }
  }]);

  return ImportFilesManager;
}(react__WEBPACK_IMPORTED_MODULE_1__.PureComponent);


const styles = aphrodite__WEBPACK_IMPORTED_MODULE_0__.StyleSheet.create({
  dropzoneLarge: {
    textAlign: 'center',
    padding: 48,
    border: `2px dashed ${(0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__.c)('border')}`,
    borderRadius: 4
  },
  dropzoneSmall: {
    border: `1px dashed ${(0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__.c)('border')}`,
    backgroundColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__.c)('background'),
    borderRadius: 3,
    height: '12em',
    marginBottom: 8
  },
  dropzonePlaceholder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paragraph: {
    margin: '8px 0 16px'
  },
  fileInputLabel: {
    margin: 0,
    paddingLeft: 4,
    color: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__.c)('selected'),
    fontWeight: 'normal',
    cursor: 'pointer',
    ':hover': {
      textDecoration: 'underline'
    }
  },
  fileInput: {
    display: 'none'
  },
  fileList: {
    listStyle: 'none',
    textAlign: 'left',
    padding: 0,
    height: '100%',
    width: '100%',
    overflow: 'auto'
  },
  fileEntry: {
    display: 'flex',
    borderBottom: `1px solid ${(0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__.c)('border')}`,
    alignItems: 'center'
  },
  fileEntrySize: {
    flex: 1,
    opacity: 0.5,
    margin: 8
  },
  fileEntryName: {
    margin: 8,
    maxWidth: '15em',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },
  fileEntryClose: {
    padding: '4px 12px',
    margin: '0 4px',
    fontSize: 18,
    background: 'none',
    border: 'none',
    appearance: 'none'
  },
  importProgress: {
    position: 'fixed',
    zIndex: 10,
    left: '1em',
    bottom: '4em',
    width: '24em',
    padding: '8px 16px',
    borderRadius: 3,
    backgroundColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__.c)('content'),
    border: `1px solid ${(0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__.c)('border')}`,
    boxShadow: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__.s)('popover')
  },
  importProgressHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: '4px 0'
  },
  importProgressLabel: {
    flex: 1,
    fontSize: '1em',
    fontWeight: 500,
    margin: 0
  },
  importProgressButton: {
    appearance: 'none',
    background: 'none',
    border: 0,
    color: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__.c)('primary')
  },
  importProgressBar: {
    appearance: 'none',
    width: '100%',
    margin: '8px 0',
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    '::-webkit-progress-bar': {
      backgroundColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__.c)('content')
    },
    '::-webkit-progress-value': {
      backgroundColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__.c)('primary')
    },
    '::-moz-progress-bar': {
      backgroundColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__.c)('content')
    },
    '::-moz-progress-value': {
      backgroundColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__.c)('primary')
    }
  }
});

/***/ }),

/***/ "./src/components/Packi/PackiManager.tsx":
/*!***********************************************!*\
  !*** ./src/components/Packi/PackiManager.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var aphrodite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aphrodite */ "./node_modules/aphrodite/no-important.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/createStyles.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/withStyles.js");
/* harmony import */ var _material_ui_core_List__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/List */ "./node_modules/@material-ui/core/esm/List/List.js");
/* harmony import */ var _material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/ListItem */ "./node_modules/@material-ui/core/esm/ListItem/ListItem.js");
/* harmony import */ var _material_ui_core_ListItemSecondaryAction__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/ListItemSecondaryAction */ "./node_modules/@material-ui/core/esm/ListItemSecondaryAction/ListItemSecondaryAction.js");
/* harmony import */ var _material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/ListItemText */ "./node_modules/@material-ui/core/esm/ListItemText/ListItemText.js");
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/IconButton */ "./node_modules/@material-ui/core/esm/IconButton/IconButton.js");
/* harmony import */ var _material_ui_core_Fab__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Fab */ "./node_modules/@material-ui/core/esm/Fab/Fab.js");
/* harmony import */ var _material_ui_icons_Delete__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/icons/Delete */ "./node_modules/@material-ui/icons/Delete.js");
/* harmony import */ var _features_preferences__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../features/preferences */ "./src/features/preferences/index.tsx");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ThemeProvider */ "./src/components/ThemeProvider.tsx");
/* harmony import */ var _features_packi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../features/packi */ "./src/features/packi/index.tsx");
/* harmony import */ var _features_form_EditorForm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../features/form/EditorForm */ "./src/features/form/EditorForm.tsx");
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
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\Packi\PackiManager.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/















let PackiManager = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(PackiManager, _React$PureComponent);

  var _super = _createSuper(PackiManager);

  function PackiManager(...args) {
    var _this;

    _classCallCheck(this, PackiManager);

    _this = _super.call(this, ...args);

    _defineProperty(_assertThisInitialized(_this), "state", {
      modalVisible: 'none'
    });

    _defineProperty(_assertThisInitialized(_this), "_handleDismissModal", () => {
      console.log('_handleDismissModal');

      _this.setState({
        modalVisible: 'none'
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_handleShowModal", kind => _this.setState({
      modalVisible: kind
    }));

    _defineProperty(_assertThisInitialized(_this), "_handleCreatePacki", (name, kind) => {
      // alert('Create packi ' + name + ' of kind ' + kind);
      _this._handleDismissModal(); // alert('Create packi ' + name + ' of kind ' + kind);


      _this.props.onCreatePacki(name, kind);
    });

    _defineProperty(_assertThisInitialized(_this), "_handleUploadPackiTemplate", (templateId, virtualFiles) => {
      _this._handleDismissModal();

      alert('Save packi template ' + templateId);

      _this.props.onUploadPackiTemplate(templateId, virtualFiles);
    });

    return _this;
  }

  _createClass(PackiManager, [{
    key: "render",
    value: function render() {
      const {
        classes,
        currentPacki,
        packiNames,
        packiTemplateNames,
        onSelectPacki,
        onDeletePacki
      } = this.props;
      const {
        modalVisible
      } = this.state;
      const gitBranchesTODO = ['master'];
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, modalVisible !== 'none' ? null : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_1__.css)(styles.buttons)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Fab__WEBPACK_IMPORTED_MODULE_6__.default, {
        variant: "extended",
        onClick: () => this._handleShowModal('create'),
        className: classes.fabButton
      }, "Create new"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Fab__WEBPACK_IMPORTED_MODULE_6__.default, {
        variant: "extended",
        onClick: () => this._handleShowModal('clone'),
        className: classes.fabButton
      }, "Git clone"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Fab__WEBPACK_IMPORTED_MODULE_6__.default, {
        variant: "extended",
        onClick: () => this._handleShowModal('commit'),
        className: classes.fabButton
      }, "Git commit/push"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Fab__WEBPACK_IMPORTED_MODULE_6__.default, {
        variant: "extended",
        onClick: () => this._handleShowModal('saveTemplate'),
        className: classes.fabButton
      }, "Upload template")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_1__.css)(styles.title)
      }, "Your Packies"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_List__WEBPACK_IMPORTED_MODULE_7__.default, {
        dense: true
      }, packiNames.map((name, i) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_8__.default, {
        key: i,
        button: true
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_9__.default, {
        primary: name,
        onClick: () => onSelectPacki(name)
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_ListItemSecondaryAction__WEBPACK_IMPORTED_MODULE_10__.default, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_11__.default, {
        "aria-label": "Delete",
        onClick: () => onDeletePacki(name)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_icons_Delete__WEBPACK_IMPORTED_MODULE_12__.default, null))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_features_form_EditorForm__WEBPACK_IMPORTED_MODULE_5__.default, {
        title: "Create New Packi",
        action: "Confirm",
        visible: modalVisible === 'create',
        onDismiss: this._handleDismissModal,
        onSubmit: values => // alert(JSON.stringify(values));
        this._handleCreatePacki(values['name'], values['kind']),
        fields: {
          name: {
            type: 'text',
            label: 'Name',
            onValidate: _features_packi__WEBPACK_IMPORTED_MODULE_4__.packiValidations.validatePackiName
          },
          kind: {
            type: 'select',
            label: 'Kind',
            options: packiTemplateNames.map(name => {
              return {
                label: name,
                value: name
              };
            })
          }
        }
      }), currentPacki && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_features_form_EditorForm__WEBPACK_IMPORTED_MODULE_5__.default, {
        title: "Save packi template",
        action: "Confirm",
        visible: modalVisible === 'saveTemplate',
        onDismiss: this._handleDismissModal,
        onSubmit: values => // alert(JSON.stringify(values));
        this._handleUploadPackiTemplate(values['templateId'], values['virtualFiles']),
        fields: {
          templateId: {
            type: 'text',
            label: 'Template id',
            default: '',
            onValidate: _features_packi__WEBPACK_IMPORTED_MODULE_4__.packiValidations.validatePackiName
          },
          virtualFiles: {
            type: 'checkbox',
            label: 'Virtual files',
            default: true
          }
        }
      }));
    }
  }]);

  return PackiManager;
}(react__WEBPACK_IMPORTED_MODULE_0__.PureComponent);

const styles = aphrodite__WEBPACK_IMPORTED_MODULE_1__.StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    fontFamily: 'var(--font-monospace)',
    fontSize: 13,
    minHeight: 16,
    margin: '4px 0'
  },
  title: {
    height: 72,
    fontSize: 24,
    width: '100%',
    lineHeight: '24px',
    display: 'flex',
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 1px 0 rgba(36, 44, 58, 0.1)'
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    zIndex: 5,
    marginTop: '6px',
    borderTop: '1px black solid'
  },
  shortcutList: {
    fontSize: '1.2em',
    tableLayout: 'fixed'
  },
  shortcutCell: {
    padding: '6px 8px',
    color: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('primary'),
    background: 'white',
    ':hover': {
      background: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('primary'),
      color: 'white'
    }
  },
  shortcutLabelCell: {
    textAlign: 'right'
  },
  shortcutDescriptionCell: {
    textAlign: 'left'
  },
  shortcutLabel: {
    color: 'inherit',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    padding: 0,
    display: 'inline-block'
  },
  saveButton: {
    minWidth: 100
  }
});

const muiStyles = theme => (0,_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_13__.default)({
  fabButton: {
    margin: theme.spacing(1)
  }
});

const StyledComp = (0,_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_14__.default)(muiStyles)(PackiManager);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_features_preferences__WEBPACK_IMPORTED_MODULE_2__.withThemeName)(StyledComp));

/***/ }),

/***/ "./src/components/Packi/PackiManagerContainer.tsx":
/*!********************************************************!*\
  !*** ./src/components/Packi/PackiManagerContainer.tsx ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _features_file__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../features/file */ "./src/features/file/index.tsx");
/* harmony import */ var _features_packi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../features/packi */ "./src/features/packi/index.tsx");
/* harmony import */ var _features_preferences__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../features/preferences */ "./src/features/preferences/index.tsx");
/* harmony import */ var _PackiManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PackiManager */ "./src/components/Packi/PackiManager.tsx");
/* harmony import */ var _widgets_Spinner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../widgets/Spinner */ "./src/components/widgets/Spinner.tsx");
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
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\Packi\PackiManagerContainer.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/








const mapStateToProps = state => ({
  loggedUser: state.app.loggedUser,
  packiNames: state.packi.packiNames,
  currentPacki: state.packi.currentPacki,
  packiTemplateNames: state.packi.packiTemplateNames,
  ownedGitRepositories: state.packi.ownedGitRepositories
});

const mapDispatchToProps = dispatch => ({
  dispatchFetchPackiList: () => dispatch(_features_packi__WEBPACK_IMPORTED_MODULE_3__.packiActions.fetchPackiListRequest()),
  dispatchSelectPacki: packiId => dispatch(_features_packi__WEBPACK_IMPORTED_MODULE_3__.packiActions.selectPackiRequest({
    id: packiId
  })),
  dispatchCreatePacki: (packiId, packiKind) => dispatch(_features_packi__WEBPACK_IMPORTED_MODULE_3__.packiActions.createPackiRequest({
    id: packiId,
    options: {
      data: packiKind
    }
  })),
  dispatchDeletePacki: packiId => dispatch(_features_packi__WEBPACK_IMPORTED_MODULE_3__.packiActions.deletePackiRequest({
    id: packiId
  })),
  dispatchFetchPackiTemplateList: () => dispatch(_features_packi__WEBPACK_IMPORTED_MODULE_3__.packiActions.fetchPackiTemplateListRequest()),
  dispatchUploadPackiTemplate: (uid, templateId, files) => dispatch(_features_packi__WEBPACK_IMPORTED_MODULE_3__.packiActions.uploadPackiTemplateRequest({
    uid,
    templateId,
    files
  }))
});

let PackiManagerContainerComp = /*#__PURE__*/function (_React$Component) {
  _inherits(PackiManagerContainerComp, _React$Component);

  var _super = _createSuper(PackiManagerContainerComp);

  function PackiManagerContainerComp(...args) {
    var _this;

    _classCallCheck(this, PackiManagerContainerComp);

    _this = _super.call(this, ...args);

    _defineProperty(_assertThisInitialized(_this), "_handleSelectPacki", async packiId => {
      _this.props.dispatchSelectPacki(packiId);

      _this.props.onClose();
    });

    _defineProperty(_assertThisInitialized(_this), "_handleCreatePacki", async (packiId, packiKind) => {
      _this.props.dispatchCreatePacki(packiId, packiKind);

      _this.props.onClose();
    });

    _defineProperty(_assertThisInitialized(_this), "_handleDeletePacki", async packiId => _this.props.dispatchDeletePacki(packiId));

    _defineProperty(_assertThisInitialized(_this), "_handleUploadPackiTemplate", async (templateId, virtualFiles) => {
      if (_this.props.loggedUser && _this.props.currentPacki) {
        const files = virtualFiles ? _this.props.currentPacki.files : _features_file__WEBPACK_IMPORTED_MODULE_2__.fileConversions.packiFilterIttf(_this.props.currentPacki.files);
        console.log('PackiManager._handleCommitGitRepository.virtualFiles', Object.keys(_this.props.currentPacki.files), virtualFiles, Object.keys(files));

        _this.props.dispatchUploadPackiTemplate(_this.props.loggedUser.uid, templateId, files);

        _this.props.onClose();
      }
    });

    return _this;
  }

  _createClass(PackiManagerContainerComp, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "render",
    value: function render() {
      const {
        currentPacki,
        packiNames,
        packiTemplateNames,
        ownedGitRepositories
      } = this.props;
      console.log('PackiManagerContainer.render.props', this.props);

      if (packiNames && packiTemplateNames) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_PackiManager__WEBPACK_IMPORTED_MODULE_5__.default, {
          currentPacki: currentPacki,
          packiNames: packiNames || [],
          packiTemplateNames: packiTemplateNames || [],
          onSelectPacki: this._handleSelectPacki,
          onCreatePacki: this._handleCreatePacki,
          onDeletePacki: this._handleDeletePacki,
          onUploadPackiTemplate: this._handleUploadPackiTemplate
        });
      } else {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_widgets_Spinner__WEBPACK_IMPORTED_MODULE_6__.default, null);
      }
    }
  }]);

  return PackiManagerContainerComp;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);

const connector = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.connect)(mapStateToProps, mapDispatchToProps);
const PackiManagerContainer = (0,_features_preferences__WEBPACK_IMPORTED_MODULE_4__.withPreferences)(connector(PackiManagerContainerComp));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PackiManagerContainer);

/***/ }),

/***/ "./src/components/PageMetadata.tsx":
/*!*****************************************!*\
  !*** ./src/components/PageMetadata.tsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getPageMetadata": () => (/* binding */ getPageMetadata),
/* harmony export */   "default": () => (/* binding */ PageMetadata)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_helmet_async__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-helmet-async */ "./node_modules/react-helmet-async/lib/index.module.js");
/* harmony import */ var _features_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../features/config */ "./src/features/config/index.tsx");
/* harmony import */ var _features_packi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../features/packi */ "./src/features/packi/index.tsx");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\PageMetadata.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/




function getPageMetadata(props) {
  const title = props.id || (0,_features_packi__WEBPACK_IMPORTED_MODULE_3__.isIntentionallyNamed)(props.name) ? `${props.name} - Packi` : _features_config__WEBPACK_IMPORTED_MODULE_2__.DEFAULT_PACKI_NAME;
  const description = props.description === _features_config__WEBPACK_IMPORTED_MODULE_2__.DEFAULT_PACKI_DESCRIPTION ? props.id ? _features_config__WEBPACK_IMPORTED_MODULE_2__.DEFAULT_PACKI_DESCRIPTION_SAVED : _features_config__WEBPACK_IMPORTED_MODULE_2__.DEFAULT_PACKI_DESCRIPTION_EMPTY : props.description;
  const url = `${({"NODE_ENV":"development","SERVER_URL":"http://localhost:5000","API_SERVER_URL":"http://localhost:5000","PACKI_SEGMENT_KEY":"","PACKI_AMPLITUDE_KEY":"","PACKI_WEBPLAYER_URL":"","IMPORT_SERVER_URL":"http://localhost:5000","DEPLOY_ENVIRONMENT":"staging","BUILD_TIMESTAMP":1624008269099}).PACKI_SERVER_URL}${props.id ? `/${props.id}` : ''}
    `;
  const image = 'https://s3.amazonaws.com/exp-brand-assets/PackiIcon_200.png';
  const meta = [{
    name: 'description',
    content: description
  }, // Open graph
  {
    property: 'og:url',
    content: url
  }, {
    property: 'og:title',
    content: title
  }, {
    property: 'og:description',
    content: description
  }, {
    property: 'og:type',
    content: 'website'
  }, {
    property: 'og:image',
    content: image
  }, {
    property: 'og:image:width',
    content: '200'
  }, {
    property: 'og:image:height',
    content: '200'
  }, // Twitter
  {
    name: 'twitter:card',
    content: 'summary'
  }, {
    name: 'twitter:site',
    content: '@expo'
  }, {
    name: 'twitter:title',
    content: title
  }, {
    name: 'twitter:description',
    content: description
  }, {
    name: 'twitter:image',
    content: image
  }];
  return {
    title,
    description,
    url,
    meta
  };
}
function PageMetadata(props) {
  const {
    title,
    meta
  } = getPageMetadata(props);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_helmet_async__WEBPACK_IMPORTED_MODULE_1__.Helmet, {
    title: title,
    meta: meta
  });
}

/***/ }),

/***/ "./src/components/Publish/ModalPublishOverwriteError.tsx":
/*!***************************************************************!*\
  !*** ./src/components/Publish/ModalPublishOverwriteError.tsx ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ModalPublishOverwriteError)
/* harmony export */ });
/* harmony import */ var aphrodite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aphrodite */ "./node_modules/aphrodite/no-important.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _widgets_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../widgets/Button */ "./src/components/widgets/Button.tsx");
/* harmony import */ var _widgets_ModalDialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../widgets/ModalDialog */ "./src/components/widgets/ModalDialog.tsx");
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

/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\Publish\ModalPublishOverwriteError.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/





let ModalPublishOverwriteError = /*#__PURE__*/function (_React$Component) {
  _inherits(ModalPublishOverwriteError, _React$Component);

  var _super = _createSuper(ModalPublishOverwriteError);

  function ModalPublishOverwriteError() {
    _classCallCheck(this, ModalPublishOverwriteError);

    return _super.apply(this, arguments);
  }

  _createClass(ModalPublishOverwriteError, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_ModalDialog__WEBPACK_IMPORTED_MODULE_3__.ModalDialog, {
        visible: this.props.visible,
        onDismiss: this.props.onDismiss,
        title: "Experience already exists!"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.text)
      }, "You already have an experience published under \"", this.props.username ? `@${this.props.username}/${this.props.slug}` : this.props.slug, "\" in your profile. Please choose another name for the Packi and save again."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_Button__WEBPACK_IMPORTED_MODULE_2__.Button, {
        large: true,
        variant: "secondary",
        onClick: this.props.onEditName
      }, "Choose another name"));
    }
  }]);

  return ModalPublishOverwriteError;
}(react__WEBPACK_IMPORTED_MODULE_1__.Component);


const styles = aphrodite__WEBPACK_IMPORTED_MODULE_0__.StyleSheet.create({
  text: {
    marginTop: 12,
    fontSize: 16,
    textAlign: 'center'
  }
});

/***/ }),

/***/ "./src/components/Publish/ModalPublishToProfile.tsx":
/*!**********************************************************!*\
  !*** ./src/components/Publish/ModalPublishToProfile.tsx ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var aphrodite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aphrodite */ "./node_modules/aphrodite/no-important.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ThemeProvider */ "./src/components/ThemeProvider.tsx");
/* harmony import */ var _widgets_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../widgets/Button */ "./src/components/widgets/Button.tsx");
/* harmony import */ var _widgets_ModalDialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../widgets/ModalDialog */ "./src/components/widgets/ModalDialog.tsx");
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
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\Publish\ModalPublishToProfile.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/







let ModalPublishToProfile = /*#__PURE__*/function (_React$Component) {
  _inherits(ModalPublishToProfile, _React$Component);

  var _super = _createSuper(ModalPublishToProfile);

  function ModalPublishToProfile(...args) {
    var _this;

    _classCallCheck(this, ModalPublishToProfile);

    _this = _super.call(this, ...args);

    _defineProperty(_assertThisInitialized(_this), "_handleKeyDown", e => {
      if (_this.props.visible && e.keyCode === 13) {
        e.preventDefault();

        _this.props.onPublish();
      }
    });

    return _this;
  }

  _createClass(ModalPublishToProfile, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener('keydown', this._handleKeyDown);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('keydown', this._handleKeyDown);
    }
  }, {
    key: "render",
    value: function render() {
      const copy = this.props.authFlow === 'save2' ? 'Want a stable and easy to remember URL?' : 'Want to easily find this packi again?';
      const cta = this.props.authFlow === 'save2' ? 'Save to your Wizzi Profile' : 'Save to Profile';
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_ModalDialog__WEBPACK_IMPORTED_MODULE_5__.ModalDialog, {
        visible: this.props.visible,
        title: "Save your packi",
        onDismiss: this.props.onDismiss
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.text),
        style: {
          marginTop: 16
        }
      }, "The shareable link to your Packi", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("a", {
        href: this.props.packiUrl,
        target: "blank"
      }, this.props.packiUrl)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.text)
      }, "Every time you save, your will get a new link to share.", copy, "Log in or sign up and save to your profile!"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_Button__WEBPACK_IMPORTED_MODULE_4__.Button, {
        large: true,
        variant: "primary",
        onClick: this.props.onPublish,
        loading: this.props.isPublishing
      }, cta), this.props.zipUrl ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.caption)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("a", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.link),
        href: this.props.zipUrl,
        target: "blank"
      }, "Download .zip file")) : null);
    }
  }]);

  return ModalPublishToProfile;
}(react__WEBPACK_IMPORTED_MODULE_1__.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_2__.connect)(state => ({
  authFlow: state.splitTestSettings.authFlow || 'save1'
}))(ModalPublishToProfile));
const styles = aphrodite__WEBPACK_IMPORTED_MODULE_0__.StyleSheet.create({
  text: {
    marginBottom: 24,
    fontSize: '16px',
    padding: '0 24px 0 24px',
    lineHeight: '22px',
    textAlign: 'center'
  },
  caption: {
    marginTop: 24,
    fontSize: '16px',
    lineHeight: '22px',
    textAlign: 'center'
  },
  link: {
    color: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('primary'),
    cursor: 'pointer',
    textDecoration: 'underline'
  }
});

/***/ }),

/***/ "./src/components/Publish/ModalPublishUnknownError.tsx":
/*!*************************************************************!*\
  !*** ./src/components/Publish/ModalPublishUnknownError.tsx ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ModalPublishUnknownError)
/* harmony export */ });
/* harmony import */ var aphrodite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aphrodite */ "./node_modules/aphrodite/no-important.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _widgets_ModalDialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../widgets/ModalDialog */ "./src/components/widgets/ModalDialog.tsx");
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

/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\Publish\ModalPublishUnknownError.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/




let ModalPublishUnknownError = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(ModalPublishUnknownError, _React$PureComponent);

  var _super = _createSuper(ModalPublishUnknownError);

  function ModalPublishUnknownError() {
    _classCallCheck(this, ModalPublishUnknownError);

    return _super.apply(this, arguments);
  }

  _createClass(ModalPublishUnknownError, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_ModalDialog__WEBPACK_IMPORTED_MODULE_2__.ModalDialog, {
        visible: this.props.visible,
        onDismiss: this.props.onDismiss,
        title: "Couldn't save the Packi!"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.text)
      }, "An unknown error occurred when saving your Packi. Please try again later."));
    }
  }]);

  return ModalPublishUnknownError;
}(react__WEBPACK_IMPORTED_MODULE_1__.PureComponent);


const styles = aphrodite__WEBPACK_IMPORTED_MODULE_0__.StyleSheet.create({
  text: {
    marginTop: 12,
    fontSize: 16,
    textAlign: 'center'
  }
});

/***/ }),

/***/ "./src/components/Publish/ModalPublishing.tsx":
/*!****************************************************!*\
  !*** ./src/components/Publish/ModalPublishing.tsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ModalPublishing)
/* harmony export */ });
/* harmony import */ var aphrodite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aphrodite */ "./node_modules/aphrodite/no-important.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _widgets_ModalDialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../widgets/ModalDialog */ "./src/components/widgets/ModalDialog.tsx");
/* harmony import */ var _widgets_Spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../widgets/Spinner */ "./src/components/widgets/Spinner.tsx");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\Publish\ModalPublishing.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/




function ModalPublishing(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_ModalDialog__WEBPACK_IMPORTED_MODULE_2__.ModalDialog, {
    visible: props.visible,
    onDismiss: props.onDismiss,
    title: "Saving Packi\u2026"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.content)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_Spinner__WEBPACK_IMPORTED_MODULE_3__.default, null)));
}
const styles = aphrodite__WEBPACK_IMPORTED_MODULE_0__.StyleSheet.create({
  content: {
    margin: '16px 8px 12px'
  }
});

/***/ }),

/***/ "./src/components/Publish/ModalSuccessfulPublish.tsx":
/*!***********************************************************!*\
  !*** ./src/components/Publish/ModalSuccessfulPublish.tsx ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var aphrodite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aphrodite */ "./node_modules/aphrodite/no-important.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _widgets_Avatar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../widgets/Avatar */ "./src/components/widgets/Avatar.tsx");
/* harmony import */ var _widgets_ModalDialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../widgets/ModalDialog */ "./src/components/widgets/ModalDialog.tsx");
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
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\Publish\ModalSuccessfulPublish.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/





let ModalSuccessfulPublish = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(ModalSuccessfulPublish, _React$PureComponent);

  var _super = _createSuper(ModalSuccessfulPublish);

  function ModalSuccessfulPublish(...args) {
    var _this;

    _classCallCheck(this, ModalSuccessfulPublish);

    _this = _super.call(this, ...args);

    _defineProperty(_assertThisInitialized(_this), "_dismissModal", () => {
      if (_this.props.onDismiss) {
        _this.props.onDismiss();
      }
    });

    return _this;
  }

  _createClass(ModalSuccessfulPublish, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {}
  }, {
    key: "render",
    value: function render() {
      var _this$props$viewer;

      const picture = (_this$props$viewer = this.props.viewer) === null || _this$props$viewer === void 0 ? void 0 : _this$props$viewer.picture;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_ModalDialog__WEBPACK_IMPORTED_MODULE_3__.ModalDialog, {
        visible: this.props.visible,
        onDismiss: this.props.onDismiss
      }, picture ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.avatar)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_widgets_Avatar__WEBPACK_IMPORTED_MODULE_2__.Avatar, {
        source: picture,
        size: 80
      })) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("h2", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.heading)
      }, "Your Packi was saved"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.text)
      }, "You can now find your Packi on your profile and link others to it. Share it with your friends!"), this.props.viewer ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.caption)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("a", {
        href: `${"http://localhost:5000"}/@${this.props.viewer.username}/packis`,
        onClick: this._dismissModal,
        target: "blank"
      }, "View your Packies")) : null);
    }
  }]);

  return ModalSuccessfulPublish;
}(react__WEBPACK_IMPORTED_MODULE_1__.PureComponent);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ModalSuccessfulPublish);
const styles = aphrodite__WEBPACK_IMPORTED_MODULE_0__.StyleSheet.create({
  avatar: {
    marginTop: 16,
    marginBottom: 24,
    textAlign: 'center'
  },
  heading: {
    fontSize: '24px',
    fontWeight: 500,
    lineHeight: '24px',
    textAlign: 'center'
  },
  text: {
    marginBottom: 24,
    fontSize: '16px',
    padding: '0 24px 0 24px',
    lineHeight: '22px',
    textAlign: 'center'
  },
  caption: {
    fontSize: '16px',
    lineHeight: '22px',
    textAlign: 'center'
  }
});

/***/ }),

/***/ "./src/components/Publish/PublishManager.tsx":
/*!***************************************************!*\
  !*** ./src/components/Publish/PublishManager.tsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _features_auth_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../features/auth/index */ "./src/features/auth/index.tsx");
/* harmony import */ var _features_packi_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../features/packi/index */ "./src/features/packi/index.tsx");
/* harmony import */ var _EditorView_ModalEditTitleAndDescription__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../EditorView/ModalEditTitleAndDescription */ "./src/components/EditorView/ModalEditTitleAndDescription.tsx");
/* harmony import */ var _ModalPublishOverwriteError__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ModalPublishOverwriteError */ "./src/components/Publish/ModalPublishOverwriteError.tsx");
/* harmony import */ var _ModalPublishToProfile__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ModalPublishToProfile */ "./src/components/Publish/ModalPublishToProfile.tsx");
/* harmony import */ var _ModalPublishUnknownError__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ModalPublishUnknownError */ "./src/components/Publish/ModalPublishUnknownError.tsx");
/* harmony import */ var _ModalPublishing__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ModalPublishing */ "./src/components/Publish/ModalPublishing.tsx");
/* harmony import */ var _ModalSuccessfulPublish__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ModalSuccessfulPublish */ "./src/components/Publish/ModalSuccessfulPublish.tsx");
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
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\Publish\PublishManager.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/











let PublishManager = /*#__PURE__*/function (_React$Component) {
  _inherits(PublishManager, _React$Component);

  var _super = _createSuper(PublishManager);

  function PublishManager(...args) {
    var _this;

    _classCallCheck(this, PublishManager);

    _this = _super.call(this, ...args);

    _defineProperty(_assertThisInitialized(_this), "state", {
      isPublishInProgress: false,
      isPublishing: false,
      hasShownEditNameDialog: false
    });

    _defineProperty(_assertThisInitialized(_this), "_publishWithOptionsAsync", async options => {
      _this.setState({
        isPublishing: true
      });

      try {
        await _this.props.onPublishAsync(options);
      } catch (e) {
        if (/Experience .+ already exists/.test(e.message)) {
          _this.props.onShowModal('publish-overwrite-experience-error');
        } else {
          _this.props.onShowModal('publish-unknown-error');
        }

        throw e;
      } finally {
        _this.setState({
          isPublishing: false
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_handleSaveToProfile", async () => {
      const isLoggedIn = Boolean(_this.props.viewer);

      if (isLoggedIn) {
        // Show a spinner so we dismiss the auth modal
        _this.props.onShowModal('publish-working');

        _this._handlePublishAsync();
      } else {
        window.location.href = (0,_features_auth_index__WEBPACK_IMPORTED_MODULE_1__.getLoginHref)({
          saveToAccount: true
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_handleSubmitMetadata", async details => {
      // Save the new name and description, then publish the packi
      _this.props.onSubmitMetadata(details);

      await _this._handlePublishAsync();
    });

    _defineProperty(_assertThisInitialized(_this), "_handlePublishAsync", async (options = {}) => {
      // When the publish flow starts, we set this so we know if we need to show the modals
      _this.setState({
        isPublishInProgress: true
      });

      if (!_this.props.name || !(0,_features_packi_index__WEBPACK_IMPORTED_MODULE_2__.isIntentionallyNamed)(_this.props.name) && !_this.state.hasShownEditNameDialog) {
        _this.props.onShowModal('publish-edit-name');

        _this.setState({
          hasShownEditNameDialog: true
        });
      } else {
        await _this._publishWithOptionsAsync(options);

        _this.props.onShowModal(_this.props.viewer ? 'publish-success' : 'publish-prompt-save');
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_handlePublishAbort", () => {
      // When publish flow ends, we don't need to show any modals
      _this.props.onHideModal(); // When publish flow ends, we don't need to show any modals


      _this.setState({
        isPublishInProgress: false
      });
    });

    return _this;
  }

  _createClass(PublishManager, [{
    key: "render",
    value: function render() {
      const {
        id,
        viewer,
        name,
        description,
        currentModal,
        children
      } = this.props;
      const {
        isPublishInProgress
      } = this.state;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, children({
        onPublishAsync: this._handlePublishAsync,
        isPublishing: this.state.isPublishing
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_EditorView_ModalEditTitleAndDescription__WEBPACK_IMPORTED_MODULE_3__.default, {
        visible: isPublishInProgress && currentModal === 'publish-edit-name',
        title: "Save your Packi",
        action: this.state.isPublishing ? 'Saving…' : 'Save',
        isWorking: this.state.isPublishing,
        name: name,
        description: description,
        onSubmit: this._handleSubmitMetadata,
        onDismiss: this._handlePublishAbort
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ModalPublishToProfile__WEBPACK_IMPORTED_MODULE_5__.default, {
        visible: isPublishInProgress && currentModal === 'publish-prompt-save',
        packiUrl: id ? `${({"NODE_ENV":"development","SERVER_URL":"http://localhost:5000","API_SERVER_URL":"http://localhost:5000","PACKI_SEGMENT_KEY":"","PACKI_AMPLITUDE_KEY":"","PACKI_WEBPLAYER_URL":"","IMPORT_SERVER_URL":"http://localhost:5000","DEPLOY_ENVIRONMENT":"staging","BUILD_TIMESTAMP":1624008269099}).PACKI_SERVER_URL}/${id}` : undefined,
        onPublish: this._handleSaveToProfile,
        isPublishing: this.state.isPublishing,
        onDismiss: this._handlePublishAbort
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ModalSuccessfulPublish__WEBPACK_IMPORTED_MODULE_8__.default, {
        visible: isPublishInProgress && currentModal === 'publish-success',
        viewer: viewer,
        onDismiss: this._handlePublishAbort
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ModalPublishUnknownError__WEBPACK_IMPORTED_MODULE_6__.default, {
        visible: isPublishInProgress && currentModal === 'publish-unknown-error',
        onDismiss: this._handlePublishAbort
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ModalPublishing__WEBPACK_IMPORTED_MODULE_7__.default, {
        visible: isPublishInProgress && currentModal === 'publish-working',
        onDismiss: this._handlePublishAbort
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ModalPublishOverwriteError__WEBPACK_IMPORTED_MODULE_4__.default, {
        visible: isPublishInProgress && currentModal === 'publish-overwrite-experience-error',
        slug: name,
        username: viewer === null || viewer === void 0 ? void 0 : viewer.username,
        onEditName: () => this.props.onShowModal('publish-edit-name'),
        onDismiss: this._handlePublishAbort
      }));
    }
  }]);

  return PublishManager;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_features_auth_index__WEBPACK_IMPORTED_MODULE_1__.withAuth)(PublishManager));

/***/ }),

/***/ "./src/components/widgets/Avatar.tsx":
/*!*******************************************!*\
  !*** ./src/components/widgets/Avatar.tsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Avatar": () => (/* binding */ Avatar),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ThemeProvider */ "./src/components/ThemeProvider.tsx");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\widgets\Avatar.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/
 // see https://mxstbr.blog/2016/11/styled-components-magic-explained/



const StyledRoot = styled_components__WEBPACK_IMPORTED_MODULE_2__.default.div`
    display: -ms-flexbox;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    stroke: ${props => (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_1__.c)('text')};
`;
const StyledImage = styled_components__WEBPACK_IMPORTED_MODULE_2__.default.img`
    width: ${props => props.size + "px"};
    height: ${props => props.size + "px"};
    -webkit-border-radius: ${props => props.size / 2 + "px"};
    -khtml-border-radius: ${props => props.size / 2 + "px"};
    -moz-border-radius: ${props => props.size / 2 + "px"};
    -o-border-radius: ${props => props.size / 2 + "px"};
    border-radius: ${props => props.size / 2 + "px"};
`;
const Avatar = ({
  size,
  source
}) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(StyledRoot, null, source ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(StyledImage, {
  src: source,
  size: size
}) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", {
  width: "20",
  height: "20",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
  d: "M13.125 13.563c2.423-3.635 2.831-10.938-2.623-10.938-5.454 0-5.05 7.303-2.627 10.938-2.423 0-5.25 2.389-5.25 4.812h15.75c.004-2.423-2.827-4.813-5.25-4.813z",
  strokeWidth: "1.75",
  strokeLinecap: "round",
  strokeLinejoin: "round"
})));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Avatar);

/***/ }),

/***/ "./src/components/widgets/Banner.tsx":
/*!*******************************************!*\
  !*** ./src/components/widgets/Banner.tsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Banner": () => (/* binding */ Banner),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ThemeProvider */ "./src/components/ThemeProvider.tsx");
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
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\widgets\Banner.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/

// see https://mxstbr.blog/2016/11/styled-components-magic-explained/


const StyledRoot = styled_components__WEBPACK_IMPORTED_MODULE_2__.default.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 0 10px;
    z-index: 999;
    text-align: center;
    pointer-events: none;
    
`;
const StyledBanner = styled_components__WEBPACK_IMPORTED_MODULE_2__.default.div`
    display: inline-block;
    margin: auto;
    padding: 1em;
    max-width: 100%;
    background-color: ${props => props.type === 'success' ? (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_1__.c)('success') : props.type === 'error' ? (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_1__.c)('error') : (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_1__.c)('primary')};
    color: ${props => props.type === 'success' ? (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_1__.c)('success-text') : props.type === 'error' ? (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_1__.c)('error-text') : (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_1__.c)('primary-text')};
    -webkit-border-radius: 0 0 4px 4px;
    -khtml-border-radius: 0 0 4px 4px;
    -moz-border-radius: 0 0 4px 4px;
    -o-border-radius: 0 0 4px 4px;
    border-radius: 0 0 4px 4px;
    transition-duration: 200ms;
    pointer-events: ${props => props.visible ? "auto" : "none"};
    -webkit-box-shadow: ${props => (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_1__.s)('popover')};
    -moz-box-shadow: ${props => (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_1__.s)('popover')};
    -o-box-shadow: ${props => (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_1__.s)('popover')};
    box-shadow: ${props => (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_1__.s)('popover')};
    -webkit-transform: ${props => props.visible ? "translateY(0)" : "translateY(-100%)"};
    -ms-transition: ${props => props.visible ? "translateY(0)" : "translateY(-100%)"};
    transform: ${props => props.visible ? "translateY(0)" : "translateY(-100%)"};
`;
let Banner = /*#__PURE__*/function (_PureComponent) {
  _inherits(Banner, _PureComponent);

  var _super = _createSuper(Banner);

  function Banner(...args) {
    var _this;

    _classCallCheck(this, Banner);

    _this = _super.call(this, ...args);

    _defineProperty(_assertThisInitialized(_this), "state", {
      rendered: _this.props.visible
    });

    _defineProperty(_assertThisInitialized(_this), "_timer", void 0);

    return _this;
  }

  _createClass(Banner, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.visible !== prevProps.visible) {
        clearTimeout(this._timer);

        if (!this.props.visible) {
          this._timer = setTimeout(() => this.setState({
            rendered: false
          }), 300);
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.state.rendered) {
        return null;
      }

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(StyledRoot, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(StyledBanner, {
        visible: this.props.visible,
        type: this.props.type,
        className: this.props.className
      }, this.props.children));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props) {
      if (props.visible) {
        return {
          rendered: true
        };
      }

      return null;
    }
  }]);

  return Banner;
}(react__WEBPACK_IMPORTED_MODULE_0__.PureComponent);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Banner);

/***/ }),

/***/ "./src/components/widgets/ContextMenu.tsx":
/*!************************************************!*\
  !*** ./src/components/widgets/ContextMenu.tsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContextMenu": () => (/* binding */ ContextMenu),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var aphrodite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aphrodite */ "./node_modules/aphrodite/no-important.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ThemeProvider */ "./src/components/ThemeProvider.tsx");
/* harmony import */ var _ShortcutLabel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ShortcutLabel */ "./src/components/widgets/ShortcutLabel.tsx");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\widgets\ContextMenu.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/





const BOTTOM_OFFSET = 35;
const MENU_ITEM_HEIGHT = 28;
let ContextMenu = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(ContextMenu, _React$PureComponent);

  var _super = _createSuper(ContextMenu);

  function ContextMenu() {
    _classCallCheck(this, ContextMenu);

    return _super.apply(this, arguments);
  }

  _createClass(ContextMenu, [{
    key: "render",
    value: function render() {
      const {
        visible,
        position,
        actions,
        onHide,
        className,
        // @ts-ignore
        innerRef
      } = this.props;

      if (!visible) {
        return null;
      }

      const shownActions = actions.filter(action => action);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("ul", {
        ref: innerRef,
        className: classnames__WEBPACK_IMPORTED_MODULE_1___default()((0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.menu), className),
        style: position ? {
          position: 'fixed',
          top: Math.min(position.pageY, window.innerHeight - BOTTOM_OFFSET - shownActions.length * MENU_ITEM_HEIGHT),
          left: position.pageX,
          marginTop: -8
        } : {}
      }, shownActions.map(({
        label,
        handler,
        disabled,
        combo
      }) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("li", {
        key: label
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("button", {
        disabled: disabled,
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.item, disabled && styles.disabled),
        onClick: () => {
          handler();
          onHide();
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", null, label), combo ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(_ShortcutLabel__WEBPACK_IMPORTED_MODULE_4__.default, {
        combo: combo,
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.hint)
      }) : null))));
    }
  }]);

  return ContextMenu;
}(react__WEBPACK_IMPORTED_MODULE_2__.PureComponent);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.forwardRef((props, ref) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(ContextMenu, _extends({}, props, {
  innerRef: ref
}))));
const fadeIn = {
  from: {
    opacity: 0
  },
  to: {
    opacity: 1
  }
};
const styles = aphrodite__WEBPACK_IMPORTED_MODULE_0__.StyleSheet.create({
  menu: {
    zIndex: 10,
    listStyle: 'none',
    padding: 0,
    borderRadius: 4,
    borderStyle: 'solid',
    boxShadow: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.s)('popover'),
    minWidth: 240,
    animationName: fadeIn,
    animationDuration: '0.083s',
    animationTimingfunction: 'linear',
    backgroundColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('content'),
    border: `1px solid ${(0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('border')}`,
    color: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('text')
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    appearance: 'none',
    background: 'none',
    border: 0,
    outline: 0,
    width: '100%',
    padding: '16px 12px',
    textAlign: 'left',
    userSelect: 'none',
    borderRadius: 2,
    minHeight: 56,
    fontSize: 16,
    color: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('text'),
    borderBottom: `1px solid ${(0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('border')}`,
    marginBottom: '-1px',
    ':hover': {
      background: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('hover')
    }
  },
  disabled: {
    pointerEvents: 'none',
    opacity: 0.5
  },
  hint: {
    marginLeft: 24,
    lineHeight: '24px'
  }
});

/***/ }),

/***/ "./src/components/widgets/FooterButton.tsx":
/*!*************************************************!*\
  !*** ./src/components/widgets/FooterButton.tsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FooterButton": () => (/* binding */ FooterButton),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var aphrodite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aphrodite */ "./node_modules/aphrodite/no-important.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ThemeProvider */ "./src/components/ThemeProvider.tsx");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\widgets\FooterButton.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/



function FooterButton({
  active,
  icon,
  children,
  onClick
}) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", {
    onClick: onClick,
    style: icon ? {
      backgroundImage: `url(${icon})`
    } : undefined,
    className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.button, children ? styles.buttonLabel : undefined, active && styles.active)
  }, children);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FooterButton);
const styles = aphrodite__WEBPACK_IMPORTED_MODULE_0__.StyleSheet.create({
  button: {
    position: 'relative',
    border: 0,
    outline: 0,
    margin: 0,
    height: 30,
    padding: '0 16px',
    appearance: 'none',
    backgroundColor: 'transparent',
    backgroundSize: 16,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center right 8px',
    ':active': {
      backgroundColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__.c)('hover'),
      color: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__.c)('soft')
    },
    ':hover': {
      backgroundColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__.c)('hover'),
      color: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__.c)('soft')
    }
  },
  buttonLabel: {
    '@media (min-width: 720px)': {
      padding: '5px 32px 5px 8px'
    }
  },
  active: {
    backgroundColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__.c)('hover'),
    color: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__.c)('soft')
  }
});

/***/ }),

/***/ "./src/components/widgets/IconButton.tsx":
/*!***********************************************!*\
  !*** ./src/components/widgets/IconButton.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IconButton": () => (/* binding */ IconButton),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var aphrodite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aphrodite */ "./node_modules/aphrodite/no-important.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ThemeProvider */ "./src/components/ThemeProvider.tsx");
const _excluded = ["title", "label", "responsive", "children", "small"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\widgets\IconButton.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/



function IconButton(_ref) {
  let {
    title,
    label,
    responsive,
    children,
    small
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", _extends({}, rest, {
    className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.button, small && styles.small, rest.disabled && styles.disabled)
  }), children, label ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", {
    className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.label, !children && styles.labelNoIcon, responsive && styles.responsive)
  }, label) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", {
    className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.phantom)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", {
    className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.tooltip)
  }, title)));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IconButton);
const styles = aphrodite__WEBPACK_IMPORTED_MODULE_0__.StyleSheet.create({
  button: {
    position: 'relative',
    height: 40,
    minWidth: 40,
    margin: '0 8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    appearance: 'none',
    backgroundColor: 'transparent',
    color: 'inherit',
    padding: 0,
    outline: 0,
    border: 0,
    borderRadius: 2,
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    fill: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__.c)('text'),
    stroke: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__.c)('text'),
    ':active': {
      opacity: 0.8
    },
    ':hover': {
      cursor: 'pointer',
      backgroundColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__.c)('hover')
    }
  },
  small: {
    height: 32,
    minWidth: 32,
    margin: 0,
    padding: '0 8px 0 0',
    ':hover': {
      backgroundColor: 'transparent'
    }
  },
  disabled: {
    cursor: 'not-allowed',
    pointerEvents: 'none',
    opacity: 0.3
  },
  phantom: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    zIndex: 1,
    ':hover': {
      opacity: 1,
      pointerEvents: 'auto'
    }
  },
  tooltip: {
    position: 'absolute',
    top: 'calc(100% + 4px)',
    left: '50%',
    transform: 'translateX(-50%)',
    marginLeft: -2.5,
    borderRadius: 2,
    fontSize: 12,
    padding: '4px 8px',
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
    boxShadow: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__.s)('popover'),
    backgroundColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__.c)('content', 'dark'),
    color: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__.c)('text', 'dark')
  },
  label: {
    margin: '0 12px',
    color: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__.c)('text')
  },
  labelNoIcon: {
    margin: '0 12px 0 0'
  },
  responsive: {
    '@media (max-width: 960px)': {
      display: 'none'
    }
  }
});

/***/ }),

/***/ "./src/components/widgets/KeybindingsManager.tsx":
/*!*******************************************************!*\
  !*** ./src/components/widgets/KeybindingsManager.tsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KeyMap": () => (/* binding */ KeyMap),
/* harmony export */   "isKeyCombo": () => (/* binding */ isKeyCombo),
/* harmony export */   "KeybindingsManager": () => (/* binding */ KeybindingsManager),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
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
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\widgets\KeybindingsManager.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/

const isMac = 'navigator' in __webpack_require__.g && /Mac/i.test(navigator.platform);
const KeyMap = {
  C: 67,
  D: 68,
  F: 70,
  S: 83,
  U: 85,
  V: 86,
  F2: 113,
  Delete: 8,
  Enter: 13,
  Escape: 27,
  Shift: 16,
  Ctrl: 17,
  Alt: 18,
  Cmd: 91,
  Tilde: 192,
  Backslash: 220,
  Meta: isMac ? 91 : 17
};
const isKeyCombo = (e, combo) => combo.every(code => {
  switch (code) {
    case KeyMap.Ctrl:
      {
        return e.ctrlKey;
      }

    case KeyMap.Meta:
      {
        return e.metaKey;
      }

    case KeyMap.Alt:
      {
        return e.altKey;
      }

    default:
      {
        return e.keyCode === code;
      }
  }
});
let KeybindingsManager = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(KeybindingsManager, _React$PureComponent);

  var _super = _createSuper(KeybindingsManager);

  function KeybindingsManager(...args) {
    var _this;

    _classCallCheck(this, KeybindingsManager);

    _this = _super.call(this, ...args);

    _defineProperty(_assertThisInitialized(_this), "_handleKeydown", e => {
      const {
        bindings,
        onTrigger
      } = _this.props;

      for (const type in bindings) {
        if (bindings.hasOwnProperty(type)) {
          const binding = bindings[type];

          if (isKeyCombo(e, binding.combo)) {
            e.preventDefault();
            onTrigger(type, binding);
            break;
          }
        }
      }
    });

    return _this;
  }

  _createClass(KeybindingsManager, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener('keydown', this._handleKeydown);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('keydown', this._handleKeydown);
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);

  return KeybindingsManager;
}(react__WEBPACK_IMPORTED_MODULE_0__.PureComponent);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (KeybindingsManager);

/***/ }),

/***/ "./src/components/widgets/LargeInput.tsx":
/*!***********************************************!*\
  !*** ./src/components/widgets/LargeInput.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LargeInput": () => (/* binding */ LargeInput),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var aphrodite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aphrodite */ "./node_modules/aphrodite/no-important.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ThemeProvider */ "./src/components/ThemeProvider.tsx");
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
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\widgets\LargeInput.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/



let LargeInput = /*#__PURE__*/function (_React$Component) {
  _inherits(LargeInput, _React$Component);

  var _super = _createSuper(LargeInput);

  function LargeInput(...args) {
    var _this;

    _classCallCheck(this, LargeInput);

    _this = _super.call(this, ...args);

    _defineProperty(_assertThisInitialized(_this), "state", {
      focused: true
    });

    _defineProperty(_assertThisInitialized(_this), "_handleFocus", () => _this.setState({
      focused: true
    }));

    _defineProperty(_assertThisInitialized(_this), "_handleBlur", () => _this.setState({
      focused: false
    }));

    _defineProperty(_assertThisInitialized(_this), "_input", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createRef());

    return _this;
  }

  _createClass(LargeInput, [{
    key: "focus",
    value: function focus() {
      var _this$_input$current, _this$_input$current$;

      (_this$_input$current = this._input.current) === null || _this$_input$current === void 0 ? void 0 : (_this$_input$current$ = _this$_input$current.focus) === null || _this$_input$current$ === void 0 ? void 0 : _this$_input$current$.call(_this$_input$current);
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.container)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", {
        ref: this._input,
        autoFocus: this.props.autoFocus,
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.input, this.props.error ? styles.error : styles.normal),
        value: this.props.value,
        name: this.props.name,
        type: this.props.type,
        disabled: this.props.disabled,
        onChange: this.props.onChange,
        placeholder: this.props.placeholder,
        onFocus: this._handleFocus,
        onBlur: this._handleBlur
      }), this.state.focused && this.props.error ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.validation)
      }, this.props.error.message) : null);
    }
  }]);

  return LargeInput;
}(react__WEBPACK_IMPORTED_MODULE_1__.Component);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LargeInput);
const styles = aphrodite__WEBPACK_IMPORTED_MODULE_0__.StyleSheet.create({
  container: {
    position: 'relative'
  },
  input: {
    outline: 0,
    fontSize: 16,
    borderRadius: 3,
    padding: '12px 14px 12px 14px',
    lineHeight: '22px',
    width: '100%',
    borderWidth: 1,
    borderStyle: 'solid',
    backgroundColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__.c)('content')
  },
  normal: {
    borderColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__.c)('border'),
    ':focus': {
      borderColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__.c)('selected')
    }
  },
  error: {
    borderColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__.c)('error')
  },
  validation: {
    position: 'absolute',
    backgroundColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__.c)('error'),
    color: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__.c)('error-text'),
    padding: '6px 12px',
    borderRadius: 3,
    marginTop: 8,
    textAlign: 'left',
    zIndex: 1,
    ':before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      bottom: '100%',
      width: 0,
      height: 0,
      borderLeft: '6px solid transparent',
      borderRight: '6px solid transparent',
      borderBottom: `6px solid ${(0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__.c)('error')}`
    }
  }
});

/***/ }),

/***/ "./src/components/widgets/LargeTextArea.tsx":
/*!**************************************************!*\
  !*** ./src/components/widgets/LargeTextArea.tsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LargeTextArea": () => (/* binding */ LargeTextArea),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var aphrodite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aphrodite */ "./node_modules/aphrodite/no-important.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_textarea_autosize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-textarea-autosize */ "./node_modules/react-textarea-autosize/dist/react-textarea-autosize.browser.esm.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ThemeProvider */ "./src/components/ThemeProvider.tsx");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\widgets\LargeTextArea.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/




function LargeTextArea(_ref) {
  let rest = _extends({}, _ref);

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_textarea_autosize__WEBPACK_IMPORTED_MODULE_3__.default, _extends({
    className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.input)
  }, rest));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LargeTextArea);
const styles = aphrodite__WEBPACK_IMPORTED_MODULE_0__.StyleSheet.create({
  input: {
    outline: 0,
    fontSize: 16,
    borderRadius: 3,
    padding: '12px 14px 12px 14px',
    lineHeight: '22px',
    border: `1px solid ${(0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__.c)('border')}`,
    backgroundColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__.c)('content'),
    width: '100%',
    ':focus': {
      borderColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__.c)('selected')
    }
  }
});

/***/ }),

/***/ "./src/components/widgets/LoadingText.tsx":
/*!************************************************!*\
  !*** ./src/components/widgets/LoadingText.tsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var aphrodite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aphrodite */ "./node_modules/aphrodite/no-important.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\widgets\LoadingText.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/



const rotate = {
  from: {
    transform: 'rotate(0deg)'
  },
  to: {
    transform: 'rotate(360deg)'
  }
};

const LoadingText = ({
  children,
  className,
  onClick
}) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", {
  className: classnames__WEBPACK_IMPORTED_MODULE_1___default()((0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.loading), className),
  onClick: onClick
}, children);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LoadingText);
const styles = aphrodite__WEBPACK_IMPORTED_MODULE_0__.StyleSheet.create({
  loading: {
    ':before': {
      display: 'inline-block',
      content: '""',
      borderWidth: 2,
      borderStyle: 'solid',
      borderTopColor: 'rgba(255, 255, 255, 0.2)',
      borderRightColor: 'rgba(255, 255, 255, 0.2)',
      borderBottomColor: 'rgba(255, 255, 255, 0.2)',
      borderLeftColor: 'rgba(255, 255, 255, 0.5)',
      height: 16,
      width: 16,
      borderRadius: '50%',
      marginLeft: '.5em',
      marginRight: '1em',
      verticalAlign: -3,
      animationName: [rotate],
      animationDuration: '1s',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'linear'
    }
  }
});

/***/ }),

/***/ "./src/components/widgets/MenuButton.tsx":
/*!***********************************************!*\
  !*** ./src/components/widgets/MenuButton.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MenuButton": () => (/* binding */ MenuButton),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var aphrodite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aphrodite */ "./node_modules/aphrodite/no-important.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ThemeProvider */ "./src/components/ThemeProvider.tsx");
/* harmony import */ var _FooterButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FooterButton */ "./src/components/widgets/FooterButton.tsx");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\widgets\MenuButton.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/




function MenuButton({
  icon,
  label,
  content
}) {
  const [active, setActive] = react__WEBPACK_IMPORTED_MODULE_1__.useState(false);
  const root = react__WEBPACK_IMPORTED_MODULE_1__.useRef(null);
  react__WEBPACK_IMPORTED_MODULE_1__.useEffect(() => {
    const onClick = e => {
      var _root$current, _root$current$contain;

      if (e.target === root.current || (_root$current = root.current) !== null && _root$current !== void 0 && (_root$current$contain = _root$current.contains) !== null && _root$current$contain !== void 0 && _root$current$contain.call(_root$current, e.target)) {
        return;
      }

      setActive(false);
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    ref: root,
    className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.panelContainer)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_FooterButton__WEBPACK_IMPORTED_MODULE_3__.default, {
    icon: icon,
    active: active,
    onClick: () => setActive(value => !value)
  }, label), active ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.pane)
  }, content) : null);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MenuButton);
const styles = aphrodite__WEBPACK_IMPORTED_MODULE_0__.StyleSheet.create({
  panelContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  pane: {
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    position: 'absolute',
    right: 0,
    bottom: 32,
    minWidth: 160,
    padding: '8px 0',
    borderWidth: 1,
    borderRadius: 3,
    borderStyle: 'solid',
    backgroundColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__.c)('content'),
    borderColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__.c)('border'),
    boxShadow: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__.s)('popover'),
    color: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__.c)('text'),
    zIndex: -1
  }
});

/***/ }),

/***/ "./src/components/widgets/Modal.tsx":
/*!******************************************!*\
  !*** ./src/components/widgets/Modal.tsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Modal": () => (/* binding */ Modal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
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
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\widgets\Modal.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/

 // see https://mxstbr.blog/2016/11/styled-components-magic-explained/


const StyledRoot = styled_components__WEBPACK_IMPORTED_MODULE_2__.default.div`
    -webkit-font-smoothing: antialiased;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    color: #fff;
    z-index: 999;
    transition-property: opacity;
    transition-duration: 200ms;
    background-color: ${props => props.initial ? "rgba(24, 29, 37, 0.8)" : "inherit"};
    opacity: ${props => props.visible ? "1" : "0"};
    pointer-events: ${props => props.visible ? "auto" : "none"};
`;
const StyledContent = styled_components__WEBPACK_IMPORTED_MODULE_2__.default.div`
    width: 100%;
    height: 100%;
    display: -ms-flexbox;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    
`;
let Modal = /*#__PURE__*/function (_PureComponent) {
  _inherits(Modal, _PureComponent);

  var _super = _createSuper(Modal);

  function Modal(...args) {
    var _this;

    _classCallCheck(this, Modal);

    _this = _super.call(this, ...args);

    _defineProperty(_assertThisInitialized(_this), "state", {
      rendered: _this.props.visible,
      initial: !_this.props.visible
    });

    _defineProperty(_assertThisInitialized(_this), "_container", document.createElement('div'));

    _defineProperty(_assertThisInitialized(_this), "_content", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createRef());

    _defineProperty(_assertThisInitialized(_this), "_timer", void 0);

    _defineProperty(_assertThisInitialized(_this), "_handleDismiss", e => {
      var _this$props$onDismiss, _this$props;

      if (_this._content.current && _this._content.current !== e.target && _this._content.current.contains(e.target)) {
        return;
      }

      (_this$props$onDismiss = (_this$props = _this.props).onDismiss) === null || _this$props$onDismiss === void 0 ? void 0 : _this$props$onDismiss.call(_this$props);
    });

    _defineProperty(_assertThisInitialized(_this), "_handleKeyDown", e => {
      if (e.keyCode === 27 && _this.props.visible) {
        var _this$props$onDismiss2, _this$props2;

        // Esc was pressed
        e.preventDefault();
        (_this$props$onDismiss2 = (_this$props2 = _this.props).onDismiss) === null || _this$props$onDismiss2 === void 0 ? void 0 : _this$props$onDismiss2.call(_this$props2);
      }
    });

    return _this;
  }

  _createClass(Modal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.body.appendChild(this._container);
      document.addEventListener('keydown', this._handleKeyDown);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.visible !== prevProps.visible) {
        clearTimeout(this._timer);

        if (!this.props.visible) {
          this._timer = setTimeout(() => this.setState({
            rendered: false
          }), 300);
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.body.removeChild(this._container);
      document.removeEventListener('keydown', this._handleKeyDown);
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/react_dom__WEBPACK_IMPORTED_MODULE_1__.createPortal( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(StyledRoot, {
        initial: this.state.initial,
        visible: this.props.visible,
        onClick: this._handleDismiss
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(StyledContent, {
        ref: this._content
      }, this.state.rendered ? this.props.children : null)), this._container);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props) {
      return props.visible ? {
        rendered: true,
        initial: false
      } : null;
    }
  }]);

  return Modal;
}(react__WEBPACK_IMPORTED_MODULE_0__.PureComponent);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Modal);

/***/ }),

/***/ "./src/components/widgets/ModalDialog.tsx":
/*!************************************************!*\
  !*** ./src/components/widgets/ModalDialog.tsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ModalDialog": () => (/* binding */ ModalDialog),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _ModalSheet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ModalSheet */ "./src/components/widgets/ModalSheet.tsx");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ThemeProvider */ "./src/components/ThemeProvider.tsx");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\widgets\ModalDialog.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/
 // see https://mxstbr.blog/2016/11/styled-components-magic-explained/




const StyledModalSheet = (0,styled_components__WEBPACK_IMPORTED_MODULE_3__.default)(_ModalSheet__WEBPACK_IMPORTED_MODULE_1__.ModalSheet)`
    
`;
const StyledTitle = styled_components__WEBPACK_IMPORTED_MODULE_3__.default.div`
    height: 72px;
    font-size: 24px;
    width: 100%;
    line-height: 24px;
    display: -ms-flexbox;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-shrink: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    border-bottom: ${props => "1px solid " + (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__.c)('border')};
`;
const StyledContent = styled_components__WEBPACK_IMPORTED_MODULE_3__.default.div`
    padding: ${props => props.title ? "16px 24px 24px 24px" : "24px"};
    overflow: 'auto';
`;
const ModalDialog = ({
  visible,
  className,
  onDismiss,
  title,
  autoSize,
  children
}) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(StyledModalSheet, {
  autoSize: autoSize,
  className: className,
  visible: visible,
  onDismiss: onDismiss
}, title ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(StyledTitle, {
  title: title
}, title) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(StyledContent, {
  title: title
}, children));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ModalDialog);

/***/ }),

/***/ "./src/components/widgets/ModalSheet.tsx":
/*!***********************************************!*\
  !*** ./src/components/widgets/ModalSheet.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ModalSheet": () => (/* binding */ ModalSheet),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ThemeProvider */ "./src/components/ThemeProvider.tsx");
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Modal */ "./src/components/widgets/Modal.tsx");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\widgets\ModalSheet.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/
 // see https://mxstbr.blog/2016/11/styled-components-magic-explained/




const StyledThemeProvider = (0,styled_components__WEBPACK_IMPORTED_MODULE_3__.default)(_ThemeProvider__WEBPACK_IMPORTED_MODULE_1__.ThemeProvider)`
    display: -ms-flexbox;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    position: relative;
    text-align: center;
    -webkit-border-radius: 4px;
    -khtml-border-radius: 4px;
    -moz-border-radius: 4px;
    -o-border-radius: 4px;
    border-radius: 4px;
    -webkit-box-shadow: ${props => (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_1__.s)('popover')};
    -moz-box-shadow: ${props => (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_1__.s)('popover')};
    -o-box-shadow: ${props => (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_1__.s)('popover')};
    box-shadow: ${props => (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_1__.s)('popover')};
    background-color: ${props => (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_1__.c)('content')};
    color: ${props => (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_1__.c)('text')};
`;
const StyledClose = styled_components__WEBPACK_IMPORTED_MODULE_3__.default.button`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    -webkit-border-radius: 1em;
    -khtml-border-radius: 1em;
    -moz-border-radius: 1em;
    -o-border-radius: 1em;
    border-radius: 1em;
    outline: 0;
    padding: 0;
    position: absolute;
    right: -1em;
    top: -1em;
    width: 2em;
    height: 2em;
    background: ${props => (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_1__.c)('text')};
    border: ${props => "2px solid " + (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_1__.c)('content')};
    -webkit-box-shadow: 0 1.5px 3px rgba(0, 0, 0, .16);
    -moz-box-shadow: 0 1.5px 3px rgba(0, 0, 0, .16);
    -o-box-shadow: 0 1.5px 3px rgba(0, 0, 0, .16);
    box-shadow: 0 1.5px 3px rgba(0, 0, 0, .16);
    color: ${props => (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_1__.c)('content')};
    font-size: 1em;
    font-weight: bold;
    text-align: center;
`;
const ModalSheet = ({
  visible,
  className,
  onDismiss,
  children
}) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Modal__WEBPACK_IMPORTED_MODULE_2__.default, {
  visible: visible,
  onDismiss: onDismiss
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(StyledThemeProvider, {
  className: className
}, onDismiss ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(StyledClose, {
  onClick: onDismiss,
  "data-test-id": "modal-close"
}, "\u2715") : null, children));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ModalSheet);

/***/ }),

/***/ "./src/components/widgets/Popover.tsx":
/*!********************************************!*\
  !*** ./src/components/widgets/Popover.tsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Popover": () => (/* binding */ Popover),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var aphrodite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aphrodite */ "./node_modules/aphrodite/no-important.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ThemeProvider */ "./src/components/ThemeProvider.tsx");
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
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\widgets\Popover.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/



let Popover = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(Popover, _React$PureComponent);

  var _super = _createSuper(Popover);

  function Popover(...args) {
    var _this;

    _classCallCheck(this, Popover);

    _this = _super.call(this, ...args);

    _defineProperty(_assertThisInitialized(_this), "state", {
      visible: false
    });

    _defineProperty(_assertThisInitialized(_this), "_handleDocumentContextMenu", () => {
      if (_this.state.visible) {
        _this._hidePopover();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_handleDocumentClick", e => {
      var _this$_popover$curren, _this$_popover$curren2;

      if (_this.state.visible && (e.target === _this._anchor.current || e.target === _this._popover.current || (_this$_popover$curren = _this._popover.current) !== null && _this$_popover$curren !== void 0 && (_this$_popover$curren2 = _this$_popover$curren.contains) !== null && _this$_popover$curren2 !== void 0 && _this$_popover$curren2.call(_this$_popover$curren, e.target))) {
        return;
      }

      _this._hidePopover();
    });

    _defineProperty(_assertThisInitialized(_this), "_togglePopover", () => {
      if (!_this.state.visible) {
        var _this$_popover$curren3, _this$_popover$curren4, _this$_anchor$current, _this$_anchor$current2;

        const popover = ((_this$_popover$curren3 = _this._popover.current) === null || _this$_popover$curren3 === void 0 ? void 0 : (_this$_popover$curren4 = _this$_popover$curren3.getBoundingClientRect) === null || _this$_popover$curren4 === void 0 ? void 0 : _this$_popover$curren4.call(_this$_popover$curren3)) ?? {}; // @ts-ignore

        const anchor = ((_this$_anchor$current = _this._anchor.current) === null || _this$_anchor$current === void 0 ? void 0 : (_this$_anchor$current2 = _this$_anchor$current.getBoundingClientRect) === null || _this$_anchor$current2 === void 0 ? void 0 : _this$_anchor$current2.call(_this$_anchor$current)) ?? {}; // @ts-ignore

        const diff = (popover.width - 10) / 2 - anchor.left;

        if (_this._popover.current && _this._arrow.current) {
          if (diff > 0) {
            _this._popover.current.style.left = `${diff + 5}px`;
            _this._arrow.current.style.left = // @ts-ignore
            `${anchor.left - anchor.width / 2 + 10}px`;
          } else {
            _this._popover.current.style.left = '5px';
            _this._arrow.current.style.left = '50%';
          }
        }
      }

      _this.setState(state => ({
        visible: !state.visible
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "_hidePopover", () => _this.setState({
      visible: false
    }));

    _defineProperty(_assertThisInitialized(_this), "_anchor", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createRef());

    _defineProperty(_assertThisInitialized(_this), "_arrow", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createRef());

    _defineProperty(_assertThisInitialized(_this), "_popover", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createRef());

    return _this;
  }

  _createClass(Popover, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener('click', this._handleDocumentClick);
      document.addEventListener('contextmenu', this._handleDocumentContextMenu);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('click', this._handleDocumentClick);
      document.removeEventListener('contextmenu', this._handleDocumentContextMenu);
    }
  }, {
    key: "render",
    value: function render() {
      const {
        children,
        content
      } = this.props;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.container)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.cloneElement( // @ts-ignore
      react__WEBPACK_IMPORTED_MODULE_1__.Children.only(children), {
        ref: this._anchor,
        onClick: this._togglePopover
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
        ref: this._popover,
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.popover, this.state.visible ? styles.visible : styles.hidden)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", {
        ref: this._arrow,
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.arrow)
      }), content));
    }
  }]);

  return Popover;
}(react__WEBPACK_IMPORTED_MODULE_1__.PureComponent);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Popover);
const styles = aphrodite__WEBPACK_IMPORTED_MODULE_0__.StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: 'inherit'
  },
  popover: {
    position: 'absolute',
    top: '100%',
    margin: 12,
    width: '18em',
    borderRadius: 3,
    zIndex: 99,
    backgroundColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__.c)('content'),
    border: `1px solid ${(0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__.c)('border')}`,
    color: 'inherit',
    transition: 'transform .2s, opacity .2s',
    boxShadow: `${(0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__.s)('popover')}, 0 0 3px rgba(0, 0, 0, 0.08)`
  },
  arrow: {
    position: 'absolute',
    height: 16,
    width: 16,
    top: -9,
    transform: 'translateX(-50%) rotate(45deg)',
    backgroundColor: 'inherit',
    borderTopLeftRadius: 4,
    boxShadow: '-.5px -.5px 0 rgba(0, 0, 0, .12)',
    border: 0
  },
  visible: {
    opacity: 1,
    transform: 'translateX(-50%) translateY(0)'
  },
  hidden: {
    opacity: 0,
    pointerEvents: 'none',
    transform: 'translateX(-50%) translateY(-4px)'
  }
});

/***/ }),

/***/ "./src/components/widgets/ResizablePane.tsx":
/*!**************************************************!*\
  !*** ./src/components/widgets/ResizablePane.tsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResizablePane)
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
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\widgets\ResizablePane.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/



let ResizablePane = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(ResizablePane, _React$PureComponent);

  var _super = _createSuper(ResizablePane);

  function ResizablePane(...args) {
    var _this;

    _classCallCheck(this, ResizablePane);

    _this = _super.call(this, ...args);

    _defineProperty(_assertThisInitialized(_this), "state", {
      resizing: false,
      initialPosition: null,
      initialWidth: 0,
      initialHeight: 0
    });

    _defineProperty(_assertThisInitialized(_this), "_handleMouseDown", e => {
      if (!_this._pane.current) {
        return;
      }

      const style = getComputedStyle(_this._pane.current);

      _this.setState({
        resizing: true,
        initialPosition: {
          pageX: e.pageX,
          pageY: e.pageY
        },
        initialWidth: parseFloat(style.width || '0'),
        initialHeight: parseFloat(style.height || '0')
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_handleMouseUp", e => {
      if (_this.state.resizing) {
        e.preventDefault();

        _this.setState({
          resizing: false,
          initialPosition: null,
          initialWidth: 0,
          initialHeight: 0
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_handleMouseMove", e => {
      const {
        direction,
        inverted
      } = _this.props;
      const {
        resizing,
        initialPosition,
        initialWidth,
        initialHeight
      } = _this.state;

      if (resizing && initialPosition) {
        var _this$_pane$current, _this$_pane$current$s;

        e.preventDefault();
        let style;

        if (direction === 'horizontal') {
          const delta = e.pageX - initialPosition.pageX;
          style = `width: ${initialWidth + (inverted ? -delta : delta)}px !important;`;
        } else {
          const delta = initialPosition.pageY - e.pageY;
          style = `height: ${initialHeight + (inverted ? -delta : delta)}px !important`;
        }

        (_this$_pane$current = _this._pane.current) === null || _this$_pane$current === void 0 ? void 0 : (_this$_pane$current$s = _this$_pane$current.setAttribute) === null || _this$_pane$current$s === void 0 ? void 0 : _this$_pane$current$s.call(_this$_pane$current, 'style', style);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_pane", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createRef());

    return _this;
  }

  _createClass(ResizablePane, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // @ts-ignore
      // @ts-ignore
      document.addEventListener('mouseup', this._handleMouseUp); // @ts-ignore

      document.addEventListener('mousemove', this._handleMouseMove);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // @ts-ignore
      // @ts-ignore
      document.removeEventListener('mouseup', this._handleMouseUp); // @ts-ignore

      document.removeEventListener('mousemove', this._handleMouseMove);
    }
  }, {
    key: "render",
    value: function render() {
      const {
        direction,
        inverted,
        className,
        children
      } = this.props;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
        ref: this._pane,
        className: `${(0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.container)} ${className ?? ''}`
      }, children, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.handle, direction === 'horizontal' ? styles.horizontal : styles.vertical, direction === 'horizontal' ? inverted ? styles.horizontalInverted : styles.horizontalNormal : inverted ? styles.verticalInverted : styles.verticalNormal),
        onMouseDown: this._handleMouseDown,
        onMouseUp: this._handleMouseUp
      }));
    }
  }]);

  return ResizablePane;
}(react__WEBPACK_IMPORTED_MODULE_1__.PureComponent);


const styles = aphrodite__WEBPACK_IMPORTED_MODULE_0__.StyleSheet.create({
  container: {
    position: 'relative'
  },
  handle: {
    position: 'absolute',
    zIndex: 1
  },
  horizontal: {
    top: 0,
    bottom: 0,
    width: 12,
    cursor: 'col-resize'
  },
  vertical: {
    left: 0,
    right: 0,
    height: 12,
    cursor: 'row-resize'
  },
  horizontalNormal: {
    right: -12
  },
  horizontalInverted: {
    left: -12
  },
  verticalNormal: {
    top: -12
  },
  verticalInverted: {
    bottom: -12
  }
});

/***/ }),

/***/ "./src/components/widgets/ShortcutLabel.tsx":
/*!**************************************************!*\
  !*** ./src/components/widgets/ShortcutLabel.tsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ShortcutLabel": () => (/* binding */ ShortcutLabel),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var aphrodite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aphrodite */ "./node_modules/aphrodite/no-important.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_findKey__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/findKey */ "./node_modules/lodash/findKey.js");
/* harmony import */ var lodash_findKey__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_findKey__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ThemeProvider */ "./src/components/ThemeProvider.tsx");
/* harmony import */ var _KeybindingsManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./KeybindingsManager */ "./src/components/widgets/KeybindingsManager.tsx");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\widgets\ShortcutLabel.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/






const isMac = 'navigator' in __webpack_require__.g && /Mac/i.test(navigator.platform);
const KeyLabels = {
  Cmd: '⌘',
  Delete: '⌫',
  Enter: '↩',
  Shift: '⇧',
  Ctrl: isMac ? '⌃' : 'Ctrl',
  Alt: isMac ? '⌥' : 'Alt',
  Backslash: '\\',
  Tilde: '`'
};
function ShortcutLabel({
  combo,
  className,
  boxed = false
}) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement("kbd", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()((0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.shortcutLabel), boxed && (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.boxedShortcut), className)
  }, combo.map(code => {
    // @ts-ignore
    const name = lodash_findKey__WEBPACK_IMPORTED_MODULE_2___default()(_KeybindingsManager__WEBPACK_IMPORTED_MODULE_5__.KeyMap, c => c === code);

    if (name && KeyLabels[name]) {
      return KeyLabels[name];
    } else {
      return name;
    }
  }).join(isMac ? '' : '+'));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ShortcutLabel);
const styles = aphrodite__WEBPACK_IMPORTED_MODULE_0__.StyleSheet.create({
  shortcutLabel: {
    color: 'inherit',
    fontFamily: 'var(--font-monospace)',
    fontSize: '90%',
    opacity: 0.5,
    boxShadow: `none`,
    display: 'inline-block',
    lineHeight: 'initial'
  },
  boxedShortcut: {
    padding: '0.2rem 0.4rem',
    border: `1px solid ${(0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__.c)(`border`)}`,
    borderBottomWidth: 2,
    borderRadius: 3,
    opacity: 0.66
  }
});

/***/ }),

/***/ "./src/components/widgets/Spinner.tsx":
/*!********************************************!*\
  !*** ./src/components/widgets/Spinner.tsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Spinner": () => (/* binding */ Spinner),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var aphrodite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aphrodite */ "./node_modules/aphrodite/no-important.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _features_preferences_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../features/preferences/index */ "./src/features/preferences/index.tsx");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\widgets\Spinner.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/



function Spinner({
  rgba,
  segments = 12,
  segmentWidth = 2,
  segmentLength = 6,
  spacing = 4,
  fadeTo = 31 / 98,
  fadeSteps = 6
}) {
  const [prefs] = (0,_features_preferences_index__WEBPACK_IMPORTED_MODULE_2__.usePreferences)();
  const {
    red,
    green,
    blue,
    alpha
  } = rgba !== undefined ? rgba : prefs.theme === 'dark' ? {
    red: 255,
    green: 255,
    blue: 255,
    alpha: 0.5
  } : {
    red: 70,
    green: 48,
    blue: 235,
    alpha: 1
  };
  const innerRadius = segmentWidth * 2 + spacing;
  const opacityDelta = (1 - fadeTo) / fadeSteps;
  const lines = [];

  for (let ii = 0; ii < segments; ii++) {
    const opacity = 1 - Math.min(ii, fadeSteps) * opacityDelta;
    const rotation = -ii * 360 / segments;
    lines.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("line", {
      key: ii,
      x1: "0",
      y1: innerRadius,
      x2: "0",
      y2: innerRadius + segmentLength,
      style: {
        opacity
      },
      transform: `rotate(${rotation})`
    }));
  }

  const rgbaColor = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  const radius = innerRadius + segmentLength + Math.ceil(segmentWidth / 2);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("svg", {
    className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.indicator),
    width: radius * 2,
    height: radius * 2
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("g", {
    stroke: rgbaColor,
    strokeWidth: segmentWidth,
    strokeLinecap: "round",
    transform: `translate(${radius}, ${radius})`
  }, lines));
}
const spinKeyframes = {
  from: {
    transform: 'rotate(0deg)'
  },
  to: {
    transform: 'rotate(360deg)'
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Spinner);
const styles = aphrodite__WEBPACK_IMPORTED_MODULE_0__.StyleSheet.create({
  indicator: {
    animationDuration: '1s',
    animationIterationCount: 'infinite',
    animationName: spinKeyframes,
    animationTimingFunction: 'steps(12)'
  }
});

/***/ }),

/***/ "./src/components/widgets/Toast.tsx":
/*!******************************************!*\
  !*** ./src/components/widgets/Toast.tsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Toast": () => (/* binding */ Toast),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var aphrodite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aphrodite */ "./node_modules/aphrodite/no-important.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ThemeProvider */ "./src/components/ThemeProvider.tsx");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\widgets\Toast.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/




const TOAST_GROUP_ID = '__toast_group__container';
let Toast = /*#__PURE__*/function (_React$Component) {
  _inherits(Toast, _React$Component);

  var _super = _createSuper(Toast);

  function Toast(...args) {
    var _this;

    _classCallCheck(this, Toast);

    _this = _super.call(this, ...args);

    _defineProperty(_assertThisInitialized(_this), "state", {
      dismissing: false
    });

    _defineProperty(_assertThisInitialized(_this), "_container", document.createElement('div'));

    _defineProperty(_assertThisInitialized(_this), "_timer", void 0);

    _defineProperty(_assertThisInitialized(_this), "_scheduleDismiss", () => _this._timer = setTimeout(_this._handleDismiss, _this.props.timeout));

    _defineProperty(_assertThisInitialized(_this), "_cancelDismiss", () => {
      _this.setState({
        dismissing: false
      });

      clearTimeout(_this._timer);
    });

    _defineProperty(_assertThisInitialized(_this), "_handleDismiss", () => {
      _this.setState({
        dismissing: true
      });

      _this._timer = setTimeout(() => {
        var _this$props$onDismiss, _this$props;

        return (_this$props$onDismiss = (_this$props = _this.props).onDismiss) === null || _this$props$onDismiss === void 0 ? void 0 : _this$props$onDismiss.call(_this$props);
      }, 400);
    });

    return _this;
  }

  _createClass(Toast, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      let group = document.getElementById(TOAST_GROUP_ID);

      if (!group) {
        group = document.createElement('div');
        group.id = TOAST_GROUP_ID;
        Object.assign(group.style, {
          position: 'fixed',
          bottom: '3em',
          left: '1em',
          zIndex: '999'
        });
        document.body.appendChild(group);
      }

      group.appendChild(this._container);

      if (this.props.persistent) {
        this._scheduleDismiss();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      const group = document.getElementById(TOAST_GROUP_ID);

      if (group) {
        group.removeChild(this._container);
      }

      this._cancelDismiss();
    }
  }, {
    key: "render",
    value: function render() {
      const props = this.props.persistent ? {} : {
        onMouseEnter: this._cancelDismiss,
        onMouseLeave: this._scheduleDismiss
      };
      return /*#__PURE__*/react_dom__WEBPACK_IMPORTED_MODULE_2__.createPortal( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.ThemeProvider, _extends({}, props, {
        style: styles.toast,
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(this.state.dismissing ? styles.dismissing : styles.appearing)
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.label)
      }, this.props.label), this.props.actions.map(action => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", {
        key: action.label,
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.button),
        onClick: action.action ?? this._handleDismiss
      }, action.label))), this._container);
    }
  }]);

  return Toast;
}(react__WEBPACK_IMPORTED_MODULE_1__.Component);

_defineProperty(Toast, "defaultProps", {
  timeout: 5000
});

const fadeIn = {
  from: {
    opacity: 0
  },
  to: {
    opacity: 1
  }
};
const fadeOut = {
  from: {
    opacity: 1
  },
  to: {
    opacity: 0
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Toast);
const styles = aphrodite__WEBPACK_IMPORTED_MODULE_0__.StyleSheet.create({
  toast: {
    display: 'flex',
    margin: '1em',
    padding: '0 .75em',
    borderRadius: 3,
    border: `1px solid ${(0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('border')}`,
    boxShadow: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.s)('popover'),
    minWidth: '27em',
    whiteSpace: 'nowrap',
    backgroundColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('content'),
    color: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('text')
  },
  appearing: {
    animationName: fadeIn,
    animationDuration: '250ms',
    opacity: 1
  },
  dismissing: {
    animationName: fadeOut,
    animationDuration: '400ms',
    opacity: 0
  },
  label: {
    flex: 1,
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    padding: '.75em'
  },
  button: {
    appearance: 'none',
    background: 'transparent',
    color: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('primary'),
    border: '0',
    textTransform: 'uppercase',
    fontSize: '.9em',
    fontWeight: 'bold',
    padding: '1em',
    outline: 0,
    ':hover': {
      backgroundColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('hover')
    },
    ':active': {
      backgroundColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('hover')
    }
  }
});

/***/ }),

/***/ "./src/components/widgets/ToggleSwitch.tsx":
/*!*************************************************!*\
  !*** ./src/components/widgets/ToggleSwitch.tsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ToggleSwitch": () => (/* binding */ ToggleSwitch),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var aphrodite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aphrodite */ "./node_modules/aphrodite/no-important.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ThemeProvider */ "./src/components/ThemeProvider.tsx");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\widgets\ToggleSwitch.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/




function ToggleSwitch(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("label", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()((0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.container), props.className)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("span", {
    className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.label)
  }, props.label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("span", {
    className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.switch, props.checked ? styles.active : styles.inactive)
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("input", {
    type: "checkbox",
    checked: props.checked,
    onChange: props.onChange,
    className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.check)
  }));
}
const styles = aphrodite__WEBPACK_IMPORTED_MODULE_0__.StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    margin: 8,
    cursor: 'pointer',
    whiteSpace: 'nowrap'
  },
  switch: {
    display: 'inline-block',
    verticalAlign: -4,
    width: 36,
    height: 20,
    borderRadius: 12,
    border: `1px solid ${(0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('border')}`,
    backgroundColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('background'),
    ':before': {
      content: '""',
      display: 'inline-block',
      height: 14,
      width: 14,
      borderRadius: 7,
      margin: 2,
      transition: '.2s',
      transform: 'translateX(0)'
    }
  },
  inactive: {
    ':before': {
      transform: 'translateX(0)',
      backgroundColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('soft')
    }
  },
  active: {
    ':before': {
      transform: 'translateX(16px)',
      backgroundColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.c)('primary')
    }
  },
  check: {
    display: 'none'
  },
  label: {
    flex: 1,
    padding: '0 .5em',
    fontWeight: 'normal'
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ToggleSwitch);

/***/ }),

/***/ "./src/components/widgets/WebFrame.tsx":
/*!*********************************************!*\
  !*** ./src/components/widgets/WebFrame.tsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebFrame": () => (/* binding */ WebFrame),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var aphrodite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aphrodite */ "./node_modules/aphrodite/no-important.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ThemeProvider */ "./src/components/ThemeProvider.tsx");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\widgets\WebFrame.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/



function WebFrame({
  previewURL
}) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.container)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("iframe", {
    src: previewURL,
    allow: "geolocation; camera; microphone",
    className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_0__.css)(styles.frame)
  }));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WebFrame);
const styles = aphrodite__WEBPACK_IMPORTED_MODULE_0__.StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    flex: 1,
    width: '100%',
    height: '100%'
  },
  frame: {
    position: 'relative',
    width: '100%',
    height: '100%',
    border: 0,
    zIndex: 1,
    backgroundColor: (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_2__.c)('content', 'light')
  }
});

/***/ }),

/***/ "./src/features/form/EditorForm.tsx":
/*!******************************************!*\
  !*** ./src/features/form/EditorForm.tsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var aphrodite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aphrodite */ "./node_modules/aphrodite/no-important.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/createStyles.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/withStyles.js");
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/TextField */ "./node_modules/@material-ui/core/esm/TextField/TextField.js");
/* harmony import */ var _material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/MenuItem */ "./node_modules/@material-ui/core/esm/MenuItem/MenuItem.js");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Typography */ "./node_modules/@material-ui/core/esm/Typography/Typography.js");
/* harmony import */ var _material_ui_core_Fab__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Fab */ "./node_modules/@material-ui/core/esm/Fab/Fab.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./index */ "./src/features/form/index.tsx");
/* harmony import */ var _preferences__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../preferences */ "./src/features/preferences/index.tsx");
/* harmony import */ var _components_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/ThemeProvider */ "./src/components/ThemeProvider.tsx");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\features\form\EditorForm.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/












function validationOk(value) {
  return null;
}

function stateDefaultValues(fields) {
  const ret = {};
  Object.keys(fields).map(k => ret[k] = fields[k].default);
  return ret;
}

function optionsSelected(options, value) {
  const selected = options.find(option => option.value === value);
  return selected ? selected.value : undefined;
} // @ts-ignore


const SubmitButton = (0,_index__WEBPACK_IMPORTED_MODULE_3__.withStatus)(_material_ui_core_Fab__WEBPACK_IMPORTED_MODULE_6__.default); // @ts-ignore

const ValidatedInput = (0,_index__WEBPACK_IMPORTED_MODULE_3__.withValidation)(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_7__.default);

let EditorForm = /*#__PURE__*/function (_React$Component) {
  _inherits(EditorForm, _React$Component);

  var _super = _createSuper(EditorForm);

  function EditorForm(...args) {
    var _this;

    _classCallCheck(this, EditorForm);

    _this = _super.call(this, ...args);

    _defineProperty(_assertThisInitialized(_this), "state", {
      visible: _this.props.visible,
      values: stateDefaultValues(_this.props.fields)
    });

    _defineProperty(_assertThisInitialized(_this), "_handleSubmit", () => _this.props.onSubmit(_this.state.values));

    return _this;
  }

  _createClass(EditorForm, [{
    key: "render",
    value: function render() {
      // console.log('EditForm.state.values', this.state.values);
      const {
        classes,
        visible,
        title,
        action,
        fields,
        theme,
        className,
        onDismiss
      } = this.props; // console.log('EditForm.state.values', this.state.values);

      return visible ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: classes.container
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_2___default()((0,aphrodite__WEBPACK_IMPORTED_MODULE_1__.css)(styles.modal, theme === 'dark' ? styles.contentDark : styles.contentLight), className)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: classes.title
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8__.default, {
        variant: "h6"
      }, title)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_index__WEBPACK_IMPORTED_MODULE_3__.Form, {
        onSubmit: this._handleSubmit
      }, Object.keys(fields).map((k, i) => {
        const field = fields[k];
        const value = this.state.values[k];
        return ['text', 'checkbox'].indexOf(field.type) > -1 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
          key: i,
          className: classes.fieldContainer
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ValidatedInput // @ts-ignore
        , {
          autoFocus: true,
          type: field.type,
          className: classes.textField,
          margin: "normal",
          label: field.label,
          value: value,
          onChange: e => this.setState({
            values: _objectSpread(_objectSpread({}, this.state.values), {}, {
              [k]: e.target.value
            })
          }),
          placeholder: field.label,
          validate: field.onValidate || validationOk
        })) : field.type === 'select' ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
          key: i,
          className: classes.fieldContainer
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ValidatedInput // @ts-ignore
        , {
          select: true,
          className: classes.textField,
          label: field.label,
          SelectProps: {
            MenuProps: {
              className: classes.menu
            }
          },
          helperText: field.helperText,
          margin: "normal",
          value: value,
          onChange: e => // console.log('onChange', k, e.target.value);
          this.setState({
            values: _objectSpread(_objectSpread({}, this.state.values), {}, {
              [k]: e.target.value
            })
          }),
          placeholder: field.label,
          validate: field.onValidate || validationOk
        }, field.options && field.options.map(option => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_9__.default, {
          key: option.value,
          value: option.value
        }, option.label)))) : null;
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: (0,aphrodite__WEBPACK_IMPORTED_MODULE_1__.css)(styles.buttons)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: classes.button
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(SubmitButton // @ts-ignore
      , {
        type: "submit",
        color: "primary",
        variant: "extended"
      }, action)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: classes.button
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Fab__WEBPACK_IMPORTED_MODULE_6__.default // @ts-ignore
      , {
        type: "button",
        color: "secondary",
        variant: "extended",
        onClick: onDismiss
      }, "Cancel")))))) : null;
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (state.visible !== props.visible) {
        if (props.visible) {
          return {
            visible: props.visible,
            values: stateDefaultValues(props.fields)
          };
        } else {
          return {
            visible: props.visible
          };
        }
      }

      return null;
    }
  }]);

  return EditorForm;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);

const styles = aphrodite__WEBPACK_IMPORTED_MODULE_1__.StyleSheet.create({
  title: {
    height: 72,
    fontSize: 24,
    width: '100%',
    lineHeight: '24px',
    display: 'flex',
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 1px 0 rgba(36, 44, 58, 0.1)'
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 500,
    padding: 0,
    lineHeight: '22px',
    margin: '16px 0 6px 0'
  },
  buttons: {
    margin: '20px 0 0 0',
    display: 'flex',
    justifyContent: 'space-around'
  },
  caption: {
    marginTop: 24,
    fontSize: '16px',
    lineHeight: '22px',
    textAlign: 'center'
  },
  link: {
    cursor: 'pointer',
    color: (0,_components_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__.c)('primary'),
    textDecoration: 'underline'
  },
  modal: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    textAlign: 'start',
    borderRadius: 4,
    boxShadow: '0 1px 4px rgba(36, 44, 58, 0.3)'
  },
  close: {
    appearance: 'none',
    borderRadius: '1em',
    outline: 0,
    padding: 0,
    position: 'absolute',
    right: '-1em',
    top: '-1em',
    width: '2em',
    height: '2em',
    background: (0,_components_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__.c)('background'),
    border: `2px solid ${(0,_components_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__.c)('border')}`,
    boxShadow: '0 1.5px 3px rgba(0, 0, 0, .16)',
    color: 'white',
    fontSize: '1em',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  contentLight: {
    backgroundColor: (0,_components_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__.c)('content'),
    color: (0,_components_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__.c)('text')
  },
  contentDark: {
    backgroundColor: (0,_components_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__.c)('content'),
    color: (0,_components_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__.c)('text'),
    border: `1px solid ${(0,_components_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__.c)('border')}`
  }
});

const muiStyles = theme => (0,_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_10__.default)({
  container: {
    padding: '20px'
  },
  title: {
    padding: '10px',
    boxShadow: '0 1px 0 rgba(36, 44, 58, 0.1)'
  },
  fieldContainer: {
    padding: '10px'
  },
  button: {
    padding: '5px'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%'
  }
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_11__.default)(muiStyles)((0,_preferences__WEBPACK_IMPORTED_MODULE_4__.withThemeName)(EditorForm)));

/***/ }),

/***/ "./src/features/form/Form.tsx":
/*!************************************!*\
  !*** ./src/features/form/Form.tsx ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormValidationContext": () => (/* binding */ FormValidationContext),
/* harmony export */   "default": () => (/* binding */ Form)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
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
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\features\form\Form.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/

const FormValidationContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(undefined);

let Form = /*#__PURE__*/function (_React$Component) {
  _inherits(Form, _React$Component);

  var _super = _createSuper(Form);

  function Form(...args) {
    var _this;

    _classCallCheck(this, Form);

    _this = _super.call(this, ...args);

    _defineProperty(_assertThisInitialized(_this), "state", {
      isValid: false
    });

    _defineProperty(_assertThisInitialized(_this), "_key", 0);

    _defineProperty(_assertThisInitialized(_this), "_inputs", []);

    _defineProperty(_assertThisInitialized(_this), "_register", ({
      validate,
      focus
    }) => {
      const key = _this._key++;

      _this._inputs.push({
        key,
        validate,
        focus
      });

      return key;
    });

    _defineProperty(_assertThisInitialized(_this), "_unregister", key => _this._inputs = _this._inputs.filter(it => it.key !== key));

    _defineProperty(_assertThisInitialized(_this), "_update", () => _this.setState({
      isValid: _this._inputs.every(it => !it.validate())
    }));

    _defineProperty(_assertThisInitialized(_this), "_handleSubmit", e => {
      e.preventDefault();

      for (const input of _this._inputs) {
        if (input.validate()) {
          input.focus();
          return;
        }
      }

      _this.props.onSubmit();
    });

    return _this;
  }

  _createClass(Form, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._update();
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(FormValidationContext.Provider, {
        value: {
          register: this._register,
          unregister: this._unregister,
          update: this._update,
          valid: this.state.isValid
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", {
        onSubmit: this._handleSubmit
      }, this.props.children));
    }
  }]);

  return Form;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);



/***/ }),

/***/ "./src/features/form/index.tsx":
/*!*************************************!*\
  !*** ./src/features/form/index.tsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Form": () => (/* reexport safe */ _Form__WEBPACK_IMPORTED_MODULE_0__.default),
/* harmony export */   "EditorForm": () => (/* reexport safe */ _EditorForm__WEBPACK_IMPORTED_MODULE_1__.default),
/* harmony export */   "withValidation": () => (/* reexport safe */ _withValidation__WEBPACK_IMPORTED_MODULE_2__.default),
/* harmony export */   "withStatus": () => (/* reexport safe */ _withStatus__WEBPACK_IMPORTED_MODULE_3__.default)
/* harmony export */ });
/* harmony import */ var _Form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Form */ "./src/features/form/Form.tsx");
/* harmony import */ var _EditorForm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EditorForm */ "./src/features/form/EditorForm.tsx");
/* harmony import */ var _withValidation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./withValidation */ "./src/features/form/withValidation.tsx");
/* harmony import */ var _withStatus__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./withStatus */ "./src/features/form/withStatus.tsx");
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\features\form\index.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/






/***/ }),

/***/ "./src/features/form/withStatus.tsx":
/*!******************************************!*\
  !*** ./src/features/form/withStatus.tsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ withStatus)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _Form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Form */ "./src/features/form/Form.tsx");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\features\form\withStatus.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/


function withStatus(Comp) {
  function withStatus(props) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Form__WEBPACK_IMPORTED_MODULE_1__.FormValidationContext.Consumer, null, (value = {
      valid: true
    }) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Comp, _extends({
      disabled: !value.valid
    }, props)));
  }

  withStatus.displayName = `withValidation(${Comp.displayName || Comp.name})`;
  return withStatus;
}

/***/ }),

/***/ "./src/features/form/withValidation.tsx":
/*!**********************************************!*\
  !*** ./src/features/form/withValidation.tsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ withValidation)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _Form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Form */ "./src/features/form/Form.tsx");
const _excluded = ["helperText"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\features\form\withValidation.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/


function withValidation(Comp) {
  let EnhancedComponent = /*#__PURE__*/function (_React$Component) {
    _inherits(EnhancedComponent, _React$Component);

    var _super = _createSuper(EnhancedComponent);

    function EnhancedComponent(...args) {
      var _this;

      _classCallCheck(this, EnhancedComponent);

      _this = _super.call(this, ...args);

      _defineProperty(_assertThisInitialized(_this), "state", {
        initial: true,
        error: null,
        value: _this.props.value
      });

      _defineProperty(_assertThisInitialized(_this), "_key", 0);

      _defineProperty(_assertThisInitialized(_this), "_root", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createRef());

      _defineProperty(_assertThisInitialized(_this), "_validate", () => _this.props.validate(_this.props.value));

      _defineProperty(_assertThisInitialized(_this), "_focus", () => {
        var _this$_root$current, _this$_root$current$f;

        (_this$_root$current = _this._root.current) === null || _this$_root$current === void 0 ? void 0 : (_this$_root$current$f = _this$_root$current.focus) === null || _this$_root$current$f === void 0 ? void 0 : _this$_root$current$f.call(_this$_root$current);

        if (_this.state.initial) {
          _this.setState({
            initial: false,
            error: _this.props.validate(_this.props.value)
          });
        }
      });

      return _this;
    }

    _createClass(EnhancedComponent, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this._key = this.props.validation.register({
          validate: this._validate,
          focus: this._focus
        });
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
          this.props.validation.update();
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.props.validation.unregister(this._key);
      }
    }, {
      key: "render",
      value: function render() {
        // @ts-ignore
        const _this$props = this.props,
              {
          helperText
        } = _this$props,
              other = _objectWithoutProperties(_this$props, _excluded); // @ts-ignore


        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Comp, _extends({
          ref: this._root,
          error: this.state.error // @ts-ignore
          ,
          helperText: this.state.error ? this.state.error.message : helperText
        }, other));
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function getDerivedStateFromProps(nextProps, prevState) {
        const initial = prevState.value !== nextProps.value ? false : prevState.initial;
        return {
          initial,
          error: initial ? null : nextProps.validate ? nextProps.validate(nextProps.value) : null,
          value: nextProps.value
        };
      }
    }]);

    return EnhancedComponent;
  }(react__WEBPACK_IMPORTED_MODULE_0__.Component);

  _defineProperty(EnhancedComponent, "displayName", `withValidation(${Comp.displayName ?? Comp.name})`);

  return props => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Form__WEBPACK_IMPORTED_MODULE_1__.FormValidationContext.Consumer, null, value => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(EnhancedComponent, _extends({
      validation: value
    }, props));
  });
}

/***/ }),

/***/ "./src/utils/convertDataTransferItemsToFiles.tsx":
/*!*******************************************************!*\
  !*** ./src/utils/convertDataTransferItemsToFiles.tsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convertDataTransferItemsToFiles)
/* harmony export */ });
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\utils\convertDataTransferItemsToFiles.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/
const blacklist = [/^\./, /\.(jks|keystore)$/, /^(android|ios)$/, /^coverage$/, /^(js|ts)config\.json$/, /^flow-typed$/, /^node_modules$/, /^npm-debug\.log$/, /^npm-error\.log$/, /^package-lock\.json$/, /^yarn-debug\.log$/, /^yarn-error\.log$/, /^yarn\.lock$/, /^__tests__$/, /~$/];
const whitelist = [/^\.eslintrc(\.json)?$/];

const processEntry = async (entry, files, path) => {
  if (blacklist.some(r => r.test(entry.name)) && !whitelist.some(r => r.test(entry.name))) {
    return;
  }

  if (entry.isFile) {
    const file = await new Promise((resolve, reject) => entry.file(resolve, reject));
    files.push({
      path,
      file
    });
  } else {
    if (entry.isDirectory) {
      const reader = entry.createReader();
      const entries = await new Promise((resolve, reject) => reader.readEntries(resolve, reject));
      await Promise.all(entries.map(async e => processEntry(e, files, `${path}/${e.name}`)));
    }
  }
};

async function convertDataTransferItemsToFiles(items, mappings) {
  const files = [];
  await Promise.all(items.map(it => {
    const path = mappings[it.name] || it.name;

    if (it instanceof File) {
      files.push({
        file: it,
        path
      });
      return undefined;
    } else {
      return processEntry(it, files, path);
    }
  }));
  return files;
}

/***/ }),

/***/ "./src/utils/dragEventIncludes.tsx":
/*!*****************************************!*\
  !*** ./src/utils/dragEventIncludes.tsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ dragEventIncludes)
/* harmony export */ });
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\utils\dragEventIncludes.tsx.ittf
    utc time: Fri, 18 Jun 2021 09:24:08 GMT
*/
function dragEventIncludes({
  dataTransfer
}, item) {
  if (!dataTransfer) {
    return false;
  }

  if (dataTransfer.types instanceof DOMStringList) {
    return dataTransfer.types.contains(item);
  }

  return dataTransfer.types.indexOf(item) > -1;
}

/***/ }),

/***/ "./src/assets/checkmark.png":
/*!**********************************!*\
  !*** ./src/assets/checkmark.png ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "assets/afbe577e0ee429a9b6d41f5e0a49b840.png");

/***/ }),

/***/ "./src/assets/clear.png":
/*!******************************!*\
  !*** ./src/assets/clear.png ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "assets/babd55c3c54fed9a93ef4fd42def093f.png");

/***/ }),

/***/ "./src/assets/cross-light.png":
/*!************************************!*\
  !*** ./src/assets/cross-light.png ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "assets/74183022706526781fad7e58ffb0ea01.png");

/***/ }),

/***/ "./src/assets/cross-red.png":
/*!**********************************!*\
  !*** ./src/assets/cross-red.png ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "assets/d76ac377459bbd2d31196032eb6dbf25.png");

/***/ }),

/***/ "./src/assets/cross.png":
/*!******************************!*\
  !*** ./src/assets/cross.png ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "assets/be1018899efdf1341557732773abcc8a.png");

/***/ }),

/***/ "./src/assets/info-icon-light.png":
/*!****************************************!*\
  !*** ./src/assets/info-icon-light.png ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "assets/90504c2ba1208cf0a866e5c19a4aad49.png");

/***/ }),

/***/ "./src/assets/info-icon.png":
/*!**********************************!*\
  !*** ./src/assets/info-icon.png ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "assets/9d79049897e7e29dff64569ba33fd9d7.png");

/***/ }),

/***/ "./src/assets/packi-icon-dark.svg":
/*!****************************************!*\
  !*** ./src/assets/packi-icon-dark.svg ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "assets/6f69fac37f13353633b2b88f79f85ee4.svg");

/***/ }),

/***/ "./src/assets/packi-icon.svg":
/*!***********************************!*\
  !*** ./src/assets/packi-icon.svg ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "assets/79038cb4d98dd7051ceacacc035bcc3f.svg");

/***/ }),

/***/ "./src/assets/settings-icon.png":
/*!**************************************!*\
  !*** ./src/assets/settings-icon.png ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "assets/b510ee88a3d0638a9fa0c0246329e5e5.png");

/***/ }),

/***/ "./src/features/lint/eslint.json":
/*!***************************************!*\
  !*** ./src/features/lint/eslint.json ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"parser":"babel-eslint","parserOptions":{"sourceType":"module"},"env":{"es6":true},"plugins":["babel","flowtype","react","react-native","react-hooks"],"settings":{"flowtype":{"onlyFilesWithFlowAnnotation":true},"react":{"version":"detect"}},"globals":{"__DEV__":false,"__dirname":false,"alert":false,"Blob":false,"cancelAnimationFrame":false,"cancelIdleCallback":false,"clearImmediate":true,"clearInterval":false,"clearTimeout":false,"console":false,"escape":false,"Event":false,"EventTarget":false,"exports":false,"fetch":false,"File":false,"FileReader":false,"FormData":false,"global":false,"Map":true,"module":false,"navigator":false,"process":false,"Promise":true,"requestAnimationFrame":true,"requestIdleCallback":true,"require":false,"Set":true,"setImmediate":true,"setInterval":false,"setTimeout":false,"WebSocket":false,"window":false,"XMLHttpRequest":false},"rules":{"constructor-super":"error","no-case-declarations":"error","no-class-assign":"error","no-cond-assign":"error","no-const-assign":"error","no-constant-condition":"error","no-control-regex":"error","no-delete-var":"error","no-dupe-args":"error","no-dupe-class-members":"error","no-dupe-keys":"error","no-duplicate-case":"error","no-empty":"error","no-empty-character-class":"error","no-empty-pattern":"error","no-ex-assign":"error","no-extra-boolean-cast":"error","no-extra-semi":"error","no-fallthrough":"error","no-func-assign":"error","no-global-assign":"error","no-inner-declarations":"error","no-invalid-regexp":"error","no-new-symbol":"error","no-obj-calls":"error","no-octal":"error","no-redeclare":"error","no-regex-spaces":"error","no-self-assign":"error","no-sparse-arrays":"error","no-this-before-super":"error","no-undef":"error","no-unexpected-multiline":"error","no-unreachable":"error","no-unsafe-finally":"error","no-unsafe-negation":"error","no-unused-labels":"error","require-yield":"error","use-isnan":"error","valid-typeof":"error","flowtype/array-style-complex-type":"off","flowtype/array-style-simple-type":"off","flowtype/boolean-style":"off","flowtype/define-flow-type":"error","flowtype/delimiter-dangle":"off","flowtype/generic-spacing":"off","flowtype/newline-after-flow-annotation":"off","flowtype/no-dupe-keys":"error","flowtype/no-existential-type":"off","flowtype/no-flow-fix-me-comments":"off","flowtype/no-mutable-array":"off","flowtype/no-primitive-constructor-types":"off","flowtype/no-types-missing-file-annotation":"off","flowtype/no-unused-expressions":"off","flowtype/no-weak-types":"off","flowtype/object-type-delimiter":"off","flowtype/require-exact-type":"off","flowtype/require-parameter-type":"off","flowtype/require-return-type":"off","flowtype/require-types-at-top":"off","flowtype/require-valid-file-annotation":"off","flowtype/require-variable-type":"off","flowtype/semi":"off","flowtype/sort-keys":"off","flowtype/space-after-type-colon":"off","flowtype/space-before-generic-bracket":"off","flowtype/space-before-type-colon":"off","flowtype/type-id-match":"off","flowtype/type-import-style":"off","flowtype/union-intersection-spacing":"off","flowtype/use-flow-type":"off","flowtype/valid-syntax":"off","react/jsx-no-duplicate-props":"error","react/jsx-no-undef":"error","react/jsx-uses-react":"error","react/jsx-uses-vars":"error","react/no-deprecated":"error","react/no-did-mount-set-state":"error","react/no-did-update-set-state":"error","react/no-direct-mutation-state":"error","react/no-is-mounted":"error","react/no-string-refs":"error","react/react-in-jsx-scope":"error","react/require-render-return":"error","react-native/no-unused-styles":"error","react-hooks/rules-of-hooks":"error","react-hooks/exhaustive-deps":"error"}}');

/***/ })

}]);
//# sourceMappingURL=EditorView.559f31a1aeb666a9a7a5.chunk.js.map