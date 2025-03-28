import { PropertyType } from "@/types/types";

export default function SingleProperty(props: PropertyType) {
    return (
        <>
            <p className='mx-1 pl-1 pr-2.5 border-r-2 border-custom-medium-gray last:border-r-0'>
                <span className='font-bold'>{props.property}: </span>
                {props.value}
            </p>
        </>
    );
}