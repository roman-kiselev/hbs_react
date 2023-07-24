import React, { Suspense } from "react";
import { LoadingSpin } from "../../entities";
import { LoadingVariant } from "../../shared/config";

interface SuspenseAndLoadingProps {
    children: React.ReactNode;
}

const SuspenseAndLoading: React.FC<SuspenseAndLoadingProps> = ({
    children,
}) => {
    return (
        <>
            <Suspense
                fallback={<LoadingSpin variant={LoadingVariant.SECONDARY} />}
            >
                {children}
            </Suspense>
        </>
    );
};

export default SuspenseAndLoading;
