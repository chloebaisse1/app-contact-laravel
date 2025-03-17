import { Button } from "@/Components/ui/button";
import { PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { NotebookPen } from "lucide-react";

export default function Home({ auth }: PageProps) {
    return (
        <>
            <Head title="Accueil" />

            <nav className="fixed top-0 w-full bg-white border-b border-b-gray-300 z-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <Link href="/">
                                <NotebookPen />
                            </Link>
                        </div>

                        <div className="flex items-center space-x-4">
                            {auth.user ? (
                                <>
                                    <Link
                                        className="text-gray-600 hover:text-gray-900"
                                        href={route("dashboard")}
                                    >
                                        Tableau de bord
                                    </Link>
                                    <Link
                                        className="text-gray-600 hover:text-gray-900"
                                        href={route("profile.edit")}
                                    >
                                        Profil
                                    </Link>
                                    <Link
                                        method="post"
                                        as="button"
                                        className="text-gray-600 hover:text-gray-900"
                                        href={route("logout")}
                                    >
                                        Déconnexion
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href={route("login")}
                                        className="text-gray-600 hover:text-gray-900"
                                    >
                                        Connexion
                                    </Link>
                                    <Link href={route("register")}>
                                        <Button>Inscription</Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
