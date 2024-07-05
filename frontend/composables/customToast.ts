import { useToast } from "#imports";
export function useCustomToast() {
    const toast = useToast();
    return {
        add(message: string, status: string) {
            if (status == "ok") {
                toast.add({
                    title: message,
                    color: "green",
                    icon: "i-heroicons-check-circle",
                    ui: {
                        backgroundColor: "green",
                    },
                });
            } else {
                toast.add({
                    title: message,
                    color: "red",
                    icon: "i-heroicons-x-mark",
                    ui: {
                        backgroundColor: "bg-red-100",
                    },
                });
            }
        },
    };
}
