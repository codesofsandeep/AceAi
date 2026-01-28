// --- ONLY IMPORTANT FIXES DONE, REST OF CODE UNTOUCHED ---

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";

const AnimatedItem = ({ children, delay = 0, index, onMouseEnter, onClick }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { amount: 0.5, triggerOnce: false });

    return (
        <motion.div
            ref={ref}
            data-index={index}
            onMouseEnter={onMouseEnter}
            onClick={onClick}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.2, delay }}
            className="mb-4 cursor-pointer"
        >
            {children}
        </motion.div>
    );
};

const AnimatedList = ({
    items = [],
    onItemSelect,
    showGradients = true,
    enableArrowNavigation = true,
    className = "",
    itemClassName = "",
    displayScrollbar = true,
    initialSelectedIndex = -1,
}) => {
    const listRef = useRef(null);

    const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);

    // ------- FIX: update selectedIndex when parent changes -------
    useEffect(() => {
        setSelectedIndex(initialSelectedIndex);
    }, [initialSelectedIndex]);
    // -------------------------------------------------------------

    const [keyboardNav, setKeyboardNav] = useState(false);
    const [topGradientOpacity, setTopGradientOpacity] = useState(0);
    const [bottomGradientOpacity, setBottomGradientOpacity] = useState(1);

    const handleItemMouseEnter = useCallback((index) => {
        setSelectedIndex(index);
    }, []);

    const handleItemClick = useCallback(
        (item, index) => {
            setSelectedIndex(index);
            if (onItemSelect) onItemSelect(item, index);
        },
        [onItemSelect]
    );

    const handleScroll = useCallback((e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;

        setTopGradientOpacity(Math.min(scrollTop / 50, 1));

        const bottomDist = scrollHeight - (scrollTop + clientHeight);
        setBottomGradientOpacity(
            scrollHeight <= clientHeight ? 0 : Math.min(bottomDist / 50, 1)
        );
    }, []);

    return (
        <div className={`relative w-full ${className}`}>
            {/* FIXED width: replaced w-[500px] with w-full */}

            <div
                ref={listRef}
                className={`max-h-full overflow-y-auto p-4 pb-6 ${displayScrollbar
                    ? "[&::-webkit-scrollbar]:w-[8px] [&::-webkit-scrollbar-track]:bg-[#060010] [&::-webkit-scrollbar-thumb]:bg-[#222] [&::-webkit-scrollbar-thumb]:rounded-[4px]"
                    : "scrollbar-hide"
                    }`}
                onScroll={handleScroll}
                style={{
                    scrollbarWidth: displayScrollbar ? "thin" : "none",
                    scrollbarColor: "#222 #060010",
                }}
            >
                {items.map((item, index) => (
                    <AnimatedItem
                        key={index}
                        delay={0.1}
                        index={index}
                        onMouseEnter={() => handleItemMouseEnter(index)}
                        onClick={() => handleItemClick(item, index)}
                    >
                        <div
                            className={`px-4 py-2 bg-[#111] rounded-lg ${selectedIndex === index ? "bg-[#222]" : ""
                                } ${itemClassName}`}
                        >
                            <p className="text-white text-sm m-0">{item}</p>
                        </div>
                    </AnimatedItem>
                ))}
            </div>

            {showGradients && (
                <>
                    {/* Top gradient */}
                    <div
                        className="absolute top-0 left-0 right-0 h-[50px] bg-gradient-to-b from-[#060010] to-transparent pointer-events-none transition-opacity duration-300 ease"
                        style={{ opacity: topGradientOpacity }}
                    ></div>

                    {/* Bottom gradient */}
                    <div
                        className="absolute bottom-0 left-0 right-0 h-[40px] to-transparent pointer-events-none transition-opacity duration-300 ease"
                        style={{ opacity: bottomGradientOpacity }}
                    ></div>
                </>
            )}


        </div>
    );
};

export default AnimatedList;
