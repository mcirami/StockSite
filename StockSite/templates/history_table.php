<table class="table table-striped" style ="text-align: left;">
    <thead>
        <tr>
            <th>Transaction</th>
            <th>Date/Time</th>
            <th>Symbol</th>
            <th>Shares</th>
            <th>Price</th>
        </tr>
    </thead>
    
    <?php if (!empty($positions)): ?>
    
        <?php foreach ($positions as $position): ?>
            
            <tr>
                <td><?= $position["transaction"] ?></td>
                <td><?= date('n/d/Y g:ia', strtotime($position["datetime"])) ?></td>
                <td><?= $position["symbol"] ?></td>
                <td><?= $position["shares"] ?></td>
                <td>$<?= $position["price"] ?></td>
            </tr>
        
        <?php endforeach ?>

    <?php endif ?>
     
</table>
