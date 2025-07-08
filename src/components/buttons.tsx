import type { HTMLAttributes } from "react";

export function ButtonPrimary(props: HTMLAttributes<HTMLButtonElement>) {
    const {className, ...rest} = props;
    return (
    <button
        {...rest}
        className={
            ["bg-blue-500", "hover:bg-blue-600", "text-white", "py-2", "px-4", "rounded", "font-semibold", "cursor-pointer",
                ...(props.className?.split(" ") ?? [])
            ].join(" ")}
    >
        {props.children}
    </button>);
}