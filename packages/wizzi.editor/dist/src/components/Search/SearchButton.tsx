/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\Search\SearchButton.tsx.ittf
    utc time: Tue, 20 Jul 2021 18:56:29 GMT
*/
import {StyleSheet, css} from 'aphrodite';
import * as React from 'react';
import {c} from '../ThemeProvider';
import IconButton from '../widgets/IconButton';
import LazyLoad from '../widgets/LazyLoad';
import {ModalSheet} from '../widgets/ModalSheet';
import {ProgressIndicator} from '../widgets/ProgressIndicator';
import SearchPlaceholder from './SearchPlaceholder';
type Props = { 
    responsive: boolean;
};
type State = { 
    query: string;
    focused: boolean;
};
export default class SearchButton extends React.Component<Props, State> {
        state = {
            query: '', 
            focused: false
        }
        ;
        _handleChange = (e: React.ChangeEvent<HTMLInputElement>) => 
            this.setState({
                query: e.target.value
             });
        _handleClick = () => 
            this.setState({
                query: '', 
                focused: true
             });
        _handleDismiss = () => 
            this.setState({
                query: '', 
                focused: false
             });
        render() {
            return  (
                <React.Fragment
                >
                    <IconButton 
                        responsive={this.props.responsive}
                        title="Search for Packis"
                        onClick={this._handleClick}
                        data-test-id="search-button"
                    >
                        <svg
                         width="20" height="20" fill="none">
                            <circle 
                                cx="8.75"
                                cy="8.333"
                                r="5.417"
                                strokeWidth="1.667"
                             />
                            <path
                             d="M12.5 12.917l4.167 4.166" strokeWidth="1.667" strokeLinecap="round" />
                        </svg>
                    </IconButton>
                    <ModalSheet
                     className={css(styles.modal)} visible={this.state.focused} onDismiss={this._handleDismiss}>
                        <input 
                            type="search"
                            autoFocus
                            onChange={this._handleChange}
                            placeholder="Search for Packies…"
                            className={css(styles.input)}
                            data-test-id="search-input"
                         />
                        <div
                         className={css(styles.results)}>
                            <LazyLoad
                             load={() => 
                                
                                    import('./SearchResults')
                            }>
                                {
                                    ({
                                        loaded, 
                                        data: SearchResults
                                     }) => {
                                    
                                        if (loaded && SearchResults) {
                                            return  (
                                                <SearchResults
                                                 query={this.state.query} />
                                                )
                                            ;
                                        }
                                        return  (
                                            <div
                                             className={css(styles.loadingContainer)}>
                                                {
                                                    this.state.query ?  (
                                                        <ProgressIndicator
                                                         />
                                                        )
                                                     : null
                                                }
                                                <SearchPlaceholder
                                                 label={this.state.query ? 'Searching…' : 'Results will appear here.'} />
                                            </div>
                                            )
                                        ;
                                    }
                                    
                                }
                            </LazyLoad>
                        </div>
                    </ModalSheet>
                </React.Fragment>
                )
            ;
        }
    }
const styles = StyleSheet.create({
    input: {
        width: '100%', 
        appearance: 'none', 
        fontSize: 16, 
        padding: '16px 24px 16px 56px', 
        borderWidth: '0 0 1px 0', 
        borderColor: c('border'), 
        backgroundColor: 'transparent', 
        backgroundImage: `url(${require('../../assets/search.svg')})`, 
        backgroundSize: 16, 
        backgroundRepeat: 'no-repeat', 
        backgroundPosition: '24px center', 
        transition: '150ms', 
        ':focus': {
            outline: 0
         }
     }, 
    modal: {
        display: 'flex', 
        flexDirection: 'column', 
        width: 640, 
        height: 480, 
        maxWidth: 'calc(100vw - 160px)', 
        maxHeight: 'calc(100vh - 160px)'
     }, 
    results: {
        display: 'flex', 
        flexDirection: 'column', 
        flex: 1, 
        textAlign: 'left'
     }, 
    loadingContainer: {
        display: 'flex', 
        flex: 1
     }
 });
