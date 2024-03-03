import React from 'react';
import PlaceholderLoading from 'react-placeholder-loading'

const CustomLoader = () => {
    return (
        <>
            {/* Spinner container */}
            <div className="spinner d-flex mt-5 flex-md-row">
                {
                    // Map over a placeholder array to create multiple loading elements
                    [1, 2, 3].map((item) => {
                        return (
                            <>
                                {/* Individual loading element */}
                                <div className="mx-5">
                                    <div className="mt-3 mb-3 text-center d-flex">
                                        <div>
                                            {/* Circle placeholder for an avatar or icon */}
                                            <PlaceholderLoading shape="circle" width={45} height={45} />
                                        </div>
                                        <div className="d-flex flex-column justify-content-between mx-3">
                                            {/* Rectangle placeholders for text lines */}
                                            <PlaceholderLoading shape="rect" width={150} height={20} />
                                            <PlaceholderLoading shape="rect" width={100} height={20} />
                                        </div>
                                    </div>
                                    {/* Rectangle placeholder for an image or content */}
                                    <PlaceholderLoading shape="rect" width={270} height={200} />
                                    <div className="mt-3">
                                        {/* Rectangle placeholder for a single line of text */}
                                        <PlaceholderLoading shape="rect" width={100} height={20} />
                                    </div>
                                    <div className="mt-3">
                                        {/* Rectangle placeholder for another line of text */}
                                        <PlaceholderLoading shape="rect" width={270} height={20} />
                                    </div>
                                    <div className="mt-3 text-center">
                                        {/* Rectangle placeholder for a button or small text element */}
                                        <PlaceholderLoading shape="rect" width={130} height={30} />
                                    </div>
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </>

    )
}
export default CustomLoader;    