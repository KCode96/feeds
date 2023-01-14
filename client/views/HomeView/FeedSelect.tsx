import { useAuth } from 'store/hooks';

type Props = {
    selectedTag: string;
    setSelectedTag: any;
    setSelected: any;
    selected: string;
};

export default function FeedSelect({
    selectedTag,
    setSelectedTag,
    setSelected,
    selected,
}: Props) {
    const { isAuthenticated } = useAuth();

    const handleSelect = (name: string) => {
        setSelected(name);

        setSelectedTag('');
    };

    return (
        <div className="border-b pb-[5px] ">
            {isAuthenticated && (
                <a
                    onClick={() => handleSelect('default')}
                    className={`link-primary px-4 py-2  ${
                        selected == 'default' &&
                        'text-blue-600 border-b-[1.5px] border-blue-600 transition hover:text-blue-600'
                    }`}
                >
                    Your Feed
                </a>
            )}
            <a
                onClick={() => handleSelect('global')}
                className={`link-primary px-4 py-2  ${
                    selected == 'global' &&
                    'text-blue-600 border-b-[1.5px] border-blue-600 transition hover:text-blue-600'
                }`}
            >
                Global Feed
            </a>
            {selectedTag && (
                <a
                    className={`link-primary px-4 py-2  ${
                        selected &&
                        'text-blue-600 border-b-[1.5px] border-blue-600 transition hover:text-blue-600'
                    }`}
                >
                    #{selectedTag}
                </a>
            )}
        </div>
    );
}
