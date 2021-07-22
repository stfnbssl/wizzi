/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\features\packi\sagas.tsx.ittf
    utc time: Wed, 21 Jul 2021 08:44:38 GMT
*/
import {all, fork, put, takeEvery, call} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';
import {config} from '../config';
import {appActions} from '../app';
import * as packiActions from './actions';
import * as packiTypes from './types';
import {callApi} from '../../utils/api';

function* handleFetchPackiTemplateListRequest(action: ReturnType<typeof packiActions.fetchPackiTemplateListRequest>):  any {

    try {
        console.log('sagas.handleFetchPackiTemplateListRequest.action', action);
        const res = yield call(callApi, 'get', config.API_URL, 'templates');
        console.log('sagas.handleFetchPackiTemplateListRequest.res', res);
        yield put(packiActions.fetchPackiTemplateListSuccess({
                packiNames: res
             }));
    } 
    catch (err) {
        if (err instanceof Error) {
            yield put(packiActions.fetchPackiTemplateListError(err.stack!));
        }
        else {
            yield put(packiActions.fetchPackiTemplateListError('An unknown error occured.'));
        }
    } 
}

function* handleUploadPackiTemplateRequest(action: ReturnType<typeof packiActions.uploadPackiTemplateRequest>):  any {

    try {
        console.log('sagas.handleUploadPackiTemplateRequest.action', action);
        const res = yield call(callApi, 'post', config.API_URL, `templates/${action.payload.uid}/${action.payload.templateId}`, {
                files: action.payload.files
             });
        console.log('sagas.handleUploadPackiTemplateRequest.res', res);
        yield put(packiActions.uploadPackiTemplateSuccess({}));
    } 
    catch (err) {
        if (err instanceof Error) {
            yield put(packiActions.uploadPackiTemplateError(err.stack!));
        }
        else {
            yield put(packiActions.uploadPackiTemplateError('An unknown error occured.'));
        }
    } 
}

function* watchFetchRequest() {

    yield takeEvery(getType(packiActions.fetchPackiTemplateListRequest), handleFetchPackiTemplateListRequest);
}

function* watchCrudRequest() {

    yield takeEvery(getType(packiActions.uploadPackiTemplateRequest), handleUploadPackiTemplateRequest);
}

function* packiSaga() {

    yield all([
            fork(watchFetchRequest), 
            fork(watchCrudRequest)
        ]);
}

export default packiSaga;
