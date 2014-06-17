<table class="table table-striped" style ="text-align: left;">
    <thead>
        <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Shares</th>
            <th>Price</th>
            <th>TOTAL</th>
        </tr>
    </thead>
    
    <?php foreach ($positions as $position): ?>
        
        <tr>
            <td><?= $position["symbol"] ?></td>
            <td><?= $position["name"] ?></td>
            <td><?= $position["shares"] ?></td>
            <td>$<?= myround($position["price"]) ?></td>
            <td>$<?= myround($position["shares"] * $position["price"]) ?></td>
        </tr>
    
    <?php endforeach ?>

        <tr>
            <td colspan="4">CASH</td>
            <td>$<?= myround($cash[0]["cash"]) ?></td>
        </tr>
</table>

<div>
    <a href="../addfunds.php">Add Funds</a>
</div>
