import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";

interface Test {
    isLoading: boolean;
}

export interface CreateHandler<S, A, E> {
    pending: CaseReducer<S>;
    fulfilled: CaseReducer<S, PayloadAction<A>>;
    rejected: CaseReducer<S>;
}
