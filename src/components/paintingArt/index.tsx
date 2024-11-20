import { useIntersection } from "../utils";
import { setSelectedMenuIndex } from "../../store/modules/menuSlice";
import { RootState, AppDispatch } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { MenuItem } from "../../type/customTypes";
import PaintWorksRender from "./paintWorksRender";

function PaintWork() {
  const myHref: string = "target-paint";

  const { menuList } = useSelector((state: RootState) => state.menus);

  const dispatch: AppDispatch = useDispatch();

  const paintRef = useIntersection(
    {
      rootMargin: "-700px",
    },
    (inView) => {
      if (inView) {
        (menuList as MenuItem[]).forEach((menu) => {
          if (menu.href === myHref) {
            dispatch(setSelectedMenuIndex(menu.id));
          }
        });
      }
    }
  );

  return (
    <div ref={paintRef} className="w-full pt-16">
      <p className="font-georgian text-5xl lg:text-7xl text-center mb-8">
        painting art.
      </p>
      <p className="w-5/6 font-sans pb-8 text-center text-base word-spacing-wider tracking-widest mx-auto">
        download & print. bring street art into your home.
      </p>

      <div className="w-full h-auto">
        <PaintWorksRender />
      </div>
    </div>
  );
}

export default PaintWork;
