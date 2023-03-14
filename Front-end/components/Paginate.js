import Link from "next/link";
import { useRouter } from "next/router";

const Paginate = ({ pageSize, currentPage }) => {

    const router = useRouter();

    if (pageSize === 1) return null;
    const pages = Array.from({ length: pageSize }, (_, i) => i + 1);

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination justify-content-end">
                {pages.map((page) => (
                    <li className={'page-item' + (currentPage == page ? ' active' : '')} key={page}>
                        <Link className="page-link" href={{ pathname: router.pathname, query: { page } }}>{page}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Paginate