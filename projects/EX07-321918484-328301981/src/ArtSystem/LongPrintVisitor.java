package ArtSystem;

public class LongPrintVisitor implements Visitor {
    @Override
    public void visit(Kid kid) {
        System.out.print("A " + (2024 - kid.getBirthYear()) + " year old kid with " + kid.getHairColor().toString().toLowerCase() + " hair. ");
    }

    @Override
    public void visit(Tree tree) {
        System.out.print("A tree with an amount of " + tree.getLeavesAmount() + " leaves. ");
    }

    @Override
    public void visit(Boat boat) {
        System.out.print("A boat made of " + boat.getMaterial().toString().toLowerCase() + " material. ");
    }

    @Override
    public void visit(Flag flag) {
        System.out.print("A flag of color " + flag.getColor().toString().toLowerCase() + ". ");
    }

    @Override
    public void visit(Kite kite) {
        System.out.print("A kite of color: " + kite.getColor().toString().toLowerCase() + ". ");
    }

    @Override
    public void visit(Painting painting) {

    }

    @Override
    public void visit(Island island) {
        if (island.getElements().isEmpty()) {
            System.out.print("An empty island named " + island.getName() + ". ");
        } else {
            System.out.print("An island named " + island.getName() + " containing: ");
            for (Element child : island.getElements()) {
                child.accept(this);
            }
        }
    }

    @Override
    public void visit(Lake lake) {
        if (lake.getElements().isEmpty()) {
            System.out.print("An empty lake named " + lake.getName() + ". ");
        } else {
            System.out.print("A lake named " + lake.getName() + " containing: ");
            for (Element child : lake.getElements()) {
                child.accept(this);
            }
        }
    }
}
