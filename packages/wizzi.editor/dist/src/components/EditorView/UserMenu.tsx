/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\EditorView\UserMenu.tsx.ittf
    utc time: Tue, 20 Jul 2021 18:56:29 GMT
*/
import {StyleSheet, css} from 'aphrodite';
import * as React from 'react';
import {loggedUser} from '../../features/app';
import {c} from '../ThemeProvider';
import {Avatar} from '../widgets/Avatar';
import ContextMenu from '../widgets/ContextMenu';
export type UserMenuProps = { 
    loggedUser: LoggedUser;
};
type State = { 
    visible: boolean;
};
export class UserMenuComp extends React.Component<UserMenuProps, State> {
    state: State = {
        visible: false
    }
    ;
    componentDidMount() {
        document.addEventListener('click', this._handleDocumentClick);
        document.addEventListener('contextmenu', this._handleDocumentContextMenu);
    }
    componentWillUnmount() {
        document.removeEventListener('click', this._handleDocumentClick);
        document.removeEventListener('contextmenu', this._handleDocumentContextMenu);
    }
    _handleDocumentClick = (e: MouseEvent) => {
        if (this.state.visible) {
            if (this._menu.current && e.target !== this._menu.current && !this._menu.current.contains(e.target as HTMLElement)) {
                this._hideMenu();
            }
        }
        else {
            if (this._avatar.current && (e.target === this._avatar.current || this._avatar.current.contains(e.target as Node))) {
                this.setState((state) => 
                
                    ({
                        visible: !state.visible
                     })
                )
            }
        }
    };
    _handleDocumentContextMenu = () => {
        if (this.state.visible) {
            this._hideMenu();
        }
    };
    _hideMenu = () => 
        this.setState({
            visible: false
         });
    _menu = React.createRef<HTMLUListElement>();
    _avatar = React.createRef<HTMLButtonElement>();
    render() {
        const {
            loggedUser
         } = this.props;
        return  (
            <div
             className={css(styles.container)}>
                <button
                 ref={this._avatar} className={css(styles.button)}>
                    <Avatar
                     source={loggedUser?.picture ? loggedUser.picture : null} size={26} />
                </button>
                <ContextMenu 
                    ref={this._menu}
                    visible={this.state.visible}
                    actions={loggedUser ? [
                                {
                                    label: 'My artifacts', 
                                    handler: () => 
                                    
                                        window.open(`${process.env.SERVER_URL}/productions/artifacts`)
                                    
                                 }, 
                                {
                                    label: 'My packages', 
                                    handler: () => 
                                    
                                        window.open(`${process.env.SERVER_URL}/productions/packages`)
                                    
                                 }, 
                                {
                                    label: 'My metas', 
                                    handler: () => 
                                    
                                        window.open(`${process.env.SERVER_URL}/productions/metas`)
                                    
                                 }, 
                                {
                                    label: 'My fragments', 
                                    handler: () => 
                                    
                                        window.open(`${process.env.SERVER_URL}/productions/fragments`)
                                    
                                 }, 
                                {
                                    label: 'Account Settings', 
                                    handler: () => 
                                    
                                        window.open(`${process.env.SERVER_URL}/settings`)
                                    
                                 }
                            ] : [
                                {
                                    label: 'Log in to Wizzi', 
                                    handler: () => 
                                    
                                        window.location.href = '#'
                                    
                                 }
                            ]}
                    onHide={this._hideMenu}
                    className={css(styles.menu)}
                 />
            </div>
            )
        ;
    }
}
export const UserMenu = UserMenuComp;
export default UserMenu;
const styles = StyleSheet.create({
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
            backgroundColor: c('hover')
         }
     }
 });
