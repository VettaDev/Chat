import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConversation = () => {
    const { conversationId } = useParams();

    const _conversationId = useMemo(() => {
        if (!conversationId) return "";
        return conversationId as string;
    }, [conversationId]);

    const isOpen = useMemo(() => !!_conversationId, [_conversationId]);

    return useMemo(() => {
        return {
            conversationId: _conversationId,
            isOpen,
        };
    }, [_conversationId, isOpen]);
};
export default useConversation;
