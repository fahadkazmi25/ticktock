import React from 'react';

export const BrandPanel: React.FC = () => {
    return (
        <div className="hidden lg:flex lg:flex-1 bg-blue-600 items-center justify-center px-12 py-12">
            <div className="max-w-lg text-white">
                <h2 className="text-5xl font-semibold mb-6 mt-4">ticktock</h2>
                <p className="text-lg leading-relaxed opacity-90 text-nowrap">
                    Introducing ticktock, our cutting-edge timesheet web application designed<br />
                    to revolutionize how you manage employee work hours. With ticktock, you<br />
                    can effortlessly track and monitor employee attendance and productivity<br />
                    from anywhere, anytime, using any internet-connected device.
                </p>
            </div>
        </div >
    );
};
