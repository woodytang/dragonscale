// @ts-nocheck
"use client"

import { SimpleField, SimpleFormFieldProps } from "@/components/global/form/simple-field";
import { SimpleForm } from "@/components/global/form/simple-form"
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { mutate } from "swr";
import { useSearchParams } from "next/navigation";
import { SWR_KEYS } from "@/constants/swr";

/** 
 * 替换为你自己的请求类型
 * 替换为你自己的请求方法
*/
import type { YourFormRequest } from "@basecore/shared-types";
import { yourAction } from "../actions";

/** 
 * 替换为你自己的表单验证
*/
export const yourFormSchema = z.object({
    /* 表单字段验证 
        username: z.string().min(1, "用户名不能为空"),
    */
});

/** 
 * 替换为你自己的表单字段设计
*/
const formFields: SimpleFormFieldProps[] = [
    /* 表单字段设计 
        {
            name: "username",
            label: "用户名",
            type: "text",
        }
    */
];

type FormProps = {
    onClose: () => void
}

/** 
 * 替换为你自己的表单组件名称
*/
export default function YourForm({ onClose }: FormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const searchParams = useSearchParams()
    const queryString = searchParams.toString()

    const form = useForm<YourFormRequest>({
        resolver: zodResolver(yourFormSchema),
        defaultValues: {
            /* 默认值 */
        },
    });
    const onSubmit = async (values: YourFormRequest) => {
        setIsSubmitting(true);
        /** 
         * 根据需求改造入参
        */
        const result = await yourAction({ ...values });

        if (result.success) {
            toast.success('创建成功');
            form.reset();
            /** 
             * 替换为你自己的SWR_KEY
            */
            mutate(SWR_KEYS.YOUR_URL_KEY(`?${queryString}`))
            onClose()

        } else {
            toast.error(result.error?.message || '创建失败');
        }

        setIsSubmitting(false);

    };

    return (
        <SimpleForm form={form} onSubmit={onSubmit}>
            {formFields.map((field) => (
                <SimpleField key={field.name} {...field} />
            ))}
            <Button type="submit" disabled={isSubmitting}>
                {/* 替换为你自己的按钮文案 */}
                {isSubmitting ? '创建中...' : '新建'}
            </Button>
        </SimpleForm>
    )
}