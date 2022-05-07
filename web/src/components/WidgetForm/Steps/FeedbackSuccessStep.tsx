import { CloseButton } from "../../CloseButton";
import success from '../../../assets/success.svg';

interface FeedbackContentStepProps {
    onFeedbackRestartRequested: () => void;
}

export function FeedbackSuccessStep({ onFeedbackRestartRequested}: FeedbackContentStepProps) {
    return(
        <>
            <header>
                <CloseButton />
            </header>
            <div className="flex flex-col items-center py-10 w-[384px]">
                <img src={success} alt={''}/>
                <span className="text-xl mt-2">Agradecemos o feedback!</span>
                <button 
                type="button"
                onClick={onFeedbackRestartRequested}
                className="py-2 px-6 mt-6 bg-zinc-800 rounded-md border-trasnparent text-sm leading-6 hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offeset-zinc-900 focus:ring-brand-500"
                >
                    Quero enviar outro
                </button>
            </div>
        </>
    );
}