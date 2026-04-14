import { Badge } from '@/components/ui/badge'
import { EXECUTION_PHASE_STATUS } from '@/lib/workflow/type'
import { CircleDashedIcon, Loader2Icon, CircleXIcon, CircleCheckIcon } from 'lucide-react'

type Props = {
    status: EXECUTION_PHASE_STATUS
}

const PhaseStatusBadge = ({ status }: Props) => {
    switch (status) {
        case EXECUTION_PHASE_STATUS.PENDING:
            return <CircleDashedIcon size={20} className="stroke-muted-foreground" />;
        case EXECUTION_PHASE_STATUS.RUNNING:
            return (
                <Loader2Icon size={20} className="animate-spin stroke-yellow-500" />
            );
        case EXECUTION_PHASE_STATUS.FAILED:
            return <CircleXIcon size={20} className="stroke-destructive" />;
        case EXECUTION_PHASE_STATUS.COMPLETED:
            return <CircleCheckIcon size={20} className="stroke-green-500" />;
        default:
            return <div className="rounded-full">{status}</div>;
    }
}

export default PhaseStatusBadge