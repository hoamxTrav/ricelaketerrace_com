// src/components/ActionBar.jsx
export default function ActionBar({
                                      recognized = false,
                                      onLogin,
                                      onAccount,
                                      onDues,
                                      onRepairs,
                                      onEvents,
                                      onHelp,
                                      onContact,
                                      className = "",
                                  }) {
    const mainLabel = recognized ? "Account" : "Login";
    const mainHandler = recognized ? onAccount : onLogin;

    const base =
        "flex-1 text-center py-2.5 rounded-xl font-semibold text-white shadow-sm hover:brightness-95 active:translate-y-px transition";

    const buttons = [
        { label: mainLabel, color: "bg-cherry", onClick: mainHandler },
        { label: "Dues", color: "bg-lawn", onClick: onDues },
        { label: "Repairs", color: "bg-bark", onClick: onRepairs },
        { label: "Events", color: "bg-maple", onClick: onEvents },
        { label: "Help", color: "bg-lawn text-white", onClick: onHelp },
        { label: "Contact", color: "bg-charcoal", onClick: onContact },
    ];

    return (
        <div className={`grid grid-cols-6 gap-2 sm:gap-3 mb-3 ${className}`}>
            {buttons.map((b, i) => (
                <button
                    key={i}
                    onClick={b.onClick}
                    className={`${base} ${b.color}`}
                >
                    {b.label}
                </button>
            ))}
        </div>
    );
}
