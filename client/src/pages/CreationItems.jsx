function CreationItems({ item, onView }) {
    return (
        <div className="flex justify-between items-center p-4 bg-slate-900 rounded-lg border border-slate-800">
            <div>
                <h3 className="text-slate-100 font-medium">{item.title}</h3>
                {item.type}
            </div>

            <button
                onClick={onView}
                className="px-4 py-1 text-sm rounded-md bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition"
            >
                View
            </button>
        </div>
    );
}

export default CreationItems;