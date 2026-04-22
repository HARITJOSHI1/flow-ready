"use client";

import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup';

interface Props {
    value: number;
}
const CountupWrapper = ({ value }: Props) => {

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return "-";

    return (
        <CountUp duration={0.5} preserveValue end={value} decimals={0} />
    )
}

export default CountupWrapper