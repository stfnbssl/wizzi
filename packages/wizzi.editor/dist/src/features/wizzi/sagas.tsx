/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\features\wizzi\sagas.tsx.ittf
    utc time: Wed, 21 Jul 2021 08:44:38 GMT
*/
import {all, fork, put, takeEvery, call} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';
import {config} from '../config';
import * as wizziActions from './actions';
import {packiActions} from '../packi';
import {callApi} from '../../utils/api';
import {packiFilterIttf} from '../file/convertFileStructure';
//
function* handleGenerateArtifactRequest(action: ReturnType<typeof wizziActions.generateArtifactRequest>):  any {

    try {
        console.log('sagas.handleGenerateArtifactRequest.action', action);
        const res = yield call(callApi, 'post', config.API_URL, 'productions/artifact/' + encodeURIComponent(action.payload.filePath), action.payload.files);
        console.log('sagas.handleGenerateArtifactRequest.res', res);
        yield put(wizziActions.generateArtifactSuccess(res));
    } 
    catch (err) {
        if (err instanceof Error) {
            yield put(wizziActions.generateArtifactError(err.stack!));
        }
        else {
            yield put(wizziActions.generateArtifactError('An unknown error occured.'));
        }
    } 
}
//
function* handleMTreeDebugInfoRequest(action: ReturnType<typeof wizziActions.mTreeDebugInfoRequest>):  any {

    try {
        console.log('sagas.handleMTreeDebugInfoRequest.action', action);
        const res = yield call(callApi, 'post', config.API_URL, 'productions/mtreedebuginfo/' + encodeURIComponent(action.payload.filePath), action.payload.files);
        console.log('sagas.handleMTreeDebugInfoRequest.res', res);
        yield put(wizziActions.mTreeDebugInfoSuccess(res));
    } 
    catch (err) {
        if (err instanceof Error) {
            yield put(wizziActions.generateArtifactError(err.stack!));
        }
        else {
            yield put(wizziActions.generateArtifactError('An unknown error occured.'));
        }
    } 
}
//
function* handleMTreeRequest(action: ReturnType<typeof wizziActions.mTreeRequest>):  any {

    try {
        console.log('sagas.handleMTreeRequest.action', action);
        const res = yield call(callApi, 'post', config.API_URL, 'productions/mtree/' + encodeURIComponent(action.payload.filePath), action.payload.files);
        console.log('sagas.handleMTreeRequest.res', res);
        yield put(wizziActions.mTreeSuccess(res));
    } 
    catch (err) {
        if (err instanceof Error) {
            yield put(wizziActions.generateArtifactError(err.stack!));
        }
        else {
            yield put(wizziActions.generateArtifactError('An unknown error occured.'));
        }
    } 
}
//
function* handleExecuteJobRequest(action: ReturnType<typeof wizziActions.executeJobRequest>):  any {

    try {
        console.log('sagas.handleExecuteJobRequest.action', action);
        const res = yield call(callApi, 'post', config.API_URL, 'productions/job/', packiFilterIttf(action.payload.files));
        console.log('sagas.handleExecuteJobRequest.res', res);
        yield put(wizziActions.executeJobSuccess(res));
        yield put(packiActions.executeJobSuccess({
                generatedArtifacts: res.generatedArtifacts, 
                previousArtifacts: action.payload.files
             }));
    } 
    catch (err) {
        if (err instanceof Error) {
            yield put(wizziActions.executeJobError(err.stack!));
        }
        else {
            yield put(wizziActions.executeJobError('An unknown error occured.'));
        }
    } 
}
//
function* wizziRequest() {

    yield takeEvery(getType(wizziActions.generateArtifactRequest), handleGenerateArtifactRequest);
    yield takeEvery(getType(wizziActions.mTreeDebugInfoRequest), handleMTreeDebugInfoRequest);
    yield takeEvery(getType(wizziActions.mTreeRequest), handleMTreeRequest);
    yield takeEvery(getType(wizziActions.executeJobRequest), handleExecuteJobRequest);
}
//
function* wizziSaga() {

    yield all([
            fork(wizziRequest)
        ]);
}
//
export default wizziSaga;
